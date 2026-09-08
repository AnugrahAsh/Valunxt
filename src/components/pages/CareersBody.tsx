/**
 * /about/careers/ — page body.
 *
 * Rebuilt from the captured Elementor page into the kit's language. The copy is
 * the copy that was there — the case for working here, what the group looks for,
 * and where the work actually is — set as three lists on hairlines instead of
 * three grids of bordered boxes.
 *
 * There is no vacancy feed behind this, and the old page did not pretend
 * otherwise: every area of work said "by enquiry". So the areas are addressed
 * rows, each one a mailto with the area already in the subject line, rather than
 * five buttons that all went to the same blank compose window.
 */
import { rurl, vxnRegionData, vxnRegionPhone, vxnServices } from '@/lib/region';
import { vxnEmail, vxnMarkets } from '@/lib/site-data';
import { plainText } from '@/lib/html-text';
import { Ico } from '@/components/vxh/kit';
import { Faq, Head, Newsletter, PageHero, Ready, type FaqItem } from '@/components/vxh/PageKit';
import Html from '@/components/Html';

/** The case for being here, in three lines. */
const WHY: Array<[string, string]> = [
  ['Two markets, one desk', 'Work that runs across India and the UAE rather than stopping at a border.'],
  ['Every discipline in the room', 'Valuation, research, capital and technology, on the same mandates.'],
  ['Seniority that is not a title', 'The person who meets the client is the person who does the work.'],
];

/** What the group looks for — the old "Creating a culture for success" list. */
const LOOK: Array<[string, string]> = [
  [
    'You keep learning',
    'Whatever stage you are at, you can expect to keep developing your expertise here. We value it enough to make room for it.',
  ],
  [
    'You take ownership',
    'Bring initiative and sound ideas and you get the tools, the technology and the support to develop them — and a hand in how the group works.',
  ],
  [
    'You think in decades',
    'This is more than a transaction business. We think about the long-term value we help clients create, and we hold ourselves to that.',
  ],
  [
    'You bring a different angle',
    'Our teams span advisory, valuation, research, capital and technology. That range is what lets us think more broadly for a client.',
  ],
  [
    'You care about judgement',
    'Independent research, disciplined analysis and a long view — because the point is a better decision, not a faster one.',
  ],
];

const FAQ: FaqItem[] = [
  {
    q: 'Are there open vacancies listed?',
    a: '<p>Not as a feed. Hiring here follows mandates rather than a calendar, so the honest answer is that we read every approach against the work in front of us. Tell us the area and what you have actually done in it.</p>',
  },
  {
    q: 'Do you take graduates?',
    a: '<p>Yes, alongside experienced hires. What matters more than years is whether you can hold an argument together with evidence — that is most of the job in every practice.</p>',
  },
  {
    q: 'Where would I be based?',
    a: `<p>One of our offices in ${vxnMarkets(
      'cities',
    )}. Cross-border work between the two markets is normal rather than exceptional, so expect exposure to both.</p>`,
  },
  {
    q: 'What should I send?',
    a: '<p>A CV and a short note naming the area of work and one piece of analysis you are proud of. A covering letter that restates the CV tells us nothing; a paragraph about a judgement you made tells us a great deal.</p>',
  },
];

export default function CareersBody({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const email = vxnEmail();
  const services = vxnServices(region);

  /* The areas of work are the market's own practices plus the group function
     that sits behind all of them — so a practice added to the registry appears
     here without this file changing. */
  const areas: Array<{ name: string; where: string }> = [
    ...services.map((s) => ({ name: plainText(s.short ?? s.title), where: vxnMarkets('short') })),
    { name: 'Corporate & Group Services', where: vxnMarkets('short') },
  ];

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <PageHero
            region={region}
            crumb={[['About', '/about/'], ['Careers']]}
            eyebrow="Careers"
            title='Build a career with <span class="vxh-grad">purpose.</span>'
            lede="We bring disciplined thinking, independent research and a long-term view of value to every investment decision we support. If that is how you want to work, we should talk."
            action={{ label: 'Write to us', href: `mailto:${email}?subject=Careers%20at%20VALUNXT%20Capital` }}
            bg={{ abs: 'helix', flip: true }}
            par="rise"
            meta={[
              ['Markets', vxnMarkets('short')],
              ['Practices', String(services.length)],
              ['Offices', String(reg.offices.length)],
              ['Applications', 'By enquiry, all year'],
            ]}
          />

          {/* Why here — three lines, no cards. */}
          <section className="vxp-sec" aria-labelledby="vxc-why-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="Why VALUNXT"
                title="What is different about the work."
                id="vxc-why-h"
                lede="The people who do well here are drawn to disciplined thinking and long-term value rather than short-term wins."
              />
              <ol className="vxp-rows">
                {WHY.map(([t, d], i) => (
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

          {/* Who we look for. */}
          <section className="vxp-sec vxp-sec--cream" aria-labelledby="vxc-look-h">
            <div className="vxh__in">
              <Head eyebrow="Who We Look For" title="Five things, none of them a job title." id="vxc-look-h" />
              <ol className="vxc-look">
                {LOOK.map(([t, d], i) => (
                  <li key={t} data-vxn-in="up">
                    <span className="vxc-look__n" data-vxh-par="sink">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Html as="h3" className="vxc-look__t" html={t} />
                    <Html as="p" className="vxc-look__d" html={d} />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Areas of work — each row is an addressed enquiry. */}
          <section className="vxp-sec" aria-labelledby="vxc-area-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="Areas Of Work"
                title="Where you could contribute."
                id="vxc-area-h"
                lede="There is no vacancy feed. Name the area and we will read your approach against the work in front of us."
              />
              <ol className="vxp-rows">
                {areas.map((a, i) => (
                  <li key={a.name} data-vxn-in="up">
                    <a
                      className="vxp-row"
                      href={`mailto:${email}?subject=${encodeURIComponent(`Careers — ${a.name}`)}`}
                    >
                      <span className="vxp-row__n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="vxp-row__t">{a.name}</span>
                      <span className="vxp-row__d">{a.where} &middot; by enquiry</span>
                      <Ico name="mail" size={16} />
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <Faq items={FAQ} title="Before you write." />

          <Ready
            region={region}
            eyebrow="Ready When You Are"
            title="Tell us what you have actually done."
            lede="One paragraph about a judgement you made is worth more here than a page of responsibilities."
            phone={phone}
            tel={reg.tel}
            hours={`${reg.hours} · ${reg.cities}`}
            abs="ribbons"
          />
          <Newsletter region={region} />
        </div>
      </div>
    </div>
  );
}
