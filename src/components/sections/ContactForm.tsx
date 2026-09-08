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
 * store it. Only the prefix is a prop, which is why the suffixes are built here
 * rather than written out per field: a typo in one of four literals is a lead
 * that arrives with a blank name.
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

const FIELDS: { key: string; label: string; type: string; autoComplete: string }[] = [
  { key: 'full_name', label: 'Full name', type: 'text', autoComplete: 'name' },
  { key: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { key: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { key: 'company', label: 'Company', type: 'text', autoComplete: 'organization' },
];

export default function ContactForm({
  privacyHref,
  /* Which lead form this is, in form-handler's SOURCE_MAP — 5099fe1 is the
     generic enquiry, 7655e08 is the Contact page. Passing the right one is what
     labels the row in the admin panel; getting it wrong still stores the lead,
     under the wrong heading. */
  formId = '5099fe1',
  postId = '17',
  /* The field-name prefix. form-handler matches by suffix, so this only has to
     be distinct enough that two forms on one page do not share ids. */
  prefix = 'home',
  submitLabel = 'Send enquiry',
}: {
  privacyHref: string;
  formId?: string;
  postId?: string;
  prefix?: string;
  submitLabel?: string;
}) {
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
      <input type="hidden" name="form_id" value={formId} />
      <input type="hidden" name="post_id" value={postId} />
      <input type="hidden" name="referer_title" value="VALUNXT Capital" />
      <input type="hidden" name="queried_id" value={postId} />

      <div className="vxc-form__fields">
        {FIELDS.map((f) => (
          <p className="vxc-field" key={f.key}>
            <label className="vxc-field__label" htmlFor={`vxc-${prefix}-${f.key}`}>
              {f.label}
            </label>
            <input
              className="vxc-field__input"
              id={`vxc-${prefix}-${f.key}`}
              name={`form_fields[${prefix}_${f.key}]`}
              type={f.type}
              autoComplete={f.autoComplete}
              required
            />
          </p>
        ))}
      </div>

      <div className="vxc-form__foot">
        <button className="vxc-send" type="submit" disabled={sending}>
          {sending ? 'Sending…' : submitLabel}
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
