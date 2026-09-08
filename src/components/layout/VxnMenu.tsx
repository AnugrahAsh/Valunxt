'use client';

/**
 * The menu behind the burger — a blue card, not a drawer.
 *
 * WHAT IT REPLACES. Elementor's own dropdown: the desktop `<ul>` re-rendered
 * underneath the bar as a white stack of links, appearing with no animation and
 * carrying the same twelve-pixel type it uses at 1400px. On a phone, and on
 * every laptop under 1400px where the bar collapses, that was the whole
 * navigation of the site.
 *
 * SHAPE. It comes in from the left as a card inset from all four edges, so the
 * page stays visible around it and it reads as something placed on top rather
 * than a panel welded to the side. The card slides and the veil fades on
 * separate curves; the items stagger in behind both, which is what makes it feel
 * like an object arriving rather than a div appearing.
 *
 * ONE PANEL, ANY NUMBER OF BUTTONS. Header 3837 renders its bar twice — the
 * sticky copy and the spacer that reserves its height — so a panel rendered
 * inside the bar would exist twice over. The panel is mounted once by PageShell;
 * the buttons live in the bars and carry the intent, not the state. They agree
 * because the event names the target state rather than toggling: two buttons and
 * one Escape key can never disagree about whether it is open.
 *
 * The links are plain anchors, so a click is a navigation and the panel goes
 * with the document. Nothing here needs to close it.
 *
 * Styles: /assets/css/vxn-mega.css.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import { BASE, rurl, vxnRegionData, vxnRegionPhone, vxnServices } from '@/lib/region';
import { vxnEmail } from '@/lib/site-data';
import { Ico } from '@/components/vxh/kit';
import Html from '@/components/Html';

/** The one channel the buttons and the panel agree over. */
const EVENT = 'vxn-menu';

function setMenu(open: boolean) {
  window.dispatchEvent(new CustomEvent<boolean>(EVENT, { detail: open }));
}

/** Subscribe to the shared open/closed state. */
function useMenuState(): boolean {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = (e: Event) => setOpen((e as CustomEvent<boolean>).detail);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return open;
}

/* ---- The button ---------------------------------------------------------- */

/**
 * Three rules that become a cross. The middle one fades and the outer two meet
 * in the centre and rotate — one transition, no icon swap, so it reads as the
 * same object in two states.
 */
export function MenuButton() {
  const open = useMenuState();
  return (
    <button
      className="vxn-burger"
      type="button"
      aria-expanded={open}
      aria-controls="vxn-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={() => setMenu(!open)}
    >
      <span className="vxn-burger__box" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}

/* ---- The panel ----------------------------------------------------------- */

interface Item {
  label: string;
  href: string;
  /** Rendered as a second tier under the item, in the panel only. */
  kids?: Array<{ label: string; href: string }>;
}

function menuItems(region: string): Item[] {
  const services = vxnServices(region);
  return [
    {
      label: 'Services',
      href: '/services/',
      kids: services.map((s) => ({ label: s.short ?? s.title, href: s.href })),
    },
    {
      label: 'About',
      href: '/about/',
      kids: [
        { label: 'Who We Are', href: '/about/' },
        { label: 'Leadership', href: '/about/leadership/' },
        { label: 'Location', href: '/location/' },
        { label: 'Careers', href: '/about/careers/' },
      ],
    },
    { label: 'Industries', href: '/industries/' },
    { label: 'Network', href: '/network/' },
    { label: 'Insights', href: '/blogs/' },
    { label: 'Contact', href: '/contact/' },
  ];
}

/** The pages that do not earn a line in the bar but should never be a dead end. */
const MORE: Array<[string, string]> = [
  ['Research & Reports', '/research/'],
  ['Clients', '/clients/'],
  ['Community', '/community/'],
  ['Partnership', '/partnership/'],
  ['Our Group', '/our-group/'],
  ['FAQ', '/faq/'],
];

export function MenuPanel({ region }: { region: string }) {
  const open = useMenuState();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const items = menuItems(region);
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);

  const close = useCallback(() => setMenu(false), []);

  useEffect(() => {
    if (!open) return;

    /* The page behind must not scroll under the card. Padding replaces the
       scrollbar's width so the header does not jump as it is taken away. */
    const { body, documentElement: html } = document;
    const gap = window.innerWidth - html.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    html.classList.add('vxn-menu-open');

    /* Focus moves into the card so the keyboard follows the eye, and Tab is
       kept inside it while it is open — a dialog you can tab out of behind is
       worse than no dialog. */
    const card = cardRef.current;
    const focusable = () =>
      Array.from(
        card?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      ).filter((el) => el.offsetParent !== null);
    /* The card takes focus, not its first link: focusing a link paints a
       focus ring on it the moment the panel opens, which reads as a selection
       nobody made. From here the first Tab lands on that link anyway. */
    card?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusable();
      if (!list.length) return;
      const edge = e.shiftKey ? list[0] : list[list.length - 1];
      if (document.activeElement === edge) {
        e.preventDefault();
        (e.shiftKey ? list[list.length - 1] : list[0]).focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      html.classList.remove('vxn-menu-open');
    };
  }, [open, close]);

  /* `inert` rather than unmounting: the card keeps its place in the DOM so the
     closing animation has something to run on, and stays out of the tab order
     and the accessibility tree while it is away. */
  return (
    <div className={`vxn-menu${open ? ' is-open' : ''}`} id="vxn-menu" inert={!open}>
      <button className="vxn-menu__veil" type="button" tabIndex={-1} aria-label="Close menu" onClick={close} />

      <div className="vxn-menu__card" role="dialog" aria-modal="true" aria-label="Menu" tabIndex={-1} ref={cardRef}>
        <div className="vxn-menu__top">
          <a className="vxn-menu__brand" href={rurl(region, '/')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${BASE}/assets/content/uploads/logo/valunxt-white.svg`} alt="VALUNXT Capital" width={158} height={32} />
          </a>
          <button className="vxn-menu__x" type="button" onClick={close} aria-label="Close menu">
            <Ico name="arrow" size={18} />
          </button>
        </div>

        <nav className="vxn-menu__nav" aria-label="Main">
          <ol className="vxn-menu__list">
            {items.map((it, i) => (
              <li key={it.label} style={{ '--i': i } as React.CSSProperties}>
                <a className="vxn-menu__link" href={rurl(region, it.href)}>
                  <span className="vxn-menu__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="vxn-menu__t">{it.label}</span>
                  <Ico name="ne" size={17} />
                </a>
                {it.kids?.length ? (
                  <ul className="vxn-menu__kids">
                    {it.kids.map((k) => (
                      <li key={k.href}>
                        <Html as="a" href={rurl(region, k.href)} html={k.label} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <div className="vxn-menu__foot" style={{ '--i': items.length } as React.CSSProperties}>
          <a className="vxn-menu__cta" href={rurl(region, '/free-consultation/')}>
            Book a free consultation <Ico name="ne" size={16} />
          </a>

          <ul className="vxn-menu__more">
            {MORE.map(([label, href]) => (
              <li key={href}>
                <a href={rurl(region, href)}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="vxn-menu__lines">
            <a href={`tel:${reg.tel}`}>
              <Ico name="phone" size={15} /> {phone}
            </a>
            <a href={`mailto:${vxnEmail()}`}>
              <Ico name="mail" size={15} /> {vxnEmail()}
            </a>
            <span>
              <Ico name="pin" size={15} /> {reg.cities}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
