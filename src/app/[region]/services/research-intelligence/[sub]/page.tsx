/**
 * The pages beneath the UAE's Research & Intelligence service.
 *
 * They cannot be served by services/[service]/[sub]/ because their parent
 * segment matches a static folder, and Next stops descending the dynamic branch
 * the moment a static one matches. So the sub-route is repeated here, over the
 * same registry and the same body.
 *
 * India has no pages under this service, and the guard below 404s it there.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import UaeServiceBody from '@/components/pages/UaeServiceBody';
import { buildMetadata } from '@/lib/seo';
import { vxnRegion, vxnServiceBySlug, vxnSubService } from '@/lib/region';
import { uaeSubServiceConfig } from '@/lib/uae-service-pages';

type Params = { params: Promise<{ region: string; sub: string }> };

function resolve(rawRegion: string, sub: string) {
  const region = vxnRegion(rawRegion);
  if (region !== 'en-ae') return null;
  const parent = vxnServiceBySlug('research-intelligence', region);
  if (!parent) return null;
  const child = vxnSubService(parent, decodeURIComponent(sub));
  return child ? { region, service: parent, sub: child } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region, sub } = await params;
  const hit = resolve(region, sub);
  if (!hit) return {};
  return buildMetadata(uaeSubServiceConfig(hit.service, hit.sub), hit.region);
}

export default async function UaeResearchSubServicePage({ params }: Params) {
  const { region, sub } = await params;
  const hit = resolve(region, sub);
  if (!hit) notFound();

  const page = uaeSubServiceConfig(hit.service, hit.sub);
  return (
    <PageShell page={page} region={hit.region}>
      <UaeServiceBody page={page} region={hit.region} />
    </PageShell>
  );
}
