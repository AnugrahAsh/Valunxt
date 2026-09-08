/**
 * The pillar page's scenes.
 *
 * THE SYSTEM. Every export below is one SCENE: exactly one screen tall, edge to
 * edge, and it does not overflow. See the head of valunxt-re-panels.css for the
 * five rules; the two that shape this file are:
 *
 *   • A scene names itself with a KICKER at the top left — very large, light,
 *     uppercase — and puts its one action at the top right or the bottom left.
 *     Nothing is centred except Ways and Sell, which are centred on purpose.
 *   • Anything that will not fit down the screen goes across it, on a rail.
 *     Communities and reviews are rails; so are the properties.
 *
 * WHAT THIS REPLACED. A stack of rounded white panels, each sized by its own
 * content and each held inside a gutter. It read as a list of cards, and no
 * photograph on the page ever reached the edge of the screen — which is the one
 * thing a property page cannot afford, because the picture is the product.
 *
 * The layouts are the client's three references, in this brand's colours: the
 * "OUR EXPERTISE" split for Services, the "THE JOURNAL" split for off-plan, the
 * photograph-band-then-statement for Selling, the offset gallery for
 * Communities, and the tall-portrait split for About.
 *
 * The content did not change. Every word and figure below is the same record in
 * ../../data it was before.
 */
'use client';

import { useState } from 'react';

import { rurl } from '@/lib/region';

import {
  ABOUT,
  CONTACT,
  FAQ_HEAD,
  FIGURES,
  REVIEWS,
  REVIEWS_HEAD,
  SERVICES,
  SERVICES_HEAD,
  VALUATIONS,
} from '../../data/home';
import { COMMUNITIES, OFFPLAN_NOTE, OFFPLAN_PROJECTS } from '../../data/property';
import { PARTNERS, PARTNERS_TITLE } from '../../data/site';
import type { Locale } from '../../lib/types';
import { ArrowRight, ArrowUpRight, Stars } from '../icons';
import { Arrows, useRail } from '../rail';

/* ========================================================================== */
/* The system's own small parts                                               */

/** The outlined pill that labels a scene that also carries a kicker. */
export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="vxr-chip">{children}</span>;
}

/** The navy rectangle. The references put a black one at the corner of every
    scene; ours is the brand navy, which is the same gesture in this palette. */
function Btn({ href, children, tone }: { href: string; children: React.ReactNode; tone?: 'light' }) {
  return (
    <a className={`vxr-btn${tone === 'light' ? ' vxr-btn--light' : ''}`} href={href}>
      {children}
      <ArrowRight />
    </a>
  );
}

/* ========================================================================== */
/* About — the split: the argument at the left, one tall photograph at the right */

