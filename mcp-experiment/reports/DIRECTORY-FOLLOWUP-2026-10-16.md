# Directory follow-up — October 16, 2026

No additional directory submission completed. Smithery requires account authorization. PulseMCP submissions remain closed.

## Verified state

All three version 1.1.0 entries remain active in the official MCP Registry. No version was republished. The first listing remains October 10, 2026 at 17:32:51.537144 UTC. The site-linked baseline lasted about 24 hours 14 minutes. It was not a controlled study of spontaneous discovery.

The public app has ingress enabled. Its ready revision is `oldweb-mcp--extended20261010`. The existing SDK smoke script passed initialization, tool discovery, and one tool call for each server. All checks used the private internal marker. These calls are not external adoption.

The [latest cost guard run](https://github.com/palthainon/oldwebtech/actions/runs/38910385547) succeeded. Main retains its six-hour schedule. Latest cost telemetry reports $1.1080259818 at 14:41:34.9116208 UTC. This is delayed posted cost, not a current billing ceiling. The $25 monthly target and $20 pause threshold remain unchanged.

An aggregate workspace query returned 1,557 events in the preceding two hours. The latest event was at 15:00:49.971 UTC. This verifies telemetry availability, not completeness or external demand. Query: `AppEvents | where TimeGenerated > ago(2h) | summarize events=count(), latest=max(TimeGenerated)`.

## Submission blockers

[Smithery submission](https://smithery.ai/new) redirects to sign-in in both available browsers. The GitHub sign-in route requests email read access and write access to gists, stars, and watched repositories. No permission was granted. The user must establish a Smithery session under an acceptable account-access choice before submission can continue. No public Smithery listing was created or verified. Submission time, publication time, and approval delay are unknown.

[PulseMCP submission](https://www.pulsemcp.com/submit) states that new submissions and listing changes are paused. The notice was last updated September 3, 2026. It directs publishers to the official Registry for later automatic pickup. Automatic pickup is not a confirmed PulseMCP listing. No submission was sent.

The current three registry manifests retain the exact service descriptions and connection URLs. No paid service, account permission, tool behavior, quota, runtime phase, or pilot deadline changed. The approved end remains February 15, 2027 at 17:19:14 UTC.

The scheduled task names the older `mycode` checkout. Both checkout paths identify the same GitHub repository. This report uses the active `oldwebtech` checkout and fetched main.
