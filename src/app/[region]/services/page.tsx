/**
 * /services/ — the services index, one per market.
 *
 * India keeps its captured page (ServicesBody): the group's four verticals, each
 * with a written page behind it. The UAE leads with six different practices and
 * six different URLs, so it gets its own index rather than being shown India's
 * four and sent to India's pages.
 */
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import SubscribeSection from '@/components/sections/SubscribeSection';
import ContactSection from '@/components/sections/ContactSection';
import ServicesBody from '@/components/pages/ServicesBody';
import UaeServicesBody from '@/components/pages/UaeServicesBody';
import { buildMetadata } from '@/lib/seo';
import { requirePageConfig } from '@/lib/pages';
import { vxnRegion } from '@/lib/region';
import { uaeServicesIndexConfig } from '@/lib/uae-service-pages';
import type { PageConfig } from '@/lib/page-config';

const PATH = '/services/';

type Params = { params: Promise<{ region: string }> };

/**
 * The UAE index is a different page at the same path: its own title and
 * description, the vxh kit sheets, and the home page's sheet (17) for the shared
 * "Get in Touch" block it closes with. India's declaration is the registry
 * entry, unchanged.
 *
 * The override is built in lib/uae-service-pages.ts rather than here because the
 * root layout resolves the page from the URL to emit its stylesheets — so the
 * two have to read the same declaration or the page renders unstyled.
 */
function configFor(region: string): PageConfig {
  const page = requirePageConfig(PATH);
  return region === 'en-ae' ? uaeServicesIndexConfig(page) : page;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region: raw } = await params;
  const region = vxnRegion(raw);
  return buildMetadata(configFor(region), region);
}

export default async function ServicesPage({ params }: Params) {
  const { region: raw } = await params;
  const region = vxnRegion(raw);
  const page = configFor(region);

  if (region !== 'en-ae') {
    return (
      <PageShell page={page} region={region}>
        <ServicesBody page={page} region={region} />
      </PageShell>
    );
  }

  return (
    <PageShell page={page} region={region}>
      <div id="main-content">
        <div id="main" role="main" className="vamtam-main layout-full">
          <UaeServicesBody region={region} />
          <ContactSection region={region} />
          <SubscribeSection page={page} region={region} />
        </div>
      </div>
    </PageShell>
  );
}
