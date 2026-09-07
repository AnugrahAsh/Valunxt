# VALUNXT Capital

The VALUNXT Capital website and admin panel, on Next.js 16 (App Router) and
TypeScript.

This is a direct port of the PHP build that preceded it. **The rendered page is
the same page**: the same Elementor markup, the same stylesheets in the same
order, the same scripts, the same copy, the same URLs. The whole of the PHP
source is kept verbatim in [`_php-backup/`](_php-backup) so any question about
"what did it used to do?" has an answer in the repository.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

---

## How the site is put together

### Two editions, one set of pages

The site is published once per market, on its own URL prefix:

| Prefix    | Market                                        |
| --------- | --------------------------------------------- |
| `/en-in/` | India (the default)                           |
| `/en-ae/` | United Arab Emirates                          |

Only the home page genuinely differs per market, so only the home page has two
templates ([`HomeInBody`](src/components/pages/HomeInBody.tsx) and
[`HomeAeBody`](src/components/pages/HomeAeBody.tsx)). Every other page is one
component rendered under `src/app/[region]/…`, region-aware through
[`rurl()`](src/lib/region.ts) — which is why the header, the footer and every
in-page link keep the visitor in the market they arrived in.

A bare URL — the root, an old inbound link, a bookmark from before the split —
is forwarded to the visitor's edition by [`src/middleware.ts`](src/middleware.ts):
their last choice (cookie), then the country the host reports, then India. It is
a 302, because the answer depends on the visitor.

### Sections, not micro-components

Each page is the sequence of sections the PHP template required, in the same
order. A route file reads like the `index.php` it replaces:

```tsx
// src/app/[region]/faq/page.tsx
const { generateMetadata, Page } = definePage('/faq/', ({ page, region }) => (
  <>
    <PageHeroSection page={page} region={region} />
    <FaqSection region={region} />
    <SubscribeSection page={page} region={region} />
  </>
));
```

| Directory                                             | What lives there |
| ----------------------------------------------------- | ---------------- |
| [`src/components/layout/`](src/components/layout)      | The chrome: preloader, the three captured headers, the two captured footers, the mega menu, the region switcher, the cookie banner, the script block |
| [`src/components/sections/`](src/components/sections)  | Sections shared by more than one page: page hero, subscribe band, FAQ, community, platform, research list and detail, industries, leadership, testimonials, track record, blog article, clients advisory |
| [`src/components/pages/`](src/components/pages)        | One component per page body, where that body is unique to the page |
| [`src/app/`](src/app)                                  | Routes — thin files that name a page and list its sections |

### One route for pages that only differ by content

Where the PHP build had several near-identical files, there is now one route:

| Was                                        | Is now |
| ------------------------------------------ | ------ |
| 4 × `blogs/<slug>/index.php`               | [`app/[region]/blogs/[slug]/page.tsx`](src/app/[region]/blogs/[slug]/page.tsx) + [`src/data/articles.ts`](src/data/articles.ts) |
| 5 × `research/<slug>/index.php`            | [`app/[region]/research/[slug]/page.tsx`](src/app/[region]/research/[slug]/page.tsx) + the page registry |
| 4 × service pages, 4 × group company pages | still one component each — their bodies genuinely differ |
| Pages created in the admin panel           | [`app/[region]/[...slug]/page.tsx`](src/app/[region]/[...slug]/page.tsx), served from the database |

### The page registry

Every page's `$PAGE` declaration — body class, Elementor stylesheet list, header
and footer template, post id, hero, path — is transcribed into
[`src/data/page-configs.json`](src/data/page-configs.json) and typed by
[`PageConfig`](src/lib/page-config.ts). Two things read it: the page itself, and
the root layout, which has to put the WordPress body class on `<body>` and so
resolves the page from the URL that `middleware.ts` publishes as `x-vxn-path`.

### Why the styles cannot drift

- Every asset — CSS, JS, fonts, images, video — moved to `public/` unchanged.
  Nothing was re-minified, re-ordered or rewritten.
- [`HeadAssets`](src/components/layout/HeadAssets.tsx) emits the 53 stylesheets
  and 9 inline `<style>` blocks in the exact order `includes/head.php` did, from
  inside the real `<head>`. That interleaving *is* the cascade: `post-*.css`
  comes after the global inline styles, `valunxt-brand.css` after both, and the
  redesign's sheets after that (see below).
- `next.config.ts` sets `images.unoptimized` — a rewritten `<img src>` would
  change the DOM the theme CSS is written against.
