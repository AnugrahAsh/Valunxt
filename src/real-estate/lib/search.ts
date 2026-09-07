/**
 * The search state shared between the hero search bar and the listings grid.
 *
 * The two sit in different sections of the page, so the state lives here rather
 * than in either of them: a tiny external store both subscribe to with
 * useSyncExternalStore, mirrored into the URL query so a search is shareable and
 * survives a reload — which is how every real property portal behaves, and the
 * reason a visitor trusts the filters at all.
 *
 * There is no listings backend. Filtering runs client-side over the on-page
 * listing set (data/listings.ts) and is honest about that: the results count
 * says how many of the shown listings match, not how many exist in Dubai.
 */
import { useSyncExternalStore } from 'react';
import { LISTINGS, type ListingKind, type ListingType, type PortalListing } from '../data/listings';

export interface SearchState {
  kind: ListingKind;
  /** communitySlug, or '' for any. */
  community: string;
  /** ListingType, or '' for any. */
  type: ListingType | '';
  /** Minimum bedrooms as a string ('', '0', '1', '2', '3', '4'). '' for any. */
  beds: string;
  /** Price band key, or '' for any. Bands differ by kind — see PRICE_BANDS. */
  price: string;
}

export const DEFAULT_SEARCH: SearchState = { kind: 'buy', community: '', type: '', beds: '', price: '' };

/** Price bands per tab. Rentals are annual, so their bands are an order lower. */
export const PRICE_BANDS: Record<ListingKind, { key: string; label: string; min: number; max: number }[]> = {
  buy: [
    { key: 'lt1m', label: 'Under AED 1M', min: 0, max: 1_000_000 },
    { key: '1-3m', label: 'AED 1M – 3M', min: 1_000_000, max: 3_000_000 },
    { key: '3-7m', label: 'AED 3M – 7M', min: 3_000_000, max: 7_000_000 },
    { key: '7-15m', label: 'AED 7M – 15M', min: 7_000_000, max: 15_000_000 },
    { key: '15m+', label: 'AED 15M+', min: 15_000_000, max: Infinity },
  ],
  offplan: [
    { key: 'lt1m', label: 'Under AED 1M', min: 0, max: 1_000_000 },
    { key: '1-3m', label: 'AED 1M – 3M', min: 1_000_000, max: 3_000_000 },
    { key: '3-7m', label: 'AED 3M – 7M', min: 3_000_000, max: 7_000_000 },
    { key: '7m+', label: 'AED 7M+', min: 7_000_000, max: Infinity },
  ],
  rent: [
    { key: 'lt100k', label: 'Under AED 100k / yr', min: 0, max: 100_000 },
    { key: '100-200k', label: 'AED 100k – 200k / yr', min: 100_000, max: 200_000 },
    { key: '200-400k', label: 'AED 200k – 400k / yr', min: 200_000, max: 400_000 },
    { key: '400k+', label: 'AED 400k+ / yr', min: 400_000, max: Infinity },
  ],
};

export const TYPE_OPTIONS: { value: ListingType; label: string }[] = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'commercial', label: 'Commercial' },
];

export const BED_OPTIONS: { value: string; label: string }[] = [
  { value: '0', label: 'Studio' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

/* ---- The store ------------------------------------------------------------ */

let state: SearchState = { ...DEFAULT_SEARCH };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

/** Read the URL once on the client. Server renders the default. */
function fromUrl(): SearchState {
  if (typeof window === 'undefined') return { ...DEFAULT_SEARCH };
  const q = new URLSearchParams(window.location.search);
  const kind = q.get('kind');
  return {
    kind: kind === 'rent' || kind === 'offplan' ? kind : 'buy',
    community: q.get('community') ?? '',
    type: (q.get('type') as ListingType | null) ?? '',
    beds: q.get('beds') ?? '',
    price: q.get('price') ?? '',
  };
}

let hydrated = false;
function ensureHydrated() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  state = fromUrl();
}

function toUrl(s: SearchState) {
  if (typeof window === 'undefined') return;
  const q = new URLSearchParams();
  if (s.kind !== 'buy') q.set('kind', s.kind);
  if (s.community) q.set('community', s.community);
  if (s.type) q.set('type', s.type);
  if (s.beds) q.set('beds', s.beds);
  if (s.price) q.set('price', s.price);
  const qs = q.toString();
  const url = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
  /* replaceState, not pushState: every filter click as a history entry makes
     the back button useless. */
  window.history.replaceState(null, '', url);
}

export function setSearch(patch: Partial<SearchState>) {
  ensureHydrated();
  const next = { ...state, ...patch };
  /* A price band belongs to a tab. Switching tab drops it rather than carrying
     a "AED 7M+" filter onto rentals, where it would match nothing. */
  if (patch.kind && patch.kind !== state.kind) next.price = '';
  state = next;
  toUrl(state);
  emit();
}

export function resetSearch(kind: ListingKind = state.kind) {
  setSearch({ ...DEFAULT_SEARCH, kind });
}

function subscribe(l: () => void) {
  ensureHydrated();
  listeners.add(l);
  return () => listeners.delete(l);
}

const getSnapshot = () => {
  ensureHydrated();
  return state;
};
const getServerSnapshot = () => DEFAULT_SEARCH;

export function useSearch(): SearchState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---- Filtering ------------------------------------------------------------ */

export function filterListings(s: SearchState, items: PortalListing[] = LISTINGS): PortalListing[] {
  const band = s.price ? PRICE_BANDS[s.kind].find((b) => b.key === s.price) : null;
  const minBeds = s.beds === '' ? null : Number(s.beds);
  return items.filter((l) => {
    if (l.kind !== s.kind) return false;
    if (s.community && l.communitySlug !== s.community) return false;
    if (s.type && l.type !== s.type) return false;
    if (minBeds !== null) {
      /* Studio means exactly zero bedrooms; everything else is a minimum. */
      if (minBeds === 0 ? l.bedrooms !== 0 : l.bedrooms < minBeds) return false;
    }
    if (band && !(l.priceAed >= band.min && l.priceAed < band.max)) return false;
    return true;
  });
}

/** The anchor the search bar scrolls to. */
export const LISTINGS_ANCHOR = 'listings';
