const { app } = require('@azure/functions');
const { sendFeedback } = require('../feedback');

app.http('feedback', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: (request) => sendFeedback(request)
});
