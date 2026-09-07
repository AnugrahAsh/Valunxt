'use client';

/**
 * The consultation form, wired to the site's own lead endpoint.
 *
 * Posts to /form-handler/, the route that replaced form-handler.php, so an
 * enquiry from this section lands in the same `enquiries` table the admin panel
 * reads — labelled "Real Estate" via the hidden form_id and the matching entry
 * in SOURCE_MAP in src/app/form-handler/route.ts.
 *
 * FIELD NAMES ARE LOAD-BEARING. form-handler matches by suffix — `full_name`,
 * `phone`, `company`, `email` — so a field called `name` would be logged and
 * never stored. Hence the `re_` prefixes: they keep this section's fields
 * distinguishable in the log while still ending in what the endpoint looks for.
 * `re_location` and `re_budget` have no column of their own and reach the JSON
 * log only; that is deliberate — adding columns is a schema change.
 *
 * WHY A CLIENT COMPONENT. The endpoint answers with Elementor-shaped JSON, so a
 * native post would navigate the visitor to a page of raw JSON. This intercepts
 * the submit and renders the endpoint's own message in place. The <form> keeps a
 * real `action` and `method` regardless, so with JavaScript unavailable the
 * submission still reaches the endpoint — an ugly response page beats a lost
 * enquiry.
 */
import { useState } from 'react';

import { BRAND } from '../data/site';
import { CONTACT } from '../data/home';
import { ArrowRight } from './icons';

/** The route that replaced form-handler.php. Trailing slash: trailingSlash is on. */
export const LEAD_ENDPOINT = '/form-handler/';

type Status = { state: 'idle' | 'sending' } | { state: 'sent' | 'error'; message: string };

export default function LeadForm({ action }: { action?: string }) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const endpoint = action ?? LEAD_ENDPOINT;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: 'sending' });
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form) });
      const body = await res.json().catch(() => null);
      const message = body?.data?.message;
      if (res.ok && body?.success) {
        setStatus({ state: 'sent', message: message || 'Thank you — your enquiry has been received.' });
        form.reset();
        return;
      }
      setStatus({ state: 'error', message: message || 'That did not go through. Please try again, or call us.' });
    } catch {
      setStatus({
        state: 'error',
        message: `We could not send that just now. Please try again, or call ${BRAND.phone}.`,
      });
    }
  }

  const sending = status.state === 'sending';

  return (
    <form className="vxn-re-form" method="post" action={endpoint} onSubmit={onSubmit}>
      <h3 className="vxn-re-form__title">{CONTACT.formTitle}</h3>
      <p className="vxn-re-form__note">{CONTACT.formNote}</p>

      {/* Read by form-handler's SOURCE_MAP, so the enquiry is labelled
          "Real Estate" in the admin panel rather than by a raw widget id. */}
      <input type="hidden" name="form_id" value="real-estate" />
      <input type="hidden" name="form_name" value="Real Estate Enquiry" />

      <label className="vxn-re-form__field">
        <span>Your name</span>
        <input type="text" name="re_full_name" required autoComplete="name" />
      </label>

      <div className="vxn-re-form__row">
        <label className="vxn-re-form__field">
          <span>Email address</span>
          <input type="email" name="re_email" required autoComplete="email" />
        </label>
        <label className="vxn-re-form__field">
          <span>Phone</span>
          <input type="tel" name="re_phone" placeholder="+971 50 000 0000" autoComplete="tel" />
        </label>
      </div>

      <div className="vxn-re-form__row">
        <label className="vxn-re-form__field">
          <span>Location of interest</span>
          <input type="text" name="re_location" placeholder="e.g. Business Bay" />
        </label>
        <label className="vxn-re-form__field">
          <span>Budget range</span>
          <select name="re_budget" defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            <option>Under AED 1M</option>
            <option>AED 1M – 3M</option>
            <option>AED 3M – 7M</option>
            <option>AED 7M – 15M</option>
            <option>AED 15M+</option>
          </select>
        </label>
      </div>

      <button type="submit" className="vxn-re__btn" disabled={sending}>
        {sending ? 'Sending…' : CONTACT.submit}
        <ArrowRight />
      </button>

      {/* aria-live so the outcome is announced, not just painted. */}
      <p className="vxn-re-form__status" data-state={status.state} role="status" aria-live="polite">
        {status.state === 'sent' || status.state === 'error' ? status.message : ''}
      </p>

      <p className="vxn-re-form__legal">
        By submitting this form you agree to be contacted by {BRAND.name} about your enquiry.
      </p>
    </form>
  );
}
