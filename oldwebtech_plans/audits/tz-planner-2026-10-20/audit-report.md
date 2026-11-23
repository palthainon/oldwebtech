# Meeting planner usability review

The next change should make the timeline usable for choosing a time. Fix the narrow layout in the same change. Change Add Timezone to open a search field with focus.

Scope: Local Timezone Meeting Planner at revision 4add881 with the uncommitted UTC and timeline changes. Audit date: October 20, 2026, America/New_York. One expert evaluator used Chrome on Windows as an anonymous organizer. The default desktop viewport and a 390 × 844 viewport were tested. The narrow viewport was not a real phone. The local test address used port 8767. No production records changed.

## Ranked recommendations

1. Make timeline cells selectable. Add previous and next controls in 30-minute steps. Keep the date field synchronized. Support the keyboard. The current timeline only displays times.
2. Fix the narrow timeline. Use short city labels. Keep the selected time clear of the fixed name column. Add a visible control to return to the meeting column after scrolling or resizing.
3. Open search when the user selects Add Timezone. Put focus in the new field. Show city names with their zone and offset. Do not choose an unrelated city for the user.
4. Remove duplicate default zones. The initial New York home zone also appears in the comparison list.
5. Add duration and working hours for each zone. Show the interval that fits every participant. This is a proposed feature. The current page checks a single start time against fixed hours.

The findings register contains reproduction steps, impact, severity, and acceptance criteria. All designs above are recommendations, not tested improvements. Severity uses a 1–4 scale. No critical issue was confirmed. Frequency reflects exposure inferred from the tested states, not participant measurements.

## Evidence record

E1: Initial accessibility snapshot showed New York as home and as comparison row 2. Los Angeles and UTC were the other defaults. The timeline exposed table cells with no selection controls. Its caption stated that it shows 12 hours before and after the meeting. Business hours were fixed at 9 AM–5 PM. There was no duration input.

E2: Clicking Add Timezone inserted America/Denver as row 4. Focus remained on Add Timezone. Reloading retained Denver. The test used only disposable local data.

E3: At 390 × 844, the timeline region measured 310 pixels wide. Its fixed zone column measured approximately 184 pixels. After changing from desktop width, the meeting cell began at x=600 while the region ended at x=343. After reload, the meeting cell began at x=212 while the fixed label ended at x=217. The label therefore covered the first few pixels of the selected time. Measurements came from rendered element rectangles through the browser tool.

E4: The desktop screenshot showed a long input section, comparison rows, then the timeline. Copy appeared separately on each row. The screenshot was displayed in the chat tool output. No image file was exported. Screenshot capture timed out after the narrow viewport was set. The report uses text evidence for that state.

## Coverage and limits

The audit covered default content, adding a zone, saved zone reload, timeline presentation, and narrow layout. Search editing was inconclusive: automated typing changed the displayed field but did not consistently commit a zone change. Do not treat this result as a confirmed product defect. A manual search test is required before selecting a search implementation.

Accessibility checks were partial. Table headers and field labels appeared in the document snapshot. The business-hours states include text and symbols. Keyboard focus was visible on Copy. Full keyboard operation, screen-reader output, contrast ratios, zoom, and touch target measurements remain untested. This review does not establish conformance with WCAG 2.2, the web accessibility standard. New timeline controls must preserve a meaningful focus order. See the [W3C focus-order guidance](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html).

No participant research occurred. No human timing, completion rate, or survey score is claimed. The study plan defines the pending work. No page fixes were made during this audit.

## Retest

Use the original scenarios in findings.csv. Verify the stated acceptance criteria at desktop width and 390 pixels. Test with a keyboard. Compare dates across midnight. Include a zone with a half-hour offset. Check reload after selecting a time. Record fixed, partly fixed, still present, unable to verify, or regression for each finding.
