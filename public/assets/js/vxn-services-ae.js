/* ==========================================================================
   VALUNXT Capital — UAE services (index + detail) · interactions

   Vanilla, loaded with `defer`. Guards on each root so either page family can
   omit a block. Motion respects prefers-reduced-motion.

     1. Stage frame  — pointer tilt on the product frame; visuals play on load.
     2. Rail         — sticky in-page nav: active section, sliding indicator.
     3. Cells        — pointer spotlight; mini UIs play on entry.
     4. Stepper      — the process line draws with scroll, steps light in turn.
   ========================================================================== */
(function () {
	'use strict';
	var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	function $(s, c) { return (c || document).querySelector(s); }
	function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
	function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
	function onEnter(el, fn) {
		if (!el) return;
		if (!('IntersectionObserver' in window)) { fn(el); return; }
		var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
		io.observe(el);
	}

	/* 1. Stage frame */
	(function () {
		var stage = $('.vxh-stage'), frame = $('.vxh-frame');
		if (!frame) return;
		$$('[data-i]', frame).forEach(function (n) { n.style.setProperty('--i', n.getAttribute('data-i')); });
		setTimeout(function () { frame.classList.add('is-in'); }, 350);
		if (!stage || !FINE || REDUCED) return;
		var rx = 3, ry = -6, tx = 3, ty = -6, raf = null;
		function tick() {
			rx += (tx - rx) * .08; ry += (ty - ry) * .08;
			frame.style.setProperty('--rx', rx.toFixed(2) + 'deg'); frame.style.setProperty('--ry', ry.toFixed(2) + 'deg');
			if (Math.abs(tx - rx) > .02 || Math.abs(ty - ry) > .02) raf = requestAnimationFrame(tick); else raf = null;
		}
		stage.addEventListener('mousemove', function (e) {
			var r = stage.getBoundingClientRect();
			var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
			tx = clamp(3 - y * 8, -5, 9); ty = clamp(-6 + x * 12, -12, 6);
			if (!raf) raf = requestAnimationFrame(tick);
		});
		stage.addEventListener('mouseleave', function () { tx = 3; ty = -6; if (!raf) raf = requestAnimationFrame(tick); });
	})();

	/* 2. Rail */
	(function () {
		var rail = $('.vxh-snav');
		if (!rail) return;
		var links = $$('a[href^="#"]', rail), ind = $('.vxh-snav__ind', rail), box = $('.vxh-snav__in', rail);
		var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
		function place(a) {
			if (!ind || !a) return;
			ind.style.setProperty('--x', (a.offsetLeft) + 'px');
			ind.style.setProperty('--w', a.offsetWidth + 'px');
		}
		var active = -1;
		function set(n) {
			if (n === active) return; active = n;
			links.forEach(function (a, i) { a.classList.toggle('is-active', i === n); });
			place(links[n]);
			/* keep the active tab in view on narrow screens */
			if (box && links[n]) { var l = links[n]; var want = l.offsetLeft - (box.clientWidth - l.offsetWidth) / 2; box.scrollTo({ left: want, behavior: REDUCED ? 'auto' : 'smooth' }); }
		}
		var ticking = false;
		function update() {
			ticking = false;
			var y = window.innerHeight * .38, best = 0;
			targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= y) best = i; });
			set(best);
		}
		window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
		window.addEventListener('resize', function () { place(links[active] || links[0]); }, { passive: true });
		links.forEach(function (a, i) {
			a.addEventListener('click', function (e) {
				var t = targets[i]; if (!t) return;
				e.preventDefault();
				var top = t.getBoundingClientRect().top + window.pageYOffset - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--vxn-navh')) || 94) - 56;
				window.scrollTo({ top: top, behavior: REDUCED ? 'auto' : 'smooth' });
				history.replaceState(null, '', '#' + t.id);
			});
		});
		update();
		if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(links[active] || links[0]); });
	})();

	/* 3. Cells */
	$$('.vxh-cell, .vxs-switch a').forEach(function (cell) {
		if (FINE) cell.addEventListener('mousemove', function (e) {
			var r = cell.getBoundingClientRect();
			cell.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
			cell.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
		});
		$$('[data-i]', cell).forEach(function (n) { n.style.setProperty('--i', n.getAttribute('data-i')); });
		onEnter(cell, function () { cell.classList.add('is-in'); });
	});

	/* 4. Stepper */
	(function () {
		var steps = $('.vxd-steps');
		if (!steps) return;
		var items = $$('.vxd-step', steps), line = $('.vxd-steps__line', steps);
		var ticking = false;
		function update() {
			ticking = false;
			var r = steps.getBoundingClientRect(), vh = window.innerHeight;
			var p = clamp((vh * .8 - r.top) / (r.height * .9), 0, 1);
			if (line) line.style.setProperty('--p', (p * 100).toFixed(1) + '%');
			var lit = Math.ceil(p * items.length);
			items.forEach(function (s, i) { s.classList.toggle('is-on', i < lit); });
		}
		if (REDUCED) { items.forEach(function (s) { s.classList.add('is-on'); }); if (line) line.style.setProperty('--p', '100%'); return; }
		window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
		window.addEventListener('resize', update, { passive: true });
		update();
	})();
	/* 5. Chooser — options → a result card */
	$$("[data-vxd-chooser]").forEach(function (root) {
		var opts = $$("[data-opt]", root), res = $$("[data-res]", root);
		function pick(n) {
			opts.forEach(function (o, i) { o.setAttribute("aria-pressed", i === n ? "true" : "false"); });
			res.forEach(function (r, i) { r.hidden = i !== n; r.classList.toggle("is-on", i === n); });
		}
		opts.forEach(function (o, i) { o.addEventListener("click", function () { pick(i); }); });
	});

	/* 6. Readiness — three toggles → a score and a starting point */
	$$("[data-vxd-readiness]").forEach(function (root) {
		var groups = $$("[data-q]", root), res = $$("[data-res]", root), ring = $("circle.f", root), label = $("[data-score]", root);
		var vals = groups.map(function () { return 0; });
		function update() {
			var score = vals.reduce(function (a, b) { return a + b; }, 0);
			if (ring) ring.style.setProperty("--p", (score / groups.length).toFixed(3));
			if (label) label.textContent = score + "/" + groups.length;
			/* which result: no books → foundations; books but no dashboard → dashboards; books+dash, no AI → AI; all → roadmap */
			var n = !vals[0] ? 0 : (!vals[1] ? 1 : (!vals[2] ? 2 : 3));
			res.forEach(function (r, i) { r.hidden = i !== n; r.classList.toggle("is-on", i === n); });
		}
		groups.forEach(function (g, gi) {
			$$("button", g).forEach(function (b) {
				b.addEventListener("click", function () {
					$$("button", g).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
					vals[gi] = +b.getAttribute("data-v"); update();
				});
			});
		});
		update();
	});

	/* 7. Calendar — the financial year end moves the deadlines */
	$$("[data-vxd-calendar]").forEach(function (root) {
		var btns = $$("[data-fy]", root), out = $("[data-fy-out]", root), ctText = $("[data-ct-text]", root), now = $(".vxh-cal__now", root);
		var M = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		function m12(n) { return ((n - 1) % 12 + 12) % 12 + 1; }
		function place(el, m) { el.style.setProperty("--m", m); }
		function set(fy) {
			btns.forEach(function (b) { b.setAttribute("aria-pressed", +b.getAttribute("data-fy") === fy ? "true" : "false"); });
			if (out) out.textContent = M[fy - 1];
			var ct = m12(fy + 9);
			$$("[data-k=fy]", root).forEach(function (e) { place(e, fy); });
			$$("[data-k=ct]", root).forEach(function (e) { place(e, ct); });
			$$("[data-k=vat]", root).forEach(function (e) { var q = +e.getAttribute("data-q"); place(e, m12(fy + q * 3 + 1)); });
			if (ctText) ctText.textContent = "Return and payment due by the end of " + M[ct - 1] + ", nine months after a " + M[fy - 1] + " year end.";
		}
		btns.forEach(function (b) { b.addEventListener("click", function () { set(+b.getAttribute("data-fy")); }); });
		if (now) { var d = new Date(), y = d.getFullYear(); now.style.setProperty("--x", (((d - new Date(y, 0, 1)) / (new Date(y + 1, 0, 1) - new Date(y, 0, 1))) * 100).toFixed(2) + "%"); }
		set(12);
	});

	/* 8. Mortgage calculator — UAE Central Bank LTV caps, indicative repayment */
	$$("[data-vxd-calc]").forEach(function (root) {
		var value = $("input[name=value]", root), rate = $("input[name=rate]", root), term = $("input[name=term]", root);
		var buyer = "expat", prop = "first";
		function money(n) { return "AED " + Math.round(n).toLocaleString("en-US"); }
		function o(k) { return $("[data-out=" + k + "]", root); }
		function cap() {
			var v = +value.value;
			if (prop === "offplan") return { ltv: .5, why: "50% cap for off-plan purchases, whatever the buyer" };
			if (buyer === "nonres") return { ltv: .5, why: "Non-resident caps are set lender by lender; 50% shown as a working figure" };
			if (prop === "second") return buyer === "national" ? { ltv: .65, why: "65% cap for a UAE national buying a subsequent property" } : { ltv: .6, why: "60% cap for a resident expatriate buying a subsequent property" };
			if (buyer === "national") return v <= 5e6 ? { ltv: .85, why: "85% cap for a UAE national, first home up to AED 5m" } : { ltv: .75, why: "75% cap for a UAE national, first home above AED 5m" };
			return v <= 5e6 ? { ltv: .8, why: "80% cap for a resident expatriate, first home up to AED 5m" } : { ltv: .7, why: "70% cap for a resident expatriate, first home above AED 5m" };
		}
		function slider(el) { var p = (el.value - el.min) / (el.max - el.min) * 100; el.style.setProperty("--p", p.toFixed(1) + "%"); }
		function update() {
			var v = +value.value, r = +rate.value / 100 / 12, n = +term.value * 12, c = cap();
			var loan = v * c.ltv, down = v - loan;
			var pay = r > 0 ? loan * r / (1 - Math.pow(1 + r, -n)) : loan / n;
			o("value").textContent = money(v); o("rate").textContent = (+rate.value).toFixed(2) + "%"; o("term").textContent = term.value + " years";
			o("loan").textContent = money(loan); o("ltv").textContent = Math.round(c.ltv * 100) + "% loan-to-value: " + c.why;
			o("down").textContent = money(down); o("downbar").style.setProperty("--w", Math.round((1 - c.ltv) * 100) + "%");
			o("pay").textContent = money(pay) + " / month"; o("paybar").style.setProperty("--w", clamp(pay / 40000 * 100, 4, 100).toFixed(0) + "%");
			[value, rate, term].forEach(slider);
		}
		[value, rate, term].forEach(function (el) { el.addEventListener("input", update); });
		$$("[data-seg]", root).forEach(function (seg) {
			var k = seg.getAttribute("data-seg");
			$$("button", seg).forEach(function (b) {
				b.addEventListener("click", function () {
					$$("button", seg).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
					if (k === "buyer") buyer = b.getAttribute("data-v"); else prop = b.getAttribute("data-v");
					update();
				});
			});
		});
		update();
	});

	/* 9. Gallery parallax — a few pixels of drift per image */
	(function () {
		var items = $$("[data-vxd-gallery] img");
		if (!items.length || REDUCED) return;
		var ticking = false;
		function update() {
			ticking = false;
			var vh = window.innerHeight;
			items.forEach(function (img) {
				var r = img.parentNode.getBoundingClientRect();
				var p = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
				img.style.setProperty("--py", (p * -14).toFixed(1) + "px");
			});
		}
		window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
		update();
	})();
	/* 10. Explorer — auto-advancing tabs, paused while hovered or focused */
	$$("[data-vxd-explorer]").forEach(function (root) {
		var tabs = $$(".vxd-x__tab", root), panes = $$(".vxd-x__pane", root), dots = $$(".vxd-x__dots i", root);
		var DUR = 7000, at = 0, timer = null, live = false;
		root.style.setProperty("--vxd-x-dur", DUR + "ms");
		function show(n, focus) {
			at = (n + tabs.length) % tabs.length;
			tabs.forEach(function (t, i) {
				var on = i === at;
				t.setAttribute("aria-selected", on ? "true" : "false"); t.setAttribute("tabindex", on ? "0" : "-1");
				if (on) { t.classList.remove("is-x"); void t.offsetWidth; }
				if (on && focus) t.focus();
			});
			panes.forEach(function (p, i) { var on = i === at; p.hidden = !on; p.classList.toggle("is-active", on); if (on) { var m = $(".vxd-x__media", p); if (m) { m.classList.remove("is-in"); void m.offsetWidth; m.classList.add("is-in"); } } });
			dots.forEach(function (d, i) { d.classList.toggle("is-on", i === at); });
		}
		function play() { stop(); if (REDUCED || !live) return; timer = setTimeout(function () { show(at + 1); play(); }, DUR); }
		function stop() { if (timer) { clearTimeout(timer); timer = null; } }
		tabs.forEach(function (t, i) {
			t.addEventListener("click", function () { show(i); play(); });
			t.addEventListener("keydown", function (e) {
				var n = i; if (e.key === "ArrowDown" || e.key === "ArrowRight") n = i + 1; else if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = i - 1; else return;
				e.preventDefault(); show(n, true); play();
			});
		});
		root.addEventListener("mouseenter", function () { root.classList.add("is-paused"); stop(); });
		root.addEventListener("mouseleave", function () { root.classList.remove("is-paused"); play(); });
		root.addEventListener("focusin", function () { root.classList.add("is-paused"); stop(); });
		root.addEventListener("focusout", function () { root.classList.remove("is-paused"); play(); });
		if ("IntersectionObserver" in window) {
			new IntersectionObserver(function (es) { live = es[0].isIntersecting; if (live) { play(); } else stop(); }, { threshold: .25 }).observe(root);
		} else { live = true; play(); }
		document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else play(); });
		show(0);
	});

	/* 11. Comparison toggle */
	$$("[data-vxd-compare]").forEach(function (root) {
		var tog = $(".vxd-toggle", root);
		function side(s) {
			tog.setAttribute("data-side", s);
			$$("button", tog).forEach(function (b) { b.classList.toggle("is-on", b.getAttribute("data-side") === s); });
			$$(".vxd-cmp__v span", root).forEach(function (v) { v.classList.toggle("is-on", v.getAttribute("data-side") === s); });
		}
		$$("button", tog).forEach(function (b) { b.addEventListener("click", function () { side(b.getAttribute("data-side")); }); });
		/* first time it scrolls into view, flash the "typical" side so the toggle is discovered */
		onEnter(root, function () { if (REDUCED) return; setTimeout(function () { side("a"); setTimeout(function () { side("b"); }, 1400); }, 600); });
	});

	/* 12. Counters (same behaviour as the home page) */
	$$("[data-vxh-count]").forEach(function (el) {
		var target = parseFloat(el.getAttribute("data-vxh-count")) || 0;
		onEnter(el.closest("[data-vxn-in]") || el, function () {
			if (REDUCED) { el.textContent = target; return; }
			var t0 = null, dur = 1200;
			function run(ts) { if (!t0) t0 = ts; var p = clamp((ts - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 4); el.textContent = Math.round(target * e); if (p < 1) requestAnimationFrame(run); else el.textContent = target; }
			requestAnimationFrame(run);
		});
	});

	/* 13. Hero artifacts appear with the frame */
	(function () { var v = $(".vxh-stagevis"); if (v) setTimeout(function () { v.classList.add("is-in"); }, 700); })();
})();