import { definePage } from '@/lib/page-factory';
import ClientsBody from '@/components/pages/ClientsBody';

const { generateMetadata, Page } = definePage('/clients/', ({ region }) => (
  <ClientsBody region={region} />
));

export { generateMetadata };
export default Page;
