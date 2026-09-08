'use client';

/**
 * The masthead — and the one piece of scroll choreography on the page.
 *
 * THE COMPOSITION, unchanged: a photograph of Dubai floor to ceiling and edge to
 * edge, the name and its paragraph over the empty quarter at the top left, and a
 * blue card flush into the bottom-right corner with white borders on its top and
 * left. That corner is the join the whole frame turns on.
 *
 * THE PIN, which is new. Scrolling off this section is not a scroll of the page
 * past it. The hero is `position: sticky`, so it stays exactly where it is; the
 * rest of the page is a higher layer with an opaque ground and a rounded top
 * edge, and it rises over the hero from underneath. Meanwhile the hero collapses
 * — scaling down, lifting, and dimming — so it is visibly receding rather than
 * merely being covered.
 *
 * All of that is CSS. This file's only job is to measure how far through the
 * hero the reader is and write it to `--collapse` (0 → 1), plus `--drift` for
 * the photograph's own travel inside the frame.
 *
 * WHY IT IS NOT SCROLL-JACKED. Nothing here listens for `wheel` and nothing
 * calls `scrollTo`. The scroll is the browser's, at whatever speed the reader
 * chose, and the keyboard, a trackpad, a screen reader and Find-in-page all
 * behave exactly as they would on an ordinary page. The only unusual thing about
 * this section is which element is painted on top of which.
 *
 * ONE rAF LOOP, not a scroll handler, so the value can never be a frame behind
 * the paint that uses it — and it stops entirely once the hero is off screen.
 */
import { useEffect, useRef } from 'react';

import { rurl } from '@/lib/region';
import type { Locale } from '../lib/types';
import { ArrowRight } from './icons';

export default function HeroStage({ region }: { region: Locale }) {
  const secRef = useRef<HTMLElement | null>(null);
  const shotRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const sec = secRef.current;
    const img = shotRef.current;
    if (!sec || !img) return;
    /* Reduced motion keeps the pin — it is layout, and it costs nothing — but
       not the collapse, which is the part that moves. `--collapse` simply stays
       at its initial 0 and the stylesheet's own reduced-motion block neutralises
       what is left. */
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    /* The layer that rises over the hero — `.vxr-flow`, rendered next to it in
       HomeBody. Its position IS the progress, which is why it is the thing
       measured. */
    const riser = sec.nextElementSibling;

    let raf = 0;
    let onScreen = true;
    let wrote = -1;

    const frame = () => {
      raf = 0;
      const h = sec.offsetHeight || 1;
      /* THE TRAP, and the reason this is not the obvious one-liner. On a
         `position: sticky` element `offsetTop` reports the element's STUCK
         position, not its position in the layout — so it tracks the scroll
         exactly, `scrollY - sec.offsetTop` is always ~0, and the collapse
         silently never plays. The riser is in normal flow, so its rect is
         honest: it sits one screen down at rest and reaches the top of the
         viewport when the hero is fully covered.

         The fallback is for a hero rendered without a riser after it; the hero
         is the first thing in the document, so the raw scroll is the progress. */
      const p = Math.min(
        1,
        Math.max(0, riser ? 1 - riser.getBoundingClientRect().top / h : window.scrollY / h),
      );
      if (Math.abs(p - wrote) > 0.002) {
        wrote = p;
        sec.style.setProperty('--collapse', p.toFixed(4));
        /* The photograph travels inside its frame while the frame collapses, so
           the picture is still moving when the page arrives over it. */
        img.style.setProperty('--drift', (p - 0.5).toFixed(4));
      }
      if (onScreen) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (es) => {
        onScreen = es.some((e) => e.isIntersecting);
        if (onScreen && !raf) raf = requestAnimationFrame(frame);
      },
      { rootMargin: '10% 0px' },
    );
    io.observe(sec);

    return () => {
      onScreen = false;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="vxr-mast" aria-label="Dubai real estate" ref={secRef}>
      <div className="vxr-mast__in">
        <figure className="vxr-mast__shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={shotRef}
            src="/real-estate/img/hero/mast.webp"
            srcSet="/real-estate/img/hero/mast-sm.webp 1280w, /real-estate/img/hero/mast.webp 2560w"
            sizes="100vw"
            alt="Beachfront villas on Palm Jumeirah, Dubai"
            width={2560}
            height={1138}
            fetchPriority="high"
          />
          <i className="vxr-mast__wash" aria-hidden="true" />

          <div className="vxr-mast__copy">
            <h1 className="vxr-mast__h">
              Live where Dubai
              <br />
              is at its best
            </h1>

            <p className="vxr-mast__lede">
              Beachfront villas on the Palm. Sky homes over the Marina. The quiet, green streets of
              the Hills. The addresses people move to this city for &mdash; and the advice to buy one
              well.
            </p>
          </div>

          {/* Inside the frame, because it is positioned against the
              photograph's own corner — as a sibling it would resolve against
              the section and land on the page's edge rather than the band's. */}
          <div className="vxr-mast__card">
            <p>
              Tell us the life you want here and the number you have. We will tell you which
              communities give you it &mdash; and what they honestly cost.
            </p>
            <a className="vxr-mast__btn" href={rurl(region, '/real-estate/#contact')}>
              Write us
              <span aria-hidden="true">
                <ArrowRight />
              </span>
            </a>
          </div>
        </figure>
      </div>
    </section>
  );
}
