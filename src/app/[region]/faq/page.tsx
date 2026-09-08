import { definePage } from '@/lib/page-factory';
import FaqBody from '@/components/pages/FaqBody';

const { generateMetadata, Page } = definePage('/faq/', ({ region }) => (
  <FaqBody region={region} />
));

export { generateMetadata };
export default Page;
