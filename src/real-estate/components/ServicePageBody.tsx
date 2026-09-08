/**
 * The template behind every page under /real-estate/ except the pillar.
 *
 * They are the same page with different content, so they are one component
 * driven by a `ServicePage` record from data/pages.ts. Another page costs a data
 * entry and a slug in SERVICE_SLUGS — no new component, no new CSS, no new route.
 *
 * REBUILT ON THE SCENE SYSTEM, 2026-09-08. It used to render the older
 * `.vxn-re__sec` language: a short hero, a highlights strip, a cream band, a navy
 * process panel. That was the honest answer at the time and it became the wrong
 * one the moment the pillar page was rebuilt — a visitor moving from the home
 * page to any of these eleven pages crossed a seam between two different designs,
 * which is most of what "it looks like a mix" meant.
 *
 * It is the same system as the home page now, and deliberately the same
 * ARRANGEMENTS too, so the two read as one site:
 *
 *   masthead → the statement (Rest) → what's included, on the services split →
 *   the process, on the journal rows → communities → FAQ → the ask → popular
 *
 * The masthead is NOT pinned. Only the pillar page pins its hero; a service page
 * should get to the substance, and a screen that has to be scrolled past twice
 * before it moves is a screen that is in the way.
 */
import { rurl } from '@/lib/region';

import type { Locale, ServicePage } from '../lib/types';
import Accordion from './Accordion';
import ListingsGrid from './ListingsGrid';
import LeadForm from './LeadForm';
import PopularSearchesClient from './PopularSearches';
import { ArrowRight, ArrowUpRight } from './icons';
import { AskHead, Places } from './sections/panels';

export default function ServicePageBody({
  region,
  page,
  formAction,
}: {
  region: Locale;
  page: ServicePage;
  formAction?: string;
}) {
  return (
    <>
      {/* The masthead: the page's own photograph floor to ceiling, its name over
          the empty quarter at the top left. The pillar page's frame, without the
          pin and without the corner card. */}
      <section className="vxr-mast vxr-mast--page" aria-label={page.eyebrow} data-par>
        <div className="vxr-mast__in">
          <figure className="vxr-mast__shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vxr-par" src={page.heroImg} alt="" fetchPriority="high" />
            <i className="vxr-mast__wash" aria-hidden="true" />

            <div className="vxr-mast__copy">
              <span className="vxr-mast__kick">{page.eyebrow}</span>
              <h1 className="vxr-mast__h">
                {page.title}
                <br />
                {page.titleAccent}
              </h1>
              <p className="vxr-mast__lede">{page.lede}</p>
            </div>
          </figure>
        </div>
      </section>

      <div className="vxr-flow">
        {/* The statement, and the three figures under it as evidence. Same scene
            as the home page's rest — one line, a great deal of space, and the
            only thing on the screen. */}
        <section className="vxr-scene vxr-rest vxr-rest--plain" aria-labelledby="vxr-p-say">
          <div className="vxr-rest__say">
            <i className="vxr-rest__rule" aria-hidden="true" />
            <h2 className="vxr-rest__h" id="vxr-p-say">
              {page.offerTitle}
            </h2>
            <p className="vxr-rest__p">{page.offerLede}</p>

            {page.highlights.length > 0 && (
              <div className="vxr-figs vxr-figs--mid">
                {page.highlights.map((h) => (
                  <div key={h.label}>
                    <p className="vxr-fig__v">{h.value}</p>
                    <p className="vxr-fig__k">{h.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* What's included, on the services arrangement: the names listed small
            at the left, the argument at the foot of the column, one photograph
            holding the right half floor to ceiling. */}
        {page.offer.length > 0 && (
          <section className="vxr-scene vxr-serve" id="included" aria-labelledby="vxr-p-inc" data-par>
            <div className="vxr-scene__body">
              <div className="vxr-serve__col">
                <h2 className="vxr-kicker" id="vxr-p-inc">
                  What is included
                </h2>

                <ul className="vxr-serve__list">
                  {page.offer.map((o) => (
                    <li key={o.title}>
                      <span className="vxr-serve__link" data-on="true">
                        {o.title}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="vxr-serve__gap" aria-hidden="true" />

                <div className="vxr-serve__say">
                  <p className="vxr-copy">
                    <b>{page.offer[0].title}</b>
                    {page.offer[0].summary}
                  </p>
                </div>

                <div className="vxr-serve__act">
                  <a className="vxr-btn" href={rurl(region, '/real-estate/#contact')}>
                    {page.ctaTitle}
                    <ArrowRight />
                  </a>
                </div>
              </div>

              <div className="vxr-serve__stack">
                <figure className="vxr-serve__shot" data-on="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="vxr-par" src={page.offer[0].img || page.heroImg} alt="" loading="lazy" />
                </figure>
                <div className="vxr-serve__cap" aria-hidden="true">
                  <b>{page.offer[0].title}</b>
                  <span>{page.offer[0].summary}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* The process, on the journal rows: numbered, hairline-ruled, with the
            step's own name at the right. */}
        {page.steps.length > 0 && (
          <section className="vxr-scene vxr-launch vxr-launch--steps" id="process" aria-labelledby="vxr-p-steps">
            <div className="vxr-scene__head">
              <div>
                <span className="vxr-tag">How it works</span>
                <h2 className="vxr-kicker" id="vxr-p-steps">
                  {page.stepsTitle}
                </h2>
              </div>
            </div>

            <div className="vxr-scene__body">
              <div className="vxr-launch__rows vxr-launch__rows--full">
                {page.steps.map((s) => (
                  <div className="vxr-launch__row" key={s.number}>
                    <span>
                      <span className="vxr-launch__k">Step {s.number}</span>
                      <span className="vxr-launch__n">{s.title}</span>
                    </span>
                    <span className="vxr-copy vxr-step__body">{s.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The stock itself, searchable, on the three pages that browse it.
            A visitor who landed on /rent-property/ from search should be able to
            filter rentals there rather than being sent back to the pillar page
            for the one control that does it. */}
        {page.listingKind && <ListingsGrid lockKind={page.listingKind} />}

        {/* Every entry point carries the same proof rather than the front page
            hoarding it — the communities rail is the pillar page's own. */}
        <Places region={region} />

        {page.faqs.length > 0 && (
          <section className="vxr-scene vxr-faq" aria-labelledby="vxr-p-faq">
            <div className="vxr-scene__body">
              <div className="vxr-faq__say">
                <span className="vxr-tag">FAQ</span>
                <h2 className="vxr-kicker" id="vxr-p-faq">
                  Questions about {page.eyebrow.toLowerCase()}
                </h2>
                <p className="vxr-copy">{page.ctaBody}</p>
                <div className="vxr-faq__act">
                  <a className="vxr-btn" href={rurl(region, '/real-estate/#contact')}>
                    Talk to an advisor
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
              <div className="vxr-faq__list">
                <Accordion items={page.faqs.map((f) => ({ title: f.q, body: f.a }))} />
              </div>
            </div>
          </section>
        )}

        <section className="vxr-scene vxr-scene--blue vxr-ask" id="contact" aria-labelledby="vxr-ask-h">
          <div className="vxr-scene__body">
            <AskHead />
            <div className="vxr-ask__form">
              <LeadForm action={formAction} />
            </div>
          </div>
        </section>

        <section className="vxr-scene vxr-cloud" aria-labelledby="vxr-p-cloud">
          <div className="vxr-scene__head">
            <h2 className="vxr-kicker" id="vxr-p-cloud">
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
