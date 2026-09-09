import type { Metadata } from 'next';

import Shell from '@/real-estate/components/Shell';
import ListingsGrid from '@/real-estate/components/ListingsGrid';
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

export default async function RealEstateListingsPage({ params }: Params) {
  const region = toLocale((await params).region);
  return (
    <Shell region={region}>
      <div className="vxr-flow" style={{ paddingTop: '80px' }}>
        <ListingsGrid />
      </div>
    </Shell>
  );
}
