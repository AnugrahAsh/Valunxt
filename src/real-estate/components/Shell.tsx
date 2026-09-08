/**
 * The section's frame: navigation, footer, and the `.vxn-re` boundary.
 *
 * `.vxn-re` is load-bearing. Every rule in valunxt-realestate.css is scoped
 * under it, so this element is the boundary between the section's styles and the
 * rest of the site's — put page content inside it and nothing escapes either
 * way.
 *
 * The motion layers are mounted here rather than per page, so every route gets
 * them without opting in: Motion.tsx reveals things as they arrive, Scroll.tsx
 * owns the damped scroll, the parallax and the gallery's drift.
 */
import type { ReactNode } from 'react';

import Motion from './Motion';
import Scroll from './Scroll';
import Nav from './Nav';
import Footer from './Footer';
import type { Locale } from '../lib/types';

export default function Shell({ region, children }: { region: Locale; children: ReactNode }) {
  return (
    <div className="vxn-re">
      <Motion />
      <Scroll />
      <Nav region={region} />
      <main>{children}</main>
      <Footer region={region} />
    </div>
  );
}
