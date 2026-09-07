/* ==========================================================================
   VALUNXT Capital — UAE home (/en-ae/) · interactions

   Vanilla, dependency-free, loaded with `defer` from the home template. Each
   block is self-contained and guards on its own root element, so a section
   removed from the template simply switches its behaviour off.

   What lives here and why:
     1. Hero           — headline word reveal, then the blocks under it rise.
     2. Services       — each practice revealed from its own side of the mark.
     3. Marquee        — duplicates its own content so the loop is seamless.
     4. Scroll text    — words light up with scroll progress ("read as you go").
     5. Bento          — pointer spotlight per card; mini UIs play on entry.
     6. Story          — the process deck: cards stack, the covered one dims.
     7. Counters       — tabular count-up when the stats enter view.
     8. Calendar       — the filled months grow in along their rows.
     9. Tabs           — sliding indicator, keyboard-navigable.
    10. Rail           — one expanded value card at a time.
    11. Magnetic CTA   — a few px of pull toward the pointer on primary buttons.

   Motion respects prefers-reduced-motion throughout: states still change,
   travel is dropped.
   ========================================================================== */
(function () {
	'use strict';

	var root = document.querySelector('.vxh');
	if (!root) return;

	var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

	function $(sel, ctx) { return (ctx || document).querySelector(sel); }
	function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
	function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

	/* A small "when it enters view, once" helper shared by several blocks. */
	function onEnter(el, fn, opts) {
		if (!el) return;
		if (!('IntersectionObserver' in window)) { fn(el); return; }
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) {
				if (en.isIntersecting) { fn(en.target); io.unobserve(en.target); }
			});
		}, opts || { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
		io.observe(el);
	}

	/* ----------------------------------------------------------------------
	   1. Hero

	   Two things, both about type arriving: the headline is split into words the
	   stylesheet can mask and raise one after another, and the blocks under it
	   fade up in DOM order. The pointer parallax, the rotating confirmation
	   toast and the ticking figure went with the product cards they moved.
	   ---------------------------------------------------------------------- */
	(function hero() {
		var hero = $('.vxh-hero');
		if (!hero) return;

		/* Headline: split into words the stylesheet can mask. */
		var h1 = $('.vxh-h1', hero);
		if (h1 && !h1.querySelector('.vxh-w')) {
			var i = 0;
			function wrap(node) {
				if (node.nodeType === 3) {
					var frag = document.createDocumentFragment();
					node.nodeValue.split(/(\s+)/).forEach(function (part) {
						if (!part) return;
						if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
						var w = document.createElement('span'); w.className = 'vxh-w';
						var sp = document.createElement('span'); sp.textContent = part; sp.style.setProperty('--i', i++);
						w.appendChild(sp); frag.appendChild(w);
					});
					node.parentNode.replaceChild(frag, node);
				} else if (node.nodeType === 1) {
					Array.prototype.slice.call(node.childNodes).forEach(wrap);
				}
			}
			wrap(h1);
		}

		/* Rise delays for the blocks, in DOM order. */
		$$('[data-vxh-rise]', hero).forEach(function (el, n) { el.style.setProperty('--d', (120 + n * 100) + 'ms'); });

		/* Everything starts once the fonts are ready (or shortly after). */
		var go = function () { hero.classList.add('is-in'); if (h1) h1.classList.add('is-in'); };
		if (document.fonts && document.fonts.ready) document.fonts.ready.then(go, go); else setTimeout(go, 80);
		setTimeout(go, 900); // belt and braces
	})();

	/* ----------------------------------------------------------------------
	   2. Services — each practice revealed from its own side

	   The six run down the page in two columns, so all this does is turn each
	   card on as it arrives — from the left for the left column, from the right
	   for the right, which a shared reveal primitive cannot do because it does
	   not know which side a thing is on.

	   The mark works out its own scroll position; nothing is written here for
	   it, because a value written on a scroll event and read on a frame is a
	   value that is always one frame stale — which is what the rotation's
	   stutter was.
	   ---------------------------------------------------------------------- */
	(function services() {
		var slots = $$('.vxh-svc__slot');
		if (!slots.length) return;
		slots.forEach(function (el) {
			onEnter(el, function () { el.classList.add('is-in'); },
				{ rootMargin: '0px 0px -14% 0px', threshold: 0.2 });
		});
	})();

	/* ----------------------------------------------------------------------
	   3. Marquee
	   ---------------------------------------------------------------------- */
	$$('.vxh-marquee__track').forEach(function (track) {
		if (track.getAttribute('data-dup')) return;
		track.setAttribute('data-dup', '1');
		var items = Array.prototype.slice.call(track.children);
		/* Duplicate until the track is at least twice the viewport, then once
		   more, so translateX(-50%) always lands on an identical frame. */
		var w = track.scrollWidth, vw = window.innerWidth;
		var copies = Math.max(1, Math.ceil((vw * 2) / Math.max(w, 1)));
		for (var c = 0; c < copies; c++) items.forEach(function (it) { var k = it.cloneNode(true); k.setAttribute('aria-hidden', 'true'); track.appendChild(k); });
		var sec = Math.round(track.scrollWidth / 2 / 55);
		track.style.animationDuration = clamp(sec, 24, 90) + 's';
	});

	/* ----------------------------------------------------------------------
	   4. Scroll-lit text
	   ---------------------------------------------------------------------- */
	(function scrollText() {
		var el = $('.vxh-scrolltext');
		if (!el) return;
		if (!el.querySelector('.w')) {
			var html = '';
			Array.prototype.slice.call(el.childNodes).forEach(function (n) {
				if (n.nodeType === 3) {
					html += n.nodeValue.split(/(\s+)/).map(function (p) { return /^\s*$/.test(p) ? p : '<span class="w">' + p + '</span>'; }).join('');
				} else if (n.nodeType === 1) {
					var key = n.tagName === 'EM' || n.tagName === 'STRONG';
					html += n.textContent.split(/(\s+)/).map(function (p) { return /^\s*$/.test(p) ? p : '<span class="w' + (key ? ' is-key' : '') + '">' + p + '</span>'; }).join('');
				}
			});
			el.innerHTML = html;
		}
		var words = $$('.w', el), ticking = false;
		function update() {
			ticking = false;
			var r = el.getBoundingClientRect(), vh = window.innerHeight;
			/* 0 when the block's top is 85% down the viewport, 1 when its
			   bottom reaches 35% — the reading band. */
			var p = clamp((vh * .85 - r.top) / (r.height + vh * .5), 0, 1);
			var lit = Math.round(p * words.length);
			words.forEach(function (w, i) { w.classList.toggle('is-lit', i < lit); });
		}
		function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
		if (REDUCED) { words.forEach(function (w) { w.classList.add('is-lit'); }); return; }
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		update();
	})();

	/* ----------------------------------------------------------------------
	   5. Bento — spotlight and entry
	   ---------------------------------------------------------------------- */
	$$('.vxh-cell').forEach(function (cell) {
		if (FINE) {
			cell.addEventListener('mousemove', function (e) {
				var r = cell.getBoundingClientRect();
				cell.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
				cell.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
			});
		}
		$$('[data-i]', cell).forEach(function (n) { n.style.setProperty('--i', n.getAttribute('data-i')); });
		onEnter(cell, function () { cell.classList.add('is-in'); });
	});

	/* ----------------------------------------------------------------------
	   6. Story — the process deck stacks up as it is read

	   The stacking itself is CSS: every card is `position: sticky`, each one
	   pinned a step lower than the last, so a card climbs over the one before
	   it and leaves a sliver of it showing. Two things are left for script:
	   each card's file plays once when the card is properly in view, and a card
	   being climbed over is pressed back and dimmed, which is what makes the
	   sliver read as depth rather than as a second card asking to be read.
	   ---------------------------------------------------------------------- */
	(function story() {
		var wrap = $('.vxh-story');
		if (!wrap) return;
		var cards = $$('.vxh-pcard', wrap);
		if (!cards.length) return;
		$$('[data-i]', wrap).forEach(function (n) { n.style.setProperty('--i', n.getAttribute('data-i')); });

		cards.forEach(function (card) {
			onEnter(card, function () {
				card.classList.add('is-active');
				/* .vxh-panel.is-active drives the sparkline; the rest of the
				   reveals hang off any .is-active ancestor. */
				var panel = card.querySelector('.vxh-panel');
				if (panel) panel.classList.add('is-active');
			}, { rootMargin: '0px 0px -20% 0px', threshold: 0.2 });
		});

		if (REDUCED) return;

		var ticking = false;
		function update() {
			ticking = false;
			for (var i = 0; i < cards.length; i++) {
				var cover = 0;
				if (i < cards.length - 1) {
					var me = cards[i].getBoundingClientRect();
					var next = cards[i + 1].getBoundingClientRect();
					/* 0 while the next card is still below this one, 1 by the
					   time it has travelled this card's full height over it. */
					cover = clamp((me.bottom - next.top) / (me.height || 1), 0, 1);
				}
				cards[i].style.setProperty('--cover', cover.toFixed(3));
			}
		}
		function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		update();
	})();

	/* ----------------------------------------------------------------------
	   7. Counters
	   ---------------------------------------------------------------------- */
	$$('[data-vxh-count]').forEach(function (el) {
		var target = parseFloat(el.getAttribute('data-vxh-count')) || 0;
		var dec = (String(target).split('.')[1] || '').length;
		onEnter(el, function () {
			if (REDUCED) { el.textContent = target.toFixed(dec); return; }
			var t0 = null, dur = 1400 + Math.min(target, 60) * 12;
			function run(ts) {
				if (!t0) t0 = ts;
				var p = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 4);
				el.textContent = (target * e).toFixed(dec);
				if (p < 1) requestAnimationFrame(run); else el.textContent = target.toFixed(dec);
			}
			requestAnimationFrame(run);
		});
	});

	/* ----------------------------------------------------------------------
	   8. Calendar — the filled months grow in along their rows
	   ---------------------------------------------------------------------- */
	(function calendar() {
		var cal = $('.vxh-cal');
		if (!cal) return;
		/* Each filled cell grows in, left to right along its row. The month the
		   reader is in is picked out on the server, where the date is known
		   before the page is sent. */
		$$('.vxh-cal__c.is-on', cal).forEach(function (el, i) { el.style.setProperty('--i', i); });
		onEnter(cal, function () { cal.classList.add('is-in'); });
	})();

	/* ----------------------------------------------------------------------
	   9. Tabs
	   ---------------------------------------------------------------------- */
	(function tabs() {
		var list = $('.vxh-tabs');
		if (!list) return;
		var tabs = $$('.vxh-tab', list), panes = $$('.vxh-pane'), ind = $('.vxh-tabs__ind', list);
		function place(tab) {
			if (!ind) return;
			ind.style.setProperty('--x', tab.offsetLeft + 'px');
			ind.style.setProperty('--w', tab.offsetWidth + 'px');
		}
		function select(n, focus) {
			tabs.forEach(function (t, i) {
				var on = i === n;
				t.setAttribute('aria-selected', on ? 'true' : 'false');
				t.setAttribute('tabindex', on ? '0' : '-1');
				if (on) { place(t); if (focus) t.focus(); }
			});
			panes.forEach(function (p, i) { p.classList.toggle('is-active', i === n); p.hidden = i !== n; });
		}
		tabs.forEach(function (t, i) {
			t.addEventListener('click', function () { select(i); });
			t.addEventListener('keydown', function (e) {
				var k = e.key, n = i;
				if (k === 'ArrowRight' || k === 'ArrowDown') n = (i + 1) % tabs.length;
				else if (k === 'ArrowLeft' || k === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
				else if (k === 'Home') n = 0; else if (k === 'End') n = tabs.length - 1; else return;
				e.preventDefault(); select(n, true);
			});
		});
		select(0);
		window.addEventListener('resize', function () { place(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0]); }, { passive: true });
		if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(tabs[0]); });
	})();

	/* ----------------------------------------------------------------------
	   10. Rail — one open value at a time
	   ---------------------------------------------------------------------- */
	(function rail() {
		var rail = $('.vxh-rail');
		if (!rail) return;
		var cards = $$('.vxh-vcard', rail);
		function open(n) {
			cards.forEach(function (c, i) { c.classList.toggle('is-open', i === n); c.setAttribute('aria-expanded', i === n ? 'true' : 'false'); });
		}
		cards.forEach(function (c, i) {
			c.addEventListener('click', function () { open(i); });
			c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); } });
			if (FINE) c.addEventListener('mouseenter', function () { open(i); });
			c.addEventListener('focus', function () { open(i); });
		});
		open(0);
	})();

	/* ----------------------------------------------------------------------
	   11. Magnetic primary buttons — a few pixels of pull, nothing more
	   ---------------------------------------------------------------------- */
	if (FINE && !REDUCED) {
		$$('.vxh-btn--primary, .vxh-btn--blue').forEach(function (b) {
			b.addEventListener('mousemove', function (e) {
				var r = b.getBoundingClientRect();
				var x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
				b.style.transform = 'translate(' + (x * 6).toFixed(1) + 'px,' + (y * 4 - 1).toFixed(1) + 'px)';
			});
			b.addEventListener('mouseleave', function () { b.style.transform = ''; });
		});
	}
	/* Dubai clock in the status chip — updates each half minute. */
	(function () {
		var el = document.querySelector('[data-vxh-clock]');
		if (!el) return;
		function tick() {
			try {
				var t = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
				el.textContent = '· ' + t + ' GST';
			} catch (e) { el.textContent = ''; }
		}
		tick(); setInterval(tick, 30000);
	})();
})();