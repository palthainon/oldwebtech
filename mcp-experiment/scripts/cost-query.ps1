function Get-CostRetrySeconds {
  param($Headers, [int]$FallbackSeconds, [datetimeoffset]$Now = [datetimeoffset]::UtcNow)
  $seconds = [double]$FallbackSeconds
  foreach ($name in $Headers.Keys) {
    if ($name -notmatch '^(Retry-After|x-ms-ratelimit-microsoft\.(consumption|costmanagement(?:-[a-z]+)?)-retry-after)$') { continue }
    foreach ($value in @($Headers[$name])) {
      $number = 0.0
      $date = [datetimeoffset]::MinValue
      if ([double]::TryParse([string]$value, [Globalization.NumberStyles]::Float, [Globalization.CultureInfo]::InvariantCulture, [ref]$number) -and [double]::IsFinite($number) -and $number -ge 0) {
        $seconds = [math]::Max($seconds, $number)
      } elseif ($name -eq 'Retry-After' -and [datetimeoffset]::TryParse([string]$value, [ref]$date)) {
        $seconds = [math]::Max($seconds, ($date - $Now).TotalSeconds)
      }
    }
  }
  return [math]::Ceiling($seconds)
}

function Invoke-CostQueryWithRetry {
  param([Parameter(Mandatory)][scriptblock]$Request, [int]$MaxAttempts = 6, [int]$BudgetSeconds = 900)
  $clock = [Diagnostics.Stopwatch]::StartNew()
  $waited = 0
  for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
    $remaining = $BudgetSeconds - [math]::Max($clock.Elapsed.TotalSeconds, $waited)
    if ($remaining -lt 1) { throw 'Cost verification deadline reached' }
    $status = 0
    $headers = @{}
    try {
      $response = & $Request ([math]::Max(1, [math]::Min(30, [math]::Floor($remaining))))
      $status = [int]$response.StatusCode
      $headers = $response.Headers
    } catch {
      # Do not expose HTTP exception text, response bodies or credentials.
      $status = 0
    }
    if ($status -eq 200) {
      try { return ($response.Content | ConvertFrom-Json -Depth 100 -ErrorAction Stop) }
      catch { throw 'Invalid cost response JSON' }
    }
    if ($status -ne 0 -and $status -notin @(408, 429, 500, 502, 503, 504)) { throw "Cost verification rejected (HTTP $status)" }
    if ($attempt -eq $MaxAttempts) { throw 'Cost verification retry limit reached' }
    $fallback = [math]::Min(180, 30 * [math]::Pow(2, $attempt - 1))
    $delay = Get-CostRetrySeconds -Headers $headers -FallbackSeconds $fallback
    $remaining = $BudgetSeconds - [math]::Max($clock.Elapsed.TotalSeconds, $waited)
    # Never shorten an Azure retry instruction to fit the local deadline.
    if ($delay -ge $remaining) { throw 'Azure retry wait exceeds cost verification deadline' }
    Write-Warning "Cost verification HTTP $status. Wait $delay seconds before attempt $($attempt + 1) of $MaxAttempts."
    for ($left = $delay; $left -gt 0; $left -= 30) { Start-Sleep -Seconds ([math]::Min(30, $left)) }
    $waited += $delay
  }
}

function Get-VerifiedCostTotal {
  param([Parameter(Mandatory)]$Cost)
  $columns = @($Cost.properties.columns.name)
  $costIndex = [array]::IndexOf($columns, 'PreTaxCost')
  $currencyIndex = [array]::IndexOf($columns, 'Currency')
  if ($costIndex -lt 0 -or $currencyIndex -lt 0 -or $null -eq $Cost.properties.rows -or $Cost.properties.nextLink) { throw 'Incomplete cost response' }
  $total = 0.0
  foreach ($row in $Cost.properties.rows) {
    $amount = 0.0
    if ($row.Count -le [math]::Max($costIndex, $currencyIndex) -or $row[$currencyIndex] -ne 'USD' -or $null -eq $row[$costIndex] -or
        -not [double]::TryParse([string]$row[$costIndex], [Globalization.NumberStyles]::Float, [Globalization.CultureInfo]::InvariantCulture, [ref]$amount) -or
        -not [double]::IsFinite($amount) -or $amount -lt 0) { throw 'Invalid cost row' }
    $total += $amount
  }
  if (-not [double]::IsFinite($total)) { throw 'Invalid cost total' }
  return $total
}
