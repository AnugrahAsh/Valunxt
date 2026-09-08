import { definePage } from '@/lib/page-factory';
import CareersBody from '@/components/pages/CareersBody';

const { generateMetadata, Page } = definePage('/about/careers/', ({ region }) => (
  <CareersBody region={region} />
));

export { generateMetadata };
export default Page;
