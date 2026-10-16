# Browser network simulator iterations

## 2026-10-12 — planning

- Researched Cisco's documented topology and simulation workflows and inspected OldWeb.tech's static Network Tools structure.
- Created the staged implementation plan. No simulator has been built or browser-tested yet.
- Next: implement the first useful topology and editor slice, then validate it in a browser.

## 2026-10-12 — editor foundation

- Added `nettools/network-simulator.html`, `network-simulator.css`, and `network-simulator.js` with a responsive workspace, three device types, a three-device sample, selection/details, add/remove/reset, pointer dragging, keyboard movement, and live status text.
- Checked JavaScript syntax with `node --check`; it passed. Confirmed the page uses the site's existing theme tokens.
- Browser validation was attempted but could not be completed: the browser security policy rejected the local `file:` URL. A local HTTP server also failed to bind (`EACCES`). No visual or interaction result is claimed.
- Next: validate the editor in an allowed browser environment, fix any usability issues, then add port connections and topology persistence.

## 2026-10-12 — port connections

- Added a small, separately testable topology model with PC, switch, and router ports. The editor now connects two selected devices, draws cables, lists port-to-port neighbors, and supports disconnecting. Removing a device also removes its cables.
- Added clear feedback for self-links, duplicates, missing devices, and devices with no free ports.
- `node --test nettools/network-topology.test.js` passed (2 tests); syntax checks passed for both JavaScript modules.
- Browser visual and interaction validation remains unverified. The prior run's browser security policy rejected this local page, and no permitted HTTP(S) preview URL has been provided. I did not retry through an alternate route.
- Next: get an allowed preview and validate editor usability; then add saved topology documents and device configuration.

## 2026-10-12 — IPv4 settings and local draft

- Added IPv4 address and prefix inputs for PC and router interfaces, plus a PC default gateway. The sample PCs now have addresses in `192.168.1.0/24`.
- Added a versioned topology document validator and automatic local draft save/load for devices, cables, positions, and settings. Invalid stored drafts fall back to the sample. Cloud save remains a later stage.
- Focused Node tests passed (5 total) for valid round trips, malformed addresses/prefixes, occupied ports, and connection rules. JavaScript syntax checks passed.
- Browser usability remains unverified: the prior browser security policy rejected opening this local page, and no allowed preview URL is available. No alternate browser route was attempted.
- Next: browser-check the current editor when an allowed preview exists, then build a deterministic ARP/ICMP packet engine against the versioned document.

## 2026-10-12 — first packet engine

- Added a pure deterministic same-subnet ping engine for PCs connected through switches. It traces ARP broadcast/reply, switch MAC learning and forwarding, and ICMP echo/reply. The UI now offers a PC-to-PC ping form with an ordered packet event list and a final result.
- Missing cables and subnet mismatches report specific failures; router forwarding is explicitly deferred. The trace clears when the topology changes so stale results are not mistaken for current behavior.
- `node --test nettools/network-*.test.js` passed (8 tests), including deterministic event order, successful ping, disconnected destination, and wrong subnet. JavaScript syntax checks passed.
- Browser interaction, layout, and accessibility remain unverified. The earlier browser policy rejected the local page, and no allowed HTTP(S) preview is available; no alternate access was attempted.
- Next: add step controls and packet details, then validate the full editor and trace in an allowed browser preview.

## 2026-10-12 — step-through packet details

- Added First, Previous, Next, and Last controls. The event list reveals steps in order and marks the current step; a detail panel shows protocol action, IP/MAC addresses, and ingress/egress ports.
- Added packet metadata to the deterministic simulation events and a small pure trace controller with boundary behavior.
- `node --test nettools/network-*.test.js` passed (10 tests); syntax checks passed. Tests cover event metadata, step order, first/last boundaries, and empty traces.
- Browser visual, keyboard, and accessibility checks remain unverified because the local-page browser policy rejected this workspace and no allowed HTTP(S) preview URL is available. No alternate route was attempted.
- Next: validate the interactive trace in an allowed browser preview, then add router forwarding and clearer packet-drop events.

## 2026-10-12 — one-router forwarding

