/**
 * The pillar page: /{region}/real-estate/ — a property portal.
 *
 * Section order is the whole composition, so it lives in one readable list
 * rather than being spread across nested wrappers. Every section reads its own
 * copy from ../data; this file decides only what appears, in what order, and
 * which layer it is on.
 *
 * THE ORDER IS THE SELLING LOGIC. Six competitor sites — Betterhomes,
 * Springfield, Range, Driven, Allsopp & Allsopp, JamesEdition — were analysed
 * for the rebuild that set it, and they agree: the three intents first, property
 * within a scroll or two, trust and lifestyle around it, the ask and the SEO
 * cloud at the end.
 *
 *   Masthead → Buy/Sell/Rent → the life → the rest → About → Services →
 *   Properties →
 *   Communities → Off-plan → Selling → Reviews + Developers → Ask → FAQ →
 *   Popular searches
 *
 * THE TWO LAYERS, which is the only structural thing in this file:
 *
 *   • `<HeroStage/>` is `position: sticky` and sits on the bottom layer. It
 *     does not scroll away.
 *   • `.vxr-flow` is everything else, on a higher layer with an opaque ground
 *     and a rounded top edge. It travels UP OVER the pinned hero, which is what
 *     makes the page arrive from underneath rather than the hero leave.
 *
 * Nothing intercepts the wheel to do that — see the note in HeroStage.tsx. The
 * wrapper has no `overflow` of any kind, deliberately: `overflow` on an ancestor
 * is what would silently break the sticky hero above it.
 *
 * WHAT CHANGED, 2026-09-08: the layout, entirely. Every section is now one
 * screen tall and edge to edge, on the client's three references — the panels
 * that used to hold each one inside a gutter are gone. See the head of
 * valunxt-re-panels.css for the five rules the scenes obey.
 *
 * The content did not change. Every word, figure, listing and photograph below
 * is the same record in ../data it was before.
 */
import type { Locale } from '../lib/types';
import HeroStage from './HeroStage';
import ListingsGrid from './ListingsGrid';
import Accordion from './Accordion';
import LeadForm from './LeadForm';
import PopularSearchesClient from './PopularSearches';
// import Range from './sections/range';  // parked — see the composition below
import Ways from './sections/ways';
import { FAQS } from '../data/home';
import { About, AskHead, FaqHead, Launches, Living, Places, Rest, Says, Sell, Serve } from './sections/panels';

export default function HomeBody({
  region,
  /** Lead endpoint for the enquiry form; see LeadForm.tsx. */
  formAction,
}: {
  region: Locale;
  formAction?: string;
}) {
  return (
    <>
      <HeroStage region={region} />

      <div className="vxr-flow">
        {/* The three ways in come before anything else: a visitor who already
            knows whether they are buying, selling or renting should not have to
            read the firm's introduction first. */}
        <Ways region={region} />

        {/* The life, in pictures, immediately after the three ways in — a reader
            who has just been asked whether they are buying, selling or renting
            should see what they would be buying into before anything else. */}
        <Living region={region} />

        {/* Then the same argument in one sentence. Nothing to click — the only
            scene on the page that sells nothing, and the reason the ones around
            it read as composed rather than as a brochure. */}
        <Rest />

        <About region={region} />

        {/* Parked, not deleted: sections/range.tsx is the buy and rent bands by
            community, and it is the only place on the page that shows what
            anything costs. Put it back by uncommenting this line and its import.
            It will need a scene wrapper — see any section in sections/panels. */}
        {/* <Range region={region} /> */}

        <Serve region={region} />

        {/* Owns its own scene: the heading needs the live count and the arrows
            need the rail, and both change when the filters do. */}
        <ListingsGrid />

        <Places region={region} />
        <Launches region={region} />
        <Sell region={region} />
        <Says />

        {/* The ask. The form is the one place on the page a field appears, so it
            takes a white card inside the blue scene — and it is the one thing
            here allowed to scroll inside its own box, because a form that is
            cropped is a form that cannot be sent. */}
        <section className="vxr-scene vxr-scene--blue vxr-ask" id="contact" aria-labelledby="vxr-ask-h">
          <div className="vxr-scene__body">
            <AskHead />
            <div className="vxr-ask__form">
              <LeadForm action={formAction} />
            </div>
          </div>
        </section>

        <section className="vxr-scene vxr-faq" aria-labelledby="vxr-faq-h">
          <div className="vxr-scene__body">
            <FaqHead region={region} />
            <div className="vxr-faq__list">
              {/* FAQS is authored as q/a; the accordion takes title/body. */}
              <Accordion items={FAQS.map((f) => ({ title: f.q, body: f.a }))} />
            </div>
          </div>
        </section>

        <section className="vxr-scene vxr-cloud" aria-labelledby="vxr-cloud-h">
          <div className="vxr-scene__head">
            <h2 className="vxr-kicker" id="vxr-cloud-h">
              What people search for
            </h2>
          </div>
          <div className="vxr-scene__body">
            <PopularSearchesClient region={region} />
          </div>
        </section>
      </div>
    </>
  );
}
