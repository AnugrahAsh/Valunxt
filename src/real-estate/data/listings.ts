/**
 * The portal's listing set — what the search bar filters and the listings grid
 * shows.
 *
 * ---------------------------------------------------------------------------
 * ILLUSTRATIVE, and labelled that way on screen.
 *
 * There is no listings feed behind this portal yet. These twelve are shaped
 * like real Dubai stock — the communities, the unit mixes, the price bands and
 * the cheque structures are the ones that exist — but no live listing sits
 * behind any card, and the numbers have not been sourced from DLD records.
 * Publishing them as fact would be inventing a commercial record; publishing
 * them as an illustration of what the portal will carry is honest and lets the
 * design be reviewed now. LISTINGS_NOTE renders under the grid and must not be
 * removed without replacing the data.
 *
 * Replace with a feed or a CMS before launch. The shape below is what that
 * source needs to fill: the structured fields (`kind`, `type`, `bedrooms`,
 * `priceAed`, `communitySlug`) exist so the search bar can filter without
 * parsing display strings, and the display strings exist so the card never has
 * to format a number.
 * ---------------------------------------------------------------------------
 */

export type ListingKind = 'buy' | 'rent' | 'offplan';
export type ListingType = 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'commercial';

export interface PortalListing {
  id: string;
  kind: ListingKind;
  type: ListingType;
  title: string;
  community: string;
  /** Matches COMMUNITIES entries by name, for the search filter. */
  communitySlug: string;
  /** Formatted for display — these carry units. */
  price: string;
  /** 'guide price' for resale, 'per year' for rentals, 'from' for off-plan. */
  priceNote: string;
  /** For the price-band filter. Annual figure for rentals. */
  priceAed: number;
  bedrooms: number;
  beds: string;
  baths: string;
  area: string;
  /** 'Ready', 'Available now', 'Q4 2027'. */
  status: string;
  img: string;
  tags: string[];
}

export const LISTINGS_NOTE =
  'Listings shown are illustrative of the stock this portal will carry. Prices, availability and ' +
  'yields move with the market — request a current valuation before acting on any figure shown here.';

