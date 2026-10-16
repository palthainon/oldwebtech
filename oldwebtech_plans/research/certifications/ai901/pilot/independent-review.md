# AI-901 pilot independent content review

AI-901 is the Microsoft Azure AI Fundamentals exam. Reviewer: the independent `pilot_review` agent. Review date: October 16, 2026. Result: all 14 questions pass content review after corrections.

The reviewer checked every stem, answer, explanation, and choice rationale against the primary Microsoft sources below. Each item has one best answer under its stated conditions. The items test distinct behaviors. The reviewer found no copied source example or duplicate behavior within this pilot. A separate validator checks similarity with the legacy banks.

The [study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901#skills-measured-as-of-april-15-2026) still uses April 15, 2026 objectives. Each leaf objective matches the guide. Question 001 maps to the responsible AI heading. It does not establish coverage of its six leaf objectives. All coverage remains partial.

## Per-question result

Question IDs use the prefix `ai901-pilot-`. Answer letters refer to the stored choice order.

| Question | Answer | Result and claim checked | Primary source and section |
| --- | --- | --- | --- |
| 001 | A | Pass. Approval points belong in design. Later error reports or content tests do not define the initial action approval flow. The museum scenario contains no privacy decision. | [Responsible AI](https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai), Design responsible AI from the start |
| 002 | C | Pass. Grounding traces a field to its source. Confidence supports assessment. A schema, deployment name, or valid syntax does not prove value accuracy. | [Content Understanding](https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview), Key components of Content Understanding, Confidence scores and Grounding |
| 003 | B | Pass. A configured text prompt agent needs no agent runtime code. Hosted or externally hosted code adds maintenance. The spoken-agent choice does not meet the stated text requirement. | [Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/overview), Agent types, Prompt agents, Voice-based prompt agents, and Compare agent types |
| 004 | D | Pass. Instruction placement is a pattern to evaluate. Neither a universal guarantee nor a universal lack of effect follows. The stem now excludes reasoning models. | [Prompt engineering](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering), opening note, Scenario-specific guidance, and Start with clear instructions |
| 005 | C | Pass. The named deployment supplies the request model value. Subscription, category, and project display names do not select that deployment. | [Model deployment](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/deploy-foundry-models), Deploy a model, step 6 |
| 006 | A | Pass. Manual turn handling commits buffered audio before requesting output. Silence, discarded audio, or a new session does not submit that buffered turn. | [Realtime audio](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio), Voice activity detection and the audio buffer, Manual turn handling, and Response generation |
| 007 | D | Pass. High detail improves the processing detail available for small labels. The answer retains a result check. Low or automatic detail does not guarantee recognition. Removing the image removes the needed input. | [Vision chat](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/gpt-with-vision), Configure image detail level and Input limitations, Image support |
| 008 | B | Pass. The specified MAI response holds encoded PNG bytes. Decoding creates file bytes. An address, filename extension, or deployment identifier does not decode them. | [MAI image models](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-mai-image), API endpoints, Response format |
| 009 | C | Pass. Continuous recognition uses events and an application stop call. One single-shot call, absent result handlers, or stopping after the first result does not meet the session requirement. | [Speech recognition](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech?pivots=programming-language-javascript), JavaScript, Use continuous recognition |
| 010 | A | Pass. The Python agent quickstart reuses one conversation ID for related turns. Agent binding, project naming, or omission of that ID does not implement this history flow. | [Foundry SDK quickstart](https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code), Chat with an agent, Python conversation creation and consecutive response calls |
| 011 | D | Pass. The named preview samples about one frame per second. A short event can be missed. Transcript coverage does not prove full visual coverage. | [Video analysis](https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/video/overview), opening preview notice and Technical constraints and limitations, Frame sampling |
| 012 | B | Pass. The existing Python integration accepts image bytes through analyze. A local path, filename, or rename alone does not provide accessible image content. | [Image Analysis API](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/how-to/call-analyze-image-40), Python, Select the image to analyze, Image buffer, and Call the analyze_from_url method with options |
| 013 | C | Pass. Test one supported sampling control at a time. Parameter support depends on the model. A sampling setting does not establish answer truth. | [Prompt engineering](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering), Temperature and Top_p parameters; [reasoning models](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-chat-reasoning), Choose parameters for reasoning models |
| 014 | A | Pass. Extractive output retains selected sentences and positions. Rewriting, returning the full source, or discarding positions fails a stated requirement. | [Summarization](https://learn.microsoft.com/en-us/azure/ai-services/language-service/summarization/overview?tabs=document-summarization), Key features for text summarization, Extractive summarization and Abstractive summarization |

All linked sections were checked on October 16, 2026. The review used documentation, not a live Azure service test. The reviewer did not access an exam dump or a publisher practice assessment.

## Review limits

The pilot uses 14 of the 15 verified AI-901 cards. The Personally Identifiable Information redaction card is excluded because no qualified privacy review is recorded. No question uses a draft card.

Question 011 retains its preview version in the stem. Question 008 limits its claim to the specified MAI response. Question 012 applies to an existing Image Analysis 4.0 app. The [Image Analysis notice](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis) confirms retirement on September 25, 2028. Question 014 tests a concept. The [summarization notice](https://learn.microsoft.com/en-us/azure/ai-services/language-service/summarization/overview?tabs=document-summarization) confirms retirement on March 31, 2029.

The corrected questions can move from draft to reviewed. This review does not approve publication or establish full exam coverage. Browser behavior, grading, legacy-bank similarity, and register consistency remain separate validation steps owned by the orchestrator.

Reviewed content fingerprint: SHA-256 `93047e17cab187fcf31c5652cb99d4ed1ce37d01793987b1673de363070300d8`. The input is JSON.stringify of the questions in file order after removing each question's status property. Metadata status changes do not change this fingerprint. Content changes require another review.
