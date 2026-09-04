/**
 * About — the statement, a photograph carrying a frosted panel, and the two
 * figure cards ("48+ Years" and "Our Mission") stacked beside it.
 *
 * The long heading is the site's own positioning sentence and is kept whole:
 * it is the one place the proposition is stated in full, and splitting it for
 * layout would cost more than the layout gains.
 */
import type { Locale } from '../../lib/types';
import { url } from '../../lib/routes';
import { ABOUT } from '../../data/home';
import { ArrowRight } from '../icons';

export default function About({ locale }: { locale: Locale }) {
  return (
    <section className="re-section" id="about">
      <div className="re-wrap">
        <div className="re-about__head">
          <span className="re-eyebrow">{ABOUT.eyebrow}</span>
          <h2 className="re-h2">{ABOUT.title}</h2>
        </div>

        <div className="re-about__grid">
          <figure className="re-about__figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ABOUT.img} alt="Luxury residence overlooking the Dubai coastline" loading="lazy" />
            <figcaption className="re-about__panel">
              <p>{ABOUT.body}</p>
              <a className="re-btn" href={url(locale, ABOUT.href)}>
                {ABOUT.cta}
                <ArrowRight />
              </a>
            </figcaption>
          </figure>

          <div className="re-about__side">
            <div className="re-about__card">
              <p className="re-about__stat">{ABOUT.stat.value}</p>
              <p className="re-about__label">{ABOUT.stat.label}</p>
              <p className="re-about__detail">{ABOUT.stat.detail}</p>
            </div>
            <div className="re-about__card re-about__card--brand">
              <p className="re-about__label">{ABOUT.mission.label}</p>
              <p className="re-about__detail">{ABOUT.mission.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
