'use client';

/**
 * The practice overview a bento card's "expand" button opens.
 *
 * The card still links straight through to the service page; this is the other
 * route — everything that practice does, read without leaving the home page:
 * the promise and its proof points, what the work actually is, the sub-services
 * as a grid, how an engagement runs, and what lands in the client's file.
 *
 * Content comes in as a ServiceOverview, assembled on the server so the three
 * UAE registries stay out of the browser bundle — see lib/service-overview.ts.
 *
 * Rendered through a portal to <body>: the bento cards sit inside transformed,
 * clipped containers, and a fixed overlay inside one of those would be trapped
 * by it.
 */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { rurl } from '@/lib/region';
import { plainText } from '@/lib/html-text';
import type { ServiceOverview } from '@/lib/service-overview';
import { Ico } from '@/components/vxh/kit';
import Html from '@/components/Html';

/** Everything focusable inside the dialog, for the tab trap. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ServiceModal({
  service,
  region,
  onClose,
}: {
  service: ServiceOverview;
  region: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    /* The element that had focus before the dialog opened — the expand button —
       so it can be given back when the dialog closes. */
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    /* Hold the page still behind the dialog, without the layout jump that
       removing the scrollbar would cause. */
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      opener?.focus?.();
    };
  }, [onClose]);

  const titleId = `vxm-${service.slug}-h`;

  const body = (
    <div className="vxm" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="vxm__panel vxh"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <button className="vxm__close" type="button" onClick={onClose} aria-label="Close" ref={closeRef}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* ---- the promise, and the proof beside it ---- */}
        <div className="vxm__head">
          <div>
            <Html as="h2" className="vxm__title" id={titleId} html={service.title} />
            <Html as="p" className="vxm__lede" html={service.lede} />
            <div className="vxm__cta">
              <a className="vxh-btn vxh-btn--blue" href={rurl(region, service.href)}>
                <Html as="span" html={`Explore ${service.short} `} />
                <Ico name="ne" size={16} />
              </a>
              <a className="vxm__ghost" href={rurl(region, '/free-consultation/')}>
                Free consultation
              </a>
            </div>
          </div>

          {service.points.length ? (
            <ul className="vxm__points">
              {service.points.map((p) => (
                <li key={p}>
                  <span className="vxm__tick" aria-hidden="true">
                    <Ico name="check" size={12} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="vxm__body">
          {/* ---- what the work is ---- */}
          {service.what ? (
            <section className="vxm__sec">
              <span className="vxm__k">What we do</span>
              <Html as="h3" className="vxm__h" html={service.what.title} />
              <div className="vxm__prose">
                {service.what.p.map((p, i) => (
                  <Html key={i} as="p" html={p} />
                ))}
              </div>
              {service.audience.length ? (
                <div className="vxm__chips">
                  {service.audience.map((a) => (
                    <Html key={a} as="span" html={a} />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          {/* ---- the sub-services ---- */}
          {service.includes.length ? (
            <section className="vxm__sec">
              <span className="vxm__k">What&rsquo;s included</span>
              <h3 className="vxm__h">
                {service.includes.length} services under {plainText(service.short)}
              </h3>
              <div className="vxm__grid">
                {service.includes.map((c) => (
                  <a className="vxm__card" href={rurl(region, c.href)} key={c.href}>
                    <Html as="h4" className="vxm__card-t" html={c.title} />
                    <Html as="p" className="vxm__card-d" html={c.lede} />
                    <span className="vxm__card-go">
                      <Ico name="arrow" size={14} />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          {/* ---- how an engagement runs ---- */}
          {service.process ? (
            <section className="vxm__sec">
              <span className="vxm__k">How it runs</span>
              <Html as="h3" className="vxm__h" html={service.process.title} />
              <Html as="p" className="vxm__sub" html={service.process.text} />
              <ol className="vxm__steps">
                {service.process.steps.map((st, i) => (
                  <li key={st[0]}>
                    <span className="vxm__n">{String(i + 1).padStart(2, '0')}</span>
                    <Html as="h4" className="vxm__card-t" html={st[0]} />
                    <Html as="p" className="vxm__card-d" html={st[1]} />
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {/* ---- what the client is left holding ---- */}
          {service.deliverables.length ? (
            <section className="vxm__sec">
              <span className="vxm__k">What you receive</span>
              <h3 className="vxm__h">Deliverables you can hold, not promises.</h3>
              <div className="vxm__grid vxm__grid--tight">
                {service.deliverables.map((d) => (
                  <div className="vxm__card vxm__card--flat" key={d.t}>
                    <span className="vxm__card-ic">
                      <Ico name={d.i} size={18} />
                    </span>
                    <Html as="h4" className="vxm__card-t" html={d.t} />
                    <Html as="p" className="vxm__card-d" html={d.d} />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <div className="vxm__foot">
            <a className="vxh-btn vxh-btn--blue" href={rurl(region, service.href)}>
              <Html as="span" html={`Explore ${service.short} in full `} />
              <Ico name="ne" size={16} />
            </a>
            <a className="vxm__ghost" href={rurl(region, '/contact/')}>
              Talk to a partner
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(body, document.body);
}
