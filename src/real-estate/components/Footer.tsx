/**
 * The section's footer.
 *
 * DAMAC's shape — a newsletter band across the top, then a brand column beside
 * three link columns, then a thin legal bar — on the brand's navy gradient
 * rather than DAMAC's black.
 *
 * The newsletter posts to the site's own lead endpoint, so a subscriber lands in
 * the same place every other enquiry does. It is a plain form rather than a
 * client component: an email-only signup has nothing to validate that the input
 * type does not already handle, and the endpoint answers with JSON that the
 * visitor will see — which is why the more important consultation form in
 * LeadForm.tsx is the one that gets JavaScript.
 */
import { rurl } from '@/lib/region';
import { BRAND, FOOTER_COLUMNS } from '../data/site';
import type { Locale } from '../lib/types';
import { ArrowRight, SocialIcon } from './icons';

const SOCIAL = ['linkedin', 'instagram', 'facebook', 'x'] as const;

export default function Footer({ region }: { region: Locale }) {
  return (
    <footer className="vxn-re-foot">
      <div className="vxn-re__wrap">
        <div className="vxn-re-foot__news">
          <div>
            <h2>Market intelligence, before it is priced in.</h2>
            <p>
              Occasional notes on Dubai property — what moved, what it means, and where the evidence
              points. No listings, no noise.
            </p>
          </div>
          <form className="vxn-re-foot__form" method="post" action="/form-handler/">
            <input type="hidden" name="form_id" value="real-estate-subscribe" />
            <label className="vxn-re-sr" htmlFor="re-foot-email">
              Email address
            </label>
            <input
              id="re-foot-email"
              type="email"
              name="re_subscribe_email"
              placeholder="Your email address"
              required
              autoComplete="email"
            />
            <button type="submit" className="vxn-re__btn">
              Subscribe
              <ArrowRight />
            </button>
          </form>
        </div>

        <div className="vxn-re-foot__cols">
          <div className="vxn-re-foot__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/real-estate/img/brand/valunxt-white.svg" alt="VALUNXT" />
            <p>
              Real estate advisory from {BRAND.full} — one accountable partner across acquisition,
              disposal, letting and valuation.
            </p>
            <div className="vxn-re-foot__contact">
              <div>
                <span>Call</span>
                <a href={BRAND.phoneHref}>{BRAND.phone}</a>
              </div>
              <div>
                <span>Email</span>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </div>
              <div>
                <span>Office</span>
                {BRAND.address}
              </div>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div className="vxn-re-foot__col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <a href={l.href.startsWith('#') ? l.href : rurl(region, `/real-estate${l.href}`)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="vxn-re-foot__bottom">
          <p>
            © {new Date().getFullYear()} {BRAND.full}. All rights reserved. Property advisory only —
            nothing here is an offer, a valuation or investment advice.
          </p>
          <div className="vxn-re-foot__social">
            {SOCIAL.map((n) => (
              /* Captured without hrefs: the accounts were not published when this
                 was built, and inventing them would point visitors at profiles
                 that may not be the company's. */
              <a key={n} href={`#${n}`} aria-label={n}>
                <SocialIcon network={n} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
