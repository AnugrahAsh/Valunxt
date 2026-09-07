/**
 * The template behind all eight service pages.
 *
 * They are the same page with different content, so they are one component
 * driven by a `ServicePage` record from data/pages.ts. A ninth page costs a data
 * entry and a slug in SERVICE_SLUGS — no new component, no new CSS, no new route.
 *
 * It reuses the pillar page's sections wherever the content is the same thing
 * said once: the gallery, the reviews, the FAQs, the partners and the enquiry
 * band are the section's, not the landing page's, so every entry point carries
 * the same proof rather than the front page hoarding it.
 *
 * Shape: a hero carrying the page's own title over its own photograph → the
 * highlights strip → what's included → the numbered process on the navy panel →
 * the gallery → the ask → proof.
 */
import { rurl } from '@/lib/region';

import type { Locale, ServicePage } from '../lib/types';
import Accordion from './Accordion';
import { ArrowRight, ArrowUpRight } from './icons';
import { Communities, Contact, Faqs, Gallery, Partners, Reviews } from './sections';

export default function ServicePageBody({
  region,
  page,
  formAction,
}: {
  region: Locale;
  page: ServicePage;
  formAction?: string;
}) {
  return (
    <>
      {/* The hero, in the same clothes as the pillar page's but shorter — a
          service page's job is to get to the substance, not to hold the screen. */}
      <section className="vxn-re-hero" style={{ minHeight: 'clamp(460px, 74vh, 720px)' }}>
        <div className="vxn-re-hero__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={page.heroImg} alt="" />
        </div>
        <span className="vxn-re-hero__scrim" aria-hidden="true" />

        <div className="vxn-re-hero__inner">
          <div className="vxn-re-hero__grid">
            <div>
              <span className="vxn-re__eyebrow vxn-re__eyebrow--inv">{page.eyebrow}</span>
              <h1 className="vxn-re__h1 vxn-re-hero__title">
                {page.title}
                <em>{page.titleAccent}</em>
              </h1>
              <p className="vxn-re__lede vxn-re-hero__lede">{page.lede}</p>
              <div className="vxn-re-hero__cta">
                <a className="vxn-re__btn vxn-re__btn--solid" href="#contact">
                  {page.ctaTitle.length > 40 ? 'Speak to an Advisor' : page.ctaTitle}
                  <ArrowRight />
                </a>
                <a className="vxn-re__btn vxn-re__btn--ghost" href={rurl(region, '/real-estate/#gallery')}>
                  View the portfolio
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="vxn-re__sec vxn-re__sec--tight">
        <div className="vxn-re__wrap">
          <div className="vxn-re-val__items" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 0 }}>
            {page.highlights.map((h) => (
              <div className="vxn-re-val__item" key={h.label}>
                <span className="vxn-re-about__value">{h.value}</span>
                <h4 style={{ marginTop: 10 }}>{h.label}</h4>
                {h.detail ? <p>{h.detail}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="vxn-re__sec vxn-re__sec--cream">
        <div className="vxn-re__wrap">
          <div className="vxn-re__head">
            <span className="vxn-re__eyebrow">What’s included</span>
            <h2 className="vxn-re__h2">{page.offerTitle}</h2>
            <p className="vxn-re__lede">{page.offerLede}</p>
          </div>

          <div className="vxn-re-svcs">
            {page.offer.map((o) => (
              <div className="vxn-re-svc" key={o.title}>
                <div className="vxn-re-svc__body" style={{ paddingTop: 30 }}>
                  <span className="vxn-re-svc__title">{o.title}</span>
                  <span className="vxn-re-svc__summary">{o.summary}</span>
                  <ul className="vxn-re-svc__list">
                    {o.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="vxn-re__sec" id="process">
        <div className="vxn-re__wrap">
          <div className="vxn-re-proc">
            <figure className="vxn-re-proc__figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.heroImg} alt="" loading="lazy" />
            </figure>
            <div className="vxn-re-proc__panel">
              <span className="vxn-re__eyebrow vxn-re__eyebrow--inv">Process</span>
              <h2 className="vxn-re__h2 vxn-re__h2--inv">{page.stepsTitle}</h2>
              <Accordion variant="steps" items={page.steps} initial={0} />
            </div>
          </div>
        </div>
      </section>

      <Communities region={region} />
      <Gallery />
      <Contact formAction={formAction} />
      <Reviews />
      <Faqs
        region={region}
        items={page.faqs}
        title={`${page.eyebrow} — Common Questions`}
        lede="The questions we are asked most often at this stage, answered plainly."
      />
      <Partners />
    </>
  );
}
