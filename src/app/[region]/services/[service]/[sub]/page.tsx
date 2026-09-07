/**
 * A page beneath a UAE practice — /en-ae/services/<service>/<sub>/.
 *
 * Same reasoning as the parent route: the sub-services render the same detail
 * template, and both they and their copy already live in the UAE service tree.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import ServiceDetailBody from '@/components/pages/uae-services/ServiceDetailBody';
import ContactSection from '@/components/sections/ContactSection';
import SubscribeSection from '@/components/sections/SubscribeSection';
import { buildMetadata } from '@/lib/seo';
import { vxnRegion } from '@/lib/region';
import { UAE_SERVICES } from '@/data/uae-services';
import { uaeSubServiceConfig } from '@/lib/uae-service-pages';

type Params = { params: Promise<{ region: string; service: string; sub: string }> };

function resolve(rawRegion: string, service: string, sub: string) {
  const region = vxnRegion(rawRegion);
  if (region !== 'en-ae') return null;
  const slug = decodeURIComponent(service);
  const parent = UAE_SERVICES[slug];
  if (!parent) return null;
  const childSlug = decodeURIComponent(sub);
  const child = parent.children[childSlug];
  return child ? { region, slug, service: parent, childSlug, child } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region, service, sub } = await params;
  const hit = resolve(region, service, sub);
  if (!hit) return {};
  return buildMetadata(
    uaeSubServiceConfig(hit.slug, hit.service, hit.childSlug, hit.child),
    hit.region,
  );
}

export default async function UaeSubServicePage({ params }: Params) {
  const { region, service, sub } = await params;
  const hit = resolve(region, service, sub);
  if (!hit) notFound();

  const page = uaeSubServiceConfig(hit.slug, hit.service, hit.childSlug, hit.child);

  return (
    <PageShell page={page} region={hit.region}>
      <div id="main-content">
        <div id="main" role="main" className="vamtam-main layout-full">
          <ServiceDetailBody region={hit.region} slug={hit.slug} child={hit.childSlug} />
          <div id="vxd-contact">
            <ContactSection region={hit.region} />
          </div>
          <SubscribeSection page={page} region={hit.region} />
        </div>
      </div>
    </PageShell>
  );
}
