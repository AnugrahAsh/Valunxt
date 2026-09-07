/**
 * The UAE service tree — /en-ae/services/ and everything under it.
 *
 * One source of truth for four consumers: the services index, the 36 detail
 * pages beneath it, the breadcrumb trail on each of those, and their SEO titles
 * and descriptions.
 *
 * Why this is separate from vxnServices() in lib/region.ts: that registry
 * answers "what does this market lead with" for the hero, the home bento and
 * the mega menu — six entries, no depth. This one carries the full catalogue,
 * two levels deep. The two agree on the six top-level names and hrefs, and
 * vxnServices() links into the pages defined here.
 *
 * Slugs are the URL and are permanent: changing one breaks an indexed address.
 * If a name has to change, keep the slug and add a redirect.
 *
 * Port of data/services-uae.php.
 */

export interface UaeSubService {
  /** May carry HTML entities — render through <Html>. */
  title: string;
  lede: string;
}

export interface UaeService {
  /** May carry HTML entities — render through <Html>. */
  title: string;
  /** The short label used on rails, chips and buttons. */
  short: string;
  lede: string;
  /** meta description for the practice page. */
  meta: string;
  img: string;
  /** Per-practice overrides for the shared section artwork. */
  art?: Record<string, string>;
  children: Record<string, UaeSubService>;
}

