'use client';

/**
 * The site's parallax engine.
 *
 * ONE LOOP, MANY EFFECTS. Every page wanted its own kind of depth, and the
 * obvious way to get that — a bespoke scroll handler per page — is how you end
 * up with six listeners fighting over the same frame. So this measures, and CSS
 * decides what the measurement means: for each `[data-vxh-par]` element it
 * writes two numbers and nothing else.
 *
 *   --p    0 when the element's top edge reaches the bottom of the viewport,
 *          1 when its bottom edge leaves the top. Progress through the frame.
 *   --pc   the same reading centred: -1 entering, 0 at the middle, +1 leaving.
 *          This is the one you want for anything that should be neutral while
 *          it is being read and displaced at either end.
 *
 * A page then names an effect — `data-vxh-par="rise"` — and the stylesheet
 * turns those numbers into a transform. Adding a seventh kind of parallax is a
 * CSS rule, not another listener.
 *
 * WHY IT IS NOT A SCROLL HANDLER. Scroll events fire at their own rate, not the
 * compositor's, so anything driven straight off one arrives a frame late and in
 * steps. This measures inside rAF, on the frame that will paint the result, and
 * only while something it tracks is actually on screen — an IntersectionObserver
 * keeps the live set, and the loop stops when that set is empty or the tab is
 * hidden. On a page whose parallax has all scrolled past, this costs nothing.
 *
 * It writes no styles of its own, so with JavaScript off, under reduced motion,
 * or before hydration, every element sits at its CSS default and the page reads
 * exactly as it should — the effect is additive, never load-bearing.
 */
import { useEffect } from 'react';

export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const live = new Set<HTMLElement>();
    /* Last value written per element, so a frame that changed nothing does not
       touch the style attribute — a write is a style invalidation whether or not
       the number differs. */
    const wrote = new WeakMap<HTMLElement, number>();
    let raf = 0;
    let running = false;

    function frame() {
      raf = 0;
      const vh = window.innerHeight || 1;
      for (const el of live) {
        const r = el.getBoundingClientRect();
        /* The span over which this element is "passing": its own height plus the
           viewport, so an element taller than the screen still resolves 0 → 1. */
        const span = r.height + vh;
        const p = Math.max(0, Math.min(1, (vh - r.top) / span));
        const last = wrote.get(el);
        if (last !== undefined && Math.abs(last - p) < 0.0015) continue;
        wrote.set(el, p);
        el.style.setProperty('--p', p.toFixed(4));
        el.style.setProperty('--pc', (p * 2 - 1).toFixed(4));
      }
      if (running && live.size) raf = requestAnimationFrame(frame);
      else running = false;
    }

    function play() {
      if (running || !live.size || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) live.add(e.target as HTMLElement);
          else live.delete(e.target as HTMLElement);
        }
        play();
      },
      /* Generous margins: an element should already be at the right offset by
         the time its first pixel is visible, not snap into place on entry. */
      { rootMargin: '30% 0px 30% 0px' },
    );

    const observed: HTMLElement[] = [];
    function scan() {
      document.querySelectorAll<HTMLElement>('[data-vxh-par]').forEach((el) => {
        if (observed.includes(el)) return;
        observed.push(el);
        io.observe(el);
      });
    }
    scan();

    /* Sections that mount after this (a tab panel, a lazy list) are picked up
       without another observer per page. */
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    const onVis = () => (document.hidden ? (running = false) : play());
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', play, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', play);
    };
  }, []);

  return null;
}