- Navigation uses plain `<a href>`, not `next/link`, so every page load re-runs
  jQuery, SmartMenus and the Elementor bundles against a fresh document — the
  same lifecycle they had under PHP.

---

## The vxh redesign

The second-generation design language — a light stage with a living colour
field, product-style visuals in place of stock photography, angled seams and
motion that either explains something or answers the pointer.

**Where it lives**

| | |
|---|---|
| `src/components/vxh/kit.tsx` | The kit: line icons, the sparkline, the abstract band layer, and the product-style mini UIs (`ledger`, `gauge`, `listing`, `bars`, `chart`, `pipe`). Port of `includes/vxh-kit.php`. |
| `public/assets/css/vxn-mega.css` | Mega menu, second generation. Site-wide. |
| `public/assets/css/vxn-inner.css` | The inner-page skin: cobalt tokens site-wide and the stage treatment of the shared inner hero. Site-wide, keyed off the `vxn-p-<segment>` class the root layout puts on `<body>`. |
| `public/assets/css/vxn-home-ae.css` | Tokens, buttons, cards and the abstract layer. Page-owned. |
| `public/assets/css/vxn-services-ae.css` | The services components — the rail, the explorer, the tools. Page-owned. |
| `public/assets/css/vxn-pages.css` | The About and Industries components. Page-owned. |
| [`SmoothScroll`](src/components/layout/SmoothScroll.tsx) | Lenis, site-wide: the wheel drives a velocity that decays rather than the scroll position directly, so a flick carries and the scroll-composed sections read a continuous position instead of a staircase of wheel steps. It moves the real document scroll, so sticky, anchors and every `getBoundingClientRect()` keep working. Off under reduced motion and in `/admin`; touch is left to the platform. |
| `public/assets/js/vxn-home-ae.js` | Home behaviour: the console, the process deck, the intent tabs, the values rail, the counters. |
| `public/assets/js/vxn-services-ae.js` | Services behaviour: the sticky rail, the explorer, the four interactive tools, the comparison toggle. |

Page-owned sheets and scripts are declared per page as `PageConfig.css` and
`PageConfig.js`, exactly as `$PAGE['css']` did:
[`HeadAssets`](src/components/layout/HeadAssets.tsx) emits the sheets after the
brand sheet and the two site-wide skins, and
[`SiteScripts`](src/components/layout/SiteScripts.tsx) appends the scripts after
the Elementor block — which is where the PHP's `<script defer>` tags executed.

**Which pages carry it**

- `/en-ae/` — [`HomeAeBody`](src/components/pages/HomeAeBody.tsx)
- `/en-ae/services/` — [`UaeServicesBody`](src/components/pages/UaeServicesBody.tsx)
- `/en-ae/services/<practice>/` and `/<practice>/<sub>/` — one template,
  [`ServiceDetailBody`](src/components/pages/uae-services/ServiceDetailBody.tsx)
- `/about/` and `/industries/` — both editions
- The mega menu, the reading-progress bar and the "Talk to a partner" dock —
  every page
- The enquiry block that closes the home page, the services index and every
  service page — [`ContactSection`](src/components/sections/ContactSection.tsx).
  It replaced the last captured Elementor block on those pages, so they no
  longer load `post-17.css`; its form
  ([`ContactForm`](src/components/sections/ContactForm.tsx)) posts to
  `/form-handler/` directly rather than through the Elementor form widget, and
  the site-wide lead script names `.vxc-form` alongside the captured forms.

  It also absorbed the "Ready when you are" band that used to follow it on those
  two pages — a second contact CTA a screen below the first — taking over its
  cream ground and its arc artwork.
  [`ArcField`](src/components/sections/ArcField.tsx) rebuilds that artwork in
  three.js: annulus sectors at six radii on their own planes, leaning toward the
  pointer and easing forward on hover. three is dynamically imported and the
  scene only starts once the section nears the viewport, so it stays out of the
  initial bundle; the flat CSS layers render first and remain the whole story
  where WebGL is unavailable or the visitor has asked for reduced motion.

  About and Industries keep their "Ready when you are" band: neither carries an
  enquiry block, so it is their only closing call to action.
