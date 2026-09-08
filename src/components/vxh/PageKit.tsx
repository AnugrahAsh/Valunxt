/**
 * The parts every redesigned page is built from.
 *
 * WHY THIS EXISTS. Ten pages were each carrying their own captured Elementor
 * hero, their own accordion and their own newsletter band — ten copies of three
 * ideas, drifting apart one edit at a time. Everything here is the vxh kit's
 * own vocabulary (see components/vxh/kit for the glyphs and the abstract
 * layer), assembled into the four blocks a page actually repeats.
 *
 * WHAT A PAGE STILL OWNS. Its ground: which abstract or animated field sits
 * behind the hero, which parallax the sections ride, and everything between the
 * hero and the closing band. These are the bookends, not a template — a page
 * that reads like every other page is the failure mode this is meant to avoid,
 * so the hero takes a `bg` and a `par` and no two pages pass the same pair.
 *
 * Styles: /assets/css/vxn-pages.css.
 */
import type { ReactNode } from 'react';

import { rurl } from '@/lib/region';
import { plainText } from '@/lib/html-text';
import Html from '@/components/Html';
import { Abs, Ico, type AbsVariant } from '@/components/vxh/kit';
import Field, { type FieldTone } from '@/components/vxh/Field';
import Subscribe from '@/components/vxh/Subscribe';

/* ---- Breadcrumb ---------------------------------------------------------- */

/** Home › … › this page. The last entry is the page and is not a link. */
export function Crumb({
  region,
  trail,
}: {
  region: string;
  /** [label, href?] — an entry without an href renders as the current page. */
  trail: Array<[string, string?]>;
}) {
  return (
    <nav className="vxh-crumb" aria-label="Breadcrumb">
      <a href={rurl(region, '/')}>Home</a>
      {trail.map(([label, href]) => (
        <span className="vxh-crumb__step" key={label}>
          <i />
          {href ? <a href={rurl(region, href)}>{label}</a> : <b>{label}</b>}
        </span>
      ))}
    </nav>
  );
}

/* ---- Page hero ----------------------------------------------------------- */

/**
 * The opening of a page: where you are, what this is, one sentence, one action.
 *
 * The name is set across the full measure and the sentence and the action sit
 * together on the hairline that closes it, so the whole opening is three rules
 * deep however long the title runs. Anything else a page wants to say up front
 * goes in `meta` — a short row of facts, never a second paragraph.
 */
export function PageHero({
  region,
  crumb,
  eyebrow,
  title,
  lede,
  action,
  /** 'field' animates (ogl); 'abs' is the static layered artwork; false is neither. */
  bg,
  /** The parallax kind this hero rides — see [data-vxh-par] in vxn-pages.css. */
  par,
  meta,
  children,
  className = '',
}: {
  region: string;
  crumb: Array<[string, string?]>;
  eyebrow?: string;
  title: string;
  lede?: string;
  action?: { label: string; href: string };
  bg?: { field: FieldTone } | { abs: AbsVariant; flip?: boolean } | false;
  par?: string;
  meta?: Array<[string, string]>;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`vxp-open ${className}`.trim()} aria-label={plainText(title)}>
      {bg && 'field' in bg ? (
        <div className="vxp-open__gl" {...(par ? { 'data-vxh-par': par } : {})}>
          <Field tone={bg.field} />
        </div>
      ) : null}
      {bg && 'abs' in bg ? (
        <div className="vxp-open__art" {...(par ? { 'data-vxh-par': par } : {})}>
          <Abs variant={bg.abs} mod="light" flip={bg.flip} />
        </div>
      ) : null}

      <div className="vxh__in">
        <Crumb region={region} trail={crumb} />
        {eyebrow ? <span className="vxh-eyebrow vxp-open__eye">{eyebrow}</span> : null}
        <Html as="h1" className="vxp-open__h" html={title} />
        {lede || action ? (
          <div className="vxp-open__foot">
            {lede ? <Html as="p" className="vxp-open__lede" html={lede} /> : <span />}
            {action ? (
              <a className="vxh-btn vxh-btn--blue vxp-open__cta" href={action.href}>
                {action.label} <Ico name="ne" size={16} />
              </a>
            ) : null}
          </div>
        ) : null}
        {meta?.length ? (
          <dl className="vxp-open__meta">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <Html as="dd" html={v} />
              </div>
            ))}
          </dl>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/* ---- Section head -------------------------------------------------------- */

/** Eyebrow, heading, and — where one earns its place — a sentence beside it. */
export function Head({
  eyebrow,
  title,
  lede,
  id,
  split = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  id?: string;
  /** True puts the sentence in a second column rather than under the heading. */
  split?: boolean;
}) {
  return (
    <div className={`vxp-head${split ? ' vxp-head--split' : ''}`}>
      <div>
        {eyebrow ? <span className="vxh-eyebrow">{eyebrow}</span> : null}
        <Html as="h2" className="vxp-head__h" {...(id ? { id } : {})} html={title} />
      </div>
      {lede ? <Html as="p" className="vxp-head__lede" html={lede} /> : null}
    </div>
  );
}

/* ---- FAQ ----------------------------------------------------------------- */

export interface FaqItem {
  q: string;
  /** HTML. Keep it to one or two short paragraphs — this is an answer, not a page. */
  a: string;
}

/**
 * Questions and answers, on hairlines.
 *
 * Every answer is in the DOM. The <details>/<summary> disclosure is native
 * HTML: keyboard-operable and screen-reader-announced without a line of
 * JavaScript, and search engines index closed panels. The FAQPage JSON-LD is
 * built from the same array that renders the markup, so the two cannot drift.
 */
