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

## The scenes (2026-09-08)

**The panels became scenes.** The stack of rounded panels below was replaced on
three further references. Two things were wrong with the panels: each was sized
by its own content, so the page read as a list of cards rather than a sequence of
places; and the gutter down both sides meant no photograph ever reached the edge
of the screen — which is the one thing a property page cannot afford, because the
picture is the product.

**The system, in five rules** (the head of `valunxt-re-panels.css` is the long
version):

1. A section is a **scene**: exactly one screen tall, edge to edge, and it does
   not overflow. `height: 100svh` is deliberate rather than `min-height` — a
   definite height is what lets the pictures fill the room left over after the
   type, at every viewport, with no measuring in JavaScript.
2. Nothing that cannot fit down the screen is stacked down it. Properties,
   communities and reviews go **across** it, on rails with arrows.
3. Type has two registers: a very large, light, uppercase **kicker** that names
   the scene, and a large, light, tightly tracked **line** that makes its
   argument. Everything else is small.
4. Space is the luxury. The heading sits top left, the action at a corner, and
   the picture takes what is left.
5. Photographs bleed. A scene's side padding stops at its type.

**Which reference each scene is.**

| Scene | Reference | File |
|---|---|---|
| Buy / Sell / Rent | the Swiss triptych | `sections/ways.tsx` |
| About | tall-portrait split | `sections/panels.tsx` → `About` |
| Services | "OUR EXPERTISE" | `sections/panels.tsx` → `Serve` |
| Properties | the property carousel | `components/ListingsGrid.tsx` |
| Communities | the offset gallery | `sections/panels.tsx` → `Places` |
| Off-plan | "THE JOURNAL" | `sections/panels.tsx` → `Launches` |
| Selling | photo band, then statement | `sections/panels.tsx` → `Sell` |

### The room (2026-09-08, second pass)

The first cut of the scenes was correct in structure and wrong in density: every
section held one screen, but each one held **five or six elements** where the
references hold two or three. A tag, a statement, a paragraph, a figure row and
a button stacked in one column is a dense page with wide margins, not a spare
one.

So the fix was subtraction before spacing:

| Scene | What came off |
|---|---|
| About | The figures moved to the floor of the column; the block above centres itself, and the space between them is left empty |
| Services | The second paragraph — it restated the first at greater length |
| Off-plan | Three rows, not four. Every row past the third is bought out of the photographs |
| Enquiry | Four reasons, not six |
| Properties | The eyebrow over the heading; the heading and the intent tabs already say it |

Then the frame widened: `--vxr-edge` 4.4vw → **6vw** (90px → 132px at the cap),
`--vxr-top` and `--vxr-bot` up by roughly half, column gaps to 130–150px, and
the kicker down a step from `8.4vh` to `7vh` — it was competing with the space
rather than sitting in it.

### Rest — the scene that sells nothing

`sections/panels.tsx` → `Rest`, between Buy/Sell/Rent and About.

One photograph cut off by the top of the screen, a hairline dropped out of it,
one very large sentence, one short paragraph. **No link, no button, no list** —
it is the only scene on the page with nothing in it to click, deliberately: a
scene the reader can act on is a scene they have to decide about, and the
decision is what stops it being a rest.

It is also the only thing on the page set in **Forum**, the brand's serif —
already self-hosted and linked from `app/layout.tsx`. The reference's impact is a
display face at four times the size of anything near it; DM Sans at 90px reads as
a headline rather than as a statement. It stays the only serif here: two would
make it a style rather than a moment.

Selling used to own this arrangement (a photo band, then a centred statement).
It is a plain two-column split now — the only scene built out of nothing but
words — because the quiet scene cannot also be the template for the section that
asks for a valuation.

### The filter, third attempt

Worth recording because the first two were wrong in opposite directions. It began
as a **panel** — three tabs, four boxed fields and a submit in a white card,
costing a third of a screen to ask four questions. So it was squeezed onto a
**single hairline row**, which was worse: seven controls and a filled disc on one
line, 9.5px labels over 12px values. That is not minimal, it is small, and the
difference between the two is space.

It is two rows now: the intents on their own line set large enough to read as a
choice, the four filters under them across the full width with tall hairlines
between them, and the submit reduced to a word and an arrow — the filled disc was
the heaviest mark on a screen full of photographs, for the least important
control on it.

### The distance (2026-09-08, third pass)

