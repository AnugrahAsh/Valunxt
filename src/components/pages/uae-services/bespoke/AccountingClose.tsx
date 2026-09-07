/**
 * "Here are the five days." — the second of Accounting & Tax's two own
 * sections, and the one dark band on the page.
 *
 * Every firm says "management accounts by day five". This is the five days, so
 * the claim is checkable rather than asserted — five rules, five pairs of
 * words. What happens, and what exists at the end of it that did not before.
 *
 * THE PASS BEFORE THIS gave each day a glass card and a three-line paragraph:
 * five paragraphs to make a point that is really five words long. The argument
 * is stronger short — a list you can take in at a glance reads as a process
 * someone actually runs, and a wall of prose reads as a wall of prose.
 *
 * The ground is the drift shader from the home page's intent tabs, recoloured
 * to the deep end of the brand ramp.
 */
import ShaderField from '@/components/sections/backgrounds/ShaderField';
import { DRIFT_FRAGMENT } from '@/components/sections/backgrounds/shaders';

const DAYS: [string, string][] = [
  ['Ledgers closed', 'Reconciled to the last line'],
  ['Accruals and cut-off', 'Documented, not assumed'],
  ['VAT position', 'Agreed to the ledger'],
  ['Partner review', 'Read, not checklisted'],
  ['Management accounts', 'In your hands'],
];

export default function AccountingClose() {
  return (
    <section className="vxb vxb-close vxh-dark" aria-labelledby="vxb-close-h">
      <div className="vxb-close__bg" aria-hidden="true">
        <ShaderField
          className="vxb-close__gl"
          fragment={DRIFT_FRAGMENT}
          /* deep navy → cobalt → the bright end → a whisper of ice */
          colors={['#04102F', '#0B2DBE', '#2F63FF', '#9DB4FF']}
          intensity={0.8}
        />
      </div>

      <div className="vxh__in">
        <h2 className="vxh-h2 vxb-close__h" id="vxb-close-h">
          Management accounts by day five.{' '}
          <span className="vxh-grad">Here are the five days.</span>
        </h2>

        <ol className="vxb-close__days">
          {DAYS.map(([what, out], i) => (
            <li data-vxn-in="up" key={what}>
              <span className="vxb-close__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="vxb-close__t">{what}</span>
              <span className="vxb-close__o">{out}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
