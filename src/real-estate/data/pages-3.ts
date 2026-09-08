/**
 * The three pages the section was missing: renting, communities, and booking a
 * consultation.
 *
 * WHY THEY WERE MISSING. `sell-rent-lease-property` carried selling, renting and
 * letting on one page, which is right for a landlord and wrong for a tenant: a
 * person looking for somewhere to live was being sent to a page that opens by
 * asking what they want to sell. Communities had eight tiles on the pillar page
 * and nowhere to land. Consultation existed only as an anchor to a form.
 *
 * They are `ServicePage` records like the other eight, so they render through
 * the same template and cost nothing but content — see components/ServicePageBody.
 *
 * ON THE FIGURES. Every number below is either carried from an existing record
 * in this folder or is a count of something in the data (eight communities, four
 * steps). Nothing here is a performance claim that has not already been
 * published elsewhere on the site.
 */
import type { ServicePage } from '../lib/types';

/* -------------------------------------------------------------------------- */
/* Renting                                                                    */

const RENT: ServicePage = {
  slug: 'rent-property',
  listingKind: 'rent',
  eyebrow: 'Renting',
  title: 'Rent the life',
  titleAccent: 'before you commit to it',
  lede:
    'Furnished or empty, one cheque to twelve. The fastest way to find out whether a community is ' +
    'yours — before you buy into it.',
  heroImg: '/real-estate/img/living/marina.webp',
  highlights: [
    { value: '8', label: 'Communities', detail: 'Beachfront, canal-side and the quiet green streets between them.' },
    { value: '1–12', label: 'Cheques', detail: 'Payment terms negotiated with the landlord, not imposed on you.' },
    { value: '48+', label: 'Years of market expertise', detail: 'The same advisory bench behind every other service here.' },
  ],
  offerTitle: 'A year in a place tells you what a viewing never will',
  offerLede:
    'Renting first is the cheapest due diligence there is. Live the commute, the noise, the walk to ' +
    'the water and the service charges before any of it is irreversible.',
  offer: [
    {
      title: 'Finding the right unit',
      summary:
        'We shortlist against the brief that matters — the commute, the school run, the floor, the ' +
        'view and the direction the windows face — then arrange viewings in one run rather than five.',
      bullets: ['Shortlist against your brief', 'Viewings arranged in one run', 'Honest notes on each building'],
      cta: 'Talk to us',
      img: '/real-estate/img/living/inside.webp',
    },
    {
      title: 'Terms and the cheque count',
      summary: 'Rent, cheques, notice and renewal negotiated with the landlord, and the RERA index checked before you sign.',
      bullets: ['Rent benchmarked to the index', 'Cheque count negotiated', 'Notice and renewal read to you'],
      cta: 'Talk to us',
      img: '/real-estate/img/services/residential.webp',
    },
    {
      title: 'Ejari and handover',
      summary: 'The contract, the Ejari registration, the DEWA connection and the snagging list, handled end to end.',
      bullets: ['Tenancy contract drawn', 'Ejari registered', 'DEWA and handover managed'],
      cta: 'Talk to us',
      img: '/real-estate/img/services/mortgage.webp',
    },
  ],
  stepsTitle: 'From first viewing to keys',
  steps: [
    { number: '01', title: 'The brief', body: 'Budget, area, timing and the things you will not compromise on. We come back with what actually exists at that number.' },
    { number: '02', title: 'Viewings', body: 'Arranged in one run, with honest notes on each building — the service charge, the lift count, what the view will be in two years.' },
    { number: '03', title: 'Offer and terms', body: 'Rent benchmarked against the RERA index, then cheques, notice and renewal negotiated before anything is signed.' },
    { number: '04', title: 'Contract and keys', body: 'Tenancy contract, Ejari registration, DEWA connection and a snagging list walked with you at handover.' },
  ],
  faqs: [
    { q: 'How many cheques will I need?', a: 'It depends on the landlord and the building. One cheque usually buys the best price; four to six is the common middle; twelve exists and costs more. We negotiate the count as part of the offer rather than accepting the listing terms.' },
    { q: 'What is Ejari and do I need it?', a: 'Ejari is the registration of your tenancy contract with the Dubai Land Department. It is required — DEWA connection, visa applications and school registrations all ask for it. We register it for you.' },
    { q: 'Can I rent before my residency is issued?', a: 'Usually yes. Most landlords accept a passport and entry permit with the first cheque, with Ejari completed once the visa is issued. We confirm the landlord will accept that before you commit.' },
    { q: 'How much should I budget beyond the rent?', a: 'Expect the agency fee, the security deposit, Ejari, DEWA connection and — in most towers — a chiller registration. We set the full first-year figure out before you offer, not after.' },
  ],
  ctaTitle: 'Tell us where you want to live',
  ctaBody: 'Give us the area, the budget and the month you need to move. We will come back with what is available and what it honestly costs to live there.',
};

