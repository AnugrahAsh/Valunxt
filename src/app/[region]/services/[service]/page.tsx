/**
 * A UAE service page — /en-ae/services/<service>/.
 *
 * The six UAE practices are one dynamic route rather than six folders: they all
 * render the same detail template, and their names, URLs and copy already live
 * in the UAE service tree. Adding a practice is an entry in that registry, not a
 * new file here.
 *
 * India's four services keep their own static folders next to this one, each
 * with real content behind it. A static segment beats a dynamic one in Next's
 * matcher, so /en-in/services/capital-advisory/ still reaches its own page and
 * never falls through to this route — and the region guard below means this
 * route answers for the UAE only, so India cannot reach a UAE slug either.
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
import { uaeServiceConfig } from '@/lib/uae-service-pages';

type Params = { params: Promise<{ region: string; service: string }> };

/** The practice this URL names, or null when the market does not publish it. */
function resolve(rawRegion: string, service: string) {
  const region = vxnRegion(rawRegion);
  if (region !== 'en-ae') return null;
  const slug = decodeURIComponent(service);
  const found = UAE_SERVICES[slug];
  return found ? { region, slug, service: found } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region, service } = await params;
  const hit = resolve(region, service);
  if (!hit) return {};
  return buildMetadata(uaeServiceConfig(hit.slug, hit.service), hit.region);
}

export default async function UaeServicePage({ params }: Params) {
  const { region, service } = await params;
  const hit = resolve(region, service);
  if (!hit) notFound();

  const page = uaeServiceConfig(hit.slug, hit.service);

  return (
    <PageShell page={page} region={hit.region}>
      <div id="main-content">
        <div id="main" role="main" className="vamtam-main layout-full">
          <ServiceDetailBody region={hit.region} slug={hit.slug} />
          <div id="vxd-contact">
            <ContactSection region={hit.region} />
          </div>
          <SubscribeSection page={page} region={hit.region} />
        </div>
      </div>
    </PageShell>
  );
}
