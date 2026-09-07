'use client';

/**
 * Mortgages' two own sections.
 *
 * A — "How much can I borrow?" One enormous number. Who you are changes the
 * loan-to-value the UAE regulator allows, and the deposit that implies; that is
 * the whole question a mortgage page is asked, so it is the whole section.
 *
 * B — "What actually moves your rate." Four rules. Everyone advertises a
 * headline rate; these are the things that decide whether you get it, which is
 * the more useful and less common thing to say.
 */
import { useState } from 'react';

/** The Central Bank caps for a first residential property. */
const WHO: { k: string; label: string; ltv: number; note: string }[] = [
  { k: 'res', label: 'a UAE resident', ltv: 0.8, note: 'First home, under AED 5m' },
  { k: 'nonres', label: 'a non-resident', ltv: 0.6, note: 'Non-resident buyer, first property' },
  { k: 'corp', label: 'a company', ltv: 0.65, note: 'Corporate borrower, case by case' },
];

export function MortgageBorrow() {
  const [who, setWho] = useState(WHO[0]);

  return (
    <section className="vxb vxb-borrow" id="vxd-tool" aria-labelledby="vxb-borrow-h">
      <div className="vxh__in">
        <h2 className="vxb-borrow__q" id="vxb-borrow-h">
          As{' '}
          <span className="vxb-pick">
            <select
              value={who.k}
              onChange={(e) => setWho(WHO.find((w) => w.k === e.target.value) ?? WHO[0])}
              aria-label="Who is borrowing"
            >
              {WHO.map((w) => (
                <option value={w.k} key={w.k}>
                  {w.label}
                </option>
              ))}
            </select>
          </span>
          , you can borrow up to
        </h2>

        <p className="vxb-borrow__n">
          {Math.round(who.ltv * 100)}
          <span>%</span>
        </p>

        <dl className="vxb-borrow__out">
          <div>
            <dt>Of the property value</dt>
            <dd>{who.note}</dd>
          </div>
          <div>
            <dt>Which means a deposit of</dt>
            <dd>{Math.round((1 - who.ltv) * 100)}%, plus transfer costs</dd>
          </div>
        </dl>

        <p className="vxb-fine">
          The Central Bank caps; a lender may offer less. We structure against the whole market
          rather than one bank&#8217;s appetite, and tell you which is which.
        </p>
      </div>
    </section>
  );
}

const MOVERS: [string, string][] = [
  ['Where the income is earned', 'Onshore, offshore, and how it is evidenced'],
  ['Fixed or variable, and for how long', 'The headline rate is only the first period'],
  ['The property itself', 'Developer, community and completion status all price in'],
  ['Which lender sees it first', 'The same file is priced differently across the market'],
];

export function MortgageRate() {
  return (
    <section className="vxb vxb-movers vxh-dark" aria-labelledby="vxb-movers-h">
      <div className="vxh__in">
        <h2 className="vxh-h2 vxb-movers__h" id="vxb-movers-h">
          Everyone advertises a rate.{' '}
          <span className="vxh-grad">These are what move yours.</span>
        </h2>
        <ol className="vxb-movers__list">
          {MOVERS.map(([t, d], i) => (
            <li data-vxn-in="up" key={t}>
              <span className="vxb-movers__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="vxb-movers__t">{t}</span>
              <span className="vxb-movers__d">{d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
