'use client';

/**
 * "Our Services" — the bento on the UAE home page.
 *
 * Each cell keeps its direct link to the practice page, and gains an expand
 * button that opens the practice's overview in a dialog without leaving the
 * page (ServiceModal). Two routes to the same content: the visitor who knows
 * what they want clicks through, the one who is still deciding expands.
 *
 * WHY THE CELL IS NO LONGER AN <a>. A button cannot sit inside a link, so the
 * cell is a container with a stretched link over it — the whole tile is still
 * one click target, and the expand button lifts above that overlay on its own
 * z-index. Keyboard users get both in order: the link, then the button.
 *
 * The layout roles and the copy come from the server; the overviews are
 * assembled there too, so the UAE copy registries stay out of this bundle.
 */
import { useCallback, useState } from 'react';

import { rurl, type Service } from '@/lib/region';
import { plainText } from '@/lib/html-text';
import type { ServiceOverview } from '@/lib/service-overview';
import { Ico, Visual, type VisualKind } from '@/components/vxh/kit';
import Html from '@/components/Html';
import ServiceModal from './ServiceModal';

export interface BentoCell {
  service: Service;
  cls: string;
  vis: VisualKind | 'photo' | 'none';
  /** Resolved on the server, because rimg() reads the filesystem. */
  img: string;
}

export default function ServicesBento({
  cells,
  overviews,
  region,
}: {
  cells: BentoCell[];
  /** Keyed by the service href. A practice with no overview simply has no
   *  expand button — the link still works. */
  overviews: Record<string, ServiceOverview>;
  region: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const current = open ? overviews[open] : undefined;

  return (
    <>
      <div className="vxh-grid">
        {cells.map(({ service: s, cls, vis, img }, i) => {
          const overview = overviews[s.href];
          const name = plainText(s.title);
          return (
            <div className={`vxh-cell vxc-tile ${cls}`} data-vxn-in="up" key={s.href}>
              {vis === 'photo' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img} alt="" loading="lazy" width={900} height={600} />
              ) : null}
              <div className="vxh-cell__vis">
                {vis !== 'photo' && vis !== 'none' ? <Visual kind={vis} id={`b${i}`} /> : null}
              </div>
              <div className="vxh-cell__txt">
                <span className="vxh-cell__k">
                  <Ico name={s.icon ?? 'arrow'} size={14} /> <Html as="span" html={s.short} />
                </span>
                <h3 className="vxh-cell__t">
                  {/* The stretched link: the whole tile is its click target. */}
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
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 4H4v5M15 20h5v-5M20 9V4h-5M4 15v5h5" />
                  </svg>
                  <span>Expand</span>
                </button>
              ) : null}
            </div>
          );
        })}
      </div>

      {current ? <ServiceModal service={current} region={region} onClose={close} /> : null}
    </>
  );
}
