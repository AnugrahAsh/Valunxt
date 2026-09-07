/**
 * /en-ae/services/ — the UAE services index.
 *
 * The shared ServicesBody is India's: a thousand lines of captured Elementor
 * markup naming the group's four verticals and linking to their four pages.
 * Serving it to the UAE put four Indian services, and four Indian URLs, under a
 * UAE visitor's Services menu.
 *
 * Second generation, in the home page's design language: a dark stage with the
 * blue abstract bands and a practice switcher, a sticky rail that follows the
 * reader down the six practices, and per practice a product visual plus a card
 * per sub-service. Everything comes from the UAE service tree, so a service
 * added there appears here without this file changing.
 *
 * Kit: components/vxh/kit. Styles: /assets/css/vxn-home-ae.css +
 * /assets/css/vxn-services-ae.css. Behaviour: /assets/js/vxn-services-ae.js.
 *
 * Port of en-ae/services/index.php.
 */
import { rurl, vxnRegionData, vxnRegionPhone, vxnServices } from '@/lib/region';
import { rimg } from '@/lib/region-assets';
import { plainText } from '@/lib/html-text';
import { UAE_SERVICES, uaeServicePath } from '@/data/uae-services';
import { Abs, Ico, Visual, vxhKind } from '@/components/vxh/kit';
import Html from '@/components/Html';

/** "01", "02", … */
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export default function UaeServicesBody({ region }: { region: string }) {
  const services = Object.entries(UAE_SERVICES);
  const reg = vxnRegionData(region);
  const phone = vxnRegionPhone(region);
  const tel = reg.tel;

  /* The icon token for each practice, from the market registry — so the rail,
     the switcher and the mega menu all draw the same glyph for a practice. */
  const icons: Record<string, string> = {};
  for (const s of vxnServices(region)) icons[s.href.replace(/^\/+|\/+$/g, '')] = s.icon ?? 'doc';

  return (
    <div className="vxh">
      {/* The stage */}
      <section className="vxh-stage" aria-label="Services in the UAE">
        <Abs variant="planes" />
        <div className="vxh__in">
          <div className="vxh-stage__grid">
            <div>
              <nav className="vxh-crumb" aria-label="Breadcrumb">
                <a href={rurl(region, '/')}>Home</a>
                <i />
                <b>Services</b>
              </nav>
              <h1 className="vxh-h1">
                Six practices. <span className="vxh-grad">One accountable partner.</span>
              </h1>
              <p className="vxh-lede">
                Accounting and tax, real estate transactions, mortgages, valuation, research and
                technology &mdash; delivered by one senior team, at a fee agreed before work begins.
              </p>
              <div className="vxh-stage__cta">
                <a className="vxh-btn vxh-btn--primary" href={rurl(region, '/free-consultation/')}>
                  Free Consultation <Ico name="ne" size={18} />
                </a>
                <a className="vxh-stage__tel" href={`tel:${tel}`}>
                  <Ico name="phone" size={16} /> {phone}
                </a>
              </div>
            </div>
            <div className="vxs-switch" aria-label="Jump to a practice">
              {services.map(([slug, s], i) => (
                <a href={`#${slug}`} key={slug}>
                  <span className="vxs-switch__ic">
                    <Ico name={icons[`services/${slug}`] ?? 'doc'} size={18} />
                  </span>
                  <Html as="span" className="vxs-switch__t" html={s.title} />
                  <span className="vxs-switch__n">
                    {pad2(i + 1)} &middot; {Object.keys(s.children).length} services{' '}
                    <Ico name="ne" size={14} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="vxs-body">
        {/* Sticky rail */}
        <nav className="vxh-snav" aria-label="Practices on this page">
          <div className="vxh-snav__in">
            {services.map(([slug, s], i) => (
              <a href={`#${slug}`} key={slug}>
                <span className="n">{pad2(i + 1)}</span>
                <Html as="span" html={s.short} />
              </a>
            ))}
            <span className="vxh-snav__ind" aria-hidden="true" />
            <span className="vxh-snav__cta">
              <a className="vxh-btn vxh-btn--blue" href={rurl(region, '/free-consultation/')}>
                Talk to a partner <Ico name="ne" size={14} />
              </a>
            </span>
          </div>
        </nav>

        {services.map(([slug, s], i) => {
          const href = rurl(region, uaeServicePath(slug));
          const label = plainText(s.title);
          const children = Object.entries(s.children);
          return (
            <section className="vxs-practice" id={slug} key={slug} aria-labelledby={`vxs-${slug}-h`}>
              <div className="vxh__in">
                <div className="vxs-practice__grid">
                  <div className="vxs-practice__aside">
                    <span className="vxs-practice__num">
                      {pad2(i + 1)} / {pad2(services.length)}
                    </span>
                    <h2 className="vxs-practice__t" id={`vxs-${slug}-h`}>
                      <Html as="a" href={href} html={s.title} />
                    </h2>
                    <Html as="p" className="vxs-practice__d" html={s.lede} />
                    <div className="vxs-practice__acts">
                      <a className="vxh-btn vxh-btn--outline" href={href}>
                        <Html as="span" html={`Explore ${s.short} `} />
                        <Ico name="arrow" size={16} />
                      </a>
                      <a className="vxh-link" href={rurl(region, '/free-consultation/')}>
                        Free consultation <Ico name="arrow" size={15} />
                      </a>
                    </div>
                  </div>
                  <div className="vxs-cells">
                    <a className="vxh-cell vxs-photo" href={href} aria-label={label} data-vxn-in="up">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rimg(region, s.img.replace('/assets/content/uploads/', '').replace(/^\/+/, ''))}
                        alt=""
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                      <span className="vxs-photo__cap">
                        <Html as="span" html={s.short} /> &middot; {children.length} services
                      </span>
                    </a>
                    <a
                      className="vxh-cell vxh-cell--vis"
                      href={href}
                      aria-label={label}
                      data-vxn-in="up"
                    >
                      <div className="vxh-cell__vis">
                        <Visual kind={vxhKind(slug)} id={`s${i + 1}`} />
                      </div>
                      <span className="vxh-cell__go">
                        <Ico name="ne" size={16} />
                      </span>
                    </a>
                    {children.map(([cslug, c]) => (
                      <a
                        className="vxh-cell vxs-sub"
                        href={rurl(region, uaeServicePath(slug, cslug))}
                        data-vxn-in="up"
                        key={cslug}
                      >
                        <div className="vxh-cell__txt">
                          <Html as="h3" className="vxh-cell__t" html={c.title} />
                          <Html as="p" className="vxh-cell__d" html={c.lede} />
                        </div>
                        <span className="vxh-cell__go">
                          <Ico name="ne" size={15} />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
