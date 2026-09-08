/**
 * /clients/ — who the group acts for.
 *
 * Four audiences, and what each one actually gets. The captured page said the
 * same four things inside four bordered panels with an icon, a heading, a
 * paragraph, three ticked bullets and a "Get in Touch" button apiece — the same
 * button, four times, to the same page.
 *
 * Here each audience is a numbered row: the claim at heading size, the case
 * beneath it, and what it comes with as three short lines. One action closes the
 * section, because there was only ever one.
 */
import { rurl, vxnRegionData, vxnRegionPhone } from '@/lib/region';
import { vxnMarkets } from '@/lib/site-data';
import { Ico } from '@/components/vxh/kit';
import { Faq, Head, Newsletter, PageHero, Ready, type FaqItem } from '@/components/vxh/PageKit';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import Html from '@/components/Html';

interface Audience {
  k: string;
  t: string;
  d: string;
  gets: string[];
}

const AUDIENCES: Audience[] = [
  {
    k: 'Private & HNI investors',
    t: 'Wealth built deliberately, not opportunistically.',
    d: 'From a first acquisition to a multi-asset portfolio, with the discretion and the personal attention that private capital expects at every stage.',
    gets: ['Portfolio strategy set to your objectives', 'One-to-one advisory, discreetly handled', 'Access to curated opportunities'],
  },
  {
    k: 'Family offices',
    t: 'Capital stewarded across generations.',
    d: 'Single and multi-family offices managing real estate allocations on a generational horizon, with governance and succession in view rather than in the way.',
    gets: ['Generational allocation planning', 'Consolidated portfolio oversight', 'Governance and succession alignment'],
  },
  {
    k: 'NRI investors',
    t: 'Investing back home, from anywhere.',
    d: 'Remote due diligence, documentation, repatriation and tax-aware structuring — so distance is a logistics problem rather than a barrier.',
    gets: ['End-to-end remote advisory', 'Cross-border compliance support', 'Repatriation and structuring guidance'],
  },
  {
    k: 'Developers & institutions',
    t: 'Scale, with institutional-grade rigour.',
    d: 'Capital raising, feasibility, research and technology enablement for projects and portfolios where the reporting has to stand up to a committee.',
    gets: ['Capital raising and structuring', 'Feasibility and market research', 'Institutional reporting and analytics'],
  },
];

/** The commitments the old page called "Our Promise", stated as commitments. */
const PROMISES: Array<[string, string]> = [
  ['We will tell you not to', 'If the evidence does not support the decision, that is the advice — and it is the same fee.'],
  ['One price, before we start', 'Scope and fee in writing. No hourly creep, no revised estimate halfway through.'],
  ['A named partner', 'Not a relationship manager who routes you to a team you never meet.'],
  ['Your file stays yours', 'Nothing about your position is shared across the group without your say-so.'],
];

const FAQ: FaqItem[] = [
  {
    q: 'Is there a minimum mandate size?',
    a: '<p>No published minimum. The deciding factor is whether the question is one our teams are equipped to answer well — and if it is not, we say so at the first conversation rather than after an engagement letter.</p>',
  },
  {
    q: 'Can you act for me if I am not resident here?',
    a: `<p>Yes. Cross-border work between ${vxnMarkets(
      'short',
    )} is a core part of the practice: market and asset selection, valuation, holding structure and the mortgage route, with our own people handling the parts that need someone on the ground.</p>`,
  },
  {
    q: 'Do you take a commission on transactions you advise?',
    a: '<p>Advisory and research mandates are fixed-fee or retained. Where the group also executes a transaction, that is a separate engagement with its own scope and its own disclosed basis — never a condition of the advice.</p>',
  },
  {
    q: 'Who else sees my information?',
    a: '<p>The team on your mandate. The group is four regulated firms and information does not move between them on assumption — where a mandate needs another practice, we ask first.</p>',
  },
];

export default function ClientsBody({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <PageHero
            region={region}
            crumb={[['Clients']]}
            eyebrow="Clients"
            title='Investors, families <span class="vxh-grad">and institutions.</span>'
            lede={`Private investors, family offices, NRIs, developers and institutions &mdash; advised at every stage of the decision, across ${vxnMarkets(
              'short',
            )}.`}
            action={{ label: 'Start a conversation', href: rurl(region, '/contact/') }}
            bg={{ abs: 'ribbons' }}
            par="zoom"
            meta={[
              ['We act for', 'Four kinds of client'],
              ['Markets', vxnMarkets('short')],
              ['Fees', 'Fixed or retained'],
              ['First reply', 'One business day'],
            ]}
          />

          {/* The four audiences. */}
          <section className="vxk-aud vxp-sec" aria-labelledby="vxk-aud-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="Who We Act For"
                title="Four kinds of client, four different questions."
                id="vxk-aud-h"
                lede="The practices are the same. What changes is what you are trying to decide, and how much of it we handle for you."
              />
              <ol className="vxk-list">
                {AUDIENCES.map((a, i) => (
                  <li key={a.k} data-vxn-in="up">
                    <span className="vxk-list__n" data-vxh-par="tilt">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="vxk-list__k">{a.k}</span>
                    <Html as="h3" className="vxk-list__t" html={a.t} />
                    <Html as="p" className="vxk-list__d" html={a.d} />
                    <ul className="vxk-list__gets">
                      {a.gets.map((g) => (
                        <li key={g}>
                          <Ico name="check" size={12} />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Renders nothing until a real, consented quote exists — see
              data/testimonials.ts. It is here so that the day one does, it
              lands between who we act for and what we promise, which is where
              it belongs. */}
          <TestimonialsSection />

          {/* The commitments. */}
          <section className="vxp-sec vxp-sec--cream" aria-labelledby="vxk-prom-h">
            <div className="vxh__in">
              <Head eyebrow="Our Commitment" title="Four things we will not trade away." id="vxk-prom-h" />
              <ol className="vxp-rows">
                {PROMISES.map(([t, d], i) => (
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

          <Faq items={FAQ} title="What clients ask first." />

          <Ready
            region={region}
            phone={phone}
            tel={reg.tel}
            hours={`${reg.hours} · ${reg.cities}`}
            abs="arcs"
          />
          <Newsletter region={region} />
        </div>
      </div>
    </div>
  );
}
