/**
 * The Real Estate section.
 *
 * This layout exists to do one thing: load the module's stylesheet once for
 * every page beneath it, rather than importing it from each route file.
 *
 * There is no chrome here. The module renders its own header and footer inside
 * `.re-root` (see src/real-estate/components/Shell.tsx), so these pages do not
 * go through PageShell the way the rest of the site does — two headers and two
 * footers is not a page. For the same reason the root layout skips the
 * Elementor stylesheet cascade on these URLs; see the note in src/app/layout.tsx.
 */
import type { ReactNode } from 'react';
import '@/real-estate/styles/real-estate.css';

export default function RealEstateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
