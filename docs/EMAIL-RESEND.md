# Email — Resend for info@globalmedicaldx.com

Mail sent **to** `info@globalmedicaldx.com` is received by Resend and forwarded to Roy’s inbox: **globalmedicaldx@yahoo.com**.

The contact form sends **from** `info@globalmedicaldx.com` to that same Yahoo address.

Resend is not a mailbox. Yahoo is where Roy reads and replies.

## After merge / deploy

Set secrets on the Cloudflare Pages project `globalmedicaldx` (do not put these in git):

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name=globalmedicaldx
npx wrangler pages secret put RESEND_WEBHOOK_SECRET --project-name=globalmedicaldx
```

Then in Resend → **Webhooks** → Add:

- URL: `https://globalmedicaldx.com/api/inbound`
- Event: `email.received`
- Save the signing secret (`whsec_…`) as `RESEND_WEBHOOK_SECRET` above

## Local

Copy `.dev.vars.example` to `.dev.vars` and paste the keys. `.dev.vars` is gitignored.

```bash
npm install
npm run dev
```

Open http://127.0.0.1:8788/
