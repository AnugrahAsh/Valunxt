/**
 * The document shell.
 *
 * `<html lang>`, `<body class>` and the whole `<head>` stylesheet block are all
 * per-page on this site — the lang comes from the visitor's edition, the body
 * class is the full WordPress class list the theme CSS keys off
 * (`body.elementor-page-264`, `body.responsive-layout`, …), and the Elementor
 * per-post stylesheets are listed by the page. Next.js only lets the root
 * layout render `<html>`, `<head>` and `<body>`, so it resolves the current page
 * itself from the request path that proxy.ts publishes as `x-vxn-path`.
 *
 * Keeping HeadAssets here rather than in the page matters: includes/head.php
 * interleaved `<link>` and `<style>` (post-*.css comes after the global inline
 * styles; valunxt-brand.css after both), and that interleaving is the cascade.
 * Rendered inside the real <head>, the order is byte-for-byte what PHP emitted.
 */
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { headers } from 'next/headers';
import { vxnSeoOrigin } from '@/lib/seo';
import { vxnRegionData, vxnRegionExists } from '@/lib/region';
import { pageConfig, resolveRequest } from '@/lib/pages';
import HeadAssets, { SiteFavicons } from '@/components/layout/HeadAssets';
import { realEstateRequest } from '@/real-estate/lib/routes';
import { PRELOADER_GATE_SCRIPT } from '@/components/layout/Preloader';
import type { PageConfig } from '@/lib/page-config';

export const metadata: Metadata = {
  metadataBase: new URL(vxnSeoOrigin()),
  title: 'VALUNXT Capital',
};

/* Elementor ships `.elementor-invisible { visibility: hidden }` and relies on
   JavaScript to remove the class once an element scrolls into view. On this
   conversion that reveal is reimplemented in SiteScripts — but until it runs,
   most of the copy on Services, About, Our Group and Clients is
   visibility:hidden. Anything that reads the page without executing our scripts
   (crawlers that skip JS, reader modes, a blocked or failed script) therefore
   saw only the handful of blocks that carry no entrance animation.

   PHP set this class from a script. Here it is rendered straight onto <html>:
   the outcome is identical — the <noscript> block below is what actually
   rescues a JS-less reader — and it keeps a script from editing an attribute
   React is about to hydrate. */
const HTML_CLASS = 'vxn-js';

