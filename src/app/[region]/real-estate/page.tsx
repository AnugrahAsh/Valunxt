/**
 * /{region}/real-estate/ — the real estate pillar page.
 *
 * A static segment inside the market tree, so it beats the CMS catch-all at
 * [region]/[...slug]/ and reaches the same page in either edition.
 *
 * The section renders its own navigation and footer inside Shell, and the root
 * layout gives these URLs a lean head — the two brand typefaces and the
 * section's own stylesheet, none of the site's Elementor cascade. See the
 * realEstateRequest() branch in src/app/layout.tsx.
 *
 * Published but not advertised: no navigation item on the main site, no sitemap
 * entry. Reaching it means typing the URL.
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
    <Shell region={region}>
      <HomeBody region={region} />
    </Shell>
  );
}
