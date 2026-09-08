'use client';

/**
 * The properties scene — the section the whole redesign exists to reach.
 *
 * ON THE FIRST REFERENCE. One large card at the left running the full height of
 * the screen, then a row of smaller ones whose picture stops short and whose
 * facts sit underneath it, with the arrows at the bottom right. It is a RAIL,
 * not a grid, and that is what lets twelve properties hold exactly one screen
 * instead of four.
 *
 * The card's facts are the reference's, in its order: the price first, then the
 * three numbers a buyer compares on, then the title, then the place. No icons —
 * the labels are already words — and no save button, because there is no account
 * behind one.
 *
 * WHY THIS OWNS THE WHOLE SECTION and not just the results. The heading needs
 * the live count, the arrows need the rail, and the rail's contents change when
 * the filters do. Splitting those across two files meant three props and a ref
 * passed through the page body for no gain.
 *
 * The Indicative chip stays on every card until a live feed replaces
 * data/listings.ts, and LISTINGS_NOTE stays under the rail. A placeholder card
 * without them reads as a listing.
 */
import { useEffect } from 'react';

import { useSearch, setSearch, resetSearch, filterListings, LISTINGS_ANCHOR } from '../lib/search';
import type { ListingKind } from '../data/listings';
import { LISTINGS, LISTINGS_NOTE, type PortalListing } from '../data/listings';
import SearchBar from './SearchBar';
import { Arrows, useRail } from './rail';

const KIND_LABEL = { buy: 'for sale', rent: 'to rent', offplan: 'off-plan' } as const;

/** What the properties scene calls itself on a page that is already an intent. */
const HEADING = {
  buy: 'What is for sale right now',
  rent: 'What is available to rent',
  offplan: 'What is launching next',
} as const;

function Card({ l, lead }: { l: PortalListing; lead?: boolean }) {
  return (
    <a className={`vxr-prop${lead ? ' vxr-prop--lead' : ''}`} href="#contact">
      <span className="vxr-prop__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={l.img} alt="" loading="lazy" />
        <span className="vxr-prop__flag">Indicative</span>
      </span>

      {/* One line, the reference's order: what it costs, then what you get. */}
      <span className="vxr-prop__facts">
        <span className="vxr-prop__price">
          {l.price} <i>{l.priceNote}</i>
        </span>
        <span>{l.area}</span>
        <span>{l.beds} bed</span>
        <span>{l.baths} bath</span>
      </span>

      <span className="vxr-prop__title">{l.title}</span>
      <span className="vxr-prop__where">{l.community}</span>
    </a>
  );
}

export default function ListingsGrid({ lockKind }: { lockKind?: ListingKind } = {}) {
  const s = useSearch();

  /* On a page that IS an intent — /rent-property/, /buy-property/ — the store is
     set to it once on arrival and the three tabs come off. The page has already
     answered the question the tabs ask, and leaving them there lets a visitor
     put the Rent page into Buy mode, which is a URL that then disagrees with the
     heading above it. */
  useEffect(() => {
    if (lockKind) setSearch({ kind: lockKind });
  }, [lockKind]);
  const rail = useRail();
  const results = filterListings(s);
  const total = LISTINGS.filter((l) => l.kind === s.kind).length;
  const active = [s.community, s.type, s.beds, s.price].filter(Boolean).length;

  return (
    <section
      className={`vxr-scene vxr-scene--flush vxr-props${lockKind ? ' vxr-props--locked' : ''}`}
      data-par
      id={LISTINGS_ANCHOR}
      aria-labelledby="vxr-props-h"
    >
      {/* No eyebrow over the heading. The heading already says what this is, the
          three intent tabs directly under it say which set is showing, and a
          third label saying "Properties for sale" was one line of type bought
          out of the photographs. */}
      <div className="vxr-scene__head">
        <h2 className="vxr-kicker" id="vxr-props-h">
          {lockKind ? HEADING[lockKind] : 'The ones we would show a friend'}
        </h2>
        <Arrows rail={rail} label="properties" />
      </div>

      {/* One hairline row rather than a search panel — same component, same
          URL-synced state, an eighth of the room. */}
      <div className="vxr-props__filters">
        <SearchBar />
      </div>

      {results.length ? (
        <div className="vxr-rail" ref={rail.ref}>
          {results.map((l, i) => (
            <Card l={l} lead={i === 0} key={l.id} />
          ))}
        </div>
      ) : (
        /* A real state, not a dead end: it names what is on and offers both
           ways out. */
        <div className="vxr-props__empty">
          <p className="vxr-line">Nothing on the page matches that yet.</p>
          <p className="vxr-copy">
            The listings shown here are a sample. Clear the filters, or tell us the brief and we
            will source it &mdash; most of what we transact never reaches a portal.
          </p>
          <div className="vxr-sell__act">
            <button type="button" className="vxr-btn" onClick={() => resetSearch(s.kind)}>
              Clear filters
            </button>
            <a className="vxr-btn vxr-btn--light" href="#contact">
              Send us the brief
            </a>
          </div>
        </div>
      )}

      <div className="vxr-scene__foot">
        <p className="vxr-props__note">{LISTINGS_NOTE}</p>
        <p className="vxr-props__count" aria-live="polite">
          {results.length === total
            ? `${total} ${total === 1 ? 'property' : 'properties'} ${KIND_LABEL[s.kind]}`
            : `${results.length} of ${total} match${active ? ` · ${active} filter${active > 1 ? 's' : ''} on` : ''}`}
        </p>
      </div>
    </section>
  );
}

