'use client';

/**
 * "Our Services" — the six practices, laid down either side of the mark.
 *
 * The six run down the page rather than swapping in one place: each card takes
 * its own row, alternating the column it sits in, so the reader travels past
 * them instead of watching them replace one another on the spot. The lane
 * between the two columns is left clear, and the X — sticky across this section
 * and the hero above it — descends through it, turning as it goes.
 *
 * THE CARD IS THE BENTO'S CARD. Same `.vxh-cell` markup, same visual, same
 * stretched link, same expand button opening the same ServiceModal. Only its
 * frame changed. A visitor who knows what they want still clicks straight
 * through, and one who is deciding still expands in place.
 *
 * `services()` in vxn-home-ae.js reveals each card as it arrives — from its own
 * side, which a shared reveal primitive could not do — and writes the run's
 * progress on the wrapper for the mark to turn on. Without script every card is
 * simply visible. */
import { useCallback, useState } from 'react';

import { rurl, type Service } from '@/lib/region';
import { plainText } from '@/lib/html-text';
import type { ServiceOverview } from '@/lib/service-overview';
import { Ico, Visual, type VisualKind } from '@/components/vxh/kit';
import Html from '@/components/Html';
import ServiceModal from './ServiceModal';

export interface ScrollCell {
  service: Service;
  vis: VisualKind | 'photo' | 'none';
  /** Resolved on the server, because rimg() reads the filesystem. */
  img: string;
}

export default function ServicesScroll({
  cells,
  overviews,
  region,
  lede,
}: {
  cells: ScrollCell[];
  /** Keyed by the service href. A practice with no overview simply has no
   *  expand button — the link still works. */
  overviews: Record<string, ServiceOverview>;
  region: string;
  lede: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const current = open ? overviews[open] : undefined;

  return (
    <>
      <section className="vxh-svc" aria-labelledby="vxh-svc-h">
        <div className="vxh__in">
          <div className="vxh-svc__head">
            <span className="vxh-eyebrow">Our Services</span>
            <h2 className="vxh-h2" id="vxh-svc-h">
              Six practices. <span className="vxh-em">One accountable team.</span>
            </h2>
            <p className="vxh-svc__lede">{lede}</p>
          </div>

          <ol className="vxh-svc__deck">
            {cells.map(({ service: s, vis, img }, i) => {
              const overview = overviews[s.href];
              const name = plainText(s.title);
              return (
                <li
                  className={`vxh-svc__slot vxh-svc__slot--${i % 2 ? 'r' : 'l'}`}
                  style={{ ['--row' as string]: i + 1 }}
                  key={s.href}
                >
                  <span className="vxh-svc__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="vxh-cell vxc-tile vxh-svc__card">
                    {vis === 'photo' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt="" loading="lazy" width={900} height={600} />
                    ) : null}
                    <div className="vxh-cell__vis">
                      {vis !== 'photo' && vis !== 'none' ? <Visual kind={vis} id={`s${i}`} /> : null}
                    </div>
                    <div className="vxh-cell__txt">
                      <span className="vxh-cell__k">
                        <Ico name={s.icon ?? 'arrow'} size={14} /> <Html as="span" html={s.short} />
                      </span>
                      <h3 className="vxh-cell__t">
                        {/* The stretched link: the whole card is its target. */}
                        <a className="vxc-tile__link" href={rurl(region, s.href)}>
                          <Html as="span" html={s.title} />
                        </a>
                      </h3>
                      <Html as="p" className="vxh-cell__d" html={s.desc} />
                    </div>

                    <span className="vxh-cell__go" aria-hidden="true">
                      <Ico name="ne" size={16} />
                    </span>

                    {overview ? (
                      <button
                        className="vxc-tile__expand"
                        type="button"
                        onClick={() => setOpen(s.href)}
                        aria-haspopup="dialog"
                        aria-label={`Expand ${name}`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="15"
                          height="15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M9 4H4v5M15 20h5v-5M20 9V4h-5M4 15v5h5" />
                        </svg>
                        <span>Expand</span>
                      </button>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {current ? <ServiceModal service={current} region={region} onClose={close} /> : null}
    </>
  );
}
