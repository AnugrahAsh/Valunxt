/**
 * The detail blocks that give the service pages their substance: featured
 * properties, payment plans, indicative price/rent bands, and the cost of a
 * transaction.
 *
 * Four exports rather than one component, because each page needs a different
 * combination — buying wants listings, prices and costs; off-plan wants
 * listings and payment plans; letting wants rental listings, rent bands and
 * seller costs. ServicePageBody composes them.
 *
 * Every figure here carries a visible "indicative" qualifier. The numbers in
 * data/market.ts are illustrative until a real feed replaces them, and a price
 * shown without that qualifier reads as a quote.
 */
import type { Listing, PaymentPlan, PriceRow } from '../../lib/types';
import { PRICE_NOTE } from '../../data/market';

/* -------------------------------------------------------------------------- */

export function Listings({
  title,
  lede,
  items,
}: {
  title: string;
  lede: string;
  items: Listing[];
}) {
  return (
    <section className="re-section re-section--cream">
      <div className="re-wrap">
        <div className="re-sec-head">
          <span className="re-eyebrow">Featured</span>
          <h2 className="re-h2">{title}</h2>
          <p className="re-lede">{lede}</p>
        </div>

        <div className="re-grid-3">
          {items.map((l) => (
            <article className="re-listing" key={l.title}>
              <div className="re-listing__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.img} alt="" loading="lazy" />
                <span className="re-listing__status">{l.status}</span>
              </div>
              <div className="re-listing__body">
                <p className="re-listing__community">{l.community}</p>
                <h3 className="re-h3">{l.title}</h3>

                <p className="re-listing__price">
                  {l.price} <span>{l.priceNote}</span>
                </p>

                <ul className="re-listing__specs">
                  <li>{l.beds}</li>
                  <li>{l.baths}</li>
                  <li>{l.area}</li>
                </ul>

                <ul className="re-listing__tags">
                  {l.tags.map((tg) => (
                    <li key={tg}>{tg}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="re-note">{PRICE_NOTE}</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function PaymentPlans({ items }: { items: PaymentPlan[] }) {
  return (
    <section className="re-section">
      <div className="re-wrap">
        <div className="re-sec-head">
          <span className="re-eyebrow">Payment Plans</span>
          <h2 className="re-h2">How Off-Plan Payments Are Structured</h2>
          <p className="re-lede">
            The plan matters as much as the price. These are the three structures you will be
            offered, and what each one actually costs you over its life.
          </p>
        </div>

        <div className="re-grid-3">
          {items.map((pl) => (
            <div className="re-plan" key={pl.name}>
              <p className="re-plan__split">{pl.split}</p>
              <h3 className="re-h3">{pl.name}</h3>
              <p className="re-plan__summary">{pl.summary}</p>

              <dl className="re-plan__rows">
                {pl.rows.map((r) => (
                  <div key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="re-plan__best">
                <strong>Suits</strong> {pl.best}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function PriceTable({
  title,
  lede,
  rows,
  columns,
}: {
  title: string;
  lede: string;
  rows: PriceRow[];
  /** Header labels for the three data columns. */
  columns: [string, string, string];
}) {
  return (
    <section className="re-section re-section--cream">
      <div className="re-wrap">
        <div className="re-sec-head">
          <span className="re-eyebrow">Indicative</span>
          <h2 className="re-h2">{title}</h2>
          <p className="re-lede">{lede}</p>
        </div>

        {/* Wide tables scroll inside their own box; the page never scrolls sideways. */}
        <div className="re-table__scroll">
          <table className="re-table">
            <thead>
              <tr>
                <th scope="col">Community</th>
                <th scope="col">{columns[0]}</th>
                <th scope="col">{columns[1]}</th>
                <th scope="col">{columns[2]}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.area}>
                  <th scope="row">{r.area}</th>
                  <td>{r.apartment}</td>
                  <td>{r.villa}</td>
                  <td>{r.yield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="re-note">{PRICE_NOTE}</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Costs({
  title,
  lede,
  rows,
}: {
  title: string;
  lede: string;
  rows: { label: string; value: string; note: string }[];
}) {
  return (
    <section className="re-section">
      <div className="re-wrap">
        <div className="re-sec-head">
          <span className="re-eyebrow">What It Costs</span>
          <h2 className="re-h2">{title}</h2>
          <p className="re-lede">{lede}</p>
        </div>

        <ul className="re-costs">
          {rows.map((r) => (
            <li key={r.label}>
              <span className="re-costs__label">{r.label}</span>
              <span className="re-costs__value">{r.value}</span>
              <span className="re-costs__note">{r.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
