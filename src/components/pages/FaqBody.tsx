/**
 * /faq/ — the questions we are asked most, answered plainly.
 *
 * The answers are drawn from what the rest of the site already commits to — the
 * practices, the group structure, the offices and the engagement model — so
 * nothing here asserts a fact the site does not otherwise stand behind.
 *
 * Every answer is in the DOM, in a native <details>: keyboard-operable and
 * screen-reader-announced with no JavaScript, and indexable while closed. The
 * FAQPage JSON-LD is built from the same array that renders the markup (see
 * vxh/PageKit) so the two cannot drift apart.
 */
import { rurl, vxnRegionData, vxnRegionPhone } from '@/lib/region';
import { vxnMarkets } from '@/lib/site-data';
import { FaqGroups, Newsletter, PageHero, Ready, type FaqItem } from '@/components/vxh/PageKit';

function groupsFor(region: string): Array<{ group: string; items: FaqItem[] }> {
  const u = (p: string) => rurl(region, p);
  return [
    {
      group: 'Working with VALUNXT',
      items: [
        {
          q: 'What does VALUNXT Capital actually do?',
          a: `<p>We are an integrated real estate wealth, capital, research and technology advisory group: portfolio strategy and transactions, capital structuring, independent valuation and research, and the analytics platform that underpins the other three. The practices we lead with in your market are on the <a href="${u(
            '/services/',
          )}">services page</a>.</p><p>Most clients engage one practice first and draw on the others as a mandate develops.</p>`,
        },
        {
          q: 'How is this different from a broker or an estate agent?',
          a: `<p>A broker is paid to complete a transaction. We are engaged to reach a decision, which sometimes means advising against one. Valuation and research are delivered independently of whether a deal proceeds.</p><p>Where a transaction is the right answer, execution can be handled inside the group by <a href="${u(
            '/our-group/houzzhunt/',
          )}">HouzzHunt</a> — a separate engagement with its own scope, not a condition of the advice.</p>`,
        },
        {
          q: 'What size of mandate do you take on?',
          a: '<p>From a single-asset valuation for a private owner to portfolio-level advisory for funds and institutions. There is no published minimum: the deciding factor is whether the question is one our teams are equipped to answer well. If it is not, we say so at the first conversation rather than after an engagement letter.</p>',
        },
        {
          q: 'How does an engagement start?',
          a: `<p>With a scoping conversation, in person at one of our offices or by video. We establish the decision you are trying to make, the timeline, and what evidence would change your mind — then set out scope, deliverables and fees in writing before any work begins.</p><p>Start it through the <a href="${u(
            '/contact/',
          )}">contact form</a> or by booking a <a href="${u('/free-consultation/')}">consultation</a>.</p>`,
        },
      ],
    },
    {
      group: 'Valuation &amp; research',
      items: [
        {
          q: 'Are your valuations accepted by banks and lenders?',
          a: `<p>Valuation is delivered through <a href="${u(
            '/our-group/reliant-surveyors/',
          )}">Reliant Surveyors</a>, our valuation company, working to internationally recognised standards. Acceptance is each lender's decision and depends on their own panel arrangements, so confirm the requirement before instructing — we will tell you plainly if we are not on the relevant panel.</p>`,
        },
        {
          q: 'Do you use automated valuation models?',
          a: `<p>As one input, not as the answer. AVMs are fast and consistent for liquid, data-rich segments and suit screening, monitoring and portfolio-level views. Unique assets, thin comparable evidence and fast-moving markets are where they break down — and those are exactly the situations clients bring us.</p><p>The longer position is in <a href="${u(
            '/blogs/the-future-of-automated-valuation-models-avms/',
          )}">The Future of Automated Valuation Models</a>.</p>`,
        },
        {
          q: 'Is your research independent of your transaction business?',
          a: `<p>Yes. The desk publishes to <a href="${u(
            '/research/',
          )}">Research &amp; Reports</a> on its own schedule and its conclusions are not conditioned on group transaction activity. Where a research view and a group commercial interest could point in different directions, the engagement letter records the conflict and how it is managed.</p>`,
        },
        {
          q: 'Can I get a report on a market you have not published on?',
          a: `<p>Often, yes — bespoke research is a normal part of the practice. Published reports are the subset we make freely available; commissioned work covers the specific corridor, asset class or question you need. <a href="${u(
            '/contact/',
          )}">Tell us the question</a> and we will scope it.</p>`,
        },
      ],
    },
    {
      group: 'Markets, structure and fees',
      items: [
        {
          q: 'Which markets do you cover?',
          a: `<p>${vxnMarkets('long')}. Our offices are in ${vxnMarkets(
            'cities',
          )}, and a large share of our work is cross-border between India and the UAE.</p><p>Full office details, with a map, are on the <a href="${u(
            '/location/',
          )}">Location</a> page.</p>`,
        },
        {
          q: 'I am an NRI. Can you advise on buying in India from abroad?',
          a: '<p>Yes — cross-border advisory between India and the UAE is a core part of the practice, and NRI allocation is a topic the research desk tracks specifically. We can advise on market and asset selection, valuation, holding structure and the mortgage route, and coordinate the parts that need someone on the ground.</p><p>We are not tax or legal advisers; where a mandate turns on tax residency or exchange control we will say so and work alongside whoever you appoint.</p>',
        },
        {
          q: 'Why are there four companies rather than one?',
          a: `<p>Because valuation, brokerage, mortgage advice and corporate services carry different regulatory obligations and different conflicts. Keeping them in <a href="${u(
            '/our-group/',
          )}">separate entities</a> is what allows the valuation work to stay independent of the transaction work. You deal with one team; the structure sits behind that.</p>`,
        },
        {
          q: 'How are you paid?',
          a: '<p>Advisory and research mandates are ordinarily fixed-fee or retained, agreed in writing before work starts. Transaction and capital-raising mandates may carry a success element. Whichever applies, the basis is in the engagement letter — we do not begin work on an unpriced scope.</p>',
        },
        {
          q: 'Is anything on this website investment advice?',
          a: `<p>No. Everything published here, research reports included, is general information. It does not take account of your circumstances and should not be relied on as financial, investment, tax or legal advice. Advice only arises under a signed engagement — see the <a href="${u(
            '/disclaimer/',
          )}">Disclaimer</a>.</p>`,
        },
      ],
    },
  ];
}

export default function FaqBody({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const groups = groupsFor(region);
  const count = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <PageHero
            region={region}
            crumb={[['About', '/about/'], ['FAQ']]}
            eyebrow="Frequently Asked"
            title='The questions we are <span class="vxh-grad">asked most.</span>'
            lede="Answered plainly, and answered here rather than behind a form. If yours is not on the list, ask it directly — a scoping conversation costs nothing and is usually faster than reading around the subject."
            action={{ label: 'Ask something else', href: rurl(region, '/contact/') }}
            bg={{ field: 'mist' }}
            par="spin"
            meta={[
              ['Answered here', String(count)],
              ['Markets', vxnMarkets('short')],
              ['Scoping call', 'Free'],
              ['First reply', 'One business day'],
            ]}
          />

          <FaqGroups groups={groups} eyebrow="Answers" title="In three parts." />

          <Ready
            region={region}
            eyebrow="Still Deciding"
            title="Tell us the decision you are weighing."
            lede="If we are not the right people for it, we will tell you who is."
            phone={phone}
            tel={reg.tel}
            hours={`${reg.hours} · ${reg.cities}`}
            abs="stripes"
          />
          <Newsletter region={region} />
        </div>
      </div>
    </div>
  );
}
