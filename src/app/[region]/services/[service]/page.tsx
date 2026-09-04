/**
 * A UAE service page — /en-ae/services/<service>/.
 *
 * The six UAE services are one dynamic route rather than six folders: they all
 * render the same three sections, and their names and URLs already live in
 * vxnServices('en-ae'). Adding a service is an entry in that registry, not a
 * new file here.
 *
 * India's four services keep their own static folders next to this one, each
 * with real content behind it. A static segment beats a dynamic one in Next's
 * matcher, so /en-in/services/capital-advisory/ still reaches its own page and
 * never falls through to this route — and the region guard below means this
 * route answers for the UAE only, so India cannot reach a UAE slug either.
 *
 * /services/research-intelligence/ is the one slug both markets use. Its static
 * folder wins for both, so the branch lives there; see that file.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import PageHeroSection from '@/components/sections/PageHeroSection';
import SubscribeSection from '@/components/sections/SubscribeSection';
import UaeServiceBody from '@/components/pages/UaeServiceBody';
import ServicePageBody from '@/components/pages/uae-services/ServicePageBody';
import { uaeServiceContent } from '@/components/pages/uae-services';
import { buildMetadata } from '@/lib/seo';
import { vxnRegion, vxnServiceBySlug } from '@/lib/region';
import { uaeServiceConfig } from '@/lib/uae-service-pages';

type Params = { params: Promise<{ region: string; service: string }> };

/** The service this URL names, or null when the market does not publish it. */
function resolve(rawRegion: string, service: string) {
  const region = vxnRegion(rawRegion);
  if (region !== 'en-ae') return null;
  const found = vxnServiceBySlug(decodeURIComponent(service), region);
  return found ? { region, service: found } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region, service } = await params;
  const hit = resolve(region, service);
  if (!hit) return {};
  return buildMetadata(
    uaeServiceConfig(hit.service, !!uaeServiceContent(hit.service.slug)),
    hit.region,
  );
}

export default async function UaeServicePage({ params }: Params) {
  const { region, service } = await params;
  const hit = resolve(region, service);
  if (!hit) notFound();

  /* A service with a written body renders it between the breadcrumb hero and the
     subscribe block. Everything still unwritten gets the shared coming-soon body,
     which is those same two sections with the holding band between them. */
  const content = uaeServiceContent(hit.service.slug);
  const page = uaeServiceConfig(hit.service, !!content);

  return (
    <PageShell page={page} region={hit.region}>
      {content ? (
        <>
          <PageHeroSection page={page} region={hit.region} tone="brand" />
          <ServicePageBody region={hit.region} content={content} />
          <SubscribeSection page={page} region={hit.region} />
        </>
      ) : (
        <UaeServiceBody page={page} region={hit.region} />
      )}
    </PageShell>
  );
}
