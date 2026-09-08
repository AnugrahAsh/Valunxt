import { definePage } from '@/lib/page-factory';
import PartnershipBody from '@/components/pages/PartnershipBody';

const { generateMetadata, Page } = definePage('/partnership/', ({ region }) => (
  <PartnershipBody region={region} />
));

export { generateMetadata };
export default Page;
