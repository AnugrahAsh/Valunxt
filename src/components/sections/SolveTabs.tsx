'use client';

/**
 * "Find the right solution" — start from what you need to do.
 *
 * Stripped to the question and the three answers. There is no card: the
 * animated ground runs edge to edge across the whole section and the copy sits
 * directly on it. The tabs are text with a rule under the active one, the three
 * routes are hairline-separated rows, and that is the section — no panel, no
 * photograph, no call-to-action block repeated from the two that already close
 * the page.
 *
 * Each tab brings its own ground, and they are three different abstracts rather
 * than one recoloured three times: vertical light shafts, flowing diagonal
 * ribbons, a pointer-rippled lattice. Switching tab cross-fades between them.
 *
 * COST. A tab's ground is only created the first time that tab is opened, and
 * every inactive one is paused — its last frame stays on the canvas so the
 * cross-fade has something to fade from, but it renders nothing. A visitor who
 * never leaves the first tab pays for one context.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import { rurl } from '@/lib/region';
import { Ico } from '@/components/vxh/kit';
import Html from '@/components/Html';
import GradientBlinds from './backgrounds/GradientBlinds';
import ShaderField from './backgrounds/ShaderField';
import { DRIFT_FRAGMENT, LATTICE_FRAGMENT } from './backgrounds/shaders';

export interface SolveIntent {
  /** The tab label. */
  tab: string;
  /** One line saying what this is, under the tabs. */
  lede: string;
  items: { t: string; d: string; h: string }[];
}

/**
 * One ground per tab. The palette is the brand's throughout — a white base,
 * cobalt, a pale blue and a very light violet, with near-black used only as the
 * lattice's ink under the pointer.
 */
function Background({ index, active }: { index: number; active: boolean }) {
  if (index === 0) {
    return (
      <GradientBlinds
        className="vxs-bg__gl"
        paused={!active}
        gradientColors={['#EEF1FF', '#8FA9FF', '#1436D8']}
        angle={12}
        noise={0.12}
        blindCount={16}
        blindMinWidth={72}
        spotlightRadius={0.7}
        spotlightSoftness={1.15}
        spotlightOpacity={0.9}
        mouseDampening={0.2}
        distortAmount={0}
        shineDirection="left"
        lightMode
      />
    );
  }
  if (index === 1) {
    return (
      <ShaderField
        className="vxs-bg__gl"
        paused={!active}
        fragment={DRIFT_FRAGMENT}
        /* white → very light violet → pale blue → cobalt */
        colors={['#FFFFFF', '#DDD6FF', '#AFC0FF', '#1F49E8']}
        intensity={1.05}
      />
    );
  }
  return (
    <ShaderField
      className="vxs-bg__gl"
      paused={!active}
      fragment={LATTICE_FRAGMENT}
      /* white → pale rule → cobalt dots → near-black under the pointer */
      colors={['#FFFFFF', '#E2E8FF', '#1436D8', '#0B1440']}
      intensity={0.85}
    />
  );
}

export default function SolveTabs({
  intents,
  region,
}: {
  intents: SolveIntent[];
  region: string;
}) {
  const [active, setActive] = useState(0);
  /* Which tabs have ever been opened — a ground is built on first use and kept,
     so switching back is instant and an unvisited tab costs nothing. */
  const [seen, setSeen] = useState<number[]>([0]);
  const [ready, setReady] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Nothing WebGL starts until the section is near the viewport. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = useCallback((i: number) => {
    setActive(i);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  }, []);

  /* Roving focus, as the tablist pattern expects. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = intents.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const current = intents[active];

  return (
    <section className="vxs" aria-labelledby="vxs-h" ref={sectionRef} data-tab={active}>
      {/* The grounds run the width of the section, behind everything. */}
      <div className="vxs-bg" aria-hidden="true">
        {ready
          ? seen.map((i) => (
              <div key={i} className={`vxs-bg__layer${i === active ? ' is-on' : ''}`}>
                <Background index={i} active={i === active} />
              </div>
            ))
          : null}
      </div>

      <div className="vxh__in vxs__in">
        <span className="vxh-eyebrow">Find the Right Solution</span>
        <h2 className="vxh-h2" id="vxs-h">
          Start from what you need to do.
        </h2>

        <div className="vxs__tabs" role="tablist" aria-label="What do you need to do?">
          {intents.map((t, i) => (
            <button
              key={t.tab}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              className="vxs__tab"
              role="tab"
              id={`vxs-tab-${i}`}
              aria-controls={`vxs-pane-${i}`}
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              type="button"
              onClick={() => select(i)}
              onKeyDown={onKeyDown}
            >
              <Html as="span" html={t.tab} />
            </button>
          ))}
        </div>

        <div
          className="vxs__pane"
          role="tabpanel"
          id={`vxs-pane-${active}`}
          aria-labelledby={`vxs-tab-${active}`}
          /* Keyed on the tab so the copy re-enters rather than swapping. */
          key={active}
        >
          <Html as="p" className="vxs-lede" html={current.lede} />

          <ul className="vxs-list">
            {current.items.map((it, n) => (
              <li key={it.t} style={{ '--i': n } as React.CSSProperties}>
                <a className="vxs-item" href={rurl(region, it.h)}>
                  <span className="vxs-item__n">{String(n + 1).padStart(2, '0')}</span>
                  <span className="vxs-item__b">
                    <Html as="span" className="vxs-item__t" html={it.t} />
                    <Html as="span" className="vxs-item__d" html={it.d} />
                  </span>
                  <Ico name="arrow" size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
