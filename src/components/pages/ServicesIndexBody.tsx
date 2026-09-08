/**
 * /services/ — the services index, for both markets.
 *
 * WHAT IT REPLACES. Two different pages. India's was a thousand lines of
 * captured Elementor naming four verticals; the UAE's was a dark stage with a
 * practice switcher, a sticky rail and, per practice, a photograph, a mocked-up
 * product panel and a card for every sub-service — thirty-eight cards on one
 * page to say the group has six practices. Neither was an index.
 *
 * This is one, so it is set as one: the practices as numbered rows on hairlines,
 * their sub-services listed small underneath, and the photographs stacked in a
 * sticky frame beside the list where the one on top is the practice you are
 * reading (see PracticeIndex — that adds a class and nothing else, so the page
 * is a complete list without it).
 *
 * ONE COMPONENT, TWO MARKETS. Everything is read from vxnServices(), which is
 * the registry that already answers "what does this market lead with" for the
 * hero and the mega menu. India leads with four verticals and no depth; the UAE
 * with six practices and a catalogue under each. The difference between the two
 * pages is therefore the data and nothing else — which is the point, because
 * the previous arrangement let them drift into two different designs.
 *
 * Kit: components/vxh/kit + components/vxh/PageKit. Styles:
 * /assets/css/vxn-home-ae.css + /assets/css/vxn-services-ae.css +
 * /assets/css/vxn-pages.css.
 */
import { rurl, vxnRegion, vxnRegionData, vxnRegionPhone, vxnServices } from '@/lib/region';
import { rimg } from '@/lib/region-assets';
import { vxnMarkets } from '@/lib/site-data';
import { plainText } from '@/lib/html-text';
import { Ico } from '@/components/vxh/kit';
import { Faq, Head, Newsletter, PageHero, Ready, type FaqItem } from '@/components/vxh/PageKit';
import PracticeIndex from '@/components/pages/uae-services/PracticeIndex';
import Html from '@/components/Html';

/** "01", "02", … */
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

