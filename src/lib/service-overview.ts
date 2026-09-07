/**
 * A practice, flattened into everything the "expand" modal on the services
 * bento needs — and nothing else.
 *
 * The three UAE registries are large (the long-form copy alone is 70KB), and the
 * modal is a client component. Rather than pull those modules into the browser
 * bundle, the server assembles this per practice and hands it over as props: six
 * of these is a few kilobytes of RSC payload.
 *
 * Everything here is plain data, so it serialises across the boundary.
 */
import { plainText } from './html-text';
import { UAE_SERVICES, uaeServicePath, type UaeService } from '@/data/uae-services';
import { uaeServiceDetail } from '@/data/uae-service-detail';
import { uaeServiceDeliverables, uaeServiceExtras } from '@/data/uae-service-extras';

export interface ServiceOverview {
  slug: string;
  /** Unprefixed; the view resolves it for the market being read. */
  href: string;
  /** May carry HTML entities — render through <Html>. */
  title: string;
  short: string;
  lede: string;
  /** Kit icon token. */
  icon: string;
  /** The checklist beside the heading — the expertise labels. */
  points: string[];
  what: { title: string; p: string[] } | null;
  /** The sub-services, as cards. */
  includes: { title: string; lede: string; href: string }[];
  process: { title: string; text: string; steps: string[][] } | null;
  deliverables: { t: string; d: string; i: string }[];
  /** "Who this is for" chips. */
  audience: string[];
}

/**
 * The expertise paragraph is written as "Label: sentence. Label: sentence."
 * Split it where that shape holds.
 *
 * Shared with the service detail template, which renders the same split as
 * tiles — one implementation so the two can never disagree about where a
 * sentence breaks.
 */
export function expertiseTiles(expertise: string): { t: string; d: string }[] {
  const tiles: { t: string; d: string }[] = [];
  for (const raw of plainText(expertise).split(/(?<=[.!?])\s+(?=[A-Z])/)) {
    const sentence = raw.trim();
    if (sentence === '') continue;
    const m = /^([A-Z][^:]{2,42}):\s*([\s\S]+)$/.exec(sentence);
    if (m) {
      tiles.push({ t: m[1], d: m[2] });
    } else if (tiles.length) {
      tiles[tiles.length - 1].d += ` ${sentence}`;
    } else {
      tiles.push({ t: '', d: sentence });
    }
  }
  return tiles;
}

/** The overview for one practice, or null when the slug is unknown. */
export function serviceOverview(slug: string): ServiceOverview | null {
  const service: UaeService | undefined = UAE_SERVICES[slug];
  if (!service) return null;

  const detail = uaeServiceDetail(slug);
  const extras = uaeServiceExtras(slug) ?? {};

  return {
    slug,
    href: uaeServicePath(slug),
    title: service.title,
    short: service.short,
    lede: service.lede,
    icon: 'doc',
    /* The expertise labels read as the benefit lines this list wants — they are
       already written as "Penalties avoided", "Truly independent", "Bank-ready
       packs". Four is what the layout holds. */
    points: detail ? expertiseTiles(detail.expertise).map((t) => t.t).filter(Boolean).slice(0, 4) : [],
    what: detail ? detail.what : null,
    includes: Object.entries(service.children).map(([childSlug, child]) => ({
      title: child.title,
      lede: child.lede,
      href: uaeServicePath(slug, childSlug),
    })),
    process: detail ? detail.process : null,
    deliverables: uaeServiceDeliverables(slug),
    audience: extras.audience ?? [],
  };
}

/** Every practice's overview, keyed by the href the services registry uses. */
export function serviceOverviewsByHref(): Record<string, ServiceOverview> {
  const out: Record<string, ServiceOverview> = {};
  for (const slug of Object.keys(UAE_SERVICES)) {
    const o = serviceOverview(slug);
    if (o) out[o.href] = o;
  }
  return out;
}
