/**
 * /{region}/real-estate/{service}/ — the eight service pages.
 *
 * One dynamic segment covers all of them: they are the same template driven by a
 * different ServicePage record. Adding a ninth is a record in
 * data/pages.ts plus its slug in SERVICE_SLUGS — no file here changes.
 *
 * An unknown slug 404s rather than rendering an empty shell, and that 404 is the
 * site's own: realEstateRequest() answers false for it, so the root layout
 * serves the normal head and NotFoundBody renders styled.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Shell from '@/real-estate/components/Shell';
import ServicePageBody from '@/real-estate/components/ServicePageBody';
import { SERVICE_PAGES } from '@/real-estate/data/pages';
import { SERVICE_SLUGS, toLocale } from '@/real-estate/lib/routes';
import { serviceMetadata } from '@/real-estate/lib/seo';
import { vxnRegionList } from '@/lib/region';

type Params = { params: Promise<{ region: string; service: string }> };

/** Every published URL in the section; the set is small and fully known. */
export function generateStaticParams() {
  return vxnRegionList().flatMap((r) =>
    SERVICE_SLUGS.map((service) => ({ region: r.slug, service })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region, service } = await params;
  return serviceMetadata(toLocale(region), decodeURIComponent(service));
}

export default async function RealEstateServicePage({ params }: Params) {
  const { region: raw, service } = await params;
  const region = toLocale(raw);
  const page = SERVICE_PAGES[decodeURIComponent(service)];
  if (!page) notFound();

  return (
    <Shell region={region}>
      <ServicePageBody region={region} page={page} />
    </Shell>
  );
}
