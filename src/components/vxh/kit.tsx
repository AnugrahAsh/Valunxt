/**
 * VALUNXT — the "vxh" design kit.
 *
 * Port of includes/vxh-kit.php. Shared by the UAE home, the UAE services index,
 * the 36 UAE service pages and the redesigned About and Industries pages so
 * every glyph, sparkline, abstract band layer and product-style visual on those
 * pages is drawn from one place.
 *
 * Styles live in public/assets/css/vxn-home-ae.css (tokens, buttons, cards, the
 * abstract layer) and public/assets/css/vxn-services-ae.css (the services-only
 * components); behaviour in public/assets/js/vxn-home-ae.js and
 * public/assets/js/vxn-services-ae.js.
 *
 * The PHP helpers returned strings of markup. Here they are components, so the
 * one place that needed to patch a class onto the returned SVG
 * (`str_replace('<svg', '<svg class="arr"', …)` on the "Ready" rows) passes a
 * className instead.
 */
import type { ReactNode } from 'react';

/** Line icons, 24-box, drawn with currentColor. */
const ICON_PATHS: Record<string, ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  ne: <path d="M7 17L17 7M9 7h8v8" />,
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  shield: (
    <>
      <path d="M12 3l7 2.5v5.2c0 4.3-2.9 7.9-7 9.3-4.1-1.4-7-5-7-9.3V5.5z" />
      <path d="M9 12l2.2 2.2L15.2 9.8" />
    </>
  ),
  scales: (
    <>
      <path d="M12 3v18M5 21h14M3 9l4-5 4 5M13 9l4-5 4 5" />
      <path d="M3 9a4 4 0 0 0 8 0M13 9a4 4 0 0 0 8 0" />
    </>
  ),
  ledger: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18M5 21V5l7-2 7 2v16" />
      <path d="M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="14" r="4" />
      <path d="M11 11l9-9M16 6l3 3M13 9l2 2" />
    </>
  ),
  chart: (
    <>
      <path d="M3 20h18" />
      <path d="M6 16v-5M11 16V7M16 16v-9M21 16v-3" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </>
  ),
  calc: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0" />
    </>
  ),
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 14.5a5 5 0 0 1 6 5" />
    </>
  ),
  cal: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
};

/** vxh_ico(). An unknown name falls back to the arrow, as the PHP did. */
export function Ico({
  name,
  size = 20,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      {...(className ? { className } : {})}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name] ?? ICON_PATHS.arrow}
    </svg>
  );
}

/* The sparkline's sample points, and the path they trace. Fixed data — the
   chart illustrates a shape, it does not report a figure. */
const SPARK_POINTS: [number, number][] = [
  [0, 62], [24, 58], [48, 60], [72, 50], [96, 52], [120, 40], [144, 44],
  [168, 30], [192, 34], [216, 22], [240, 26], [264, 14], [288, 18],
];
const SPARK_D = SPARK_POINTS.map((p, i) => `${i ? ' L' : 'M'}${p[0]} ${p[1]}`).join('');
const SPARK_LAST = SPARK_POINTS[SPARK_POINTS.length - 1];

/**
 * vxh_spark(). `id` salts the gradient id so two sparklines on one page do not
 * collide.
 */
export function Spark({ id }: { id: string }) {
  return (
    <svg className="vxh-spark" viewBox="0 0 288 84" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1436D8" stopOpacity=".22" />
          <stop offset="1" stopColor="#1436D8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="a" style={{ fill: `url(#${id})` }} d={`${SPARK_D} L288 84 L0 84 Z`} />
      <path className="l" d={SPARK_D} />
      <circle cx={SPARK_LAST[0]} cy={SPARK_LAST[1]} r="4" />
    </svg>
  );
}

export type AbsVariant = 'stripes' | 'ribbons' | 'helix' | 'waves' | 'arcs' | 'planes' | 'orbs';
export type AbsMod = '' | 'soft' | 'light';

/**
 * vxh_abs() — the abstract layer.
 *
 *   variant  'stripes' is the crisp band stack (CSS only); the rest are layered
 *            SVG art from /assets/img/abs/.
 *   mod      '' | 'soft' (turned down under copy) | 'light' (whisper, for cream)
 *   flip     mirrors the composition so a repeat never looks like a repeat.
 */
