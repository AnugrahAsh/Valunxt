/**
 * /research/ — Research & Reports.
 *
 * The captured page listed four reports as bordered cards and linked to none of
 * them, with a "Load More" that loaded nothing. Every one of those reports now
 * has a page, so this is an index that goes there: the reports read from the
 * page registry rather than a second copy of their own titles, which is what
 * makes a dead link here impossible.
 *
 * The second half is the part the old page never said — how the desk actually
 * works, and what it will not do. That is the reason to trust a report, and it
 * was missing from the page whose job is to be trusted.
 */
import { BASE, rurl, vxnRegionData, vxnRegionPhone } from '@/lib/region';
import { vxnMarkets } from '@/lib/site-data';
import { pageConfig } from '@/lib/pages';
import { Ico } from '@/components/vxh/kit';
import { Faq, Head, Newsletter, PageHero, Ready, type FaqItem } from '@/components/vxh/PageKit';

/** The published reports, newest first. Slugs are the URLs — see research/[slug]. */
const REPORTS: Array<{ slug: string; tag: string; date: string }> = [
  { slug: 'insights-2026', tag: 'Outlook', date: 'April 2026' },
  { slug: 'india-real-estate-outlook-2026', tag: 'Market Report', date: 'March 2026' },
  { slug: 'dubai-residential-market-review', tag: 'Regional Report', date: 'February 2026' },
  { slug: 'nri-investment-trends', tag: 'Investor Insights', date: 'January 2026' },
  { slug: 'commercial-yields-capital-values', tag: 'Sector Report', date: 'December 2025' },
];

/** How the desk works. Four steps, because a fifth would be process theatre. */
const METHOD: Array<[string, string]> = [
  ['Primary data first', 'Transactions, listings and registry records we have collected or verified ourselves.'],
  ['On the ground', 'What the numbers say, checked against what our own people see in the market.'],
  ['Method written down', 'Every figure traceable to its source, so a reader can disagree with the method rather than the conclusion.'],
  ['Published regardless', 'A report says what the evidence says, whether or not it suits a live mandate.'],
];

const FAQ: FaqItem[] = [
  {
    q: 'Is the research independent of your transaction business?',
    a: '<p>Yes. The desk publishes on its own schedule and its conclusions are not conditioned on group transaction activity. Where a research view and a group commercial interest could point in different directions, the engagement letter records the conflict and how it is managed.</p>',
  },
  {
    q: 'Can I commission a report on something you have not covered?',
    a: '<p>Usually, yes — bespoke research is a normal part of the practice. What is published here is the subset we make freely available; commissioned work covers the specific corridor, asset class or question you need.</p>',
  },
  {
    q: 'Do you use automated valuation models?',
    a: '<p>As one input, not as the answer. AVMs are fast and consistent for liquid, data-rich segments and suit screening and portfolio-level views. Unique assets, thin comparable evidence and fast-moving markets are where they break down — and those are the situations clients bring us.</p>',
  },
  {
    q: 'Is any of this investment advice?',
    a: '<p>No. Everything published here is general information. It does not take account of your circumstances and should not be relied on as financial, investment, tax or legal advice. Advice only arises under a signed engagement.</p>',
  },
];

export default function ResearchBody({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);

  const reports = REPORTS.map((r) => {
    const cfg = pageConfig(`/research/${r.slug}/`);
    return {
      ...r,
      title: cfg?.hero_title ?? cfg?.post_excerpt ?? r.slug,
      desc: cfg?.desc ?? '',
      img: cfg?.hero_image ?? '',
      href: rurl(region, `/research/${r.slug}/`),
    };
  }).filter((r) => r.title !== r.slug);

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <PageHero
            region={region}
            crumb={[['Research & Reports']]}
            eyebrow="Research &amp; Reports"
            title='Evidence, <span class="vxh-grad">published.</span>'
            lede={`Independent research on the markets we operate in &mdash; ${vxnMarkets(
              'short',
            )} &mdash; grounded in primary data, on-the-ground intelligence and the discipline we bring to every mandate.`}
            action={{ label: 'Commission a report', href: rurl(region, '/contact/') }}
            bg={{ abs: 'waves' }}
            par="sink"
            meta={[
              ['Published', `${reports.length} reports`],
              ['Coverage', vxnMarkets('short')],
              ['Cost', 'Free to read'],
              ['Desk', 'Independent of transactions'],
            ]}
          />

          {/* The reports. */}
          <section className="vxr-list vxp-sec" aria-labelledby="vxr-list-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="The Library"
                title="What the desk has published."
                id="vxr-list-h"
                lede="Free to read, in full, with no form in front of them."
              />
              <ol className="vxr-reports">
                {reports.map((r, i) => (
                  <li key={r.slug} data-vxn-in="up">
                    <a className="vxr-report" href={r.href}>
                      <figure className="vxr-report__fig">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={BASE + r.img}
                          alt=""
                          loading={i ? 'lazy' : 'eager'}
                          width={640}
                          height={420}
                          data-vxh-par="zoom"
                        />
                      </figure>
                      <span className="vxr-report__meta">
                        <b>{r.tag}</b>
                        <i />
                        {r.date}
                      </span>
                      <span className="vxr-report__t">{r.title}</span>
                      <span className="vxr-report__d">{r.desc}</span>
                      <span className="vxr-report__go">
                        Read the report <Ico name="ne" size={14} />
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* How the desk works. */}
          <section className="vxp-sec vxp-sec--cream" aria-labelledby="vxr-meth-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="Method"
                title="Why you can argue with it."
                id="vxr-meth-h"
                lede="A report you cannot check is a press release. Every figure here is traceable to where it came from."
              />
              <ol className="vxp-rows">
                {METHOD.map(([t, d], i) => (
                  <li key={t} data-vxn-in="up">
                    <div className="vxp-row">
                      <span className="vxp-row__n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="vxp-row__t">{t}</span>
                      <span className="vxp-row__d">{d}</span>
                      <span />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <Faq items={FAQ} title="About the research." />

          <Ready
            region={region}
            eyebrow="Commission Work"
            title="Ask the desk a question of your own."
            lede="Bespoke research covers the corridor, asset class or decision you actually face. Tell us the question and we will scope it."
            phone={phone}
            tel={reg.tel}
            hours={`${reg.hours} · ${reg.cities}`}
            abs="orbs"
          />
          <Newsletter
            region={region}
            title="New research, when it is published."
            note="The desk's own notes on India and the UAE. No more than monthly, and never a sales email."
          />
        </div>
      </div>
    </div>
  );
}
