/**
 * /en-ae/ — the UAE home page.
 *
 * Second generation of this page, built as a single continuous surface: a light
 * opening stage that holds one screen, angled seams between sections, a deck of
 * process cards that stacks up as it is read, and motion that either explains
 * something or answers the pointer.
 *
 * The hero is on its seventh pass — a split head over a stage carrying the
 * X mark (components/sections/HeroMark), with the practices and the
 * regulators along the foot. See "1. Hero" in vxn-home-ae.css.
 *
 * Nothing about the foundation changed. Region-specific facts still come from
 * vxnRegionData() / vxnRegionPhone() / vxnOffices(); the six practices come from
 * vxnServices(), so this page, the Services menu and the service index can never
 * drift apart; the insight cards from the blog catalog; imagery through rimg()
 * so a market can drop in its own artwork; the enquiry form is the shared
 * ContactSection, posting to the same form handler as before.
 *
 * Kit: components/vxh/kit. Styles: /assets/css/vxn-home-ae.css (through
 * page.css). Behaviour: /assets/js/vxn-home-ae.js (through page.js).
 *
 * Port of en-ae/index.php.
 */
import { Fragment, type CSSProperties } from 'react';

import { rurl, vxnRegionData, vxnRegionPhone, vxnServices, type Service } from '@/lib/region';
import { vxnMarkets, vxnOffices } from '@/lib/site-data';
import { rimg } from '@/lib/region-assets';
import BLOG_CATALOG from '@/data/blog-catalog';
import { serviceOverviewsByHref } from '@/lib/service-overview';
import { Abs, Ico, Spark, type VisualKind } from '@/components/vxh/kit';
import ServicesScroll from '@/components/sections/ServicesScroll';
import SolveTabs from '@/components/sections/SolveTabs';
import InsightsRail from '@/components/sections/InsightsRail';
import HeroMark from '@/components/sections/HeroMark';
import AboutBento from '@/components/sections/AboutBento';
import ContactSection from '@/components/sections/ContactSection';
import SubscribeSection from '@/components/sections/SubscribeSection';
import Html from '@/components/Html';
import type { PageConfig } from '@/lib/page-config';

/** The four principles under "Who we are". */
const PRINCIPLES: { t: string; i: string }[] = [
  { t: 'Fixed fees agreed before work begins', i: 'doc' },
  { t: 'A partner who answers when you call', i: 'phone' },
  { t: 'Positions documented as if the audit letter arrives tomorrow', i: 'shield' },
  { t: 'RICS-regulated valuation through group firm Reliant Surveyors', i: 'scales' },
];

/** How an engagement runs — the pinned-scene story. */
const STORY: { t: string; d: string }[] = [
  {
    t: 'We listen first.',
    d: 'Your business is understood before it is advised. The senior people who learn it are the same people who stay on it &#8212; not a handover to a junior once the engagement letter is signed.',
  },
  {
    t: 'The fee is fixed before work begins.',
    d: 'Quoted in advance, in writing, and it does not move once work has started. No hourly meter, no surprises on the invoice.',
  },
  {
    t: 'Evidence before opinion.',
    d: 'Every recommendation is backed by verified data and sound method. Valuations run to RICS standards through our group firm Reliant Surveyors.',
  },
  {
    t: 'Documented as if the audit letter arrives tomorrow.',
    d: 'Working papers an auditor can follow, positions documented early. If a position cannot be documented, it does not go in the file.',
  },
  {
    t: 'A partner who answers when you call.',
    d: 'A named partner on every engagement and a reply within one business day. Deadlines are tracked firm-wide against your financial year, so surprises stay off your desk.',
  },
];

interface Intent {
  tab: string;
  lede: string;
  items: { t: string; d: string; h: string }[];
}

