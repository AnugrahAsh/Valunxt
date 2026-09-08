import { definePage } from '@/lib/page-factory';
import ResearchBody from '@/components/pages/ResearchBody';

const { generateMetadata, Page } = definePage('/research/', ({ region }) => (
  <ResearchBody region={region} />
));

export { generateMetadata };
export default Page;
