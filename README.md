# Paramount Club — Public Website

Luxury wedding and events venue website for **Paramount Club** in Peshawar, Pakistan.

Public-facing marketing website only. No admin, auth, payments, CRM, or live booking API in this phase.

---

## Quick start

```bash
npm install
npm run dev
```

```bash
npm run build
npm run lint
npm start
```

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` for production canonicals / sitemap.

---

## Stack

- **Next.js 15** App Router + React 19 + TypeScript
- CSS Modules + design tokens in `src/styles/globals.css`
- Cormorant Garamond + Manrope via `next/font`
- No UI kits / gallery SDKs / form libraries added

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home (poster hero — **videos deferred**) |
| `/venue` | Capacity, facilities, ballroom, décor |
| `/experiences` | Event experiences + décor grid |
| `/gallery` | Filterable gallery + lightbox |
| `/packages` | Included / not included + price on enquiry |
| `/availability` | Multi-step enquiry + visual demo calendar |
| `/contact` | Contact placeholders + form |
| 404 | Custom not-found |

---

## Where to edit content

| Content | File / folder |
| --- | --- |
| Logo | `public/media/brand/logo.png` (`SITE_LOGO` in `src/lib/site.ts`) |
| Contact / social | `src/lib/site.ts` |
| Venue copy & facilities | `src/data/venue.ts` |
| Packages | `src/data/packages.ts` |
| Stage décor | `src/data/decor.ts` + images in `public/media/decor/` |
| Experiences | `src/data/experiences.ts` |
| Gallery | `src/data/gallery.ts` |
| Enquiry options | `src/data/availability.ts` |
| Demo calendar dates | `src/data/calendar.ts` (**placeholder only**) |
| Hero poster / future video | `public/media/hero/` + `src/components/home/Hero.tsx` |

---

## Phase 1 product notes

- **Packages** show included / not included lists and **Price on enquiry** (no invented prices).
- **Décor** is data-driven and used on Venue, Experiences, and the availability questionnaire.
- **Availability** is a multi-step enquiry (event types, dates, catering, décor, facilities, contact). Submit → local success via `src/lib/api` stub. Does **not** book dates.
- **Calendar** on `/availability` is a **visual demo** with Available / Booked states and Barat/Walima chips only. Marked as placeholder — not live.
- **Homepage videos intentionally deferred** — hero remains poster/placeholder, structured for an easy video swap later.

---

## Remaining TODOs (client)

- Phone, email, address, hours, Maps embed, social URLs
- Confirm seating / parking / AC / heater / stage details
- Final package names, inclusions, exclusions, pricing
- Décor photography under `public/media/decor/`
- Venue / gallery / experience photography
- Hero poster (then optional `hero.mp4`)
- Production domain + OG JPG
- Wire `checkAvailability` / `submitInquiry` to real APIs
