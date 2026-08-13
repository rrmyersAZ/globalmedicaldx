# Deploy to Cloudflare Pages

Static site (no build step). GitHub repo: [rrmyersAZ/globalmedicaldx](https://github.com/rrmyersAZ/globalmedicaldx)

**Domain:** globalmedicaldx.com

---

## Option A — Cloudflare dashboard (Git → auto deploy)

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize GitHub and select **`rrmyersAZ/globalmedicaldx`**.
4. Configure:

| Setting | Value |
| --- | --- |
| **Project name** | `globalmedicaldx` |
| **Production branch** | `main` |
| **Framework preset** | None |
| **Build command** | *(leave empty)* |
| **Build output directory** | `/` |

5. Click **Save and Deploy**.

First deploy gives a URL like `https://globalmedicaldx.pages.dev`.

### Attach custom domain

1. Open the Pages project → **Custom domains** → **Set up a domain**.
2. Add `globalmedicaldx.com` and `www.globalmedicaldx.com`.
3. If the domain is already on Cloudflare, DNS records are created automatically.
4. If the domain is at another registrar, either:
   - Change nameservers to Cloudflare, **or**
   - Add the CNAME/A records Cloudflare shows.

5. After HTTPS is active, set a redirect **www → apex** (or the reverse) under domain rules if desired.

---

## Option B — Direct upload with Wrangler (CLI)

From `C:\dev\globalmedicaldx`:

```powershell
cd C:\dev\globalmedicaldx
npx --yes wrangler@4 login
npx --yes wrangler@4 pages project create globalmedicaldx --production-branch=main
npx --yes wrangler@4 pages deploy . --project-name=globalmedicaldx --branch=main
```

Then attach `globalmedicaldx.com` in the dashboard under **Custom domains** (same as above).

---

## After go-live

- Spot-check all pages over HTTPS
- Confirm phone / `info@globalmedicaldx.com` / referral form
- Future updates: push to `main` (Git-connected) or re-run `wrangler pages deploy`

## Email note

The contact form uses `mailto:info@globalmedicaldx.com`. Make sure that mailbox exists at your email host for the domain.
