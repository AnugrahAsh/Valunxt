'use client';

/**
 * The module's motion layer. Mounted once by Shell; nothing else has to change.
 *
 * WHY IT WORKS BY SELECTOR RATHER THAN BY WRAPPER
 *
 * The obvious build is a <Reveal> component wrapped around every section. That
 * means editing a dozen component files, and every section added later has to
 * remember to opt in. This instead reads a table of selectors and animates
 * whatever matches — so all four routes, every section, and anything added
 * later are covered without touching a single section file.
 *
 * SAFETY — the rule that matters most here
 *
 * Reveal animations are the classic way to ship an invisible page: CSS sets
 * opacity:0, the observer never fires, and the content is simply gone. So the
 * stylesheet's default is VISIBLE, and the hidden state exists only under
 * [data-anim='pending'], an attribute JavaScript sets. If this file throws, is
 * blocked, or never runs, every element renders normally. A second guard sweeps
 * anything still pending that is ON SCREEN — see rescueVisible() for why it is
 * deliberately not a blanket reveal.
 *
 * COST
 *
 * One IntersectionObserver for the whole page, not one per element. One rAF
 * scroll loop for the parallax layer. Elements are unobserved once revealed.
 */
import { useEffect } from 'react';

/**
 * What animates, and how.
 *
 * `stagger` makes siblings sharing a parent enter in sequence — the delay is
 * written as a custom property the stylesheet reads, so the timing curve stays
 * a CSS concern.
 */
const GROUPS: { sel: string; variant: string; stagger?: boolean }[] = [
  /* Section headers and lead copy */
  { sel: '.re-sec-head', variant: 'up' },
  { sel: '.re-about__head', variant: 'up' },
  { sel: '.re-faq__head', variant: 'up' },
  { sel: '.re-rev__top', variant: 'up' },
  { sel: '.re-proc__panel', variant: 'right' },
  { sel: '.re-pcta', variant: 'scale' },

  /* Card grids — these stagger */
  { sel: '.re-svc', variant: 'up', stagger: true },
  { sel: '.re-listing', variant: 'up', stagger: true },
  { sel: '.re-plan', variant: 'up', stagger: true },
  { sel: '.re-fig', variant: 'up', stagger: true },
  { sel: '.re-rev__card', variant: 'up', stagger: true },
  { sel: '.re-offer-card', variant: 'up', stagger: true },
  { sel: '.re-ins__card', variant: 'up', stagger: true },
  { sel: '.re-about__card', variant: 'right', stagger: true },
  { sel: '.re-phigh__item', variant: 'up', stagger: true },
  { sel: '.re-val__item', variant: 'up', stagger: true },
  { sel: '.re-costs li', variant: 'up', stagger: true },
  { sel: '.re-table tbody tr', variant: 'fade', stagger: true },
  { sel: '.re-partners__logo', variant: 'fade', stagger: true },
  { sel: '.re-faq__item', variant: 'up', stagger: true },
  { sel: '.re-foot__col', variant: 'up', stagger: true },
  { sel: '.re-why li', variant: 'left', stagger: true },
  { sel: '.re-band__row', variant: 'left', stagger: true },

  /* Figures and panels */
  { sel: '.re-about__figure', variant: 'left' },
  { sel: '.re-val__figure', variant: 'left' },
  { sel: '.re-ins__figure', variant: 'scale' },
  { sel: '.re-proc__figure', variant: 'left' },
  { sel: '.re-contact__inner > div', variant: 'up', stagger: true },
  { sel: '.re-form', variant: 'right' },
  { sel: '.re-partners__title', variant: 'left' },
  { sel: '.re-foot__brand', variant: 'up' },
];

/** Numerals that count up when they scroll into view. */
const COUNTERS = '.re-fig__value, .re-about__stat, .re-offer__stat, .re-phigh__value';

/** Images that drift against the scroll. Kept to big editorial figures. */
const PARALLAX =
  '.re-about__figure img, .re-proc__figure img, .re-val__figure img, .re-ins__figure img, .re-phero__bg img';

/** Split 'AED 250B+' into ['AED ', 250, 'B+'] so only the number animates. */
function parseNumber(text: string): { prefix: string; value: number; suffix: string; grouped: boolean } | null {
  const m = text.trim().match(/^([^\d]*)([\d][\d,]*(?:\.\d+)?)(.*)$/s);
  if (!m) return null;
  const raw = m[2]!;
  const value = Number(raw.replace(/,/g, ''));
  if (!Number.isFinite(value)) return null;
  return { prefix: m[1] ?? '', value, suffix: m[3] ?? '', grouped: raw.includes(',') };
}

