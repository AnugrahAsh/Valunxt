/**
 * A UAE service page — the full detail template (practice or sub-service).
 *
 * Second generation, in the home page's design language: a dark stage with the
 * blue abstract bands and a product-style frame for the practice, a sticky
 * in-page rail, the overview split, the services explorer with its per-service
 * panes, an interactive tool where the practice has one, the deliverables and
 * comparison, a scroll-drawn process stepper, expertise tiles, the gallery, the
 * FAQ, related insights, the other five practices, then the shared "Get in
 * Touch" block and the newsletter band.
 *
 * Copy comes from the UAE registries — the short fields from UAE_SERVICES, the
 * long ones from uaeServiceDetail(), the page furniture from
 * uaeServiceExtras() — so a route only has to say which service it is.
 *
 * A sub-service whose long-form copy has not been written yet inherits its
 * practice's copy, with its own name and lede, so no page is a placeholder.
 *
 * Kit: components/vxh/kit. Styles: /assets/css/vxn-home-ae.css and
 * /assets/css/vxn-services-ae.css (both through page.css). Behaviour:
 * /assets/js/vxn-services-ae.js (through page.js).
 *
 * Port of includes/partials/service-uae.php.
 */
import type { CSSProperties } from 'react';

import { BASE, rurl, vxnRegionData, vxnRegionPhone, vxnServices } from '@/lib/region';
import { rimg } from '@/lib/region-assets';
import { plainText } from '@/lib/html-text';
import { expertiseTiles } from '@/lib/service-overview';
import BLOG_CATALOG, { type BlogCatalogEntry } from '@/data/blog-catalog';
import {
  UAE_SERVICES,
  uaeServicePath,
  type UaeService,
  type UaeSubService,
} from '@/data/uae-services';
import { uaeServiceDetail } from '@/data/uae-service-detail';
import {
  uaeServiceDeliverables,
  uaeServiceExtras,
  uaeServicePoints,
  type UaeTool,
} from '@/data/uae-service-extras';
import { Abs, Ico, Visual, vxhKind, type AbsVariant } from '@/components/vxh/kit';
import Html from '@/components/Html';
import { bespokeFor } from './bespoke';

/** Section artwork, shared across the pages; a practice may override a key. */
const ART: Record<string, string> = {
  what: '/assets/content/uploads/uae-services/1.webp',
  expertise: '/assets/content/uploads/uae-services/3.webp',
};

/** The chip on the hero frame, per product visual. */
const CHIPS: Record<string, string> = {
  ledger: 'Reconciled and filed',
  gauge: 'Signed by an MRICS valuer',
  listing: 'No commission taken',
  bars: 'Compared across the market',
  chart: 'Verified evidence',
  pipe: 'Partner signed off',
};

const TILE_ICONS = ['shield', 'users', 'doc', 'target', 'layers', 'grid', 'globe', 'check'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_INITIALS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

/**
 * A different abstract composition per practice; a sub-service takes the
 * mirrored version of its practice's, so no two pages open on the same artwork.
 */
const ABS_KINDS: AbsVariant[] = ['ribbons', 'helix', 'waves', 'arcs', 'planes', 'orbs'];

/** "01", "02", … */
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** One pane of the services explorer. */
interface ExplorerItem {
  slug: string;
  /** May carry entities. */
  t: string;
  d: string;
  href: string;
  points: string[];
  lede: string;
}

function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}

/* -------------------------------------------------------------------------
   The interactive tools. Each is inert markup that vxn-services-ae.js wires up
   once the page has hydrated — the same division of labour the PHP had.
   ------------------------------------------------------------------------- */