- Added a routed example with two switches, two IPv4 subnets, a router, and configured PC gateways. The ping engine now traces ARP on each segment, router forwarding in both directions, and ICMP echo/reply with per-interface router MAC addresses.
- Missing source/return gateways, wrong gateway addresses, broken paths, and mask mismatches produce explicit failure reasons. The supported route is intentionally one router between directly connected subnets; multi-router routing protocols and route tables are later work.
- `node --test nettools/network-*.test.js` passed (12 tests), including forward and reverse routed pings and failure cases; JavaScript syntax checks passed.
- Browser visual, keyboard, and accessibility checks remain unverified. The prior browser policy rejected the local page, and no allowed HTTP(S) preview URL is available; no alternate route was attempted.
- Next: browser-validate the full workflow, correct any usability issues, then add a guided lab and site integration.

## 2026-10-12 — guided first-ping lab

- Added a guided lab that loads the two-PC sample, checks both switch cables and same-subnet addressing, and recognizes completion only after the learner runs a successful PC 1 to PC 2 ping. The UI shows each completed step and a specific next hint.
- Updated the page introduction to reflect that packet simulation now works. Moving a device saves its position without clearing the packet trace or lab completion; topology or configuration changes still invalidate stale results.
- `node --test nettools/network-*.test.js` passed (14 tests), including lab progression and wrong-address behavior. JavaScript syntax checks passed.
- Browser visual, keyboard, and accessibility checks remain unverified. The prior browser policy rejected the local page, and no allowed HTTP(S) preview URL is available; no alternate route was attempted.
- Next: use an allowed preview to validate the complete lab and responsive layout before adding the simulator to the Network Tools index. Then begin cloud save/share work from the Azure architecture proposal.

## 2026-10-12 — trace playback

- Added Play/Pause and Slow/Normal/Fast controls for the packet trace. Playback stops at the final event, can restart from the first event, and pauses when manual step controls are used or topology changes invalidate the trace.
- Highlighted the device handling the current event on the topology canvas. During automatic playback, the progress label stops issuing rapid screen-reader announcements; manual stepping remains announced.
- `node --test nettools/network-*.test.js` passed (15 tests), including fake-timer playback boundary and pause behavior. JavaScript syntax checks passed.
- Browser visual, keyboard, and accessibility checks remain unverified. The prior browser policy rejected the local page, and no allowed HTTP(S) preview URL is available; no alternate route was attempted.
- Next: validate the complete workflow in an allowed browser preview before linking it from Network Tools. Then implement the first Azure save/load API slice.

## 2026-10-12 — topology JSON import/export

- Added explicit JSON export and import controls. The topology document now has one normalized, versioned serialization path shared by file transfer and local autosave; unknown fields are removed on import.
- Import rejects malformed JSON, unsupported schema versions, invalid device/cable data, and files over 256 KiB before replacing the current design. The same boundary will be used by the future Azure save API.
- `node --test nettools/network-*.test.js` passed (17 tests), including round trip, normalization, and rejected imports. JavaScript syntax checks passed.
- Browser import/export, visual, keyboard, and accessibility checks remain unverified. The prior browser policy rejected the local page, and no allowed HTTP(S) preview URL is available; no alternate route was attempted.
- Next: validate the full user workflow in an allowed browser preview before site integration. Then implement cloud save/load behind the existing Azure API.

## 2026-10-13 — explicit source port cabling

- Added a source port selector for the selected device. A learner can now choose router `g0/0` or `g0/1` before choosing the second device, and the connection announcement names the chosen port.
- The topology model rejects unknown and occupied requested ports; the selector lists only free ports and disables Connect when none remain. Reset, sample load, import, cancel, and removal clear a pending port choice.
- `node --test nettools/network-*.test.js` passed (18 tests), including selected, occupied, and invalid router ports. JavaScript syntax checks passed.
- Browser success/failure workflows, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available.
- Next: validate cabling, ping, import/export, keyboard use, and responsive layout in an allowed browser preview; then address observed issues and add the site entry point.

## 2026-10-13 — step-visible same-subnet failures

- Added a final Drop event when a same-subnet ping fails because the source has no cable, ARP gets no answer, the ARP reply cannot return, or either ICMP leg cannot arrive. Each event identifies the protocol, device, packet addresses, and reason, so trace playback shows the failure point.
- `node --test nettools/network-*.test.js` passed (19 tests). New checks cover an uncabled source and the terminal ARP Drop after a missing destination cable. JavaScript syntax check passed.
- Browser success/failure workflows, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available.
- Next: validate trace playback and failure messaging in an allowed browser preview, then address usability findings and add the site entry point.

## 2026-10-13 — duplicate IPv4 detection on routed pings

