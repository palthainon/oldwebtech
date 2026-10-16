# Billing repair and public access: October 16, 2026

The user approved restoration of public access. The user retained the $20 monthly pause threshold. The corrected live billing check reports $1.09 before restoration.

## Cause

The billing check, a script for monthly spend, made four requests on October 12. The first request failed at 06:05:53 UTC. The fourth request failed at 06:06:46 UTC. All four responses reported HTTP 429, the rate-limit response. The old script discarded the response headers. It used fixed waits of 5, 15, and 30 seconds. The shutdown followed exhausted verification. It did not follow verified spend of $20.

Microsoft documents retry instructions in Cost Management response headers. The fixed waits could repeat a request before the requested wait ended. The saved failure log has no response headers. The exact Azure throttle bucket for the October 12 failure is therefore unverified.

## Repair

The check now receives status codes and response headers directly. It uses one stable client label. It disables the HTTP client's automatic retries. The check honors the largest applicable Azure retry wait. It also supports a standard Retry-After date. Fallback waits increase from 30 seconds to a maximum of 180 seconds. Six attempts share a 15-minute query deadline. Each request has a timeout of at most 30 seconds. The check does not shorten an Azure wait to fit the remaining deadline.

Only transient responses and transport failures receive retries. Permission failures stop verification immediately. Invalid, incomplete, nonfinite, negative, paginated, or non-USD cost responses fail verification. A verified total of $20 or more pauses public access. Exhausted verification also pauses public access. The shutdown still stops and removes the exact synthetic worker if present. It does not remove other workers. A later successful check does not restore public access automatically.

The telemetry update, an optional cost record, now runs after the billing decision. A failure to read telemetry settings cannot turn verified spend into a billing failure. The workflow has a 25-minute timeout for query retries and shutdown work. The six-hour schedule remains unchanged.

## Validation

The local regression suite passes 35 test groups. The parser suite passes 116 checks. The independent SDK client passes 300 cases. The billing tests cover recovery through the sixth attempt, exhausted retries, server retry headers, HTTP dates, the total deadline, immediate permission failure, transport failure, invalid cost rows, the exact $20 boundary, and worker removal after a failed stop. The tests also verify that telemetry lookup failure does not pause verified spend. The worker completion tests pass.

The first local protocol run encountered a sandbox network denial. The complete regression suite then passed with localhost access. No product change was needed for the sandbox failure.

All 13 public tools pass initialization, discovery, and successful calls through the custom domain. The tests use the private internal-test marker. The existing managed certificate is bound again. The existing revision serves all traffic. The app still uses zero minimum replicas and one maximum replica. The final deadline remains February 15, 2027. The live GitHub workflow result will be recorded after completion. The immutable app image remains unchanged. The bulk worker remains absent after the earlier shutdown. This request restores the public servers and does not start a synthetic worker.

## Sources

- [Microsoft automation guidance](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/manage-automation) describes Cost Management retry headers.
- [Microsoft Query API reference](https://learn.microsoft.com/en-us/rest/api/cost-management/query/usage?view=rest-cost-management-2025-03-01) describes HTTP 429 retry behavior.
- [Failed check](https://github.com/palthainon/oldwebtech/actions/runs/38210870973) records the four failed attempts and the shutdown.

Public validation: [live tool results](restored-smoke-2026-10-16.json). Deterministic validation: [300-case results](deterministic-2026-10-16T13-40-51-460Z.json).
