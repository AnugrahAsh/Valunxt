/**
 * The pillar page: /{region}/real-estate/ — a property portal.
 *
 * Section order is the whole composition, so it lives in one readable list
 * rather than being spread across nested wrappers. Every section reads its own
 * copy from ../data; this file decides only what appears and in what order.
 *
 * THE ORDER IS THE SELLING LOGIC. Six competitor references — Betterhomes,
 * Springfield, Range, Driven, Allsopp & Allsopp, JamesEdition — were analysed
 * for this rebuild and they agree: search first, property within one scroll,
 * trust and lifestyle around it, the ask and the SEO cloud at the end. The
 * previous page opened with an advisory statement and had no search and no
 * listings; the client's words were "we need to show that we sell".
 *
 *   Hero + search → Categories → Stats → Listings → Launches → Communities →
 *   Why Dubai → Services → Sell → Developers → Reviews → Contact → FAQ → Popular
 *
 * What was CUT and why: the About statement, the Valuation & Advisory split and
 * the Process accordion. They were the consultancy; a buyer does not read a
 * process before seeing a property. Their substance survives where it sells —
 * valuation as the seller's door, the firm's numbers as the stats strip — and
 * the service pages keep the long form for anyone who wants it.
 */
import type { Locale } from '../lib/types';
import ListingsGrid from './ListingsGrid';
import { FAQS } from '../data/home';
import { Communities, Contact, Faqs, Partners, Reviews } from './sections';
import {
  Categories,
  HeroSearch,
  Launches,
  PopularSearches,
  Sell,
  ServiceTiles,
  Stats,
  WhyDubai,
} from './sections/portal';

export default function HomeBody({
  region,
  /** Lead endpoint for the enquiry form; see LeadForm.tsx. */
  formAction,
}: {
  region: Locale;
  formAction?: string;
}) {
  return (
    <>
      <HeroSearch />
      <Categories region={region} />
      <ServiceTiles region={region} />
      <Stats />
      <ListingsGrid />
      <Launches region={region} />
      <Communities region={region} />
      <WhyDubai />
      <Sell region={region} />
      <Partners />
      <Reviews />
      <Contact formAction={formAction} />
      <Faqs
        region={region}
        items={FAQS}
        title="Buying, selling and letting in Dubai."
        lede="The questions we are asked most, answered plainly."
      />
      <PopularSearches region={region} />
    </>
  );
}
