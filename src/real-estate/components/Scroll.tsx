'use client';

/**
 * The scroll layer: inertia, parallax, and the gallery's drift.
 *
 * THREE THINGS, ONE rAF LOOP. Lenis is driven from the same frame callback that
 * writes the parallax and the drift, so the smoothing and everything that reads
 * the scroll position can never be a frame apart — which is exactly how parallax
 * ends up juddering against the content it is supposed to move with.
 *
 * 1. INERTIA. Lenis (already a dependency) replaces the browser's scroll with a
 *    damped one. It sets the real `scrollTop` rather than transforming a
 *    wrapper, so `position: sticky` still works — which matters, because the
 *    masthead is pinned and the whole page rises over it.
 *
 * 2. PARALLAX. Every `[data-par]` gets `--par`, running -1 → 1 as it crosses the
 *    viewport. The stylesheet decides what moves and how far; nothing is
 *    positioned from here. Travel is always smaller than the frame's own
 *    overflow, so a photograph can never show its edge.
 *
 * 3. DRIFT. Every `[data-drift]` gets the same -1 → 1 value, and the gallery
 *    translates its track by a few vw against it. Deliberately a transform and
 *    not `scrollLeft`: the arrows page the rail by scrolling it, so a transform
 *    composes with them instead of fighting for the same property.
 *
 * WHAT IS DELIBERATELY NOT HERE. No scroll hijacking — Lenis damps the scroll
 * the reader asked for, it does not decide where they land. No reveal logic:
 * that is Motion.tsx, which already has the safety rules (visible by default,
 * hidden only under an attribute JavaScript sets) learned from shipping an
 * invisible page once.
 *
 * REDUCED MOTION TURNS ALL OF IT OFF, including Lenis. Damped scrolling is
 * motion the reader did not ask for, and it is one of the things people who set
 * that flag are usually trying to avoid.
 */
import { useEffect } from 'react';

import { navOffset, registerScroller, scrollToTarget } from '../lib/scroll';

export default function Scroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let dead = false;

    /* Only the elements currently on screen are written to. The observer keeps
       the set; without it this walks the whole document every frame. */
    const live = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) live.add(e.target as HTMLElement);
          else {
            live.delete(e.target as HTMLElement);
            /* Park it at rest rather than leaving the last value frozen in,
               so an element scrolled past and returned to does not jump. */
            (e.target as HTMLElement).style.setProperty('--par', '0');
            (e.target as HTMLElement).style.setProperty('--drift', '0');
          }
        }
      },
      { rootMargin: '15% 0px' },
    );

    const watch = () => {
      for (const el of document.querySelectorAll<HTMLElement>('[data-par], [data-drift]')) io.observe(el);
    };
    watch();
    /* Sections mount late on a client-rendered route; pick them up rather than
       requiring every one of them to announce itself. */
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });

    const wrote = new WeakMap<HTMLElement, number>();

    const frame = (time: number) => {
      raf = 0;
      lenis?.raf(time);

      const vh = window.innerHeight || 1;
      for (const el of live) {
        const r = el.getBoundingClientRect();
        /* -1 when the element's middle is a screen below the fold, +1 when it is
           a screen above it, 0 as it passes the centre. */
        const p = Math.max(-1, Math.min(1, ((r.top + r.height / 2) / vh - 0.5) * 2));
        if (Math.abs((wrote.get(el) ?? 99) - p) > 0.002) {
          wrote.set(el, p);
          const v = p.toFixed(4);
          if (el.hasAttribute('data-par')) el.style.setProperty('--par', v);
          if (el.hasAttribute('data-drift')) el.style.setProperty('--drift', v);
        }
      }

      if (!dead) raf = requestAnimationFrame(frame);
    };

    /* Imported for its side effect on the scroll only, so it is loaded after
       paint rather than blocking the first screen on a 20kB library. */
    import('lenis')
      .then(({ default: Lenis }) => {
        if (dead) return;
        /* Registered before anything can use it, so the first click after the
           library lands is already going through it. */
        lenis = new Lenis({
          /* `lerp`, not `duration` + `easing`. A duration runs a fixed-length
             animation to a target, so a second wheel tick during the first one
             restarts the clock and the page keeps arriving late — which is what
             "the scroll breaks" feels like on a page seventeen screens long.
             A lerp eases a fraction of the remaining distance every frame, so
             new input is absorbed immediately instead of queued. 0.12 is damped
             enough to read as inertia and quick enough that a flick still lands
             where it was aimed. */
          lerp: 0.12,
          /* Touch is left alone: a phone's own scrolling is already inertial and
             damping it a second time reads as lag, not as polish. */
          smoothWheel: true,
          syncTouch: false,
        });
        registerScroller(lenis as unknown as { scrollTo: (t: string | number | HTMLElement, o?: Record<string, unknown>) => void });
        document.documentElement.classList.add('vxr-lenis');
      })
      .catch(() => {
        /* The page scrolls natively. That is the whole fallback. */
      });

    /* Same-page anchors. The browser's own jump is overwritten by Lenis on the
       next frame, so every `#id` link on the page is handled here instead —
       once, by delegation, rather than by touching every component that renders
       one. Modified clicks and new-tab clicks are left alone. */
    const onClick = (ev: MouseEvent) => {
      if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      const a = (ev.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      ev.preventDefault();
      history.pushState(null, '', url.hash);
      scrollToTarget(el, navOffset());
    };
    document.addEventListener('click', onClick);

    raf = requestAnimationFrame(frame);

    return () => {
      document.removeEventListener('click', onClick);
      dead = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      mo.disconnect();
      lenis?.destroy();
      registerScroller(null);
      document.documentElement.classList.remove('vxr-lenis');
    };
  }, []);

  return null;
}
