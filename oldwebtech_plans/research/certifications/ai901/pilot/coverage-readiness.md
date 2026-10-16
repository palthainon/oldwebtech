# AI-901 pilot coverage and readiness

AI-901 is the Microsoft Azure AI Fundamentals exam. This local pilot has 14 original questions from 14 verified behavior cards. Each question checks one narrow behavior. The pilot does not cover the full exam. Its score does not predict exam readiness.

The exam baseline is the [skills measured as of April 15, 2026](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901#skills-measured-as-of-april-15-2026). The guide was checked on October 16, 2026. It lists concept skills at 40–45% and implementation skills at 55–60%. The bank stores the midpoint of each range for compatibility with the quiz display. Those values are not pilot question weights. This pilot contains 3 concept questions and 11 implementation questions.

## Question map

The question bank is [ai901-pilot.js](ai901-pilot.js). Each item records its issuer objective text or heading, exam version, card ID, source URL, source section, and source check date. Question IDs below use the prefix `ai901-pilot-`. Card names below use the prefix `ai901-`.

| Question | Verified card | Narrow behavior | Objective coverage |
| --- | --- | --- | --- |
| 001 | responsible-ai-design | Decide approval points during design | Partial responsible AI heading. This does not cover all six principles. |
| 002 | content-understanding-field-extraction | Trace a document field to source grounding | Partial document and form extraction |
| 003 | managed-prompt-agent-selection | Select a configured text agent | Partial single-agent creation and testing |
| 004 | prompt-task-instruction-order | Evaluate instruction placement | Partial effective prompts |
| 005 | deployment-name-routes-inference | Use the assigned deployment name | Partial deployment and interaction |
| 006 | spoken-prompt-turn-detection | Commit a manual audio turn before response creation | Partial spoken prompts |
| 007 | visual-input-in-prompt-multimodal | Select image detail and check output | Partial visual prompts |
| 008 | image-generation-decode-output | Decode MAI image response data | Partial visual output generation |
| 009 | speech-single-shot-versus-continuous-recognition | Select continuous recognition | Partial Speech application |
| 010 | agent-client-conversation-state | Reuse a conversation ID | Partial agent client |
| 011 | content-understanding-video-frame-sampling | Recognize a video sampling limit | Partial audio and video extraction |
| 012 | vision-local-image-buffer | Supply local image bytes | Partial vision application |
| 013 | tune-one-sampling-parameter | Test one supported sampling parameter | Partial deployment options and parameters |
| 014 | summarization-extractive-versus-abstractive | Select original sentences with positions | Partial text analysis techniques |

## Source checks and limits

The bank contains current primary Microsoft links with section locators for each item. The writer checked those sections on October 16, 2026. The writer did not use publisher practice questions or exam dumps. No live Azure service call was run.

- Question 008 applies to the documented MAI image generations response. Its base64 output rule is not a claim about every image model.
- Question 011 explicitly applies to the `2026-06-01-preview` video analyzer documentation. Preview behavior can change.
- Question 012 concerns an existing Image Analysis 4.0 application. The verified card records deprecation and a September 25, 2028 retirement date. This item does not recommend that service for a new application.
- Question 014 checks a concept. The verified card records that Azure Language summarization retires March 31, 2029. The item does not recommend the retiring feature for a new project.
- The verified Personally Identifiable Information (PII) redaction card is excluded. The user requires qualified review for privacy scenarios. No qualified review is documented for this pilot.

## Coverage gaps

The current guide lists 29 leaf bullets. These questions test portions of objectives. A single question does not establish mastery of a whole objective.

The pilot lacks direct checks of the six responsible AI principles, generative model foundations, broad model selection, most workload selection, keyword extraction, entity detection, sentiment analysis, speech synthesis, a standalone model chat client, a text analysis application, image extraction with Content Understanding, and a Content Understanding client application. Other included objectives need more depth and practical exercises.

## Release state

All 14 questions passed independent review on October 16, 2026. The reviewer checked each answer, every choice rationale, objective fit, source currency, ambiguity, and duplicate content. See [the independent review](independent-review.md). The bank and question register record reviewed status. The local preview is a review artifact. Publication requires a separate release decision.
