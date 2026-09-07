/**
 * Chrome-level content: brand, regions, navigation, footer, contact details.
 *
 * This is VALUNXT. The real estate practice is part of the group, not a
 * separate company, so the wordmark, the palette and the type are the group's —
 * what changes is the composition, not the identity.
 *
 * Copy lives here rather than inside components so the module can be re-worded
 * without opening a .tsx file.
 */
import { vxnEmail, vxnOffice } from '@/lib/site-data';
import { isRtl } from '../lib/routes';
import type { Link, Locale, Partner } from '../lib/types';

/**
 * Contact details are NOT restated here.
 *
 * Standalone, this object carried its own phone number and address, and they
 * had already drifted from the group's published ones — a different Dubai line
 * and a shortened address. The site keeps these facts in one place precisely so
 * that cannot happen (see src/lib/site-data.ts), so the module reads them from
 * there instead.
 *
 * Dubai specifically, in both editions: this practice is Dubai property and the
 * footer states the Dubai office, and the site's rule is that an office is never
 * listed under another country's telephone line.
 */
const DUBAI = vxnOffice('dubai')!;

export const BRAND = {
  name: 'VALUNXT',
  full: 'VALUNXT Capital',
  /** The practice, shown as a lockup beside the wordmark. */
  practice: 'Real Estate',
  phone: DUBAI.phone,
  phoneHref: `tel:${DUBAI.tel}`,
  email: vxnEmail(),
  address: DUBAI.address,
};

/* -------------------------------------------------------------------------- */
/* NOTE: there is deliberately no region or locale switcher in this header.
   The site has its own, in the site header, and this practice is Dubai property
   in either edition — so offering a second market control here would promise a
   different set of listings behind it, which there is not. */

/* -------------------------------------------------------------------------- */
/* Navigation
 *
 * Routed by intent, the way every one of the six references routes: Buy, Rent
 * and Off-Plan land the visitor on the listings grid with that tab already
 * selected (the query string is what the search store reads on load), and the
 * rest are anchors on the pillar page.
 *
 * Every href is written page-relative ("/#services"), so the same list works
 * from a service page — Nav.tsx resolves it to /{region}/real-estate/#services
 * rather than to a fragment that only exists on the page you are already on.
 */

export const NAV: Link[] = [
  { label: 'Buy', href: '/?kind=buy#listings' },
  { label: 'Rent', href: '/?kind=rent#listings' },
  { label: 'Off-Plan', href: '/?kind=offplan#listings' },
  { label: 'Communities', href: '/#communities' },
  { label: 'Sell & Let', href: '/#sell' },
  { label: 'Services', href: '/#services' },
];

export const FOOTER_COLUMNS: { title: string; links: Link[] }[] = [
  {
    title: 'Transact',
    links: [
      { label: 'Buy Property', href: '/buy-property/' },
      { label: 'Sell, Rent & Lease', href: '/sell-rent-lease-property/' },
      { label: 'Off-Plan Properties', href: '/off-plan-properties/' },
      { label: 'Residential', href: '/residential/' },
      { label: 'Commercial', href: '/commercial/' },
    ],
  },
  {
    title: 'Advisory',
    links: [
      { label: 'Mortgage Services', href: '/mortgage-services/' },
      { label: 'Investment Advisory', href: '/investment-advisory/' },
      { label: 'Valuations & Advisory', href: '/valuations-advisory/' },
      { label: 'Our Process', href: '/#process' },
    ],
  },
  {
    title: 'The Group',
    links: [
      { label: 'About VALUNXT', href: '/#about' },
      { label: 'Property Gallery', href: '/#gallery' },
      { label: 'Client Reviews', href: '/#reviews' },
      { label: 'FAQs', href: '/#faqs' },
      { label: 'Speak to an Advisor', href: '/#contact' },
    ],
  },
];

/**
 * Developer partners.
 *
 * These were type-set names for as long as the module had no artwork it was
 * entitled to use. The marks now shipped in
 * public/real-estate/img/developers/ come from VALUNXT's own previous property
 * site, supplied by the client for this purpose — so the artwork is the
 * group's to display and a row of real logos replaces a row of set capitals.
 *
 * `logo` remains optional and Partners.tsx still falls back to the name, so an
 * entry whose relationship lapses can be reduced to text by deleting one line
 * rather than rebuilding the section.
 */
export const PARTNERS: Partner[] = [
  { name: 'EMAAR', logo: '/real-estate/img/developers/emaar.webp' },
  { name: 'DAMAC', logo: '/real-estate/img/developers/damac.webp' },
  { name: 'NAKHEEL', logo: '/real-estate/img/developers/nakheel.webp' },
  { name: 'SOBHA', logo: '/real-estate/img/developers/sobha-realty.webp' },
  { name: 'ALDAR', logo: '/real-estate/img/developers/aldar-properties.webp' },
  { name: 'MERAAS', logo: '/real-estate/img/developers/meraas.webp' },
  { name: 'OMNIYAT', logo: '/real-estate/img/developers/omniyat.webp' },
  { name: 'ELLINGTON', logo: '/real-estate/img/developers/ellington.webp' },
  { name: 'BINGHATTI', logo: '/real-estate/img/developers/binghatti-properties.webp' },
  { name: 'DUBAI PROPERTIES', logo: '/real-estate/img/developers/dubai-properties.webp' },
];

export const PARTNERS_TITLE = 'Trusted by Leading Developers & Industry Partners';

/**
 * Arabic string table.
 *
 * Kept intact but dormant: this site publishes no Arabic edition, so isRtl() in
 * lib/routes.ts answers false for every market and t() below always returns the
 * English source. Add an Arabic slug to the site's region registry and to
 * isRtl(), and this table starts being used again with no change here.
 */
const AR: Record<string, string> = {
  Transact: 'المعاملات',
  Sectors: 'القطاعات',
  Advisory: 'الاستشارات',
  Services: 'خدماتنا',
  Residential: 'العقارات السكنية',
  Commercial: 'العقارات التجارية',
  'Mortgage Services': 'خدمات التمويل العقاري',
  'Investment Advisory': 'الاستشارات الاستثمارية',
  'Valuations & Advisory': 'التقييم والاستشارات',
  'Our Process': 'آلية العمل',
  Valuations: 'التقييم العقاري',
  Insights: 'رؤى السوق',
  Contact: 'تواصل معنا',
  'Buy Property': 'شراء عقار',
  'Sell, Rent & Lease': 'البيع والإيجار والتأجير',
  'Off-Plan Properties': 'عقارات على الخارطة',
  'Real Estate': 'العقارات',
  'The Group': 'المجموعة',
  'Get in Touch': 'تواصل معنا',
  'Speak to an Advisor': 'تحدث إلى مستشار',
  'Enquire Now': 'استفسر الآن',
  'Explore Properties': 'استكشف العقارات',
};

/** Translate, falling back to the English source string. */
export function t(locale: Locale, s: string): string {
  return isRtl(locale) ? (AR[s] ?? s) : s;
}
