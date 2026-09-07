/**
 * /industries/ — Industries & Sectors, shared by both editions.
 *
 * Second generation, in the kit's light system: a light stage with the page's
 * own artwork, a sector explorer (auto-advancing tabs with a photograph and the
 * work we do in each), the client segments as cards, and the closing block.
 * Sector and segment copy lives in data/industries.ts.
 *
 * Kit: components/vxh/kit. Styles: /assets/css/vxn-home-ae.css +
 * /assets/css/vxn-services-ae.css + /assets/css/vxn-pages.css. Behaviour:
 * /assets/js/vxn-services-ae.js.
 *
 * Port of industries/index.php.
 */
import type { CSSProperties } from 'react';

import { BASE, rurl, vxnRegionData, vxnRegionPhone } from '@/lib/region';
import { CLIENT_SEGMENTS, INDUSTRY_SECTORS, sectorHref } from '@/data/industries';
import { Abs, Ico } from '@/components/vxh/kit';
import SubscribeSection from '@/components/sections/SubscribeSection';
import Html from '@/components/Html';
import type { PageConfig } from '@/lib/page-config';

/** The explorer's photography, cycled across the sectors. */
const PHOTOS = [
  '/assets/content/uploads/homepage/industry-1.webp',
  '/assets/content/uploads/homepage/industry-2.webp',
  '/assets/content/uploads/homepage/industry-3.webp',
  '/assets/content/uploads/homepage/industry-4.webp',
  '/assets/content/uploads/homepage/industry-5.webp',
  '/assets/content/uploads/homepage/building-real-esate.webp',
];

const SEG_ICONS = ['users', 'shield', 'globe', 'building', 'scales', 'layers', 'target', 'doc'];

function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}

