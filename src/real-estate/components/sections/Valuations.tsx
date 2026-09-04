/**
 * Valuations & Advisory — photograph with the AED figure badge on the left,
 * the four capability notes and the CTA on the right.
 *
 * The badge states an aggregate value of assets valued. It is presented as the
 * site presents it; if that figure needs a basis line the way the parent brand
 * qualifies its own numbers, add it to VALUATIONS.stat in data/home.ts and it
 * will render here without a markup change.
 */
import type { Locale } from '../../lib/types';
import { url } from '../../lib/routes';
import { VALUATIONS } from '../../data/home';
import { ArrowRight } from '../icons';

export default function Valuations({ locale }: { locale: Locale }) {
  return (
    <section className="re-section" id="valuations">
      <div className="re-wrap re-val__grid">
        <figure className="re-val__figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={VALUATIONS.img} alt="Valuation team reviewing a property portfolio" loading="lazy" />
          <figcaption className="re-val__badge">
            <b>{VALUATIONS.stat.value}</b>
            <span>{VALUATIONS.stat.label}</span>
          </figcaption>
        </figure>

        <div>
          <span className="re-eyebrow">{VALUATIONS.eyebrow}</span>
          <h2 className="re-h2" style={{ margin: '16px 0 14px' }}>{VALUATIONS.title}</h2>
          <p className="re-lede">{VALUATIONS.body}</p>

          <div className="re-val__items">
            {VALUATIONS.items.map((i) => (
              <div className="re-val__item" key={i.title}>
                <h4>{i.title}</h4>
                <p>{i.body}</p>
              </div>
            ))}
          </div>

          <a className="re-btn" href={url(locale, VALUATIONS.href)}>
            {VALUATIONS.cta}
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
