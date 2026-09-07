/**
 * Technology, Data & AI's two own sections.
 *
 * A — "From data to decision." The pipeline as a pipeline: four stages on one
 * rule, each with what leaves it. A technology practice should be able to draw
 * its own architecture in one line, and this is the line.
 *
 * B — "No black boxes." The refusals, on a live ground. Every AI page promises
 * insight; the useful thing to say is what the model will never be allowed to
 * do, because that is what a board actually needs before it signs.
 */
import ShaderField from '@/components/sections/backgrounds/ShaderField';
import { DRIFT_FRAGMENT } from '@/components/sections/backgrounds/shaders';

const PIPE: [string, string][] = [
  ['Ingest', 'Registry, market and your own systems'],
  ['Reconcile', 'One definition per field, agreed with you'],
  ['Model', 'Documented, versioned, and re-runnable'],
  ['Decide', 'A number a person can defend in a meeting'],
];

export function TechPipeline() {
  return (
    <section className="vxb vxb-pipe" id="vxd-tool" aria-labelledby="vxb-pipe-h">
      <div className="vxh__in">
        <h2 className="vxh-h2 vxb-pipe__h" id="vxb-pipe-h">
          Data is not a decision.{' '}
          <span className="vxh-em">Four steps stand between them.</span>
        </h2>
        <ol className="vxb-pipe__flow">
          {PIPE.map(([t, d], i) => (
            <li data-vxn-in="up" key={t}>
              <span className="vxb-pipe__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="vxb-pipe__t">{t}</span>
              <span className="vxb-pipe__d">{d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const RULES: [string, string][] = [
  ['No black boxes', 'If we cannot explain how it got there, it does not ship'],
  ['No model without a version', 'Every output names the model that produced it'],
  ['No training on your data', 'Yours stays yours, and stays where you put it'],
  ['No answer without a source', 'Every figure carries the record it came from'],
];

export function TechRules() {
  return (
    <section className="vxb vxb-rules vxh-dark" aria-labelledby="vxb-rules-h">
      <div className="vxb-rules__bg" aria-hidden="true">
        <ShaderField
          className="vxb-rules__gl"
          fragment={DRIFT_FRAGMENT}
          colors={['#04102F', '#0B2DBE', '#2F63FF', '#9DB4FF']}
          intensity={0.8}
        />
      </div>
      <div className="vxh__in">
        <h2 className="vxh-h2 vxb-rules__h" id="vxb-rules-h">
          What the model is <span className="vxh-grad">never allowed to do.</span>
        </h2>
        <ol className="vxb-rules__list">
          {RULES.map(([t, d]) => (
            <li data-vxn-in="up" key={t}>
              <span className="vxb-rules__t">{t}</span>
              <span className="vxb-rules__d">{d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
