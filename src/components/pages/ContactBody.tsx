/**
 * /contact/ — one form, one map, and the lines that actually answer.
 *
 * The captured page was three linked icon-boxes over a two-column block with a
 * second heading and a second lede, then the form, then the map, then the
 * newsletter — and it published a Mumbai address beside a UAE telephone number
 * under a bare "Call us at:", which read as one contactable location.
 *
 * The map stays; it is the only thing on the page a visitor might actually
 * need. What it points at is now the office that answers in the visitor's own
 * market, and the number beside it is that market's line — one country, one
 * contactable place. The full office list lives on /location/.
 *
 * THE FORM IS THE SAME FORM. It posts to /form-handler/ under form id 7655e08,
 * which is the id the Elementor widget used and the one SOURCE_MAP labels
 * "Contact" — so a submission from this page lands in the same table, under the
 * same heading, as every submission before it.
 */
import { rurl, vxnRegionData, vxnRegionOffices, vxnRegionPhone } from '@/lib/region';
import { vxnEmail, vxnMarkets, type Office } from '@/lib/site-data';
import { Ico } from '@/components/vxh/kit';
import { Faq, Newsletter, PageHero, type FaqItem } from '@/components/vxh/PageKit';
import ContactForm from '@/components/sections/ContactForm';

/** The office's own Google Maps link, turned into an embeddable URL. */
function embedMap(office: Office): string {
  const q = office.map.replace(/^https?:\/\/maps\.google\.com\/\?q=/, '');
  return `https://maps.google.com/maps?q=${q}&t=m&z=15&output=embed&iwloc=near`;
}

const FAQ: FaqItem[] = [
  {
    q: 'How quickly will someone reply?',
    a: '<p>Within one business day, from a named senior adviser rather than an inbox.</p>',
  },
  {
    q: 'What should I put in the message?',
    a: '<p>The decision you are trying to make and roughly when you need to make it. That is enough for us to say whether we are the right people and what a scope would look like.</p>',
  },
  {
    q: 'Is the first conversation chargeable?',
    a: '<p>No. Scoping costs nothing, and nothing is billable until scope and fee are agreed in writing.</p>',
  },
  {
    q: 'Can I just call?',
    a: '<p>Yes. Both published lines reach the same team; the one on this page is the line answered in your market.</p>',
  },
];

export default function ContactBody({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const email = vxnEmail();

  /* The office that answers in the visitor's own market, and the map that goes
     with it — never one market's address beside another's telephone number. */
  const mine = Object.values(vxnRegionOffices(region));
  const primary = mine[0];

  return (
    <div id="main-content">
      <div id="main" role="main" className="vamtam-main layout-full">
        <div className="vxh vxp">
          <PageHero
            region={region}
            crumb={[['Contact']]}
            eyebrow="Contact"
            title='Discuss your next <span class="vxh-grad">investment decision.</span>'
            lede="Tell us what you are weighing up. A partner reads it, and replies within one business day — with a view, not a brochure."
            bg={{ abs: 'stripes' }}
            par="peel"
            meta={[
              ['Reply', 'One business day'],
              ['Scoping call', 'Free'],
              ['Offices', vxnMarkets('cities')],
              ['Line', phone],
            ]}
          />

          {/* The form, and the lines beside it. */}
          <section className="vxn-contact vxp-sec vxp-sec--tight" aria-labelledby="vxn-contact-h">
            <div className="vxh__in">
              <div className="vxn-contact__grid">
                <div className="vxn-contact__form">
                  <h2 className="vxn-contact__h" id="vxn-contact-h">
                    Send us a message.
                  </h2>
                  <ContactForm
                    privacyHref={rurl(region, '/privacy-policy/')}
                    formId="7655e08"
                    postId="264"
                    prefix="contact"
                    submitLabel="Send message"
                  />
                </div>

                <aside className="vxn-contact__aside">
                  <ul className="vxn-contact__lines">
                    <li>
                      <a href={`tel:${reg.tel}`}>
                        <span className="vxn-contact__ic">
                          <Ico name="phone" size={18} />
                        </span>
                        <span>
                          <b>{phone}</b>
                          <small>{reg.hours}</small>
                        </span>
                        <Ico name="ne" size={15} />
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${email}`}>
                        <span className="vxn-contact__ic">
                          <Ico name="mail" size={18} />
                        </span>
                        <span>
                          <b>{email}</b>
                          <small>Advisory, careers and general enquiries</small>
                        </span>
                        <Ico name="ne" size={15} />
                      </a>
                    </li>
                    {primary ? (
                      <li>
                        <a href={primary.map} target="_blank" rel="noopener">
                          <span className="vxn-contact__ic">
                            <Ico name="pin" size={18} />
                          </span>
                          <span>
                            <b>{primary.city}</b>
                            <small>{primary.address}</small>
                          </span>
                          <Ico name="ne" size={15} />
                        </a>
                      </li>
                    ) : null}
                    <li>
                      <a href={rurl(region, '/location/')}>
                        <span className="vxn-contact__ic">
                          <Ico name="globe" size={18} />
                        </span>
                        <span>
                          <b>All {vxnMarkets('cities').split(',').length} offices</b>
                          <small>Addresses, hours and a map of each</small>
                        </span>
                        <Ico name="ne" size={15} />
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
            </div>
          </section>

          {/* The map — the one thing on this page a visitor might need. */}
          {primary ? (
            <section className="vxn-contact__map" aria-label={`${primary.city} office`}>
              <iframe
                loading="lazy"
                src={embedMap(primary)}
                title={`${primary.entity} — ${primary.address}`}
                aria-label={`${primary.city} office`}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>
          ) : null}

          <Faq items={FAQ} eyebrow="Before You Write" title="What happens after you press send." id="vxn-contact-faq" />

          <Newsletter region={region} />
        </div>
      </div>
    </div>
  );
}