export default function IndustriesBody({ page, region }: { page: PageConfig; region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const tel = reg.tel;

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <section className="vxh-stage vxp-hero" aria-label="Industries and sectors">
            <Abs variant="helix" />
            <div className="vxh__in">
              <div className="vxh-stage__grid">
                <div>
                  <nav className="vxh-crumb" aria-label="Breadcrumb">
                    <a href={rurl(region, '/')}>Home</a>
                    <i />
                    <b>Industries</b>
                  </nav>
                  <h1 className="vxh-h1">
                    The sectors we value, research <span className="vxh-grad">and fund.</span>
                  </h1>
                  <p className="vxh-lede">
                    Residential, office, retail, warehousing, land and hospitality &mdash; and the
                    clients we act for in each, from private owners to lenders.
                  </p>
                  <div className="vxh-stage__cta">
                    <a className="vxh-btn vxh-btn--primary" href={rurl(region, '/free-consultation/')}>
                      Free Consultation <Ico name="ne" size={18} />
                    </a>
                    <a className="vxh-btn vxh-btn--ghost" href="#vxp-sectors">
                      Explore the sectors <Ico name="arrow" size={18} />
                    </a>
                  </div>
                </div>
                <figure className="vxp-hero__fig" data-vxn-in="up">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE}/assets/content/uploads/homepage/industry-1.webp`}
                    alt=""
                    width={900}
                    height={720}
                    fetchPriority="high"
                  />
                  <figcaption>
                    <Ico name="building" size={14} /> {INDUSTRY_SECTORS.length} sectors &middot;{' '}
                    {CLIENT_SEGMENTS.length} client segments
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Sector explorer */}
          <section className="vxp-split vxp-x" id="vxp-sectors" aria-labelledby="vxp-sec-h">
            <div className="vxh__in">
              <div className="vxh-head vxh-head--split">
                <div>
                  <span className="vxh-eyebrow">Sectors</span>
                  <h2 className="vxh-h2" id="vxp-sec-h">
                    Six asset classes, one standard of evidence.
                  </h2>
                </div>
                <p className="vxh-lede">
                  Choose a sector to see how we work in it and the practice that carries the work.
                </p>
              </div>
              <div className="vxd-x" data-vxd-explorer>
                <div className="vxd-x__tabs" role="tablist" aria-label="Sectors">
                  {INDUSTRY_SECTORS.map((s, i) => (
                    <button
                      className="vxd-x__tab"
                      role="tab"
                      id={`vxp-x-tab-${i}`}
                      aria-selected={i === 0}
                      aria-controls={`vxp-x-pane-${i}`}
                      type="button"
                      {...(i === 0 ? {} : { tabIndex: -1 })}
                      key={s.n}
                    >
                      <span className="vxd-x__n">{s.n}</span>
                      <span>
                        <Html as="span" className="vxd-x__t" html={s.title} />
                        <Html as="span" className="vxd-x__d" html={s.work.join(' &middot; ')} />
                      </span>
                      <span className="vxd-x__prog" aria-hidden="true" />
                    </button>
                  ))}
                </div>
                <div className="vxd-x__screen">
                  {INDUSTRY_SECTORS.map((s, i) => (
                    <div
                      className={`vxd-x__pane${i === 0 ? ' is-active' : ''}`}
                      role="tabpanel"
                      id={`vxp-x-pane-${i}`}
                      aria-labelledby={`vxp-x-tab-${i}`}
                      hidden={i !== 0}
                      key={s.n}
                    >
                      <div className="vxd-x__copy">
                        <span className="vxd-x__k">{s.n} &middot; Sector</span>
                        <Html as="h3" className="vxd-x__h" html={s.title} />
                        <Html as="p" className="vxd-x__lede" html={s.desc} />
                        <ul className="vxd-x__pts">
                          {s.work.map((w, wi) => (
                            <li style={cssVars({ '--i': wi })} key={w}>
                              <b>
                                <Ico name="check" size={11} />
                              </b>
                              <Html as="span" html={w} />
                            </li>
                          ))}
                        </ul>
                        <a
                          className="vxh-btn vxh-btn--blue"
                          href={rurl(region, sectorHref(region, s.href))}
                        >
                          The practice behind it <Ico name="arrow" size={16} />
                        </a>
                      </div>
                      <div className="vxd-x__media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={BASE + PHOTOS[i % PHOTOS.length]}
                          alt=""
                          loading="lazy"
                          width={600}
                          height={420}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="vxd-x__dots" aria-hidden="true">
                    {INDUSTRY_SECTORS.map((s, i) => (
                      <i className={i === 0 ? 'is-on' : undefined} key={s.n} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Segments */}
          <section
            className="vxp-split"
            aria-labelledby="vxp-seg-h"
            style={{ background: 'var(--vxh-cream)', borderTop: '1px solid var(--vxh-line)' }}
          >
            <div className="vxh__in">
              <div className="vxh-head vxh-head--split">
                <div>
                  <span className="vxh-eyebrow">Who We Act For</span>
                  <h2 className="vxh-h2" id="vxp-seg-h">
                    The clients behind the mandates.
                  </h2>
                </div>
                <p className="vxh-lede">
                  Different questions, the same discipline: fixed fees, senior people and every
                  number documented to hold up.
                </p>
              </div>
              <div className="vxp-segs">
                {CLIENT_SEGMENTS.map((g, i) => (
                  <div className="vxp-seg" data-vxn-in="up" key={g.t}>
                    <span className="vxp-seg__ic">
                      <Ico name={SEG_ICONS[i % SEG_ICONS.length]} size={20} />
                    </span>
                    <Html as="h3" className="vxp-seg__t" html={g.t} />
                    <Html as="p" className="vxp-seg__d" html={g.d} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Ready */}
          <section className="vxh-ready" aria-labelledby="vxp-ready-h" style={{ background: '#fff' }}>
            <Abs variant="arcs" mod="light" />
            <div className="vxh__in">
              <div className="vxh-ready__grid">
                <div>
                  <span className="vxh-eyebrow">Ready When You Are</span>
                  <h2 className="vxh-h2" id="vxp-ready-h">
                    Tell us the asset. We will say what it needs.
                  </h2>
                  <p className="vxh-lede">
                    A free consultation, a fixed-fee quote in writing, and a named partner from the
                    first call.
                  </p>
                </div>
                <ul className="vxh-ways">
                  <li>
                    <a className="vxh-way" href={rurl(region, '/free-consultation/')}>
                      <span className="vxh-way__ic">
                        <Ico name="users" size={22} />
                      </span>
                      <span>
                        <span className="vxh-way__t" style={{ display: 'block' }}>
                          Book a free consultation
                        </span>
                        <span className="vxh-way__d" style={{ display: 'block' }}>
                          No obligation. A partner listens first and says what is actually needed.
                        </span>
                      </span>
                      <Ico name="ne" size={20} className="arr" />
                    </a>
                  </li>
                  <li>
                    <a className="vxh-way" href={rurl(region, '/services/')}>
                      <span className="vxh-way__ic">
                        <Ico name="grid" size={22} />
                      </span>
                      <span>
                        <span className="vxh-way__t" style={{ display: 'block' }}>
                          See every practice
                        </span>
                        <span className="vxh-way__d" style={{ display: 'block' }}>
                          Accounting, transactions, mortgages, valuation, research and technology.
                        </span>
                      </span>
                      <Ico name="ne" size={20} className="arr" />
                    </a>
                  </li>
                  <li>
                    <a className="vxh-way" href={`tel:${tel}`}>
                      <span className="vxh-way__ic">
                        <Ico name="phone" size={22} />
                      </span>
                      <span>
                        <span className="vxh-way__t" style={{ display: 'block' }}>
                          Call {phone}
                        </span>
                        <span className="vxh-way__d" style={{ display: 'block' }}>
                          {reg.hours} &middot; {reg.cities}
                        </span>
                      </span>
                      <Ico name="ne" size={20} className="arr" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        {/* /.vxh */}
        <SubscribeSection page={page} region={region} />
      </div>
    </div>
  );
}
