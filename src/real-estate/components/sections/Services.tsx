/**
 * Services — the four advisory lines as a card row.
 *
 * Cards are equal-height by flex rather than a fixed min-height, so a line of
 * copy can grow in translation without the row breaking. The CTA is pinned to
 * the foot with `margin-top: auto` for the same reason.
 */
import type { Locale } from '../../lib/types';
import { url } from '../../lib/routes';
import { SERVICES, SERVICES_HEAD } from '../../data/home';
import { ArrowUpRight } from '../icons';

export default function Services({ locale }: { locale: Locale }) {
  return (
    <section className="re-section re-section--cream" id="services">
      <div className="re-wrap">
        <div className="re-sec-head">
          <span className="re-eyebrow">{SERVICES_HEAD.eyebrow}</span>
          <h2 className="re-h2">{SERVICES_HEAD.title}</h2>
          <p className="re-lede">{SERVICES_HEAD.lede}</p>
        </div>

        <div className="re-grid-4">
          {SERVICES.map((s) => (
            <a className="re-svc" href={url(locale, s.href ?? '/')} key={s.title}>
              {s.img ? (
                <div className="re-svc__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt="" loading="lazy" />
                </div>
              ) : null}
              <div className="re-svc__body">
                <h3 className="re-h3 re-svc__title">{s.title}</h3>
                <p className="re-svc__summary">{s.summary}</p>
                <ul className="re-svc__list">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <span className="re-svc__cta">
                  {s.cta}
                  <ArrowUpRight />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
