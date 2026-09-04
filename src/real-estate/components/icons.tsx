/**
 * Inline SVG icons.
 *
 * Inline rather than an icon font or a package: the module has to be droppable
 * into any Next.js app with no dependency to install and no font file to
 * serve. Each takes `currentColor`, so colour is a CSS concern.
 */

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M2.5 8h11M9 3.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The diagonal ↗ used on cards and the buy/sell/rent panel. */
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M3.5 6L8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Rendered as text so the row needs no image and no external font. */
export function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="re-stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
    </span>
  );
}

/* The three figure-band glyphs. Distinct shapes, one visual weight. */

export function IconListings({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function IconExperience({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.8L7 22l5-2.6L17 22l-1.5-8.2" />
    </svg>
  );
}

export function IconAdvisory({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 5.5h17v11h-9l-4.5 3.5v-3.5h-3.5z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}

export const FIGURE_ICONS = [IconListings, IconExperience, IconAdvisory];
