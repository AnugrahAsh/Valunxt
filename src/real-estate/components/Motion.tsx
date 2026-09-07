'use client';

/**
 * The section's motion layer. Mounted once per page; nothing else has to change.
 *
 * WHY BY SELECTOR RATHER THAN BY WRAPPER
 *
 * The obvious build is a <Reveal> component wrapped around every block. That
 * means editing a dozen files, and every section added later has to remember to
 * opt in. This reads a table of selectors and animates whatever matches — so the
 * whole section, and anything added to it later, is covered without touching a
 * single section file.
 *
 * THE SAFETY RULE, which matters more than any of the effects
 *
 * Reveal animations are the classic way to ship an invisible page: CSS sets
 * opacity 0, the observer never fires, and the content is simply gone. So the
 * stylesheet's default is VISIBLE, and the hidden state exists only under
 * [data-anim='pending'] — an attribute this file sets. If it throws, is blocked,
 * or never runs, the page renders normally.
 *
 * Two further guards, both learned the hard way here:
 *   • A hidden tab gets no animation frames and unreliable observer callbacks,
 *     so nothing is marked pending until the document is actually visible.
 *     Opening a link in a background tab used to mean returning to a blank page.
 *   • A timer sweeps anything still pending that is ON SCREEN. Deliberately not
 *     a blanket reveal — that would play the whole page to someone who has not
 *     scrolled there yet.
 *
 * ENTRIES AND EXITS
 *
 * Elements do not latch. Leaving through the top sets 'out'; dropping back below
 * the fold resets to 'pending'. So scrolling back up replays the entry rather
 * than finding everything already arrived, which is what makes a long page feel
 * alive rather than like a list that has been switched on once.
 */
import { useEffect } from 'react';

/**
 * What animates, and how. `stagger` makes siblings sharing a parent enter in
 * sequence — the delay is written as a custom property the stylesheet reads, so
 * the timing curve stays a CSS concern.
 */
const GROUPS: { sel: string; variant: string; stagger?: boolean }[] = [
  { sel: '.vxn-re__head', variant: 'up' },

  /* Editorial figures are uncovered rather than faded. */
  { sel: '.vxn-re-about__figure', variant: 'mask' },
  { sel: '.vxn-re-val__figure', variant: 'mask' },
  { sel: '.vxn-re-proc__figure', variant: 'mask' },

  { sel: '.vxn-re-val__copy', variant: 'right' },
  { sel: '.vxn-re-proc__panel', variant: 'right' },
  { sel: '.vxn-re-contact__copy', variant: 'left' },
  { sel: '.vxn-re-form', variant: 'right' },
  { sel: '.vxn-re-foot__news', variant: 'up' },

  /* Grids stagger. */
  { sel: '.vxn-re-about__card', variant: 'up', stagger: true },
  { sel: '.vxn-re-svc', variant: 'up', stagger: true },
  { sel: '.vxn-re-val__item', variant: 'up', stagger: true },
  { sel: '.vxn-re-gal__item', variant: 'scale', stagger: true },
  { sel: '.vxn-re-rev', variant: 'up', stagger: true },
  { sel: '.vxn-re-faq', variant: 'up', stagger: true },
  { sel: '.vxn-re-partner', variant: 'scale', stagger: true },
  /* Portal sections */
  { sel: '.vxn-re-search', variant: 'up' },
  { sel: '.vxn-re-cat', variant: 'up', stagger: true },
  { sel: '.vxn-re-stat', variant: 'up', stagger: true },
  { sel: '.vxn-re-prop', variant: 'up', stagger: true },
  { sel: '.vxn-re-launch', variant: 'up', stagger: true },
  { sel: '.vxn-re-whycard', variant: 'up', stagger: true },
  { sel: '.vxn-re-svctile', variant: 'scale', stagger: true },
  { sel: '.vxn-re-sell__copy', variant: 'left' },
  { sel: '.vxn-re-sell__figure', variant: 'mask' },
  { sel: '.vxn-re-pop__col', variant: 'up', stagger: true },
  { sel: '.vxn-re-comm', variant: 'up', stagger: true },
  { sel: '.vxn-re-faq__figure', variant: 'mask' },
  { sel: '.vxn-re-hero__card', variant: 'right' },
  { sel: '.vxn-re-val__badge', variant: 'up' },
  { sel: '.vxn-re-proc__card', variant: 'up' },
  { sel: '.vxn-re-about__statement', variant: 'up' },
  { sel: '.vxn-re-contact__why li', variant: 'left', stagger: true },
  { sel: '.vxn-re-foot__col', variant: 'up', stagger: true },
];

