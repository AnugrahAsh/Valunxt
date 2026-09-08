/**
 * PageConfigs for the UAE services section.
 *
 * Every other page has a hand-transcribed entry in data/page-configs.json,
 * because every other page was a real WordPress page with a real `$PAGE`
 * declaration behind it. These are not: the six UAE practices and the pages
 * beneath them all render the same template, and the only things that differ
 * between them are a name, a URL and a description. Thirty-six near-identical
 * JSON blocks would be thirty-six places for one of them to drift, so they are
 * derived from the UAE service tree instead — the same registry the services
 * index and the detail template already read.
 *
 * Port of the `$PAGE` block the stubs under en-ae/services/ carry (written by
 * tools/build-uae-services.php).
 */
import type { PageConfig } from './page-config';
import { plainText } from './html-text';
import { UAE_SERVICES, uaeServicePath, type UaeService, type UaeSubService } from '@/data/uae-services';

/**
 * Elementor template ids these pages' sections were captured from: the kit (5),
 * the header (3837) and footer (2094), the single-page sheet (3752) and the
 * subscribe band (4557).
 *
 * The home page's sheet (17) used to be here too, for the captured "Get in
 * Touch" block these pages closed with. That block is gone — ContactSection
 * replaced it and carries no Elementor markup — so the sheet has nothing left
 * to style.
 */
const POST_CSS = ['5', '3837', '2094', '3752', '4557'];

/**
 * The vxh kit sheets: tokens, buttons and the abstract layer, then the
 * services components, then the shared page furniture (the opening, section
 * heads, the FAQ, the newsletter) these pages build their bookends from.
 */
const CSS = [
  '/assets/css/vxn-home-ae.css',
  '/assets/css/vxn-services-ae.css',
  '/assets/css/vxn-pages.css',
];

/** Behaviour for the rail, the explorer, the tools and the counters. */
const JS = ['/assets/js/vxn-services-ae.js'];

/**
 * A stable post id per path. WordPress ids identify the captured stylesheets a
 * page loads; these pages have no captured CSS of their own, but the id still
 * lands in the `<body>` class and the Elementor config, so it has to be stable
 * across renders and distinct between pages. Same derivation as the CMS
 * catch-all, in the same 9000+ band that is reserved for pages with no WordPress
 * row behind them.
 */
function postId(path: string): number {
  let h = 0;
  for (let i = 0; i < path.length; i += 1) h = (h * 31 + path.charCodeAt(i)) | 0;
  return 9000 + (Math.abs(h) % 900);
}

function bodyClass(id: number): string {
  return (
    `wp-singular page-template-default page page-id-${id} wp-custom-logo wp-embed-responsive ` +
    'wp-theme-execor full header-layout-logo-menu has-page-header no-middle-header responsive-layout ' +
    'vamtam-is-elementor elementor-active elementor-pro-active vamtam-font-smoothing layout-full ' +
    `elementor-default elementor-kit-5 elementor-page elementor-page-${id} elementor-page-3752`
  );
}

function config({
  name,
  path,
  heroImage,
  desc,
  excerpt,
}: {
  /** Plain text — it becomes the <title> and the hero heading. */
  name: string;
  path: string;
  heroImage: string;
  desc: string;
  /** The service's own lede; may carry entities. */
  excerpt: string;
}): PageConfig {
  const id = postId(path);
  const title = `${name} | VALUNXT Capital`;
  return {
    title,
    desc,
    og_image: '/assets/content/uploads/2025/03/valunxt-og.png',
    body: bodyClass(id),
    post_css: POST_CSS,
    css: CSS,
    js: JS,
    header: '3837',
    footer: '2094',
    canvas: false,
    post_id: id,
    post_title: encodeURIComponent(title),
    post_excerpt: excerpt,
    /* Marks "Services" on the bar, so a visitor deep in the section still sees
       where they are. The sub-pages point at the same parent for the same
       reason — there is no menu item of their own to light up. */
    active_nav: ['/services/'],
    inline_css: '',
    hero_title: name,
    hero_subtitle: excerpt,
    hero_image: heroImage,
    path,
  };
}

/** The page at /services/<service>/. */
export function uaeServiceConfig(slug: string, service: UaeService): PageConfig {
  return config({
    name: plainText(service.title),
    path: uaeServicePath(slug),
    heroImage: service.img,
    desc: service.meta,
    excerpt: service.lede,
  });
}

/** The page at /services/<service>/<sub>/. */
export function uaeSubServiceConfig(
  slug: string,
  service: UaeService,
  childSlug: string,
  child: UaeSubService,
): PageConfig {
  const name = plainText(child.title);
  return config({
    name,
    path: uaeServicePath(slug, childSlug),
    /* The sub-pages borrow the practice's image: they are the same discipline,
       and the detail template leads with the product frame rather than the
       photograph anyway. */
    heroImage: service.img,
    desc: `${name} in the UAE — part of ${plainText(service.title)} at VALUNXT Capital. ${plainText(
      child.lede,
    )}`,
    excerpt: child.lede,
  });
}

/**
 * The UAE services index — a different page at the same path as India's.
 *
 * It takes India's registry entry for the chrome it shares (header, footer, body
 * class) and overrides everything that is its own: the title and description,
 * the vxh kit sheets and script, and the home page's stylesheet (17), which is
 * what styles the shared "Get in Touch" block it closes with.
 */
export function uaeServicesIndexConfig(base: PageConfig): PageConfig {
  return {
    ...base,
    title: 'Services in the UAE | Accounting, Tax, Valuation & Advisory | VALUNXT Capital',
    desc:
      'Six connected practices for UAE businesses: accounting and tax, real estate transactions, ' +
      'mortgages, valuation, research and technology — one accountable partner, fixed fees agreed ' +
      'before work begins.',
    post_excerpt: 'Six connected practices supporting confident, informed decisions in the UAE.',
    post_css: POST_CSS,
    css: CSS,
    js: JS,
    /* It is not the India services page, so it must not inherit that page's
       CMS title and description. An "en-ae/services" row still overrides it. */
    seo_own: true,
  };
}

/**
 * The config for a path under /services/, or null when the UAE does not publish
 * it. Used by both the routes and the page registry, so the head and the route
 * can never disagree about which page a URL is — the head is where the page's
 * stylesheets are emitted, so a disagreement renders the page unstyled.
 *
 * `indexBase` is India's /services/ declaration, which the UAE index builds on;
 * pass it to have this answer for the index too.
 */
export function uaeServicePageConfig(
  segments: string[],
  indexBase?: PageConfig | null,
): PageConfig | null {
  if (segments.length === 0) return indexBase ? uaeServicesIndexConfig(indexBase) : null;

  const [slug, childSlug] = segments;
  const service = UAE_SERVICES[slug ?? ''];
  if (!service) return null;
  if (segments.length === 1) return uaeServiceConfig(slug, service);
  if (segments.length !== 2) return null;
  const child = service.children[childSlug];
  return child ? uaeSubServiceConfig(slug, service, childSlug, child) : null;
}
