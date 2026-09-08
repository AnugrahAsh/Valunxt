/**
 * /services/ — the services index, one page for both markets.
 *
 * It used to be two: India's captured Elementor page and, at the same path, a
 * second UAE-only page. They named different practices because the markets do,
 * but they had also drifted into two different designs. ServicesIndexBody reads
 * the market registry, so the practices still differ and the page does not.
 *
 * The declaration is still per market — the UAE index has its own title,
 * description and stylesheet list — and is built in lib/uae-service-pages.ts
 * rather than here, because the root layout resolves the page from the URL to
 * emit its stylesheets, so the two have to read the same declaration or the page
 * renders unstyled.
 */
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import ServicesIndexBody from '@/components/pages/ServicesIndexBody';
import { buildMetadata } from '@/lib/seo';
import { requirePageConfig } from '@/lib/pages';
import { vxnRegion } from '@/lib/region';
import { uaeServicesIndexConfig } from '@/lib/uae-service-pages';
import type { PageConfig } from '@/lib/page-config';

const PATH = '/services/';

type Params = { params: Promise<{ region: string }> };

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

  return (
    <PageShell page={page} region={region}>
      <div id="main-content">
        <div id="main" role="main" className="vamtam-main layout-full">
          <ServicesIndexBody region={region} />
        </div>
      </div>
    </PageShell>
  );
}