/** Numerals that count up as they arrive. */
const COUNTERS = '.vxn-re-stat__value, .vxn-re-about__value, .vxn-re-val__badge b, .vxn-re-sell__stat b';

/** Layers that drift against the scroll. Kept to full-bleed editorial imagery. */
const PARALLAX =
  '.vxn-re-hero__media video, .vxn-re-hero__media img, .vxn-re-about__figure img, ' +
  '.vxn-re-val__figure img, .vxn-re-proc__figure img, .vxn-re-contact__bg img, ' +
  '.vxn-re-comm img, .vxn-re-faq__figure img, .vxn-re-whycard img, .vxn-re-sell__figure img';

/** Split 'AED 250B+' into ['AED ', 250, 'B+'] so only the number animates. */
function parseNumber(text: string) {
  const m = text.trim().match(/^([^\d]*)([\d][\d,]*(?:\.\d+)?)(.*)$/s);
  if (!m) return null;
  const raw = m[2]!;
  const value = Number(raw.replace(/,/g, ''));
  if (!Number.isFinite(value)) return null;
  return { prefix: m[1] ?? '', value, suffix: m[3] ?? '', grouped: raw.includes(',') };
}

export default function Motion() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.querySelector('.vxn-re');
    if (!root) return;

    const cleanups: (() => void)[] = [];
    const timers: number[] = [];

    /* ---------- The hero scroll cue ---------- */

    const markScrolled = () => {
      document.documentElement.dataset.reScrolled = window.scrollY > 40 ? 'true' : 'false';
    };
    markScrolled();
    window.addEventListener('scroll', markScrolled, { passive: true });
    cleanups.push(() => {
      window.removeEventListener('scroll', markScrolled);
      delete document.documentElement.dataset.reScrolled;
    });

    /* ---------- 1. Parallax ----------
       Started first and independently of the reveal layer: it only writes a
       custom property onto elements that are already visible, so it is safe in
       states where revealing would not be. */

    const layers = Array.from(document.querySelectorAll<HTMLElement>(PARALLAX));
    if (layers.length) {
      /* How far a layer may travel is not a free choice. The image is scaled by
         --pz to give it room, and that room is ((pz - 1) / 2) × the frame's
         height on each side — travel beyond it pulls the image off its own frame
         and shows a strip of background. The previous pass used a flat 48px,
         which quietly exceeded the headroom on the shorter frames.

         So the zoom is read from the stylesheet and the travel derived from it,
         at 88% of the maximum so a sub-pixel rounding never reaches the edge.
         Raising --pz raises the movement, and the two cannot fall out of step. */
      const pz = Number.parseFloat(getComputedStyle(root).getPropertyValue('--pz')) || 1.26;
      const room = (pz - 1) / 2;

      let pFrame = 0;
      const drift = () => {
        pFrame = 0;
        const vh = window.innerHeight;
        for (const el of layers) {
          const box = el.parentElement ?? el;
          const r = box.getBoundingClientRect();
          if (r.bottom < -300 || r.top > vh + 300) continue;
          /* -1 above the fold, 0 centred, +1 below: a bounded ramp, so a tall
             hero and a short card both travel their own full range.
             Clamped because the ±300px margin above lets a frame that is still
             off-screen reach past 1, and a fast scroll can paint one of those
             before the next frame corrects it. While actually visible |p| is
             already ≤ 1, so this only ever bites at the edges. */
          const raw = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
          const p = Math.max(-1, Math.min(1, raw));
          el.style.setProperty('--y', `${(p * r.height * room * 0.88).toFixed(1)}px`);
        }
      };
      const onDrift = () => {
        if (!pFrame) pFrame = requestAnimationFrame(drift);
      };
      drift();
      window.addEventListener('scroll', onDrift, { passive: true });
      window.addEventListener('resize', onDrift, { passive: true });
      cleanups.push(() => {
        if (pFrame) cancelAnimationFrame(pFrame);
        window.removeEventListener('scroll', onDrift);
        window.removeEventListener('resize', onDrift);
      });
    }

    /* ---------- 2. Reveal, and un-reveal ---------- */

    let io: IntersectionObserver | null = null;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;

      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const el = e.target as HTMLElement;
            if (e.isIntersecting) el.dataset.anim = 'in';
            else if (e.boundingClientRect.top < 0) el.dataset.anim = 'out';
            else el.dataset.anim = 'pending';
          }
        },
        /* Fire a little before the element reaches the fold, so the motion is
           finishing as it arrives rather than starting. */
        { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
      );

      for (const g of GROUPS) {
        const els = Array.from(root.querySelectorAll<HTMLElement>(g.sel));
        if (!els.length) continue;
        /* Stagger is per-parent, so two grids each start from zero rather than
           the second inheriting the first one's tail. */
        const seen = new Map<Element, number>();
        for (const el of els) {
          if (el.dataset.anim) continue; // an earlier, more specific group won it
          el.dataset.anim = 'pending';
          el.dataset.v = g.variant;
          if (g.stagger && el.parentElement) {
            const i = seen.get(el.parentElement) ?? 0;
            seen.set(el.parentElement, i + 1);
            /* Capped, so a long list never waits a second and a half. */
            el.style.setProperty('--d', `${Math.min(i, 7) * 80}ms`);
          }
          io.observe(el);
        }
      }

      /* The safety net: reveal anything still pending that is ON SCREEN.
         Deliberately not a blanket reveal — that would play the whole page to
         someone who has not scrolled there yet, so content below the fold stays
         for the observer however long they take to reach it. */
      const rescue = () => {
        const vh = window.innerHeight;
        root.querySelectorAll<HTMLElement>('[data-anim="pending"]').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh && r.bottom > 0) el.dataset.anim = 'in';
        });
      };
      timers.push(window.setTimeout(rescue, 2200));

      /* And again on scroll, so a stalled observer can never leave on-screen
         content blank however far down the visitor gets. Throttled on a
         timestamp rather than requestAnimationFrame on purpose: the case this
         guards against is an environment where the rendering pipeline is not
         running, and in one of those rAF does not fire either — which would
         make the guard as dead as the thing it is guarding. It only walks the
         shrinking set of still-pending nodes, so it is cheap. */
      let last = 0;
      const onRescue = () => {
        const now = Date.now();
        if (now - last < 120) return;
        last = now;
        rescue();
      };
      window.addEventListener('scroll', onRescue, { passive: true });
      window.addEventListener('resize', onRescue, { passive: true });
      cleanups.push(() => {
        window.removeEventListener('scroll', onRescue);
        window.removeEventListener('resize', onRescue);
      });
    };

    if (document.hidden) {
      const onVisible = () => {
        if (!document.hidden) {
          document.removeEventListener('visibilitychange', onVisible);
          start();
        }
      };
      document.addEventListener('visibilitychange', onVisible);
      cleanups.push(() => document.removeEventListener('visibilitychange', onVisible));
    } else {
      start();
    }

    /* ---------- 3. Count-up numerals ---------- */

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

          /* The figure as authored. Everything else here is decoration over it,
             and this is what must be on screen whether the decoration runs,
             stalls or never starts — these are counts the practice publishes,
             and a half-counted one is not a smaller number, it is a wrong one. */
          const truth = el.textContent ?? '';
          const settle = () => {
            el.textContent = truth;
            el.dataset.counted = 'true';
          };
          if (document.hidden) {
            settle();
            continue;
          }

          const startAt = performance.now();
          const DUR = 1500;
          const tick = (now: number) => {
            if (el.dataset.counted === 'true') return; // the backstop got there first
            /* Clamped at BOTH ends: a rAF timestamp can precede a
               performance.now() taken just before the frame, and a negative t
               through the ease below flashes a minus figure. */
            const t = Math.min(1, Math.max(0, (now - startAt) / DUR));
            const eased = 1 - Math.pow(1 - t, 4);
            const n = value * eased;
            el.textContent = `${prefix}${grouped ? Math.round(n).toLocaleString('en-US') : n.toFixed(decimals)}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
            else settle();
          };
          requestAnimationFrame(tick);
          /* If the tab is backgrounded mid-count the frame loop stops and the
             element keeps its partial figure forever. Timers still fire in a
             hidden tab, so this puts the authored figure back. */
          timers.push(window.setTimeout(settle, DUR + 400));
        }
      },
      { threshold: 0.5 },
    );
    for (const el of Array.from(root.querySelectorAll<HTMLElement>(COUNTERS))) {
      if (parseNumber(el.textContent ?? '')) countIo.observe(el);
    }

    return () => {
      io?.disconnect();
      countIo.disconnect();
      for (const t of timers) window.clearTimeout(t);
      for (const c of cleanups) c();
    };
  }, []);

  return null;
}
