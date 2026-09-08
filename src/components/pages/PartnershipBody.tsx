/**
 * /partnership/ — how the group works with other firms.
 *
 * Same content as the captured page: why partner, the six models, how a
 * partnership begins, and what the group brings. What has gone is the packaging
 * — six panels with icons, a four-step diagram with a drawn connector, and the
 * same "Start a Partnership Conversation" button three times on one page.
 *
 * The six models are the substance, so they are the largest thing here; the
 * four steps are a sequence, so they are numbered rows; and there is one action,
 * at the end, where somebody who has read the page would look for it.
 */
import { rurl, vxnRegionData, vxnRegionPhone, vxnServices } from '@/lib/region';
import { vxnMarkets } from '@/lib/site-data';
import { plainText } from '@/lib/html-text';
import { Ico } from '@/components/vxh/kit';
import { Faq, Head, Newsletter, PageHero, Ready, type FaqItem } from '@/components/vxh/PageKit';
import Html from '@/components/Html';

/** The six ways the group partners, each with what it actually means. */
const MODELS: Array<[string, string]> = [
  ['Developer & project partnerships', 'Feasibility, positioning and capital for a specific scheme, from land to launch.'],
  ['Institutional & capital alliances', 'Co-underwriting and structured mandates with funds, lenders and family capital.'],
  ['Channel & referral partnerships', 'Advisers and intermediaries who need a practice behind them, on disclosed terms.'],
  ['Research & intelligence collaboration', 'Joint publication and shared data, with method and attribution agreed first.'],
  ['Technology & platform integration', 'Our analytics inside your product, or yours inside ours.'],
  ['Co-investment & joint ventures', 'Aligned capital where we hold a position alongside the partner.'],
];

/** How one begins. Four steps, and none of them is "sign here". */
const STEPS: Array<[string, string]> = [
  ['Introductory discussion', 'What you are trying to build, and whether we are the right people to build it with.'],
  ['Alignment & due diligence', 'Fit, shared value, and the conflicts either side would have to manage.'],
  ['Structuring', 'Terms, roles and economics, written down before anything is announced.'],
  ['Execution & growth', 'Delivery against the terms, and a review that can end it as easily as extend it.'],
];

const FAQ: FaqItem[] = [
  {
    q: 'What kind of partner are you looking for?',
    a: '<p>One with something we do not have — a market position, a data set, a distribution channel, a balance sheet. A partnership that duplicates what both sides already do is a press release, not a partnership.</p>',
  },
  {
    q: 'Do you pay referral fees?',
    a: '<p>Where a channel partnership is the right structure, yes, on terms recorded in writing and disclosed to the client. We do not take or pay undisclosed introductions.</p>',
  },
  {
    q: 'Can we co-publish research?',
    a: '<p>Yes, and it is one of the more common arrangements. Method, data provenance and attribution are agreed before the work starts, because a joint report that cannot say where its numbers came from is worth less than either side publishing alone.</p>',
  },
  {
    q: 'How long does it take to get started?',
    a: '<p>An introductory conversation happens within a week. Everything after that depends on the structure — a referral arrangement can be documented in days, a co-investment takes as long as diligence takes.</p>',
  },
];

export default function PartnershipBody({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const services = vxnServices(region);

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <PageHero
            region={region}
            crumb={[['Partnership']]}
            eyebrow="Partnership"
            title='Partnerships built to <span class="vxh-grad">outlast a deal.</span>'
            lede="Whether you are structuring capital, launching a development, expanding across borders or building intelligence-led products, the group brings the network, the evidence and the execution to move from strategy to results."
            action={{ label: 'Start a conversation', href: rurl(region, '/contact/') }}
            bg={{ abs: 'planes' }}
            par="sway"
            meta={[
              ['Models', 'Six'],
              ['Markets', vxnMarkets('long')],
              ['Practices behind it', String(services.length)],
              ['Terms', 'Written before announced'],
            ]}
          />

          {/* The six models. */}
          <section className="vxn-models vxp-sec" aria-labelledby="vxt-mod-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="Partnership Models"
                title="Six ways in, and what each one means."
                id="vxt-mod-h"
                lede="Every partnership is structured for what it is actually for. These are the shapes that structure usually takes."
              />
              <ol className="vxt-models">
                {MODELS.map(([t, d], i) => (
                  <li key={t} data-vxn-in="up">
                    <span className="vxt-models__n" data-vxh-par="slide">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Html as="h3" className="vxt-models__t" html={t} />
                    <Html as="p" className="vxt-models__d" html={d} />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* How it begins. */}
          <section className="vxp-sec vxp-sec--cream" aria-labelledby="vxt-step-h">
            <div className="vxh__in">
              <Head eyebrow="Our Process" title="How a partnership begins." id="vxt-step-h" />
              <ol className="vxp-rows">
                {STEPS.map(([t, d], i) => (
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

          {/* What sits behind a partnership: the practices, linked. */}
          <section className="vxp-sec" aria-labelledby="vxt-cap-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="What Is Behind It"
                title="A partner does not get one practice."
                id="vxt-cap-h"
                lede="Whatever the structure, the whole group is on the other side of it."
              />
              <ol className="vxp-rows">
                {services.map((s, i) => (
                  <li key={s.href} data-vxn-in="up">
                    <a className="vxp-row" href={rurl(region, s.href)}>
                      <span className="vxp-row__n">{String(i + 1).padStart(2, '0')}</span>
                      <Html as="span" className="vxp-row__t" html={s.title} />
                      <Html as="span" className="vxp-row__d" html={s.desc} />
                      <Ico name="ne" size={16} />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <Faq items={FAQ} title="Before you propose one." />

          <Ready
            region={region}
            eyebrow="Let's Explore It"
            title="Tell us what you would bring."
            lede={`We work with partners across ${plainText(
              vxnMarkets('long'),
            )} — in person, by video, and on whatever cadence suits your organisation.`}
            phone={phone}
            tel={reg.tel}
            hours={`${reg.hours} · ${reg.cities}`}
            abs="helix"
          />
          <Newsletter region={region} />
        </div>
      </div>
    </div>
  );
}
