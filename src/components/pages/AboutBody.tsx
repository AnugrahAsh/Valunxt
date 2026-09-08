/**
 * /about/ — Who We Are, shared by both editions (region-aware where a fact
 * differs).
 *
 * Third generation, and the shortest of the three. The second was nine sections:
 * a hero with a photograph, a split with a second photograph, a band of
 * counters, a third split with a third photograph, three flip cards, an office
 * chooser with a live map, a closing band and a newsletter. Everything it said
 * about the group was true; it took a very long page to say it, and the office
 * chooser was a second copy of a page the site already has.
 *
 * THE SPINE IS THE MARK. The middle of the page is one scrolled run with the
 * VALUNXT X turning in three dimensions behind it (vxh/Mark), and five chapters
 * that arrive one at a time as the reader moves down it — who we are, what we
 * do, how we work, why the group is four firms, and where we are. That is the
 * whole of "about us", set as five short paragraphs rather than nine sections.
 * The mark is interactive: it can be grabbed and thrown, and it leans toward the
 * pointer.
 *
 * It degrades to five paragraphs in a column. The X is imported only near the
 * viewport, only with WebGL, never under reduced motion, and nothing on the page
 * depends on it arriving.
 *
 * Offices are a strip that links to /location/, which is the page that owns
 * them — this one names the count and moves on.
 *
 * Kit: components/vxh/kit + components/vxh/PageKit. Styles:
 * /assets/css/vxn-home-ae.css + /assets/css/vxn-services-ae.css +
 * /assets/css/vxn-pages.css.
 */
import { rurl, vxnRegionData, vxnRegionPhone, vxnServices } from '@/lib/region';
import { vxnMarkets, vxnOffices } from '@/lib/site-data';
import { rimg } from '@/lib/region-assets';
import { Ico } from '@/components/vxh/kit';
import { Faq, Head, Newsletter, PageHero, Ready, type FaqItem } from '@/components/vxh/PageKit';
import Mark from '@/components/vxh/Mark';
import Html from '@/components/Html';

/** Our philosophy — what we are not, and what we are. */
const PHIL: Array<[string, string]> = [
  ['We do not simply sell properties.', 'We help clients build wealth through real estate.'],
  ['We do not simply publish reports.', 'We deliver investment intelligence.'],
  [
    'We do not simply build software.',
    'We create intelligent platforms that improve investment decisions.',
  ],
];

function faqFor(region: string): FaqItem[] {
  return [
    {
      q: 'What does VALUNXT Capital actually do?',
      a: '<p>We are an integrated real estate wealth, capital, research and technology advisory group. Most clients engage one practice first — an accounting mandate, a valuation, a funding question — and draw on the others as the work develops.</p>',
    },
    {
      q: 'How is this different from a broker or an estate agent?',
      a: '<p>A broker is paid to complete a transaction. We are engaged to reach a decision, which sometimes means advising against one. Valuation and research are delivered independently of whether a deal proceeds.</p>',
    },
    {
      q: 'Why are there four companies rather than one?',
      a: '<p>Because valuation, brokerage, mortgage advice and corporate services carry different regulatory obligations and different conflicts. Keeping them in separate entities is what allows the valuation work to stay independent of the transaction work. You deal with one team; the structure sits behind that.</p>',
    },
    {
      q: 'What size of mandate do you take on?',
      a: '<p>From a single-asset valuation for a private owner to portfolio-level advisory for funds and institutions. There is no published minimum: the deciding factor is whether the question is one our teams are equipped to answer well. If it is not, we say so at the first conversation rather than after an engagement letter.</p>',
    },
    {
      q: 'Who will I actually work with?',
      a: `<p>A named senior adviser, from the first call. You can see who leads each practice on the <a href="${rurl(
        region,
        '/about/leadership/',
      )}">leadership page</a>.</p>`,
    },
  ];
}

