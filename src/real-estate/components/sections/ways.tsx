'use client';

/**
 * The three ways in — Buy, Sell, Rent — on the reference's arrangement.
 *
 * THE REFERENCE, which is what this replicates: a very large, light,
 * wide-tracked uppercase line centred on a flat ground, a black pill under it,
 * and three photographs below in an asymmetric row — the middle one taller and
 * starting higher, the outer two smaller and dropped. Small crosses mark the
 * left and right edges of the frame.
 *
 * WHAT IS DIFFERENT, on instruction: the reference crops its outer two images
 * off the edges of the screen. All three of ours are whole.
 *
 * THE INTERACTION. The centred line is a screen, not a heading — it carries the
 * section's own title at rest and swaps to the name and description of whichever
 * card is under the pointer. The card's own label appears above its picture at
 * the same moment. So the copy is in one place at a time: the reader is either
 * being told what the section is, or being told about one of the three things in
 * it, and never both at once.
 *
 * The type here is the reference's, not the panel system's: uppercase, light,
 * and widely tracked, where every other statement on this page is tight and
 * sentence case. That is a deliberate exception for one section rather than a
 * drift — see `.vxr-ways__h` in valunxt-re-panels.css.
 *
 * Clicking a card does what the doors it replaces did: sets the search to that
 * intent and takes the reader to the results.
 *
 * IT IS A SCENE, so the row of photographs takes whatever height the type
 * leaves rather than a fixed aspect ratio: the three pictures are as tall as
 * the screen allows and the section ends exactly at the fold.
 */
import { useState } from 'react';

import { rurl } from '@/lib/region';

import { LISTINGS } from '../../data/listings';
import { navOffset, scrollToTarget } from '../../lib/scroll';
import { setSearch } from '../../lib/search';
import type { Locale } from '../../lib/types';
import { ArrowRight } from '../icons';

interface Way {
  key: 'sell' | 'buy' | 'rent';
  name: string;
  /** Replaces the centred line while this card is under the pointer. */
  title: string;
  body: string;
  img: string;
}

/* Left, centre, right — the order the row is read in. Buy is the middle card,
   so it gets the tall frame and the best photograph. */
const WAYS: Way[] = [
  {
    key: 'sell',
    name: 'Sell',
    title: 'Sell it for what it is worth',
    body: 'A valuation on the evidence first, then a buyer list before the portals ever see it. You will know the honest number before anyone else does.',
    img: '/real-estate/img/ways/sell.webp',
  },
  {
    key: 'buy',
    name: 'Buy',
    title: 'Buy the address, not the floor area',
    body: 'Freehold homes across the communities people actually want to live in — beachfront, canal-side and the quiet green streets in between.',
    img: '/real-estate/img/ways/buy.webp',
  },
  {
    key: 'rent',
    name: 'Rent',
    title: 'Rent the life before you commit',
    body: 'Furnished or empty, one cheque to twelve. The fastest way to find out whether a community is yours before you buy into it.',
    img: '/real-estate/img/ways/rent.webp',
  },
];

const HEAD = {
  title: 'Properties of luxury in Dubai',
  body: 'Three ways in, and one team behind all of them. Hover to see what each one means.',
};

export default function Ways({ region }: { region: Locale }) {
  const [at, setAt] = useState<Way | null>(null);
  const shown = at ?? HEAD;

  function go(w: Way) {
    /* Through the scroll layer, not `scrollIntoView`: Lenis owns the scroll
       position and overwrites a native jump on the next frame. See lib/scroll. */
    if (w.key === 'sell') {
      scrollToTarget('sell', navOffset());
      return;
    }
    setSearch({ kind: w.key, type: '' });
    scrollToTarget('listings', navOffset());
  }

  return (
    <section className="vxr-scene vxr-ways" aria-labelledby="vxr-ways-h">
      {/* The reference marks the edges of its frame with a small cross. */}
      <i className="vxr-ways__mark vxr-ways__mark--l" aria-hidden="true" />
      <i className="vxr-ways__mark vxr-ways__mark--r" aria-hidden="true" />

      <div className="vxr-ways__head">
        {/* Keyed on what is showing, so React replaces the node and the entry
            animation plays again on every change rather than only the first. */}
        <h2 className="vxr-ways__h" id="vxr-ways-h" key={at ? at.key : 'head'}>
          {shown.title}
        </h2>
        <p className="vxr-ways__p" key={at ? `${at.key}-p` : 'head-p'}>
          {shown.body}
        </p>
        <a className="vxr-btn vxr-ways__all" href={rurl(region, '/real-estate/#listings')}>
          All our properties <i>({LISTINGS.length})</i>
          <ArrowRight />
        </a>
      </div>

      <div className="vxr-ways__row">
        {WAYS.map((w) => (
          <button
            className={`vxr-way vxr-way--${w.key}`}
            type="button"
            key={w.key}
            data-on={at?.key === w.key ? 'true' : 'false'}
            onPointerEnter={() => setAt(w)}
            onPointerLeave={() => setAt(null)}
            onFocus={() => setAt(w)}
            onBlur={() => setAt(null)}
            onClick={() => go(w)}
          >
            {/* Above the picture, and only while this card is the one being
                looked at — the label is the answer to "what am I hovering",
                which is a question nobody has until they hover. */}
            <span className="vxr-way__tag">{w.name}</span>
            <span className="vxr-way__frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.img} alt={`${w.name} property in Dubai`} loading="lazy" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
