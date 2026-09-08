'use client';

/**
 * What things actually cost — the buy and rent bands, by community.
 *
 * WHY THIS SECTION EXISTS. The page previously answered "how is property valued
 * here" with a price on a card and nothing behind it. A single figure on a
 * single unit is not a valuation; it is a listing. This is the evidence a price
 * is read against: the per-square-foot band each community trades in, the villa
 * band where there is villa stock, and the gross yield that follows from it.
 *
 * The buy and rent bands are the same table with different columns, so they are
 * one component with a toggle rather than two sections saying the same thing —
 * and the toggle is the same Buy/Rent distinction the search uses, so the page
 * asks the visitor the same question in the same words twice rather than in two
 * different vocabularies.
 *
 * THE FIGURES ARE BANDS ON PURPOSE. They come from ../../data/market and carry
 * PRICE_NOTE, which says plainly that they are indicative and move with the
 * market. Nothing here is a valuation of anybody's property, and the section
 * says so where a reader will actually read it rather than in a footnote.
 */
import { useState } from 'react';

import { rurl } from '@/lib/region';

import { PRICE_NOTE, RENT_PRICES, SALE_PRICES } from '../../data/market';
import type { Locale } from '../../lib/types';
import { ArrowRight } from '../icons';
import { Chip } from './panels';

type Mode = 'buy' | 'rent';

const HEADS: Record<Mode, [string, string, string]> = {
  buy: ['Apartments', 'Villas & townhouses', 'Gross yield'],
  rent: ['Apartments', 'Villas & townhouses', 'Cheques'],
};

export default function Range({ region }: { region: Locale }) {
  const [mode, setMode] = useState<Mode>('buy');
  const rows = mode === 'buy' ? SALE_PRICES : RENT_PRICES;
  const heads = HEADS[mode];

  return (
    <section className="vxr-panel vxr-range" aria-labelledby="vxr-range-h">
      <div className="vxr-in">
        <Chip>What It Costs</Chip>
        <h2 className="vxr-say vxr-say--sm" id="vxr-range-h">
          What each of those lives <em>actually costs.</em>
        </h2>

        <div className="vxr-range__bar">
          <div className="vxr-range__tabs" role="tablist" aria-label="Buying or renting">
            {(['buy', 'rent'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
              >
                {m === 'buy' ? 'To buy' : 'To rent'}
              </button>
            ))}
          </div>
          <a className="vxr-range__ask" href={rurl(region, '/real-estate/#contact')}>
            Value my property <ArrowRight />
          </a>
        </div>

        {/* A real table: this is tabular data, and a grid of divs would say the
            same thing to a sighted reader and nothing at all to a screen
            reader. */}
        <div className="vxr-range__scroll">
          <table className="vxr-range__table">
            <thead>
              <tr>
                <th scope="col">Community</th>
                {heads.map((h) => (
                  <th scope="col" key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.area}>
                  <th scope="row">{r.area}</th>
                  <td>{r.apartment}</td>
                  <td>{r.villa}</td>
                  <td className="vxr-range__y">{r.yield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="vxr-note vxr-range__note">{PRICE_NOTE}</p>
      </div>
    </section>
  );
}
