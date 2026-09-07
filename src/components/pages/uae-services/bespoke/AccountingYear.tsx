'use client';

/**
 * "When does your year end?" — the first of Accounting & Tax's two own
 * sections.
 *
 * One question, three answers. Pick a month and the three dates that follow
 * from it are simply stated: when the VAT returns fall, when the corporate tax
 * return is due, when the year closes.
 *
 * THE PASS BEFORE THIS was a twelve-button strip over a thirty-six-cell matrix
 * with three colour-coded notes and a disclaimer under it — a grid the reader
 * had to decode before it told them anything. This says the same thing in
 * three lines of large type, and says it better: a matrix shows you which
 * squares are filled, and dates are what anyone actually wants.
 */
import { useState } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** The last day of a month, in a non-leap year — good enough for a year end. */
const LAST = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** 1-based month arithmetic that wraps the year. */
function add(month: number, n: number): number {
  return ((month - 1 + n) % 12 + 12) % 12 + 1;
}

export default function AccountingYear() {
  const [fy, setFy] = useState(12);

  /* VAT is quarterly from the period closing at the year end, and each return
     is due 28 days after its period closes — so it falls the month after. The
     corporate tax return is due nine months after the year end. */
  const vat = [1, 4, 7, 10]
    .map((q) => add(fy, q))
    /* Calendar order, not order-from-your-year-end: it is read as a year. */
    .sort((a, b) => a - b)
    .map((m) => MONTHS[m - 1].slice(0, 3));
  const ct = add(fy, 9);

  return (
    <section className="vxb vxb-year" id="vxd-tool" aria-labelledby="vxb-year-h">
      <div className="vxh__in">
        <h2 className="vxb-year__q" id="vxb-year-h">
          Our year ends in{' '}
          <span className="vxb-year__pick">
            <select
              value={fy}
              onChange={(e) => setFy(Number(e.target.value))}
              aria-label="Financial year end month"
            >
              {MONTHS.map((m, i) => (
                <option value={i + 1} key={m}>
                  {m}
                </option>
              ))}
            </select>
          </span>
          .
        </h2>

        <dl className="vxb-year__out">
          <div>
            <dt>VAT returns</dt>
            <dd>{vat.join(' · ')}</dd>
          </div>
          <div>
            <dt>Corporate tax return</dt>
            <dd>
              {LAST[ct - 1]} {MONTHS[ct - 1]}
            </dd>
          </div>
          <div>
            <dt>Year end</dt>
            <dd>
              {LAST[fy - 1]} {MONTHS[fy - 1]}
            </dd>
          </div>
        </dl>

        <p className="vxb-year__fine">
          We track these against your year, firm-wide. Illustrative &#8212; the FTA assigns your
          actual tax periods on registration.
        </p>
      </div>
    </section>
  );
}
