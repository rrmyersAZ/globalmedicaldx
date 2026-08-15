# Deploy to Cloudflare Pages

Static site (no build step). GitHub repo: [rrmyersAZ/globalmedicaldx](https://github.com/rrmyersAZ/globalmedicaldx)

**Domain:** globalmedicaldx.com

---

## Current status (2026-08-13)

| Item | Status |
| --- | --- |
| Cloudflare Pages project | `globalmedicaldx` created |
| Preview URL | https://globalmedicaldx.pages.dev |
| Custom domain `globalmedicaldx.com` | Attached (initializing SSL/DNS) |
| Custom domain `www.globalmedicaldx.com` | Attached (pending) |

Redeploy from local:

```powershell
cd C:\dev\globalmedicaldx
npx --yes wrangler@4 pages deploy . --project-name=globalmedicaldx --branch=main
```

---

## Finish custom domain in the dashboard

1. Open [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **globalmedicaldx** → **Custom domains**.
2. Wait until `globalmedicaldx.com` and `www.globalmedicaldx.com` show **Active**.
3. Open the **globalmedicaldx.com** zone → **DNS** and confirm Pages added the needed records (apex + `www`).
4. Spot-check https://globalmedicaldx.com once SSL is active.

Optional: connect GitHub for auto-deploy later (**Workers & Pages** → project → **Settings** → **Builds & deployments** → Connect to Git → `rrmyersAZ/globalmedicaldx`, empty build command, output `/`).

---

## After go-live

- Spot-check all pages over HTTPS
- Confirm phone / `info@globalmedicaldx.com` / referral form
- Future updates: `wrangler pages deploy` (or Git push once connected)

## Email

`info@globalmedicaldx.com` is wired through Resend and forwarded to `globalmedicaldx@yahoo.com`. See [EMAIL-RESEND.md](EMAIL-RESEND.md).
