/* Client testimonials, on /clients/.

   Driven by src/data/testimonials.ts, which ships EMPTY on purpose — writing a
   testimonial would be fabricating a client endorsement, so the quotes are left
   to VALUNXT. See the note at the top of that file. While the array is empty
   this renders nothing at all; add one consented entry and the section appears.

   Restyled into the kit's language with the rest of /clients/, so the day a
   real quote lands it is not the one section on the page in the old typeface.
   It carries its own CSS because it is the only place these rules are needed
   and the sheet should not grow a block for markup that is usually absent.

   Port of includes/partials/testimonials.php. */
import TESTIMONIALS from '@/data/testimonials';

const CSS = `
/* ===== VALUNXT testimonials =============================================== */
.vxn-quotes { padding: clamp(56px, 7.5vw, 112px) 0; background: #fff; border-top: 1px solid var(--vxh-line); }
.vxn-quotes__wrap { max-width: var(--vxh-max, 1280px); margin: 0 auto; padding: 0 var(--vxh-pad, 24px); }
.vxn-quotes__eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--vxh-blue); margin: 0 0 14px; }
.vxn-quotes h2.vxn-quotes__h {
	font-family: var(--vxh-display) !important;
	font-weight: 500 !important;
	font-size: clamp(26px, 3.4vw, 46px) !important;
	letter-spacing: -.035em;
	line-height: 1.08 !important;
	color: var(--vxh-ink) !important;
	margin: 0 0 18px;
	max-width: 20ch;
}
.vxn-quotes__lead { margin: 0 0 clamp(34px, 5vw, 60px); max-width: 60ch; font-size: 15px; line-height: 1.7; color: var(--vxh-muted); }
/* Hairline-ruled, like every other list on these pages — a quote is already a
   quotation mark and an attribution; it does not also need a box. */
.vxn-quotes__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0 clamp(24px, 4vw, 56px); }
.vxn-quotes__item { display: flex; flex-direction: column; margin: 0; padding: clamp(22px, 2.6vw, 32px) 0; border-top: 1px solid var(--vxh-line); }
.vxn-quotes__mark { font-family: var(--vxh-display); font-size: 44px; line-height: .6; color: rgba(20, 54, 216, .22); margin: 0 0 18px; }
.vxn-quotes__text {
	margin: 0 0 22px;
	padding: 0;
	border: 0;
	font-family: var(--vxh-display);
	font-size: clamp(16px, 1.5vw, 20px);
	font-weight: 500;
	letter-spacing: -.02em;
	line-height: 1.4;
	color: var(--vxh-ink);
	text-wrap: pretty;
}
.vxn-quotes__attr { margin-top: auto; }
.vxn-quotes__name { margin: 0; font-size: 14px; font-weight: 600; color: var(--vxh-ink); }
.vxn-quotes__role { margin: 3px 0 0; font-size: 13px; color: var(--vxh-muted); line-height: 1.55; }
.vxn-quotes__svc { display: inline-block; margin-top: 12px; padding: 5px 11px; border: 1px solid var(--vxh-line); border-radius: 999px; font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--vxh-blue); }
.vxn-quotes__consent { margin: clamp(26px, 3vw, 38px) 0 0; padding-top: 20px; border-top: 1px solid var(--vxh-line); font-size: 12.5px; line-height: 1.65; color: var(--vxh-muted); max-width: 74ch; }
`;


export default function TestimonialsSection() {
  const quotes = TESTIMONIALS;
  if (!quotes.length) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="vxn-quotes">
        <div className="vxn-quotes__wrap">
          <p className="vxn-quotes__eyebrow">In their words</p>
          <h2 className="vxn-quotes__h">What clients say</h2>
          <p className="vxn-quotes__lead">
            Published with consent. Where a client is not named, the attribution is anonymised at
            their request and the engagement is described by type.
          </p>

          <div className="vxn-quotes__grid">
            {quotes.map((q, i) => (
              <figure className="vxn-quotes__item" key={i}>
                <p className="vxn-quotes__mark" aria-hidden="true">
                  &ldquo;
                </p>
                <blockquote className="vxn-quotes__text">{q.quote}</blockquote>
                <figcaption className="vxn-quotes__attr">
                  {q.name ? <p className="vxn-quotes__name">{q.name}</p> : null}
                  <p className="vxn-quotes__role">
                    {q.role ?? ''}
                    {q.org ? `, ${q.org}` : ''}
                  </p>
                  {q.service ? <span className="vxn-quotes__svc">{q.service}</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="vxn-quotes__consent">
            Every quotation above is published with the individual&rsquo;s written consent.
            Testimonials describe a particular engagement and are not an indication of future results.
          </p>
        </div>
      </section>
      {/* Review structured data, emitted only for named, attributable quotes —
          an anonymous review is not valid Review markup. */}
      {quotes
        .filter((q) => q.name)
        .map((q, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Review',
                reviewBody: q.quote,
                author: { '@type': 'Person', name: q.name },
                itemReviewed: { '@type': 'Organization', name: 'VALUNXT Capital' },
              }),
            }}
          />
        ))}
    </>
  );
}
