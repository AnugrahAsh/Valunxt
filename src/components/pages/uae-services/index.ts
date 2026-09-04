/**
 * The UAE service pages that have been written.
 *
 * Every service under /en-ae/services/ renders the shared coming-soon body until
 * its page exists. A slug present in UAE_SERVICE_CONTENT has a page: the route
 * renders ServicePageBody with that content, and — because a written page is one
 * worth indexing — its PageConfig drops the noindex the unwritten ones carry.
 *
 * Adding a page is one entry in content.ts. Nothing here changes.
 */
import { UAE_SERVICE_CONTENT, type ServicePageContent } from './content';

export { UAE_SERVICE_CONTENT };
export type { ServicePageContent };

/** The content for a service slug, or undefined while the page is unwritten. */
export function uaeServiceContent(slug: string | undefined): ServicePageContent | undefined {
  return slug ? UAE_SERVICE_CONTENT[slug] : undefined;
}
