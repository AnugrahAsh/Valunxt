/**
 * Turning authored markup back into plain text.
 *
 * Copy on this site is authored the way the PHP templates echoed it: with HTML
 * entities (`Research &amp; Intelligence`) and the occasional inline tag. That
 * is fine wherever it is rendered through <Html>, but an `alt`, an `aria-label`,
 * a `<title>` or a JSON-LD string is a plain string — React writes it verbatim,
 * so `&amp;` would show as the entity rather than as an ampersand.
 *
 * PHP reached for `html_entity_decode(strip_tags(…))` at each of those points;
 * these are the same two steps, over the small entity set this content uses.
 */

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': "'",
  '&apos;': "'",
  '&rsquo;': '’',
  '&lsquo;': '‘',
  '&rdquo;': '”',
  '&ldquo;': '“',
  '&mdash;': '—',
  '&ndash;': '–',
  '&#8212;': '—',
  '&#8211;': '–',
  '&#8217;': '’',
  '&hellip;': '…',
  '&middot;': '·',
  '&nbsp;': ' ',
  '&rsaquo;': '›',
  '&lsaquo;': '‹',
};

/** html_entity_decode() over the entities this content actually uses. */
export function decodeEntities(value: string): string {
  return String(value ?? '').replace(
    /&(?:amp|lt|gt|quot|apos|rsquo|lsquo|rdquo|ldquo|mdash|ndash|hellip|middot|nbsp|rsaquo|lsaquo|#039|#8212|#8211|#8217);/g,
    (m) => ENTITIES[m] ?? m,
  );
}

/** strip_tags() then html_entity_decode() — authored markup as readable text. */
export function plainText(value: string): string {
  return decodeEntities(String(value ?? '').replace(/<[^>]*>/g, '')).trim();
}