const GTAG_INLINE = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-3LN0QDVS2F');
`;

/**
 * The body class a page created in the admin panel carries. It is the class
 * list the PHP scaffolder wrote, minus the per-post `elementor-page-<id>` hook
 * — no stylesheet defines a rule for an id that only exists in the CMS.
 */
const CMS_BODY_CLASS =
  'wp-singular page-template-default page wp-custom-logo wp-embed-responsive wp-theme-execor full ' +
  'header-layout-logo-menu has-page-header no-middle-header responsive-layout vamtam-is-elementor ' +
  'elementor-active elementor-pro-active vamtam-font-smoothing layout-full elementor-default ' +
  'elementor-kit-5 elementor-page elementor-page-3752';

/**
 * The document reset the real estate section needs, and nothing more.
 *
 * That section's stylesheet scopes everything under `.vxn-re`, which is exactly
 * why `body` itself is not covered by it. On the rest of the site the Elementor
 * cascade zeroes the body margin; here nothing does, so the browser default 8px
 * would show as a gutter down both sides of every full-bleed section.
 */
const RE_DOCUMENT_CSS = `html,body{margin:0;padding:0;}body{background:#FCFBF8;-webkit-font-smoothing:antialiased;}`;

/**
 * What head.php rendered for a URL with no page behind it — the 404 template.
 *
 * Read from the registry rather than restated here. It was restated, and it had
 * already drifted: the declaration lists the 404's own stylesheet (8623) and the
 * subscribe block's (4557, which NotFoundBody renders), and this copy listed
 * neither — so every 404 rendered the subscribe form unstyled. The literal below
 * is only a floor, so the layout can never throw on a missing registry entry.
 */
const FALLBACK: PageConfig = pageConfig('/404/') ?? {
  title: 'VALUNXT Capital',
  body: '',
  post_css: ['5', '3837', '2094', '4557'],
  header: '3837',
  footer: '2094',
  post_id: 0,
  path: '/',
};

/**
 * The `vxn-p-<segment>` hook the inner-page skin keys off — the first path
 * segment with the region prefix dropped, or `home` at the root of an edition.
 * vxn-inner.css uses it to pick each page's artwork, so a page that does not
 * carry it falls back to the generic stage.
 *
 * Port of the block at the foot of includes/head.php.
 */
function bodyPageClass(page: PageConfig | null, path: string): string {
  const raw = (page?.path ?? path) || '/';
  const segs = raw
    .split('/')
    .filter((p) => p !== '' && !vxnRegionExists(p));
  const seg = segs.length ? segs[0].toLowerCase().replace(/[^a-z0-9-]/g, '') : 'home';
  return `vxn-p-${seg}`;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const h = await headers();
  const path = h.get('x-vxn-path') ?? '/';
  const { region, page } = resolveRequest(path);

  // The admin panel is its own application: it has its own stylesheet and must
  // not load the site's Elementor cascade, analytics or body classes.
  if (path.startsWith('/admin')) {
    return (
      <html lang="en">
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </head>
        <body>{children}</body>
      </html>
    );
  }

  /* The real estate section, for the same reason as /admin and with one
     difference.

     It renders its own navigation and its own footer, and its stylesheet is
     self-contained — so it needs none of the 53 Elementor stylesheets, the
     inline theme blocks or the WordPress body classes. It was briefly built the
     other way, inside PageShell with the whole cascade loaded, and the cost was
     immediate: the kit styles `a` at (0,1,1) and every link in the section came
     out white on white until each rule was rewritten to outrank it. A section
     with its own chrome has nothing to gain from that fight.

     What it does take is the brand: the two VALUNXT typefaces and the tokens in
     its own sheet, so it reads as VALUNXT without carrying the theme.

     Unlike /admin it IS a public page, so analytics still runs and the icons are
     still the site's — same company, same domain.

     realEstateRequest() answers only for the pillar page and the eight published
     service slugs, so an unknown slug under /real-estate/ falls through to the
     branch below and 404s in the site's own chrome, styled. */
  const realEstate = realEstateRequest(path);
  if (realEstate) {
    return (
      <html lang={vxnRegionData(realEstate.region).lang}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <SiteFavicons />
          {/* The brand's two faces, from the site's own font sheets — the only
              part of the theme cascade this section has a use for. */}
          <link rel="stylesheet" href="/assets/content/uploads/elementor/google-fonts/css/dmsans.css" media="all" />
          <link rel="stylesheet" href="/assets/content/uploads/elementor/google-fonts/css/forum.css" media="all" />
          {/* The version query is the cache key: /assets/* is served immutable for a
              year, so this MUST be bumped whenever the sheet changes or browsers
              keep the old one. Same convention as valunxt-brand.css?v=157. */}
          <link rel="stylesheet" href="/assets/css/valunxt-realestate.css?v=10" media="all" />
          <style dangerouslySetInnerHTML={{ __html: RE_DOCUMENT_CSS }} />
        </head>
        <body>
          {children}
          {/* Google tag (gtag.js) — the same one the rest of the site runs. */}
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-3LN0QDVS2F" strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: GTAG_INLINE }} />
        </body>
      </html>
    );
  }

  return (
    /* suppressHydrationWarning on both: the intro gate below adds a class to
       <html> before hydration, and jQuery, Elementor and the theme add classes
       and data attributes to <body> after it. Neither is React's to reconcile. */
    <html lang={vxnRegionData(region).lang} className={HTML_CLASS} suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <noscript>
          <style>{`.elementor-invisible{visibility:visible !important;}`}</style>
        </noscript>
        <HeadAssets page={page ?? FALLBACK} />
      </head>
      <body
        className={`${page?.body ?? CMS_BODY_CLASS} ${bodyPageClass(page, path)}`}
        suppressHydrationWarning
      >
        {/* The intro gate reads sessionStorage and must settle before the first
            paint, so it is the one script that runs ahead of hydration. It only
            touches <html>, which is why that element suppresses the warning. */}
        <Script
          id="vx-intro-gate"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: PRELOADER_GATE_SCRIPT }}
        />
        <div id="top" />
        {children}
        {/* Google tag (gtag.js) — after hydration, like every other script. */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3LN0QDVS2F" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: GTAG_INLINE }} />
      </body>
    </html>
  );
}