/* -------------------------------------------------------------------------- */
/* Communities                                                                */

const COMMUNITIES_PAGE: ServicePage = {
  slug: 'communities',
  eyebrow: 'Communities',
  title: 'Every one of these',
  titleAccent: 'is a different life',
  lede:
    'Beachfront, canal-side, downtown or the quiet green streets in between. The address decides the ' +
    'life more than the floor plan ever will.',
  heroImg: '/real-estate/img/living/water.webp',
  highlights: [
    { value: '8', label: 'Communities covered', detail: 'The Dubai addresses this practice transacts in.' },
    { value: '50K+', label: 'Verified listings', detail: 'Across the communities people actually want to live in.' },
    { value: '48+', label: 'Years of market expertise', detail: 'Decades of transactions behind every recommendation.' },
  ],
  offerTitle: 'The floor plan is the last thing that matters',
  offerLede:
    'Two identical apartments in two communities are not the same purchase. The walk to the water, ' +
    'the service charge, the school run and what gets built next door are what you are actually buying.',
  offer: [
    {
      title: 'What each place is really like',
      summary:
        'Not a sales line: the commute at eight in the morning, the noise at eleven at night, the ' +
        'service charge history and what is approved on the plot next door.',
      bullets: ['Honest notes per community', 'Service charge history', 'What is approved nearby'],
      cta: 'Explore',
      img: '/real-estate/img/living/pool.webp',
    },
    {
      title: 'Matching a life to an address',
      summary: 'We start from how you want the week to run, then work back to the communities that give you it.',
      bullets: ['Commute and school run mapped', 'Shortlist of two or three, not ten', 'Viewings in one run'],
      cta: 'Explore',
      img: '/real-estate/img/living/villa.webp',
    },
    {
      title: 'What it costs to own there',
      summary: 'Service charges, chiller, and the transaction costs that differ community by community, set out before you choose.',
      bullets: ['Service charge per sq ft', 'Chiller and utilities', 'Full cost of ownership'],
      cta: 'Explore',
      img: '/real-estate/img/living/dusk.webp',
    },
  ],
  stepsTitle: 'How we narrow eight down to two',
  steps: [
    { number: '01', title: 'How you want the week to run', body: 'The commute, the school run, the gym, the walk you want to be able to take on a Friday. The brief is a life, not a postcode.' },
    { number: '02', title: 'The shortlist', body: 'Two or three communities that actually fit, with what is wrong with each of them said out loud rather than left for you to discover.' },
    { number: '03', title: 'Walking them', body: 'Viewings arranged in one run, at the hour of day that tells you the truth about the place.' },
    { number: '04', title: 'The numbers', body: 'Service charge, chiller, transaction costs and realistic resale for each — so the decision is made on the full figure.' },
  ],
  faqs: [
    { q: 'Which communities are freehold for foreign buyers?', a: 'All eight covered here sit in designated freehold areas, which is why they are the ones we transact in. Ownership outside those areas is restricted, and we will say so rather than showing you something you cannot buy.' },
    { q: 'How much do service charges vary?', a: 'Substantially — enough to change which community is cheaper to own even when the purchase prices match. We set the per-square-foot figure and its recent history out for each shortlisted building.' },
    { q: 'Which community is the best investment?', a: 'There is no single answer, and anyone giving you one is selling something. It depends on your horizon, whether you want yield or capital growth, and what is being built nearby. We show the evidence for each and let you choose.' },
    { q: 'Can you advise on schools and commutes?', a: 'Yes, and it is usually the part that decides the shortlist. Tell us where you work and where the children need to be, and we will map the realistic morning journey from each option.' },
  ],
  ctaTitle: 'Tell us how you want to live',
  ctaBody: 'Describe the week you want and the number you have. We will tell you which communities give you it — and what they honestly cost.',
};

