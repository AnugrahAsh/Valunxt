import { definePage } from '@/lib/page-factory';
import AboutBody from '@/components/pages/AboutBody';

const { generateMetadata, Page } = definePage('/about/', ({ region }) => (
  <AboutBody region={region} />
));

export { generateMetadata };
export default Page;
