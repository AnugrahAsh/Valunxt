/**
 * The sections shared between the pillar page and the service pages.
 *
 * What lives here is what both page types render: the communities mosaic, the
 * gallery (service pages only), the enquiry band, the reviews, the FAQs and the
 * developer marks. The pillar page's own sections — search, categories, stats,
 * listings, launches, Why Dubai, services tiles, the seller's door, popular
 * searches — are in ./portal.tsx.
 *
 * The brochure sections that used to open this file (an About statement, a
 * Valuation & Advisory split, a Process accordion, a hero with an advisory
 * headline) were cut when the page became a portal. Their substance survives
 * where it sells: the firm's numbers as the stats strip, valuation as the
 * seller's door, the process on the service pages.
 */
import { rurl } from '@/lib/region';

import { CONTACT, FAQ_HEAD, REVIEWS, REVIEWS_HEAD } from '../../data/home';
import { COMMUNITIES, GALLERY } from '../../data/property';
import { PARTNERS } from '../../data/site';
import type { Faq, Locale } from '../../lib/types';
import Accordion from '../Accordion';
import LeadForm from '../LeadForm';
import { ArrowUpRight, Stars } from '../icons';

/* ========================================================================== */
/* Communities                                                                */

/**
 * Eight real places in Dubai, as photographs.
 *
 * The band that most makes this read as a property practice: everything above it
 * describes a service, and this is the first thing on the page that is actually
 * a property. Each tile drifts against the scroll like the editorial figures, so
 * the whole page moves as one rather than having a still grid in the middle of
 * it.
 *
 * The blurb is held back until hover — the name and the picture are what a
 * visitor scans, and eight paragraphs at once is a wall. On touch, where there
 * is no hover, the stylesheet simply shows them.
 */
