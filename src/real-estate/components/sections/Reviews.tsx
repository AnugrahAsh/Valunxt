/**
 * Client reviews.
 *
 * The quotes are attributed to named people, so they are transcribed from the
 * published Google reviews rather than written here — two entries in
 * data/home.ts carry a TODO where the source text was cut off in the material
 * supplied. Replace those with the full published wording before launch rather
 * than paraphrasing them.
 */
import { REVIEWS, REVIEWS_HEAD } from '../../data/home';
import { Stars } from '../icons';

function initial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || '?';
}

export default function Reviews() {
  return (
    <section className="re-section" id="reviews">
      <div className="re-wrap">
        <div className="re-rev__top">
          <div>
            <span className="re-eyebrow">{REVIEWS_HEAD.eyebrow}</span>
            <h2 className="re-h2" style={{ marginTop: 16 }}>
              {REVIEWS_HEAD.title}
            </h2>
          </div>
          <div className="re-rev__score">
            <div>
              <b>{REVIEWS_HEAD.score}</b>
              <small>{REVIEWS_HEAD.scoreNote}</small>
            </div>
            <Stars />
          </div>
        </div>

        <div className="re-rev__grid">
          {REVIEWS.map((r) => (
            <figure className="re-rev__card" key={r.name}>
              <div className="re-rev__who">
                <span
                  className="re-rev__avatar"
                  style={r.accent ? { background: r.accent } : undefined}
                  aria-hidden="true"
                >
                  {initial(r.name)}
                </span>
                <div>
                  <figcaption className="re-rev__name">{r.name}</figcaption>
                  <span className="re-rev__when">{r.when}</span>
                </div>
              </div>
              <Stars count={r.rating} />
              <blockquote className="re-rev__body">{r.body}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
