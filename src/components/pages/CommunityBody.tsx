/**
 * /community/ — the people around the practice.
 *
 * The captured section carried a tab strip, an accordion and a slide carousel,
 * each with its own script, to present three audiences and five formats. Three
 * interaction patterns on one page is two more than the content needs: this is a
 * list of who is in the room and a list of what happens in it.
 *
 * The photographs stay, as a band between the two lists — they are the only
 * evidence on the page that any of this actually happens.
 */
import { rurl, vxnRegionData, vxnRegionPhone } from '@/lib/region';
import { rimg } from '@/lib/region-assets';
import { vxnMarkets } from '@/lib/site-data';
import { Ico } from '@/components/vxh/kit';
import { Faq, Head, Newsletter, PageHero, Ready, type FaqItem } from '@/components/vxh/PageKit';
import Html from '@/components/Html';

/** Who the community is, and what each group gets from it. */
const WHO: Array<{ k: string; t: string; d: string; to: string; go: string }> = [
  {
    k: 'Investors & families',
    t: 'Relationships built to compound.',
    d: 'Private investors, HNIs and family offices sit at the centre of it. Every relationship begins with your objectives and risk appetite, and is supported by independent research, curated opportunities and advisers who stay close long after the first mandate.',
    to: '/clients/',
    go: 'How we act for private capital',
  },
  {
    k: 'Partners & group',
    t: 'One ecosystem, four firms.',
    d: 'Surveying, property, mortgage and corporate services under one group. Partners plug into a single network — sharing intelligence, referrals and on-the-ground reach so clients move faster with fewer intermediaries.',
    to: '/partnership/',
    go: 'Ways to partner with us',
  },
  {
    k: 'Developers & institutions',
    t: 'Capital, structured with discipline.',
    d: 'From feasibility and underwriting to investor syndication and transparent reporting — institutional-grade rigour on projects and portfolios where the numbers have to survive a committee.',
    to: '/services/',
    go: 'The practices behind it',
  },
];

/** What actually happens. Five formats, one line each. */
const FORMATS: Array<[string, string]> = [
  ['Investor briefings', 'A direct read on live opportunities, pipelines, and where we see value across cycles.'],
  ['Market outlook sessions', 'Pricing, supply, yields and regulation, drawn from our own research desk.'],
  ['Private roundtables', 'Small, closed-door conversations around a single theme.'],
  ['Family office forums', 'Governance, succession and disciplined allocation for multi-generational capital.'],
  ['NRI investor meetups', 'In person and virtual, with clarity on structuring, repatriation and compliance.'],
];

const SHOTS: Array<[string, string]> = [
  ['new-folder/research-intelligence-2.webp', 'Research & intelligence briefing'],
  ['new-folder/client-success-2.webp', 'Family office advisory session'],
];

const FAQ: FaqItem[] = [
  {
    q: 'How do I get invited?',
    a: '<p>Ask. Sessions are small by design rather than exclusive by policy — tell us which of the five formats is relevant to you and we will put you on the list for the next one.</p>',
  },
  {
    q: 'Is there a fee?',
    a: '<p>No. Briefings, outlook sessions and roundtables are hosted by the group and cost nothing to attend.</p>',
  },
  {
    q: 'Are they in person or online?',
    a: `<p>Both. Roundtables and forums are usually in person in ${vxnMarkets(
      'cities',
    )}; briefings and outlook sessions run online so people in either market can join the same conversation.</p>`,
  },
  {
    q: 'Will I be sold to?',
    a: '<p>No. A session that turns into a pitch is a session nobody comes back to. What is presented is what the research desk has actually found, including where it disagrees with the consensus.</p>',
  },
];

export default function CommunityBody({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <PageHero
            region={region}
            crumb={[['Community']]}
            eyebrow="Community"
            title='The people <span class="vxh-grad">around the practice.</span>'
            lede="Investors, families, partners and institutions who compare notes with each other as much as with us — in briefings, roundtables and forums across both markets."
            action={{ label: 'Ask to be invited', href: rurl(region, '/contact/') }}
            bg={{ abs: 'arcs' }}
            par="ghost"
            meta={[
              ['Formats', 'Five'],
              ['Where', vxnMarkets('cities')],
              ['Cost', 'None'],
              ['Size', 'Small, by design'],
            ]}
          />

          {/* Who is in it. */}
          <section className="vxm-who vxp-sec" aria-labelledby="vxm-who-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="Who Is In It"
                title="Three groups, one room."
                id="vxm-who-h"
                lede="What makes it worth attending is that these three are in the same conversation rather than three separate mailing lists."
              />
              <ol className="vxm-who__list">
                {WHO.map((w, i) => (
                  <li key={w.k} data-vxn-in="up">
                    <span className="vxm-who__n">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="vxm-who__k">{w.k}</span>
                      <Html as="h3" className="vxm-who__t" html={w.t} />
                      <Html as="p" className="vxm-who__d" html={w.d} />
                      <a className="vxh-link vxm-who__go" href={rurl(region, w.to)}>
                        {w.go} <Ico name="arrow" size={15} />
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* The evidence that it happens. */}
          <section className="vxm-shots" aria-label="From recent sessions">
            <div className="vxh__in">
              <div className="vxm-shots__grid">
                {SHOTS.map(([src, cap], i) => (
                  <figure key={src} data-vxh-par={i ? 'sink' : 'rise'}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rimg(region, src)} alt="" loading="lazy" width={900} height={600} />
                    <figcaption>{cap}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* What happens. */}
          <section className="vxp-sec vxp-sec--cream" aria-labelledby="vxm-fmt-h">
            <div className="vxh__in">
              <Head eyebrow="What We Host" title="Five formats, and nothing else." id="vxm-fmt-h" />
              <ol className="vxp-rows">
                {FORMATS.map(([t, d], i) => (
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

          <Faq items={FAQ} title="Before you come." />

          <Ready
            region={region}
            eyebrow="Join The Next One"
            title="Say which conversation you want to be in."
            lede="Tell us the format and the market, and we will put you on the list for the next session."
            phone={phone}
            tel={reg.tel}
            hours={`${reg.hours} · ${reg.cities}`}
            abs="waves"
          />
          <Newsletter region={region} />
        </div>
      </div>
    </div>
  );
}