/** Find the right solution — the three intents. */
const INTENTS: Intent[] = [
  {
    tab: 'Staying Compliant',
    lede: 'Meet every FTA deadline without the chasing. We register, reconcile and file &#8212; corporate tax, VAT and statutory accounts &#8212; at a fee agreed before the work starts.',
    items: [
      {
        t: 'Corporate Tax Registration &amp; Filing',
        d: 'Registration, impact assessment and annual return filing, tracked to your financial year.',
        h: '/services/accounting-and-tax-services/',
      },
      {
        t: 'VAT Compliance',
        d: 'Registration through to quarterly returns, reconciled and filed on time.',
        h: '/services/accounting-and-tax-services/',
      },
      {
        t: 'Bookkeeping &amp; Financial Reporting',
        d: 'Books kept current and statements prepared to standard, month after month.',
        h: '/services/accounting-and-tax-services/',
      },
    ],
  },
  {
    tab: 'Valuing an Asset or Business',
    lede: 'Know what it is worth, and be able to prove it. RICS-regulated valuation through our group firm Reliant Surveyors, with the method documented in full.',
    items: [
      {
        t: 'Property Valuation',
        d: 'RICS-standard valuation for lenders, funds, developers and private owners.',
        h: '/services/valuation-and-advisory/',
      },
      {
        t: 'Business Valuation',
        d: 'Independent enterprise value for transactions, disputes and reporting.',
        h: '/services/valuation-and-advisory/',
      },
      {
        t: 'Plant &amp; Machinery Valuation',
        d: 'Asset-level valuation for finance, insurance and balance-sheet purposes.',
        h: '/services/valuation-and-advisory/',
      },
    ],
  },
  {
    tab: 'Funding or Investing',
    lede: 'Test the case before you commit the capital. Feasibility, market research and whole-of-market funding advice &#8212; evidence first, then the decision.',
    items: [
      {
        t: 'Feasibility &amp; Highest Best Use',
        d: 'Testing whether a scheme stacks up, and what the land should actually carry.',
        h: '/services/research-and-intelligence/',
      },
      {
        t: 'Mortgage &amp; Corporate Loan Advisory',
        d: 'Whole-of-market structuring for resident, non-resident and corporate borrowers.',
        h: '/services/mortgage-services/',
      },
      {
        t: 'Real Estate Market Research',
        d: 'Demand, supply and pricing evidence for the market you are about to enter.',
        h: '/services/research-and-intelligence/',
      },
    ],
  },
];

/**
 * Layout roles for the services bento. Anything the registry adds that is not
 * listed here still renders, as a plain four-column card.
 */
const ROLES: Record<string, { cls: string; vis: VisualKind | 'photo' | 'none' }> = {
  '/services/accounting-and-tax-services/': { cls: 'vxh-cell--7 vxh-cell--tall', vis: 'ledger' },
  '/services/valuation-and-advisory/': { cls: 'vxh-cell--5', vis: 'gauge' },
  '/services/real-estate-transactions/': { cls: 'vxh-cell--5 vxh-cell--photo', vis: 'photo' },
  '/services/mortgage-services/': { cls: 'vxh-cell--4', vis: 'bars' },
  '/services/research-and-intelligence/': { cls: 'vxh-cell--4', vis: 'chart' },
  '/services/technology-data-and-ai/': { cls: 'vxh-cell--4', vis: 'pipe' },
};

/**
 * The compliance calendar, as one row per obligation.
 *
 * It was a single track with every mark competing for the same 12 cells, which
 * is why three chips could land on one month and none of them could be read. A
 * row each says the same thing without any of them overlapping, and the row
 * label does the work the legend used to.
 */
const CAL_ROWS: { k: string; label: string; note: string; months: number[] }[] = [
  {
    k: 'vat',
    label: 'VAT return',
    note: 'Filed for each tax period, due 28 days after it ends',
    months: [1, 4, 7, 10],
  },
  {
    k: 'ct',
    label: 'Corporate tax',
    note: 'Return and any payment within nine months of the year end',
    months: [9],
  },
  {
    k: 'fy',
    label: 'Financial year end',
    note: 'Shown for a January–December year; tracked against yours',
    months: [12],
  },
];

const MONTH_INITIALS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

/** Spelled out for the screen reader, which cannot make anything of "J". */
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Which column is picked out as the month the reader is actually in. */
const CAL_NOW = new Date().getMonth() + 1;

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}

/**
 * The file each process card holds up.
 *
 * These were the five panels of the pinned scene, drawn as grey skeleton bars
 * on a white sheet — which on a white card reads as a document that failed to
 * load rather than as one being written. They are real now: labelled rows, a
 * signed valuation, the three parts of an audit file, the thread with a
 * partner. Nothing is a placeholder, so nothing can look broken.
 */