function CalendarTool() {
  return (
    <div className="vxd-calendar" data-vxd-calendar>
      <div className="vxd-field">
        <label>
          Financial year end <output data-fy-out>December</output>
        </label>
        <div className="vxd-seg vxd-fy">
          {MONTHS.map((m, i) => (
            <button key={m + i} type="button" data-fy={i + 1} aria-pressed={i === 11}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="vxh-cal is-in">
        <div className="vxh-cal__hd">
          <div className="vxh-cal__t">
            Calendar year, with your deadlines placed
            <small>
              Corporate tax return within 9 months of year end &middot; VAT returns 28 days after
              each quarter
            </small>
          </div>
          <div className="vxh-cal__legend">
            <span>
              <i style={{ background: '#1436D8' }} />
              VAT return
            </span>
            <span>
              <i style={{ background: '#0B2DBE' }} />
              Corporate tax
            </span>
            <span>
              <i style={{ background: 'rgba(14,36,110,.25)' }} />
              FY end
            </span>
          </div>
        </div>
        <div className="vxh-cal__months">
          {MONTH_INITIALS.map((m, i) => (
            <span key={m + i}>{m}</span>
          ))}
        </div>
        <div className="vxh-cal__track" data-fy-track>
          {MONTH_INITIALS.map((_, i) => (
            <span key={i} />
          ))}
          <span className="vxh-cal__mark vxh-cal__mark--vat" data-k="vat" data-q="1" data-i="0">
            VAT
          </span>
          <span className="vxh-cal__mark vxh-cal__mark--vat" data-k="vat" data-q="2" data-i="1">
            VAT
          </span>
          <span className="vxh-cal__mark vxh-cal__mark--vat" data-k="vat" data-q="3" data-i="2">
            VAT
          </span>
          <span className="vxh-cal__mark vxh-cal__mark--vat" data-k="vat" data-q="4" data-i="3">
            VAT
          </span>
          <span className="vxh-cal__mark vxh-cal__mark--ct" data-k="ct" data-i="4">
            CT
          </span>
          <span className="vxh-cal__mark vxh-cal__mark--fy" data-k="fy" data-i="5">
            FY
          </span>
          <span className="vxh-cal__now" aria-hidden="true" />
        </div>
        <div className="vxh-cal__ft">
          <div>
            <strong>Corporate tax</strong>{' '}
            <span data-ct-text>
              Return and payment due by the end of September, nine months after a December year
              end.
            </span>
          </div>
          <div>
            <strong>VAT</strong> Quarterly returns shown 28 days after each quarter of your year;
            the FTA assigns the actual tax periods on registration.
          </div>
        </div>
      </div>
    </div>
  );
}

function CalcTool() {
  return (
    <div className="vxd-calc" data-vxd-calc>
      <div>
        <div className="vxd-field">
          <label>
            Property value <output data-out="value">AED 2,000,000</output>
          </label>
          <input
            type="range"
            name="value"
            min="500000"
            max="10000000"
            step="50000"
            defaultValue="2000000"
            aria-label="Property value"
          />
        </div>
        <div className="vxd-field">
          <label>Buyer</label>
          <div className="vxd-seg" data-seg="buyer">
            <button type="button" data-v="expat" aria-pressed="true">
              Resident expatriate
            </button>
            <button type="button" data-v="national" aria-pressed="false">
              UAE national
            </button>
            <button type="button" data-v="nonres" aria-pressed="false">
              Non-resident
            </button>
          </div>
        </div>
        <div className="vxd-field">
          <label>Property</label>
          <div className="vxd-seg" data-seg="prop">
            <button type="button" data-v="first" aria-pressed="true">
              First home
            </button>
            <button type="button" data-v="second" aria-pressed="false">
              Subsequent
            </button>
            <button type="button" data-v="offplan" aria-pressed="false">
              Off-plan
            </button>
          </div>
        </div>
        <div className="vxd-field">
          <label>
            Indicative rate <output data-out="rate">4.25%</output>
          </label>
          <input
            type="range"
            name="rate"
            min="3"
            max="7"
            step="0.05"
            defaultValue="4.25"
            aria-label="Interest rate"
          />
        </div>
        <div className="vxd-field">
          <label>
            Term <output data-out="term">25 years</output>
          </label>
          <input
            type="range"
            name="term"
            min="5"
            max="25"
            step="1"
            defaultValue="25"
            aria-label="Term in years"
          />
        </div>
      </div>
      <div className="vxd-out">
        <div className="vxd-out__big">
          <small>Maximum loan, indicative</small>
          <strong data-out="loan">AED 1,600,000</strong>
          <em data-out="ltv">
            80% loan-to-value cap for a resident expatriate, first home up to AED 5m
          </em>
        </div>
        <div className="vxd-out__row">
          <div className="vxd-out__cell">
            <small>Minimum down payment</small>
            <strong data-out="down">AED 400,000</strong>
            <div className="vxd-out__bar">
              <i data-out="downbar" style={cssVars({ '--w': '20%' })} />
            </div>
          </div>
          <div className="vxd-out__cell">
            <small>Monthly repayment</small>
            <strong data-out="pay">AED 8,670</strong>
            <div className="vxd-out__bar">
              <i data-out="paybar" style={cssVars({ '--w': '60%' })} />
            </div>
          </div>
        </div>
        <p className="vxd-out__fine" data-out="note">
          Under UAE Central Bank regulations. Fees, insurance and lender eligibility criteria are
          not included; non-resident caps are set lender by lender. Repayment is a standard annuity
          at the indicative rate.
        </p>
      </div>
    </div>
  );
}

function ChooserTool({ tool, region }: { tool: UaeTool; region: string }) {
  const options = tool.options ?? [];
  return (
    <div data-vxd-chooser>
      <div className="vxd-opts" role="group" aria-label="Options">
        {options.map((o, i) => (
          <button
            key={o.t}
            className="vxd-opt"
            type="button"
            data-opt={i}
            aria-pressed={i === 0}
          >
            <span className="vxd-opt__ic">
              <Ico name={o.i} size={18} />
            </span>
            <Html as="span" html={o.t} />
          </button>
        ))}
      </div>
      {options.map((o, i) => (
        <div key={o.t} className={`vxd-res${i === 0 ? ' is-on' : ''}`} data-res={i} hidden={i !== 0}>
          <div>
            <div className="vxd-res__k">Recommended route</div>
            <Html as="h3" className="vxd-res__h" html={o.r.h} />
            <Html as="p" className="vxd-res__d" html={o.r.d} />
            <a className="vxh-btn vxh-btn--outline" href={rurl(region, o.r.href)}>
              <Html as="span" html={`Explore ${o.r.h} `} />
              <Ico name="arrow" size={15} />
            </a>
          </div>
          <div>
            <div className="vxd-res__k">How it runs</div>
            <ol className="vxd-res__steps">
              {o.r.steps.map((st, si) => (
                <li key={st} style={cssVars({ '--i': si })}>
                  <b>{si + 1}</b>
                  <Html as="span" html={st} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReadinessTool({ tool, region }: { tool: UaeTool; region: string }) {
  return (
    <div data-vxd-readiness>
      <div className="vxd-q">
        {(tool.questions ?? []).map((q, i) => (
          <div className="vxd-q__row" key={q.q}>
            <Html as="span" html={q.q} />
            <div className="vxd-seg" data-q={i}>
              <button type="button" data-v="1" aria-pressed="false">
                Yes
              </button>
              <button type="button" data-v="0" aria-pressed="true">
                No
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="vxd-score">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <linearGradient id="vxdScore" x1="0" x2="1">
              <stop offset="0" stopColor="#1436D8" />
              <stop offset="1" stopColor="#4F78FF" />
            </linearGradient>
          </defs>
          <circle className="t" cx="60" cy="60" r="50" />
          <circle className="f" cx="60" cy="60" r="50" style={cssVars({ '--p': 0 })} />
          <text x="60" y="68" textAnchor="middle" data-score>
            0/3
          </text>
        </svg>
        <div>
          {(tool.results ?? []).map((r, i) => (
            <div
              key={r.h}
              className={`vxd-res${i === 0 ? ' is-on' : ''}`}
              data-res={i}
              style={{ gridTemplateColumns: '1fr' }}
              hidden={i !== 0}
            >
              <div>
                <div className="vxd-res__k">Where to start</div>
                <Html as="h3" className="vxd-res__h" html={r.h} />
                <Html as="p" className="vxd-res__d" html={r.d} />
                <a className="vxh-btn vxh-btn--outline" href={rurl(region, r.href)}>
                  <Html as="span" html={`${r.sub} `} />
                  <Ico name="arrow" size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */

export default function ServiceDetailBody({
  region,
  slug,
  child,
}: {
  region: string;
  /** The practice slug. */
  slug: string;
  /** The sub-service slug, on a sub-service page. */
  child?: string | null;
}) {
  const service: UaeService | undefined = UAE_SERVICES[slug];
  const sub: UaeSubService | undefined = child ? service?.children[child] : undefined;

  /* A sub-service with no copy of its own inherits its practice's, keeping its
     own name and lede — so no page is ever a placeholder. */
  const detail = uaeServiceDetail(child ? `${slug}/${child}` : slug) ?? (child ? uaeServiceDetail(slug) : null);
  if (!service || (child && !sub) || !detail) return null;

  const page = sub ?? service;
  const titlePlain = plainText(page.title);
  const practicePlain = plainText(service.title);
  const kind = vxhKind(slug);

  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const tel = reg.tel;

  /* The icon token for each practice, from the market registry. */
  const icons: Record<string, string> = {};
  for (const s of vxnServices(region)) icons[s.href.replace(/^\/+|\/+$/g, '')] = s.icon ?? 'doc';
  const icon = icons[`services/${slug}`] ?? 'doc';

  const art = { ...ART, ...(service.art ?? {}) };

  /* The two sections this practice owns. A page with none keeps the
     template's own — see components/pages/uae-services/bespoke. */
  const own = bespokeFor(slug);

  const tiles = expertiseTiles(detail.expertise);
  const tilesOk = tiles.length >= 2 && tiles[0].t !== '';

  const extras = uaeServiceExtras(slug) ?? {};
  const tool = extras.tool;
  const gallery = extras.gallery ?? [service.img];
  const deliverables = uaeServiceDeliverables(slug);

  /* Related insights: the practice's own category first, then whatever fills
     the row to three. */
  const posts = BLOG_CATALOG;
  const related: [string, BlogCatalogEntry][] = [];
  for (const [k, v] of Object.entries(posts)) {
    if (extras.insight && extras.insight === v.category) related.push([k, v]);
  }
  for (const [k, v] of Object.entries(posts)) {
    if (related.length >= 3) break;
    if (!related.some(([rk]) => rk === k)) related.push([k, v]);
  }
  const relatedTop = related.slice(0, 3);

  const absIndex = Math.max(0, Object.keys(UAE_SERVICES).indexOf(slug));
  const absHero = ABS_KINDS[absIndex % 6];
  const absAlt = ABS_KINDS[(absIndex + 2) % 6];
  const absAlt2 = ABS_KINDS[(absIndex + 4) % 6];

  /* The explorer: an overview pane, then one pane per sub-service. A
     sub-service page leads with itself. */
  let explorer: ExplorerItem[] = Object.entries(service.children).map(([k, v]) => {
    const own = uaeServiceDetail(`${slug}/${k}`);
    return {
      slug: k,
      t: v.title,
      d: v.lede,
      href: uaeServicePath(slug, k),
      points: uaeServicePoints(k),
      lede: own ? (own.what.p[0] ?? v.lede) : v.lede,
    };
  });
  if (child) {
    const self = explorer.filter((x) => x.slug === child);
    explorer = [...self, ...explorer.filter((x) => x.slug !== child)];
  }

  /* The in-page rail, in the order the sections actually appear. */
  const rail: [string, string][] = [
    ['#vxd-what', 'Overview'],
    ['#vxd-offer', child ? 'Related services' : 'Services offered'],
  ];
  if (tool) rail.push(['#vxd-tool', 'Try it']);
  if (deliverables.length) rail.push(['#vxd-del', 'What you receive']);
  rail.push(['#vxd-process', 'Our process']);
  rail.push(['#vxd-faq', 'FAQ']);
  rail.push(['#vxd-contact', 'Get in touch']);

  const comparison: [string, string, string][] = [
    ['Fee', 'Hourly, invoiced after the fact', 'Fixed, agreed in writing before work begins'],
    [
      'Who does the work',
      'Handed to a junior once the letter is signed',
      'A named senior adviser, start to finish',
    ],
    ['Evidence', 'Assertions and templates', 'Verified data and a documented method'],
    [
      'Deadlines',
      'Chased in the week they fall due',
      'Tracked against your financial year, firm-wide',
    ],
    [
      'Conflicts',
      'Commissions, inventory, referral fees',
      'No inventory, no commissions &mdash; your side only',
    ],
    ['Response', 'When someone gets to it', 'Within one business day'],
  ];

  const galleryCaptions = [`${plainText(service.short)} at VALUNXT`, 'Senior people on every mandate', reg.cities];

  const faqLd = extras.faq?.length
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: extras.faq.map((q) => ({
          '@type': 'Question',
          name: plainText(q.q),
          acceptedAnswer: { '@type': 'Answer', text: plainText(q.a) },
        })),
      })
    : null;

  return (
    <div className="vxh vxd">
      {/* ==========================================================
          The stage

          A breadcrumb, the name, one sentence, one action — and the
          practice's own photograph beside it. What was here before: a
          second ghost button, a phone number, three trust bullets with
          icons, a mocked-up product card with a "Live" pill and a mini UI
          in it, a chip on its corner, two floating cards, and then four
          counters immediately underneath. Eleven things competing on the
          first screen of a page whose job is to say what the practice is.

          Each page draws a different abstract behind the photograph —
          the variant is indexed off the practice's position in the
          registry, so no two of the six open the same way.
          ========================================================== */}
      <section className={`vxd-hero vxd-hero--a${absIndex % 6}`} aria-label={titlePlain}>
        <Abs variant={absHero} mod="light" flip={!!child} />
        <div className="vxh__in">
          <nav className="vxh-crumb vxd-hero__crumb" aria-label="Breadcrumb">
            <a href={rurl(region, '/')}>Home</a>
            <i />
            <a href={rurl(region, '/services/')}>Services</a>
            <i />
            {child ? (
              <>
                <Html as="a" href={rurl(region, uaeServicePath(slug))} html={service.title} />
                <i />
              </>
            ) : null}
            <Html as="b" html={page.title} />
          </nav>

          <Html as="h1" className="vxd-hero__h" html={page.title} />

          <div className="vxd-hero__foot">
            <Html as="p" className="vxd-hero__lede" html={page.lede} />
            <a className="vxh-btn vxh-btn--blue vxd-hero__cta" href={rurl(region, '/free-consultation/')}>
              Book a free consultation <Ico name="ne" size={16} />
            </a>
          </div>
        </div>

        {/* Full width, and the only picture on the page. Each practice carries
            its own, so no two of the six open on the same image. */}
        <figure className="vxd-hero__band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={rimg(region, service.img.replace('/assets/content/uploads/', ''))}
            alt=""
            width={2400}
            height={1000}
            fetchPriority="high"
          />
        </figure>
      </section>

      <div className="vxd-body">
        <nav className="vxh-snav" aria-label="On this page">
          <div className="vxh-snav__in">
            {rail.map(([href, label], i) => (
              <a key={href} href={href}>
                <span className="n">{pad2(i + 1)}</span>
                {label}
              </a>
            ))}
            <span className="vxh-snav__ind" aria-hidden="true" />
            <span className="vxh-snav__cta">
              <a className="vxh-btn vxh-btn--blue" href={rurl(region, '/free-consultation/')}>
                Talk to a partner <Ico name="ne" size={14} />
              </a>
            </span>
          </div>
        </nav>

        {/* 01 Overview */}
        {/* ==========================================================
            What we do — the statement, and who it is for.

            It had a photograph with three floating pills on it beside the
            copy. The hero now carries the one picture on the page, so this
            is type: the claim at heading size, the case for it beneath at a
            readable measure, and the audience on one hairline.
            ========================================================== */}
        <section className="vxd-what vxd-sec" id="vxd-what" aria-labelledby="vxd-what-h">
          <div className="vxh__in">
            <span className="vxh-eyebrow">What We Do</span>
            <Html as="h2" className="vxd-what__h" id="vxd-what-h" html={detail.what.title} />
            <div className="vxd-what__body">
              {detail.what.p.slice(0, 2).map((p, i) => (
                <Html key={i} as="p" html={p} />
              ))}
            </div>
            {extras.audience?.length ? (
              <p className="vxd-what__aud">
                <span>For</span>
                {extras.audience.map((aud, i) => (
                  <Html key={aud} as="span" className="vxd-what__a" html={(i ? '· ' : '') + aud} />
                ))}
              </p>
            ) : null}
          </div>
        </section>

        {/* ==========================================================
            Services offered — the list, as a list.

            It was a tabbed explorer: a rail of buttons with progress bars
            down one side, a screen with panes and an abstract behind them,
            and a script to drive all of it — to show what is really a table
            of contents. These are rows, each one a link to the page it names.
            ========================================================== */}
        <section className="vxd-offer vxd-sec" id="vxd-offer" aria-labelledby="vxd-offer-h">
          <div className="vxh__in">
            <div className="vxd-offer__head">
              <div>
                <span className="vxh-eyebrow">{child ? 'Related Services' : 'Services Offered'}</span>
                <Html as="h2" className="vxd-offer__h" id="vxd-offer-h" html={detail.offer.title} />
              </div>
              <Html as="p" className="vxd-offer__lede" html={detail.offer.text} />
            </div>

            <ol className="vxd-offer__list">
              {explorer.map((x, i) => (
                <li data-vxn-in="up" key={x.slug}>
                  <a href={x.href}>
                    <span className="vxd-offer__n">{pad2(i + 1)}</span>
                    <Html as="span" className="vxd-offer__t" html={x.t} />
                    <Html as="span" className="vxd-offer__d" html={x.d} />
                    <Ico name="ne" size={16} />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* This practice's own first section, where the shared tool used to
            be. A practice with none yet keeps the tool. */}
        {own.A ?? (tool ? (
          <section className="vxd-tool vxd-sec" id="vxd-tool" aria-labelledby="vxd-tool-h">
            <Abs variant={absAlt} mod="light" flip />
            <div className="vxh__in">
              <div className="vxd-tool__grid">
                <div className="vxd-tool__aside">
                  <span className="vxh-eyebrow">Try It</span>
                  <Html as="h2" className="vxh-h2" id="vxd-tool-h" html={tool.title} />
                  <Html as="p" className="vxh-lede" html={tool.text} />
                  <div className="vxd-tool__note">
                    <Ico name="shield" size={16} />
                    <span>
                      Illustrative, not advice. A partner confirms what applies to your position
                      &mdash; free, and before any fee is quoted.
                    </span>
                  </div>
                  <p style={{ marginTop: 20 }}>
                    <a className="vxh-btn vxh-btn--blue" href={rurl(region, '/free-consultation/')}>
                      Ask a partner <Ico name="ne" size={16} />
                    </a>
                  </p>
                </div>
                <div className="vxd-panel" data-vxn-in="up">
                  {tool.kind === 'calendar' ? <CalendarTool /> : null}
                  {tool.kind === 'calc' ? <CalcTool /> : null}
                  {tool.kind === 'chooser' ? <ChooserTool tool={tool} region={region} /> : null}
                  {tool.kind === 'readiness' ? <ReadinessTool tool={tool} region={region} /> : null}
                </div>
              </div>
            </div>
          </section>
        ) : null)}


        {/* What you receive */}
        {deliverables.length ? (
          <section className="vxd-del vxd-sec" id="vxd-del" aria-labelledby="vxd-del-h">
            <div className="vxh__in">
              <div className="vxd-del__grid">
                <div>
                  <span className="vxh-eyebrow">What You Receive</span>
                  <h2 className="vxh-h2" id="vxd-del-h">
                    Deliverables you can hold, not promises.
                  </h2>
                  <p className="vxh-lede" style={{ marginTop: 16 }}>
                    Every <Html as="span" html={service.short} /> engagement ends with these in your
                    file.
                  </p>
                  <ul className="vxd-del__list">
                    {deliverables.map((d, i) => (
                      <li className="vxd-del__item" data-vxn-in="up" key={d.t}>
                        <span className="vxd-del__ic" style={cssVars({ '--i': i })}>
                          <Ico name={d.i} size={20} />
                        </span>
                        <span>
                          <Html as="span" className="vxd-del__t" style={{ display: 'block' }} html={d.t} />
                          <Html as="span" className="vxd-del__d" style={{ display: 'block' }} html={d.d} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="vxd-cmp" data-vxd-compare data-vxn-in="up">
                  <div className="vxd-cmp__hd">
                    <strong>How the engagement runs</strong>
                    <div className="vxd-toggle" data-side="b">
                      <button type="button" data-side="a">
                        Typical firm
                      </button>
                      <button type="button" data-side="b" className="is-on">
                        VALUNXT
                      </button>
                    </div>
                  </div>
                  <div className="vxd-cmp__rows">
                    {comparison.map(([k, no, yes]) => (
                      <div className="vxd-cmp__row" key={k}>
                        <span className="vxd-cmp__k">{k}</span>
                        <span className="vxd-cmp__v">
                          <span className="no" data-side="a">
                            <Ico name="clock" size={15} />
                            <Html as="span" html={no} />
                          </span>
                          <span className="yes is-on" data-side="b">
                            <Ico name="check" size={15} />
                            <Html as="span" html={yes} />
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="vxd-cmp__ft">
                    The right-hand column is what every VALUNXT engagement commits to. Toggle to see
                    what it replaces.
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Process */}
        {/* ==========================================================
            Our process — four rules.

            It was a navy panel with an abstract behind it, a split heading,
            four steps joined by a drawn line and a row of three more claims
            under them. The page already has one dark band; this is the
            sequence, on white, in the fewest marks that can carry it.
            ========================================================== */}
        <section className="vxd-process vxd-sec" id="vxd-process" aria-labelledby="vxd-process-h">
          <div className="vxh__in">
            <span className="vxh-eyebrow">Our Process</span>
            <Html as="h2" className="vxd-process__h" id="vxd-process-h" html={detail.process.title} />
            <ol className="vxd-process__steps">
              {detail.process.steps.map((st, i) => (
                <li data-vxn-in="up" key={st[0]}>
                  <span className="vxd-process__n">{pad2(i + 1)}</span>
                  <Html as="span" className="vxd-process__t" html={st[0]} />
                  <Html as="span" className="vxd-process__d" html={st[1]} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* And its own second, closing the body. */}
        {own.B}

        {/* FAQ */}
        {extras.faq?.length ? (
          <section className="vxd-faq vxd-sec" id="vxd-faq" aria-labelledby="vxd-faq-h">
            <div className="vxh__in">
              <div className="vxd-faq__grid">
                <div className="vxd-faq__aside">
                  <span className="vxh-eyebrow">Questions</span>
                  <h2 className="vxh-h2" id="vxd-faq-h">
                    What people ask before they engage.
                  </h2>
                  <p className="vxh-lede" style={{ marginTop: 16 }}>
                    Straight answers, from what we commit to on every{' '}
                    <Html as="span" html={service.short} /> engagement.
                  </p>
                  <p style={{ marginTop: 22 }}>
                    <a className="vxh-link" href={rurl(region, '/faq/')}>
                      All questions <Ico name="arrow" size={16} />
                    </a>
                  </p>
                </div>
                <div className="vxd-faq__list">
                  {extras.faq.map((q, i) => (
                    <details key={q.q} open={i === 0}>
                      <summary>
                        <Html as="span" html={q.q} />
                        <i>
                          <Ico name="arrow" size={14} />
                        </i>
                      </summary>
                      <Html className="vxd-faq__a" html={q.a} />
                    </details>
                  ))}
                </div>
              </div>
            </div>
            {faqLd ? (
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
            ) : null}
          </section>
        ) : null}

        {/* What the "other practices" grid was for, in one line: the six are a
            family, and any of them is one click away. */}
        <nav className="vxd-fam" aria-label="Our practices">
          <div className="vxh__in">
            <span className="vxd-fam__k">Six connected practices, one accountable team</span>
            <ul>
              {Object.entries(UAE_SERVICES).map(([oslug, o]) => (
                <li key={oslug}>
                  <a
                    href={uaeServicePath(oslug)}
                    aria-current={oslug === slug ? 'page' : undefined}
                  >
                    <Html as="span" html={o.short} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
