/**
 * The template behind all three L2 pages.
 *
 * buy-property, sell-rent-lease-property and off-plan-properties are the same
 * page with different content, so they are one component driven by a
 * `ServicePage` record from data/pages.ts. A fourth service page costs a data
 * entry and a route file — no new component, no new CSS.
 *
 * Shape: dark hero with three highlight tiles → "what's included" grid → the
 * numbered steps → page-specific FAQs → CTA. The reviews and partner bands are
 * reused from the pillar page so every entry point carries the same proof.
 */
import type { Locale, ServicePage } from '../lib/types';
import { url } from '../lib/routes';
import Accordion from './Accordion';
import Faqs from './sections/Faqs';
import Reviews from './sections/Reviews';
import Partners from './sections/Partners';
import Contact from './sections/Contact';
import { ArrowRight } from './icons';
import { Costs, Listings, PaymentPlans, PriceTable } from './sections/MarketDetail';
import {
  BUY_COSTS,
  BUY_LISTINGS,
  OFFPLAN_LISTINGS,
  PAYMENT_PLANS,
  RENT_LISTINGS,
  RENT_PRICES,
  SALE_PRICES,
  SELL_COSTS,
} from '../data/market';

/**
 * Which detail blocks each page carries. Buying wants stock, prices and the
 * cost of transacting; letting wants rental stock, rent bands and the seller's
 * costs; off-plan wants launches and payment plans. Keyed by slug so a new
 * page opts in by adding a row, not by editing the template below.
 */
const DETAIL: Record<string, React.ReactNode> = {
  'buy-property': (
    <>
      <Listings
        title="Properties on the Market Now"
        lede="A sample of current stock across Dubai's freehold communities — residential and commercial."
        items={BUY_LISTINGS}
      />
      <PriceTable
        title="What Property Costs, by Community"
        lede="Indicative sale prices per square foot and the gross yields those prices imply."
        rows={SALE_PRICES}
        columns={['Apartments', 'Villas & townhouses', 'Gross yield']}
      />
      <Costs
        title="The Full Cost of a Purchase"
        lede="Everything payable beyond the price itself, set out before you make an offer rather than after."
        rows={BUY_COSTS}
      />
    </>
  ),
  'sell-rent-lease-property': (
    <>
      <Listings
        title="Rentals Available Now"
        lede="A sample of current rental stock — apartments, family homes and commercial units."
        items={RENT_LISTINGS}
      />
      <PriceTable
        title="What Rents Achieve, by Community"
        lede="Indicative annual rents and the cheque structures landlords in each community typically accept."
        rows={RENT_PRICES}
        columns={['Apartments', 'Villas & townhouses', 'Payment terms']}
      />
      <Costs
        title="What Selling Costs You"
        lede="The deductions between the achieved price and what reaches your account."
        rows={SELL_COSTS}
      />
    </>
  ),
  'off-plan-properties': (
    <>
      <Listings
        title="Launches Worth Considering"
        lede="Registered projects with escrow in place, current payment plans and expected handover."
        items={OFFPLAN_LISTINGS}
      />
      <PaymentPlans items={PAYMENT_PLANS} />
    </>
  ),
};

export default function ServicePageBody({
  locale,
  page,
  formAction,
}: {
  locale: Locale;
  page: ServicePage;
  formAction?: string;
}) {
  return (
    <>
      <section className="re-phero">
        <div className="re-phero__bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={page.heroImg} alt="" />
        </div>
        <div className="re-wrap re-phero__inner">
          <span className="re-eyebrow re-eyebrow--ghost">{page.eyebrow}</span>
          <h1 className="re-h1">
            <span>{page.title}</span>
            <span>{page.titleAccent}</span>
          </h1>
          <p className="re-lede">{page.lede}</p>

          <div className="re-phigh">
            {page.highlights.map((h) => (
              <div className="re-phigh__item" key={h.label}>
                <p className="re-phigh__value">{h.value}</p>
                <p className="re-phigh__label">{h.label}</p>
                {h.detail ? <p className="re-phigh__detail">{h.detail}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="re-section">
        <div className="re-wrap">
          <div className="re-sec-head">
            <h2 className="re-h2">{page.offerTitle}</h2>
            <p className="re-lede">{page.offerLede}</p>
          </div>

          <div className="re-grid-3">
            {page.offer.map((o) => (
              <div className="re-offer-card" key={o.title}>
                <h3 className="re-h3">{o.title}</h3>
                <p>{o.summary}</p>
                <ul className="re-svc__list">
                  {o.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="re-proc">
        <div className="re-wrap">
          <div className="re-proc__grid">
            <figure className="re-proc__figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.heroImg} alt="" loading="lazy" />
            </figure>
            <div className="re-proc__panel">
              <span className="re-eyebrow re-eyebrow--ghost">Process</span>
              <h2 className="re-h2" style={{ margin: '16px 0 22px' }}>
                {page.stepsTitle}
              </h2>
              <Accordion variant="steps" items={page.steps} initial={0} />
            </div>
          </div>
        </div>
      </section>

      {/* Page-specific detail: stock, prices, plans and costs. */}
      {DETAIL[page.slug] ?? null}

      <Faqs
        locale={locale}
        items={page.faqs}
        title={`${page.eyebrow} — Common Questions`}
        lede="The questions we are asked most often at this stage, answered plainly."
      />

      <section className="re-section re-section--tight">
        <div className="re-wrap">
          <div className="re-pcta">
            <h2 className="re-h2">{page.ctaTitle}</h2>
            <p>{page.ctaBody}</p>
            <a className="re-btn re-btn--light" href={url(locale, '/#contact')}>
              Speak to an Advisor
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      <Reviews />
      <Partners />
      <Contact locale={locale} action={formAction} />
    </>
  );
}
