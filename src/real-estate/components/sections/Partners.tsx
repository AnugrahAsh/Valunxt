/**
 * Trusted developers and partners.
 *
 * Names are type-set rather than shipped as logo files: a developer's mark is
 * their property, and displaying it is a claim of a commercial relationship, so
 * the artwork is the host's to add once it has the right to use it. Drop files
 * into public/real-estate/img/partners/ and set `logo` on the entry in
 * data/site.ts — this component renders an <img> instead, with no other change.
 */
import { PARTNERS, PARTNERS_TITLE } from '../../data/site';

export default function Partners() {
  return (
    <section className="re-section re-section--tight re-section--cream">
      <div className="re-wrap re-partners">
        <h2 className="re-partners__title">{PARTNERS_TITLE}</h2>
        <div className="re-partners__row">
          {PARTNERS.map((p) => (
            <span className="re-partners__logo" key={p.name}>
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