export function Abs({
  variant = 'stripes',
  mod = '',
  flip = false,
}: {
  variant?: AbsVariant;
  mod?: AbsMod;
  flip?: boolean;
}) {
  const cls =
    `vxh-abs vxh-abs--${variant}` + (mod ? ` vxh-abs--${mod}` : '') + (flip ? ' vxh-abs--flip' : '');

  if (variant === 'stripes') {
    return (
      <div className={cls} aria-hidden="true">
        <i className="vxh-abs__glow" />
        <i className="vxh-abs__glow vxh-abs__glow--2" />
        <div className="vxh-abs__stack">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <i key={i} className="vxh-abs__band" />
          ))}
        </div>
        {mod !== 'soft' ? (
          <>
            <span className="vxh-abs__plane" />
            <span className="vxh-abs__plane" />
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cls} aria-hidden="true">
      <i className="vxh-abs__l vxh-abs__l--1" />
      <i className="vxh-abs__l vxh-abs__l--2" />
      <i className="vxh-abs__veil" />
    </div>
  );
}

export type VisualKind = 'ledger' | 'gauge' | 'listing' | 'bars' | 'chart' | 'pipe';

const KIND_BY_SLUG: Record<string, VisualKind> = {
  'accounting-and-tax-services': 'ledger',
  'valuation-and-advisory': 'gauge',
  'real-estate-transactions': 'listing',
  'mortgage-services': 'bars',
  'research-and-intelligence': 'chart',
  'technology-data-and-ai': 'pipe',
};

/**
 * vxh_kind() — the visual "kind" for a practice slug, i.e. which mini product UI
 * stands in for it wherever that practice is illustrated. Sub-services inherit
 * their practice's kind, which is why only the first path segment is read.
 */
export function vxhKind(slug: string): VisualKind {
  let first = String(slug ?? '').replace(/^\/+|\/+$/g, '').split('/')[0] ?? '';
  if (first.startsWith('services')) first = '';
  return KIND_BY_SLUG[first] ?? 'ledger';
}

/** The three-lender rate comparison, shared by the 'bars' visual and the hero. */
export function Bars({ delays = ['.1s', '.25s', '.4s'] }: { delays?: [string, string, string] | string[] }) {
  return (
    <div className="vxh-bars">
      <div className="vxh-bar is-best">
        <span className="vxh-bar__k">Lender A</span>
        <span className="vxh-bar__t">
          <span className="vxh-bar__f" style={{ '--w': '58%', '--d': delays[0] } as React.CSSProperties} />
        </span>
        <span className="vxh-bar__v">3.99%</span>
      </div>
      <div className="vxh-bar">
        <span className="vxh-bar__k">Lender B</span>
        <span className="vxh-bar__t">
          <span className="vxh-bar__f" style={{ '--w': '70%', '--d': delays[1] } as React.CSSProperties} />
        </span>
        <span className="vxh-bar__v">4.24%</span>
      </div>
      <div className="vxh-bar">
        <span className="vxh-bar__k">Lender C</span>
        <span className="vxh-bar__t">
          <span className="vxh-bar__f" style={{ '--w': '82%', '--d': delays[2] } as React.CSSProperties} />
        </span>
        <span className="vxh-bar__v">4.49%</span>
      </div>
    </div>
  );
}

/**
 * vxh_visual() — a product-style mini UI. Every one plays once when its
 * container gains `.is-in` (the home bento observer, or the services observer).
 * `id` salts the SVG gradient ids so two on one page do not collide.
 */
