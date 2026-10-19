// Original scoped practice. Independent review is required before release.
window.CERT_BANK = {
  id: 'ai901-pilot', vendor: 'Microsoft', exam: 'AI-901 scoped pilot', code: 'AI-901 (2026-04-15)',
  asOf: '2026-10', examVersion: '2026-04-15', status: 'reviewed',
  objectivesUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901',
  scope: 'Fourteen narrow behaviors. This pilot does not cover the full exam or predict exam readiness.',
  domains: [
    { id: '1', name: 'AI concepts and capabilities', weight: 42.5 },
    { id: '2', name: 'Foundry implementation', weight: 57.5 }
  ],
  questions: [
    {
      id: 'ai901-pilot-001', domain: '1', objective: 'Describe principles of responsible AI', type: 'single',
      q: 'A team designs an agent that proposes changes to a public museum display. The team must decide which actions need a curator to approve them. When should the team make this decision?',
      choices: ['During architecture design, before the action flow is fixed', 'After launch, when a visitor first reports an error', 'Only after the final content filter test', 'After the agent makes its first change without approval'], answer: [0],
      explain: 'Human approval points shape the action flow. Microsoft places this decision in the design phase.',
      why: ['Correct. Early approval decisions can shape the architecture.', 'A reported error is too late to define the initial approval flow.', 'A content filter test does not establish who approves an action.', 'The first unapproved action is too late to define the initial control.'],
      cardIds: ['ai901-responsible-ai-design'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai',locator:'Design responsible AI from the start'}]
    },
    {
      id: 'ai901-pilot-002', domain: '2', objective: 'Extract information from documents and forms by using Azure Content Understanding in Foundry Tools', type: 'single',
      q: 'A document analyzer returns a museum exhibit date in the requested schema. The date looks wrong. Which returned information best helps a reviewer check the extracted value against the document?',
      choices: ['Only the field name in the schema', 'The model deployment name alone', 'The source region and confidence estimate for the field', 'Only whether the response has valid JSON syntax'], answer: [2],
      explain: 'Grounding identifies the source region. Confidence estimates help assess extraction reliability. Schema compliance alone does not establish correctness.',
      why: ['A field name identifies the requested field, not its source value.', 'A deployment name does not identify the document region.', 'Correct. Grounding supports source tracing, with confidence as supporting evidence.', 'Valid JSON can still contain an incorrect extracted value.'],
      cardIds: ['ai901-content-understanding-field-extraction'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview',locator:'Key components of Content Understanding > Confidence scores and Grounding'}]
    },
    {
      id: 'ai901-pilot-003', domain: '2', objective: 'Create and test a single-agent solution in the Foundry portal', type: 'single',
      q: 'A team needs one text agent with instructions, a selected model, and configured tools. It needs no custom orchestration code. Which Foundry agent type best fits a requirement to maintain no agent runtime code?',
      choices: ['A hosted agent with a custom container', 'A prompt agent', 'An agent framework hosted by the team outside Foundry', 'A voice-based prompt agent for a spoken conversation'], answer: [1],
      explain: 'A prompt agent uses configuration for instructions, model selection, and tools. Foundry runs it without agent application code to maintain.',
      why: ['A hosted agent requires the team to maintain its agent logic.', 'Correct. A prompt agent fits the configuration requirement.', 'This choice adds agent runtime code for the team to maintain.', 'A spoken conversation does not meet this text-agent requirement.'],
      cardIds: ['ai901-managed-prompt-agent-selection'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/foundry/agents/overview',locator:'Agent types > Prompt agents; Compare agent types > Runtime code to maintain'}]
    },
    {
      id: 'ai901-pilot-004', domain: '2', objective: 'Create effective system and user prompts for generative AI models', type: 'single',
      q: 'A team tests a supported non-reasoning GPT model on short exhibit descriptions. It moves the task instruction from after the examples to the start of the prompt. What should the team conclude before evaluating the changed prompt?',
      choices: ['The change guarantees better results for every input', 'Instruction order cannot affect any model', 'One successful response proves the change works for every task', 'The change is a useful pattern to test on representative inputs'], answer: [3],
      explain: 'Microsoft recommends clear instructions near the start as a pattern that can improve results. The team must evaluate the pattern for its model and task.',
      why: ['The guidance does not guarantee an improvement for every input.', 'The guidance says instruction placement can affect quality.', 'One response does not test the range of inputs or tasks.', 'Correct. Compare results on representative inputs before choosing the ordering.'],
      cardIds: ['ai901-prompt-task-instruction-order'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering',locator:'Start with clear instructions; Scenario-specific guidance'}]
    },
    {
      id: 'ai901-pilot-005', domain: '2', objective: 'Deploy a model and interact with it in the Foundry portal', type: 'single',
      q: 'A developer selects a catalog model in Foundry, then names its successful deployment exhibit-helper. The deployment name differs from the catalog model name. What value should the developer use in the inference request model parameter for this deployment?',
      choices: ['The Azure subscription display name', 'The catalog category name', 'exhibit-helper', 'The project display name'], answer: [2],
      explain: 'The documented Foundry deployment flow uses the deployment name in the inference request model parameter.',
      why: ['The subscription display name does not select this deployment.', 'The catalog category does not identify the created deployment.', 'Correct. This is the assigned deployment name.', 'The project display name does not select this deployment.'],
      cardIds: ['ai901-deployment-name-routes-inference'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/deploy-foundry-models',locator:'Deploy a model > step 6 > Deployment name'}]
    },
    {
      id: 'ai901-pilot-006', domain: '2', objective: 'Respond to spoken prompts by using a deployed multimodal model', type: 'single',
      q: 'A GPT Realtime client uses manual push-to-talk with turn_detection set to none. The client has buffered the audio for one spoken turn. Which event sequence submits that turn and requests the reply?',
      choices: ['input_audio_buffer.commit, then response.create', 'response.create, then discard the input audio buffer', 'Wait for silence without sending either event', 'Create a new session without committing the audio'], answer: [0],
      explain: 'In manual turn handling, the client commits the audio buffer and then creates a response. Silence alone does not start the reply.',
      why: ['Correct. Commit submits the buffered turn, then response.create requests output.', 'This sequence does not commit the buffered turn before the reply request.', 'Automatic response generation is disabled in this mode.', 'A new session does not submit the buffered turn from the current session.'],
      cardIds: ['ai901-spoken-prompt-turn-detection'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio',locator:'Voice activity detection (VAD) and the audio buffer > Manual turn handling (push-to-talk)'}]
    },
    {
      id: 'ai901-pilot-007', domain: '2', objective: 'Interpret visual input in prompts by using a deployed multimodal model', type: 'single',
      q: 'A developer uses the documented Chat Completions image detail setting with a vision-capable deployment. A prompt asks about small labels in a diagram. Which approach best addresses the risk that low image detail misses the labels?',
      choices: ['Use low detail and accept the answer without checking it', 'Remove the image and keep only the question', 'Assume the default detail setting guarantees all text is read', 'Use high detail, then compare the answer with the image'], answer: [3],
      explain: 'High detail supports more detailed image processing. The developer must still check the answer because the setting does not guarantee correct recognition.',
      why: ['Low detail can reduce recognition accuracy for small details.', 'The model needs the visual input to inspect these labels.', 'The default is auto, which does not guarantee recognition of every label.', 'Correct. This uses more detailed processing while retaining a result check.'],
      cardIds: ['ai901-visual-input-in-prompt-multimodal'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/gpt-with-vision',locator:'Configure image detail level; Input limitations > Image support'}]
    },
    {
      id: 'ai901-pilot-008', domain: '2', objective: 'Create new visual outputs by using generative models', type: 'single',
      q: 'A test client calls the documented MAI image generations API. Its successful JSON response contains data[0].b64_json. The developer needs a PNG file. What should the client do with that value?',
      choices: ['Treat the value as an HTTPS image address', 'Decode the base64 value and save the resulting bytes', 'Save the unchanged text and rename the file with a PNG extension', 'Send the value as the next deployment name'], answer: [1],
      explain: 'The documented MAI response contains base64-encoded PNG data. Decoding produces the bytes for an image file.',
      why: ['The field contains encoded data, not an image address.', 'Correct. Decode the data before saving the PNG bytes.', 'A file extension does not decode the base64 text.', 'The output data is not a deployment identifier.'],
      cardIds: ['ai901-image-generation-decode-output'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-mai-image',locator:'API endpoints > Response format > data[].b64_json'}]
    },
    {
      id: 'ai901-pilot-009', domain: '2', objective: 'Build a lightweight application by using Azure Speech in Foundry Tools', type: 'single',
      q: 'A JavaScript Speech SDK app must transcribe several spoken utterances until the user selects Stop. Which recognition design matches this requirement?',
      choices: ['Call single-shot recognition once and expect all later utterances', 'Use continuous recognition without handling result events', 'Use continuous recognition with result events and an explicit stop call', 'Start continuous recognition and stop it after the first result'], answer: [2],
      explain: 'Continuous recognition provides recognition events while the app controls when to stop. A single-shot call recognizes one utterance.',
      why: ['One single-shot call does not provide a continuing stream of utterances.', 'The app needs event handling to receive the recognition results.', 'Correct. This design receives successive results and stops on request.', 'Stopping after the first result ends recognition before the user selects Stop.'],
      cardIds: ['ai901-speech-single-shot-versus-continuous-recognition'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech?pivots=programming-language-javascript',locator:'JavaScript > Use continuous recognition'}]
    },
    {
      id: 'ai901-pilot-010', domain: '2', objective: 'Create a lightweight client application for an agent', type: 'single',
      q: 'A Python client follows the Foundry SDK agent quickstart. It binds its client to one agent, but creates a new conversation for each turn. A follow-up must use the previous turn history. What should the developer change?',
      choices: ['Create one conversation and pass its ID to both response requests', 'Keep creating new conversations but reuse only the agent name', 'Change only the project display name', 'Omit the conversation ID from both requests'], answer: [0],
      explain: 'The documented agent client reuses a conversation ID for related turns. Binding to the same agent does not by itself select the same conversation.',
      why: ['Correct. Both response requests then use the same conversation history.', 'The agent name selects the agent, not the same conversation history.', 'The project display name does not join conversation histories.', 'Omitting the ID does not implement the documented shared conversation flow.'],
      cardIds: ['ai901-agent-client-conversation-state'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/foundry/quickstarts/get-started-code',locator:'Chat with an agent > Python > conversation creation and two responses.create calls'}]
    },
    {
      id: 'ai901-pilot-011', domain: '2', objective: 'Extract information from audio and video by using Content Understanding', type: 'single',
      q: 'A Content Understanding video test uses the documented 2026-06-01-preview analyzer. A colored light appears for less than one second. The output does not mention it. Which conclusion is supported by the documented frame sampling limit?',
      choices: ['The light could not have appeared', 'The transcript proves every frame was inspected', 'The analyzer inspects every frame at the original frame rate', 'The brief event might fall between sampled frames'], answer: [3],
      explain: 'This preview documentation describes sampling at about one frame per second. A brief event can be missed, so an absent result does not prove the event was absent.',
      why: ['An omitted event is not proof that it did not occur.', 'Speech transcription does not establish complete visual frame coverage.', 'The documented sampling rate is about one frame per second.', 'Correct. The sampling interval can miss brief visual events.'],
      cardIds: ['ai901-content-understanding-video-frame-sampling'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/video/overview',locator:'Technical constraints and limitations > Frame sampling (~ 1 FPS)'}]
    },
    {
      id: 'ai901-pilot-012', domain: '2', objective: 'Build a lightweight application that includes vision capabilities', type: 'single',
      q: 'An existing Image Analysis 4.0 Python app must analyze a local test image. The service cannot fetch the image by URL. Which documented input method fits this case?',
      choices: ['Pass the local disk path as a public image URL', 'Read the file as bytes and pass image_data to analyze', 'Send only the image filename as the image content', 'Rename the file without changing the request input'], answer: [1],
      explain: 'The Python how-to supports local image bytes through analyze(image_data=...). This question concerns an existing 4.0 integration, not a service choice for a new app.',
      why: ['A local disk path does not make the image accessible to the service.', 'Correct. The request supplies the actual image bytes.', 'The filename alone does not supply the image data.', 'Renaming the file does not provide the bytes or an accessible URL.'],
      cardIds: ['ai901-vision-local-image-buffer'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/how-to/call-analyze-image-40',locator:'Python > Select the image to analyze > Image buffer; Call the analyze_from_url method with options > analyze(image_data=...)'}]
    },
    {
      id: 'ai901-pilot-013', domain: '1', objective: 'Identify appropriate model deployment options and configuration parameters', type: 'single',
      q: 'A GPT deployment supports temperature and top_p. A developer wants to test how sampling changes affect response variation. Which experiment best follows the documented guidance?',
      choices: ['Change both values together for every test', 'Assume every reasoning model accepts both values', 'Change one value at a time and compare outputs for the task', 'Treat a lower temperature as a guarantee of a correct answer'], answer: [2],
      explain: 'Microsoft recommends adjusting temperature or top_p one at a time. Output tendencies do not guarantee correctness.',
      why: ['Changing both values makes it harder to attribute the observed effect.', 'Parameter support depends on the selected model.', 'Correct. A single parameter change supports a useful comparison.', 'Sampling settings do not guarantee factual accuracy.'],
      cardIds: ['ai901-tune-one-sampling-parameter'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering',locator:'Temperature and Top_p parameters; opening note on reasoning models'}, {url:'https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-chat-reasoning',locator:'Choose parameters for reasoning models'}]
    },
    {
      id: 'ai901-pilot-014', domain: '1', objective: 'Describe common text analysis techniques, including keyword extraction, entity detection, sentiment analysis, and summarization', type: 'single',
      q: 'An editor wants a short document summary made from selected original sentences. The editor also needs each selected sentence location in the source. Which documented summarization approach fits?',
      choices: ['Extractive summarization', 'Abstractive summarization that rewrites the ideas', 'Return all source sentences without selecting a summary', 'Return selected source sentences but discard their positions'], answer: [0],
      explain: 'Extractive summarization selects source sentences and includes positional information. Abstractive summarization generates new summary text.',
      why: ['Correct. This approach retains selected original sentences and their positions.', 'Rewritten summary text does not meet the original-sentence requirement.', 'Returning the whole source does not make the requested short summary.', 'Discarding positions prevents the editor from locating the sentences as required.'],
      cardIds: ['ai901-summarization-extractive-versus-abstractive'], evidenceRefs: [{url:'https://learn.microsoft.com/en-us/azure/ai-services/language-service/summarization/overview?tabs=document-summarization',locator:'Key features for text summarization > Extractive summarization and Abstractive summarization'}]
    }
  ].map(function (question) {
    question.examVersion = '2026-04-15';
    question.status = 'reviewed';
    question.evidenceRefs.forEach(function (reference) { reference.checkedOn = '2026-10-16'; });
    return question;
  })
};
