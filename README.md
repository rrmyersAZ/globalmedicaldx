# Global Medical Diagnostics

Marketing site for mobile clinical cardiopulmonary exercise testing (CPET).

**Live domain:** [globalmedicaldx.com](https://globalmedicaldx.com)  
**Email:** info@globalmedicaldx.com · **Phone:** (480) 806-9044  
**Repo:** [github.com/rrmyersAZ/globalmedicaldx](https://github.com/rrmyersAZ/globalmedicaldx)

## Run locally

Static pages only:

```powershell
Start-Process "C:\dev\globalmedicaldx\index.html"
```

Site plus the referral/email functions (needs Wrangler + `.dev.vars`):

```bash
npm install
npm run dev
```

Then open http://127.0.0.1:8788/

Email setup: [docs/EMAIL-RESEND.md](docs/EMAIL-RESEND.md).

## Site pages

- `index.html` — Home
- `services.html` — Services
- `providers.html` — For Providers
- `patients.html` — Patient Prep / FAQ
- `about.html` — About
- `contact.html` — Contact / referral form

## Deploy

See [docs/DEPLOY-CLOUDFLARE.md](docs/DEPLOY-CLOUDFLARE.md).
