$ErrorActionPreference = 'Stop'
function Start-Sleep { param($Seconds) $script:delays += $Seconds }
function Invoke-RestMethod { if ($script:telemetryFailure) { throw 'synthetic telemetry failure' } }
function Invoke-WebRequest {
  param($Method,$Uri,$Headers,$ContentType,$Body,[switch]$SkipHttpErrorCheck,$MaximumRetryCount,$TimeoutSec,$ErrorAction)
  $script:attempts++
  if ($MaximumRetryCount -ne 0 -or $TimeoutSec -gt 30 -or $TimeoutSec -lt 1) { throw 'Invalid transport bounds' }
  if ($script:transportFailure -and $script:attempts -eq 1) { throw 'PRIVATE_ERROR_SENTINEL' }
  $status = if ($script:attempts -le $script:failures) { $script:failureStatus } else { 200 }
  $content = if ($script:invalidJson) { 'invalid' } elseif ($script:invalid) { '{"properties":{"columns":[],"rows":[]}}' } else {
    '{"properties":{"columns":[{"name":"PreTaxCost"},{"name":"Currency"}],"rows":[[' + $script:spend + ',"' + $script:currency + '"]]}}'
  }
  return @{StatusCode=$status;Headers=$script:retryHeaders;Content=$content}
}
function az {
  $global:LASTEXITCODE = 0
  $command = $args -join ' '
  if ($command -like 'containerapp show*') { return '{"properties":{"template":{"containers":[{"env":[{"name":"EXPERIMENT_END","value":"2099-01-01T00:00:00Z"}]}]}}}' }
  if ($command -like 'account get-access-token*') { if ($script:authFailure) { $global:LASTEXITCODE=1;return }; return 'synthetic-test-token' }
  if ($command -like 'account show*') { return '{"id":"test-subscription"}' }
  if ($command -like 'resource show*') { if ($script:telemetryFailure) { $global:LASTEXITCODE=1;return }; return '{"properties":{"ConnectionString":"InstrumentationKey=test;IngestionEndpoint=https://example.invalid"}}' }
  if ($command -like 'containerapp job list*') { return '[{"name":"oldweb-mcp-bulk"},{"name":"unrelated-job"}]' }
  if ($command -like 'containerapp job stop*oldweb-mcp-bulk*') { $script:jobStops++; if ($script:stopFailure) { $global:LASTEXITCODE=1 }; return }
  if ($command -like 'containerapp job delete*oldweb-mcp-bulk*') { $script:jobDeletes++; return }
  if ($command -like 'containerapp ingress disable*') { $script:shutdowns++; return }
  throw "Unexpected mocked command: $command"
}
foreach ($case in @(
  @{name='temporary failures recover';failures=2;attempts=3;wait=90},
  @{name='late recovery before the limit';failures=5;attempts=6;wait=570},
  @{name='persistent failures pause';failures=6;attempts=6;wait=570;pause=$true;throws=$true},
  @{name='verified threshold pauses';spend=20;attempts=1;pause=$true},
  @{name='below threshold stays available';spend=19.99;attempts=1},
  @{name='above threshold pauses';spend=21;attempts=1;pause=$true},
  @{name='stop failure still removes the worker';spend=20;attempts=1;pause=$true;stopFailure=$true},
  @{name='invalid schema pauses';invalid=$true;attempts=1;pause=$true;throws=$true},
  @{name='invalid JSON pauses';invalidJson=$true;attempts=1;pause=$true;throws=$true},
  @{name='negative amount pauses';spend=-1;attempts=1;pause=$true;throws=$true},
  @{name='null amount pauses';spend='null';attempts=1;pause=$true;throws=$true},
  @{name='wrong currency pauses';currency='EUR';attempts=1;pause=$true;throws=$true},
  @{name='authentication failure pauses';authFailure=$true;attempts=0;pause=$true;throws=$true},
  @{name='permission denial is not retried';failures=6;status=403;attempts=1;pause=$true;throws=$true},
  @{name='server error recovers';failures=1;status=503;attempts=2;wait=30},
  @{name='transport failure recovers';transportFailure=$true;attempts=2;wait=30},
  @{name='Retry-After is honored';failures=1;headers=@{'Retry-After'='120'};attempts=2;wait=120},
  @{name='largest Azure wait is honored';failures=1;headers=@{'x-ms-ratelimit-microsoft.costmanagement-clienttype-retry-after'='90';'x-ms-ratelimit-microsoft.costmanagement-qpu-retry-after'='150';'x-ms-ratelimit-microsoft.consumption-retry-after'='100'};attempts=2;wait=150},
  @{name='oversized server wait pauses without early retry';failures=1;headers=@{'Retry-After'='901'};attempts=1;pause=$true;throws=$true},
  @{name='repeated waits stop at the deadline';failures=6;headers=@{'Retry-After'='600'};attempts=2;wait=600;pause=$true;throws=$true},
  @{name='invalid wait falls back';failures=1;headers=@{'Retry-After'='invalid'};attempts=2;wait=30},
  @{name='telemetry lookup failure does not pause verified spend';telemetryFailure=$true;attempts=1}
)) {
  $script:attempts=0;$script:shutdowns=0;$script:jobStops=0;$script:jobDeletes=0;$script:delays=@()
  $script:failures=[int]$case.failures;$script:failureStatus=if($case.status){$case.status}else{429}
  $script:spend=if($case.ContainsKey('spend')){$case.spend}else{0.09}
  $script:currency=if($case.currency){$case.currency}else{'USD'}
  $script:retryHeaders=if($case.headers){$case.headers}else{@{}}
  foreach ($key in @('stopFailure','invalid','invalidJson','authFailure','telemetryFailure','transportFailure')) { Set-Variable -Scope Script -Name $key -Value ([bool]$case[$key]) }
  $threw=$false;$caughtError=''
  try { . (Join-Path $PSScriptRoot 'operations.ps1') -Operation check | Out-Null } catch { $threw=$true;$caughtError=$_.Exception.Message }
  $expectedPauses=[int][bool]$case.pause
  if ($script:attempts -ne $case.attempts -or $script:shutdowns -ne $expectedPauses -or $threw -ne [bool]$case.throws) { throw "Failed: $($case.name). Attempts $script:attempts. Pauses $script:shutdowns. $caughtError" }
  if ($script:jobStops -ne $expectedPauses -or $script:jobDeletes -ne $expectedPauses) { throw "Worker shutdown failed: $($case.name)" }
  $wait=($script:delays | Measure-Object -Sum).Sum
  if ($wait -ne [int]$case.wait -or @($script:delays | Where-Object {$_ -gt 30}).Count) { throw "Incorrect wait: $($case.name). Actual $wait" }
  if ($caughtError -match 'PRIVATE_ERROR_SENTINEL|synthetic-test-token') { throw 'Private error escaped' }
  Write-Output "Passed: $($case.name)"
}
$now=[datetimeoffset]'2026-10-16T12:00:00Z'
if ((Get-CostRetrySeconds -Headers @{'Retry-After'='Fri, 16 Oct 2026 12:02:00 GMT'} -FallbackSeconds 30 -Now $now) -ne 120) { throw 'HTTP date wait failed' }
if ((Get-CostRetrySeconds -Headers @{'Retry-After'='NaN'} -FallbackSeconds 30 -Now $now) -ne 30) { throw 'Nonfinite wait accepted' }
foreach ($invalidCost in @(
  '{"properties":{"columns":[{"name":"PreTaxCost"},{"name":"Currency"}],"rows":[["NaN","USD"]]}}',
  '{"properties":{"columns":[{"name":"PreTaxCost"},{"name":"Currency"}],"rows":[[0,"USD"]],"nextLink":"more"}}',
  '{"properties":{"columns":[{"name":"PreTaxCost"},{"name":"Currency"}],"rows":null}}'
)) {
  $rejected=$false;try { Get-VerifiedCostTotal -Cost ($invalidCost | ConvertFrom-Json) | Out-Null } catch { $rejected=$true }
  if (-not $rejected) { throw 'Incomplete cost accepted' }
}
Write-Output 'Passed: HTTP dates, nonfinite waits, nonfinite amounts, missing rows and pagination'
foreach ($validCost in @(
  @{json='{"properties":{"columns":[{"name":"PreTaxCost"},{"name":"Currency"}],"rows":[]}}';expected=0},
  @{json='{"properties":{"columns":[{"name":"PreTaxCost"},{"name":"Currency"}],"rows":[[9,"USD"],[11,"USD"]]}}';expected=20},
  @{json='{"properties":{"columns":[{"name":"Currency"},{"name":"PreTaxCost"}],"rows":[["USD",20]]}}';expected=20}
)) {
  if ((Get-VerifiedCostTotal -Cost ($validCost.json | ConvertFrom-Json)) -ne $validCost.expected) { throw 'Incorrect cost total' }
}
Write-Output 'Passed: zero cost, combined threshold and reordered columns'
$global:LASTEXITCODE = 0
