'use client';

/**
 * The listings grid — the section the whole redesign exists to reach.
 *
 * Reads the shared search state, filters the on-page listing set, and renders
 * property cards in the anatomy every reference agrees on: photograph with a
 * status chip, the price large with its basis beside it, the title, the
 * community, then beds · baths · area, then the tags, then the ask.
 *
 * Above the grid: a row of quick type filters (Range's "Latest properties for
 * you" tabs) and an honest results line — how many of the SHOWN listings match,
 * not how many exist in Dubai. Below it: LISTINGS_NOTE, which must stay while
 * the data is illustrative.
 *
 * The empty state is a real state, not a dead end: it names the active filters
 * and offers to clear them or to hand the brief to an advisor.
 */
import { useSearch, setSearch, resetSearch, filterListings, TYPE_OPTIONS, LISTINGS_ANCHOR } from '../lib/search';
import { LISTINGS, LISTINGS_NOTE, type PortalListing } from '../data/listings';
import { ArrowRight, IconArea, IconBath, IconBed, IconHeart, IconPin } from './icons';

const KIND_LABEL = { buy: 'for sale', rent: 'to rent', offplan: 'off-plan' } as const;

function Card({ l }: { l: PortalListing }) {
  return (
    <article className="vxn-re-prop">
      <div className="vxn-re-prop__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={l.img} alt="" loading="lazy" />
        <span className="vxn-re-prop__status">{l.status}</span>
        {/* Required while listings.ts is placeholder data. Remove only when a live
            feed replaces it — a placeholder card without this reads as a listing. */}
        <span className="vxn-re-prop__indic">Indicative</span>
        <button type="button" className="vxn-re-prop__save" aria-label={`Save ${l.title}`}>
          <IconHeart />
        </button>
      </div>

      <div className="vxn-re-prop__body">
        <p className="vxn-re-prop__price">
          {l.price}
          <span>{l.priceNote}</span>
        </p>
        <h3 className="vxn-re-prop__title">{l.title}</h3>
        <p className="vxn-re-prop__where">
          <IconPin />
          {l.community}
        </p>

        <ul className="vxn-re-prop__specs">
          <li>
            <IconBed />
            {l.beds}
          </li>
          <li>
            <IconBath />
            {l.baths}
          </li>
          <li>
            <IconArea />
            {l.area}
          </li>
        </ul>

        <ul className="vxn-re-prop__tags">
          {l.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <a className="vxn-re__link vxn-re-prop__cta" href="#contact">
          Enquire
          <i aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function ListingsGrid() {
  const s = useSearch();
  const results = filterListings(s);
  const total = LISTINGS.filter((l) => l.kind === s.kind).length;
  const active = [s.community, s.type, s.beds, s.price].filter(Boolean).length;

  return (
    <section className="vxn-re__sec" id={LISTINGS_ANCHOR}>
      <div className="vxn-re__wrap">
        <div className="vxn-re__head vxn-re__head--left vxn-re-listings__head">
          <div>
            <span className="vxn-re__eyebrow">Properties {KIND_LABEL[s.kind]}</span>
            <h2 className="vxn-re__h2">Properties in Dubai.</h2>
            <p className="vxn-re-listings__count" aria-live="polite">
              {results.length === total
                ? `${total} ${total === 1 ? 'property' : 'properties'} ${KIND_LABEL[s.kind]}`
                : `${results.length} of ${total} match${active ? ` · ${active} filter${active > 1 ? 's' : ''} on` : ''}`}
            </p>
          </div>

          {/* Quick type filters — the same store the hero bar writes, so the two
              never disagree about what is showing. */}
          <div className="vxn-re-listings__types" role="group" aria-label="Filter by type">
            <button type="button" className="vxn-re-chipbtn" aria-pressed={s.type === ''} onClick={() => setSearch({ type: '' })}>
              All
            </button>
            {TYPE_OPTIONS.map((t) => (
              <button
                key={t.value}
                type="button"
                className="vxn-re-chipbtn"
                aria-pressed={s.type === t.value}
                onClick={() => setSearch({ type: s.type === t.value ? '' : t.value })}
              >
                {/* "Commercial" is already a category noun; the others pluralise. */}
                {t.value === 'commercial' ? t.label : `${t.label}s`}
              </button>
            ))}
          </div>
        </div>

        {results.length ? (
          <div className="vxn-re-props">
            {results.map((l) => (
              <Card l={l} key={l.id} />
            ))}
          </div>
        ) : (
          <div className="vxn-re-listings__empty">
            <p className="vxn-re__h3">Nothing on the page matches that yet.</p>
            <p>
              The listings shown here are a sample. Clear the filters, or tell us the brief and we
              will source it — most of what we transact never reaches a portal.
            </p>
            <div className="vxn-re-listings__emptyctas">
              <button type="button" className="vxn-re__btn vxn-re__btn--line" onClick={() => resetSearch(s.kind)}>
                Clear filters
              </button>
              <a className="vxn-re__btn" href="#contact">
                Send us the brief
                <ArrowRight />
              </a>
            </div>
          </div>
        )}

        <p className="vxn-re__note">{LISTINGS_NOTE}</p>
      </div>
    </section>
  );
}
