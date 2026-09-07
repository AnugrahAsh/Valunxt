/**
 * "Get in touch" — the enquiry block that closes the home page, the services
 * index and every service page.
 *
 * Replaces the captured Elementor block (the "Let's Connect" banner, the two
 * icon-box cards, the blurred quote panel and the boxed four-field form). That
 * block was the last piece of the old page still carrying photography, glass
 * and Elementor's own form chrome, and it read as a different site from the one
 * above it.
 *
 * This is the same offer in the design's own language and nothing more: the
 * heading, the three ways to reach a partner as a ruled list, and four
 * underlined fields. No card, no image, no panel.
 *
 * It also absorbed the "Ready when you are" band that used to follow it on the
 * home page and the services index: that band was a second contact CTA a screen
 * below this one, and its cream ground and arc artwork are now this section's
 * — in three dimensions, and reacting to the pointer.
 *
 * The form itself is a client component — see ContactForm for why, and for the
 * field names the lead endpoint matches on.
 *
 * It carries `vxh` itself rather than relying on an ancestor: the design's
 * tokens, type family and resets are declared on that class, and this section is
 * dropped straight into routes that render it outside the page's own `.vxh`
 * wrapper — where `var(--vxh-ink)` resolves to nothing and the block comes out
 * unstyled. Nesting it inside another `.vxh` simply redeclares the same values.
 */
import { rurl, vxnRegionData, vxnRegionPhone } from '@/lib/region';
import { vxnEmail } from '@/lib/site-data';
import { Abs, Ico } from '@/components/vxh/kit';
import ArcField from './ArcField';
import ContactForm from './ContactForm';

export default function ContactSection({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const email = vxnEmail();

  return (
    <section className="vxh vxc" id="vxc" aria-labelledby="vxc-h">
      {/* The arc field the "Ready when you are" band used to carry, now this
          block's own: the flat CSS layers first, and the three-dimensional
          version over them once it is ready. See ArcField. */}
      <Abs variant="arcs" mod="light" />
      <ArcField />

      <div className="vxh__in">
        <div className="vxc__grid">
          <div className="vxc__aside">
            <span className="vxh-eyebrow">Get in Touch</span>
            <h2 className="vxh-h2" id="vxc-h">
              Tell us what you need to do.
            </h2>
            <p className="vxh-lede">
              A partner will say what is needed, what is not, and what it will cost &#8212; before
              any work begins.
            </p>

            <ul className="vxc-ways">
              <li>
                <span className="vxc-ways__k">Call</span>
                <a className="vxc-ways__v" href={`tel:${reg.tel}`}>
                  {phone}
                </a>
                <span className="vxc-ways__n">{reg.hours}</span>
              </li>
              <li>
                <span className="vxc-ways__k">Email</span>
                <a className="vxc-ways__v" href={`mailto:${email}`}>
                  {email}
                </a>
                <span className="vxc-ways__n">Reply within one business day</span>
              </li>
              <li>
                <span className="vxc-ways__k">Visit</span>
                <span className="vxc-ways__v">{reg.cities}</span>
                <a className="vxc-ways__n vxc-ways__link" href={rurl(region, '/location/')}>
                  Office addresses <Ico name="arrow" size={13} />
                </a>
              </li>
            </ul>
          </div>

          <div className="vxc__form">
            <ContactForm privacyHref={rurl(region, '/privacy-policy/')} />
          </div>
        </div>
      </div>
    </section>
  );
}
