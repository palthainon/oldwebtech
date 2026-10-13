---
card_id: aif-c01-mcp-connects-agent-tools-and-data
certification_id: aif-c01
exam_version: "AIF-C01 revision 1.1"
objective_ids: ["2.1.6 Define foundational agentic AI concepts"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- In an agentic application, Model Context Protocol (MCP) provides a standardized connection interface through which an agent can discover and invoke tools exposed by an external system. An MCP server can also expose resources that the agent can read, such as reference data.
- For example, an operations agent can use an MCP-connected service to look up a deployment status through a tool and read a service catalog resource, then use those results in its response or workflow.

## Defaults or baseline

- MCP lets a client list available server capabilities and request a specific tool or resource. Availability alone does not mean every tool runs for every request.

## Gotchas

- Treating MCP as the agent's reasoning engine confuses the connection interface with the agent. In the cited Bedrock tool-use flow, the model selects when a tool is useful, while the application or Bedrock executes it and returns the result.

## Verify

- In the AgentCore Gateway guide, inspect the MCP operation list: `tools/list` discovers available tools, `tools/call` invokes a selected tool, and `resources/read` reads a resource by URI. Compare this with Bedrock's tool-use flow, where the model requests a tool and client code or Bedrock executes it and returns the result.

## Applies to

- AIF-C01 revision 1.1, Objective 2.1.6: foundational agentic AI concepts, specifically MCP's role in connecting agents to external systems.

## Evidence

```yaml
evidence:
  - claim: AIF-C01 revision 1.1 includes Objective 2.1.6, naming MCP's role in connecting agents to external systems.
    source: https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html
    locator: Task Statement 2.1 > Objectives, final bullet (Objective 2.1.6 in the exam guide PDF)
    source_version: AIF-C01 revision 1.1; current online exam guide checked 2026-10-12
    checked_on: 2026-10-12
  - claim: Revision 1.1 was published April 30, 2026, and added Objective 2.1.6.
    source: https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/aif-01-revisions.html
    locator: Change History table; Changes to objectives > Objectives added
    source_version: AIF-C01 exam guide revision history, current online page checked 2026-10-12
    checked_on: 2026-10-12
  - claim: MCP is a standardized way for agents to discover and invoke tools exposed through an AgentCore Gateway.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-using.html
    locator: Opening paragraph; operations table, `tools/list` and `tools/call` rows
    source_version: Amazon Bedrock AgentCore Developer Guide, live documentation checked 2026-10-12
    checked_on: 2026-10-12
  - claim: MCP resources expose data and content to clients and are identified by URIs.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/mcp-stateful-features.html
    locator: MCP features overview > Resources
    source_version: Amazon Bedrock AgentCore Developer Guide, live documentation checked 2026-10-12
    checked_on: 2026-10-12
  - claim: An AgentCore gateway can list resources and read a selected resource by URI.
    source: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-using.html
    locator: Use an AgentCore gateway > operations table, `resources/list` and `resources/read` rows
    source_version: Amazon Bedrock AgentCore Developer Guide, live documentation checked 2026-10-12
    checked_on: 2026-10-12
  - claim: Tool availability does not mean the model directly executes tools; the model selects a useful tool and the client application or Bedrock executes it and returns the result.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html
    locator: Opening explanation under “Use a tool to complete an Amazon Bedrock model response”
    source_version: Amazon Bedrock User Guide, live documentation checked 2026-10-12
    checked_on: 2026-10-12
```
