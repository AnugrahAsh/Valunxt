'use client';

/**
 * The popular-searches cloud, as a client component so every link is a real
 * filtered search rather than a page reload.
 *
 * Driven, Betterhomes and JamesEdition all close the page with a wall of
 * "Apartments for sale in Dubai Marina" links. Theirs exist to rank. Ours do
 * that too — each carries a real href with the query the search store reads on
 * load — but a click also sets the store directly and scrolls to the grid, so
 * the visitor sees the filtered results without a round trip.
 *
 * Built from the listing set rather than a hand-written list, so a link never
 * points at a community with nothing behind it.
 */
import { rurl } from '@/lib/region';
import { LISTINGS, listingCommunities, type ListingKind, type ListingType } from '../data/listings';
import { setSearch, LISTINGS_ANCHOR, TYPE_OPTIONS } from '../lib/search';
import type { Locale } from '../lib/types';

interface Q {
  kind: ListingKind;
  community?: string;
  type?: ListingType;
}

function href(q: Q): string {
  const p = new URLSearchParams();
  if (q.kind !== 'buy') p.set('kind', q.kind);
  if (q.community) p.set('community', q.community);
  if (q.type) p.set('type', q.type);
  const qs = p.toString();
  return `${qs ? `?${qs}` : ''}#${LISTINGS_ANCHOR}`;
}

function go(q: Q) {
  setSearch({ kind: q.kind, community: q.community ?? '', type: q.type ?? '', beds: '', price: '' });
  const el = document.getElementById(LISTINGS_ANCHOR);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' });
}

const KIND_WORD: Record<ListingKind, string> = { buy: 'for sale', rent: 'to rent', offplan: 'off-plan' };

export default function PopularSearches({ region }: { region: Locale }) {
  const forKind = (kind: ListingKind) => listingCommunities(LISTINGS.filter((l) => l.kind === kind));

  const cols: { title: string; links: { label: string; q?: Q; page?: string }[] }[] = [
    {
      title: 'For sale',
      links: [
        ...forKind('buy').map((c) => ({ label: `Properties for sale in ${c.name}`, q: { kind: 'buy' as const, community: c.slug } })),
        ...TYPE_OPTIONS.filter((t) => t.value !== 'commercial').map((t) => ({ label: `${t.label}s for sale in Dubai`, q: { kind: 'buy' as const, type: t.value } })),
      ],
    },
    {
      title: 'To rent',
      links: [
        ...forKind('rent').map((c) => ({ label: `Properties to rent in ${c.name}`, q: { kind: 'rent' as const, community: c.slug } })),
        { label: 'Apartments to rent in Dubai', q: { kind: 'rent', type: 'apartment' } },
        { label: 'Townhouses to rent in Dubai', q: { kind: 'rent', type: 'townhouse' } },
        { label: 'Offices to rent in Dubai', q: { kind: 'rent', type: 'commercial' } },
      ],
    },
    {
      title: 'Off-plan',
      links: [
        ...forKind('offplan').map((c) => ({ label: `Off-plan in ${c.name}`, q: { kind: 'offplan' as const, community: c.slug } })),
        { label: 'Off-plan apartments in Dubai', q: { kind: 'offplan', type: 'apartment' } },
        { label: 'Off-plan villas in Dubai', q: { kind: 'offplan', type: 'villa' } },
        { label: 'Latest launches and payment plans', page: '/off-plan-properties/' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Buying in Dubai', page: '/buy-property/' },
        { label: 'Selling, renting and leasing', page: '/sell-rent-lease-property/' },
        { label: 'Mortgage services', page: '/mortgage-services/' },
        { label: 'Property valuation', page: '/valuations-advisory/' },
        { label: 'Investment advisory', page: '/investment-advisory/' },
        { label: 'Commercial property', page: '/commercial/' },
      ],
    },
  ];

  return (
    <div className="vxn-re-pop">
      {cols.map((col) => (
        <div className="vxn-re-pop__col" key={col.title}>
          <h4>{col.title}</h4>
          <ul>
            {col.links.map((l) => (
              <li key={l.label}>
                {l.q ? (
                  <a
                    href={href(l.q)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.q!);
                    }}
                  >
                    {l.label}
                  </a>
                ) : (
                  <a href={rurl(region, `/real-estate${l.page}`)}>{l.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
