# Real Estate

The Dubai property portal at `/en-ae/real-estate/` (and `/en-in/…`) — a pillar
page that searches and lists property, eight service pages beneath it, its own
navigation, its own footer, one stylesheet.

**Published but not advertised.** No navigation item on the main site, no
`sitemap.xml` entry. Reaching it means typing the URL.

---

## What it is now, and why

Rebuilt on 2026-09-05 from an advisory brochure into a property portal, after
the client's review: *"understand that they are selling real estate properties…
we need to show that we sell, we mean business… I want direction — lifestyle,
property listings, filters and all."*

Six competitor sites were read live and analysed independently — Betterhomes,
Springfield, Range, Driven, Allsopp & Allsopp, JamesEdition — and one spec
synthesised from them. They agree on the shape, and the page follows it:

> **Search** → Categories → Stats → **Listings** → Launches → Communities →
> Why Dubai → Services → Sell → Developers → Reviews → Contact → FAQ → Popular

Search first; property within one scroll; trust and lifestyle around it; the ask
and the SEO cloud at the end. Nothing opens by explaining the firm.

**Cut, and why:** the About statement, the Valuation & Advisory split, the
Process accordion, the gallery mosaic and the Insights block. They were the
consultancy — a buyer does not read a process before seeing a property. Their
substance survives where it sells: the firm's numbers as the stats strip,
valuation as the seller's door, the process on the service pages.

The design language is VALUNXT's — blue `#0053B7`, navy `#0E355F`, Forum and
DM Sans, the skewed-wipe button — with **one accent only**. An earlier pass
carried a metallic gold; it was not a brand colour and it is gone. Do not
reintroduce it.

---

## The search

`components/SearchBar.tsx` (hero) and `components/ListingsGrid.tsx` (results)
share a small external store in `lib/search.ts`, mirrored into the URL query so
a search is shareable and survives a reload. Buy / Rent / Off-Plan tabs, then
community, type, bedrooms and a price band whose options change with the tab.
`Search properties` scrolls to the grid. The quick type chips above the grid,
the "Popular:" links in the hero, the four category doors and the nav's
Buy/Rent/Off-Plan all write the same store.

**There is no listings backend.** The filters run client-side over the twelve
listings in `data/listings.ts`, and the page says so — the results line reads
"6 of 12 match", never "6 properties in Dubai", and every card carries an
**Indicative** chip. When a feed arrives, `filterListings()` is the one
function to point at it and the chip is the one thing to remove.

---

## Where the content lives

No copy is hard-coded in a component that has a data file.

- `data/listings.ts` — the twelve illustrative listings the search filters
- `data/property.ts` — communities, property types, the eight real off-plan
  launches, the gallery frames (service pages)
- `data/home.ts` — stats (`FIGURES`), services, valuation stat, contact copy,
  reviews, FAQs
- `data/site.ts` — brand, nav, footer columns, developer logos
- `data/pages.ts` + `data/service-pages-2.ts` — the eight service pages
- `data/market.ts` — price tables, payment plans and costs for the service pages

Contact details come from `src/lib/site-data.ts` (the Dubai office), not from
here — this file's own copies had drifted.

**Three standards apply to the numbers, and they must not be mixed.**
`listings.ts` and `market.ts` are illustrative and labelled on screen (the
Indicative chip, `LISTINGS_NOTE`, `PRICE_NOTE`). `property.ts` launches are
developer-published, carried verbatim (`AED 746,287` stays `AED 746,287`) and
qualified by `OFFPLAN_NOTE`. The Why Dubai cards state general positions — the
tax status, the visa's existence — and never a figure or a threshold. Each file
carries its own note.

**Copy rules,** from the spec: headlines short and imperative, ending in a full
stop; eyebrows name the section, not a benefit; one solid button per section;
banned words — advisory (outside legal names), strategic, curated, bespoke,
tailored, journey, solutions, seamless, exceptional, sought-after, unlock,
elevate, hassle-free.

---

## Why it does not use the site's chrome

It was built that way once and the cost was immediate: the theme kit styles `a`
at (0,1,1), so every link rendered white on white until 241 rules were rewritten
to outrank it. A section with its own nav and footer has nothing to gain from
that fight. `realEstateRequest()` in `lib/routes.ts` gives these URLs a lean
head — favicons, the two brand typefaces, this stylesheet, analytics — and an
unknown slug falls through to the site's own 404.

### Two traps, both documented in code

- **The stylesheet's cache key.** `/assets/*` is served `immutable` for a year.
  Bump `?v=` on the link in `src/app/layout.tsx` whenever the sheet changes or
  browsers keep the old one and the page renders unstyled.
- **The link reset.** `.vxn-re a:where(:not([class]))` — `:where()`, not
  `:not()`. `:not()` adds its argument's specificity and made the reset beat the
  nav links; `:where()` matches the same classless links at zero weight.

---

## Motion

`components/Motion.tsx`: scroll reveals with entries *and* exits, per-parent
stagger, clip-path wipes on photographs, parallax on full-bleed imagery,
count-up numerals. The default state is VISIBLE; hidden exists only under
`[data-anim="pending"]`. Parallax travel is derived from `--pz` so it can never
exceed the frame's headroom. Three guards — visibility gating, a timestamp-
throttled scroll rescue, clamped count-ups with a timeout backstop — each added
after a real failure; see the file.

---

## Still outstanding

| What | Where | Why |
|---|---|---|
| **Hero footage** | `data/home.ts` → `HERO.video/poster` | The showreel is stock of people in an office — the one thing left on the page that reads as consultancy. It needs Dubai property footage, or a still from `img/communities/`. |
| Live listings | `data/listings.ts` | Twelve illustrative cards. The shape is what a feed needs to fill. |
| Two client reviews | `data/home.ts` → `REVIEWS`, marked `TODO` | Attributed to named people; need the published wording. |
| Two weak logos | `img/developers/` | `sobha-realty.webp`, `ellington.webp` are light ink on transparent. |
| Captcha | `components/LeadForm.tsx` | Needs a script and a site key. |
| Social links | `components/Footer.tsx` | Rendered without hrefs — accounts not published. |
| Arabic | `lib/routes.ts` → `isRtl()` | Dormant; no Arabic edition on the site. |