export function Visual({ kind, id = 'v' }: { kind: VisualKind | string; id?: string }) {
  const check = <Ico name="check" size={12} />;

  switch (kind) {
    case 'gauge':
      return (
        <svg className="vxh-gauge" viewBox="0 0 200 120" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`vxhGauge${id}`} x1="0" x2="1">
              <stop offset="0" stopColor="#1436D8" />
              <stop offset="1" stopColor="#2F63FF" />
            </linearGradient>
          </defs>
          <path className="track" d="M20 100 A80 80 0 0 1 180 100" />
          <path className="fill" style={{ stroke: `url(#vxhGauge${id})` }} d="M20 100 A80 80 0 0 1 180 100" />
          <text className="n" x="100" y="92" textAnchor="middle">RICS</text>
          <text className="l" x="100" y="110" textAnchor="middle">RED BOOK STANDARD</text>
        </svg>
      );

    case 'bars':
      return (
        <>
          <Bars />
          <div className="vxh-meter">
            <span>Resident &middot; non-resident &middot; corporate</span>
            <strong>Whole of market</strong>
          </div>
        </>
      );

    case 'chart':
      return (
        <>
          <div className="vxh-chart">
            {[38, 52, 46, 64, 58, 74, 68, 88, 80, 96].map((h, i) => (
              <span key={i} data-i={i} style={{ '--h': `${h}%` } as React.CSSProperties} />
            ))}
          </div>
          <div className="vxh-meter">
            <span>Demand &middot; supply &middot; pricing</span>
            <strong>Verified evidence</strong>
          </div>
        </>
      );

    case 'pipe':
      return (
        <>
          <div className="vxh-pipe">
            <div className="vxh-pipe__node">
              Market data<small>verified sources</small>
            </div>
            <span className="vxh-pipe__link" />
            <div className="vxh-pipe__node">
              Model<small>method documented</small>
            </div>
            <span className="vxh-pipe__link" />
            <div className="vxh-pipe__node">
              Dashboard<small>decision-ready</small>
            </div>
          </div>
          <div className="vxh-code">
            <span className="ln" data-i="0">
              <span className="c">&rsaquo;</span> ingest transactions &middot; 3 sources <span className="g">&#10003;</span>
            </span>
            <span className="ln" data-i="1">
              <span className="c">&rsaquo;</span> run valuation model &middot; comparables <span className="g">&#10003;</span>
            </span>
            <span className="ln" data-i="2">
              <span className="c">&rsaquo;</span> publish dashboard &middot; partner signed <span className="g">&#10003;</span>
            </span>
          </div>
        </>
      );

    case 'listing':
      return (
        <div className="vxh-ledger">
          <div className="vxh-ledger__row" data-i="0">
            <span className="vxh-ledger__k">Offer <small>Priced on comparable evidence</small></span>
            <span className="vxh-ledger__v">Submitted</span>
            <span className="vxh-ledger__ok">{check}</span>
          </div>
          <div className="vxh-ledger__row" data-i="1">
            <span className="vxh-ledger__k">Due diligence <small>Title, service charges, developer</small></span>
            <span className="vxh-ledger__v">Cleared</span>
            <span className="vxh-ledger__ok">{check}</span>
          </div>
          <div className="vxh-ledger__row" data-i="2">
            <span className="vxh-ledger__k">MOU &amp; deposit <small>Terms negotiated on your side</small></span>
            <span className="vxh-ledger__v">Signed</span>
            <span className="vxh-ledger__ok">{check}</span>
          </div>
          <div className="vxh-ledger__row" data-i="3">
            <span className="vxh-ledger__k">Transfer <small>Registered, keys handed over</small></span>
            <span className="vxh-ledger__v">Complete</span>
            <span className="vxh-ledger__ok">{check}</span>
          </div>
          <div className="vxh-ledger__tot">
            <span>Illustrative transaction</span>
            <strong>No commission taken</strong>
          </div>
        </div>
      );

    case 'ledger':
    default:
      return (
        <div className="vxh-ledger">
          <div className="vxh-ledger__row" data-i="0">
            <span className="vxh-ledger__k">Bank feed <small>Reconciled to the ledger</small></span>
            <span className="vxh-ledger__v">1,284 lines</span>
            <span className="vxh-ledger__ok">{check}</span>
          </div>
          <div className="vxh-ledger__row" data-i="1">
            <span className="vxh-ledger__k">VAT return &middot; Q3 <small>Input and output tax agreed</small></span>
            <span className="vxh-ledger__v">Filed</span>
            <span className="vxh-ledger__ok">{check}</span>
          </div>
          <div className="vxh-ledger__row" data-i="2">
            <span className="vxh-ledger__k">Management accounts <small>Month 9, to standard</small></span>
            <span className="vxh-ledger__v">Issued</span>
            <span className="vxh-ledger__ok">{check}</span>
          </div>
          <div className="vxh-ledger__row" data-i="3">
            <span className="vxh-ledger__k">Corporate tax <small>Impact assessment on file</small></span>
            <span className="vxh-ledger__v">Tracked</span>
            <span className="vxh-ledger__ok">{check}</span>
          </div>
          <div className="vxh-ledger__tot">
            <span>Illustrative month-end</span>
            <strong>Nothing outstanding</strong>
          </div>
        </div>
      );
  }
}
