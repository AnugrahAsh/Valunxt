/**
 * Our Process — photograph with a frosted CTA card on the left, the numbered
 * accordion on a dark panel on the right.
 *
 * The steps are an accordion rather than four open blocks because the section
 * is a scan target: the titles carry the shape of the journey and the detail is
 * there when someone wants it. Step 01 is open on first paint so the pattern is
 * obvious without a click.
 */
import type { Locale } from '../../lib/types';
import { url } from '../../lib/routes';
import { PROCESS, PROCESS_HEAD } from '../../data/home';
import Accordion from '../Accordion';
import { ArrowRight } from '../icons';

export default function Process({ locale }: { locale: Locale }) {
  return (
    <section className="re-proc" id="process">
      <div className="re-wrap">
        <div className="re-proc__grid">
          <figure className="re-proc__figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROCESS_HEAD.img} alt="Waterfront residential tower in Dubai" loading="lazy" />
            <figcaption className="re-proc__card">
              <h3 className="re-h3">{PROCESS_HEAD.cardTitle}</h3>
              <a className="re-btn" href={url(locale, PROCESS_HEAD.cardHref)}>
                {PROCESS_HEAD.cardCta}
                <ArrowRight />
              </a>
            </figcaption>
          </figure>

          <div className="re-proc__panel">
            <span className="re-eyebrow re-eyebrow--ghost">{PROCESS_HEAD.eyebrow}</span>
            <h2 className="re-h2" style={{ marginTop: 16 }}>{PROCESS_HEAD.title}</h2>
            <p className="re-lede">{PROCESS_HEAD.lede}</p>
            <Accordion variant="steps" items={PROCESS} initial={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
