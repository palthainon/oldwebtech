const json = (status, message) => ({
  status,
  jsonBody: { message },
  headers: { 'Cache-Control': 'no-store' }
});

async function sendFeedback(request, { env = process.env, send = fetch } = {}) {
  const type = request.headers.get('content-type') || '';
  if (!/^application\/json(?:\s*;|$)/i.test(type)) return json(415, 'Use JSON.');
  if (Number(request.headers.get('content-length')) > 6000) return json(413, 'Message is too long.');

  let body;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, 'utf8') > 6000) return json(413, 'Message is too long.');
    body = JSON.parse(raw);
  } catch {
    return json(400, 'Invalid feedback.');
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) return json(400, 'Invalid feedback.');
  // A field hidden from people catches simple form-filling bots without sending mail.
  if (body.website) return json(200, 'Thanks for your feedback.');

  const message = body.message;
  const replyEmail = body.replyEmail || '';
  if (typeof message !== 'string' || !message.trim() || message.length > 4000 ||
      typeof replyEmail !== 'string' || replyEmail.length > 254 ||
      (replyEmail && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(replyEmail))) {
    return json(400, 'Check your message and email address.');
  }

  const { RESEND_API_KEY, FEEDBACK_FROM_EMAIL, FEEDBACK_TO_EMAIL } = env;
  if (!RESEND_API_KEY || !FEEDBACK_FROM_EMAIL || !FEEDBACK_TO_EMAIL) {
    return json(503, 'Feedback is temporarily unavailable.');
  }

  const payload = {
    from: FEEDBACK_FROM_EMAIL,
    to: [FEEDBACK_TO_EMAIL],
    subject: 'OldWeb.tech feedback',
    text: `${message.trim()}${replyEmail ? `\n\nReply to: ${replyEmail}` : ''}`,
    ...(replyEmail ? { reply_to: replyEmail } : {})
  };

  try {
    const response = await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) return json(502, 'Feedback could not be sent.');
    return json(200, 'Thanks for your feedback.');
  } catch {
    return json(502, 'Feedback could not be sent.');
  }
}

module.exports = { sendFeedback };
