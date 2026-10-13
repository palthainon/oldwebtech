# Feedback delivery

The homepage posts to `/api/feedback`, an Azure Static Web Apps managed Function. The recipient address and mail credentials are read only by the Function; they are never included in public HTML or JavaScript.

Before using the form in production:

1. Verify a sending domain in [Resend](https://resend.com/docs/dashboard/domains/introduction) and create a sending API key.
2. In the Azure Static Web App's **Environment variables** for the production environment, set:
   - `RESEND_API_KEY` to the API key.
   - `FEEDBACK_FROM_EMAIL` to an address on the verified sending domain, such as `feedback@your-verified-domain.example`.
   - `FEEDBACK_TO_EMAIL` to the private destination mailbox.
3. Deploy this repository, then submit a test message from the homepage and confirm receipt. Configure the same settings for any preview environment where feedback should work.

The form has basic validation and a honeypot. It is a public, anonymous endpoint; if it attracts spam, add a server-verified challenge or durable rate limiting. Do not put the API key or destination mailbox in the frontend or in GitHub Actions build variables.