function storyVisual(i: number) {
  switch (i) {
    case 0:
      return (
        <div className="vxh-file">
          <div className="vxh-file__hd">
            <b>Discovery notes</b>
            <span>Before anything is quoted</span>
          </div>
          <dl className="vxh-rows">
            <div data-i="0">
              <dt>Entities and licences</dt>
              <dd>Mapped</dd>
            </div>
            <div data-i="1">
              <dt>Financial year</dt>
              <dd>January &ndash; December</dd>
            </div>
            <div data-i="2">
              <dt>What the numbers are for</dt>
              <dd>Bank and board</dd>
            </div>
          </dl>
          <ul className="vxh-check">
            <li data-i="3">
              <b>
                <Ico name="check" size={12} />
              </b>{' '}
              A named partner on the engagement
            </li>
            <li data-i="4">
              <b>
                <Ico name="check" size={12} />
              </b>{' '}
              The team that learns it is the team that keeps it
            </li>
          </ul>
        </div>
      );
    case 1:
      return (
        <div className="vxh-file">
          <div className="vxh-file__hd">
            <b>Engagement letter</b>
            <span>Scope and fee</span>
          </div>
          <dl className="vxh-rows">
            <div data-i="0">
              <dt>Scope</dt>
              <dd>Accounting, corporate tax, VAT</dd>
            </div>
            <div data-i="1">
              <dt>Fee</dt>
              <dd>Fixed, quoted in writing</dd>
            </div>
            <div data-i="2">
              <dt>Once work starts</dt>
              <dd>It does not move</dd>
            </div>
          </dl>
          <span className="vxh-tag" data-i="3">
            <Ico name="check" size={12} /> Agreed before work begins
          </span>
        </div>
      );
    case 2:
      return (
        <div className="vxh-file">
          <div className="vxh-file__hd">
            <b>Valuation file</b>
            <span>RICS Red Book</span>
          </div>
          <Spark id="vxhSparkFill2" />
          <dl className="vxh-rows">
            <div data-i="0">
              <dt>Method</dt>
              <dd>Comparable transactions</dd>
            </div>
            <div data-i="1">
              <dt>Evidence</dt>
              <dd>Verified, dated, sourced</dd>
            </div>
            <div data-i="2">
              <dt>Signed by</dt>
              <dd>MRICS, Reliant Surveyors</dd>
            </div>
          </dl>
        </div>
      );
    case 3:
      return (
        <div className="vxh-file">
          <div className="vxh-file__hd">
            <b>What an auditor opens</b>
            <span>Three parts, one trail</span>
          </div>
          <ol className="vxh-papers">
            <li data-i="0">
              <b>Working papers</b>
              <span>Every position sourced and dated</span>
            </li>
            <li data-i="1">
              <b>Reconciliations</b>
              <span>Bank, VAT and ledger, month by month</span>
            </li>
            <li data-i="2">
              <b>Filing acknowledgements</b>
              <span>Kept with the return they belong to</span>
            </li>
          </ol>
        </div>
      );
    default:
      return (
        <div className="vxh-file">
          <div className="vxh-file__hd">
            <b>Thursday, 09:14</b>
            <span>One business day, worst case</span>
          </div>
          <div className="vxh-partner" data-i="0">
            <span className="vxh-partner__av">VX</span>
            <div>
              <div className="vxh-partner__n">Your named partner</div>
              <div className="vxh-partner__r">On this engagement since day one</div>
            </div>
          </div>
          <div className="vxh-bubble">
            Quick one &#8212; is the Q3 VAT return reconciled and filed?
          </div>
          <div className="vxh-bubble">
            Yes. Reconciled, filed, and the acknowledgement is already in your file.
          </div>
        </div>
      );
  }
}

/** An uploads path as rimg() wants it — relative to uploads/, no leading slash. */
function uploadRel(path: string): string {
  return path.replace('/assets/content/uploads/', '').replace(/^\/+/, '');
}

