// Original scoped practice. New items require independent review before release.
window.CERT_BANK = {
  "id": "pl300-pilot",
  "vendor": "Microsoft",
  "exam": "PL-300 scoped pilot",
  "code": "PL-300 (2026-04-20)",
  "asOf": "2026-10",
  "examVersion": "2026-04-20",
  "status": "published",
  "objectivesUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300",
  "scope": "Thirteen narrow behaviors. This pilot does not cover the full exam or predict exam readiness.",
  "domains": [
    {
      "id": "1",
      "name": "Prepare the data",
      "weight": 27.5
    },
    {
      "id": "2",
      "name": "Model the data",
      "weight": 27.5
    },
    {
      "id": "3",
      "name": "Visualize and analyze the data",
      "weight": 27.5
    },
    {
      "id": "4",
      "name": "Manage and secure Power BI",
      "weight": 17.5
    }
  ],
  "questions": [
    {
      "id": "pl300-pilot-001",
      "domain": "1",
      "objective": "Merge and append queries",
      "type": "single",
      "q": "A repair shop appends two monthly tables in Power Query. Both tables contain the same fields, but the second table lists the columns in reverse order. The header names match exactly. What determines how the appended values line up?",
      "choices": [
        "The position of each column",
        "The column header names",
        "The first value in each column",
        "The number of rows in each table"
      ],
      "answer": [
        1
      ],
      "explain": "Append matches columns by header name. A different column order does not change this match.",
      "why": [
        "Column position does not control append alignment.",
        "Correct. Matching header names identify the same output column.",
        "The first value does not define the output column match.",
        "Row counts do not define the output column match."
      ],
      "cardIds": [
        "pl-300-append-aligns-column-names"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-query/append-queries",
          "locator": "Append two tables, paragraph after the Append dialog example",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-002",
      "domain": "1",
      "objective": "Identify when to use reference or duplicate queries and the resulting impact",
      "type": "single",
      "q": "A Power BI Desktop model loads Open Rentals and Completed Rentals from two queries. Both queries reference a staging query with load disabled. The author expects refresh to fetch the staging result once for both queries. Which assessment is correct?",
      "choices": [
        "Load disabled guarantees one shared result.",
        "References guarantee no source requests during refresh.",
        "The queries run separately, so one shared fetch is not guaranteed.",
        "Exactly two source requests must occur on every refresh."
      ],
      "answer": [
        2
      ],
      "explain": "References reuse query logic. They do not guarantee one shared result during refresh. Caching can affect source requests.",
      "why": [
        "Disabling load does not make the staging result a shared stored result.",
        "Referenced steps can still retrieve source data.",
        "Correct. Separate query execution prevents this guarantee.",
        "Caching and query execution prevent a fixed request count from being assumed."
      ],
      "cardIds": [
        "pl-300-reference-query-not-shared-refresh"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/guidance/power-query-referenced-queries",
          "locator": "Scenario, separate query executions and caching note",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-003",
      "domain": "2",
      "objective": "Implement role-playing dimensions",
      "type": "single",
      "q": "An equipment rental report must filter rentals by pickup month and return month at the same time. The author wants separate slicers for both roles. Which model design follows Microsoft guidance for simultaneous role filtering?",
      "choices": [
        "Separate Pickup Date and Return Date tables, each with an active relationship to Rentals",
        "One Date table with only the pickup relationship active and no measure that uses the return relationship",
        "Separate date tables with both relationships inactive and no activating measure",
        "One Date table with only the return relationship active and no measure that uses the pickup relationship"
      ],
      "answer": [
        0
      ],
      "explain": "Separate dimension tables let each date role filter the fact table through its own active relationship.",
      "why": [
        "Correct. Each role has its own active filter path.",
        "The inactive return relationship does not automatically carry the return filter.",
        "Inactive relationships do not automatically propagate the slicer filters.",
        "The inactive pickup relationship does not automatically carry the pickup filter."
      ],
      "cardIds": [
        "pl300-role-playing-dates-active-relationships"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive",
          "locator": "Opening paragraph; Active relationships, simultaneous role filtering and improved model; Refactoring methodology steps 3-4",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-004",
      "domain": "4",
      "objective": "Implement row-level security roles",
      "type": "single",
      "q": "A report consumer is subject to row-level security (RLS). One assigned role permits only workshop A records. Another assigned role permits only workshop B records. The workshops have distinct records. With no other filters, which records can the consumer see?",
      "choices": [
        "No records, because no record belongs to both workshops",
        "Only workshop A records, because its role was assigned first",
        "Only workshop B records, because its role was assigned last",
        "Records from both workshop A and workshop B"
      ],
      "answer": [
        3
      ],
      "explain": "Multiple RLS role filters combine additively. The consumer sees the union of the rows that the assigned roles permit.",
      "why": [
        "The filters do not require a row to satisfy both roles.",
        "Role assignment order does not make the first role override the other role.",
        "Role assignment order does not make the last role override the other role.",
        "Correct. Either role can permit a row."
      ],
      "cardIds": [
        "pl-300-rls-multiple-role-union"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/guidance/rls-guidance",
          "locator": "Create roles, paragraph on additive filters and union",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-005",
      "domain": "3",
      "objective": "Select an appropriate visual",
      "type": "single",
      "q": "A lake monitoring report has one temperature reading for each day. The reader needs to see the shape of temperature changes across the month. Which design best meets this need?",
      "choices": [
        "A donut chart showing each day as a share of the monthly total",
        "A single card showing only the latest reading",
        "A line chart with dates on the horizontal axis",
        "A table of temperatures sorted by value with dates hidden"
      ],
      "answer": [
        2
      ],
      "explain": "A line chart shows the shape of values over time. A date axis preserves the time sequence.",
      "why": [
        "A share of a total does not show the requested time trend.",
        "One reading omits the changes across the month.",
        "Correct. This design presents readings in time order as a trend.",
        "Sorting by temperature and hiding dates removes the time sequence."
      ],
      "cardIds": [
        "pl300-line-chart-time-trend"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview",
          "locator": "Charts for comparison and trends > Line charts; Charts for part-to-whole relationships > Pie and donut charts",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-006",
      "domain": "3",
      "objective": "Edit and configure interactions between visuals",
      "type": "single",
      "q": "A report author selects a region in a bar chart. A nearby table should respond, but a comparison column chart must remain unchanged by that selection. The author selects the bar chart and opens Edit interactions. What should the author set on the comparison column chart?",
      "choices": [
        "None",
        "Filter",
        "Highlight",
        "Filter on every visual on the page"
      ],
      "answer": [
        0
      ],
      "explain": "None prevents the selected source visual from affecting the chosen target. Other configured interactions can remain active.",
      "why": [
        "Correct. This disables the source-to-target interaction for the comparison column chart.",
        "Filter would let the source selection affect the comparison column chart.",
        "Highlight would let the source selection affect the comparison column chart.",
        "Filtering every target would also affect the comparison column chart."
      ],
      "cardIds": [
        "pl300-disable-visual-interaction"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions",
          "locator": "Change the interaction behavior, source selection paragraph and None option",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-007",
      "domain": "3",
      "objective": "Configure drillthrough navigation, including pages, filters, and buttons",
      "type": "single",
      "q": "A report has a summary table with a nonaggregated Pump ID field. The author creates a Pump Details page. Users must right-click a pump in the summary to open details for that pump. Which target-page setup establishes the drillthrough field?",
      "choices": [
        "Rename the page title to Pump ID without adding a field",
        "Put a count of pumps in a card without a drillthrough field",
        "Add only a page-navigation button",
        "Add the same Pump ID field to the Drillthrough filters well"
      ],
      "answer": [
        3
      ],
      "explain": "The target drillthrough well must contain the field used by the source visual. The selected pump then supplies the detail context.",
      "why": [
        "A page title does not configure a drillthrough field.",
        "An aggregate count does not define the required field in the target well.",
        "Page navigation alone does not establish the drillthrough field.",
        "Correct. This links drillthrough to the source field."
      ],
      "cardIds": [
        "pl300-drillthrough-target-field"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-drillthrough",
          "locator": "Create a drillthrough page, steps 5-7; Use drillthrough from a visual, steps 1-6 and note; Troubleshooting > Drillthrough page does not appear in the context menu",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-008",
      "domain": "3",
      "objective": "Configure bookmarks",
      "type": "single",
      "q": "A report bookmark switches between a chart and a table on the same page. Users choose a date range in a slicer before switching. The date range must stay as the user selected it. Which bookmark settings fit?",
      "choices": [
        "Enable Data and disable Display",
        "Disable Data and enable Display",
        "Enable Data and Display",
        "Disable Data and Display"
      ],
      "answer": [
        1
      ],
      "explain": "Data controls stored filter and slicer states. Display controls visual visibility. Disabling Data preserves the current slicer selection while Display changes the view.",
      "why": [
        "Data can restore the stored date range, while disabled Display does not restore the visibility view.",
        "Correct. The bookmark changes visibility without restoring its saved slicer state.",
        "Data can reset the date range to the stored selection.",
        "With Display disabled, the bookmark does not restore the chart and table visibility settings."
      ],
      "cardIds": [
        "pl300-bookmark-preserve-slicers"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks",
          "locator": "Create report bookmarks, bookmark options list: Data and Display; paragraph after the options list",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-009",
      "domain": "3",
      "objective": "Design and configure Power BI reports for accessibility",
      "type": "single",
      "q": "Keyboard users reach decorative border shapes before they reach the report controls. The shapes convey no information. The author wants to keep them visible. Which change improves navigation?",
      "choices": [
        "Remove the report controls from the tab order",
        "Keep every shape as a keyboard stop",
        "Use the Selection pane to remove the decorative shapes from the tab order",
        "Move the shapes before the controls in the tab order"
      ],
      "answer": [
        2
      ],
      "explain": "Purely decorative objects should not add keyboard stops. The Selection pane lets the author remove objects from tab order.",
      "why": [
        "Removing useful controls would make keyboard navigation less useful.",
        "Keeping the decoration in the tab order retains the unnecessary stops.",
        "Correct. The shapes remain decoration without taking keyboard stops.",
        "Putting decoration first preserves the reported problem."
      ],
      "cardIds": [
        "pl300-accessibility-tab-order"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-creating-reports",
          "locator": "Tab order; Shapes",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-010",
      "domain": "3",
      "objective": "Apply conditional formatting",
      "type": "single",
      "q": "A Power BI table displays a completion measure as a percentage. The measure stores 60% as 0.60. A font-color rule must use a fixed threshold of 60% completion, regardless of the minimum and maximum values in the table. Which boundary setting fits?",
      "choices": [
        "60 with Percent",
        "0.60 with Percent",
        "60 with Number",
        "0.60 with Number"
      ],
      "answer": [
        3
      ],
      "explain": "Percentage measures use their decimal values in Number rule boundaries. Percent instead defines a position within the range of values.",
      "why": [
        "Percent describes the value range rather than the fixed completion threshold.",
        "Percent still uses the range even when the entered value is a decimal.",
        "The stored threshold is 0.60, not 60.",
        "Correct. This compares the measure to its stored decimal threshold."
      ],
      "cardIds": [
        "pl300-percentage-format-rule-number"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting",
          "locator": "Color by rules for percentages; Color by rules, paragraph beginning When you select Percent",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-011",
      "domain": "3",
      "objective": "Create custom tooltips",
      "type": "single",
      "q": "An author creates a report page with the Tooltip size template. The author adds visuals and compatible Tooltip fields. The Page Information Tooltip setting is still Off. Which change registers the page as a report tooltip?",
      "choices": [
        "Turn Tooltip On in Page Information",
        "Rename the page to Tooltip",
        "Change the page view to Actual Size only",
        "Make the canvas smaller without changing Page Information"
      ],
      "answer": [
        0
      ],
      "explain": "The Tooltip canvas template sets the size. The Page Information Tooltip setting registers the page for tooltip use.",
      "why": [
        "Correct. This is the registration setting.",
        "The page name does not enable the Tooltip setting.",
        "Actual Size changes the author view, not tooltip registration.",
        "Changing canvas size does not enable tooltip registration."
      ],
      "cardIds": [
        "pl300-tooltip-page-enable"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips",
          "locator": "Create a report tooltip page, steps 2-3; Configure your tooltip report page, steps 1-2",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-012",
      "domain": "3",
      "objective": "Apply sorting to visuals",
      "type": "single",
      "q": "A Power BI Desktop chart uses Phase labels. The required order is Intake, Test, Repair. Phase Order maps Intake to 1, Test to 2, and Repair to 3. The chart is sorted ascending by Phase, but the labels appear alphabetically. Which model setting gives Phase the required order?",
      "choices": [
        "Set Phase Order to sort by Phase",
        "Set Phase to sort by Phase Order",
        "Change the chart to sort by the repair-cost measure",
        "Sort Phase descending alphabetically"
      ],
      "answer": [
        1
      ],
      "explain": "Set Sort by Column on the label column and select its order column. The label and order columns have the same level of detail.",
      "why": [
        "This reverses the label and order roles.",
        "Correct. Phase uses its numeric ordering column.",
        "Cost order does not define the required phase sequence.",
        "Reverse alphabetical order does not produce Intake, Test, Repair."
      ],
      "cardIds": [
        "pl300-sort-label-by-order-column"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-sort-by-column",
          "locator": "Set the column to use for sorting, opening paragraph and steps 1-3; Troubleshooting sort by column > Sort by column produces unexpected grouping",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    },
    {
      "id": "pl300-pilot-013",
      "domain": "3",
      "objective": "Configure sync slicers",
      "type": "single",
      "q": "A Region slicer is visible on the Overview page. In Sync slicers, the Details page has Sync selected and Visible cleared. A user selects North on Overview. What should the author expect on Details?",
      "choices": [
        "The filter applies only if the slicer is visible on Details",
        "Clearing Visible removes the sync selection automatically",
        "The synced Region selection filters Details even though the slicer is hidden",
        "The Details page receives every region because the slicer is hidden"
      ],
      "answer": [
        2
      ],
      "explain": "Sync controls where selections apply. Visible controls where the slicer appears. A hidden synced slicer still filters its page.",
      "why": [
        "Visibility is not required for the synced filter to apply.",
        "Sync and Visible are separate settings.",
        "Correct. The hidden slicer still applies the synced selection.",
        "Hiding the slicer does not clear its selection or disable its filter."
      ],
      "cardIds": [
        "pl300-synced-hidden-slicer-filter"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers",
          "locator": "Sync and use slicers on other pages, steps 3-4 and Note",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "published"
    }
  ]
};
