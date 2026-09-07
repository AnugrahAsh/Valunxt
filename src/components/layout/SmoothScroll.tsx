'use client';

/**
 * Lenis: the page's scroll, with inertia.
 *
 * The wheel stops driving the scroll position directly and starts driving a
 * velocity that decays — so a flick carries, a stop glides to a halt, and the
 * sections that are composed against scroll (the mark's rotation, the process
 * deck, the services reveals) are read through a continuous position rather
 * than a staircase of wheel steps.
 *
 * WHAT IT DOES NOT TOUCH. Lenis moves the real scroll position of the real
 * document, so `position: sticky`, anchor links, the browser's own scrollbar
 * and every `getBoundingClientRect()` in the page's scripts keep working
 * exactly as they did. Touch is left to the platform: a phone's scrolling is
 * already inertial and its own is better than ours.
 *
 * WHO IT IS NOT FOR. Anyone who has asked for reduced motion gets the native
 * scroll — smoothing is motion they did not ask for, and it delays where the
 * page ends up relative to where they put it. The admin panel is left alone
 * too: it is a tool, and a tool should land where it is put.
 *
 * The library is dynamically imported, so it stays out of the initial bundle
 * and the page is scrollable before it arrives.
 */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll() {
  const pathname = usePathname();
  const off = pathname?.startsWith('/admin');

  useEffect(() => {
    if (off) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    let disposed = false;

    import('lenis')
      .then(({ default: Lenis }) => {
        if (disposed) return;
        lenis = new Lenis({
          /* A long enough glide to feel like weight, short enough that the
             page still arrives where it was sent. */
          duration: 1.05,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          smoothWheel: true,
          /* Left to the platform — see above. */
          syncTouch: false,
          touchMultiplier: 1,
        });
        const frame = (t: number) => {
          lenis?.raf(t);
          raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
      })
      .catch(() => {
        /* A blocked chunk leaves the native scroll, which is the fallback. */
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [off]);

  return null;
}
