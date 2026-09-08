import { definePage } from '@/lib/page-factory';
import LocationBody from '@/components/pages/LocationBody';

const { generateMetadata, Page } = definePage('/location/', ({ region }) => (
  <LocationBody region={region} />
));

export { generateMetadata };
export default Page;
