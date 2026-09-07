/**
 * Valuation & Advisory's two own sections.
 *
 * A — "What is in the report." A valuation is a document, so the section is
 * drawn as one: a signed sheet with its contents ruled down it and the
 * signature block at the foot. Nothing else on the page looks like a document.
 *
 * B — "Who accepts it." Four words the size of a headline. A valuation is worth
 * exactly what the people who read it will act on, and naming them in type this
 * large is the argument.
 *
 * Both are server components: nothing here needs state.
 */
import { Ico } from '@/components/vxh/kit';
import ShaderField from '@/components/sections/backgrounds/ShaderField';
import { LATTICE_FRAGMENT } from '@/components/sections/backgrounds/shaders';

const CONTENTS: [string, string][] = [
  ['Basis of value', 'Market value, and the assumptions it rests on'],
  ['Method', 'Comparable, income or cost — and why that one'],
  ['Evidence', 'The transactions relied on, dated and sourced'],
  ['Inspection', 'What was seen, when, and by whom'],
  ['Limitations', 'What the figure does not cover'],
];

export function ValuationReport() {
  return (
    <section className="vxb vxb-report" id="vxd-tool" aria-labelledby="vxb-report-h">
      <div className="vxh__in">
        <h2 className="vxh-h2 vxb-report__h" id="vxb-report-h">
          A number is not a valuation.{' '}
          <span className="vxh-em">This is what one contains.</span>
        </h2>

        <div className="vxb-report__sheet" data-vxn-in="up">
          <dl>
            {CONTENTS.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
          <div className="vxb-report__sign">
            <span className="vxb-report__sig" aria-hidden="true">
              <svg viewBox="0 0 120 34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M2 26c8-14 13-20 16-18s-3 18 1 20 9-14 13-16 3 10 7 10 7-8 12-13 9-6 12-2 4 12 9 12 12-6 16-11" />
              </svg>
            </span>
            <span className="vxb-report__by">
              <b>Signed MRICS</b>
              Through group firm Reliant Surveyors, to the RICS Red Book
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const READERS = ['Banks', 'Auditors', 'Courts', 'Boards'];

export function ValuationAccepted() {
  return (
    <section className="vxb vxb-acc vxh-dark" aria-labelledby="vxb-acc-h">
      <div className="vxb-acc__bg" aria-hidden="true">
        <ShaderField
          className="vxb-acc__gl"
          fragment={LATTICE_FRAGMENT}
          colors={['#04102F', '#0B2DBE', '#2F63FF', '#9DB4FF']}
          intensity={0.75}
        />
      </div>
      <div className="vxh__in">
        <h2 className="vxh-h2 vxb-acc__h" id="vxb-acc-h">
          A valuation is worth what the people who read it will act on.
        </h2>
        <ul className="vxb-acc__who">
          {READERS.map((r) => (
            <li data-vxn-in="up" key={r}>
              <Ico name="check" size={14} /> {r}
            </li>
          ))}
        </ul>
        <p className="vxb-acc__f">All four accept ours.</p>
      </div>
    </section>
  );
}
