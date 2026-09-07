/**
 * Site-wide interactive layer: a reading-progress bar along the top and the
 * "Talk to a partner" dock that appears once the visitor has scrolled. The dock
 * opens a small menu with the three real routes — free consultation, the
 * market's telephone line, e-mail.
 *
 * Styles: public/assets/css/vxn-mega.css (site-wide). Rendered by PageShell on
 * every page, which is where includes/footer.php required it.
 *
 * Port of includes/partials/vxn-dock.php.
 */
import { rurl, vxnRegionData } from '@/lib/region';
import { vxnEmail } from '@/lib/site-data';
import ClientScript from '@/components/ClientScript';

/** The dock's three glyphs, at the 18px the menu rows use. */
function DockIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/**
 * Progress bar and dock behaviour.
 *
 * Held back until after hydration like every other classic script on this site
 * — it toggles classes on markup React has just rendered, so running it during
 * the parse would leave the two disagreeing. See ClientScript.
 */
const DOCK_SCRIPT = `
(function () {
	var bar = document.querySelector('.vxn-progress'), dock = document.querySelector('[data-vxn-dock]');
	if (!dock) return;
	var btn = dock.querySelector('.vxn-dock__btn'), ticking = false;
	function update() {
		ticking = false;
		var h = document.documentElement, max = h.scrollHeight - h.clientHeight, y = window.pageYOffset || h.scrollTop;
		if (bar) bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
		dock.classList.toggle('is-on', y > 480 && max - y > 120);
	}
	window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
	window.addEventListener('resize', update, { passive: true });
	btn.addEventListener('click', function () { var open = dock.classList.toggle('is-open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); });
	document.addEventListener('click', function (e) { if (!dock.contains(e.target)) { dock.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
	document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dock.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
	update();
})();
`;

export default function VxnDock({ region }: { region: string }) {
  const reg = vxnRegionData(region);
  const email = vxnEmail();

  return (
    <>
      <div className="vxn-progress" aria-hidden="true" />
      <div className="vxn-dock" data-vxn-dock>
        <div className="vxn-dock__menu" id="vxn-dock-menu" role="menu" aria-label="Talk to a partner">
          <a role="menuitem" href={rurl(region, '/free-consultation/')}>
            <DockIcon>
              <circle cx="9" cy="8" r="3.5" />
              <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
              <circle cx="17" cy="9" r="2.5" />
              <path d="M15.5 14.5a5 5 0 0 1 6 5" />
            </DockIcon>
            <span>
              Book a free consultation<small>No obligation &middot; a partner listens first</small>
            </span>
          </a>
          <a role="menuitem" href={`tel:${reg.tel}`}>
            <DockIcon>
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </DockIcon>
            <span>
              Call {reg.phone}
              <small>{reg.hours}</small>
            </span>
          </a>
          <a role="menuitem" href={`mailto:${email}`}>
            <DockIcon>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </DockIcon>
            <span>
              Email {email}
              <small>Reply within one business day</small>
            </span>
          </a>
        </div>
        <button
          className="vxn-dock__btn"
          type="button"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-controls="vxn-dock-menu"
        >
          <span className="vxn-dock__pulse" aria-hidden="true" />
          <span className="vxn-dock__ic">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12z" />
              <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
            </svg>
          </span>
          <span className="t">Talk to a partner</span>
        </button>
      </div>
      <ClientScript id="vxn-dock-js" code={DOCK_SCRIPT} />
    </>
  );
}
