/**
 * What the practice actually sells: communities, property types, and the
 * launches currently worth looking at.
 *
 * WHY THIS FILE EXISTS. The pillar page opened with a statement, four advisory
 * lines, a process and a set of figures — the shape of a consultancy page. A
 * property practice is browsed, not read: a visitor arrives wanting a place, a
 * kind of home, or a launch, and the page has to offer those three doors before
 * it explains anything. These are those doors.
 *
 * ---------------------------------------------------------------------------
 * ON THE NUMBERS — this file is held to a different standard to market.ts.
 *
 * `market.ts` is explicit that its prices are ILLUSTRATIVE placeholders. The
 * off-plan figures below are not: every starting price, payment split and
 * handover quarter is the figure the developer published on VALUNXT's own
 * project pages, carried across verbatim, including the precision they used
 * (`AED 746,287` stays `AED 746,287` — rounding a published starting price is
 * how a number quietly becomes wrong).
 *
 * They are still developer announcements about unbuilt buildings, so
 * OFFPLAN_NOTE renders under the grid and must not be removed. Launch pricing
 * and handover dates move; a figure shown without that qualifier reads as a
 * quote the practice has to honour.
 *
 * COMMUNITIES CARRY NO PRICES, deliberately. A "from AED …" on each tile is the
 * obvious thing to add and it would have to be invented for five of the eight —
 * `SALE_PRICES` in market.ts covers only some of these areas, and inventing the
 * rest to make a row look consistent is exactly the drift that note guards
 * against. The tiles say what each place *is*; the buy page carries the bands,
 * qualified.
 * ---------------------------------------------------------------------------
 */
import type { Community, OffPlanProject, PropertyType } from '../lib/types';

/* -------------------------------------------------------------------------- */
/* Communities                                                                */

/**
 * Dubai only. VALUNXT keeps an Abu Dhabi office and there is Abu Dhabi
 * photography in the library, but this section is headed "Dubai" and every page
 * around it says Dubai — quietly widening the map to fill a grid row would
 * promise coverage the copy has not claimed.
 */
export const COMMUNITIES: Community[] = [
  {
    name: 'Dubai Marina',
    blurb: 'Waterfront towers along the promenade, with the beach a walk away.',
    stock: 'Apartments',
    img: '/real-estate/img/communities/dubai-marina.webp',
    href: '/buy-property/',
  },
  {
    name: 'Palm Jumeirah',
    blurb: 'Beachfront villas and low-rise residences on the fronds and the trunk.',
    stock: 'Villas & apartments',
    img: '/real-estate/img/communities/palm-jumeirah.webp',
    href: '/buy-property/',
  },
  {
    name: 'Downtown Dubai',
    blurb: 'Boulevard living around the Burj, the Opera district and the Mall.',
    stock: 'Apartments',
    img: '/real-estate/img/communities/dubai-downtown.webp',
    href: '/buy-property/',
  },
  {
    name: 'Business Bay',
    blurb: 'Canal-side towers mixing homes, offices and serviced residences.',
    stock: 'Apartments & commercial',
    img: '/real-estate/img/communities/business-bay.webp',
    href: '/commercial/',
  },
  {
    name: 'Dubai Hills Estate',
    blurb: 'A mature masterplan of golf-course villas, parks and a school run.',
    stock: 'Villas & apartments',
    img: '/real-estate/img/communities/dubai-hill-estate.webp',
    href: '/residential/',
  },
  {
    name: 'Jumeirah Village Circle',
    blurb: 'Value-led apartments and townhouses, and the city’s busiest rental market.',
    stock: 'Apartments & townhouses',
    img: '/real-estate/img/communities/jvc.webp',
    href: '/investment-advisory/',
  },
  {
    name: 'Jumeirah Beach Residence',
    blurb: 'Beachfront apartments on The Walk, with short-let demand year round.',
    stock: 'Apartments',
    img: '/real-estate/img/communities/jbr.webp',
    href: '/buy-property/',
  },
  {
    name: 'Jumeirah Lake Towers',
    blurb: 'Lakeside towers and free-zone offices, priced below the Marina beside it.',
    stock: 'Apartments & commercial',
    img: '/real-estate/img/communities/jlt.webp',
    href: '/commercial/',
  },
];

/* -------------------------------------------------------------------------- */
/* Property types                                                             */

export const PROPERTY_TYPES: PropertyType[] = [
  {
    name: 'Apartments',
    note: 'Studios to full-floor units, across every freehold community.',
    img: '/real-estate/img/types/luxury-appartment.webp',
    href: '/residential/',
  },
  {
    name: 'Villas',
    note: 'Family homes with private plots, in the established masterplans.',
    img: '/real-estate/img/types/villas.webp',
    href: '/residential/',
  },
  {
    name: 'Townhouses',
    note: 'The middle ground — a garden and a community, without a villa’s cost.',
    img: '/real-estate/img/types/townhouse.webp',
    href: '/residential/',
  },
  {
    name: 'Penthouses',
    note: 'Top-floor and duplex stock, usually traded off-market.',
    img: '/real-estate/img/types/penthouse.webp',
    href: '/buy-property/',
  },
  {
    name: 'Commercial',
    note: 'Offices, retail, warehousing and industrial units.',
    img: '/real-estate/img/types/commercial.webp',
    href: '/commercial/',
  },
  {
    name: 'Off-Plan',
    note: 'Launch pricing and payment plans, with the developer assessed first.',
    img: '/real-estate/img/types/off-plan.webp',
    href: '/off-plan-properties/',
  },
];

/* -------------------------------------------------------------------------- */
/* Off-plan launches                                                          */

