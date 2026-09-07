/**
 * The per-page chrome: everything includes/header.php and includes/footer.php
 * wrapped around a page body, in the same order and with the same markup.
 *
 *   [preloader]                      includes/preloader.php
 *   [captured Elementor header]      includes/partials/header-<id>.php
 *   <div id="page" class="main-container">
 *     {children}                     the page's own sections
 *     [captured Elementor footer]    includes/partials/footer-<id>.php
 *   </div>
 *   #scroll-to-top
 *   [progress bar + partner dock]    includes/partials/vxn-dock.php
 *   [cookie consent]                 includes/partials/cookie-consent.php
 *   [scripts]                        includes/scripts.php
 *
 * The stylesheet block from includes/head.php is rendered by the root layout
 * instead, because it belongs inside the real <head> — see src/app/layout.tsx.
 */
import type { ReactNode } from 'react';
import type { PageConfig } from '@/lib/page-config';
import { vxnRegion } from '@/lib/region';

import Preloader from './Preloader';
import Header139 from './Header139';
import Header3134 from './Header3134';
import Header3837 from './Header3837';
import SmoothScroll from './SmoothScroll';
import Footer2094 from './Footer2094';
import Footer3425 from './Footer3425';
import CookieConsent from './CookieConsent';
import SiteScripts from './SiteScripts';
import VxnDock from './VxnDock';

function SiteHeader({
  which,
  region,
}: {
  which: string;
  region: string;
}) {
  if (which === '139') return <Header139 region={region} />;
  if (which === '3134') return <Header3134 region={region} />;
  if (which === '3837') return <Header3837 region={region} />;
  return null;
}

function SiteFooter({ which, region }: { which: string; region: string }) {
  if (which === '2094') return <Footer2094 region={region} />;
  if (which === '3425') return <Footer3425 region={region} />;
  return null;
}

export default function PageShell({
  page,
  region: rawRegion,
  children,
}: {
  page: PageConfig;
  region: string;
  children: ReactNode;
}) {
  const region = vxnRegion(rawRegion);

  return (
    <>
      <SmoothScroll />
      <Preloader />
      <SiteHeader which={page.header} region={region} />
      <div id="page" className="main-container">
        {children}
        {page.canvas ? null : <SiteFooter which={page.footer} region={region} />}
      </div>
      <div id="scroll-to-top" className="vamtam-scroll-to-top">
        <div id="scroll-to-top-text">top</div>
      </div>
      <VxnDock region={region} />
      <CookieConsent region={region} />
      <SiteScripts page={page} region={region} />
    </>
  );
}