export default function AboutBody({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const offices = vxnOffices();
  const services = vxnServices(region);
  const phone = vxnRegionPhone(region);
  const officeCount = Object.keys(offices).length;

  /* The five chapters the mark carries. Each one is a claim and the sentence
     that earns it — no chapter gets two paragraphs, because the point of
     hanging them on a scrolled object is that each arrives on its own. */
  const CHAPTERS: Array<{ k: string; t: string; d: string }> = [
    {
      k: 'Who we are',
      t: 'An integrated group, not a brokerage.',
      d: `VALUNXT Capital is a real estate wealth, capital, intelligence and technology group, supporting investors, developers, institutions and businesses across ${vxnMarkets(
        'long',
      )}.`,
    },
    {
      k: 'What we do',
      t: `${services.length} connected practices, one accountable team.`,
      d: `${services
        .map((s) => s.short)
        .join(', ')
        .replace(/, ([^,]*)$/, ' and $1')} — separate engagements with separate scopes, delivered by people who sit in the same rooms.`,
    },
    {
      k: 'How we work',
      t: 'Evidence before opinion.',
      d: 'Every mandate starts with the decision you are trying to make and what evidence would change your mind. Scope and fee are agreed in writing before any work begins.',
    },
    {
      k: 'Why four firms',
      t: 'Separate entities, so the advice stays separate.',
      d: 'Valuation, brokerage, mortgage advice and corporate services carry different obligations and different conflicts. Keeping them apart is what lets a valuation be independent of a transaction.',
    },
    {
      k: 'Where we are',
      t: `${officeCount} offices, two markets, one team.`,
      d: `${vxnMarkets('cities')} — with a large share of the work running cross-border between them.`,
    },
  ];

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <PageHero
            region={region}
            crumb={[['About']]}
            eyebrow="Who We Are"
            title='Intelligence behind every <span class="vxh-grad">investment decision.</span>'
            lede={`A premium real estate wealth, capital, intelligence and technology group, working across ${vxnMarkets(
              'long',
            )}.`}
            action={{ label: 'Meet the leadership', href: rurl(region, '/about/leadership/') }}
            bg={{ abs: 'orbs' }}
            par="tilt"
            meta={[
              ['Practices', String(services.length)],
              ['Offices', String(officeCount)],
              ['Markets', vxnMarkets('short')],
              ['First reply', 'One business day'],
            ]}
          />

          {/* ============================================================
              The run: the mark, and the five chapters hung on it.

              The layer is absolute over the whole run and its child is
              sticky inside it, so one object carries the reader from the
              first chapter to the last. Every chapter is in the document
              whether or not the mark ever arrives.
              ============================================================ */}
          <section className="vxa-run" aria-labelledby="vxa-run-h">
            <h2 className="vxh-sr" id="vxa-run-h">
              About VALUNXT Capital
            </h2>
            <div className="vxa-run__layer" aria-hidden="true">
              <Mark run=".vxa-run" fit=".vxa-run__fit" cover={0.62} turns={1.5} idle={0.09} />
              <span className="vxa-run__fit" />
            </div>

            <div className="vxh__in">
              <ol className="vxa-chs">
                {CHAPTERS.map((c, i) => (
                  <li className={`vxa-ch vxa-ch--${i % 2 ? 'r' : 'l'}`} key={c.k}>
                    <div className="vxa-ch__card" data-vxn-in={i % 2 ? 'right' : 'left'}>
                      <span className="vxa-ch__n" data-vxh-par="ghost">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="vxa-ch__k">{c.k}</span>
                      <Html as="h3" className="vxa-ch__t" html={c.t} />
                      <Html as="p" className="vxa-ch__d" html={c.d} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Philosophy — three lines, each a correction. */}
          <section className="vxa-phil vxp-sec vxp-sec--cream" aria-labelledby="vxa-phil-h">
            <div className="vxh__in">
              <Head
                eyebrow="Our Philosophy"
                title="What the work is, and what it is not."
                id="vxa-phil-h"
              />
              <ol className="vxa-phil__list">
                {PHIL.map(([a, b], i) => (
                  <li key={a} data-vxn-in="up">
                    <span className="vxa-phil__n">{String(i + 1).padStart(2, '0')}</span>
                    <s className="vxa-phil__a">{a}</s>
                    <strong className="vxa-phil__b">{b}</strong>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Where and who: two doors, not two sections. */}
          <section className="vxa-doors vxp-sec" aria-labelledby="vxa-doors-h">
            <div className="vxh__in">
              <Head
                split
                eyebrow="Where To Next"
                title="The people, and the places."
                id="vxa-doors-h"
                lede="Both live on their own pages rather than in a summary here."
              />
              <div className="vxa-doors__grid">
                <a className="vxa-door" href={rurl(region, '/about/leadership/')} data-vxn-in="up">
                  <figure data-vxh-par="zoom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rimg(region, 'new-folder/about-us-1.webp')}
                      alt=""
                      loading="lazy"
                      width={900}
                      height={600}
                    />
                  </figure>
                  <span className="vxa-door__k">Leadership</span>
                  <span className="vxa-door__t">
                    The senior people you meet are the ones who do the work.
                  </span>
                  <span className="vxa-door__go">
                    Meet the team <Ico name="ne" size={15} />
                  </span>
                </a>
                <a className="vxa-door" href={rurl(region, '/location/')} data-vxn-in="up">
                  <figure data-vxh-par="zoom">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rimg(region, 'new-folder/about-us-banner.webp')}
                      alt=""
                      loading="lazy"
                      width={900}
                      height={600}
                    />
                  </figure>
                  <span className="vxa-door__k">Offices</span>
                  <span className="vxa-door__t">
                    {vxnMarkets('cities')} — addresses, hours and the line that answers.
                  </span>
                  <span className="vxa-door__go">
                    See the offices <Ico name="ne" size={15} />
                  </span>
                </a>
              </div>
            </div>
          </section>

          <Faq items={faqFor(region)} title="What people ask first." />

          <Ready
            region={region}
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
