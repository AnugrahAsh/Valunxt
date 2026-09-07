/**
 * /about/ — Who We Are, shared by both editions (region-aware where a fact
 * differs).
 *
 * Second generation, in the kit's light system: a light stage with the page's
 * own artwork and a photograph, an intro split carrying the market's practices,
 * the purpose split, a numbers band, the philosophy as flip cards, an office
 * selector with a map, then the closing block and the newsletter.
 *
 * Facts come from the registries: vxnServices() for the practices, vxnOffices()
 * and vxnRegionData() for offices and lines, vxnMarkets() for the markets
 * statement. There is no group section on this page.
 *
 * Kit: components/vxh/kit. Styles: /assets/css/vxn-home-ae.css +
 * /assets/css/vxn-services-ae.css + /assets/css/vxn-pages.css. Behaviour:
 * /assets/js/vxn-services-ae.js, plus the flip-card toggle below.
 *
 * Port of about/index.php.
 */
import { rurl, vxnRegionData, vxnRegionOffices, vxnRegionPhone, vxnServices } from '@/lib/region';
import { vxnMarkets, vxnOffices, type Office } from '@/lib/site-data';
import { rimg } from '@/lib/region-assets';
import { plainText } from '@/lib/html-text';
import { Abs, Ico } from '@/components/vxh/kit';
import SubscribeSection from '@/components/sections/SubscribeSection';
import ClientScript from '@/components/ClientScript';
import Html from '@/components/Html';
import type { PageConfig } from '@/lib/page-config';

/** Our philosophy — what we are not, and what we are. */
const PHIL: { a: string; b: string }[] = [
  { a: 'We do not simply sell properties.', b: 'We help clients build wealth through real estate.' },
  { a: 'We do not simply publish reports.', b: 'We deliver investment intelligence.' },
  {
    a: 'We do not simply build software.',
    b: 'We create intelligent platforms that improve investment decisions.',
  },
];

/** Flip cards: tap toggles on touch devices; hover handles the rest. */
const FLIP_SCRIPT = `
document.querySelectorAll('.vxp-flip').forEach(function (c) {
	c.addEventListener('click', function () { c.classList.toggle('is-on'); });
	c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.classList.toggle('is-on'); } });
});
`;

/**
 * The Google Maps link each office carries, turned into an embeddable URL —
 * the same substitution the PHP made inline.
 */
function embedMap(map: string): string {
  return map.replace('https://maps.google.com/?q=', 'https://maps.google.com/maps?output=embed&z=15&q=');
}