- Moved duplicate destination PC address detection before local versus routed path selection. Both now stop with a step-visible IP Drop event that names the duplicate address instead of letting a routed ping report a false success.
- `node --test nettools/network-*.test.js` passed (20 tests), including duplicate destination addresses in local and routed scenarios. JavaScript syntax check passed.
- Browser success/failure workflows, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available.
- Next: validate duplicate-address and normal routed workflows in an allowed browser preview, then correct usability findings and add the site entry point.

## 2026-10-13 — routed return-path failure timing

- A routed ping with a missing or wrong destination gateway now traces the outbound ARP and echo request through the target PC before recording an IP Drop for its attempted echo reply. The Drop packet shows the reply's source and destination IPs, making the failed return path visible at the correct point.
- `node --test nettools/network-*.test.js` passed (20 tests), including an assertion that the target receives the request and sends no reply when its gateway is missing. JavaScript syntax check passed.
- Browser success/failure workflows, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available.
- Next: validate routed success and missing-gateway trace playback in an allowed browser preview, then fix observed usability issues and add the site entry point.

## 2026-10-13 — destination mask on routed replies

- After a routed echo request reaches its target, the engine now checks whether the target's mask incorrectly treats the source as local. If so, it records an IP Drop for the attempted reply and explains that the mask prevents use of the gateway. This removes a false successful ping for a broad destination mask.
- `node --test nettools/network-*.test.js` passed (21 tests), including a /16 destination with a source on the other router interface. JavaScript syntax check passed.
- Browser success/failure workflows, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available.
- Next: validate normal and wrong-mask routed traces in an allowed browser preview, then correct usability findings and add the site entry point.

## 2026-10-13 — topology undo and redo

- Added Undo and Redo controls for topology edits, including devices, cables, settings, sample loads, imports, and completed moves. History keeps up to 50 changes, ignores identical snapshots, and discards an abandoned redo branch after a new edit. A cancelled pointer drag returns the device to its original position.
- Undo/Redo reload validated topology snapshots, clear stale packet traces and pending cable choices, and update the local draft. History remains available during the page session even if local draft storage fails.
- `node --test nettools/network-*.test.js` passed (23 tests), including history branching and capacity. JavaScript syntax checks passed.
- Browser workflows, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available.
- Next: validate undo/redo after cabling, configuration, and drag in an allowed browser preview, then fix observed usability issues and add the site entry point.

## 2026-10-13 — switch MAC table in packet detail

- Switch forwarding events now capture a deterministic MAC table snapshot after learning the incoming frame's source address. The packet detail panel shows address-to-port entries for the selected switch event, so a learner can compare flooding before learning with forwarding after learning.
- `node --test nettools/network-*.test.js` passed (23 tests), including local and routed switch table assertions. JavaScript syntax checks passed.
- Browser packet inspection, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available.
- Next: validate the MAC table display and step controls in an allowed browser preview, then address observed usability issues and add the site entry point.

## 2026-10-13 — routed return-path lab

- Added a guided routed lab that loads the two-subnet topology with PC 2's gateway intentionally blank. The steps guide the learner to set the gateway to the router's interface address and require an observed successful PC 1 to PC 2 ping. The lab heading and explanation switch between first-ping and routed modes.
- The complete routed example remains available for exploration. Reset returns to the first-ping lab; topology edits still clear prior ping completion.
- `node --test nettools/network-*.test.js` passed (24 tests), including missing-gateway hints, gateway configuration, and successful completion. JavaScript syntax checks passed.
- Browser workflows, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available.
- Next: validate both guided labs, their mode switching, and routed failure/success traces in an allowed browser preview; then fix observed usability issues and add the site entry point.

## 2026-10-13 — selectable packet events

- Rendered revealed packet events as keyboard-focusable buttons. Selecting an earlier event pauses playback, jumps to that event, refreshes packet details and canvas highlight, and restores focus to the selected event. Future events remain hidden until reached by step or playback.
- `node --test nettools/network-*.test.js` passed (24 tests), including jumping backward and the resulting visible-event boundary. JavaScript syntax check passed.
- Browser click/keyboard workflows, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available.
- Next: validate event selection, focus, and trace playback in an allowed browser preview, then address findings and add the site entry point.

## 2026-10-13 — restored lab mode