export const LISTINGS: PortalListing[] = [
  /* ---- For sale ---------------------------------------------------------- */
  {
    id: 'marina-2br',
    kind: 'buy',
    type: 'apartment',
    title: 'Marina-View Two Bedroom',
    community: 'Dubai Marina',
    communitySlug: 'dubai-marina',
    price: 'AED 2.4M',
    priceNote: 'guide price',
    priceAed: 2_400_000,
    bedrooms: 2,
    beds: '2 bed',
    baths: '2 bath',
    area: '1,240 sq ft',
    status: 'Ready',
    img: '/real-estate/img/listings/marina-tower.webp',
    tags: ['Freehold', 'Marina view', 'Chiller free'],
  },
  {
    id: 'palm-5br-villa',
    kind: 'buy',
    type: 'villa',
    title: 'Beachfront Garden Villa',
    community: 'Palm Jumeirah',
    communitySlug: 'palm-jumeirah',
    price: 'AED 18.5M',
    priceNote: 'guide price',
    priceAed: 18_500_000,
    bedrooms: 5,
    beds: '5 bed',
    baths: '6 bath',
    area: '6,800 sq ft',
    status: 'Ready',
    img: '/real-estate/img/communities/palm-jumeirah.webp',
    tags: ['Private beach', 'Upgraded', 'Vacant on transfer'],
  },
  {
    id: 'downtown-1br',
    kind: 'buy',
    type: 'apartment',
    title: 'Boulevard One Bedroom',
    community: 'Downtown Dubai',
    communitySlug: 'downtown-dubai',
    price: 'AED 1.65M',
    priceNote: 'guide price',
    priceAed: 1_650_000,
    bedrooms: 1,
    beds: '1 bed',
    baths: '2 bath',
    area: '780 sq ft',
    status: 'Ready',
    img: '/real-estate/img/types/luxury-appartment.webp',
    tags: ['Burj view', 'Tenanted', 'High floor'],
  },
  {
    id: 'hills-4br-villa',
    kind: 'buy',
    type: 'villa',
    title: 'Golf-Course Family Villa',
    community: 'Dubai Hills Estate',
    communitySlug: 'dubai-hills-estate',
    price: 'AED 8.9M',
    priceNote: 'guide price',
    priceAed: 8_900_000,
    bedrooms: 4,
    beds: '4 bed',
    baths: '5 bath',
    area: '4,100 sq ft',
    status: 'Ready',
    img: '/real-estate/img/listings/golf-villa.webp',
    tags: ['Golf view', 'Private pool', 'Single row'],
  },
  {
    id: 'marina-penthouse',
    kind: 'buy',
    type: 'penthouse',
    title: 'Duplex Penthouse',
    community: 'Dubai Marina',
    communitySlug: 'dubai-marina',
    price: 'AED 12.2M',
    priceNote: 'guide price',
    priceAed: 12_200_000,
    bedrooms: 4,
    beds: '4 bed',
    baths: '5 bath',
    area: '5,200 sq ft',
    status: 'Ready',
    img: '/real-estate/img/types/penthouse.webp',
    tags: ['Full-floor', 'Sea view', 'Off-market'],
  },
  {
    id: 'bay-office',
    kind: 'buy',
    type: 'commercial',
    title: 'Fitted Corner Office',
    community: 'Business Bay',
    communitySlug: 'business-bay',
    price: 'AED 3.1M',
    priceNote: 'guide price',
    priceAed: 3_100_000,
    bedrooms: 0,
    beds: 'Grade A',
    baths: 'Fitted',
    area: '2,050 sq ft',
    status: 'Vacant',
    img: '/real-estate/img/types/commercial.webp',
    tags: ['Canal view', 'Parking ×3', 'Freehold'],
  },

  /* ---- To rent ----------------------------------------------------------- */
  {
    id: 'jbr-2br-rent',
    kind: 'rent',
    type: 'apartment',
    title: 'Beachfront Two Bedroom',
    community: 'Jumeirah Beach Residence',
    communitySlug: 'jbr',
    price: 'AED 185k',
    priceNote: 'per year',
    priceAed: 185_000,
    bedrooms: 2,
    beds: '2 bed',
    baths: '3 bath',
    area: '1,410 sq ft',
    status: 'Available now',
    img: '/real-estate/img/communities/jbr.webp',
    tags: ['Furnished', 'Sea view', '2 cheques'],
  },
  {
    id: 'downtown-1br-rent',
    kind: 'rent',
    type: 'apartment',
    title: 'Furnished Boulevard Apartment',
    community: 'Downtown Dubai',
    communitySlug: 'downtown-dubai',
    price: 'AED 140k',
    priceNote: 'per year',
    priceAed: 140_000,
    bedrooms: 1,
    beds: '1 bed',
    baths: '2 bath',
    area: '820 sq ft',
    status: 'Available now',
    img: '/real-estate/img/communities/dubai-downtown.webp',
    tags: ['Furnished', 'Bills included', '1 cheque'],
  },
  {
    id: 'hills-3br-townhouse-rent',
    kind: 'rent',
    type: 'townhouse',
    title: 'Family Townhouse',
    community: 'Dubai Hills Estate',
    communitySlug: 'dubai-hills-estate',
    price: 'AED 260k',
    priceNote: 'per year',
    priceAed: 260_000,
    bedrooms: 3,
    beds: '3 bed',
    baths: '4 bath',
    area: '2,300 sq ft',
    status: 'Available now',
    img: '/real-estate/img/types/townhouse.webp',
    tags: ['Park backing', 'Maid’s room', '4 cheques'],
  },
  {
    id: 'jlt-office-rent',
    kind: 'rent',
    type: 'commercial',
    title: 'Lakeside Office Floor',
    community: 'Jumeirah Lake Towers',
    communitySlug: 'jlt',
    price: 'AED 95 / sq ft',
    priceNote: 'per year',
    priceAed: 195_000,
    bedrooms: 0,
    beds: 'Shell & core',
    baths: 'Free zone',
    area: '2,050 sq ft',
    status: 'Available now',
    img: '/real-estate/img/communities/jlt.webp',
    tags: ['DMCC licence', 'Metro 5 min', 'Flexible term'],
  },

  /* ---- Off-plan ---------------------------------------------------------- */
  {
    id: 'creek-tower-offplan',
    kind: 'offplan',
    type: 'apartment',
    title: 'Waterfront Tower Residences',
    community: 'Dubai Creek Harbour',
    communitySlug: 'creek-harbour',
    price: 'AED 1.9M',
    priceNote: 'from',
    priceAed: 1_900_000,
    bedrooms: 2,
    beds: '1–3 bed',
    baths: '2–4 bath',
    area: '760–1,900 sq ft',
    status: 'Q4 2027',
    img: '/real-estate/img/listings/offplan-tower.webp',
    tags: ['60/40 plan', 'Escrow registered', 'Creek view'],
  },
  {
    id: 'valley-villas-offplan',
    kind: 'offplan',
    type: 'villa',
    title: 'Garden Community Villas',
    community: 'The Valley',
    communitySlug: 'the-valley',
    price: 'AED 2.4M',
    priceNote: 'from',
    priceAed: 2_400_000,
    bedrooms: 3,
    beds: '3–4 bed',
    baths: '4–5 bath',
    area: '2,100–3,200 sq ft',
    status: 'Q2 2028',
    img: '/real-estate/img/types/villas.webp',
    tags: ['80/20 plan', 'Post-handover', 'Gated'],
  },
];

/** Communities that appear in the listing set, in the order they appear. */
export function listingCommunities(items: PortalListing[] = LISTINGS): { slug: string; name: string }[] {
  const seen = new Map<string, string>();
  for (const l of items) if (!seen.has(l.communitySlug)) seen.set(l.communitySlug, l.community);
  return Array.from(seen, ([slug, name]) => ({ slug, name }));
}
