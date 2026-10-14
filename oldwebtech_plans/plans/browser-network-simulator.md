# Browser network simulator plan

## Goal

Build an original, free network learning simulator within OldWeb.tech's Network Tools. Reproduce the useful learning loop of Cisco Packet Tracer: draw a network, configure it, inject traffic, and inspect each hop and protocol event. Use original naming, icons, interface design, and simulation code. Describe it as a browser network simulator, not as Cisco Packet Tracer or a compatible replacement.

## Site fit

- Add `nettools/network-simulator.html` and small local JS/CSS modules under `nettools/`.
- Add a card to `nettools/index.html` after the core experience works.
- Reuse `theme.css`, `a11y.css`, `a11y-utils.js`, and `navigationv2.js` conventions. The simulator can use a backend for saving and sharing; packet execution should remain deterministic and responsive in the browser.
- Avoid changes to the in-progress feedback/API files.

## First useful slice

A learner places two PCs and one switch on a canvas, connects ports, assigns IPv4 addresses and masks, sends a ping, and can step through ARP and ICMP events. A second scenario adds a router, two subnets, interface addresses, and default gateways. Incorrect cabling or addressing produces a visible drop reason.

## Architecture

1. **Topology document:** versioned JSON containing nodes, ports, links, positions, device settings, and scenario metadata. Validate every loaded document. Local autosave can support unsaved work; cloud saves and share links are first-class capabilities. JSON download/import is optional.
2. **Editor:** pointer and keyboard placement, selection, drag, connect, delete, undo/redo, zoom/pan, and a device/port inspector. SVG is a good first canvas for a modest topology and accessible DOM labels.
3. **Simulation engine:** pure deterministic JavaScript, separate from rendering. Model discrete events and a queue. Start with Ethernet frames, MAC learning/flooding, ARP request/reply, IPv4 subnet/gateway decisions, ICMP echo/reply, and router forwarding. Each event records its cause, device, ingress/egress port, headers, table changes, and outcome.
4. **Views:** Real-time runs the event queue automatically; Step mode provides next, back/reset, play/pause, speed, protocol filters, event list, and a packet detail panel. Back can initially replay from the immutable starting snapshot.
5. **Teaching layer:** small sample labs with expected outcomes and guided hints. Explanations should distinguish simulated behavior from actual equipment behavior.
6. **Cloud persistence and sharing:** follow [the Azure architecture proposal](browser-network-simulator-azure-architecture.md). Use the existing Static Web Apps managed API for the first cloud slice, private Blob Storage for documents, and Table Storage for owner/share metadata. Keep storage credentials and authorization in the backend; never ship them to browser code. Defer direct Blob transfers and user-delegation SAS until a separate managed-identity backend is justified.

## Iteration order and acceptance checks

| Stage | Deliverable | Browser check |
| --- | --- | --- |
| 1 | Shell, responsive canvas, device palette, sample topology | Add/move/remove devices; keyboard focus and mobile layout work |
| 2 | Port connections, configuration inspector, autosave/import/export | Save/reload and JSON round trip preserve topology; invalid links show errors |
| 3 | Deterministic Ethernet/ARP/ICMP engine | Same scenario yields same ordered events; working ping and missing-link failure |
| 4 | Step controls and packet/event inspection | Trace ARP then ICMP; each hop and drop reason is understandable |
| 5 | Router, subnet and gateway behavior | Same-subnet and cross-subnet ping; missing gateway and wrong mask fail correctly |
| 6 | Guided labs, polish, accessibility, integration into Network Tools | Complete a lab by browser only; desktop/mobile and keyboard checks |
| 7 | Cloud save/load and share links | Save and reopen a design; shared link loads the intended snapshot; malformed and unauthorized requests fail cleanly |

## Daily improvement loop

1. Read this plan, the simulator code, and `oldwebtech_plans/plans/browser-network-simulator-iterations.md`. Check the Git status. Keep unrelated changes intact.
2. Start with the next priority in the iteration log. Reproduce one user problem or identify one missing acceptance check. State the expected result before editing.
3. Make one bounded change in a worktree when possible. Prefer packet correctness and clear feedback before new device types.
4. Run focused tests for the changed behavior. Run the existing simulator test suite. Fix regressions before continuing.
5. If an allowed HTTP(S) preview is available, test one success path and one failure path in a browser. Check the relevant layout, keyboard control, and browser errors. Record what the browser showed. Do not treat unit tests as browser evidence.
6. Record the change, test commands and results, browser findings or access limit, remaining risk, and one next priority in the iteration log. Keep the change local. Do not deploy or publish.

Stop after one verified improvement. If a required file is missing, report the missing file before recreating it. If tests fail and the failure cannot be fixed in this run, record the failure and leave the work for review.

## Scope boundaries

The first release models learning behavior, not vendor firmware or real packet emission. Defer physical racks/geography, large protocol catalogs, wireless/IoT, multiuser sessions, proprietary `.pkt` files, and full IOS CLI emulation. Add protocols only when the basic event model and teaching workflow are reliable. Cloud sharing need not copy the rest of the site's local-only tool pattern.

## Research basis

- [Cisco Packet Tracer data sheet](https://www.cisco.com/c/dam/en_us/training-events/netacad/course_catalog/docs/Cisco_PacketTracer_DS.pdf): logical/physical workspaces and real-time/simulation modes.
- [Cisco Networking Academy PDU exercise](https://contenthub.netacad.com/legacy/I2PT/1.1/en/course/files/3.1.1.3%20Packet%20Tracer%20-%20Explore%20Network%20Functionality%20Using%20PDUs.pdf): event list, packet detail inspection, and stepping through PDUs.
- [Cisco introductory activity](https://contenthub.netacad.com/legacy/NetEss/1.0/en/course/files/3.5.2.4%20Packet%20Tracer%20-%20Learn%20to%20Use%20Packet%20Tracer.pdf): simple PDU workflow and ARP/ICMP distinction.
- [Azure Static Web Apps API support](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-functions): integrated Azure Functions can back save/load endpoints.
- [Azure Blob Storage security recommendations](https://learn.microsoft.com/en-us/azure/storage/blobs/security-recommendations): private storage and limited delegated access.