export default function AboutBody({ page, region }: { page: PageConfig; region: string }) {
  const reg = vxnRegionData(region);
  const offices = vxnOffices();
  const mine = vxnRegionOffices(region);
  const services = vxnServices(region);
  const phone = vxnRegionPhone(region);
  const tel = reg.tel;

  /* Offices in the visitor's market first, then the others — PHP's `$MINE +
     $OFFICES`, which keeps the first occurrence of each key. */
  const order: [string, Office][] = [
    ...Object.entries(mine),
    ...Object.entries(offices).filter(([k]) => !(k in mine)),
  ];

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <section className="vxh-stage vxp-hero" aria-label="About VALUNXT Capital">
            <Abs variant="orbs" />
            <div className="vxh__in">
              <div className="vxh-stage__grid">
                <div>
                  <nav className="vxh-crumb" aria-label="Breadcrumb">
                    <a href={rurl(region, '/')}>Home</a>
                    <i />
                    <b>About</b>
                  </nav>
                  <h1 className="vxh-h1">
                    Intelligence behind every <span className="vxh-grad">investment decision.</span>
                  </h1>
                  <p className="vxh-lede">
                    VALUNXT Capital is a premium real estate wealth, capital, intelligence and
                    technology group supporting investors, developers, institutions and businesses
                    across {vxnMarkets('long')}.
                  </p>
                  <div className="vxh-stage__cta">
                    <a className="vxh-btn vxh-btn--primary" href={rurl(region, '/free-consultation/')}>
                      Free Consultation <Ico name="ne" size={18} />
                    </a>
                    <a className="vxh-btn vxh-btn--ghost" href={rurl(region, '/about/leadership/')}>
                      Meet the leadership <Ico name="arrow" size={18} />
                    </a>
                  </div>
                </div>
                <figure className="vxp-hero__fig" data-vxn-in="up">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rimg(region, 'new-folder/about-us-1.webp')}
                    alt="The VALUNXT Capital advisory team"
                    width={900}
                    height={720}
                    fetchPriority="high"
                  />
                  <figcaption>
                    <Ico name="pin" size={14} /> {vxnMarkets('cities')}
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* Why VALUNXT */}
          <section className="vxp-split" aria-labelledby="vxp-why-h">
            <div className="vxh__in">
              <div className="vxp-split__grid">
                <div>
                  <span className="vxh-eyebrow">Why VALUNXT Capital</span>
                  <h2 className="vxh-h2" id="vxp-why-h">
                    An integrated platform of advisory, research, capital and technology.
                  </h2>
                  <p className="vxh-lede">
                    Whether you are building a real estate portfolio, structuring capital, or seeking
                    data-driven market intelligence, our advisory team is here to help. Our
                    capabilities span:
                  </p>
                  <ul className="vxp-list">
                    {services.map((s) => (
                      <li key={s.href}>
                        <b>
                          <Ico name="check" size={12} />
                        </b>
                        <span>
                          <Html as="a" href={rurl(region, s.href)} html={s.title} /> &mdash;{' '}
                          <Html as="span" html={s.desc} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <figure className="vxp-media" data-vxn-in="up">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rimg(region, 'new-folder/client-success-1.webp')}
                    alt="A VALUNXT engagement in progress"
                    loading="lazy"
                    width={900}
                    height={675}
                  />
                  <span className="vxp-media__tag">
                    <Ico name="users" size={14} /> Senior people on every mandate
                  </span>
                </figure>
              </div>
            </div>
          </section>

          {/* Numbers */}
          <section className="vxp-nums" aria-label="At a glance">
            <div className="vxh__in">
              <div className="vxp-nums__row">
                <div className="vxp-num" data-vxn-in="up">
                  <div className="vxp-num__n">
                    <span data-vxh-count={services.length}>0</span>
                  </div>
                  <div className="vxp-num__l">
                    Connected practices in {reg.markets}, answering to one team
                  </div>
                </div>
                <div className="vxp-num" data-vxn-in="up">
                  <div className="vxp-num__n">
                    <span data-vxh-count={Object.keys(offices).length}>0</span>
                  </div>
                  <div className="vxp-num__l">Offices &mdash; {vxnMarkets('cities')}</div>
                </div>
                <div className="vxp-num" data-vxn-in="up">
                  <div className="vxp-num__n">
                    <span data-vxh-count="2">0</span>
                  </div>
                  <div className="vxp-num__l">
                    Core markets, {vxnMarkets('short')}, with cross-border advisory between them
                  </div>
                </div>
                <div className="vxp-num" data-vxn-in="up">
                  <div className="vxp-num__n">
                    <span data-vxh-count="1">0</span>
                    <sup>day</sup>
                  </div>
                  <div className="vxp-num__l">
                    A reply within one business day, from a named senior adviser
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Purpose */}
          <section className="vxp-split" aria-labelledby="vxp-purpose-h">
            <div className="vxh__in">
              <div className="vxp-split__grid vxp-split__grid--rev">
                <div>
                  <span className="vxh-eyebrow">Our Purpose</span>
                  <h2 className="vxh-h2" id="vxp-purpose-h">
                    Helping clients create sustainable, long-term value.
                  </h2>
                  <p className="vxh-lede">
                    Our purpose is to help clients make informed investment decisions, structure
                    capital effectively, and create sustainable long-term value through real estate.
                    We support HNIs, family offices, NRIs, developers and institutions with
                    disciplined, data-driven advisory.
                  </p>
                  <ul className="vxp-list">
                    <li>
                      <b>
                        <Ico name="check" size={12} />
                      </b>
                      <span>
                        <strong>Advisory-led investing.</strong> Disciplined portfolio growth through
                        strategy-led advisory across {vxnMarkets('long')}.
                      </span>
                    </li>
                    <li>
                      <b>
                        <Ico name="check" size={12} />
                      </b>
                      <span>
                        <strong>Independent research.</strong> Opportunities assessed with clarity
                        through independent research, valuation intelligence and market analysis.
                      </span>
                    </li>
                  </ul>
                </div>
                <figure className="vxp-media" data-vxn-in="up">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rimg(region, 'new-folder/about-us-banner.webp')}
                    alt=""
                    loading="lazy"
                    width={900}
                    height={675}
                  />
                  <span className="vxp-media__tag">
                    <Ico name="target" size={14} /> Evidence before opinion
                  </span>
                </figure>
              </div>
            </div>
          </section>

          {/* Philosophy: flip cards */}
          <section className="vxp-split" aria-labelledby="vxp-phil-h" style={{ paddingTop: 0 }}>
            <div className="vxh__in">
              <div className="vxh-head vxh-head--split">
                <div>
                  <span className="vxh-eyebrow">Our Philosophy</span>
                  <h2 className="vxh-h2" id="vxp-phil-h">
                    The principles that guide every engagement.
                  </h2>
                </div>
                <p className="vxh-lede">Hover or tap each card to see what we mean by it.</p>
              </div>
              <div className="vxp-flips">
                {PHIL.map((p, i) => (
                  <div
                    className="vxp-flip"
                    tabIndex={0}
                    role="button"
                    aria-label={plainText(`${p.a} ${p.b}`)}
                    data-vxn-in="up"
                    key={p.a}
                  >
                    <div className="vxp-flip__in">
                      <div className="vxp-flip__face">
                        <span className="vxp-flip__k">0{i + 1} &middot; What we are not</span>
                        <Html className="vxp-flip__t" html={p.a} />
                        <span className="vxp-flip__hint">
                          See what we are <Ico name="arrow" size={14} />
                        </span>
                      </div>
                      <div className="vxp-flip__face vxp-flip__face--b">
                        <span className="vxp-flip__k">0{i + 1} &middot; What we are</span>
                        <Html className="vxp-flip__t" html={p.b} />
                        <span className="vxp-flip__hint">
                          <Ico name="check" size={14} /> Every engagement
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Offices */}
          <section
            className="vxp-offices"
            aria-labelledby="vxp-off-h"
            style={{ background: 'var(--vxh-cream)', borderTop: '1px solid var(--vxh-line)' }}
          >
            <div className="vxh__in">
              <div className="vxh-head vxh-head--split">
                <div>
                  <span className="vxh-eyebrow">Where We Are</span>
                  <h2 className="vxh-h2" id="vxp-off-h">
                    Four offices, two markets, one team.
                  </h2>
                </div>
                <p className="vxh-lede">
                  Choose an office to see its address, hours and the line that answers there.
                </p>
              </div>
              <div className="vxp-off" data-vxd-chooser>
                <div className="vxp-off__list" role="group" aria-label="Offices">
                  {order.map(([k, o], i) => (
                    <button
                      className="vxp-off__btn"
                      type="button"
                      data-opt={i}
                      aria-pressed={i === 0}
                      key={k}
                    >
                      <span className="vxp-off__ic">
                        <Ico name="pin" size={18} />
                      </span>
                      <span>
                        {o.city}
                        <small>
                          {o.note} &middot; {o.country}
                        </small>
                      </span>
                      <span className="n">{String(i + 1).padStart(2, '0')}</span>
                    </button>
                  ))}
                </div>
                <div>
                  {order.map(([k, o], i) => (
                    <div
                      className={`vxp-off__panel${i === 0 ? ' is-on' : ''}`}
                      data-res={i}
                      hidden={i !== 0}
                      key={k}
                    >
                      <div className="vxp-off__map">
                        <iframe
                          loading="lazy"
                          src={embedMap(o.map)}
                          title={`${o.city} office map`}
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      <div className="vxp-off__card">
                        <div className="vxp-off__cell">
                          <small>Address</small>
                          {o.address}
                        </div>
                        <div className="vxp-off__cell">
                          <small>Hours</small>
                          {o.hours}
                          <br />
                          <a href={`tel:${o.tel}`}>{o.phone}</a>
                        </div>
                        <div className="vxp-off__cell">
                          <small>Entity</small>
                          {o.entity}
                          <br />
                          <a href={`mailto:${o.email}`}>{o.email}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Ready */}
          <section className="vxh-ready" aria-labelledby="vxp-ready-h">
            <Abs variant="waves" mod="light" flip />
            <div className="vxh__in">
              <div className="vxh-ready__grid">
                <div>
                  <span className="vxh-eyebrow">Ready When You Are</span>
                  <h2 className="vxh-h2" id="vxp-ready-h">
                    Start with a conversation, not a commitment.
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
                    <a className="vxh-way" href={rurl(region, '/contact/')}>
                      <span className="vxh-way__ic">
                        <Ico name="doc" size={22} />
                      </span>
                      <span>
                        <span className="vxh-way__t" style={{ display: 'block' }}>
                          Get a fixed-fee quote
                        </span>
                        <span className="vxh-way__d" style={{ display: 'block' }}>
                          Scope and fee agreed in writing before any work begins.
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
        <ClientScript id="vxp-flip-js" code={FLIP_SCRIPT} />
      </div>
    </div>
  );
}
