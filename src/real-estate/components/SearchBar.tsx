'use client';

/**
 * The hero search bar — the first thing a visitor touches on every one of the
 * six references, and the thing our page did not have.
 *
 * Tabs for the intent (Buy / Rent / Off-Plan), four selects for the shape of
 * the search, one button. The filters are real: they narrow the on-page listing
 * set through the shared store in lib/search.ts, and Search scrolls to the
 * results. The URL updates as the visitor goes, so a search can be shared or
 * reloaded.
 *
 * What it is honest about: there is no listings backend yet, so this searches
 * the twelve listings on the page rather than Dubai. The results count in the
 * grid says so. When a feed arrives, filterListings() is the one function to
 * point at it.
 */
import { navOffset, scrollToTarget } from '../lib/scroll';
import { useSearch, setSearch, resetSearch, PRICE_BANDS, TYPE_OPTIONS, BED_OPTIONS, LISTINGS_ANCHOR } from '../lib/search';
import { listingCommunities, type ListingKind } from '../data/listings';
import { IconSearch } from './icons';

const TABS: { kind: ListingKind; label: string }[] = [
  { kind: 'buy', label: 'Buy' },
  { kind: 'rent', label: 'Rent' },
  { kind: 'offplan', label: 'Off-Plan' },
];

const COMMUNITIES = listingCommunities();

export default function SearchBar() {
  const s = useSearch();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    /* Through the scroll layer, and offset so the heading lands just under the
       fixed bar rather than flush to the top of the viewport. A native
       `window.scrollTo` is overwritten by Lenis on the next frame — see
       lib/scroll.ts for the measurements. */
    scrollToTarget(LISTINGS_ANCHOR, navOffset());
  }

  return (
    <form className="vxn-re-search" onSubmit={submit} role="search" aria-label="Search properties">
      <div className="vxn-re-search__tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.kind}
            type="button"
            role="tab"
            aria-selected={s.kind === t.kind}
            className="vxn-re-search__tab"
            onClick={() => setSearch({ kind: t.kind })}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="vxn-re-search__row">
        <label className="vxn-re-search__field">
          <span>Community</span>
          <select value={s.community} onChange={(e) => setSearch({ community: e.target.value })}>
            <option value="">All communities</option>
            {COMMUNITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="vxn-re-search__field">
          <span>Property type</span>
          <select value={s.type} onChange={(e) => setSearch({ type: e.target.value as typeof s.type })}>
            <option value="">Any type</option>
            {TYPE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="vxn-re-search__field">
          <span>Bedrooms</span>
          <select value={s.beds} onChange={(e) => setSearch({ beds: e.target.value })}>
            <option value="">Any</option>
            {BED_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </label>

        <label className="vxn-re-search__field">
          <span>{s.kind === 'rent' ? 'Annual rent' : 'Price'}</span>
          <select value={s.price} onChange={(e) => setSearch({ price: e.target.value })}>
            <option value="">Any price</option>
            {PRICE_BANDS[s.kind].map((b) => (
              <option key={b.key} value={b.key}>
                {b.label}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="vxn-re__btn vxn-re-search__go">
          <IconSearch />
          Search properties
        </button>
      </div>

      <div className="vxn-re-search__foot">
        <button type="button" className="vxn-re-search__reset" onClick={() => resetSearch(s.kind)}>
          Clear filters
        </button>
        <span className="vxn-re-search__hint">
          Searching the properties shown on this page. Tell us what you are after and we will source
          it.
        </span>
      </div>
    </form>
  );
}