const COUNT_WORD = ['none', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

/**
 * What the group commits to, in the fewest words that carry it. Four, because a
 * fifth would be filler and this section is the answer to "why you".
 */
const TERMS: Array<[string, string]> = [
  ['One fee, agreed first', 'Scope and price in writing before any work starts. No hourly surprises.'],
  ['A partner, not a queue', 'The senior person you meet is the one who does the work.'],
  ['Independent where it counts', 'Valuation and research are delivered whether or not a transaction follows.'],
  ['One team, every practice', 'A mandate that crosses practices does not cross firms.'],
];

function faqFor(region: string): FaqItem[] {
  const ae = region === 'en-ae';
  return [
    {
      q: 'Do I have to engage more than one practice?',
      a: '<p>No. Most clients start with one and draw on the others only when a mandate actually needs them. Each practice is a separate engagement with its own scope.</p>',
    },
    {
      q: 'How are fees set?',
      a: '<p>Advisory, accounting and research work is ordinarily fixed-fee or retained, agreed in writing before work begins. Transaction and capital-raising mandates may carry a success element. Whichever applies, the basis is in the engagement letter &mdash; we do not start on an unpriced scope.</p>',
    },
    {
      q: 'Is your research independent of your transaction work?',
      a: '<p>Yes, and deliberately so. Valuation is delivered through Reliant Surveyors, a separate regulated firm inside the group, and its conclusion does not depend on whether a deal proceeds. Where a valuation and a group commercial interest could point different ways, the engagement letter records it and says how it is managed.</p>',
    },
    ae
      ? {
          q: 'Which emirates do you cover?',
          a: '<p>Our UAE offices are in Dubai and Abu Dhabi, and we act across the Emirates from them. A large share of the work is cross-border between the UAE and India, where the group also has offices.</p>',
        }
      : {
          q: 'Can you advise from abroad, as an NRI?',
          a: '<p>Yes &mdash; cross-border advisory between India and the UAE is a core part of the practice. We can advise on market and asset selection, valuation, holding structure and the mortgage route, and coordinate the parts of the process that need someone on the ground.</p><p>We are not tax or legal advisers; where a mandate turns on tax residency or exchange control we will say so and work alongside whoever you appoint.</p>',
        },
    {
      q: 'What happens at a first conversation?',
      a: '<p>We establish the decision you are trying to make, the timeline, and what evidence would change your mind. From that we set out scope, deliverables and fees in writing. It costs nothing, and if we are not the right people for it we say so then rather than after an engagement letter.</p>',
    },
  ];
}

export default function ServicesIndexBody({ region: raw }: { region: string }) {
  const region = vxnRegion(raw);
  const services = vxnServices(region);
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const subs = services.reduce((n, s) => n + (s.subs?.length ?? 0), 0);
  const n = COUNT_WORD[services.length] ?? String(services.length);

  return (
    <div className="vxh vxp">
      <PageHero
        region={region}
        crumb={[['Services']]}
        eyebrow={`Services in ${reg.markets}`}
        title={`${n} practices. <span class="vxh-grad">One accountable partner.</span>`}
        lede={`${services
          .map((s) => plainText(s.short))
          .join(', ')
          .replace(/, ([^,]*)$/, ' and $1')} &mdash; delivered by one senior team, at a fee agreed before work begins.`}
        action={{ label: 'Book a free consultation', href: rurl(region, '/free-consultation/') }}
        bg={{ field: 'paper' }}
        par="deep"
        meta={[
          ['Practices', n],
          ...(subs ? ([['Services', `${subs} in total`]] as Array<[string, string]>) : []),
          ['Offices', reg.cities],
          ['Fees', 'Agreed in writing, first'],
        ]}
      />

      {/* ============================================================
          The index.

          The rows are the page; the frame beside them holds every
          practice's photograph, stacked, and shows the one being read.
          Without the script the first is on top and the list still works.
          ============================================================ */}
      <section className="vxs-idx vxp-sec" aria-labelledby="vxs-idx-h">
        <div className="vxh__in">
          <Head
            split
            eyebrow="The Practices"
            title="What we are engaged to do."
            id="vxs-idx-h"
            lede="Each practice is its own engagement, with its own scope and its own fee. They share a team, a standard and one point of contact."
          />

          <div className="vxs-idx__grid">
            <figure className="vxs-idx__frame" data-vxh-par="rise" aria-hidden="true">
              {services.map((s, i) => (
                <span className={`vxs-idx__shot${i === 0 ? ' is-on' : ''}`} data-shot={i} key={s.href}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rimg(region, s.img.replace('/assets/content/uploads/', ''))}
                    alt=""
                    loading={i ? 'lazy' : 'eager'}
                    width={900}
                    height={1100}
                  />
                </span>
              ))}
              <figcaption className="vxs-idx__cap">
                <Ico name="pin" size={13} /> {reg.cities}
              </figcaption>
            </figure>

            <ol className="vxs-idx__list">
              {services.map((s, i) => {
                const href = rurl(region, s.href);
                return (
                  <li data-idx={i} className={i === 0 ? 'is-on' : undefined} key={s.href} data-vxn-in="up">
                    <a className="vxs-idx__row" href={href} aria-label={plainText(s.title)}>
                      <span className="vxs-idx__n">{pad2(i + 1)}</span>
                      <Html as="span" className="vxs-idx__t" html={s.title} />
                      <Ico name="ne" size={18} />
                    </a>
                    <Html as="p" className="vxs-idx__d" html={s.lede ?? s.desc} />
                    {s.subs?.length ? (
                      <ul className="vxs-idx__subs">
                        {s.subs.map((sub) => (
                          <li key={sub.slug}>
                            <Html as="a" href={rurl(region, `${s.href}${sub.slug}/`)} html={sub.name} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <PracticeIndex />
      </section>

      {/* How the engagement works — four rules, not four cards. */}
      <section className="vxp-sec vxp-sec--cream" aria-labelledby="vxs-terms-h">
        <div className="vxh__in">
          <Head eyebrow="How We Work" title="The same four things, on every mandate." id="vxs-terms-h" />
          <ol className="vxp-rows">
            {TERMS.map(([t, d], i) => (
              <li key={t} data-vxn-in="up">
                <div className="vxp-row">
                  <span className="vxp-row__n">{pad2(i + 1)}</span>
                  <span className="vxp-row__t">{t}</span>
                  <span className="vxp-row__d">{d}</span>
                  <span />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq items={faqFor(region)} title="Before you get in touch." />

      <Ready
        region={region}
        phone={phone}
        tel={reg.tel}
        hours={`${reg.hours} · ${vxnMarkets('short')}`}
        abs="planes"
      />
      <Newsletter region={region} />
    </div>
  );
}
