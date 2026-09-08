'use client';

/**
 * The section's navigation bar, on the reference's arrangement.
 *
 * THE REFERENCE'S BAR, which is what this is: a white bar of its own above the
 * page — not a transparent one laid over the hero — with the brand at the left,
 * a "Services" dropdown immediately beside it, the main links in the middle,
 * two quiet links at the right, and a search button on the end. Small type,
 * regular weight, a lot of air.
 *
 * WHY IT IS NO LONGER TRANSPARENT. It used to be transparent over a full-bleed
 * hero and go solid on scroll, which is right for a hero the bar sits *on*. The
 * reference's bar sits *above* its hero and the masthead now starts underneath
 * it, so there is nothing to be transparent over: it is a white bar from the
 * first pixel, and the flip it used to perform is gone with the reason for it.
 *
 * THE SEARCH BUTTON IS NOT DECORATION. The reference has a magnifier and does
 * not say what it does; ours takes the visitor to the listings and puts the
 * caret in the first field, which is the only honest thing a magnifier can mean
 * on a page whose search is further down.
 *
 * A client component because the dropdown and the drawer both need state.
 */
import { useEffect, useRef, useState } from 'react';

import { rurl } from '@/lib/region';
import { BRAND, NAV } from '../data/site';
import { SERVICES } from '../data/home';
import type { Locale } from '../lib/types';
import { ArrowUpRight, IconSearch } from './icons';

/** The two links that sit apart on the right, as the reference's do. */
const ASIDE = new Set(['Sell & Let', 'Services']);

export default function Nav({ region }: { region: Locale }) {
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const href = (h: string) => (h.startsWith('#') ? h : rurl(region, `/real-estate${h}`));

  /* A drawer that lets the page scroll behind it is a bug, not a feature. */
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  /* Escape closes either, which is the one keyboard affordance both must have. */
  useEffect(() => {
    if (!drawer && !open) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setDrawer(false);
      setOpen(false);
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [drawer, open]);

  /* A dropdown that stays open after you have looked away is a dropdown you
     have to dismiss, which is one more thing to do than opening it was. */
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [open]);

  /* The magnifier's meaning: go to the search and put the caret in it. */
  function toSearch() {
    const grid = document.getElementById('listings');
    if (!grid) {
      window.location.href = rurl(region, '/real-estate/#listings');
      return;
    }
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      grid.querySelector<HTMLSelectElement>('.vxn-re-search select')?.focus({ preventScroll: true });
    }, 500);
  }

  const main = NAV.filter((n) => !ASIDE.has(n.label));
  const aside = NAV.filter((n) => n.label === 'Sell & Let');

  return (
    <>
      <header className="vxn-re-nav" data-solid="true">
        <div className="vxn-re-nav__inner">
          <a className="vxn-re-nav__brand" href={rurl(region, '/real-estate/')} aria-label={`${BRAND.full} Real Estate`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="is-dark" src="/real-estate/img/brand/valunxt-dark.svg" alt="VALUNXT" />
            <span className="vxn-re-nav__lockup">{BRAND.practice}</span>
          </a>

          {/* "Services ˅", immediately beside the brand — the reference's one
              dropdown, carrying the four practices rather than a caret that
              opens nothing. */}
          <div className="vxn-re-nav__drop" ref={dropRef}>
            <button
              type="button"
              className="vxn-re-nav__droptop"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpen((v) => !v)}
            >
              Services
              <i aria-hidden="true" />
            </button>
            <div className="vxn-re-nav__drops" hidden={!open}>
              {/* `href` is optional on a FeatureCard — a service without a page
                  of its own falls back to the services panel. */}
              {SERVICES.map((s) => (
                <a key={s.title} href={href(s.href ?? '/#services')} onClick={() => setOpen(false)}>
                  <b>{s.title}</b>
                  <small>{s.summary}</small>
                </a>
              ))}
            </div>
          </div>

          <nav className="vxn-re-nav__menu" aria-label="Real estate">
            {main.map((n) => (
              <a key={n.href} href={href(n.href)}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="vxn-re-nav__side">
            {aside.map((n) => (
              <a className="vxn-re-nav__quiet" key={n.href} href={href(n.href)}>
                {n.label}
              </a>
            ))}
            <a className="vxn-re-nav__quiet" href="#contact">
              Contact
            </a>
            <button type="button" className="vxn-re-nav__find" aria-label="Search properties" onClick={toSearch}>
              <IconSearch />
            </button>
            <a className="vxn-re__btn vxn-re-nav__cta" href="#contact">
              Enquire now
              <ArrowUpRight />
            </a>
            <button
              type="button"
              className="vxn-re-nav__burger"
              aria-label="Open menu"
              aria-expanded={drawer}
              onClick={() => setDrawer(true)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="vxn-re-drawer" data-open={drawer ? 'true' : 'false'} aria-hidden={!drawer}>
        <div className="vxn-re-drawer__scrim" onClick={() => setDrawer(false)} />
        <div className="vxn-re-drawer__sheet">
          <div className="vxn-re-drawer__top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/real-estate/img/brand/valunxt-dark.svg" alt="VALUNXT" />
            <button type="button" className="vxn-re-drawer__close" aria-label="Close menu" onClick={() => setDrawer(false)}>
              ×
            </button>
          </div>

          <nav aria-label="Real estate, mobile">
            {NAV.map((n) => (
              <a key={n.href} href={href(n.href)} onClick={() => setDrawer(false)}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="vxn-re-drawer__foot">
            <a className="vxn-re__btn" href="#contact" onClick={() => setDrawer(false)}>
              Enquire now
              <ArrowUpRight />
            </a>
            <a className="vxn-re-drawer__tel" href={BRAND.phoneHref}>
              {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
