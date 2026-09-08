import { definePage } from '@/lib/page-factory';
import ContactBody from '@/components/pages/ContactBody';

const { generateMetadata, Page } = definePage('/contact/', ({ region }) => (
  <ContactBody region={region} />
));

export { generateMetadata };
export default Page;
