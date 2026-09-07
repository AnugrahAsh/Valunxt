"use client";

/**
 * The portal sections — what turned the page from a brochure into a place that
 * sells property.
 *
 * All six references the client pointed at agree on the shape: search first,
 * property within a scroll, trust and lifestyle around it, the ask and an SEO
 * cloud at the end. These are those sections, in the brand's clothes:
 *
 *   HeroSearch   — the headline over the showreel, ending in the search bar
 *   Categories   — four doors: Buy, Rent, Off-Plan, Commercial
 *   Stats        — the numbers, hairline-separated under the hero
 *   Launches     — the real off-plan projects, priced and dated
 *   WhyDubai     — the lifestyle argument as four photograph cards
 *   ServiceTiles — the five services as image tiles, name only
 *   Sell         — the seller's door, on navy
 *   PopularSearches — the link cloud, every link a real filtered search
 *
 * Numbers follow the two standards set in ../data: figures from FIGURES and
 * VALUATIONS are the ones the site already publishes; the launches are
 * developer-published and carry OFFPLAN_NOTE; the "Why Dubai" cards make
 * general statements and never quote a figure.
 */
import React, { useState, useEffect } from 'react';
import { rurl } from '@/lib/region';

import { SERVICES, VALUATIONS } from '../../data/home';
import { OFFPLAN_NOTE, OFFPLAN_PROJECTS } from '../../data/property';
import type { Locale } from '../../lib/types';
import PopularSearchesClient from '../PopularSearches';
import { ArrowRight, ArrowUpRight, IconPin } from '../icons';

/* ========================================================================== */
/* Hero, ending in the search                                                 */

