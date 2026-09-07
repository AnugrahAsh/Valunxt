/**
 * Market detail for the service pages: featured properties, payment plans and
 * indicative price and rent bands.
 *
 * ---------------------------------------------------------------------------
 * These figures are ILLUSTRATIVE and are labelled that way on screen.
 *
 * They are shaped like real Dubai market data — the communities, the plan
 * structures and the yield bands are the ones that actually exist — but the
 * numbers have not been sourced from DLD transaction records, and no live
 * listing sits behind any card. Publishing them as fact would be inventing a
 * commercial record; publishing them as an illustration of what the pages will
 * carry is honest and lets the design be reviewed now.
 *
 * Replace with a feed or a CMS before launch. `PRICE_NOTE` and the
 * "indicative" chips rendered by the components are what keep the page truthful
 * until then — do not remove them without replacing the data.
 * ---------------------------------------------------------------------------
 */
import type { Listing, PaymentPlan, PriceRow } from '../lib/types';

export const PRICE_NOTE =
  'Indicative figures for illustration. Prices, availability and yields move with the market — request a current valuation before acting on any number shown here.';

/* -------------------------------------------------------------------------- */
/* Featured properties                                                        */

export const BUY_LISTINGS: Listing[] = [
  {
    title: 'Waterfront Residence',
    community: 'Dubai Marina',
    price: 'AED 2.4M',
    priceNote: 'guide price',
    beds: '2 bed',
    baths: '2 bath',
    area: '1,240 sq ft',
    status: 'Ready',
    img: '/real-estate/img/listings/marina-tower.webp',
    tags: ['Freehold', 'Marina view', 'Chiller free'],
  },
  {
    title: 'Signature Villa',
    community: 'Dubai Hills Estate',
    price: 'AED 8.9M',
    priceNote: 'guide price',
    beds: '4 bed',
    baths: '5 bath',
    area: '4,100 sq ft',
    status: 'Ready',
    img: '/real-estate/img/listings/golf-villa.webp',
    tags: ['Freehold', 'Private pool', 'Golf course'],
  },
  {
    title: 'Business Bay Corner Office',
    community: 'Business Bay',
    price: 'AED 3.1M',
    priceNote: 'guide price',
    beds: 'Open plan',
    baths: '2 WC',
    area: '2,050 sq ft',
    status: 'Ready',
    img: '/real-estate/img/types/commercial.webp',
    tags: ['Commercial', 'Fitted', 'Canal view'],
  },
];

export const RENT_LISTINGS: Listing[] = [
  {
    title: 'Furnished Apartment',
    community: 'Downtown Dubai',
    price: 'AED 145,000',
    priceNote: 'per year',
    beds: '1 bed',
    baths: '1 bath',
    area: '780 sq ft',
    status: 'Available now',
    img: '/real-estate/img/types/luxury-appartment.webp',
    tags: ['Furnished', '4 cheques', 'Burj view'],
  },
  {
    title: 'Family Townhouse',
    community: 'Arabian Ranches',
    price: 'AED 230,000',
    priceNote: 'per year',
    beds: '3 bed',
    baths: '4 bath',
    area: '2,400 sq ft',
    status: 'Available now',
    img: '/real-estate/img/types/townhouse.webp',
    tags: ['Unfurnished', '2 cheques', 'Community pool'],
  },
  {
    title: 'Retail Unit',
    community: 'Jumeirah Village Circle',
    price: 'AED 190,000',
    priceNote: 'per year',
    beds: 'Shell & core',
    baths: '1 WC',
    area: '1,150 sq ft',
    status: 'Available now',
    img: '/real-estate/img/service-commercial.webp',
    tags: ['Commercial', 'Ground floor', 'Parking'],
  },
];

export const OFFPLAN_LISTINGS: Listing[] = [
  {
    title: 'Creek Harbour Tower',
    community: 'Dubai Creek Harbour',
    price: 'AED 1.6M',
    priceNote: 'from',
    beds: '1–3 bed',
    baths: '1–4 bath',
    area: '710–2,300 sq ft',
    status: 'Q4 2027',
    img: '/real-estate/img/listings/offplan-tower.webp',
    tags: ['60/40 plan', 'Escrow registered', 'Waterfront'],
  },
  {
    title: 'The Valley Villas',
    community: 'The Valley',
    price: 'AED 3.2M',
    priceNote: 'from',
    beds: '4 bed',
    baths: '5 bath',
    area: '3,600 sq ft',
    status: 'Q2 2028',
    img: '/real-estate/img/types/villas.webp',
    tags: ['80/20 plan', 'Escrow registered', 'Post-handover'],
  },
  {
    title: 'Marina Skyline Residences',
    community: 'Dubai Marina',
    price: 'AED 2.1M',
    priceNote: 'from',
    beds: '1–2 bed',
    baths: '1–3 bath',
    area: '820–1,600 sq ft',
    status: 'Q1 2027',
    img: '/real-estate/img/listings/waterfront-residences.webp',
    tags: ['70/30 plan', 'Escrow registered', 'Sea view'],
  },
];