The scenes were flush against each other — one screen ended and the next began on
the same pixel — which read as a stack of slides, not as a page. Two changes:

- **A margin between every scene**, `clamp(72px, 22vh, 300px)`. It is a *margin*
  and not padding on purpose: padding would come out of the screen the scene
  already fills, and every percentage height inside one (the rails, the Ways row,
  the two bleeding columns) is measured against that definite `100svh`. A margin
  sits outside the box and costs the composition nothing.
- **One ground.** There were four surfaces — white, sand, navy, brand blue — and
  alternating them is most of why the page read as a mix of other people's
  designs. Every scene is transparent now; the ground is the only surface, the
  photographs supply the colour, and exactly one scene (the enquiry) keeps a
  plane of its own as punctuation.

The statement scene lost Forum with it. A second typeface used once is the seam
where a design stops being its own; the distinction there comes from scale and
space instead, in the same DM Sans as everything else.

### Living — the lifestyle gallery

`sections/panels.tsx` → `Living`, immediately after Buy/Sell/Rent.

Frames of different shapes at different heights running off the right edge, with
the arrows and the one action at the bottom right. **It drifts**: the track is
translated by `--drift` (-1 → 1 as the scene crosses the viewport, ±3.2vw), while
the arrows page the rail's own `scrollLeft` — a transform and a scroll offset, so
they compose instead of fighting for the same property.

> **The photographs are the weak part of this section.** The reference sells the
> life: people at tables under lights, a promenade at dusk, a café street. This
> library is architecture — shot well, but nobody is living in any of it. The six
> frames in `img/living/` are the closest the library gets. Real lifestyle
> photography would change this section more than any amount of layout will.

### The scroll layer

`components/Scroll.tsx` — Lenis for inertia, plus one rAF loop that drives Lenis
*and* writes `--par` (parallax) and `--drift` (the gallery) in the same frame, so
the smoothing and everything reading the scroll position can never be a frame
apart. Reduced motion turns all of it off, Lenis included.

**The trap, and it is a bad one.** Lenis owns the scroll position while it runs:
it holds its own target and eases the real `scrollTop` toward it every frame, so
a native `window.scrollTo()` or `scrollIntoView()` is overwritten on the next
frame. Measured here: `scrollTo(0, 1998)` settled at **1611** and stopped; a
smooth `scrollIntoView()` toward y=5951 drifted to **2050** and gave up. That
broke every in-page jump in the section at once — the Buy and Rent cards, the
search submit, and every `#contact` link.

So everything goes through `lib/scroll.ts` → `scrollToTarget()`, which hands the
job to Lenis when it is running and falls back to the native call when it is not.
Same-page `#id` links are handled once by delegation in `Scroll.tsx` rather than
by touching every component that renders one.

**Parallax travel is bounded by arithmetic, not by taste:** a parallax image is
118% of its frame and moves at most ±4.5% of its own height, so it can never
reach the 18% of overflow it has to hide in. Change one number and you must
change the other.

### The pages

Eleven now, all on the same scene system — `ServicePageBody` was rebuilt on it,
which repaired the eight that already existed in one move. Three were added in
`data/pages-3.ts`:

| Page | Slug | Why it did not exist |
|---|---|---|
| Renting | `rent-property` | `sell-rent-lease-property` carried selling, renting and letting together — right for a landlord, wrong for a tenant, who was being sent to a page that opens by asking what they want to sell |
| Communities | `communities` | Eight tiles on the pillar page with nowhere to land |
| Consultation | `consultation` | Existed only as an anchor to a form |

A twelfth costs a record in `data/pages-3.ts` and its slug in `SERVICE_SLUGS`.

### The search, and the partners

**The search was small, not minimal.** Three intents set as 11px grey caption
text, four values at 12px with no dropdown indicator, and the submit reduced to
a word — nothing on the screen said any of it could be changed. The intents are
21px now with the active one underlined in the accent, every field carries a
chevron, the values are set at reading size, and the submit is the navy
rectangle every other action on the page uses.

**The partners loop.** Ten developer logos at 26px and half opacity were a grey
smear at the foot of the reviews screen — the developers whose buildings this
practice sells, rendered smaller than the small print under them. They are twice
the size at full strength and the row runs continuously: the set is rendered
**twice** and the track translates by exactly half its own width, so the loop
closes on an identical frame and the seam never lands where it can be seen. The
second pass is `aria-hidden` — the same ten names, and a screen reader should
hear them once. It pauses on hover and does not run at all under reduced motion.

