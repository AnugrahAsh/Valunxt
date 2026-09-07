'use client';

/**
 * The section's navigation bar.
 *
 * Structurally Houzzhunt's: wordmark left, links centred, telephone and a single
 * CTA on the right, pinned to the top. The behaviour is what the reference gets
 * right and most sticky bars get wrong — over the hero it is transparent with
 * light type, and the moment the page moves it goes solid with dark type. A bar
 * that stays light over a white page is unreadable, which is the failure the
 * `data-solid` flag exists to prevent.
 *
 * Both wordmarks are rendered and CSS swaps them rather than the src changing in
 * JavaScript: the bar flips mid-transition and re-fetching an image at that
 * moment shows a blank frame.
 *
 * A client component because the scroll state and the drawer both need state.
 */
import { useEffect, useState } from 'react';

import { rurl } from '@/lib/region';
import { BRAND, NAV } from '../data/site';
import type { Locale } from '../lib/types';
import { ArrowUpRight } from './icons';

export default function Nav({ region }: { region: Locale }) {
  const [solid, setSolid] = useState(false);
  const [drawer, setDrawer] = useState(false);

  /* Solid as soon as the hero starts leaving. rAF-throttled, so at most one
     layout read per frame. */
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      setSolid(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* A drawer that lets the page scroll behind it is a bug, not a feature. */
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  /* Escape closes it, which is the one keyboard affordance a drawer must have. */
  useEffect(() => {
    if (!drawer) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawer(false);
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [drawer]);

  const links = NAV.map((n) => (
    <a key={n.href} href={n.href.startsWith('#') ? n.href : rurl(region, `/real-estate${n.href}`)}>
      {n.label}
    </a>
  ));

  return (
    <>
      <header className="vxn-re-nav" data-solid={solid ? 'true' : 'false'}>
        <div className="vxn-re-nav__inner">
          <a className="vxn-re-nav__brand" href={rurl(region, '/real-estate/')} aria-label={`${BRAND.full} Real Estate`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="is-light" src="/real-estate/img/brand/valunxt-white.svg" alt="VALUNXT" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="is-dark" src="/real-estate/img/brand/valunxt-dark.svg" alt="VALUNXT" />
            <span className="vxn-re-nav__lockup">Real Estate</span>
          </a>

          <nav className="vxn-re-nav__menu" aria-label="Real estate">
            {links}
          </nav>

          <div className="vxn-re-nav__side">
            <a className="vxn-re-nav__tel" href={BRAND.phoneHref}>
              {BRAND.phone}
            </a>
            <a className="vxn-re__btn" href="#contact">
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
              <a
                key={n.href}
                href={n.href.startsWith('#') ? n.href : rurl(region, `/real-estate${n.href}`)}
                onClick={() => setDrawer(false)}
              >
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
