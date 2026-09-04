/* Simple page hero — breadcrumb + page name over a background image.
   Reuses the shared single-page (elementor-3752) breadcrumb container so the
   spacing/layout matches About, Location, etc.

   Port of includes/partials/page-hero.php. */
import { BASE, rurl } from '@/lib/region';
import type { PageConfig } from '@/lib/page-config';

const HERO_CSS = `
	.vxn-simplehero{background-size:cover !important;background-position:center center !important;background-repeat:no-repeat !important;}
	.vxn-simplehero > .e-con-inner{min-height:44vh;justify-content:center;}
	.vxn-simplehero .elementor-heading-title,
	.vxn-simplehero .elementor-heading-title a{color:#ffffff !important;}
	.vxn-simplehero .elementor-heading-title a:hover{opacity:.85;}
	.vxn-simplehero h1.elementor-heading-title{font-size:clamp(40px,6vw,74px);line-height:1.06;}
	.vxn-simplehero .elementor-divider-separator{border-top-color:rgba(255,255,255,.4) !important;}

	/* ---- Brand tone (UAE services) ----------------------------------------
	   A brand-blue wash and a woven texture over whatever photograph the page
	   carries, so every page in the section reads as one blue banner rather than
	   six different pictures.

	   The texture is drawn here as an SVG data URI rather than fetched from a
	   stock library: it is two hairlines and a dot, it stays crisp at any size,
	   it adds no request and no licence to keep track of. Swap the url() for a
	   real file if you would rather have photographic grain.

	   Layered as a ::before so the page's own background-image — set inline,
	   per page — is left alone underneath. The wash never drops below .72
	   alpha: under the base darkening the hero already applies, that keeps
	   white type at roughly 6.7:1 even where the photograph beneath is white.
	   ---------------------------------------------------------------------- */
	.vxn-simplehero--brand{position:relative;}
	.vxn-simplehero--brand::before{
		content:"";
		position:absolute;
		inset:0;
		z-index:0;
		background-image:
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='.07' stroke-width='1'%3E%3Cpath d='M0 48 L48 0 M-12 12 L12 -12 M36 60 L60 36'/%3E%3C/g%3E%3Cg fill='%23ffffff' fill-opacity='.05'%3E%3Ccircle cx='12' cy='36' r='1'/%3E%3Ccircle cx='36' cy='12' r='1'/%3E%3C/g%3E%3C/svg%3E"),
			linear-gradient(118deg, rgba(0,83,183,.78) 0%, rgba(0,83,183,.72) 42%, rgba(14,53,95,.92) 100%);
		background-repeat:repeat, no-repeat;
		background-size:48px 48px, cover;
		pointer-events:none;
	}
	/* The content is not positioned, so without this the absolute ::before would
	   paint over it. */
	.vxn-simplehero--brand > .e-con-inner{position:relative;z-index:1;}
`;

export default function PageHeroSection({
  page,
  region,
  tone = 'default',
}: {
  page: PageConfig;
  region: string;
  /** 'brand' adds the blue wash and texture the UAE services section uses. */
  tone?: 'default' | 'brand';
}) {
  const title = page.hero_title ?? page.title ?? 'Page';
  const image = page.hero_image ?? '';
  const pid = Number(page.post_id ?? 0);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />
      <div id="main-content">
        <div id="main" role="main" className="vamtam-main layout-full">
          <article id={`post-${pid}`} className={`full post-${pid} page type-page status-publish hentry`}>
            <div
              data-elementor-type="single-page"
              data-elementor-id="3752"
              className={`elementor elementor-3752 elementor-location-single post-${pid} page type-page status-publish hentry`}
              data-elementor-post-type="elementor_library"
            >
              <div
                className={`elementor-element elementor-element-c4d353f vxn-simplehero${
                  tone === 'brand' ? ' vxn-simplehero--brand' : ''
                } e-flex e-con-boxed e-con e-parent`}
                data-id="c4d353f"
                data-element_type="container"
                data-e-type="container"
                data-settings='{"background_background":"classic"}'
                style={{
                  backgroundImage: `linear-gradient(rgba(11,26,38,.62),rgba(11,26,38,.72)),url('${BASE}${image}')`,
                }}
              >
                <div className="e-con-inner">
                  <div
                    className="elementor-element elementor-element-6200b41 e-con-full e-flex e-con e-child"
                    data-id="6200b41"
                    data-element_type="container"
                    data-e-type="container"
                  >
                    <div
                      className="elementor-element elementor-element-7b36cfb e-con-full e-flex e-con e-child"
                      data-id="7b36cfb"
                      data-element_type="container"
                      data-e-type="container"
                    >
                      <div
                        className="elementor-element elementor-element-c739b5b elementor-widget elementor-widget-heading"
                        data-id="c739b5b"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <span className="elementor-heading-title elementor-size-default">
                            <a href={rurl(region, '/')}>Home</a>
                          </span>{' '}
                        </div>
                      </div>
                      <div
                        className="elementor-element elementor-element-1707a75 elementor-widget elementor-widget-theme-post-title elementor-page-title elementor-widget-heading"
                        data-id="1707a75"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="theme-post-title.default"
                      >
                        <div className="elementor-widget-container">
                          <span className="elementor-heading-title elementor-size-default">
                            &gt; {title}
                          </span>{' '}
                        </div>
                      </div>
                    </div>
                    <div
                      className="elementor-element elementor-element-3f5733d elementor-widget-divider--view-line elementor-widget elementor-widget-divider"
                      data-id="3f5733d"
                      data-element_type="widget"
                      data-e-type="widget"
                      data-widget_type="divider.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="elementor-divider">
                          <span className="elementor-divider-separator" />
                        </div>
                      </div>
                    </div>
                    <div
                      className="elementor-element elementor-element-8c0b074 e-con-full e-flex e-con e-child"
                      data-id="8c0b074"
                      data-element_type="container"
                      data-e-type="container"
                    >
                      <div
                        className="elementor-element elementor-element-16f0cb0 elementor-widget elementor-widget-heading"
                        data-id="16f0cb0"
                        data-element_type="widget"
                        data-e-type="widget"
                        data-widget_type="heading.default"
                      >
                        <div className="elementor-widget-container">
                          <h1 className="elementor-heading-title elementor-size-default">{title}</h1>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        {/* #main */}
      </div>
    </>
  );
}