- "Find the right solution" on the home page —
  [`SolveTabs`](src/components/sections/SolveTabs.tsx). Stripped to the question
  and the three answers: no panel, no photograph, no call to action repeated
  from the two that already close the page. The animated ground runs the full
  width of the section and the copy sits directly on it, held legible by one
  gradient wash rather than by a card.

  Each tab carries its own ground, and they are three different abstracts
  rather than one recoloured three times — vertical light shafts
  ([`GradientBlinds`](src/components/sections/backgrounds/GradientBlinds.tsx),
  from react-bits), then flowing diagonal ribbons, then a pointer-rippled
  lattice (both in
  [`shaders.ts`](src/components/sections/backgrounds/shaders.ts), on the shared
  [`ShaderField`](src/components/sections/backgrounds/ShaderField.tsx) canvas).
  They run on `ogl`. A tab's ground is built the first time that tab is opened
  and paused whenever it is not the active one, so a visitor who never switches
  tab pays for one WebGL context.
- About Us on the home page —
  [`AboutBento`](src/components/sections/AboutBento.tsx). A twelve-column bento
  in place of the expanding rail of photo cards, which kept three quarters of
  what it said behind an interaction. The lead tile carries the section's name
  and who we are, the four principles get one line each, and the figures are
  read from the registries rather than typed in. No photography.

  Two of the tiles are nothing but artwork —
  [`WebThreads`](src/components/sections/backgrounds/WebThreads.tsx) and
  [`Lightfall`](src/components/sections/backgrounds/Lightfall.tsx), both from
  react-bits on `ogl`, recoloured to the brand ramp. Nothing is set over them,
  so neither needs a scrim; an earlier pass overlaid copy on the kit's `Abs`
  layers, and the scrim that required is what made those tiles read as a
  gradient wash rather than as a drawing. Both pause when scrolled out of view
  or the tab is hidden.
- Insights on the home page —
  [`InsightsRail`](src/components/sections/InsightsRail.tsx). Heading and its
  action on the left, the lede opposite, the rail's controls under those, then
  tall portrait cards that scroll horizontally with the category set over the
  foot of each image, and two wide cards to close. The row scrolls natively with
  snap points, so a trackpad, a touch drag and the two buttons all move the same
  thing; the controls hide themselves when there is nothing to page through.
- The home page hero and the services, sharing one mark. `HeroMark` rides a
  sticky layer over both sections rather than sitting inside either, so the same
  X carries the reader from the headline through the six practices — settling
  out of the hero's band to the middle of the screen, shrinking to make room for
  the cards, and turning one full revolution on its axis over the run. Both
  sections are transparent; the wrapper holds the white.

- "Our Services" —
  [`ServicesScroll`](src/components/sections/ServicesScroll.tsx), which replaced
  the bento. The six run *down* the page rather than swapping in one place: each
  takes its own grid row and alternates the column it sits in, so the reader
  travels past them. The lane between the two columns is left clear and the mark
  descends through it, turning as it goes.

  The card is the bento's card, unchanged — same `.vxh-cell`, same mini UI, same
  stretched link, same expand button opening the same `ServiceModal`. Only its
  frame is different. `services()` in `vxn-home-ae.js` reveals each card from
  its own side, which a shared reveal primitive cannot do because it does not
  know which side a thing is on. Below 820px there is no lane to leave clear, so
  the six become one column and the section takes a white ground of its own to
  keep the mark with the hero.

- The home page hero. Three bands on white, with nothing in any of them that
  another one already says: the headline against the offer, then a stage with
  one line of proof to each side, then the six practices on a single hairline.
  Running behind all three is
  [`HeroMark`](src/components/sections/HeroMark.tsx) — the X from the wordmark,
  in three dimensions.

  It is exact because it is the same file. The geometry is not a redraw: the
  mark's own SVG (`uploads/logo/favicon.svg`, the four paths of the X on a 1080
  grid) is fetched, parsed with three's `SVGLoader` and extruded with a bevel.
  Change the logo and this changes with it. The one thing not taken verbatim is
  the pair of fills — the mark file is still authored in an older magenta/navy
  pair, while the logo as it is drawn everywhere on this site is the brand blue
  and violet, so the two are mapped. `SVGLoader` reads presentation attributes
  and inline styles but not a `<style>` block, and this file colours its paths
  by class, so the class-to-fill map is read off the stylesheet by hand.

  The room it is lit by is made rather than loaded — a canvas with a soft sky, a
  floor and three softboxes, run through PMREM — so nothing is fetched but
  `three` and the mark. It sways rather than spins, because the mark has to stay
  readable as the mark at every moment; it leans toward the pointer, and it can
  be grabbed, with the throw carrying, decaying, and the offset easing home so
  the hero settles back into its own composition however hard it is thrown.

  It is fitted to the frame rather than to a fraction of the canvas — the canvas
  covers the section, and a phone's section is far taller and narrower than a
  laptop's — and centred on the band the layout leaves for it. three and the
  loader are dynamically imported when the hero nears the viewport, never under
  reduced motion, and the frame loop stops when the hero scrolls away.

  The passes before it stood a product card beside the headline — "Corporate Tax
  · Annual Return", a four-step progress bar, an ON TRACK pill, three key/value
  rows. That is a software dashboard, and a dashboard beside a headline is the
  shape of a SaaS home page rather than an advisory firm's. Going with it: the
  WebGL colour field (its canvas had not been rendered since the hero went
  light), the pointer parallax, the rotating confirmation toast and the ticking
  figure — about 14KB of CSS and 4KB of script.

