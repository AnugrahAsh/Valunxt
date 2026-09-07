/**
 * The section's frame: navigation, footer, and the `.vxn-re` boundary.
 *
 * `.vxn-re` is load-bearing. Every rule in valunxt-realestate.css is scoped
 * under it, so this element is the boundary between the section's styles and the
 * rest of the site's — put page content inside it and nothing escapes either
 * way.
 *
 * The motion layer is mounted here rather than per page, so every route gets the
 * scroll behaviour without opting in. See Motion.tsx.
 */
import type { ReactNode } from 'react';

import Motion from './Motion';
import Nav from './Nav';
import Footer from './Footer';
import type { Locale } from '../lib/types';

export default function Shell({ region, children }: { region: Locale; children: ReactNode }) {
  return (
    <div className="vxn-re">
      <Motion />
      <Nav region={region} />
      <main>{children}</main>
      <Footer region={region} />
    </div>
  );
}
