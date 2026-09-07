/**
 * The per-page declaration every template carried as `$PAGE` in the PHP build.
 *
 * Nothing here is new: the field names, the values and their meaning are
 * exactly what each index.php declared. Typing it means a page can no longer
 * quietly omit the stylesheet list or the body class that its Elementor markup
 * depends on.
 */
export interface PageConfig {
  /** <title>, before the CMS row (if any) overrides it. */
  title: string;
  /** meta description, before the CMS row overrides it. */
  desc?: string;
  /** og:image, relative to the site root. */
  og_image?: string;
  /** The full class list WordPress put on <body>; the theme CSS keys off it. */
  body: string;
  /** Elementor per-post stylesheets: /assets/content/uploads/elementor/css/post-<id>.css */
  post_css: string[];
  /** Which captured Elementor header template to render ('139' | '3134' | '3837' | 'none'). */
  header: string;
  /** Which captured Elementor footer template to render ('2094' | '3425' | 'none'). */
  footer: string;
  /** True on templates that render their own full-bleed shell (no #page wrapper). */
  canvas?: boolean;
  /** The WordPress post id, echoed into elementorFrontendConfig. */
  post_id: number;
  /** URL-encoded post title, echoed into elementorFrontendConfig. */
  post_title?: string;
  post_excerpt?: string;
  /** Paths whose nav item should be marked current. */
  active_nav?: string[];
  /** Extra <style> the page carried inline; {{BASE}} is substituted. */
  inline_css?: string;
  /**
   * Page-owned stylesheets, as $PAGE['css'] held them: paths under the mount
   * point, loaded after valunxt-brand.css and the two site-wide skins so they
   * build on those tokens rather than fight them.
   */
  css?: string[];
  /**
   * Page-owned scripts, as the redesigned templates emitted them at the end of
   * the body (`<script src="/assets/js/vxn-home-ae.js" defer>`). Loaded after
   * hydration, like every other script on this site — see SiteScripts.
   */
  js?: string[];
  /** Shared page-hero partial inputs. */
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  /** The page's own (unprefixed) path, e.g. '/services/'. */
  path: string;
  /** Only pages outside the CMS set this (the 404 template). */
  robots?: string;
  /**
   * True on a page that shares a path with a different page in another market
   * and must therefore answer for its own metadata rather than inherit the
   * shared CMS row underneath it. See vxnSeoResolveRow().
   */
  seo_own?: boolean;
}