/* -------------------------------------------------------------------------- */
/* Payment plans                                                              */

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    name: 'Construction linked',
    split: '60 / 40',
    summary: 'The most common structure. Payments track verified build milestones.',
    rows: [
      { label: 'On booking', value: '10%' },
      { label: 'During construction', value: '50%' },
      { label: 'On handover', value: '40%' },
    ],
    best: 'Buyers who want their money released only against progress.',
  },
  {
    name: 'Post-handover',
    split: '40 / 60',
    summary: 'Less due before you get the keys, with the balance spread after handover.',
    rows: [
      { label: 'On booking', value: '10%' },
      { label: 'During construction', value: '30%' },
      { label: 'After handover (2–3 yrs)', value: '60%' },
    ],
    best: 'Investors who want the unit generating rent while they still pay.',
  },
  {
    name: 'Payment on completion',
    split: '20 / 80',
    summary: 'Low entry, large final payment. Usually needs a mortgage at handover.',
    rows: [
      { label: 'On booking', value: '20%' },
      { label: 'During construction', value: '—' },
      { label: 'On handover', value: '80%' },
    ],
    best: 'Buyers confident of financing, or planning to sell before completion.',
  },
];

/* -------------------------------------------------------------------------- */
/* Price and rent bands                                                       */

export const SALE_PRICES: PriceRow[] = [
  { area: 'Downtown Dubai', apartment: 'AED 2,400 – 3,200 / sq ft', villa: '—', yield: '5.5 – 6.5%' },
  { area: 'Dubai Marina', apartment: 'AED 1,700 – 2,400 / sq ft', villa: '—', yield: '6.0 – 7.0%' },
  { area: 'Business Bay', apartment: 'AED 1,600 – 2,100 / sq ft', villa: '—', yield: '6.5 – 7.5%' },
  { area: 'Dubai Hills Estate', apartment: 'AED 1,800 – 2,300 / sq ft', villa: 'AED 1,900 – 2,600 / sq ft', yield: '5.0 – 6.0%' },
  { area: 'Jumeirah Village Circle', apartment: 'AED 1,000 – 1,400 / sq ft', villa: 'AED 1,100 – 1,500 / sq ft', yield: '7.5 – 8.5%' },
  { area: 'Arabian Ranches', apartment: '—', villa: 'AED 1,600 – 2,200 / sq ft', yield: '5.0 – 6.0%' },
];

export const RENT_PRICES: PriceRow[] = [
  { area: 'Downtown Dubai', apartment: 'AED 95k – 260k / yr', villa: '—', yield: '1–2 cheques typical' },
  { area: 'Dubai Marina', apartment: 'AED 80k – 220k / yr', villa: '—', yield: '1–4 cheques typical' },
  { area: 'Business Bay', apartment: 'AED 70k – 180k / yr', villa: '—', yield: '2–4 cheques typical' },
  { area: 'Dubai Hills Estate', apartment: 'AED 90k – 190k / yr', villa: 'AED 260k – 550k / yr', yield: '1–4 cheques typical' },
  { area: 'Jumeirah Village Circle', apartment: 'AED 48k – 105k / yr', villa: 'AED 130k – 220k / yr', yield: '4–12 cheques typical' },
  { area: 'Arabian Ranches', apartment: '—', villa: 'AED 220k – 480k / yr', yield: '1–4 cheques typical' },
];

/* -------------------------------------------------------------------------- */
/* Transaction costs                                                          */

export const BUY_COSTS: { label: string; value: string; note: string }[] = [
  { label: 'DLD transfer fee', value: '4% + AED 580', note: 'Paid to Dubai Land Department on transfer.' },
  { label: 'Trustee office fee', value: 'AED 2,000 – 4,000', note: 'Depends on whether the price is above or below AED 500k.' },
  { label: 'Agency commission', value: '2% + VAT', note: 'Agreed in writing before any offer is submitted.' },
  { label: 'Mortgage registration', value: '0.25% of loan', note: 'Only where financing is used, plus bank arrangement fees.' },
  { label: 'Developer NOC', value: 'AED 500 – 5,000', note: 'Set by the developer; required to transfer.' },
];

export const SELL_COSTS: { label: string; value: string; note: string }[] = [
  { label: 'Agency commission', value: '2% + VAT', note: 'Charged on the achieved price, not the asking price.' },
  { label: 'Developer NOC', value: 'AED 500 – 5,000', note: 'Required before transfer can be booked.' },
  { label: 'Mortgage settlement', value: 'Varies', note: 'Early settlement fee where a loan is outstanding.' },
  { label: 'Trustee office fee', value: 'AED 2,000 – 4,000', note: 'Usually split or borne by the buyer by agreement.' },
];
