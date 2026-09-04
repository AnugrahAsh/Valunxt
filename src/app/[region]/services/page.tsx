/**
 * /services/ — the services index, one per market.
 *
 * India keeps its captured page (ServicesBody): the group's four verticals, each
 * with a written page behind it. The UAE leads with six different services and
 * six different URLs, so it gets its own index rather than being shown India's
 * four and sent to India's pages.
 */
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import PageHeroSection from '@/components/sections/PageHeroSection';
import SubscribeSection from '@/components/sections/SubscribeSection';
import ServicesBody from '@/components/pages/ServicesBody';
import UaeServicesBody from '@/components/pages/UaeServicesBody';
import { buildMetadata } from '@/lib/seo';
import { requirePageConfig } from '@/lib/pages';
import { vxnRegion } from '@/lib/region';
import type { PageConfig } from '@/lib/page-config';

const PATH = '/services/';

type Params = { params: Promise<{ region: string }> };

/**
 * The UAE index renders the shared page-hero, which the captured India markup
 * draws itself — so the hero fields the registry entry never needed are added
 * here rather than to the shared declaration.
 */
function configFor(region: string): PageConfig {
  const page = requirePageConfig(PATH);
  if (region !== 'en-ae') return page;
  return {
    ...page,
    hero_title: 'Services',
    hero_image: '/assets/content/uploads/banners/service-main.webp',
  };
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
      {region === 'en-ae' ? (
        <>
          <PageHeroSection page={page} region={region} tone="brand" />
          <UaeServicesBody page={page} region={region} />
          <SubscribeSection page={page} region={region} />
        </>
      ) : (
        <ServicesBody page={page} region={region} />
      )}
    </PageShell>
  );
}
