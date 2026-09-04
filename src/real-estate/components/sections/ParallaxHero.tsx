'use client';

/**
 * The scroll-driven hero.
 *
 * One tall scroll track drives a four-beat sequence, all from a single
 * normalised progress value 0 → 1:
 *
 *   0.00 → 0.30   the title block and offer card sit above a inset video panel
 *   0.15 → 0.55   the panel rises and widens, its corners straightening, until
 *                 it is full-bleed — the "expand to cover the whole frame" beat
 *   0.45 → 0.70   the title block lifts away and fades
 *   0.60 → 1.00   BUY / SELL / RENT rise over the still-playing video, each
 *                 panel entering slightly after the one before it
 *
 * Why it is built this way:
 *
 * - The video element never unmounts and is never re-sourced. It is one
 *   position:fixed layer inside a `contain: paint` track, so expanding it is a
 *   transform and a border-radius, not a layout change. Re-parenting it between
 *   an inset box and a full-bleed one — the obvious approach — restarts
 *   playback in Safari every time.
 * - Progress is read in a rAF loop driven by scroll events rather than from a
 *   scroll handler directly, so we do at most one layout read per frame.
 * - Everything animated is `transform` and `opacity` only. The corner radius is
 *   the one exception and is cheap at this size.
 *
 * Reduced motion: the track collapses to a normal-height section, the video
 * stops, and all four beats render in their finished state. The section is
 * fully readable with no scrolling trickery at all.
 */
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../../lib/types';
import { url } from '../../lib/routes';
import { HERO, PILLARS, PILLARS_NOTE } from '../../data/home';
import { ArrowRight, ArrowUpRight } from '../icons';

/** Map v from [a,b] onto [0,1], clamped. */
function span(v: number, a: number, b: number): number {
  if (b === a) return v >= b ? 1 : 0;
  return Math.min(1, Math.max(0, (v - a) / (b - a)));
}

/** Ease-out cubic — fast start, settled finish. Matches the CSS easing. */
function ease(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function ParallaxHero({ locale }: { locale: Locale }) {
  const track = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  /* Height of the intro block, measured. The video's resting position is
     derived from it rather than from a fixed vh: a hard-coded 46vh happened to
     clear the copy at one window size and buried the lede under the video at
     every other. 0 means "not measured yet" — the CSS fallback applies. */
  const [introH, setIntroH] = useState(0);
  /* Starts true so the server and the first client paint agree; the effect
     turns it off once we know the viewer accepts motion. Getting this wrong is
     a hydration mismatch, not just a visual one. */
  const [still, setStill] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    setStill(false);

    let frame = 0;
    const read = () => {
      frame = 0;
      const el = track.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      /* Distance scrolled into the track, over the track's scrollable length. */
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const next = total <= 0 ? 0 : Math.min(1, Math.max(0, scrolled / total));
      setP(next);
      /* The header inverts to light type only while the expanded video is
         actually behind it. Published on <html> rather than lifted into shared
         state so the header stays independent of this component. */
      document.documentElement.dataset.reOnVideo = next > 0.42 && next < 0.995 ? 'true' : 'false';
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    /* Re-measure whenever the intro reflows — a font swap, a resize, or copy
       wrapping to another line all change how much room the video must leave. */
    const measure = () => {
      const el = intro.current;
      if (el) setIntroH(el.offsetHeight);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro && intro.current) ro.observe(intro.current);
    if (document.fonts && document.fonts.ready) void document.fonts.ready.then(measure);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (ro) ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      delete document.documentElement.dataset.reOnVideo;
    };
  }, []);

  /* ---- The four beats, derived from p ---- */
  const grow = ease(span(p, 0.15, 0.55)); // inset panel → full bleed
  const lift = ease(span(p, 0.45, 0.7)); // title block leaves
  const rise = ease(span(p, 0.6, 1)); // pillars arrive

  /* Inset → full bleed. At grow=0 the panel is inset by the page gutter and
     rounded; at 1 it fills the viewport with square corners. */
  const inset = (1 - grow) * 4.2; // vw on each side
  const radius = (1 - grow) * 20; // px
  /* Where the video sits before it expands: directly below the measured intro,
     with a gap. Falls back to the stylesheet's 46vh until the measurement lands. */
  const restGap = introH ? introH + 28 : 0;
  const scrim = 0.18 + grow * 0.36; // the video darkens as copy lands on it

  const styleVars = {
    '--p': p,
    '--grow': grow,
    '--inset': `${inset}vw`,
    '--radius': `${radius}px`,
    ...(restGap ? { '--top-gap': `${(1 - grow) * restGap}px` } : null),
    '--scrim': scrim,
    '--lift': lift,
    '--rise': rise,
  } as React.CSSProperties;

  return (
    <section
      ref={track}
      className={`re-hx${still ? ' is-still' : ''}`}
      style={styleVars}
      aria-label="Real estate advisory"
    >
      {/* The sticky viewport. Everything below is painted inside it. */}
      <div className="re-hx__stage">
        {/* --- The video layer: mounted once, never re-parented --- */}
        <div className="re-hx__video">
          <video
            src={HERO.video}
            poster={HERO.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <span className="re-hx__scrim" aria-hidden="true" />
        </div>

        {/* --- Beat 1: the title block and the offer card --- */}
        <div className="re-hx__intro" ref={intro}>
          <div className="re-wrap re-hx__introGrid">
            <div>
              <span className="re-hx__eyebrow">{HERO.eyebrow}</span>
              <h1 className="re-h1 re-hx__title">
                <span>{HERO.title}</span>
                <span>{HERO.titleAccent}</span>
              </h1>
              <p className="re-lede">{HERO.lede}</p>
            </div>

            <div className="re-offer">
              <p className="re-offer__stat">{HERO.card.stat}</p>
              <h2 className="re-h3 re-offer__title">{HERO.card.title}</h2>
              <p className="re-offer__body">{HERO.card.body}</p>
              <a className="re-btn" href={url(locale, HERO.card.href)}>
                {HERO.card.cta}
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>

        {/* --- Beat 4: BUY / SELL / RENT over the expanded video --- */}
        <div className="re-hx__pillars" aria-hidden={p < 0.55 ? true : undefined}>
          <div className="re-wrap">
            <div className="re-hx__pillarGrid">
              {PILLARS.map((pil, i) => (
                <a
                  className="re-hxp"
                  href={url(locale, pil.href)}
                  key={pil.key}
                  /* Each panel trails the one before it by a tenth of the beat. */
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span className="re-hxp__row">
                    <span className="re-hxp__label">{pil.label}</span>
                    <span className="re-hxp__go" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </span>
                  <span className="re-hxp__body">{pil.body}</span>
                </a>
              ))}
            </div>
            <p className="re-hx__note">{PILLARS_NOTE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
