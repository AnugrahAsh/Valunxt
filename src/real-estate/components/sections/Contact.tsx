/**
 * Get in Touch — the reasons on the left, the consultation form on the right,
 * both over a darkened photograph.
 *
 * The form itself lives in ContactForm.tsx because it has to be a client
 * component: it posts to the site's lead endpoint with fetch and renders the
 * reply in place. Everything else on this section is static copy and stays on
 * the server, which is why the two are split rather than marking the whole
 * section 'use client'.
 *
 * There is deliberately no captcha widget here. Adding one means a third-party
 * script and a site key; see the module README for where it goes.
 */
import { CONTACT } from '../../data/home';
import type { Locale } from '../../lib/types';
import ContactForm from './ContactForm';

export default function Contact({ locale, action }: { locale: Locale; action?: string }) {
  return (
    <section className="re-contact" id="contact">
      <div className="re-wrap">
        <div className="re-contact__frame">
          <div className="re-contact__bg" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CONTACT.img} alt="" loading="lazy" />
          </div>

          <div className="re-contact__inner">
            <div>
              <span className="re-eyebrow re-eyebrow--ghost">{CONTACT.eyebrow}</span>
              <h2 className="re-h2">{CONTACT.title}</h2>
              <p className="re-lede">{CONTACT.lede}</p>

              <ul className="re-why">
                <h4>{CONTACT.whyTitle}</h4>
                {CONTACT.why.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>

            <ContactForm locale={locale} action={action} />
          </div>
        </div>
      </div>
    </section>
  );
}