export default function HomeAeBody({ page, region }: { page: PageConfig; region: string }) {
  const reg = vxnRegionData(region);
  const offices = Object.values(vxnOffices());
  const services = vxnServices(region);
  const phone = vxnRegionPhone(region);
  const tel = reg.tel;
  const posts = Object.entries(BLOG_CATALOG).slice(0, 4);

  const byHref: Record<string, Service> = {};
  for (const s of services) byHref[s.href] = s;

  /* The bento, laid out by role: the six known practices in the order ROLES
     declares them, then anything the registry has added since. */
  const ordered: [Service, { cls: string; vis: VisualKind | 'photo' | 'none' }][] = [];
  for (const [href, role] of Object.entries(ROLES)) {
    if (byHref[href]) ordered.push([byHref[href], role]);
  }
  for (const s of services) {
    if (!ROLES[s.href]) ordered.push([s, { cls: 'vxh-cell--4', vis: 'none' }]);
  }

  return (
    <div id="main-content">
      <div id="sub-header" className="layout-full elementor-page-title">
        <div className="meta-header" />
      </div>
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="page-wrapper">
          <article id="post-17" className="full post-17 page type-page status-publish hentry">
            <div className="page-content clearfix the-content-parent">
              <div className="vxh">
                {/* ==========================================================
                    The mark's run: the hero and the services, sharing one X.

                    HeroMark is a sticky layer over both of them rather than a
                    child of either, so the same object carries the reader from
                    the headline into the practices — settling out of the hero's
                    band to the middle of the screen and turning on its axis all
                    the way through. Both sections are transparent; this wrapper
                    is what holds the white.
                    ========================================================== */}
                <div className="vxh-x">
                  <div className="vxh-x__layer" aria-hidden="true">
                    <HeroMark />
                  </div>

                {/* ==========================================================
                    1. Hero — the stage

                    Two bands. The headline holds the left of the top row
                    and the offer the right; under them the stage, with one line
                    of proof to each side of the mark. The practice rail that
                    used to close it went the way of the regulator marks before
                    it: the six are named in the section immediately below, and
                    saying them twice in one screen is saying them once.

                    HeroMark runs behind all three bands: the X from the
                    wordmark, extruded from the mark's own SVG, swaying on its
                    own and grabbable. The layout leaves the middle band clear
                    for it, and a white veil holds the head and the foot off it
                    so the type never competes with it. It is loaded only when
                    the hero is near the viewport, so the flat artwork is what a
                    visitor sees first — and all they see if WebGL is
                    unavailable or motion is reduced.
                    ========================================================== */}
                <section
                  className="vxh-hero"
                  aria-label="VALUNXT Capital in the United Arab Emirates"
                >
                  <div className="vxh__in">
                    <div className="vxh-hero__head">
                      <h1 className="vxh-h1" data-vxh-rise>
                        Accounting, tax and valuation{' '}
                        <span className="vxh-em">that hold up.</span>
                      </h1>

                      <div className="vxh-hero__offer" data-vxh-rise>
                        <span className="vxh-hero__badge">
                          <b>Now</b> Corporate tax registration and annual filing
                        </span>
                        <p className="vxh-hero__note">
                          A senior team of accountants, tax advisers and RICS-regulated valuers.
                          Fees fixed in writing, every number documented.
                        </p>
                        <div className="vxh-hero__cta">
                          <a
                            className="vxh-btn vxh-btn--blue"
                            href={rurl(region, '/free-consultation/')}
                          >
                            Book a free consultation <Ico name="ne" size={16} />
                          </a>
                          <a className="vxh-link" href={rurl(region, '/contact/')}>
                            Talk to a partner <Ico name="arrow" size={16} />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="vxh-hero__stage" data-vxh-rise>
                      <p className="vxh-hero__fig vxh-hero__fig--l">
                        Six connected practices
                      </p>
                      {/* Left clear: the strip runs through here, behind
                          everything, and the two figures read off it. */}
                      <div className="vxh-hero__art" aria-hidden="true" />
                      <p className="vxh-hero__fig vxh-hero__fig--r">
                        A reply within one business day
                      </p>
                    </div>

                  </div>
                </section>

                {/* ==========================================================
                    2. Services — the six, dealt out beside the mark

                    A scroll sequence, not a grid: the stage pins for six steps
                    and one practice arrives at a time, alternating sides of the
                    X. Same card as the bento it replaces — same link, same
                    expand button, same dialog.
                    ========================================================== */}
                  <ServicesScroll
                    cells={ordered.map(([s, role]) => ({
                      service: s,
                      vis: role.vis,
                      img: rimg(region, uploadRel(s.img)),
                    }))}
                    overviews={serviceOverviewsByHref()}
                    region={region}
                    lede="Accounting, transactions, mortgages, valuation, research and technology — six connected practices supporting confident, informed decisions in the UAE."
                  />
                </div>

                {/* ==========================================================
                    3. Who we are — read as you scroll
                    ========================================================== */}
                <section className="vxh-state" aria-labelledby="vxh-state-h">
                  <div className="vxh__in">
                    <div className="vxh-state__grid">
                      <div className="vxh-state__aside">
                        <span className="vxh-eyebrow">Who We Are</span>
                        <h2 className="vxh-h2" id="vxh-state-h">
                          One accountable partner for accounting, tax &amp; advisory in the UAE
                        </h2>
                        <p className="vxh-lede" style={{ margin: '18px 0 24px' }}>
                          Six connected practices, one team answering for all of them.
                        </p>
                        <a className="vxh-link" href={rurl(region, '/about/')}>
                          About VALUNXT <Ico name="arrow" size={16} />
                        </a>
                        <figure className="vxh-state__fig" data-vxn-in="up">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={rimg(region, 'new-folder/about-us-1.webp')}
                            alt="The VALUNXT team in Dubai"
                            loading="lazy"
                            width={900}
                            height={640}
                          />
                          <figcaption>
                            <Ico name="pin" size={14} /> {reg.cities}
                          </figcaption>
                        </figure>
                      </div>
                      <div>
                        <p className="vxh-scrolltext">
                          We are a senior team of accountants, tax advisers and valuers dedicated to
                          one thing: <em>numbers you can act on without second-guessing.</em> Part of
                          the Reliant Surveyors group &#8212; RICS-regulated valuation and
                          evidence-led advisory under one roof, from Dubai to Noida to Mumbai.
                        </p>
                        <ul className="vxh-state__pts">
                          {PRINCIPLES.map((p) => (
                            <li className="vxh-pt" data-vxn-in="up" key={p.t}>
                              <span className="vxh-pt__ic">
                                <Ico name={p.i} size={20} />
                              </span>
                              <Html as="span" className="vxh-pt__t" html={p.t} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ==========================================================
                    4. How we work — the process cards, stacking

                    Five cards cut to the same angle as the stage they sit on.
                    Each one holds a step and the file that step produces, and
                    pins as it reaches the top so the next card climbs over it —
                    the reader ends up looking at a deck, in order, rather than
                    at a list beside a frame that swaps its contents.
                    ========================================================== */}
                <section className="vxh-story vxh-dark" aria-labelledby="vxh-story-h">
                  <Abs variant="waves" mod="soft" />
                  <div className="vxh__in">
                    <div className="vxh-head">
                      <span className="vxh-eyebrow">How We Work</span>
                      <h2 className="vxh-h2" id="vxh-story-h">
                        Every number has to hold up.{' '}
                        <span className="vxh-grad">Here is how we make sure yours does.</span>
                      </h2>
                    </div>

                    <ol className="vxh-pstack">
                      {STORY.map((st, i) => (
                        <li className="vxh-pcard" key={st.t} style={cssVars({ '--n': i })}>
                          <div className="vxh-pcard__in">
                            <div className="vxh-pcard__copy">
                              <span className="vxh-pcard__n">
                                {pad2(i + 1)}
                                <i />
                              </span>
                              <Html as="h3" className="vxh-pcard__t" html={st.t} />
                              <Html as="p" className="vxh-pcard__d" html={st.d} />
                            </div>
                            <div className="vxh-panel vxh-pcard__vis" aria-hidden="true">
                              {storyVisual(i)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </section>

                {/* ==========================================================
                    5. Metrics and the compliance calendar
                    ========================================================== */}
                <section className="vxh-metrics" aria-labelledby="vxh-metrics-h">
                  <div className="vxh__in">
                    <div className="vxh-metrics__grid">
                      <div>
                        <span className="vxh-eyebrow">Our Platform</span>
                        <h2 className="vxh-h2" id="vxh-metrics-h">
                          Six practices. One accountable partner.
                        </h2>
                        <p className="vxh-lede" style={{ margin: '18px 0 32px' }}>
                          Founders, family businesses, developers and private owners work with
                          VALUNXT for accounting, tax, valuation and advisory &#8212; delivered by one
                          team, at a fee agreed before work begins.
                        </p>
                        <ul className="vxh-stats">
                          <li className="vxh-stat">
                            <span className="vxh-stat__n">
                              <span data-vxh-count={services.length}>0</span>
                            </span>
                            <span className="vxh-stat__l">
                              Connected practices, from bookkeeping to valuation, answering to one
                              team
                            </span>
                          </li>
                          <li className="vxh-stat">
                            <span className="vxh-stat__n">
                              <span data-vxh-count={offices.length}>0</span>
                            </span>
                            <span className="vxh-stat__l">Offices &#8212; {vxnMarkets('cities')}</span>
                          </li>
                          <li className="vxh-stat">
                            <span className="vxh-stat__n">
                              <span data-vxh-count="2">0</span>
                            </span>
                            <span className="vxh-stat__l">
                              Core markets, {vxnMarkets('short')}, with cross-border advisory between
                              them
                            </span>
                          </li>
                          <li className="vxh-stat">
                            <span className="vxh-stat__n">
                              <span data-vxh-count="1">0</span>
                              <sup>day</sup>
                            </span>
                            <span className="vxh-stat__l">
                              A reply within one business day, from the partner on your engagement
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="vxh-cal" data-vxn-in="up">
                        <div className="vxh-cal__hd">
                          <span className="vxh-eyebrow">Your year</span>
                          <h3 className="vxh-cal__t">The compliance calendar we track for you</h3>
                          <p className="vxh-cal__sub">
                            Against your financial year, not ours. Shown here for a
                            January&ndash;December year.
                          </p>
                        </div>

                        <div className="vxh-cal__grid">
                          <span className="vxh-cal__corner" aria-hidden="true" />
                          {MONTH_INITIALS.map((m, i) => (
                            <span
                              className={`vxh-cal__m${i + 1 === CAL_NOW ? ' is-now' : ''}`}
                              key={m + i}
                            >
                              {m}
                            </span>
                          ))}

                          {CAL_ROWS.map((row) => (
                            <Fragment key={row.k}>
                              <span className={`vxh-cal__k vxh-cal__k--${row.k}`}>{row.label}</span>
                              {MONTH_INITIALS.map((_, i) => {
                                const on = row.months.includes(i + 1);
                                return (
                                  <span
                                    className={`vxh-cal__c${on ? ` is-on vxh-cal__c--${row.k}` : ''}${
                                      i + 1 === CAL_NOW ? ' is-now' : ''
                                    }`}
                                    key={i}
                                  >
                                    {on ? <i aria-hidden="true" /> : null}
                                    <span className="vxh-cal__sr">
                                      {on ? `${row.label} in ${MONTH_NAMES[i]}` : ''}
                                    </span>
                                  </span>
                                );
                              })}
                            </Fragment>
                          ))}
                        </div>

                        <ul className="vxh-cal__notes">
                          {CAL_ROWS.map((row) => (
                            <li key={row.k}>
                              <i className={`vxh-cal__dot vxh-cal__dot--${row.k}`} aria-hidden="true" />
                              {/* One element, not a bare text run: a grid counts
                                  anonymous text as an item of its own, which put
                                  the note in a 10px column. */}
                              <span>
                                <b>{row.label}</b> {row.note}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ==========================================================
                    6. Find the right solution — the intent stage
                    ========================================================== */}
                <SolveTabs
                  intents={INTENTS.map((t) => ({ tab: t.tab, lede: t.lede, items: t.items }))}
                  region={region}
                />

                {/* ==========================================================
                    7. About Us — the bento
                    ========================================================== */}
                <AboutBento region={region} />

                {/* ==========================================================
                    8. Insights — the article rail
                    ========================================================== */}
                <InsightsRail
                  cards={posts.map(([slug, post]) => ({ slug, post }))}
                  region={region}
                />

                {/* ==========================================================
                    9. Get in touch — the shared enquiry block
                    ========================================================== */}
                <ContactSection region={region} />
              </div>
              {/* /.vxh */}
              <SubscribeSection page={page} region={region} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