export function Communities({ region }: { region: Locale }) {
  return (
    <section className="vxn-re__sec vxn-re__sec--cream" id="communities">
      <div className="vxn-re__wrap">
        <div className="vxn-re__head">
          <span className="vxn-re__eyebrow">Communities</span>
          <h2 className="vxn-re__h2">Where do you want to live?</h2>
          <p className="vxn-re__lede">
            Eight communities we work in every week. Pick one and see what is showing.
          </p>
        </div>

        <div className="vxn-re-comms">
          {COMMUNITIES.map((c) => (
            <a className="vxn-re-comm" href={rurl(region, `/real-estate${c.href}`)} key={c.name}>
              {/* Decorative: the caption below names the community. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt="" loading="lazy" />
              <span className="vxn-re-comm__body">
                <span className="vxn-re-comm__stock">{c.stock}</span>
                <span className="vxn-re-comm__name">
                  {c.name}
                  <span className="vxn-re-comm__go" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </span>
                <span className="vxn-re-comm__blurb">{c.blurb}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Property gallery                                                           */

/**
 * The showcase band. Not a listings grid — nothing here carries a price, and
 * that is the point: it is what living in Dubai looks like, which is the job
 * DAMAC gives its mosaic. Spans are assigned by position in the stylesheet, so
 * the order of GALLERY is the composition.
 */
export function Gallery() {
  return (
    <section className="vxn-re__sec" id="gallery">
      {/* The wider measure: the mosaic is the one band that gains from breaking
          the page's 1280px cap — the head inside keeps its own centred width. */}
      <div className="vxn-re__wrap vxn-re__wrap--wide">
        <div className="vxn-re__head">
          <span className="vxn-re__eyebrow">The Portfolio</span>
          <h2 className="vxn-re__h2 vxn-re__h2--track">Luxury Living in Dubai</h2>
          <span className="vxn-re__rule" aria-hidden="true">
            <i />
          </span>
          <p className="vxn-re__lede">
            Communities, homes and towers across the city — the places our clients are buying into,
            and what they actually look like.
          </p>
        </div>

        <div className="vxn-re-gal">
          {GALLERY.map((g) => (
            <figure className="vxn-re-gal__item" key={g.img + g.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.img} alt={g.title} loading="lazy" />
              <figcaption className="vxn-re-gal__cap">
                <b>{g.title}</b>
                <span>{g.kicker}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Contact                                                                    */

export function Contact({ formAction }: { formAction?: string }) {
  return (
    <section className="vxn-re__sec vxn-re-contact" id="contact">
      <div className="vxn-re-contact__bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={CONTACT.img} alt="" loading="lazy" />
      </div>

      <div className="vxn-re__wrap">
        <div className="vxn-re-contact__inner">
          <div className="vxn-re-contact__copy">
            <span className="vxn-re__eyebrow vxn-re__eyebrow--inv">{CONTACT.eyebrow}</span>
            <h2 className="vxn-re__h2 vxn-re__h2--inv">{CONTACT.title}</h2>
            <p className="vxn-re__lede vxn-re__lede--inv">{CONTACT.lede}</p>

            <h3 className="vxn-re__h3 vxn-re__h3--inv" style={{ marginTop: 36 }}>
              {CONTACT.whyTitle}
            </h3>
            <ul className="vxn-re-contact__why">
              {CONTACT.why.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>

          <LeadForm action={formAction} />
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Client reviews                                                             */

function initial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?';
}

export function Reviews() {
  return (
    <section className="vxn-re__sec vxn-re__sec--cream" id="reviews">
      <div className="vxn-re__wrap">
        <div className="vxn-re__head">
          <span className="vxn-re__eyebrow">{REVIEWS_HEAD.eyebrow}</span>
          <h2 className="vxn-re__h2">What clients say.</h2>
          <div className="vxn-re-rev__score">
            <b>{REVIEWS_HEAD.score}</b>
            <span>
              <Stars />
              <span className="vxn-re-rev__note">{REVIEWS_HEAD.scoreNote}</span>
            </span>
          </div>
        </div>

        <div className="vxn-re-revs">
          {REVIEWS.map((r) => (
            <figure className="vxn-re-rev" key={r.name}>
              <span className="vxn-re-rev__quote" aria-hidden="true">
                “
              </span>
              <blockquote className="vxn-re-rev__body">{r.body}</blockquote>
              <figcaption className="vxn-re-rev__who">
                <span className="vxn-re-rev__avatar" aria-hidden="true">
                  {initial(r.name)}
                </span>
                <span>
                  <span className="vxn-re-rev__name">{r.name}</span>
                  <span className="vxn-re-rev__when">{r.when}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* FAQs                                                                       */

/**
 * Emits FAQPage structured data built from the same array that renders, so the
 * markup and the schema cannot drift — which is the usual way this breaks.
 */
export function Faqs({
  region,
  items,
  title = FAQ_HEAD.title,
  lede = FAQ_HEAD.lede,
}: {
  region: Locale;
  items: Faq[];
  title?: string;
  lede?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="vxn-re__sec" id="faqs">
      <div className="vxn-re__wrap">
        <div className="vxn-re__head">
          <span className="vxn-re__eyebrow">{FAQ_HEAD.eyebrow}</span>
          <h2 className="vxn-re__h2">{title}</h2>
          <p className="vxn-re__lede">{lede}</p>
        </div>

        <div className="vxn-re-faq__grid">
          <figure className="vxn-re-faq__figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/real-estate/img/listings/marina-tower.webp" alt="" loading="lazy" />
            <figcaption>
              <b>Still deciding?</b>
              <span>
                Tell us the position and we will say plainly what it needs — and what it does not.
              </span>
            </figcaption>
          </figure>

          <Accordion variant="faq" initial={-1} items={items.map((f) => ({ title: f.q, body: f.a }))} />
        </div>

        <p style={{ textAlign: 'center', marginTop: 32, fontSize: 14.5 }}>
          {FAQ_HEAD.footNote}{' '}
          <a className="vxn-re__link" href={rurl(region, '/real-estate/#contact')}>
            {FAQ_HEAD.footCta}
            <i aria-hidden="true" />
          </a>
        </p>
      </div>

      {/* Inert data, not behaviour — safe to render from the server. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}

/* ========================================================================== */
/* Partners                                                                   */

/**
 * The developer marks.
 *
 * `logo` is optional and the name is the fallback, so an entry whose
 * relationship lapses can be reduced to text by deleting one line of data. The
 * white chips are what make an inconsistent set of files read as one row — see
 * the note on `.vxn-re-partner` in the stylesheet.
 */
export function Partners() {
  return (
    <section className="vxn-re__sec vxn-re__sec--tight vxn-re__sec--cream" id="partners">
      <div className="vxn-re__wrap">
        <div className="vxn-re__head">
          <span className="vxn-re__eyebrow">Partners</span>
          <h2 className="vxn-re__h2">The developers we sell.</h2>
        </div>
        <div className="vxn-re-partners">
          {PARTNERS.map((p) => (
            <span className="vxn-re-partner" key={p.name}>
              {p.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={p.logo} alt={p.name} loading="lazy" />
              ) : (
                p.name
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
