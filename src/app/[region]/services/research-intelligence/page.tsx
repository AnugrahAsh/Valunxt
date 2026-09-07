/**
 * /services/research-intelligence/ — India's Research & Intelligence page.
 *
 * The UAE used to share this slug, which is why the branch lived here: Next
 * matches a static segment before a dynamic one, so this folder answered for
 * both markets whatever the dynamic route next door would have done. The UAE
 * now publishes the practice at /services/research-and-intelligence/, the URL
 * the service tree gives it, so the collision is gone and this page is India's
 * alone. The guard 404s it in any other market.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import ResearchIntelligenceBody from '@/components/pages/ResearchIntelligenceBody';
import { buildMetadata } from '@/lib/seo';
import { requirePageConfig } from '@/lib/pages';
import { vxnRegion } from '@/lib/region';

const PATH = '/services/research-intelligence/';

type Params = { params: Promise<{ region: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region: raw } = await params;
  const region = vxnRegion(raw);
  if (region === 'en-ae') return {};
  return buildMetadata(requirePageConfig(PATH), region);
}

export default async function ResearchIntelligencePage({ params }: Params) {
  const { region: raw } = await params;
  const region = vxnRegion(raw);
  if (region === 'en-ae') notFound();

  const page = requirePageConfig(PATH);
  return (
    <PageShell page={page} region={region}>
      <ResearchIntelligenceBody page={page} region={region} />
    </PageShell>
  );
}
