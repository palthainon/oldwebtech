const test = require('node:test');
const assert = require('node:assert/strict');
const { sendFeedback } = require('../src/feedback');

const env = {
  RESEND_API_KEY: 'test-key',
  FEEDBACK_FROM_EMAIL: 'feedback@example.com',
  FEEDBACK_TO_EMAIL: 'private@example.net'
};

function request(body, contentType = 'application/json') {
  return new Request('https://oldweb.tech/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body: typeof body === 'string' ? body : JSON.stringify(body)
  });
}

test('sends only to the configured recipient with optional reply address', async () => {
  let call;
  const send = async (url, options) => {
    call = { url, options };
    return { ok: true };
  };
  const result = await sendFeedback(request({ message: 'A useful suggestion', replyEmail: 'reader@example.org' }), { env, send });
  assert.equal(result.status, 200);
  assert.equal(call.url, 'https://api.resend.com/emails');
  const payload = JSON.parse(call.options.body);
  assert.deepEqual(payload.to, ['private@example.net']);
  assert.equal(payload.reply_to, 'reader@example.org');
  assert.match(payload.text, /A useful suggestion/);
  assert.equal(call.options.headers.Authorization, 'Bearer test-key');
  assert.doesNotMatch(JSON.stringify(result), /private@example.net|test-key/);
});

test('rejects invalid, oversized, and malformed input without sending', async () => {
  const send = () => { throw new Error('should not send'); };
  for (const [body, status] of [
    [{ message: '', replyEmail: '' }, 400],
    [{ message: 'a'.repeat(4001) }, 400],
    [{ message: 'a'.repeat(6001) }, 413],
    [{ message: 'hello', replyEmail: 'bad\naddress@example.org' }, 400],
    ['{broken', 400]
  ]) {
    assert.equal((await sendFeedback(request(body), { env, send })).status, status);
  }
  assert.equal((await sendFeedback(request({ message: 'hello' }, 'text/plain'), { env, send })).status, 415);
});

test('honeypot and missing configuration never send', async () => {
  const send = () => { throw new Error('should not send'); };
  assert.equal((await sendFeedback(request({ message: 'spam', website: 'example.com' }), { env, send })).status, 200);
  assert.equal((await sendFeedback(request({ message: 'hello' }), { env: {}, send })).status, 503);
});

test('upstream failure returns a generic error', async () => {
  const result = await sendFeedback(request({ message: 'hello' }), {
    env,
    send: async () => ({ ok: false, status: 401 })
  });
  assert.equal(result.status, 502);
  assert.doesNotMatch(JSON.stringify(result), /private@example.net|test-key|401/);
});