- The guided panel now recognizes the routed lab topology when loading a local draft, importing JSON, or applying Undo/Redo. An in-progress routed lab therefore keeps its gateway instructions after reload, and history follows the restored topology's lab mode.
- `node --test nettools/network-*.test.js` passed (25 tests), including first-ping and routed mode detection. JavaScript syntax checks passed.
- Browser reload/import/Undo workflows, visual usability, and accessibility remain unverified. The prior browser security policy rejected the local file and expressly prohibited alternate routes; no permitted HTTP(S) preview is available. An HTTP(S) preview URL has been requested from the user.
- Next: validate lab mode persistence and event navigation in an allowed browser preview, then fix observed issues and add the site entry point.

## 2026-10-13 — duplicate source IPv4 detection

- A ping now checks both endpoint addresses for duplicates among PCs. A duplicate source address produces a step-visible IP Drop before ARP or ICMP, preventing a false success.
- `node --test nettools/network-*.test.js` passed (26 tests), including the new duplicate-source case and existing local/routed duplicate-destination cases. `node --check nettools/network-simulation.js` passed.
- Browser success/failure, layout, and keyboard checks remain unverified. The earlier browser policy prohibited alternate routes to the local page, and no allowed HTTP(S) preview URL is available.
- Next: validate both duplicate-address and normal ping workflows in an allowed browser preview, then fix observed usability issues and add the site entry point.

## 2026-10-14 — local browser validation

- Opened the merged simulator in the in-app browser through an approved loopback HTTP preview of this worktree. An uncabled PC 1 to PC 2 ping showed `PC 1 has no cable` and a single ARP Drop event.
- Connected PC 1 and PC 2 to Switch 1 using the canvas controls. The guided lab marked both cable steps complete; a ping succeeded and exposed a 12-event ARP/ICMP trace. Next showed the switch Flood event and its learned MAC table. Pressing Enter on the earlier event button returned the trace to event 1 and kept focus on that event.
- Added PC 3 with the same IPv4 address as PC 1. The next ping showed `Duplicate IPv4 address 192.168.1.10 on PC 1` and a single IP Drop. The lab correctly stopped showing completion. Visual inspection found the success and failure feedback readable at the default desktop viewport; browser console error list was empty.
- The earlier local preview attempts timed out because the sandboxed server could not accept loopback connections. An approved server outside the sandbox made the preview reachable. Mobile layout and the routed lab were not checked in this pass.
- Next: validate the routed lab and a narrow/mobile viewport, then address observed usability issues before adding the Network Tools entry point.

## 2026-10-14 — mobile topology spacing

- The routed lab showed the missing return gateway message and a 20-event trace. After PC 2 received gateway `192.168.2.1`, the ping succeeded with a 26-event trace and the lab completed.
- At a 390 px viewport, the routed topology compressed five device buttons into a 295 px canvas. Added a focusable horizontal scroll area with a 620 px mobile canvas and a scroll hint. The buttons now have separate positions; the page has no horizontal overflow. Arrow Right moved the focused scroll area. The mobile routed success and missing-gateway paths still worked; browser console errors were empty.
- `node --test nettools/network-*.test.js`: 26 passed, 0 failed. `git diff --check`: passed.
- Next: add the simulator entry point to Network Tools after checking its index layout and navigation in the browser.

## 2026-10-16 — Network Tools entry point

- Added a Network Simulator card to `nettools/index.html` so users can find the simulator from its category page.
- `node --test nettools/network-*.test.js`: 26 passed, 0 failed. `git diff --check`: passed after line ending cleanup.
- The browser index exposed the card with its description and correct simulator link. Keyboard activation reached `ERR_EMPTY_RESPONSE`; the browser policy then rejected the generated error page. Full navigation, return navigation, visual layout, and simulator success and failure checks remain unverified for this run.
- Next: restore a working preview and check the new card, return link, and simulator success and failure paths before adding the simulator to global search.

## 2026-10-16 — entry point browser validation

- Replaced the failed preview with a Node HTTP server on `127.0.0.1:8766`. Port 8765 was occupied. The new preview served the index, simulator, and assets successfully without a browser policy change.
- Enter on the Network Simulator card opened the simulator. The uncabled sample showed `PC 1 has no cable` and one Drop event. The routed example succeeded with 26 events. The Network Tools return link opened the index. The desktop card text and Open control fit the existing grid. Browser console errors were empty.
- The card code is unchanged from the run with 26 passing simulator tests. This browser check resolves the previous navigation limitation.
- Next: add the simulator to global search and verify search results and keyboard navigation.
