---
card_id: ai901-deployment-name-routes-inference
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Deploy a model and interact with it in the Foundry portal"]
status: verified
reviewed_on: 2026-10-12
---

# Behavior

- In the Foundry portal, choose a model, create a deployment, and confirm that its status is Succeeded before testing it in the playground. When calling that deployment from code, pass its **deployment name** in the request's `model` parameter.

# Defaults or baseline

- Foundry initially uses the model name as the deployment name, but the deployment name can be changed during setup.

# Gotchas

- The catalog model name and the deployment name can differ. A client should use the selected deployment's name to route its inference request; assuming that the catalog name always works can address the wrong name.

# Verify

- In a Foundry project, inspect a deployment with a distinct name, confirm Succeeded, test a prompt in its playground, and inspect the Code tab for the deployment's endpoint and request details. No live Azure deployment was created for this card.

# Applies to

- AI-901: Implement AI solutions by using Microsoft Foundry / Implement generative AI apps and agents by using Foundry / Deploy a model and interact with it in the Foundry portal. No questions linked yet.

# Evidence

```yaml
evidence:
  - claim: "AI-901 tests deploying a model and interacting with it in the Foundry portal."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Implement AI solutions by using Microsoft Foundry > Implement generative AI apps and agents by using Foundry"
    source_version: "Skills measured 2026-04-15; page updated 2026-07-13"
    checked_on: 2026-10-12
  - claim: "The portal workflow selects a catalog model, creates a deployment, checks Succeeded, and then tests the deployed model in the playground."
    source: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/deploy-foundry-models"
    locator: "Deploy a model, steps 2-7; Test the deployment in the playground, steps 1-3"
    source_version: "Microsoft Foundry documentation updated 2026-07-28"
    checked_on: 2026-10-12
  - claim: "The deployment defaults to the model name but can be renamed before creation; inference requests use the deployment name in the model parameter."
    source: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/deploy-foundry-models"
    locator: "Deploy a model, step 6"
    source_version: "Microsoft Foundry documentation updated 2026-07-28"
    checked_on: 2026-10-12
  - claim: "The playground's Code tab shows details for programmatic access to the selected deployment."
    source: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/deploy-foundry-models"
    locator: "Test the deployment in the playground, step 3"
    source_version: "Microsoft Foundry documentation updated 2026-07-28"
    checked_on: 2026-10-12
```