/** The six UAE services, each with its sub-services. */
export const UAE_SERVICES: Record<string, UaeService> = {
  'accounting-and-tax-services': {
    title: 'Accounting and Tax Services',
    short: 'Accounting &amp; Tax',
    lede: 'Accurate books, clear reporting and full FTA compliance across corporate tax, VAT and transfer pricing &mdash; managed end to end so you always know exactly where you stand.',
    meta: 'Accounting, bookkeeping, VAT and corporate tax services for UAE businesses. Fixed fees agreed before work begins, deadlines tracked to your financial year.',
    img: '/assets/content/uploads/services/accounting-and-tax-services.webp',
    children: {
      'accounting-and-bookkeeping': {
        title: 'Accounting &amp; Bookkeeping',
        lede: 'Books kept current and reconciled month after month, ready for review at any point in the year.',
      },
      'corporate-tax-services': {
        title: 'Corporate Tax Services',
        lede: 'Registration, impact assessment and annual return filing, tracked against your financial year.',
      },
      'vat-services': {
        title: 'VAT Services',
        lede: 'Registration through to quarterly returns, reconciled and filed on time.',
      },
      'cfo-services': {
        title: 'CFO Services',
        lede: 'Senior finance capability without a full-time hire &mdash; reporting, controls and the numbers behind the decisions.',
      },
      'financial-reporting': {
        title: 'Financial Reporting',
        lede: 'Statutory and management accounts prepared to standard, documented so they hold up to scrutiny.',
      },
    },
  },
  'real-estate-transactions': {
    title: 'Real Estate Transactions',
    short: 'Real Estate',
    lede: 'End-to-end support across property and investment transactions &mdash; priced on evidence, diligenced properly and managed cleanly from first offer to final handover.',
    meta: 'Independent real estate transaction advisory in Dubai, Abu Dhabi and across the UAE: buying, selling, leasing and off-plan.',
    img: '/assets/content/uploads/services/real-estate-transactions.webp',
    children: {
      'buy-property': {
        title: 'Buy Property',
        lede: 'Sourcing and acquisition across residential and commercial property, with the evidence behind every price.',
      },
      'sell-rent-lease-property': {
        title: 'Sell &amp; Rent/Lease Property',
        lede: 'Disposal and leasing strategy, pricing and execution for owners and landlords.',
      },
      'off-plan-properties': {
        title: 'Off Plan Properties',
        lede: 'Independent assessment of off-plan opportunities &mdash; developer, payment plan and delivery risk.',
      },
    },
  },
  'mortgage-services': {
    title: 'Mortgages Services',
    short: 'Mortgages',
    lede: 'The right property finance is more than a rate &mdash; structure, covenants and valuation treatment decide what the loan really costs.',
    meta: 'Whole-of-market mortgage advisory in the UAE: residential, commercial, non-resident and Islamic finance, plus pre-approval and refinancing.',
    img: '/assets/content/uploads/services/mortgage-services.webp',
    children: {
      'residential-mortgages': {
        title: 'Residential Mortgages',
        lede: 'Home finance structured around your position, compared across the market rather than one lender.',
      },
      'commercial-mortgages': {
        title: 'Commercial Mortgages',
        lede: 'Finance for income-producing and owner-occupied commercial property.',
      },
      'mortgage-pre-approval': {
        title: 'Mortgage Pre Approval',
        lede: 'Know what you can borrow, and on what terms, before you commit to a property.',
      },
      refinancing: {
        title: 'Refinancing',
        lede: 'Reviewing an existing facility against the current market and moving it where that pays.',
      },
      'non-resident-mortgages': {
        title: 'Non Resident Mortgages',
        lede: 'Finance for overseas buyers, with the documentation and structuring that requires.',
      },
      'islamic-finance': {
        title: 'Islamic Finance',
        lede: 'Sharia-compliant property finance structures, compared on the same evidence as conventional terms.',
      },
    },
  },
  'valuation-and-advisory': {
    title: 'Valuation and Advisory',
    short: 'Valuation',
    lede: 'Independent, evidence-led valuations of businesses, property, plant and machinery &mdash; built to withstand scrutiny from banks, auditors and investors.',
    meta: 'RICS-regulated valuation in the UAE: business, company, plant and machinery, asset and financial valuation for lenders, funds and owners.',
    img: '/assets/content/uploads/services/valuation-and-advisory.webp',
    children: {
      'business-valuation': {
        title: 'Business Valuation',
        lede: 'Independent enterprise value for transactions, disputes and reporting.',
      },
      'company-valuation': {
        title: 'Company Valuation',
        lede: 'Share and entity valuation for shareholders, buyers and regulators.',
      },
      'plant-and-machinery-valuation': {
        title: 'Plant &amp; Machinery Valuation',
        lede: 'Asset-level valuation for finance, insurance and balance-sheet purposes.',
      },
      'asset-valuation': {
        title: 'Asset Valuation',
        lede: 'Property and asset valuation across portfolios, to a documented method.',
      },
      'financial-valuation': {
        title: 'Financial Valuation',
        lede: 'Valuation of financial instruments and holdings for reporting and transactions.',
      },
    },
  },
  'research-and-intelligence': {
    title: 'Research &amp; Intelligence',
    short: 'Research',
    lede: 'Feasibility, market research and financial advisory that turn a question into a confident, evidence-backed decision.',
    meta: 'Independent real estate and market research in the UAE: feasibility studies, investment research, market intelligence and published reports.',
    img: '/assets/content/uploads/services/research-and-intelligences.webp',
    children: {
      'real-estate-research': {
        title: 'Real Estate Research',
        lede: 'Demand, supply and pricing evidence for the market you are about to enter.',
      },
      'market-research': {
        title: 'Market Research',
        lede: 'Sector and segment analysis built on verified data rather than sentiment.',
      },
      'investment-research': {
        title: 'Investment Research',
        lede: 'Opportunity assessment and risk analysis to support a committed decision.',
      },
      'feasibility-studies': {
        title: 'Feasibility Studies',
        lede: 'Testing whether a scheme stacks up, and what the land should actually carry.',
      },
      'market-intelligence': {
        title: 'Market Intelligence',
        lede: 'Continuous read on the market rather than a snapshot at the point of purchase.',
      },
      'research-reports': {
        title: 'Research Reports',
        lede: 'Published research on the sectors and micro-markets we cover.',
      },
    },
  },
  'technology-data-and-ai': {
    title: 'Technology, Data &amp; AI',
    short: 'Technology &amp; AI',
    lede: 'Digital transformation, cloud-era enterprise solutions and performance marketing &mdash; technology in service of the business case.',
    meta: 'Technology consulting for UAE businesses: AI solutions, ERP dashboards, PropTech and enterprise systems that turn data into decisions.',
    img: '/assets/content/uploads/services/technology-data-ai.webp',
    children: {
      'technology-consulting': {
        title: 'Technology Consulting',
        lede: 'Digital and customer transformation, planned around what the business actually needs to measure.',
      },
      'ai-solutions': {
        title: 'AI Solutions',
        lede: 'Applied AI where it changes a decision, not where it decorates a dashboard.',
      },
      'erp-dashboards': {
        title: 'ERP Dashboards',
        lede: 'Reporting layers over your finance and operations systems, showing where every number stands.',
      },
      proptech: {
        title: 'PropTech',
        lede: 'Property technology &mdash; valuation models, portfolio tooling and market data platforms.',
      },
      'enterprise-solutions': {
        title: 'Enterprise Solutions',
        lede: 'Enterprise and cloud systems, integrated so finance and operations read from one source.',
      },
    },
  },
};

/** Every practice slug, in display order. */
export const UAE_SERVICE_SLUGS: string[] = Object.keys(UAE_SERVICES);

/** A practice by slug, or null when the slug is unknown. */
export function uaeService(slug: string): UaeService | null {
  return UAE_SERVICES[slug] ?? null;
}

/** A sub-service by practice and child slug, or null. */
export function uaeSubService(slug: string, child: string): UaeSubService | null {
  return UAE_SERVICES[slug]?.children[child] ?? null;
}

/** The path of a service page, relative to the region root. */
export function uaeServicePath(service: string, child?: string | null): string {
  return `/services/${service}/${child ? `${child}/` : ''}`;
}
