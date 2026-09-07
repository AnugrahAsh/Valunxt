'use client';

/**
 * The enquiry form, wired to the site's own lead endpoint.
 *
 * Posts to /form-handler/, the route that replaced form-handler.php, so an
 * enquiry lands in the same `enquiries` table the admin panel reads — labelled
 * "Enquiry" via the hidden form_id 5099fe1 and the matching entry in SOURCE_MAP
 * in src/app/form-handler/route.ts. The id is the one the Elementor widget used,
 * kept so submissions from the redesigned block are indistinguishable from the
 * ones already in the table.
 *
 * FIELD NAMES ARE LOAD-BEARING. form-handler matches by suffix — `full_name`,
 * `email`, `phone`, `company` — so renaming one would log the value and never
 * store it. They are unchanged from the block this replaces.
 *
 * WHY A CLIENT COMPONENT. The endpoint answers with Elementor-shaped JSON, so a
 * native post would navigate the visitor to a page of raw JSON. This intercepts
 * the submit and renders the endpoint's own message in place. The <form> keeps a
 * real `action` and `method` regardless, so with JavaScript unavailable the
 * submission still reaches the endpoint — an ugly response page beats a lost
 * enquiry.
 *
 * NO ELEMENTOR MARKUP. The block this replaces was an Elementor form widget, and
 * carrying its class names forward meant carrying its styling too — the kit
 * sheet boxes every input, and valunxt-brand.css repaints
 * `form.elementor-form button[type="submit"]` with !important. So the form is
 * plain, and the site-wide lead script names `.vxc-form` alongside the captured
 * forms instead of matching it by Elementor class (see LEAD_FORMS in
 * SiteScripts). That script is what puts the international dial-code selector on
 * the phone field and validates the four fields before a submit goes through.
 */
import { useState } from 'react';

import { Ico } from '@/components/vxh/kit';

/** The route that replaced form-handler.php. Trailing slash: trailingSlash is on. */
const LEAD_ENDPOINT = '/form-handler/';

type Status = { state: 'idle' | 'sending' } | { state: 'sent' | 'error'; message: string };

const FIELDS: { id: string; name: string; label: string; type: string; autoComplete: string }[] = [
  { id: 'home_full_name', name: 'form_fields[home_full_name]', label: 'Full name', type: 'text', autoComplete: 'name' },
  { id: 'home_email', name: 'form_fields[home_email]', label: 'Email', type: 'email', autoComplete: 'email' },
  { id: 'home_phone', name: 'form_fields[home_phone]', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { id: 'home_company', name: 'form_fields[home_company]', label: 'Company', type: 'text', autoComplete: 'organization' },
];

export default function ContactForm({ privacyHref }: { privacyHref: string }) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: 'sending' });
    try {
      const res = await fetch(LEAD_ENDPOINT, { method: 'POST', body: new FormData(form) });
      const body = await res.json().catch(() => null);
      const message = body?.data?.message;
      if (res.ok && body?.success) {
        setStatus({
          state: 'sent',
          message: message || 'Thank you — a partner will reply within one business day.',
        });
        form.reset();
        return;
      }
      setStatus({
        state: 'error',
        message: message || 'That did not go through. Please try again, or call us.',
      });
    } catch {
      setStatus({
        state: 'error',
        message: 'We could not send that just now. Please try again, or call us.',
      });
    }
  }

  const sending = status.state === 'sending';

  return (
    <form
      className="vxc-form"
      method="post"
      action={LEAD_ENDPOINT}
      onSubmit={onSubmit}
      aria-label="Enquiry"
    >
      <input type="hidden" name="form_id" value="5099fe1" />
      <input type="hidden" name="post_id" value="17" />
      <input type="hidden" name="referer_title" value="VALUNXT Capital" />
      <input type="hidden" name="queried_id" value="17" />

      <div className="vxc-form__fields">
        {FIELDS.map((f) => (
          <p className="vxc-field" key={f.id}>
            <label className="vxc-field__label" htmlFor={`vxc-${f.id}`}>
              {f.label}
            </label>
            <input
              className="vxc-field__input"
              id={`vxc-${f.id}`}
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              required
            />
          </p>
        ))}
      </div>

      <div className="vxc-form__foot">
        <button className="vxc-send" type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Send enquiry'}
          <Ico name="ne" size={16} />
        </button>
        <p className="vxc-fine">
          By submitting you agree to our <a href={privacyHref}>Privacy Policy</a>.
        </p>
      </div>

      {status.state === 'sent' || status.state === 'error' ? (
        <p
          className={`vxc-msg${status.state === 'error' ? ' is-error' : ''}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
