'use client';

/**
 * The practice index's sticky preview.
 *
 * The six practices are a list, and a list should look like one — so the
 * photographs do not sit in the list. They stack in a sticky frame beside it,
 * and the one on top is the practice you are reading. Scroll and the picture
 * changes; move the pointer over another row and it changes to that one and
 * back when you leave.
 *
 * WHAT THIS COMPONENT IS. Only the switch. The rows, the frame and every image
 * are server-rendered above and stay in the document whatever happens here —
 * this adds a class to one of them, which is what makes the whole thing degrade
 * to a perfectly good list with the first practice's photograph beside it.
 *
 * WHY AN OBSERVER AND NOT A SCROLL HANDLER. The question is "which row is in
 * the reading band", which is exactly what an IntersectionObserver with a
 * narrow rootMargin answers, at no cost per frame. A scroll handler would have
 * to measure six rows on every event to work it out.
 */
import { useEffect } from 'react';

export default function PracticeIndex({ scope = '.vxs-idx' }: { scope?: string }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(scope);
    if (!root) return;

    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-idx]'));
    const shots = Array.from(root.querySelectorAll<HTMLElement>('[data-shot]'));
    if (rows.length < 2 || !shots.length) return;

    /* Which row the scroll last put in the band, and which the pointer is over.
       The pointer wins while it is over a row; letting go returns to the scroll
       rather than to whatever was showing before, so the two never disagree. */
    let scrolled = 0;
    let hovered: number | null = null;

    function show(i: number) {
      shots.forEach((s, n) => s.classList.toggle('is-on', n === i));
      rows.forEach((r, n) => r.classList.toggle('is-on', n === i));
    }

    /* A band across the middle of the viewport: a row counts as "being read"
       while it is in there, and only one can be at a time. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          scrolled = rows.indexOf(e.target as HTMLElement);
          if (hovered === null) show(scrolled);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    rows.forEach((r) => io.observe(r));

    const enter = (i: number) => () => {
      hovered = i;
      show(i);
    };
    const leave = () => {
      hovered = null;
      show(scrolled);
    };
    const offs = rows.map((r, i) => {
      const on = enter(i);
      r.addEventListener('pointerenter', on);
      r.addEventListener('pointerleave', leave);
      return () => {
        r.removeEventListener('pointerenter', on);
        r.removeEventListener('pointerleave', leave);
      };
    });

    return () => {
      io.disconnect();
      offs.forEach((off) => off());
    };
  }, [scope]);

  return null;
}