- "How we work" on the home page. Five white cards on the blue stage, each cut
  to the same angle as that stage, each pinning as it reaches the top so the
  next one climbs over it and leaves a sliver of it showing; the card being
  covered is pressed back and tinted so it recedes into the stage rather than
  staying a bright band above the card being read.

  Every card carries its step and the file that step produces — the discovery
  notes, the engagement letter, the signed valuation, the three parts of an
  audit file, the thread with a partner. Those files are labelled rows and real
  values; the first pass drew them as grey skeleton bars, which on a white card
  reads as a document that failed to load rather than one being written.

  It replaces a pinned scene: a column of steps beside a frame that swapped its
  contents as you passed each one. That frame never pinned — `.vxh-story`
  carried `overflow: hidden`, which makes a scroll container, and a `sticky`
  child of one has nothing to stick to. The stacking here is plain CSS sticky
  with a staggered `top`; script only plays each card's file once and sets the
  `--cover` that dims the card underneath.

- The services bento on the home page —
  [`ServicesBento`](src/components/sections/ServicesBento.tsx). Each tile keeps
  its direct link to the practice page and gains an expand button that opens
  that practice's overview in a dialog
  ([`ServiceModal`](src/components/sections/ServiceModal.tsx)): the promise and
  its proof points, what the work is, the sub-services as a grid, how an
  engagement runs, and what lands in the client's file.
  [`serviceOverview()`](src/lib/service-overview.ts) flattens the three UAE
  registries into just what the dialog needs, on the server, so 100KB of copy
  stays out of the browser bundle.
- The "Stay Ahead" subscribe band that closes every page —
  [`SubscribeSection`](src/components/sections/SubscribeSection.tsx). One
  centred column on the band's own cream ground: the eyebrow, the sentence, a
  hairline-ruled field with an ink pill on the rule, and the unsubscribe note.
  The ground is untouched — the line artwork repeating along the bottom edge
  and the light-wave rising over it are the band's from the capture.

  The redesign is entirely in `valunxt-brand.css`, keyed to the Elementor widget
  ids. Twenty-one page bodies still carry this template inline from the capture
  alongside the shared partial, so styling it through the ids they share is what
  keeps one design on every page; changing the markup would have changed one
  page in forty.

### The UAE service tree

The six practices and the pages beneath them are a registry, not thirty-six
files: [`src/data/uae-services.ts`](src/data/uae-services.ts) holds the tree,
[`uae-service-detail.ts`](src/data/uae-service-detail.ts) the long-form copy, and
[`uae-service-extras.ts`](src/data/uae-service-extras.ts) the tools, galleries,
FAQs and deliverables. A sub-service with no copy of its own inherits its
practice's, keeping its own name and lede, so no page is a placeholder. Adding
one is an entry in the tree; the route, the index, the breadcrumb and the SEO
follow.

Slugs are the URL and are permanent. `vxnServices('en-ae')` in
[`region.ts`](src/lib/region.ts) agrees with the tree on all six.

---

## The real estate section

`/en-ae/real-estate/` — a Dubai property portal: a searchable, filterable
listings page with off-plan launches, communities and a seller's door, plus eight
service pages beneath it. It lives in [`src/real-estate/`](src/real-estate) with
its own navigation, footer and stylesheet, and has [its own
README](src/real-estate/README.md) covering the design brief it was built to,
the search architecture, and the three standards its numbers follow.

It is the one part of the site that is **not** captured Elementor markup and
does not go through `PageShell`. `realEstateRequest()` gives its URLs a lean
head — favicons, the two brand typefaces, its stylesheet, analytics. Everything
else about it is ordinary: it lives inside the market tree, links go through
`rurl()`, contact details come from `site-data.ts`, and the enquiry form posts
to `/form-handler/` so leads arrive in the admin panel labelled "Real Estate".

