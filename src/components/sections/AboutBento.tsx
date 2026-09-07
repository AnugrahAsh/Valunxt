/**
 * About Us — the bento.
 *
 * Replaces the expanding rail of four photo cards, which hid three quarters of
 * what it said behind an interaction.
 *
 * Twelve columns, three rows:
 *   lead 7 | threads 5          who we are, beside the first abstract
 *   01 3 | 02 3 | 03 3 | 04 3   the principles, one line each
 *   lightfall 8 | figures 4     the big abstract, beside the figures
 *
 * The two abstract cards carry nothing but their abstract — no heading, no
 * copy, no overlay. They are the section's artwork, and anything set over them
 * would need a scrim, which is what made the previous pass read as a gradient
 * wash rather than as a drawing.
 *
 * Both shaders' props are module constants, so the components mount once and
 * are never torn down and rebuilt by a re-render.
 */
import { rurl, vxnRegionData, vxnServices } from '@/lib/region';
import { vxnMarkets, vxnOffices } from '@/lib/site-data';
import { Ico } from '@/components/vxh/kit';
import WebThreads from './backgrounds/WebThreads';
import Lightfall from './backgrounds/Lightfall';

/** The four principles — one line each, and nothing to expand. */
const PRINCIPLES: { n: string; t: string; d: string }[] = [
  { n: '01', t: 'Integrity', d: 'Fixed fees in writing. No inventory, no commissions, no conflicts.' },
  { n: '02', t: 'Client Focus', d: 'A named partner on every engagement, from the first call onward.' },
  { n: '03', t: 'Evidence-Led', d: 'Verified data and a documented method behind every number we sign.' },
  { n: '04', t: 'Risk Resilience', d: 'Deadlines tracked against your financial year, not chased in the week they fall.' },
];

/**
 * The first abstract: a fan of threads on white, bending toward the pointer.
 * The pink and violet the component ships with are replaced by the brand's
 * cobalt and pale blue.
 */
const THREADS = {
  color1: '#1436D8',
  color2: '#6E8EF5',
  color3: '#FFFFFF',
  backgroundColor: '#FBFAF7',
  speed: 0.2,
  threadCount: 6,
  frequency: 5,
  spread: 0.2,
  taper: 1,
  position: 0.5,
  glow: 0.02,
  falloff: 0.6,
  thickness: 1.1,
  brightness: 0.6,
  opacity: 1,
  grainIntensity: 0.04,
  mouseStrength: 0.35,
} as const;

/**
 * The second: light falling through a deep cobalt field. The one dark surface
 * in the section, and the only place black-blue appears on this page.
 */
const LIGHTFALL_COLORS = ['#C9D6FF', '#6E8EF5', '#2F63FF'];

export default function AboutBento({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const practices = vxnServices(region).length;
  const offices = Object.keys(vxnOffices()).length;

  const figures: { v: string; l: string; sup?: string }[] = [
    { v: String(practices), l: 'Connected practices' },
    { v: String(offices), l: `Offices — ${vxnMarkets('cities')}` },
    { v: '2', l: `Core markets, ${vxnMarkets('short')}` },
    { v: '1', sup: 'day', l: 'To a reply from your partner' },
  ];

  return (
    <section className="vxa" aria-labelledby="vxa-h">
      <div className="vxh__in">
        <div className="vxa__grid">
          {/* ---- the lead ---- */}
          <div className="vxa-tile vxa-tile--lead">
            <span className="vxh-eyebrow">Who We Are</span>
            <h2 className="vxa__title" id="vxa-h">
              About Us
            </h2>
            <p className="vxa__lede">
              A senior team of accountants, tax advisers and valuers in {reg.cities} &#8212; part of
              Reliant Surveyors, with RICS-regulated valuation under the same roof. For founders,
              family businesses, developers and private owners across the UAE.
            </p>
            <a className="vxa__link" href={rurl(region, '/about/')}>
              About VALUNXT <Ico name="arrow" size={16} />
            </a>
          </div>

          {/* ---- the first abstract: nothing but the artwork ---- */}
          <div className="vxa-tile vxa-tile--art vxa-tile--threads">
            <WebThreads
              className="vxa-art__gl"
              lightMode
              mirror
              grain
              shimmer={false}
              fanMode="center"
              mouseInteraction
              {...THREADS}
            />
          </div>

          {/* ---- the four principles ---- */}
          {PRINCIPLES.map((p) => (
            <div className="vxa-tile vxa-tile--p" key={p.t}>
              <span className="vxa-p__n">{p.n}</span>
              <h3 className="vxa-p__t">{p.t}</h3>
              <p className="vxa-p__d">{p.d}</p>
            </div>
          ))}

          {/* ---- the big abstract: nothing but the artwork ---- */}
          <div className="vxa-tile vxa-tile--art vxa-tile--fall">
            <Lightfall
              className="vxa-art__gl"
              colors={LIGHTFALL_COLORS}
              backgroundColor="#0B2DBE"
              speed={0.45}
              streakCount={3}
              streakWidth={1}
              streakLength={1}
              glow={1}
              density={0.6}
              twinkle={1}
              zoom={3}
              backgroundGlow={0.45}
              opacity={1}
              mouseInteraction
              mouseStrength={0.5}
              mouseRadius={1}
            />
          </div>

          {/* ---- the figures ---- */}
          <div className="vxa-tile vxa-tile--figures">
            <ul className="vxa-figs">
              {figures.map((f) => (
                <li key={f.l}>
                  <b>
                    <span data-vxh-count={f.v}>0</span>
                    {f.sup ? <sup>{f.sup}</sup> : null}
                  </b>
                  <span>{f.l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
