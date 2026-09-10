# ProHub Technologies

A premium, production-ready e-commerce store for **ProHub Technologies** — a UK
company selling mobile phone accessories and electronic gadgets. Built with
Next.js (App Router), TypeScript, Tailwind CSS and Supabase.

> **Payments are intentionally "pending".** Orders are created and reserved with
> `status = 'pending_payment'`; no live gateway is wired up yet. The single
> integration boundary lives in [`src/lib/payments.ts`](src/lib/payments.ts).

## Features

- Home, Shop (+ category routes), Product detail, Cart, Checkout, Order
  confirmation, Account (Supabase Auth), Search, About, Contact, Support/FAQ,
  Distributor, Complaints, Catalogue, 5 policy pages, and a custom 404.
- Cart via React Context + `localStorage`, synced to Supabase on checkout.
- Working filters, sort, search and load-more against the product data.
- Automatic promo logic: free delivery **and** 20% off on orders over £50.
- SEO: per-page metadata, Open Graph, JSON-LD `Product` schema, `sitemap.xml`,
  `robots.txt`.
- Fully responsive, accessible, and theme-consistent.
- **Runs out of the box with built-in sample data** — Supabase is optional for a
  first look, required for persistence and auth.

## Tech stack

Next.js 14 · TypeScript · Tailwind CSS · Supabase (Postgres + Auth) ·
lucide-react · framer-motion.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your values (optional for a first run)
npm run dev
```

Open http://localhost:3000. Without Supabase configured, the site serves local
sample data and the checkout uses a best-effort in-memory store so you can see
the full flow.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for checkout + form writes |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap, OG) |

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the **SQL editor**, run the files in order:
   1. `supabase/schema.sql` — tables
   2. `supabase/rls.sql` — Row Level Security policies
   3. `supabase/seed.sql` — 7 categories + ~28 demo products
3. Copy your project URL and keys into `.env.local`.
4. (Auth) Enable **Email** auth in the Supabase dashboard. For local testing you
   may disable email confirmations.

## Project structure

```
src/
  app/               # App Router pages + API routes
  components/         # UI, layout, product and form components
  context/            # Cart context
  lib/                # data access, supabase clients, utils, payments stub
supabase/             # schema.sql, rls.sql, seed.sql
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the environment variables above.
4. Deploy.

## Things to swap in later

- Real product photography + copy (placeholders are clearly marked).
- Final logo.
- Legal policy text reviewed by a professional (current pages are templates).
- A live payment gateway — replace the body of `createPayment()` in
  `src/lib/payments.ts` (the rest of the app won't need changes).
- Real shipping rates / delivery partners.
- Verified phone number + support email.

---
Built for ProHub Technologies · Southampton, United Kingdom.
