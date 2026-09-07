'use client';

/**
 * Real Estate Transactions' two own sections.
 *
 * A — "What it costs to buy." A price, and the transfer costs that follow from
 * it, adding up. Every buyer asks this and almost no site answers it; the
 * device is a ledger that totals, because that is what the answer is.
 *
 * B — "Ten working days, if the papers are right." The transaction as four
 * marks on a rule. Not a card each: a transaction is a line, and drawing it as
 * one says how short it is.
 */
import { useState } from 'react';

const PRICES = [1_500_000, 2_500_000, 4_000_000, 7_500_000];

/** Dubai's standard transfer costs, as a share of price or a flat fee. */
const COSTS: { k: string; note: string; of?: number; flat?: number }[] = [
  { k: 'DLD transfer fee', note: '4% of the price, plus AED 580 admin', of: 0.04, flat: 580 },
  { k: 'Agency fee', note: '2% of the price, plus VAT', of: 0.02 },
  { k: 'Trustee office', note: 'Flat, on transfer', flat: 4200 },
  { k: 'Title deed', note: 'Issued on completion', flat: 250 },
];

function aed(n: number): string {
  return 'AED ' + Math.round(n).toLocaleString('en-AE');
}

export function RealEstateCosts() {
  const [price, setPrice] = useState(PRICES[1]);
  const lines = COSTS.map((c) => ({ ...c, v: (c.of ?? 0) * price + (c.flat ?? 0) }));
  const total = lines.reduce((a, l) => a + l.v, 0);

  return (
    <section className="vxb vxb-cost" id="vxd-tool" aria-labelledby="vxb-cost-h">
      <div className="vxh__in">
        <h2 className="vxb-cost__q" id="vxb-cost-h">
          On a{' '}
          <span className="vxb-pick">
            <select
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              aria-label="Purchase price"
            >
              {PRICES.map((p) => (
                <option value={p} key={p}>
                  {aed(p)}
                </option>
              ))}
            </select>
          </span>{' '}
          purchase, this is what transfers.
        </h2>

        <dl className="vxb-cost__ledger">
          {lines.map((l) => (
            <div key={l.k}>
              <dt>
                {l.k}
                <span>{l.note}</span>
              </dt>
              <dd>{aed(l.v)}</dd>
            </div>
          ))}
          <div className="vxb-cost__total">
            <dt>Payable on transfer</dt>
            <dd>{aed(total)}</dd>
          </div>
        </dl>

        <p className="vxb-fine">
          Dubai, standard residential transfer. Mortgage registration, service-charge
          apportionment and developer NOC fees are additional and quoted before you commit.
        </p>
      </div>
    </section>
  );
}

const STAGES: [string, string][] = [
  ['Offer agreed', 'Terms and deposit in writing'],
  ['Form F signed', 'The contract both sides sign'],
  ['NOC issued', 'The developer clears the sale'],
  ['Transfer', 'Trustee office, same day'],
];

export function RealEstatePath() {
  return (
    <section className="vxb vxb-path vxh-dark" aria-labelledby="vxb-path-h">
      <div className="vxh__in">
        <h2 className="vxh-h2 vxb-path__h" id="vxb-path-h">
          Ten working days, <span className="vxh-grad">if the papers are right.</span>
        </h2>
        <ol className="vxb-path__line">
          {STAGES.map(([t, d], i) => (
            <li data-vxn-in="up" key={t}>
              <i aria-hidden="true" />
              <span className="vxb-path__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="vxb-path__t">{t}</span>
              <span className="vxb-path__d">{d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
