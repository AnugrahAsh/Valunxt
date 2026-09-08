/**
 * The one way this section moves the page.
 *
 * WHY THIS FILE EXISTS. Lenis owns the scroll position while it is running: it
 * holds its own target and eases the real `scrollTop` towards it every frame. So
 * a native `window.scrollTo()` or `scrollIntoView()` is overwritten on the very
 * next frame by whatever Lenis still thinks the target is — the page crawls a
 * few hundred pixels in the right direction and stops somewhere arbitrary.
 *
 * That is not theoretical. Measured on the pillar page with Lenis running:
 * `window.scrollTo(0, 1998)` settled at 1611 and stayed there, and a smooth
 * `scrollIntoView()` toward y=5951 drifted to 2050 and gave up. Every in-page
 * jump in the section went through one of those two calls — the Buy and Rent
 * cards, the search submit, and every `#contact` link in the navigation.
 *
 * So everything goes through `scrollToTarget()`. It hands the job to Lenis when
 * Lenis is running and falls back to the native call when it is not — which is
 * the case on the server, before the library has loaded, and whenever the
 * visitor has asked for reduced motion.
 */

interface LenisLike {
  scrollTo: (target: string | number | HTMLElement, opts?: Record<string, unknown>) => void;
}

let instance: LenisLike | null = null;

/** Called by Scroll.tsx when the library starts, and with null when it stops. */
export function registerScroller(next: LenisLike | null): void {
  instance = next;
}

/**
 * Move the page to an element or an id.
 *
 * `offset` is in pixels and negative means "stop short", which is what the fixed
 * bar needs — an anchor that lands flush with the top of the viewport puts its
 * own heading underneath the navigation.
 */
export function scrollToTarget(target: HTMLElement | string | null, offset = 0): void {
  if (typeof window === 'undefined') return;
  const el = typeof target === 'string' ? document.getElementById(target) : target;
  if (!el) return;

  if (instance) {
    instance.scrollTo(el, { offset });
    return;
  }

  /* No Lenis: the browser's own smooth scroll, corrected for the offset. */
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * The room the fixed bar takes, read from the custom property rather than
 * hard-coded, so it stays right if the bar's height changes.
 */
export function navOffset(): number {
  if (typeof window === 'undefined') return -90;
  /* `--nav-h` is declared on `.vxn-re`, the section boundary — not on :root, so
     reading it off documentElement always fell through to the default and would
     have kept doing so silently if the bar ever changed height. */
  const host = document.querySelector('.vxn-re') ?? document.documentElement;
  const px = Number.parseFloat(getComputedStyle(host).getPropertyValue('--nav-h'));
  return -(Number.isFinite(px) && px > 0 ? px : 78) - 12;
}
