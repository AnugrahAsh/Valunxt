/**
 * /services/research-intelligence/ — the one services slug both markets use.
 *
 * India publishes it as a full page. The UAE lists "Research & Intelligence"
 * among its six services, which are not written yet, so it gets the same
 * coming-soon body as the other five.
 *
 * The branch has to live here rather than in the [service] route next door:
 * Next matches a static segment before a dynamic one, so this folder answers
 * for both markets whatever the dynamic route would have done.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import ResearchIntelligenceBody from '@/components/pages/ResearchIntelligenceBody';
import UaeServiceBody from '@/components/pages/UaeServiceBody';
import PageHeroSection from '@/components/sections/PageHeroSection';
import SubscribeSection from '@/components/sections/SubscribeSection';
import ServicePageBody from '@/components/pages/uae-services/ServicePageBody';
import { uaeServiceContent } from '@/components/pages/uae-services';
import { buildMetadata } from '@/lib/seo';
import { requirePageConfig } from '@/lib/pages';
import { vxnRegion, vxnServiceBySlug } from '@/lib/region';
import { uaeServiceConfig } from '@/lib/uae-service-pages';

const PATH = '/services/research-intelligence/';

type Params = { params: Promise<{ region: string }> };

/** The India page's own declaration, or the UAE service derived from the registry. */
function configFor(region: string) {
  if (region === 'en-ae') {
    const service = vxnServiceBySlug('research-intelligence', region);
    if (!service) return null;
    return uaeServiceConfig(service, !!uaeServiceContent(service.slug));
  }
  return requirePageConfig(PATH);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region: raw } = await params;
  const region = vxnRegion(raw);
  const page = configFor(region);
  return page ? buildMetadata(page, region) : {};
}

export default async function ResearchIntelligencePage({ params }: Params) {
  const { region: raw } = await params;
  const region = vxnRegion(raw);
  const page = configFor(region);
  if (!page) notFound();

  /* The UAE publishes a written page here; India keeps its own. */
  const uaeContent = region === 'en-ae' ? uaeServiceContent('research-intelligence') : undefined;

  return (
    <PageShell page={page} region={region}>
      {uaeContent ? (
        <>
          <PageHeroSection page={page} region={region} tone="brand" />
          <ServicePageBody region={region} content={uaeContent} />
          <SubscribeSection page={page} region={region} />
        </>
      ) : region === 'en-ae' ? (
        <UaeServiceBody page={page} region={region} />
      ) : (
        <ResearchIntelligenceBody page={page} region={region} />
      )}
    </PageShell>
  );
}
