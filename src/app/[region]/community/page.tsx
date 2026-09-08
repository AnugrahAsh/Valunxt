import { definePage } from '@/lib/page-factory';
import CommunityBody from '@/components/pages/CommunityBody';

const { generateMetadata, Page } = definePage('/community/', ({ region }) => (
  <CommunityBody region={region} />
));

export { generateMetadata };
export default Page;