Two traps worth knowing, both documented in code: `/assets/*` is served
`immutable`, so the `?v=` on its stylesheet link in `src/app/layout.tsx` must
be bumped when the sheet changes; and its link reset uses `:where()` rather than
`:not()` for a specificity reason explained in the stylesheet.

**Published but not advertised** — no navigation item, no sitemap entry.

---

## The admin panel

`/admin` — a separate application with its own stylesheet, never indexed, and
loading none of the site's Elementor cascade.

| Screen              | Route |
| ------------------- | ----- |
| Sign in             | `/admin/` |
| Dashboard           | `/admin/dashboard` |
| Enquiries           | `/admin/enquiries` |
| Pages & SEO         | `/admin/pages` |
| Page editor         | `/admin/pages/edit?id=N` or `?new=1` |
| Sitemap settings    | `/admin/sitemap` |

Default credentials, seeded into an empty `users` table on first connection:
`admin@valunxtcapital.com` / `Admin@123`. **Change them before the panel is
reachable from the internet**, and set `ADMIN_SESSION_SECRET` (see below).

Sessions are an HMAC-signed, httpOnly cookie rather than a PHP session — there is
no server-side session store to keep. Existing accounts keep working: PHP's
`password_hash()` bcrypt digests verify unchanged.

Saving a page rewrites two files, exactly as the PHP panel did:

- `public/sitemap.xml`
- `src/data/seo-map.json` — the map the public pages read, so a page view never
  opens a database connection and the site keeps rendering if MySQL is down.

**One deliberate difference.** The PHP panel created a new page by writing a
folder and an `index.php` to disk. A Next.js route cannot appear at runtime, so a
page created in the panel is stored in the database and served by the catch-all
route instead — through the same shared page-hero + subscribe body the scaffolded
file used. The page is live the moment it is saved, with no redeploy, which is
what the scaffolding was reaching for.

---

## Configuration

Copy `.env.example` to `.env.local` and fill in what applies. Everything has a
working default, so a fresh clone runs with no configuration at all.

| Variable                 | Purpose |
| ------------------------ | ------- |
| `NEXT_PUBLIC_SITE_ORIGIN`| Canonical/OG/sitemap origin when the request host is not authoritative |
| `DB_HOST` … `DB_PASS`    | MySQL for enquiries and the admin panel |
| `ADMIN_SESSION_SECRET`   | Signs the admin session cookie |
| `ADMIN_DEFAULT_*`        | The administrator seeded into an empty `users` table |

Without `DB_*`, the credentials fall back to what the PHP build shipped:
localhost/XAMPP when served from `localhost`, the Hostinger database otherwise.

---

## What moved where

| PHP                                   | Next.js |
| ------------------------------------- | ------- |
| `config.php`, `includes/region.php`   | [`src/lib/region.ts`](src/lib/region.ts), [`region-assets.ts`](src/lib/region-assets.ts) |
| `includes/site-data.php`              | [`src/lib/site-data.ts`](src/lib/site-data.ts) |
| `includes/seo.php`                    | [`src/lib/seo.ts`](src/lib/seo.ts) |
| `includes/head.php`                   | [`HeadAssets`](src/components/layout/HeadAssets.tsx) + `src/app/layout.tsx` |
| `includes/header.php`, `footer.php`   | [`PageShell`](src/components/layout/PageShell.tsx) |
| `includes/scripts.php`                | [`SiteScripts`](src/components/layout/SiteScripts.tsx) |
| `includes/preloader.php`              | [`Preloader`](src/components/layout/Preloader.tsx) |
| `includes/partials/*`                 | `src/components/layout/`, `src/components/sections/` |
| `includes/blog-catalog.php`           | [`src/data/blog-catalog.ts`](src/data/blog-catalog.ts) |
| `data/leadership.php` etc.            | `src/data/leadership.ts`, `testimonials.ts`, `track-record.ts` |
| `data/seo/seo-map.php`                | [`src/data/seo-map.json`](src/data/seo-map.json) |
| `form-handler.php`                    | [`src/app/form-handler/route.ts`](src/app/form-handler/route.ts) |
| `.htaccess` redirects                 | `redirects()` in [`next.config.ts`](next.config.ts) |
| `admin/*`                             | `src/app/admin/`, `src/lib/admin/`, `src/components/admin/` |
| `assets/`, `LOGO/`, `icons/`          | `public/` (byte-identical) |

Three data files ship empty **on purpose** — `leadership.ts`, `testimonials.ts`
and `track-record.ts`. Each carries the reason at the top; `/about/leadership/`
and `/track-record/` return 404 until they are filled in, exactly as before.