export const OFFPLAN_NOTE =
  'Starting prices, payment plans and handover dates are as published by each developer and are ' +
  'subject to change and availability. Figures are not an offer, a valuation or a reservation — ' +
  'we confirm current terms, escrow registration and the developer’s record in writing before you commit.';

/**
 * Eight launches, in ascending order of entry price, so the row reads as a
 * ladder rather than a shuffle.
 *
 * SOURCE: VALUNXT's own project landing pages (the `data/*.json` records behind
 * them), carried across field for field. Where the source disagreed with itself
 * it is flagged below rather than silently resolved.
 */
export const OFFPLAN_PROJECTS: OffPlanProject[] = [
  {
    name: 'Samana IBIZA',
    developer: 'Samana Developers',
    location: 'Dubailand',
    priceFrom: 'AED 699K',
    plan: '100/0',
    handover: 'Q1 2028',
    img: '/real-estate/img/offplan/samana-ibiza.webp',
  },
  {
    name: 'Avana Residences',
    developer: 'DECA',
    location: 'Jumeirah Village Circle',
    priceFrom: 'AED 740K',
    plan: '60/40',
    handover: 'Q4 2027',
    img: '/real-estate/img/offplan/avana-residences.webp',
  },
  {
    name: 'Auresta Tower',
    developer: 'Tiger Group',
    location: 'Jumeirah Village Circle',
    priceFrom: 'AED 746,287',
    plan: '30/70',
    handover: 'Q4 2028',
    img: '/real-estate/img/offplan/auresta-tower.webp',
  },
  {
    name: 'Vincitore Aqua Flora',
    developer: 'Vincitore Real Estate Development',
    location: 'Al Barsha South',
    priceFrom: 'AED 750K',
    plan: '50/50',
    handover: 'Q2 2028',
    img: '/real-estate/img/offplan/vincitore-aqua-flora.webp',
  },
  {
    name: 'Bliss Tower',
    developer: 'Pure Bliss Development',
    /* The source record disagrees with itself: its `location` field says
       Jumeirah Village Circle, while the page title and the body copy both say
       DubaiLand Residence Complex. Two fields against one, so Dubailand it is —
       worth confirming with the developer before this goes in front of a buyer. */
    location: 'Dubailand',
    priceFrom: 'AED 949K',
    plan: '30/70',
    handover: 'Q4 2026',
    img: '/real-estate/img/offplan/bliss-tower.webp',
  },
  {
    name: 'Reef 999',
    developer: 'Reef Development',
    location: 'Al Furjan',
    priceFrom: 'AED 1,158,000',
    plan: '60/40',
    handover: 'Q4 2026',
    img: '/real-estate/img/offplan/reef-999.jpg',
  },
  {
    name: 'Ocean Pearl',
    developer: 'Samana Developers',
    location: 'Dubailand',
    priceFrom: 'AED 1.6M',
    plan: '58/42',
    handover: 'Q4 2026',
    img: '/real-estate/img/offplan/ocean-pearl.webp',
  },
  {
    name: 'Sobha Elwood',
    developer: 'Sobha Realty',
    location: 'Alain Road, Dubailand',
    priceFrom: 'AED 7.93M',
    plan: '60/40',
    handover: 'Q2 2028',
    img: '/real-estate/img/offplan/sobha-elwood.webp',
  },
];

/* -------------------------------------------------------------------------- */
/* The gallery                                                                */

/**
 * Twelve frames of what living in Dubai actually looks like.
 *
 * Not a listings grid — nothing here is for sale and no frame carries a price.
 * It is the showcase band, and its job is atmosphere: the communities, the kinds
 * of home, and a few of the towers currently going up. Order matters, because
 * the mosaic in the stylesheet assigns spans by position — the first and
 * eleventh are the large frames, so they carry the widest views.
 *
 * Captions are places and property types, never claims. A photograph of a marina
 * with "AED 2.4M" under it is a listing; the same photograph with "Dubai Marina"
 * under it is what it is.
 */
export interface GalleryFrame {
  img: string;
  title: string;
  kicker: string;
}

export const GALLERY: GalleryFrame[] = [
  { img: '/real-estate/img/communities/palm-jumeirah.webp', title: 'Palm Jumeirah', kicker: 'Beachfront' },
  { img: '/real-estate/img/types/penthouse.webp', title: 'Penthouses', kicker: 'Top floor' },
  { img: '/real-estate/img/communities/dubai-marina.webp', title: 'Dubai Marina', kicker: 'Waterfront' },
  { img: '/real-estate/img/types/luxury-appartment.webp', title: 'Apartments', kicker: 'City living' },
  { img: '/real-estate/img/communities/dubai-downtown.webp', title: 'Downtown Dubai', kicker: 'The Burj' },
  { img: '/real-estate/img/types/villas.webp', title: 'Villas', kicker: 'Private plots' },
  { img: '/real-estate/img/communities/jbr.webp', title: 'JBR', kicker: 'The Walk' },
  { img: '/real-estate/img/communities/business-bay.webp', title: 'Business Bay', kicker: 'Canal side' },
  { img: '/real-estate/img/types/townhouse.webp', title: 'Townhouses', kicker: 'Family homes' },
  { img: '/real-estate/img/offplan/sobha-elwood.webp', title: 'Sobha Elwood', kicker: 'Launching' },
  { img: '/real-estate/img/communities/dubai-hill-estate.webp', title: 'Dubai Hills Estate', kicker: 'Golf & parks' },
  { img: '/real-estate/img/offplan/samana-ibiza.webp', title: 'Samana IBIZA', kicker: 'Off-plan' },
];