/* -------------------------------------------------------------------------- */
/* Consultation                                                               */

const CONSULTATION: ServicePage = {
  slug: 'consultation',
  eyebrow: 'Consultation',
  title: 'One conversation',
  titleAccent: 'before any of it is irreversible',
  lede:
    'Bring the budget, the timing and the question you have not been able to get a straight answer ' +
    'to. There is no fee for it and nothing to sign at the end.',
  heroImg: '/real-estate/img/living/inside.webp',
  highlights: [
    { value: 'Free', label: 'No fee for the first conversation', detail: 'Advice first; the engagement, if any, comes afterwards.' },
    { value: '48+', label: 'Years of market expertise', detail: 'The bench behind every service in this section.' },
    { value: '6', label: 'Advisory services', detail: 'Residential, commercial, mortgage, investment, valuations and letting.' },
  ],
  offerTitle: 'The most expensive property decisions are made without advice',
  offerLede:
    'Not because the advice is unavailable, but because it usually arrives attached to someone with ' +
    'something to sell. Start with the conversation and decide afterwards whether you want the rest.',
  offer: [
    {
      title: 'What you should be paying',
      summary:
        'An evidence-based read on the number — what comparable units actually transacted at, not ' +
        'what they are being asked for.',
      bullets: ['Comparable transactions, not asking prices', 'Community-level price bands', 'Where the number should land'],
      cta: 'Book it',
      img: '/real-estate/img/services/investment.webp',
    },
    {
      title: 'What it costs to own',
      summary: 'Service charge, chiller, DLD fees, mortgage costs and the annual figure nobody quotes at a viewing.',
      bullets: ['Full transaction costs', 'Annual cost of ownership', 'Mortgage options compared'],
      cta: 'Book it',
      img: '/real-estate/img/services/mortgage.webp',
    },
    {
      title: 'Whether to do it at all',
      summary: 'Sometimes the answer is to rent for a year, or to wait for the next handover wave. We will say so.',
      bullets: ['Buy, rent or wait', 'Timing against handover supply', 'The case against, said out loud'],
      cta: 'Book it',
      img: '/real-estate/img/services/commercial.webp',
    },
  ],
  stepsTitle: 'What the conversation looks like',
  steps: [
    { number: '01', title: 'You send the brief', body: 'Budget, area, timing, and what you are trying to achieve. Three lines is enough to start.' },
    { number: '02', title: 'We come back with evidence', body: 'What is available at that number, what comparable units transacted at, and what it costs to own each year.' },
    { number: '03', title: 'The conversation', body: 'Thirty minutes, in the office or on a call. Bring the question nobody has answered straight.' },
    { number: '04', title: 'You decide', body: 'There is nothing to sign at the end of it. If the answer is to wait a year, that is the answer you will get.' },
  ],
  faqs: [
    { q: 'Is there a fee for the first consultation?', a: 'No. The first conversation is free and carries no obligation. Fees apply to engagements that follow — valuations, mortgage arrangement, agency — and are set out before any of them start.' },
    { q: 'What should I bring?', a: 'A budget, a rough area or two, and when you need to move. If you are already looking at something specific, send the listing and we will read it before we speak.' },
    { q: 'Do you only advise on properties you sell?', a: 'No. We will advise on a unit listed by anyone, and on whether to buy at all. If the honest answer is to rent for a year, that is what you will hear.' },
    { q: 'Can we meet in person?', a: 'Yes — at the Dubai office, or on a call if you are outside the UAE. Most first conversations with overseas buyers happen on a call and work perfectly well.' },
  ],
  ctaTitle: 'Book the conversation',
  ctaBody: 'Three lines is enough: what you have, where you are looking, and when you need to move.',
};

/** Registered in data/pages.ts and in SERVICE_SLUGS in lib/routes.ts. */
export const PORTAL_PAGES: ServicePage[] = [RENT, COMMUNITIES_PAGE, CONSULTATION];
