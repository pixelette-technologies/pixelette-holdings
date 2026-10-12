# Pixelette Holdings

Public website for [Pixelette Holdings](https://pixeletteholdings.com) — Hybrid Sweat Equity partnerships, group ventures, and founder enquiries.

Built with **Next.js 15** (App Router), **React 19**, and **TypeScript**. Pages are statically generated where possible. Contact, partnership backup storage, and the Pix H site assistant use **Server Actions**, so production needs a **Node runtime** (for example Vercel), not a pure static host.

---

## Requirements

- Node.js **20+**
- npm

```bash
npm install
npm run dev
```

| Script | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run pix:build` | Rebuild the site assistant knowledge base |
| `npm run pix:check` | Fail if committed KB is stale |
| `npm run pix:test` | Assistant refusal / retrieval suite |
| `npm run check:pix-sources` | Guard the KB against archive/legacy sources |

---

## Environment

Copy `.env.example` to `.env.local` (or set the same names in the host). **Never commit real values.**

| Variable | Used for |
|---|---|
| `SUPABASE_URL` | Enquiry / assistant storage (HTTPS project URL) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase writes |
| `RESEND_API_KEY` | Notification email for contact / assistant enquiries |
| `CONTACT_NOTIFICATION_FROM` | Verified Resend sender address |

Until these are set, enquiry delivery takes an honest fallback (visitor is told and directed to email). Schema lives under `supabase/migrations/`.

---

## What’s in the tree

```
src/
  app/                 Routes (home, HSE, portfolio, about, insights, startups,
                       apply, contact, legal pages) + layout, sitemap, robots
  components/          UI, forms, Pix H assistant
  content/             Site copy, ventures, HSE model, claims, pix-kb.json
  lib/                 Enquiry delivery, lead score, pix assistant brain, SEO
public/                Static media, _headers, _redirects
supabase/migrations/   contact_enquiries, assistant_contacts, partnership_enquiries
scripts/               KB build/check and pix test harness
vercel.json            Redirects and security headers for Vercel
```

### Enquiries

| Surface | Behaviour |
|---|---|
| `/contact` | Server action → Supabase + Resend (when configured) |
| Pix H | Chat contact + scored enquiry → Supabase + Resend (when configured) |
| `/apply` | Saves a backup row, then opens the visitor’s email client (mailto) |

---

## Publication constraints

Do not remove these to make the site look “finished”:

- Do not enable a `/for-investors` redirect without counsel clearance.
- Do not publish a Big Innovation Centre shareholding percentage.
- Do not restore Cyber Essentials / ISO / APPG **logo** assets that were removed from credentials.
- Footer FSMA notice (`FOOTER_NOTICE`) stays until counsel reviews replacement wording.
- Formal form/controller decisions may still be open operationally even where storage is wired — see Privacy Notice on the site.

---

## Repo

Official: [pixelette-technologies/pixelette-holdings](https://github.com/pixelette-technologies/pixelette-holdings)