export function About({ region }: { region: Locale }) {
  return (
    <section className="vxr-scene vxr-about" id="about" aria-labelledby="vxr-about-h" data-par>
      <div className="vxr-scene__body">
        {/* Two rows: the argument centres itself in the first, the figures sit
            on the floor of the column. The reference carries a heading and a
            paragraph and nothing else, so everything that is not those two is
            pushed to the bottom edge and separated by a great deal of space. */}
        <div className="vxr-about__say">
          <div className="vxr-about__lead">
            <span className="vxr-tag">About Us</span>

            {/* The statement, with the turn of it in the accent. One emphasis. */}
            <h2 className="vxr-line" id="vxr-about-h">
              Some people buy a property in Dubai. <em>Others buy the morning they get to wake up in.</em>
            </h2>

            <p className="vxr-copy">{ABOUT.body}</p>

            <div className="vxr-about__act">
              <Btn href={rurl(region, '/real-estate/#services')}>{ABOUT.cta}</Btn>
            </div>
          </div>

          {/* The evidence under the claim. */}
          <div className="vxr-figs">
            {FIGURES.map((f) => (
              <div key={f.label}>
                <p className="vxr-fig__v">{f.value}</p>
                <p className="vxr-fig__k">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* A Dubai interior, not a meeting room. The statement beside this
            photograph is about the morning you wake up in; the stock shot of two
            people at a laptop that used to be here argued the opposite. Cropped
            to portrait from the library's own interior at native resolution —
            see img/about/morning.webp. */}
        <figure className="vxr-about__shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="vxr-par"
            src="/real-estate/img/about/morning.webp"
            srcSet="/real-estate/img/about/morning-sm.webp 620w, /real-estate/img/about/morning.webp 863w"
            sizes="(max-width: 1000px) 100vw, 46vw"
            alt="A living room in a Dubai tower, looking out over the city"
            width={863}
            height={1150}
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Living — the lifestyle gallery, on the client's carousel reference         */

/**
 * Frames of different shapes at different heights, running off the right edge of
 * the screen. Not a filmstrip: the wide frame holds the middle at full height
 * and everything around it is shorter, narrower and offset, which is what makes
 * it read as a composition rather than as a row of thumbnails.
 *
 * It drifts against the page as it passes — `--drift` is written by the scroll
 * layer onto the track, and the arrows page the rail's own `scrollLeft`, so a
 * transform and a scroll offset compose instead of fighting each other.
 *
 * ON THE PHOTOGRAPHS. The reference sells the life: people at tables under
 * lights, a promenade at dusk, a café street. This library has architecture —
 * good architecture, shot well, but nobody is living in any of it. These are the
 * six frames in it that come closest, cropped to the shapes the arrangement
 * needs. Real lifestyle photography would change this section more than any
 * amount of layout will; see the note in README.md.
 */
/* `cap` survives as the alt text — the frames carry no visible label, but a
   photograph still has to describe itself to a screen reader. The shapes are not
   here any more: the staircase is nth-child in the stylesheet, so the rhythm
   holds however many frames this list grows to. */
const LIVING: { key: string; cap: string }[] = [
  { key: 'pool', cap: 'A pool between villas in a Dubai community' },
  { key: 'water', cap: 'Villas and water on Palm Jumeirah' },
  { key: 'dusk', cap: 'Dubai towers at gold hour' },
  { key: 'villa', cap: 'A white villa behind palms' },
  { key: 'inside', cap: 'A living room above the city' },
  { key: 'marina', cap: 'Towers over the water at the Marina' },
];

export function Living({ region }: { region: Locale }) {
  const rail = useRail();

  return (
    <section className="vxr-scene vxr-living" aria-labelledby="vxr-living-h">
      {/* Kicker only. The eyebrow above it was a second line of chrome on a
          section whose whole job is to be photographs. */}
      <div className="vxr-scene__head">
        <h2 className="vxr-kicker" id="vxr-living-h">
          What Dubai is actually like
        </h2>
      </div>

      {/* NO `data-lenis-prevent` HERE, and it is worth saying why: it tells Lenis
          to ignore wheel events over the element, which is right for a vertical
          scroller nested in the page and exactly wrong for this one. The rail
          only scrolls sideways, so preventing Lenis meant a vertical wheel over
          the carousel scrolled neither the rail nor the page — the whole page
          froze while the pointer was anywhere over the pictures. */}
      <div className="vxr-living__rail" ref={rail.ref}>
        <div className="vxr-living__track" data-drift>
          {LIVING.map((f) => (
            <a className="vxr-frame" href={rurl(region, '/real-estate/communities/')} key={f.key}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/real-estate/img/living/${f.key}.webp`}
                srcSet={`/real-estate/img/living/${f.key}-sm.webp 560w, /real-estate/img/living/${f.key}.webp 1800w`}
                sizes="(max-width: 1000px) 80vw, 44vw"
                alt={f.cap}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom right, stacked: the arrows on one line and the action under
          them, both clear of the pictures — where the reference puts them, and
          the only place on a row that runs off the screen where a control is not
          standing on top of the thing it moves. */}
      <div className="vxr-living__foot">
        <Arrows rail={rail} label="scenes" />
        <div className="vxr-living__act">
          <a className="vxr-btn" href={rurl(region, '/real-estate/communities/')}>
            Our selection
          </a>
          <a
            className="vxr-living__all"
            href={rurl(region, '/real-estate/#listings')}
            aria-label="See every property"
          >
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Rest — one photograph, one sentence, and a screen of nothing else          */

/**
 * THE POINT OF THIS SECTION IS THE EMPTINESS.
 *
 * Everything around it is working: three ways in, a firm introducing itself,
 * four services, twelve properties, eight communities. This one sells nothing
 * and asks for nothing, and it is the only scene on the page with no link in it
 * at all — deliberately, because a scene the reader can act on is a scene they
 * have to decide about, and the decision is what stops it being a rest.
 *
 * It is the client's reference: a photograph cut off by the top of the screen,
 * a hairline dropped out of it, and one very large sentence centred in the room
 * underneath. Set in Forum, the brand's serif — the only serif on this page.
 * The reference's impact comes from a display face at four times the size of
 * anything near it, and DM Sans at that size reads as a headline rather than as
 * a statement.
 */
export function Rest() {
  return (
    <section className="vxr-scene vxr-rest" aria-labelledby="vxr-rest-h" data-par>
      <figure className="vxr-rest__band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="vxr-par"
          src="/real-estate/img/hero/skyline-wide.webp"
          alt="The Dubai skyline at dusk"
          width={2600}
          height={867}
          loading="lazy"
        />
      </figure>

      <div className="vxr-rest__say">
        <i className="vxr-rest__rule" aria-hidden="true" />
        <h2 className="vxr-rest__h" id="vxr-rest-h">
          Sea, sand and skyline, <em>twenty minutes apart</em>
        </h2>
        <p className="vxr-rest__p">
          Dubai is the rare city where the water, the dunes and the towers are a short drive from
          one another. That closeness is the luxury &mdash; and the address is what decides how much
          of it is yours.
        </p>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Serve — the services, on the "OUR EXPERTISE" reference                     */

export function Serve({ region }: { region: Locale }) {
  /* Which photograph is forward in the column. The list is the navigation, so
     the column has to answer it — a still column beside a live list reads as
     decoration. */
  const [at, setAt] = useState(0);
  const shown = SERVICES[at];

  return (
    <section className="vxr-scene vxr-serve" id="services" aria-labelledby="vxr-serve-h" data-par>
      <div className="vxr-scene__body">
        <div className="vxr-serve__col">
          <h2 className="vxr-kicker" id="vxr-serve-h">
            {SERVICES_HEAD.eyebrow}
          </h2>

          <ul className="vxr-serve__list">
            {SERVICES.map((s, i) => (
              <li key={s.title}>
                <a
                  className="vxr-serve__link"
                  data-on={at === i ? 'true' : 'false'}
                  href={rurl(region, `/real-estate${s.href}`)}
                  onPointerEnter={() => setAt(i)}
                  onFocus={() => setAt(i)}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>

          {/* The drop. The argument sits at the FOOT of the column, a long way
              under the list, and the emptiness between them is the point. */}
          <div className="vxr-serve__gap" aria-hidden="true" />

          <div className="vxr-serve__say">
            {/* One paragraph. There were two, and the second said the first
                again at greater length — which on a scene built out of empty
                space is the only thing that can spoil it. */}
            <p className="vxr-copy">
              <b>In Dubai property, the detail is the whole deal.</b>
              A view that survives the next plot being sold. A service charge that does not move. A
              payment plan that suits the year you actually move in.
            </p>
          </div>

          <div className="vxr-serve__act">
            <Btn href={rurl(region, '/real-estate/#contact')}>Learn more about our services</Btn>
          </div>
        </div>

        {/* The column. Full height, bleeding off the right edge of the screen. */}
        <div className="vxr-serve__stack">
          {SERVICES.map((s, i) => (
            <figure className="vxr-serve__shot" data-on={at === i ? 'true' : 'false'} key={s.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="vxr-par"
                src={s.img}
                /* FeatureCard.img is optional in the type, so the small variant
                   is derived only when there is a file to derive it from. */
                srcSet={s.img ? `${s.img.replace('.webp', '-sm.webp')} 640w, ${s.img} 990w` : undefined}
                sizes="(max-width: 1000px) 100vw, 46vw"
                alt=""
                loading="lazy"
              />
            </figure>
          ))}
          <div className="vxr-serve__cap" aria-hidden="true">
            <b>{shown.title}</b>
            <span>{shown.summary}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Places — communities, on the offset-gallery reference                      */

export function Places({ region }: { region: Locale }) {
  const rail = useRail();

  return (
    <section className="vxr-scene vxr-scene--flush vxr-places" aria-labelledby="vxr-places-h" data-par>
      <div className="vxr-scene__head">
        <div>
          <span className="vxr-tag">Communities</span>
          <h2 className="vxr-kicker" id="vxr-places-h">
            Every one a different life
          </h2>
        </div>
        <Arrows rail={rail} label="communities" />
      </div>

      <div className="vxr-rail vxr-places__rail" ref={rail.ref}>
        {COMMUNITIES.map((c) => (
          <a className="vxr-place" href={rurl(region, `/real-estate${c.href}`)} key={c.name}>
            <span className="vxr-place__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt="" loading="lazy" />
              <span className="vxr-place__body">
                <span className="vxr-place__name">{c.name}</span>
                <span className="vxr-place__stock">{c.stock}</span>
                <span className="vxr-place__blurb">{c.blurb}</span>
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Launches — off-plan, on the "THE JOURNAL" reference                        */

export function Launches({ region }: { region: Locale }) {
  /* Three, not six. The rows share the screen with the photographs, and every
     row past the third is bought out of the space around them. */
  const rows = OFFPLAN_PROJECTS.slice(0, 3);
  const href = rurl(region, '/real-estate/off-plan-properties/');

  return (
    <section className="vxr-scene vxr-launch" aria-labelledby="vxr-launch-h" data-par>
      <div className="vxr-scene__head">
        <div>
          <span className="vxr-tag">Off-Plan</span>
          <h2 className="vxr-kicker" id="vxr-launch-h">
            Buy it before anybody has lived in it
          </h2>
        </div>
        <a className="vxr-btn" href={href}>
          All launches <i>({OFFPLAN_PROJECTS.length})</i>
          <ArrowRight />
        </a>
      </div>

      <div className="vxr-scene__body">
        {/* The two pictures are the first two rows' own projects, so the images
            and the list are never describing different buildings. */}
        <div className="vxr-launch__pics">
          {rows.slice(0, 2).map((p, i) => (
            <a className={`vxr-launch__pic vxr-launch__pic--${i ? 'b' : 'a'}`} href={href} key={p.name} aria-hidden="true" tabIndex={-1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="vxr-par" src={p.img} alt="" loading="lazy" />
            </a>
          ))}
        </div>

        <div className="vxr-launch__rows">
          {rows.map((p) => (
            <a className="vxr-launch__row" href={href} key={p.name}>
              <span>
                <span className="vxr-launch__k">
                  {p.developer} &middot; {p.location}
                </span>
                <span className="vxr-launch__n">{p.name}</span>
              </span>
              <span className="vxr-launch__go">
                {p.priceFrom}
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Developer announcements about unbuilt buildings. This note is load
          bearing — see data/property.ts — and must not be removed. */}
      <div className="vxr-scene__foot">
        <p className="vxr-props__note">{OFFPLAN_NOTE}</p>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Sell — a band of photograph, then the statement                            */

export function Sell({ region }: { region: Locale }) {
  return (
    <section className="vxr-scene vxr-sell" id="sell" aria-labelledby="vxr-sell-h">
      <div className="vxr-scene__body">
        <div className="vxr-sell__say">
          <span className="vxr-tag">Selling &amp; Letting</span>
          <h2 className="vxr-line" id="vxr-sell-h">
            Ready for <em>the next address?</em>
          </h2>
          <p className="vxr-copy">{VALUATIONS.body}</p>
          <div className="vxr-sell__act">
            <Btn href={rurl(region, '/real-estate/#contact')}>Request a valuation</Btn>
          </div>
        </div>

        <ul className="vxr-sell__items">
          {VALUATIONS.items.map((i) => (
            <li key={i.title}>
              <b>{i.title}</b>
              <span>{i.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Says — the reviews on a rail, the developers as the floor of the same screen */

export function Says() {
  const rail = useRail();

  return (
    <section className="vxr-scene vxr-scene--flush vxr-says" aria-labelledby="vxr-says-h">
      <div className="vxr-scene__head">
        <div>
          <span className="vxr-tag">{REVIEWS_HEAD.eyebrow}</span>
          <h2 className="vxr-kicker" id="vxr-says-h">
            {REVIEWS_HEAD.score} out of 5, across 120+ reviews
          </h2>
        </div>
        <Arrows rail={rail} label="reviews" />
      </div>

      <div className="vxr-rail vxr-says__rail" ref={rail.ref}>
        {REVIEWS.map((r) => (
          <figure className="vxr-said" key={r.name}>
            <Stars count={r.rating} />
            <blockquote>{r.body}</blockquote>
            <figcaption>
              <b>{r.name}</b>
              <span>{r.when}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Two things that were each too small to hold a screen, and belong
          together anyway: what clients said, over whose buildings they said it
          about. */}
      <div className="vxr-devs">
        <p className="vxr-devs__t">{PARTNERS_TITLE}</p>
        {/* The set is rendered TWICE and the track slides by exactly half its
            own width, so the loop closes on an identical frame and the seam is
            never somewhere a reader can catch it. The second copy is hidden from
            assistive technology — it is the same ten names said again, and a
            screen reader should hear them once. */}
        <div className="vxr-devs__row">
          <div className="vxr-devs__track">
            {[0, 1].map((pass) =>
              PARTNERS.map((partner) => {
                const key = `${pass}-${partner.name}`;
                return partner.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={partner.logo}
                    alt={pass === 0 ? partner.name : ''}
                    aria-hidden={pass === 1 || undefined}
                    key={key}
                    loading="lazy"
                  />
                ) : (
                  /* A relationship that lapses is reduced to text by deleting
                     one line in the data, not by rebuilding this row. */
                  <span key={key} aria-hidden={pass === 1 || undefined}>
                    {partner.name}
                  </span>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Ask — the enquiry. The form itself stays in ../LeadForm                    */

export function AskHead() {
  return (
    <div className="vxr-ask__say">
      <Chip>{CONTACT.eyebrow}</Chip>
      <h2 className="vxr-line" id="vxr-ask-h">
        Tell us how you want <em>to live here.</em>
      </h2>
      <p className="vxr-copy">{CONTACT.lede}</p>
      {/* Four of the six. A list long enough to fill its column is a list
          nobody reads to the end of, and the four kept are the four that answer
          "why you" rather than "what you do". */}
      <ul className="vxr-ask__why">
        {CONTACT.why.slice(0, 4).map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/* Faq head — the accordion itself stays in ../Accordion                      */

export function FaqHead({ region }: { region: Locale }) {
  return (
    <div className="vxr-faq__say">
      <span className="vxr-tag">{FAQ_HEAD.eyebrow}</span>
      <h2 className="vxr-kicker" id="vxr-faq-h">
        Questions about buying in Dubai
      </h2>
      <p className="vxr-copy">{FAQ_HEAD.lede}</p>
      <div className="vxr-faq__act">
        <Btn href={rurl(region, '/real-estate/#contact')}>{FAQ_HEAD.footCta}</Btn>
      </div>
    </div>
  );
}
