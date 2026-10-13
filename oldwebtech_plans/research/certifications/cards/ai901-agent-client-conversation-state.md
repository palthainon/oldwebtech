---
card_id: ai901-agent-client-conversation-state
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Create a lightweight client application for an agent"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- In a lightweight Python client, initialize `AIProjectClient` with the Foundry project endpoint and an Azure credential, then call `get_openai_client(agent_name=...)` to bind the Responses API client to the named agent. Create a conversation and pass its ID on each response request when follow-up turns should use the same history.

## Defaults or baseline

- The current Foundry SDK quickstart uses Azure AI Projects 2.x (`azure-ai-projects>=2.3.0`) and `DefaultAzureCredential`; its sample agent client carries conversation context by reusing one conversation ID across calls.

## Gotchas

- Reusing the agent-bound client does not itself carry the same conversation history if a new conversation is created for each turn. The quickstart uses a client without `agent_name` for its separate model-chat sample; use the named-agent binding for this agent flow.

## Verify

- In the Microsoft Foundry SDK quickstart, follow **Install and authenticate** and **Chat with an agent**. Confirm the project endpoint and credential initialize the SDK, the OpenAI client is bound with `agent_name`, and two `responses.create` calls using the same `conversation.id` demonstrate a follow-up turn. No live Azure session was run.

## Applies to

- AI-901 skills measured as of April 15, 2026: **Implement generative AI apps and agents by using Foundry** > **Create a lightweight client application for an agent**. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: "AI-901 includes creating a lightweight client application for an agent."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Implement AI solutions by using Microsoft Foundry > Implement generative AI apps and agents by using Foundry > Create a lightweight client application for an agent"
    source_version: "Skills measured 2026-04-15; page updated 2026-07-13"
    checked_on: 2026-10-13
  - claim: "The current quickstart uses Azure AI Projects 2.x and lists azure-ai-projects>=2.3.0 with DefaultAzureCredential for the Python path."
    source: "https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code"
    locator: "Install and authenticate > Python package command and sign-in steps; note that Azure AI Projects 2.x is incompatible with 1.x"
    source_version: "Microsoft Learn, updated 2026-09-04"
    checked_on: 2026-10-13
  - claim: "The Python agent-client sample creates AIProjectClient with the project endpoint and DefaultAzureCredential, then binds the OpenAI client using get_openai_client(agent_name=...)."
    source: "https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code"
    locator: "Chat with an agent > Python sample, AIProjectClient setup and 'Get an OpenAI client pre-bound to the specified agent'"
    source_version: "Microsoft Learn, updated 2026-09-04"
    checked_on: 2026-10-13
  - claim: "The sample creates a conversation, passes its ID into Responses API calls, and reuses that ID for a related follow-up; the quickstart states the conversation maintains history across turns."
    source: "https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code"
    locator: "Chat with an agent > Python sample, conversation creation and consecutive responses.create calls; closing verification steps"
    source_version: "Microsoft Learn, updated 2026-09-04"
    checked_on: 2026-10-13
  - claim: "The quickstart's separate model-chat Python sample obtains the OpenAI client without agent_name and passes a model name, while the agent-chat sample binds agent_name."
    source: "https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code"
    locator: "Chat with a model > Python sample, get_openai_client() and responses.create(model=...); Chat with an agent > Python sample, get_openai_client(agent_name=...)"
    source_version: "Microsoft Learn, updated 2026-09-04"
    checked_on: 2026-10-13
```
