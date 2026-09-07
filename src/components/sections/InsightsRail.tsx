'use client';

/**
 * Insights — the article rail that closes the page's editorial run.
 *
 * Built to the reference layout: the heading and its action on the left, the
 * lede opposite it, the rail's own controls under that, then a row of tall
 * portrait cards that scroll horizontally — each a full-bleed image with the
 * category set over its foot, the headline beneath it and a read link under
 * that. Two wide cards close the section.
 *
 * The rail scrolls natively with snap points, so a trackpad, a touch drag and
 * the two buttons all move the same thing. The buttons page by one card and
 * disable at each end; if JavaScript never runs, the row is still a scrollable
 * list and every card is still a link.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import { BASE, rurl } from '@/lib/region';
import type { BlogCatalogEntry } from '@/data/blog-catalog';

export interface InsightCard {
  slug: string;
  post: BlogCatalogEntry;
}

/** The two wide cards under the rail — real destinations, not invented ones. */
const PROMOS: { k: string; d: string; cta: string; href: string; tone: string }[] = [
  {
    k: 'Research &amp; Reports.',
    d: 'Market intelligence and investment research, written for the leaders who have to act on it.',
    cta: 'Read the research',
    href: '/research/',
    tone: 'a',
  },
  {
    k: 'Free consultation.',
    d: 'A partner listens first and says what is actually needed, what is not, and what it will cost.',
    cta: 'Book a consultation',
    href: '/free-consultation/',
    tone: 'b',
  },
];

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {back ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function InsightsRail({
  cards,
  region,
}: {
  cards: InsightCard[];
  region: string;
}) {
  const railRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  /* Whether the row actually overflows — with few enough cards it does not, and
     two permanently disabled arrows read as broken rather than as restrained. */
  const [scrollable, setScrollable] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 4);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const page = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    /* One card plus its gap — read off the DOM so the step always matches
       whatever the breakpoint is actually showing. */
    const first = el.querySelector('li');
    const step = first ? first.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  return (
    <section className="vxi" aria-labelledby="vxi-h">
      <div className="vxh__in">
        <div className="vxi__head">
          <div>
            <h2 className="vxi__title" id="vxi-h">
              Practical guidance on UAE tax, accounting and valuation
            </h2>
            <a className="vxi__btn" href={rurl(region, '/blogs/')}>
              All insights <Arrow />
            </a>
          </div>
          <p className="vxi__lede">
            Written for the leaders who have to act on it &#8212; what changed, what it means for
            your position, and what to do before the deadline rather than after it.
          </p>
        </div>

        <div className="vxi__controls" hidden={!scrollable}>
          <button
            className="vxi__nav"
            type="button"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label="Previous insights"
          >
            <Chevron back />
          </button>
          <button
            className="vxi__nav"
            type="button"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label="Next insights"
          >
            <Chevron />
          </button>
        </div>

        <ul className="vxi__rail" ref={railRef} onScroll={sync}>
          {cards.map(({ slug, post }) => (
            <li key={slug}>
              <a className="vxi-card" href={rurl(region, `/blogs/${slug}/`)}>
                <span className="vxi-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={BASE + post.img} alt="" loading="lazy" width={640} height={800} />
                  <span className="vxi-card__tag">{post.category}</span>
                </span>
                <span className="vxi-card__t">{post.title}</span>
                <span className="vxi-card__go">
                  Read the article <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="vxi__promos">
          {PROMOS.map((p) => (
            <a
              className={`vxi-promo vxi-promo--${p.tone}`}
              href={rurl(region, p.href)}
              key={p.href}
            >
              <span className="vxi-promo__b">
                <span className="vxi-promo__d">
                  <b dangerouslySetInnerHTML={{ __html: p.k }} /> {p.d}
                </span>
                <span className="vxi-promo__go">
                  {p.cta} <Arrow />
                </span>
              </span>
              <span className="vxi-promo__art" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