export function Faq({
  items,
  eyebrow = 'Questions',
  title,
  id = 'vxp-faq',
}: {
  items: FaqItem[];
  eyebrow?: string;
  title: string;
  id?: string;
}) {
  if (!items.length) return null;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: plainText(i.q),
      acceptedAnswer: { '@type': 'Answer', text: plainText(i.a) },
    })),
  };

  return (
    <section className="vxp-faq vxp-sec" id={id} aria-labelledby={`${id}-h`}>
      <div className="vxh__in">
        <Head eyebrow={eyebrow} title={title} id={`${id}-h`} />
        <div className="vxp-faq__list">
          {items.map((i, n) => (
            <details className="vxp-faq__i" key={i.q} data-vxn-in="up">
              <summary>
                <span className="vxp-faq__n">{String(n + 1).padStart(2, '0')}</span>
                <Html as="span" className="vxp-faq__q" html={i.q} />
                <span className="vxp-faq__sign" aria-hidden="true" />
              </summary>
              <Html className="vxp-faq__a" html={i.a} />
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}

/**
 * The same disclosure, in named groups, for a page that is nothing but
 * questions. One FAQPage entity covers all of them — three on a page would be
 * three competing claims about what the page is.
 */
export function FaqGroups({
  groups,
  eyebrow = 'Questions',
  title,
  id = 'vxp-faq',
}: {
  groups: Array<{ group: string; items: FaqItem[] }>;
  eyebrow?: string;
  title: string;
  id?: string;
}) {
  const all = groups.flatMap((g) => g.items);
  if (!all.length) return null;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: all.map((i) => ({
      '@type': 'Question',
      name: plainText(i.q),
      acceptedAnswer: { '@type': 'Answer', text: plainText(i.a) },
    })),
  };

  let n = 0;
  return (
    <section className="vxp-faq vxp-sec" id={id} aria-labelledby={`${id}-h`}>
      <div className="vxh__in">
        <Head eyebrow={eyebrow} title={title} id={`${id}-h`} />
        {groups.map((g) => (
          <div className="vxp-faq__group" key={g.group}>
            <Html as="h3" className="vxp-faq__gh" html={g.group} />
            <div className="vxp-faq__list">
              {g.items.map((i) => {
                n += 1;
                return (
                  <details className="vxp-faq__i" key={i.q} data-vxn-in="up">
                    <summary>
                      <span className="vxp-faq__n">{String(n).padStart(2, '0')}</span>
                      <Html as="span" className="vxp-faq__q" html={i.q} />
                      <span className="vxp-faq__sign" aria-hidden="true" />
                    </summary>
                    <Html className="vxp-faq__a" html={i.a} />
                  </details>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}

/* ---- Newsletter ---------------------------------------------------------- */

/**
 * The newsletter band. One field on a rule — it is asking for an email address,
 * so it looks like a line you write on rather than a boxed form with a heading
 * of its own. The field itself is vxh/Subscribe, which is where the endpoint,
 * the hidden fields and the interception live.
 */
export function Newsletter({
  region,
  title = 'One email. When there is something worth reading.',
  note = 'Market notes and research from our own desk. No more than monthly.',
}: {
  region: string;
  title?: string;
  note?: string;
}) {
  return (
    <section className="vxp-news" aria-labelledby="vxp-news-h">
      <div className="vxh__in">
        <div className="vxp-news__grid">
          <div>
            <span className="vxh-eyebrow">Newsletter</span>
            <h2 className="vxp-news__h" id="vxp-news-h">
              {title}
            </h2>
            <p className="vxp-news__note">{note}</p>
          </div>
          <Subscribe privacyHref={rurl(region, '/privacy-policy/')} />
        </div>
      </div>
    </section>
  );
}

/* ---- Closing band -------------------------------------------------------- */

/** The three ways to reach us, on the dark ground the site closes every page with. */
export function Ready({
  region,
  eyebrow = 'Ready When You Are',
  title = 'Start with a conversation, not a commitment.',
  lede = 'A free consultation, a fixed-fee quote in writing, and a named partner from the first call.',
  phone,
  tel,
  hours,
  abs = 'waves',
}: {
  region: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  phone: string;
  tel: string;
  hours: string;
  abs?: AbsVariant;
}) {
  const ways: Array<{ href: string; icon: string; t: string; d: string }> = [
    {
      href: rurl(region, '/free-consultation/'),
      icon: 'users',
      t: 'Book a free consultation',
      d: 'No obligation. A partner listens first and says what is actually needed.',
    },
    {
      href: rurl(region, '/contact/'),
      icon: 'doc',
      t: 'Get a fixed-fee quote',
      d: 'Scope and fee agreed in writing before any work begins.',
    },
    { href: `tel:${tel}`, icon: 'phone', t: `Call ${phone}`, d: hours },
  ];

  return (
    <section className="vxh-ready" aria-labelledby="vxp-ready-h">
      <Abs variant={abs} mod="light" flip />
      <div className="vxh__in">
        <div className="vxh-ready__grid">
          <div>
            <span className="vxh-eyebrow">{eyebrow}</span>
            <h2 className="vxh-h2" id="vxp-ready-h">
              {title}
            </h2>
            <p className="vxh-lede">{lede}</p>
          </div>
          <ul className="vxh-ways">
            {ways.map((w) => (
              <li key={w.t}>
                <a className="vxh-way" href={w.href}>
                  <span className="vxh-way__ic">
                    <Ico name={w.icon} size={22} />
                  </span>
                  <span>
                    <span className="vxh-way__t">{w.t}</span>
                    <span className="vxh-way__d">{w.d}</span>
                  </span>
                  <Ico name="ne" size={20} className="arr" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
