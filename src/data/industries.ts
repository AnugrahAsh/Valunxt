/**
 * Industries — the property sectors and client segments VALUNXT covers.
 *
 * The division across the three "who/what" pages is:
 *   /our-group/  — WHO we are (the four operating companies)
 *   /industries/ — WHAT we cover (the asset classes and client segments here)
 *   /network/    — WHO we plug you into (banks, investors, accreditations)
 *
 * Port of the arrays in includes/partials/industries-sectors.php.
 */
import { vxnRegion } from '@/lib/region';

export interface IndustrySector {
  /** "01", "02", … — shown as the tab index. */
  n: string;
  /** May carry HTML entities. */
  title: string;
  desc: string;
  work: string[];
  /** The India practice that carries the work; see sectorHref() for the UAE. */
  href: string;
}

export interface ClientSegment {
  t: string;
  d: string;
}

export const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    n: '01',
    title: 'Residential',
    desc: 'Primary and secondary residential across metros and emerging corridors — from single-unit acquisition for private owners to bulk and floor-level deals for funds. Valuation, pricing benchmarks, and exit planning.',
    work: ['Acquisition &amp; exit advisory', 'Portfolio valuation', 'Rental yield benchmarking'],
    href: '/services/real-estate-investment-advisory/',
  },
  {
    n: '02',
    title: 'Grade-A Office',
    desc: 'Institutional office assets and business parks. We advise on entry pricing, tenant covenant quality, lease structuring, and the gap between headline and effective rents that drives real returns.',
    work: ['Asset valuation', 'Covenant &amp; lease review', 'Cap-rate analysis'],
    href: '/services/research-intelligence/',
  },
  {
    n: '03',
    title: 'Retail &amp; Mixed-Use',
    desc: 'High-street, mall, and mixed-use schemes where trade-area strength and tenant mix decide value. Feasibility, catchment analysis, and repositioning strategy for underperforming assets.',
    work: ['Catchment &amp; footfall analysis', 'Highest &amp; best use', 'Repositioning strategy'],
    href: '/services/research-intelligence/',
  },
  {
    n: '04',
    title: 'Warehousing &amp; Logistics',
    desc: 'Grade-A warehousing, fulfilment, and cold chain — one of the fastest-repricing sectors in both our markets. Site selection, build-to-suit structuring, and yield benchmarking against comparable stock.',
    work: ['Site selection', 'Build-to-suit structuring', 'Yield benchmarking'],
    href: '/services/capital-advisory/',
  },
  {
    n: '05',
    title: 'Land &amp; Development',
    desc: 'Raw land, joint development agreements, and phased schemes. We work with developers on capital stack design, phasing, and the funding runway a project needs before the first sale is booked.',
    work: ['Feasibility &amp; residual valuation', 'JV &amp; JDA structuring', 'Development finance'],
    href: '/services/capital-advisory/',
  },
  {
    n: '06',
    title: 'Hospitality',
    desc: 'Hotels, serviced apartments, and branded residences. Operator selection, management-agreement review, and trading-based valuation where the asset and the business are inseparable.',
    work: ['Trading-based valuation', 'Operator &amp; brand selection', 'Feasibility studies'],
    href: '/services/research-intelligence/',
  },
];

export const CLIENT_SEGMENTS: ClientSegment[] = [
  {
    t: 'Private investors &amp; HNIs',
    d: 'Individuals building or consolidating a real estate allocation alongside other assets.',
  },
  {
    t: 'Family offices',
    d: 'Multi-generational structures needing governance, valuation discipline, and succession-ready holding vehicles.',
  },
  {
    t: 'NRIs &amp; cross-border buyers',
    d: 'Non-resident buyers allocating between India and the UAE, with structuring and repatriation in scope.',
  },
  {
    t: 'Developers',
    d: 'Sponsors raising project capital, structuring JVs, and pricing phased releases.',
  },
  {
    t: 'Banks &amp; lenders',
    d: 'Institutions requiring independent, standards-aligned valuation for credit and provisioning.',
  },
  {
    t: 'Funds &amp; institutions',
    d: 'Allocators underwriting portfolios and needing independent research before committee.',
  },
];

/**
 * The India practice slugs above, mapped to the UAE's own.
 *
 * /industries/ is one page shared by both markets, and the sectors name the
 * practice that carries the work — but the two markets lead with different
 * practices at different URLs. Sending a UAE reader to India's Capital Advisory
 * page (or, worse, to a URL that market does not publish) is not what "the
 * practice behind it" promises, so the link is resolved per market here.
 */
const UAE_EQUIVALENT: Record<string, string> = {
  '/services/real-estate-investment-advisory/': '/services/real-estate-transactions/',
  '/services/research-intelligence/': '/services/research-and-intelligence/',
  '/services/capital-advisory/': '/services/mortgage-services/',
};

/** The practice page a sector points at, in the market being read. */
export function sectorHref(region: string, href: string): string {
  return vxnRegion(region) === 'en-ae' ? (UAE_EQUIVALENT[href] ?? href) : href;
}
