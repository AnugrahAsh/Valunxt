'use client';

/**
 * The horizontal rail, and the pair of arrows that drive it.
 *
 * WHY THE PAGE HAS RAILS AT ALL. Every section is exactly one screen tall now.
 * Three sections carry more than a screen's worth of things — properties,
 * communities, reviews — and the choice is to crop them, to let them break the
 * one-screen rule, or to lay them across the screen instead of down it. The
 * references all take the third option, and it is the right one: a row of
 * photographs the full height of the screen is a better argument for a property
 * than four rows of thumbnails.
 *
 * THE ONE RULE THIS FILE EXISTS TO ENFORCE. Never `scrollIntoView`. It scrolls
 * *every* scrollable ancestor including the document, so moving a rail one card
 * to the right also drags the whole page to that rail — which is exactly the bug
 * the services carousel shipped with once. `scrollBy` on the element only ever
 * moves the element.
 *
 * The arrows are a convenience, not the mechanism: the rail is a native
 * scroll container, so a trackpad, a touchscreen, shift+wheel and the keyboard
 * all work whether or not this component renders.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowRight } from './icons';

export interface RailHandle {
  ref: React.RefObject<HTMLDivElement | null>;
  /** True when there is nothing further to scroll to in that direction. */
  atStart: boolean;
  atEnd: boolean;
  back: () => void;
  next: () => void;
}

export function useRail(): RailHandle {
  const ref = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const read = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    /* A rail with nothing to scroll is at both ends at once, which is correct:
       both arrows go inert rather than one of them lying. */
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    read();
    el.addEventListener('scroll', read, { passive: true });
    /* Content can change under it — the properties rail is filtered — and the
       card widths are in vw, so a resize changes the ends too. */
    const ro = new ResizeObserver(read);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    return () => {
      el.removeEventListener('scroll', read);
      ro.disconnect();
    };
  }, [read]);

  /* Just under one screenful, so the card you were looking at stays on screen as
     an anchor rather than the row jumping to somewhere unrecognisable. */
  const by = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return { ref, atStart, atEnd, back: () => by(-1), next: () => by(1) };
}

export function Arrows({ rail, label }: { rail: RailHandle; label: string }) {
  return (
    <div className="vxr-arrows">
      <button
        type="button"
        className="vxr-arrow vxr-arrow--back"
        onClick={rail.back}
        disabled={rail.atStart}
        aria-label={`Previous ${label}`}
      >
        <ArrowRight />
      </button>
      <button
        type="button"
        className="vxr-arrow"
        onClick={rail.next}
        disabled={rail.atEnd}
        aria-label={`Next ${label}`}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
