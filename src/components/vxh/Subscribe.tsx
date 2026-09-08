'use client';

/**
 * The newsletter field.
 *
 * THE HIDDEN FIELDS ARE LOAD-BEARING. It posts to /form-handler/ with the same
 * `form_id`, `post_id` and `form_fields[email]` the captured Elementor widget
 * sent, so a subscription from a redesigned page is indistinguishable from one
 * already in the log. Rename any of them and the submission still succeeds and
 * is still recorded — as an unattributable row.
 *
 * WHY IT INTERCEPTS ITS OWN SUBMIT. The endpoint answers with Elementor-shaped
 * JSON. The captured bands get away with a plain `<form>` because Elementor's
 * own frontend script binds to the widget they sit in and posts it over ajax;
 * this band is not an Elementor widget, so a native post would navigate the
 * visitor to a page of raw JSON. It keeps a real `action` and `method` anyway,
 * so with JavaScript unavailable the address still reaches the endpoint — an
 * ugly response page beats a lost subscription.
 *
 * NO ELEMENTOR CLASS NAMES, for the same reason ContactForm carries none: the
 * captured sheets repaint `form.elementor-form button[type="submit"]` with
 * !important, and a field that is meant to be a rule you write on would come
 * back as a boxed input with a blue pill beside it.
 */
import { useState } from 'react';

import { Ico } from '@/components/vxh/kit';

const ENDPOINT = '/form-handler/';

type Status = { state: 'idle' | 'sending' } | { state: 'sent' | 'error'; message: string };

export default function Subscribe({ privacyHref }: { privacyHref: string }) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: 'sending' });
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: new FormData(form) });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.success) {
        setStatus({ state: 'sent', message: 'Thank you — you are on the list.' });
        form.reset();
        return;
      }
      setStatus({
        state: 'error',
        message: body?.data?.message || 'That did not go through. Please check the address and try again.',
      });
      return;
    } catch {
      setStatus({ state: 'error', message: 'We could not send that just now. Please try again.' });
    }
  }

  const sending = status.state === 'sending';

  return (
    <form className="vxp-news__form" method="post" action={ENDPOINT} onSubmit={onSubmit} aria-label="Subscribe">
      <input type="hidden" name="form_id" value="3b33bfe" />
      <input type="hidden" name="post_id" value="4557" />
      <input type="hidden" name="referer_title" value="VALUNXT Capital" />

      <label className="vxp-news__lab" htmlFor="vxp-news-email">
        Email
      </label>
      <div className="vxp-news__row">
        <input
          className="vxp-news__in"
          id="vxp-news-email"
          name="form_fields[email]"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
        <button className="vxp-news__go" type="submit" disabled={sending}>
          {sending ? 'Sending' : 'Subscribe'} <Ico name="ne" size={15} />
        </button>
      </div>

      {status.state === 'sent' || status.state === 'error' ? (
        <p className={`vxp-news__msg${status.state === 'error' ? ' is-bad' : ''}`} role="status">
          {status.message}
        </p>
      ) : null}

      <p className="vxp-news__fine">
        Unsubscribe from any email. See our <a href={privacyHref}>Privacy Policy</a>.
      </p>
    </form>
  );
}
