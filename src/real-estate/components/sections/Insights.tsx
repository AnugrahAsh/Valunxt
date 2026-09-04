/**
 * Insights — two cards flanking a photograph: market reports on one side, the
 * property search on the other. The image drops below both once the row is too
 * narrow to hold three columns.
 */
import type { Locale } from '../../lib/types';
import { url } from '../../lib/routes';
import { INSIGHTS } from '../../data/home';
import { ArrowRight } from '../icons';

export default function Insights({ locale }: { locale: Locale }) {
  return (
    <section className="re-section re-section--cream">
      <div className="re-wrap re-ins">
        <div className="re-ins__card">
          <span className="re-eyebrow">{INSIGHTS.left.eyebrow}</span>
          <h3 className="re-h3">{INSIGHTS.left.title}</h3>
          <p>{INSIGHTS.left.body}</p>
          <a className="re-btn" href={url(locale, INSIGHTS.left.href)}>
            {INSIGHTS.left.cta}
            <ArrowRight />
          </a>
        </div>

        <figure className="re-ins__figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={INSIGHTS.img} alt="Reviewing market research" loading="lazy" />
        </figure>

        <div className="re-ins__card re-ins__card--brand">
          <span className="re-eyebrow re-eyebrow--ghost">{INSIGHTS.right.eyebrow}</span>
          <h3 className="re-h3">{INSIGHTS.right.title}</h3>
          <p>{INSIGHTS.right.body}</p>
          <a className="re-btn re-btn--light" href={url(locale, INSIGHTS.right.href)}>
            {INSIGHTS.right.cta}
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