### Search on the pages that browse stock

`buy-property`, `rent-property` and `off-plan-properties` carry `listingKind` in
their record, and the template renders the search and the listings rail locked to
it. A visitor who landed on Rent from search can filter rentals there instead of
being sent back to the pillar page for the one control that does it.

The three intent tabs come off on those pages: the URL and the heading have
already answered that question, and leaving them lets someone put the Rent page
into Buy mode and read a heading that disagrees with the results.

### The pin

Scrolling off the hero is not a scroll of the page past it. `.vxr-mast` is
`position: sticky`, so it stays; `.vxr-flow` — everything after it — is a higher
layer with an opaque ground and a rounded top edge, and it travels **up over**
the pinned hero. Meanwhile the hero collapses: `HeroStage` writes `--collapse`
(0 → 1 across the hero's own height) in one rAF loop, and the stylesheet scales,
lifts and dims against it.

Nothing intercepts the wheel. The scroll is the browser's, at the reader's own
speed, and the keyboard, a trackpad, a screen reader and Find-in-page all behave
normally. The only unusual thing is which element is painted on top.

Two consequences worth knowing before editing:

- **No `overflow` on any ancestor of the hero.** `overflow` anywhere above a
  sticky element silently kills the stickiness. `.vxr-flow` therefore has none;
  the rounded edge lives on the first scene inside it instead.
- **The pin is off below 1000px.** On a phone the collapse costs a screen of
  scrolling to say what the first screen already said, so the hero simply
  scrolls and the scenes take one screen as a *floor* rather than a fixed height.

### Two traps this layout sets

- **Percentage heights need a definite row.** `grid-auto-flow: column` with no
  explicit row gives an auto row, so `height: 100%` inside a rail card resolves
  to nothing and the card falls back to its image's intrinsic height — which
  overflowed the screen by 123px before `grid-template-rows: minmax(0, 1fr)` was
  added to `.vxr-rail`. Same fix on `.vxr-ways__row`.
- **`<figure>` carries `margin: 1em 40px` from the UA sheet.** It is why the
  Selling band stopped 40px short of both edges. Reset once in the scene core —
  and note that `.vxn-re .vxr-scene figure` is *(0,2,1)*, which out-specifies a
  plain `.vxn-re .vxr-about__shot` *(0,2,0)*, so the two columns that set their
  own negative margins carry their parent class to clear it.
- **Never `scrollIntoView` on a rail.** It scrolls every scrollable ancestor
  including the document, so nudging a rail drags the whole page to it. The
  rails use `scrollBy` on the element; see the note in `components/rail.tsx`.

---

## The panel system this replaced (2026-09-07)

**Rebuilt on a reference the client supplied.** The page had drifted into three
visual languages at once — captured Elementor, a set of inline-styled sections
with their own colours (one of them on a teal this brand does not own), and the
kit's own components. It is now one system, taken from the reference and put in
this brand's clothes.

**The system, in five rules:**

1. The page is a stack of rounded panels on a neutral ground. A panel is white,
   brand blue, or a photograph. Nothing else.
2. Every panel takes the same radius and the same gutter, so the stack reads as
   one object seen in sections rather than as a list of bands.
3. A section is labelled by a small outlined pill, centred — never an eyebrow
   beside a heading.
4. A statement is centred, set large and light, with the turn of the argument in
   the accent. One emphasis per statement.
5. An action is a pill with the arrow in its own disc.

**What is ours:** the blue pair the rest of the site was rebuilt on
(`#1436D8 → #2F63FF`), and DM Sans — the brand's display face, and the same
class of grotesque the reference sets its type in. Forum stays on the service
pages; the pillar page is set entirely in DM Sans, because the reference's look
is a single grotesque at three sizes.

**The masthead** is the reference's opening frame at full screen: a white bar of
its own, then the photograph edge to edge and floor to ceiling, the headline
over its top-left with no panel behind it, a "scroll down" chip low-left, and
the blue card flush into the bottom-right corner of the screen — over the
picture, not beside it. That corner is the join the composition turns on.

The photograph is Palm Jumeirah, the one asset in this section that carries no
other developer's branding, cropped so its empty quarter falls where the
headline goes and graded cool so white type sits on it. It was a 9000×3000 JPEG
at 16.5 MB; `img/hero/mast.webp` is 2560 wide at 445 KB, with a 1280 sibling for
small screens.

| | |
|---|---|
| `components/HeroStage.tsx` | The masthead. One movement: the picture drifts against the scroll inside its own frame, measured in rAF rather than off a scroll event. |
| `components/sections/panels.tsx` | Every presentational section of the page. |
| `components/Nav.tsx` | The bar, on the reference's arrangement: brand, a Services dropdown, the links, two quiet links, the search, one action. |
| `public/assets/css/valunxt-re-panels.css` | The system. Loaded after `valunxt-realestate.css`, which keeps the drawer, the footer, the forms and the service pages. |
| `public/real-estate/img/brand/x-mark.svg` | The mark as a one-colour mask, generated from the logo file's own paths. |

**What kept its component.** Four things on the page are behaviour, not
presentation, and they were restyled rather than rewritten: the search (drives
the listings store and mirrors into the URL), the grid (filters against it), the
accordion (native `<details>`), and the link cloud (writes real searches).

**Fixed on the way.** The services carousel called
`scrollIntoView({ block: 'nearest' })` on its active card every eight seconds.
That name reads as if it only moves the nearest scroller; it does not — it
scrolls every scrollable ancestor, the document included. From anywhere on the
page, including the masthead, the whole page was being dragged down to that
section twice a minute. It sets `scrollLeft` on its own rail now, and stops
advancing when it is off screen or under the pointer.

**Still to prune.** `valunxt-realestate.css` keeps the rules for the home
sections this replaced. They are inert — nothing on the page carries those class
names any more — but several are shared with `ServicePageBody`, so removing them
is a hand pass against that page rather than a search and delete.

### Second pass on the same system

The system held; the sections built on it did not, and the client said so
section by section. What changed:

**The order** is now the one asked for: masthead → About → what it costs → the
doors → services → search and listings → communities → off-plan → and the rest
as they were.

**"What it costs"** (`sections/range.tsx`) is new, and it answers the question
the page was previously ducking. A price on a card is a listing, not a
valuation; this is the evidence a price is read against — the per-square-foot
band each community trades in, the villa band where there is villa stock, and
the yield that follows. Buy and rent are the same table with different columns,
so they are one component with the same Buy/Rent toggle the search uses. It is a
real `<table>`: a grid of divs would say this to a sighted reader and nothing at
all to a screen reader.

**The doors** are big and image-led again, which is what the design two passes
ago got right — 3:4 pictures with the name on them and the sentence on hover.
The pass between made them short landscape tiles with the type underneath, which
is a list of links with pictures attached.

**The property types panel is gone.** Its six names are the filter chips inside
the search, where they filter something. Six pictures that only said "villas
exist" were a section's worth of page for no decision.

**The search** is rules rather than a box — the one component still wearing a
grey card with four bordered inputs while every other list on the page sat on
hairlines. Same component, same store, same URL mirroring.

**The listing card** lost a status chip, a save button that saved nothing, a
location pin, three spec icons and three tag pills: nine pieces of chrome around
four facts. What is left is the picture, the price, what it is, where it is, and
the three numbers a buyer compares on — labelled, so "2" is never a number
without a noun. The Indicative chip stays until a live feed replaces
`data/listings.ts`.

**Communities, off-plan and services** are two and three across rather than
three and four, because each card carries more than a name.

**The footer** is the last panel in the stack rather than a different object in a
different typeface on a gradient nothing else used.

**The FAQ kept its design and lost its ceiling.** The base sheet animates the
panel `max-height: 0 → 420px`; an answer taller than that guess was silently cut
off, and `overflow: hidden` meant no scrollbar said so. It interpolates a grid
row from `0fr` to `1fr` now, which animates to the content's own height whatever
it is.

**The masthead** dropped the scroll chip, gained a paragraph under the name, and
the corner card gained white on its top and left edges — without it the blue
bleeds into the water behind it and the corner stops reading as a card.

---


### Third pass — selling the life, not the inventory

The client's note was that the page was correct and cold: *"we are not selling
the lifestyle of Dubai."* It was true. Every section was inventory or evidence —
what is for sale, what it costs, who valued it — and none of that is why anybody
moves here.

**`sections/life.tsx` is the answer.** Four moments through one day, each a
full-bleed photograph with one line over it, on a deep navy ground: the beach at
seven, the Hills on a Saturday, the Marina at six, and the winter everybody else
flies here for. No price, no square foot, no call to action until the day is
over. It sits directly after About and before any of the stock, because a page
that opens with the inventory is asking people to buy a floor area.

It is deliberately **not** a panel: no radius, no gutter, edge to edge. The
moment a photograph is held inside a rounded card it becomes another product
tile.

**The photography was the constraint.** Most `communities/*` files are 500px
square — fine for a four-across index, mush at full bleed. The four
high-resolution assets the section owns (`types/penthouse`, `types/villas`,
`types/luxury-appartment`, `communities/palm-jumeirah`, all 1840–1920px) were
being used at thumbnail size or not at all; they are re-cropped to a common
editorial frame in `img/life/` and carry this section. Two doors were also
pointing at the two smallest files on disk (`offplan.webp` at 420px,
`communities/jbr.webp` at 500px) while being blown up to a full-height 3:4
frame — both now point at 1840px sources.

**The ground went warm.** `--vxr-ground` was `#EFEFF3`, a cool grey, which is a
consultancy's palette and made every photograph look like it was taken in an
office. It is `#F1ECE4` now — sand — with `--vxr-night` for the dark sections.

**The copy stopped filing and started selling.** "Luxury addresses across Dubai,
represented properly" became "Live where Dubai is at its best"; "Everything
currently on our books" became "The ones we would show a friend"; "What are you
looking for?" became "Where do you want to wake up?". The About statement is now
the argument the whole page rests on: *some people buy a property in Dubai,
others buy the morning they get to wake up in.*

Nothing factual moved. The bands, the figures, the launches and the Indicative
chip are the same records they were, and the one claim the new copy adds — no
personal income tax — is a statement about the emirate, not about a property.

---


### The three ways in

`sections/ways.tsx` replaced the four picture doors, on a reference the client
supplied: a flat ground, a very large light uppercase line centred on it, a
black pill under that, and three photographs in an asymmetric row with the
middle one taller and starting higher. Small crosses mark the left and right
edges of the frame.

**Different from the reference, on instruction:** it crops its outer two images
off the edges of the screen; all three of ours are whole. Bottom-aligning the
row (`align-items: end`) is what drops the outer two, so the three bottoms line
up at every width and only the tops step.

**Four became three.** Buy, Sell and Rent — Off-Plan and Commercial were doing
the work of a filter, and both still exist as one: Off-Plan is a tab in the
search and a panel of its own, Commercial is a type chip.

**The centred line is a screen, not a heading.** At rest it carries the
section's own title and a short paragraph; while a card is under the pointer it
carries that card's name and description, and the card's label appears above its
picture. So the copy is in one place at a time — the reader is either being told
what the section is or being told about one of the three things in it, never
both. The `<h2>` is keyed on what is showing, so React replaces the node and the
entry animation plays on every change rather than only the first.

**The type is a deliberate exception.** Every other statement on this page is
tight, sentence case and centred on a panel; this one is uppercase, light and
widely tracked, because that is what is being replicated. It should stay the
only section that sets type this way.

Clicking a card does what the doors did: Buy and Rent set the search to that
intent and take the reader to the results; Sell goes to the seller's panel.
The click animations are still to be designed.

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
| **Service page heroes** | `data/service-pages-2.ts` → `heroImg` | The four detail pages still open on the corporate stock the home page dropped on 2026-09-08 — a handshake, a data chart, a keychain, a neon "CAPITAL MARKET" graph. `img/services/` now holds Dubai property crops that would replace them. |
| **Hero footage** | `data/home.ts` → `HERO.video/poster` | The showreel is stock of people in an office — the one thing left on the page that reads as consultancy. It needs Dubai property footage, or a still from `img/communities/`. |
| Live listings | `data/listings.ts` | Twelve illustrative cards. The shape is what a feed needs to fill. |
| Two client reviews | `data/home.ts` → `REVIEWS`, marked `TODO` | Attributed to named people; need the published wording. |
| Two weak logos | `img/developers/` | `sobha-realty.webp`, `ellington.webp` are light ink on transparent. |
| Captcha | `components/LeadForm.tsx` | Needs a script and a site key. |
| Social links | `components/Footer.tsx` | Rendered without hrefs — accounts not published. |
| Arabic | `lib/routes.ts` → `isRtl()` | Dormant; no Arabic edition on the site. |
