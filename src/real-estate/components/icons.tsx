/**
 * Inline SVG icons.
 *
 * Inline rather than an icon font or a package: this section loads none of the
 * site's theme cascade, so the theme's icon font is not available to it, and a
 * dependency for a dozen glyphs is not worth carrying. Each takes
 * `currentColor`, so colour stays a CSS concern.
 *
 * Everything is drawn 24×24 on a 1.5 stroke with round caps — the same
 * construction as the site's own mega-menu set, so the two families sit together
 * if they ever meet on a page.
 */

function Stroke({ d, className, box = 24 }: { d: string; className?: string; box?: number }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${box} ${box}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}

/* ---- Arrows -------------------------------------------------------------- */

export function ArrowRight({ className }: { className?: string }) {
  return <Stroke className={className} box={16} d='<path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/>' />;
}

/** The diagonal ↗ used on CTAs that leave the current view. */
export function ArrowUpRight({ className }: { className?: string }) {
  return <Stroke className={className} box={16} d='<path d="M4.5 11.5 11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"/>' />;
}

export function Chevron({ className }: { className?: string }) {
  return <Stroke className={className} box={16} d='<path d="M3.5 6 8 10.5 12.5 6"/>' />;
}

/** Rendered as text so the row needs no image and no external font. */
export function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="vxn-re-rev__stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
    </span>
  );
}

/* ---- Service glyphs ------------------------------------------------------ */

/**
 * Keyed by the service's own href, which is stabler than its display title.
 * The site's mega-menu set was the first choice, but it has no glyph that reads
 * as commercial premises distinct from a residential tower, and forcing one
 * shape to stand for both made the row ambiguous.
 */
const SERVICE_GLYPHS: Record<string, string> = {
  /* Residential — a house with a chimney. */
  '/residential/':
    '<path d="M3 10.6 12 3.5l9 7.1"/><path d="M5.5 9.6V20.5h13V9.6"/><path d="M10 20.5v-6h4v6"/><path d="M17 5.5h2v2.2"/>',
  /* Commercial — an office block with floor bands and a lower wing. */
  '/commercial/':
    '<path d="M3 20.5h18"/><path d="M5 20.5V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14.5"/><path d="M15 20.5V10h3.5a.5.5 0 0 1 .5.5v10"/><path d="M8 8.5h4M8 12h4M8 15.5h4"/>',
  /* Mortgage — a key. */
  '/mortgage-services/':
    '<circle cx="8" cy="15" r="4"/><path d="M10.9 12.1 20 3"/><path d="m17 6 2.5 2.5M15 8l2 2"/>',
  /* Investment — a trend line over a chart frame. */
  '/investment-advisory/':
    '<path d="M4 4v15a1 1 0 0 0 1 1h15"/><path d="m7 15 3.5-4 3 2.5L20 7"/><path d="M20 7h-3.5M20 7v3.5"/>',
  /* Valuation — balance scales. */
  '/valuations-advisory/':
    '<path d="M12 4v17M8 21h8M5 7h14"/><path d="m5 7-3 6a3 3 0 0 0 6 0Z"/><path d="m19 7-3 6a3 3 0 0 0 6 0Z"/><circle cx="12" cy="4" r="1.4"/>',
  /* Buying — a tag. */
  '/buy-property/':
    '<path d="M3.5 12.6V4.5a1 1 0 0 1 1-1h8.1a1 1 0 0 1 .7.3l7 7a1 1 0 0 1 0 1.4l-8.1 8.1a1 1 0 0 1-1.4 0l-7-7a1 1 0 0 1-.3-.7Z"/><circle cx="8" cy="8" r="1.4"/>',
  /* Letting — a door with a handle. */
  '/sell-rent-lease-property/':
    '<path d="M6 20.5V4.5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16"/><path d="M3.5 20.5h17"/><circle cx="14.5" cy="12.5" r="1"/>',
  /* Off-plan — a tower under construction with a crane arm. */
  '/off-plan-properties/':
    '<path d="M3 20.5h18"/><path d="M7 20.5V9l5-3 5 3v11.5"/><path d="M10 20.5v-5h4v5"/><path d="M12 6V2.5h6"/>',
};

/** The icon for a service, chosen by its href. Falls back to the chart. */
export function ServiceIcon({ href, className }: { href?: string; className?: string }) {
  return <Stroke className={className} d={SERVICE_GLYPHS[href ?? ''] ?? SERVICE_GLYPHS['/investment-advisory/']!} />;
}

/* ---- Small marks --------------------------------------------------------- */

/** A laurel-ish medal, for the experience card. */
export function IconAward({ className }: { className?: string }) {
  return (
    <Stroke
      className={className}
      d='<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.8 7 22l5-2.6L17 22l-1.5-8.2"/>'
    />
  );
}

/** A compass, for the mission card. */
export function IconCompass({ className }: { className?: string }) {
  return (
    <Stroke className={className} d='<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.5-5.5 2 2-5.5Z"/>' />
  );
}

/* ---- Social -------------------------------------------------------------- */

const SOCIAL_PATHS: Record<string, string> = {
  linkedin:
    '<path d="M5 8.5v10M5 5.2v.1M10 18.5v-6a2.5 2.5 0 0 1 5 0v6M10 18.5v-6"/>',
  instagram:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="4.6"/><circle cx="12" cy="12" r="3.8"/><path d="M16.9 7.1v.1"/>',
  facebook:
    '<path d="M14.5 8.5h2M14.5 21V9.8a2.3 2.3 0 0 1 2.3-2.3h.7M11 12.8h5"/>',
  x: '<path d="M4.5 4.5 19 19.5M19 4.5 4.5 19.5"/>',
  youtube:
    '<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="m10 9.5 5 2.5-5 2.5v-5Z"/>',
};

export function SocialIcon({ network, className }: { network: string; className?: string }) {
  return <Stroke className={className} d={SOCIAL_PATHS[network] ?? SOCIAL_PATHS.x!} />;
}

/* ---- Property card marks ------------------------------------------------- */

export function IconPin({ className }: { className?: string }) {
  return <Stroke className={className} box={16} d='<path d="M8 14.5s-4.5-4.1-4.5-7.5a4.5 4.5 0 0 1 9 0c0 3.4-4.5 7.5-4.5 7.5Z"/><circle cx="8" cy="7" r="1.6"/>' />;
}
export function IconBed({ className }: { className?: string }) {
  return <Stroke className={className} box={16} d='<path d="M2 12.5V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5.5"/><path d="M2 10h12M4 6V4.5h3.5V6M8.5 6V4.5H12V6"/>' />;
}
export function IconBath({ className }: { className?: string }) {
  return <Stroke className={className} box={16} d='<path d="M2.5 9h11v1.5a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3V9Z"/><path d="M4 9V4.2a1.2 1.2 0 0 1 2.4 0"/><path d="M4.5 13.5V15M11.5 13.5V15"/>' />;
}
export function IconArea({ className }: { className?: string }) {
  return <Stroke className={className} box={16} d='<rect x="2.5" y="2.5" width="11" height="11" rx="1"/><path d="M2.5 6h3V2.5M13.5 10h-3v3.5"/>' />;
}
export function IconSearch({ className }: { className?: string }) {
  return <Stroke className={className} box={16} d='<circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/>' />;
}
export function IconHeart({ className }: { className?: string }) {
  return <Stroke className={className} box={16} d='<path d="M8 13.5S2.5 10.2 2.5 6.3A2.9 2.9 0 0 1 8 4.6a2.9 2.9 0 0 1 5.5 1.7c0 3.9-5.5 7.2-5.5 7.2Z"/>' />;
}
