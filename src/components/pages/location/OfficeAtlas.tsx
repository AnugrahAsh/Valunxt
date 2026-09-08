'use client';

/**
 * The offices, on one map.
 *
 * WHAT IT REPLACES. Four cards, each with a stock photograph of the city and
 * the address printed over it, and no map anywhere — so the one question the
 * page exists to answer ("where actually is it") took a trip to Google.
 *
 * ONE MAP, FOUR PINS. Choosing an office moves the map to it and swaps the
 * details beside it. Only the chosen office's frame is in the document, so
 * four embeds are never loaded at once; the others mount when they are asked
 * for, which is also why the iframe carries a key — a new src on an existing
 * iframe pushes an entry onto the browser's history and the back button then
 * walks the visitor through every office they looked at.
 *
 * SATELLITE IS THE SURROUNDINGS. Google's classic embed takes `t=k`, which is
 * the aerial view — tilted, with the towers rendered — so "show me what is
 * around it" is a toggle rather than a leap to another site. It needs no API
 * key, which is why it is this and not the 3D tiles renderer: a key that has to
 * be provisioned, billed and rotated is not a better map, it is a map that
 * stops working.
 *
 * WITHOUT JAVASCRIPT the page still lists every office in full — the details
 * are server-rendered under the map, and each address is a link to the same
 * place on Google Maps.
 */
import { useMemo, useState } from 'react';

import type { Office } from '@/lib/site-data';
import { Ico } from '@/components/vxh/kit';

type View = 'm' | 'k';

/** The office's own Google Maps link, turned into an embeddable URL. */
function embed(office: Office, view: View): string {
  const q = office.map.replace(/^https?:\/\/maps\.google\.com\/\?q=/, '');
  return `https://maps.google.com/maps?q=${q}&t=${view}&z=${view === 'k' ? 17 : 15}&output=embed&iwloc=near`;
}

export default function OfficeAtlas({ offices }: { offices: Array<[string, Office]> }) {
  const [at, setAt] = useState(0);
  const [view, setView] = useState<View>('m');

  const office = offices[at]?.[1];
  const src = useMemo(() => (office ? embed(office, view) : ''), [office, view]);
  if (!office) return null;

  return (
    <div className="vxl-atlas">
      <div className="vxl-atlas__side">
        <div className="vxl-atlas__list" role="tablist" aria-label="Offices">
          {offices.map(([key, o], i) => (
            <button
              className="vxl-pick"
              type="button"
              role="tab"
              aria-selected={i === at}
              onClick={() => setAt(i)}
              key={key}
            >
              <span className="vxl-pick__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="vxl-pick__c">
                {o.city}
                <small>
                  {o.note} &middot; {o.country}
                </small>
              </span>
              <Ico name="pin" size={16} />
            </button>
          ))}
        </div>

        <dl className="vxl-card">
          <div>
            <dt>Address</dt>
            <dd>
              <a href={office.map} target="_blank" rel="noopener">
                {office.address}
              </a>
            </dd>
          </div>
          <div>
            <dt>Entity</dt>
            <dd>{office.entity}</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>{office.hours}</dd>
          </div>
          <div>
            <dt>Reach it</dt>
            <dd>
              <a href={`tel:${office.tel}`}>{office.phone}</a>
              <br />
              <a href={`mailto:${office.email}`}>{office.email}</a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="vxl-atlas__map" data-vxh-par="rise">
        {/* The controls sit above the frame rather than floating over it:
            Google draws its own info card in the top-left corner and its
            attribution along the bottom, so there is no corner of an embed that
            is reliably free. */}
        <div className="vxl-atlas__bar">
          <span className="vxl-atlas__where">
            <Ico name="pin" size={14} /> {office.city}
          </span>
          <span className="vxl-atlas__views" role="group" aria-label="Map view">
            <button type="button" aria-pressed={view === 'm'} onClick={() => setView('m')}>
              Map
            </button>
            <button type="button" aria-pressed={view === 'k'} onClick={() => setView('k')}>
              Surroundings
            </button>
          </span>
          <a className="vxl-atlas__go" href={office.map} target="_blank" rel="noopener">
            Directions <Ico name="ne" size={13} />
          </a>
        </div>
        <div className="vxl-atlas__frame">
          <iframe
            key={`${at}-${view}`}
            src={src}
            loading="lazy"
            title={`${office.city} office — ${view === 'k' ? 'aerial view' : 'map'}`}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
