/**
 * FAQs.
 *
 * Takes its items as a prop so the same component serves the pillar page and
 * each service page, which carry different question sets — one FAQ block
 * duplicated across four URLs would have them competing for the same queries.
 *
 * Also emits FAQPage structured data. The JSON is built from the same array
 * that renders, so the markup and the schema can never drift apart — which is
 * the usual way this feature breaks.
 */
import type { Faq, Locale } from '../../lib/types';
import { url } from '../../lib/routes';
import { FAQ_HEAD } from '../../data/home';
import Accordion from '../Accordion';

export default function Faqs({
  locale,
  items,
  title = FAQ_HEAD.title,
  lede = FAQ_HEAD.lede,
}: {
  locale: Locale;
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
    <section className="re-section" id="faqs">
      <div className="re-wrap">
        <div className="re-faq__head">
          <span className="re-eyebrow">{FAQ_HEAD.eyebrow}</span>
          <h2 className="re-h2" style={{ margin: '16px 0 12px' }}>
            {title}
          </h2>
          <p className="re-lede">{lede}</p>
        </div>

        <Accordion variant="faq" initial={-1} items={items.map((f) => ({ title: f.q, body: f.a }))} />

        <p className="re-faq__foot">
          {FAQ_HEAD.footNote} <a href={url(locale, FAQ_HEAD.footHref)}>{FAQ_HEAD.footCta}</a>
        </p>
      </div>

      {/* Inert data, not behaviour — safe to render from the server. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
