/**
 * /{region}/real-estate/ — the real estate pillar page.
 *
 * A static segment inside the market tree, so it beats the CMS catch-all at
 * [region]/[...slug]/ and reaches the same page in either edition:
 *
 *   /en-ae/real-estate/    /en-in/real-estate/
 *
 * The section is published but not advertised — there is no navigation item and
 * no sitemap entry for it. Reaching it means typing the URL, which is what was
 * asked for while the practice is still being finished.
 */
import type { Metadata } from 'next';

import Shell from '@/real-estate/components/Shell';
import HomeBody from '@/real-estate/components/HomeBody';
import { pillarMetadata } from '@/real-estate/lib/seo';
import { toLocale } from '@/real-estate/lib/routes';
import { vxnRegionList } from '@/lib/region';

type Params = { params: Promise<{ region: string }> };

export function generateStaticParams() {
  return vxnRegionList().map((r) => ({ region: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return pillarMetadata(toLocale((await params).region));
}

export default async function RealEstatePage({ params }: Params) {
  const region = toLocale((await params).region);
  return (
    <Shell locale={region}>
      <HomeBody locale={region} />
    </Shell>
  );
}