export function HeroSearch() {
  return (
    <section className="new-re-hero">
      <style>{`
        .new-re-hero {
          background-color: #ffffff;
          padding: 100px 5% 60px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .new-re-hero__title {
          font-family: 'Forum', 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 400;
          color: #000000;
          line-height: 1.1;
          margin: 0 0 60px 0;
          text-transform: uppercase;
          opacity: 0;
          animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          letter-spacing: -0.02em;
        }

        .new-re-hero__title span {
          display: block;
        }

        .new-re-hero__image {
          width: 100%;
          opacity: 0;
          animation: scaleUpFade 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        .new-re-hero__image img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleUpFade {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
      <h1 className="new-re-hero__title">
        <span>LIFESTYLE THAT</span>
        <span>MOVES YOU</span>
      </h1>
      <div className="new-re-hero__image">
        <img src="/real-estate/img/hero img.jpg" alt="Lifestyle that moves you" />
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Categories                                                                 */

export function Categories({ region }: { region: Locale }) {
  const cats = [
    { name: 'BUY', href: '/?kind=buy#listings', img: '/real-estate/img/buy.webp', hoverText: 'Ready homes and investments across the freehold communities.' },
    { name: 'RENT', href: '/?kind=rent#listings', img: '/real-estate/img/communities/jbr.webp', hoverText: 'Furnished and unfurnished, one cheque to twelve.' },
    { name: 'SELL', href: '/#sell', img: '/real-estate/img/sell.webp', hoverText: 'A valuation on the evidence, then a buyer list before the portals.' }
  ];

  return (
    <section className="new-re-experience">
      <style>{`
        .new-re-experience {
          background-color: #ffffff;
          padding: 80px 5% 40px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          width: 100%;
        }

        .new-re-exp-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 80px;
          gap: 40px;
        }

        .new-re-exp-left {
          flex: 0 0 auto;
        }

        .new-re-exp-left h2 {
          font-size: clamp(4rem, 8vw, 6rem);
          font-weight: 500;
          line-height: 1;
          margin: 0;
          color: #000000;
        }

        .new-re-exp-left p {
          font-size: clamp(0.9rem, 1.2vw, 1.1rem);
          font-weight: 500;
          color: #888888;
          margin: 10px 0 0 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .new-re-exp-right {
          flex: 0 1 700px;
          padding-top: 15px;
        }

        .new-re-exp-right p {
          font-size: clamp(0.9rem, 1.1vw, 1.05rem);
          line-height: 1.6;
          color: #333333;
          margin: 0;
        }

        .new-re-cats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
        }
        
        @media (max-width: 768px) {
          .new-re-exp-top {
            flex-direction: column;
          }
          .new-re-cats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .new-re-cat-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }

        .new-re-cat-title {
          font-family: 'Forum', 'Playfair Display', serif;
          font-size: clamp(2.5rem, 4vw, 4rem);
          font-weight: 400;
          margin: 0 0 20px 0;
          color: #000000;
        }

        .new-re-cat-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
        }

        .new-re-cat-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .new-re-cat-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          text-align: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .new-re-cat-overlay p {
          font-size: 1.25rem;
          line-height: 1.5;
          transform: translateY(20px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .new-re-cat-card:hover .new-re-cat-image-wrapper img {
          transform: scale(1.05);
        }

        .new-re-cat-card:hover .new-re-cat-overlay {
          opacity: 1;
        }

        .new-re-cat-card:hover .new-re-cat-overlay p {
          transform: translateY(0);
        }
      `}</style>

      <div className="new-re-exp-top">
        <div className="new-re-exp-left">
          <h2>48+</h2>
          <p>Years of experience</p>
        </div>
        <div className="new-re-exp-right">
          <p>
            As the brokerage arm of the Reliant group, established in 1977 and RICS-accredited, HouzzHunt
            brings over 48 years of property expertise to the UAE market. Our clients benefit from the same
            valuation and research capability that banks and institutions across the region rely on. Every
            recommendation is grounded in verified transaction data — giving you transparent advice, accurate
            pricing and a partner committed well beyond completion.
          </p>
        </div>
      </div>

      <div className="new-re-cats-grid">
        {cats.map((c) => (
          <a key={c.name} href={rurl(region, c.href)} className="new-re-cat-card">
            <h3 className="new-re-cat-title">{c.name}</h3>
            <div className="new-re-cat-image-wrapper">
              <img src={c.img} alt={c.name} loading="lazy" />
              <div className="new-re-cat-overlay">
                <p>{c.hoverText}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Stats                                                                      */

export function Stats() {
  return null;
}

/* ========================================================================== */
/* Off-plan launches                                                          */

export function Launches({ region }: { region: Locale }) {
  return (
    <section className="vxn-re__sec vxn-re__sec--cream" id="off-plan">
      <div className="vxn-re__wrap">
        <div className="vxn-re__head vxn-re__head--left vxn-re-listings__head">
          <div>
            <span className="vxn-re__eyebrow">New launches</span>
            <h2 className="vxn-re__h2">Off-plan, from the developers we sell.</h2>
            <p className="vxn-re__lede">
              Eight current launches, lowest entry price first. Prices, plans and handover as
              published by each developer.
            </p>
          </div>
          <a className="vxn-re__btn vxn-re__btn--line" href={rurl(region, '/real-estate/off-plan-properties/')}>
            All off-plan
            <ArrowUpRight />
          </a>
        </div>

        <div className="vxn-re-launches">
          {OFFPLAN_PROJECTS.map((p) => (
            <article className="vxn-re-launch" key={p.name}>
              <div className="vxn-re-launch__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt="" loading="lazy" />
                <span className="vxn-re-launch__handover">Handover {p.handover}</span>
              </div>
              <div className="vxn-re-launch__body">
                <p className="vxn-re-launch__dev">{p.developer}</p>
                <h3 className="vxn-re-launch__name">{p.name}</h3>
                <p className="vxn-re-launch__loc">
                  <IconPin />
                  {p.location}
                </p>
                <dl className="vxn-re-launch__stats">
                  <div>
                    <dt>Starting from</dt>
                    <dd>{p.priceFrom}</dd>
                  </div>
                  <div>
                    <dt>Payment plan</dt>
                    <dd>{p.plan}</dd>
                  </div>
                  <div>
                    <dt>Handover</dt>
                    <dd>{p.handover}</dd>
                  </div>
                </dl>
                <a className="vxn-re__btn" href="#contact">
                  Enquire now
                  <ArrowRight />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="vxn-re__note">{OFFPLAN_NOTE}</p>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Why Dubai                                                                  */

/**
 * The lifestyle case. General statements only — the tax position and the visa
 * are matters of UAE law and are stated as such; nothing here quotes a yield, a
 * threshold or a return, because those change and a figure on this page becomes
 * a promise. The one number is the visa's term, which is its name.
 */
const WHY = [
  { k: 'Returns', t: 'Yields that work', p: 'Dubai residential property has historically returned stronger gross yields than most of the world’s gateway cities, with no income tax on the rent.', img: '/real-estate/img/communities/dubai-marina.webp' },
  { k: 'Tax', t: 'Own it outright', p: 'Freehold title in your own name, no annual property tax, no capital gains tax and no tax on rental income for individual owners.', img: '/real-estate/img/communities/business-bay.webp' },
  { k: 'Residency', t: 'The ten-year Golden Visa', p: 'Property investment above the qualifying threshold can secure a renewable ten-year residency. We confirm the current terms in writing before you rely on them.', img: '/real-estate/img/communities/palm-jumeirah.webp' },
  { k: 'Lifestyle', t: 'A city built for living', p: 'Beaches, safety, schools, and a hub within eight hours of most of the world’s capitals — a home, not only an asset.', img: '/real-estate/img/communities/jbr.webp' },
];

export function WhyDubai() {
  return (
    <section className="vxn-re__sec" id="why-dubai">
      <div className="vxn-re__wrap">
        <div className="vxn-re__head">
          <span className="vxn-re__eyebrow">Why Dubai</span>
          <h2 className="vxn-re__h2">Buy where the world wants to live.</h2>
          <p className="vxn-re__lede">
            What owning here gives you, in plain terms. The specifics — thresholds, yields, costs —
            we put in writing for your case.
          </p>
        </div>
        <div className="vxn-re-why">
          {WHY.map((w) => (
            <article className="vxn-re-whycard" key={w.t}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.img} alt="" loading="lazy" />
              <div className="vxn-re-whycard__body">
                <span className="vxn-re-whycard__k">{w.k}</span>
                <h3 className="vxn-re-whycard__t">{w.t}</h3>
                <p className="vxn-re-whycard__p">{w.p}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Services as tiles                                                          */

export function ServiceTiles({ region }: { region: Locale }) {
  const tiles = [
    ...SERVICES.map((s) => ({ name: s.title, img: s.img ?? '', href: s.href ?? '/', desc: 'Our dedicated team provides expert guidance and tailored solutions to meet your specific needs in this service area.' })),
    { name: 'Valuations', img: VALUATIONS.img, href: '/valuations-advisory/', desc: 'Backed by the Reliant group\'s valuation and research capability, every recommendation is grounded in verified transaction data.' },
  ];

  // We add some mock descriptions for the services if they don't have them, to make the hover effect meaningful.
  const extendedTiles = tiles.map((t, i) => {
    const descriptions = [
      "HouzzHunt supports clients across the full property lifecycle — from initial market assessment and property search through to negotiation, documentation and handover.",
      "Our investment advisory team helps you identify high-yield opportunities and build a resilient property portfolio in the UAE's dynamic market.",
      "Get access to exclusive off-plan projects with flexible payment plans. We guide you through the developer's track record and project viability.",
      "Comprehensive property management ensuring your asset is maintained to the highest standards while maximizing your rental yields.",
      "Backed by the Reliant group's valuation and research capability, every recommendation is grounded in verified transaction data, giving you clarity at each stage."
    ];
    return { ...t, desc: descriptions[i % descriptions.length] };
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % extendedTiles.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [extendedTiles.length]);

  useEffect(() => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards[activeIndex]) {
        cards[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  }, [activeIndex]);

  const handleNext = () => setActiveIndex((current) => (current + 1) % extendedTiles.length);
  const handlePrev = () => setActiveIndex((current) => (current - 1 + extendedTiles.length) % extendedTiles.length);

  return (
    <section className="new-re-services" id="services">
      <style>{`
        .new-re-services {
          background-color: #147276;
          color: #ffffff;
          padding: 100px 5% 100px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
        }

        .new-re-srv-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 80px;
          gap: 40px;
          min-height: 200px;
        }

        .new-re-srv-left {
          flex: 1 1 auto;
        }

        .new-re-srv-left h2 {
          font-family: 'Forum', 'Playfair Display', serif;
          font-size: clamp(4rem, 8vw, 8rem);
          font-weight: 400;
          line-height: 1;
          margin: 0;
          color: #ffffff;
          text-transform: uppercase;
        }

        .new-re-srv-left h3 {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: clamp(1.2rem, 2vw, 2rem);
          font-weight: 600;
          color: #ffffff;
          margin: 10px 0 0 0;
          transition: opacity 0.3s ease;
        }

        .new-re-srv-right {
          flex: 0 1 500px;
          padding-top: 20px;
        }

        .new-re-srv-right p {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: clamp(0.9rem, 1.1vw, 1.05rem);
          line-height: 1.6;
          color: #e0f2f1;
          margin: 0;
          font-weight: 400;
          transition: opacity 0.3s ease;
        }

        @media (max-width: 768px) {
          .new-re-srv-top {
            flex-direction: column;
            min-height: auto;
          }
        }

        /* Carousel Cards */
        .new-re-srv-carousel {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 40px;
          scroll-snap-type: x mandatory;
          scrollbar-width: none; /* Firefox */
        }
        
        .new-re-srv-carousel::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        .new-re-srv-card {
          flex: 0 0 400px;
          scroll-snap-align: start;
          background: #ffffff;
          border-radius: 0; /* Sharp cards */
          overflow: hidden;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: #000;
          height: 560px;
          transition: transform 0.4s ease, opacity 0.4s ease;
          opacity: 0.6;
          transform: scale(0.95);
        }

        .new-re-srv-card.active, .new-re-srv-card:hover {
          opacity: 1;
          transform: scale(1);
        }

        .new-re-srv-card__image {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .new-re-srv-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .new-re-srv-card.active .new-re-srv-card__image img,
        .new-re-srv-card:hover .new-re-srv-card__image img {
          transform: scale(1.05);
        }

        .new-re-srv-card__content {
          padding: 30px;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: auto;
          min-height: 220px;
        }

        .new-re-srv-card__content h4 {
          font-family: 'Forum', 'Playfair Display', serif;
          font-size: 2rem;
          margin: 0 0 15px;
        }
        
        .new-re-srv-card__content p {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #555;
          margin: 0 0 25px 0;
          flex: 1;
        }

        .new-re-srv-card__content span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.85rem;
          color: #147276;
        }
        
        .new-re-srv-controls {
          display: flex;
          gap: 15px;
          align-items: center;
          margin-top: 30px;
        }
        
        .new-re-srv-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s, border-color 0.3s, color 0.3s;
        }

        .new-re-srv-btn:hover {
          background: #fff;
          color: #147276;
          border-color: #fff;
        }
        
        .new-re-srv-btn svg {
          width: 24px;
          height: 24px;
          fill: currentColor;
        }

        @media (max-width: 768px) {
          .new-re-srv-card {
            flex: 0 0 85vw;
          }
        }
      `}</style>

      <div className="new-re-srv-top">
        <div className="new-re-srv-left">
          <h2>SERVICES</h2>
          <h3 key={extendedTiles[activeIndex].name + '-title'} style={{ animation: 'fadeIn 0.5s ease' }}>
            {extendedTiles[activeIndex].name} Expertise
          </h3>
        </div>
        <div className="new-re-srv-right">
          <p key={extendedTiles[activeIndex].name + '-desc'} style={{ animation: 'fadeIn 0.5s ease' }}>
            {extendedTiles[activeIndex].desc}
          </p>
          <div className="new-re-srv-controls">
            <button className="new-re-srv-btn" onClick={handlePrev} aria-label="Previous Service">
              <span style={{ display: 'flex', transform: 'rotate(180deg)' }}><ArrowRight /></span>
            </button>
            <button className="new-re-srv-btn" onClick={handleNext} aria-label="Next Service">
              <span style={{ display: 'flex' }}><ArrowRight /></span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="new-re-srv-carousel" ref={carouselRef}>
        {extendedTiles.map((t, index) => (
          <a 
            key={t.name} 
            href={rurl(region, t.href)} 
            className={`new-re-srv-card ${index === activeIndex ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div className="new-re-srv-card__image">
              <img src={t.img} alt={t.name} loading="lazy" />
            </div>
            <div className="new-re-srv-card__content">
              <h4>{t.name}</h4>
              <p>{t.desc}</p>
              <span>Explore <ArrowUpRight /></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Sell                                                                       */

export function Sell({ region }: { region: Locale }) {
  return (
    <section className="vxn-re__sec" id="sell">
      <div className="vxn-re__wrap">
        <div className="vxn-re-sell">
          <div className="vxn-re-sell__copy">
            <span className="vxn-re__eyebrow vxn-re__eyebrow--inv">Selling or letting?</span>
            <h2 className="vxn-re__h2 vxn-re__h2--inv">Know what your property is worth.</h2>
            <p className="vxn-re__lede vxn-re__lede--inv">
              An evidence-based valuation before you list, then a plan to sell or let at that price.
            </p>
            <ul className="vxn-re-sell__points">
              <li>Valuation on the evidence, with the comparables shown to you</li>
              <li>Marketed to buyers we already know before it is listed</li>
              <li>Tenancy, Ejari and handover managed end to end</li>
            </ul>
            <div className="vxn-re-sell__ctas">
              <a className="vxn-re__btn vxn-re__btn--solid" href="#contact">
                Book a valuation
                <ArrowRight />
              </a>
              <a className="vxn-re__btn vxn-re__btn--ghost" href={rurl(region, '/real-estate/sell-rent-lease-property/')}>
                How selling works
              </a>
            </div>
            <p className="vxn-re-sell__stat">
              <b>{VALUATIONS.stat.value}</b>
              {VALUATIONS.stat.label}
            </p>
          </div>
          <figure className="vxn-re-sell__figure" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/real-estate/img/sell.webp" alt="" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* Popular searches                                                           */

export function PopularSearches({ region }: { region: Locale }) {
  return (
    <section className="vxn-re__sec vxn-re__sec--tight vxn-re__sec--cream" id="popular">
      <div className="vxn-re__wrap">
        <div className="vxn-re__head vxn-re__head--left" style={{ marginBottom: 30 }}>
          <span className="vxn-re__eyebrow">Popular searches</span>
          <h2 className="vxn-re__h2" style={{ fontSize: 'clamp(24px,2.4vw,32px)' }}>
            Explore Dubai property by area.
          </h2>
        </div>
        <PopularSearchesClient region={region} />
      </div>
    </section>
  );
}
