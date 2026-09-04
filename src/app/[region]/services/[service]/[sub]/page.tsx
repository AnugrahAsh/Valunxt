/**
 * A page beneath a UAE service — /en-ae/services/<service>/<sub>/.
 *
 * Same reasoning as the parent route: the twenty-nine sub-services differ only
 * by name and URL, and both already live in vxnServices('en-ae').
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import UaeServiceBody from '@/components/pages/UaeServiceBody';
import { buildMetadata } from '@/lib/seo';
import { vxnRegion, vxnServiceBySlug, vxnSubService } from '@/lib/region';
import { uaeSubServiceConfig } from '@/lib/uae-service-pages';

type Params = { params: Promise<{ region: string; service: string; sub: string }> };

function resolve(rawRegion: string, service: string, sub: string) {
  const region = vxnRegion(rawRegion);
  if (region !== 'en-ae') return null;
  const parent = vxnServiceBySlug(decodeURIComponent(service), region);
  if (!parent) return null;
  const child = vxnSubService(parent, decodeURIComponent(sub));
  return child ? { region, service: parent, sub: child } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region, service, sub } = await params;
  const hit = resolve(region, service, sub);
  if (!hit) return {};
  return buildMetadata(uaeSubServiceConfig(hit.service, hit.sub), hit.region);
}

export default async function UaeSubServicePage({ params }: Params) {
  const { region, service, sub } = await params;
  const hit = resolve(region, service, sub);
  if (!hit) notFound();

  const page = uaeSubServiceConfig(hit.service, hit.sub);
  return (
    <PageShell page={page} region={hit.region}>
      <UaeServiceBody page={page} region={hit.region} />
    </PageShell>
  );
}