export default function MotionRoot() {
  useEffect(() => {
    /* Respect the setting, and bail cleanly on very old browsers. The page is
       already fully visible at this point, so bailing costs nothing. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const root = document.querySelector('.re-root');
    if (!root) return;

    const revealed = new WeakSet<Element>();
    const timers: number[] = [];

    const show = (el: Element) => {
      if (revealed.has(el)) return;
      revealed.add(el);
      (el as HTMLElement).dataset.anim = 'in';
    };

    /* ---------- 1. Reveal on scroll ---------- */

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          show(e.target);
          io.unobserve(e.target);
        }
      },
      /* Fire a little before the element reaches the fold, so the motion is
         finishing as it arrives rather than starting. */
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    for (const g of GROUPS) {
      const els = Array.from(root.querySelectorAll<HTMLElement>(g.sel));
      if (!els.length) continue;

      /* Stagger is per-parent: two separate grids each start from zero rather
         than the second one inheriting the first one's tail. */
      const seen = new Map<Element, number>();
      for (const el of els) {
        if (el.dataset.anim) continue; // an earlier, more specific group won it
        el.dataset.anim = 'pending';
        el.dataset.animVariant = g.variant;
        if (g.stagger && el.parentElement) {
          const i = seen.get(el.parentElement) ?? 0;
          seen.set(el.parentElement, i + 1);
          /* Capped so a long list never ends up waiting a second and a half. */
          el.style.setProperty('--rd', `${Math.min(i, 7) * 70}ms`);
        }
        io.observe(el);
      }
    }

    /* Safety net.
       The risk being guarded is "the observer never fires, so content stays at
       opacity 0 forever". The naive guard — reveal EVERYTHING on a timer — also
       destroys the effect: four seconds after load the whole page below the fold
       has already played to a viewer who has not scrolled there yet.
       So the guard only ever reveals what is actually ON SCREEN, which is the
       only content that could be visibly missing. Anything below the fold stays
       for the observer, however long the visitor takes to reach it. */
    const rescueVisible = () => {
      const vh = window.innerHeight;
      root.querySelectorAll<HTMLElement>('[data-anim="pending"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) show(el);
      });
    };

    timers.push(window.setTimeout(rescueVisible, 2500));
    /* And again on scroll, so a stalled observer can never leave on-screen
       content blank no matter when the visitor gets there. Cheap: it only walks
       the shrinking set of still-pending nodes. */
    let rescueFrame = 0;
    const onRescue = () => {
      if (rescueFrame) return;
      rescueFrame = requestAnimationFrame(() => {
        rescueFrame = 0;
        rescueVisible();
      });
    };
    window.addEventListener('scroll', onRescue, { passive: true });

    /* ---------- 2. Count-up numerals ---------- */

    const countIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          countIo.unobserve(el);

          const parsed = parseNumber(el.textContent ?? '');
          if (!parsed) continue;
          const { prefix, value, suffix, grouped } = parsed;
          const decimals = (String(value).split('.')[1] ?? '').length;
          const start = performance.now();
          const DUR = 1400;

          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / DUR);
            /* Ease-out quart: quick, then a long settle — reads as counting up
               rather than as a linear ramp. */
            const eased = 1 - Math.pow(1 - t, 4);
            const n = value * eased;
            const shown = grouped
              ? Math.round(n).toLocaleString('en-US')
              : n.toFixed(decimals);
            el.textContent = `${prefix}${shown}${suffix}`;
            if (t < 1) {
              requestAnimationFrame(tick);
            } else {
              /* Marks the run as finished. The final text is identical to the
                 text we started from, so without this there is no way to tell a
                 completed count-up from one that never ran. */
              el.dataset.counted = 'true';
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );

    const counters = Array.from(root.querySelectorAll<HTMLElement>(COUNTERS));
    for (const el of counters) {
      /* Keep the final text in the DOM until the animation actually starts, so
         a viewer who never scrolls here still reads the real figure. */
      if (parseNumber(el.textContent ?? '')) countIo.observe(el);
    }

    /* ---------- 3. Parallax on editorial images ---------- */

    const layers = Array.from(root.querySelectorAll<HTMLElement>(PARALLAX));
    let frame = 0;

    const drift = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const img of layers) {
        const box = img.parentElement ?? img;
        const r = box.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        /* -1 above the fold, 0 centred, +1 below: a smooth, bounded ramp. */
        const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        img.style.transform = `translate3d(0, ${(p * 26).toFixed(2)}px, 0) scale(1.08)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(drift);
    };

    if (layers.length) {
      for (const img of layers) img.classList.add('re-parallax');
      drift();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }

    /* ---------- 4. Page entrance ---------- */

    root.setAttribute('data-entered', 'true');

    return () => {
      io.disconnect();
      countIo.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('scroll', onRescue);
      if (rescueFrame) cancelAnimationFrame(rescueFrame);
      for (const t of timers) window.clearTimeout(t);
    };
  }, []);

  return null;
}
