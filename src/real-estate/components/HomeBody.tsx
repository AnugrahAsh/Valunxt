/**
 * The pillar page: /{locale}/real-estate/.
 *
 * Section order is the whole composition, so it lives in one readable list
 * rather than being spread across nested wrappers. Every section reads its own
 * copy from data/home.ts; this file decides only what appears and in what
 * order.
 */
import type { Locale } from '../lib/types';
import { FAQS } from '../data/home';
import ParallaxHero from './sections/ParallaxHero';
import About from './sections/About';
import Services from './sections/Services';
import Valuations from './sections/Valuations';
import Process from './sections/Process';
import Figures from './sections/Figures';
import Insights from './sections/Insights';
import Contact from './sections/Contact';
import Reviews from './sections/Reviews';
import Partners from './sections/Partners';
import Faqs from './sections/Faqs';

export default function HomeBody({
  locale,
  /** Lead endpoint for the consultation form; see Contact.tsx. */
  formAction,
}: {
  locale: Locale;
  formAction?: string;
}) {
  return (
    <>
      {/* Hero, video and the buy/sell/rent panels are one scroll sequence. */}
      <ParallaxHero locale={locale} />
      <About locale={locale} />
      <Services locale={locale} />
      <Valuations locale={locale} />
      <Process locale={locale} />
      <Figures />
      <Insights locale={locale} />
      <Contact locale={locale} action={formAction} />
      <Reviews />
      <Partners />
      <Faqs locale={locale} items={FAQS} />
    </>
  );
}
