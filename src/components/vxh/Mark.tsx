'use client';

/**
 * The VALUNXT X in three dimensions, as a section's ground.
 *
 * The geometry, the recolour and the room it is lit by are shared with the home
 * page's mark — see vxh/markScene. What lives here is the part that is actually
 * different: this one is the spine of a scrolled story rather than the backdrop
 * of a hero, so it holds its place in the middle of its run, turns through a
 * fixed number of revolutions as the reader moves down it, and breathes rather
 * than travels.
 *
 * INTERACTION. It turns on its own account, always, and the scroll adds to that
 * — so the rotation never stops between wheel events and never steps with them.
 * The scroll reading is measured on the frame that uses it and eased toward,
 * rather than written to a custom property by a scroll handler and read back
 * with getComputedStyle, which is a forced style resolve every frame off a value
 * that is always one event stale. It leans toward the pointer, and it can be
 * grabbed: a drag turns it directly, the throw carries and decays, and the
 * offset eases home.
 *
 * HOW IT DEGRADES. The section renders complete without it. three is imported
 * only when the run is near the viewport, only if WebGL is available, and never
 * under reduced motion. On success the run gains `is-gl`, which is the only
 * thing that reveals the canvas — so a blocked chunk or a missing mark leaves a
 * page that never promised one.
 *
 * COST. Four meshes, no lights, no shadows, no post-processing; the pixel ratio
 * is capped at 1.75 and the frame loop stops when the run scrolls away or the
 * tab is hidden.
 */
import { useEffect, useRef } from 'react';

import { buildEnvironment, buildMark, importMark } from './markScene';

export default function Mark({
  /** The scrolled run this mark is the spine of. Defaults to the parent element. */
  run: runSel,
  /** The box the mark is sized against, so a taller section does not mean a bigger X. */
  fit: fitSel,
  /** Fraction of that box the mark spans. Over 1 means it runs off the sides. */
  cover = 0.86,
  /** Revolutions on Y across the whole run. */
  turns = 1,
  /** Revolutions per second it turns at regardless of the scroll. */
  idle = 0.11,
}: {
  run?: string;
  fit?: string;
  cover?: number;
  turns?: number;
  idle?: number;
} = {}) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const run = (runSel ? host.closest(runSel) : host.parentElement) as HTMLElement | null;
    const scope = run ?? host;

    let disposed = false;
    let stop: (() => void) | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        start().catch(() => {
          /* No WebGL, a blocked chunk, a missing mark: the section stands alone. */
        });
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(host);

    async function start() {
      const { THREE, SVGLoader, markSvg } = await importMark();
      if (disposed) return;

      const canvas = document.createElement('canvas');
      canvas.className = 'vxh-mark__canvas';
      canvas.setAttribute('aria-hidden', 'true');

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        return;
      }
      if (disposed) {
        renderer.dispose();
        return;
      }

      renderer.setClearAlpha(0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.02;
      host!.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 4.6);
      camera.lookAt(0, 0, 0);

      const envMap = buildEnvironment(THREE, renderer);
      scene.environment = envMap;

      const mark = buildMark(THREE, SVGLoader, markSvg);
      const group = new THREE.Group();
      group.add(mark.inner);
      group.rotation.set(0.26, -0.34, 0);
      scene.add(group);

      /* ---- what moves it -------------------------------------------------- */
      let px = 0;
      let py = 0;
      let cx = 0;
      let cy = 0;

      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let dragY = 0;
      let dragX = 0;
      let velY = 0;
      let velX = 0;
      let clock = 0;
      let spinFree = 0;
      let runP = 0;
      let runTarget = 0;

      const onMove = (e: PointerEvent) => {
        const r = scope.getBoundingClientRect();
        px = ((e.clientX - r.left) / r.width) * 2 - 1;
        py = ((e.clientY - r.top) / r.height) * 2 - 1;
        if (dragging) {
          const dx = (e.clientX - lastX) * 0.008;
          const dy = (e.clientY - lastY) * 0.005;
          dragY += dx;
          dragX += dy;
          velY = dx * 60;
          velX = dy * 60;
          lastX = e.clientX;
          lastY = e.clientY;
        }
      };
      const onLeave = () => {
        px = 0;
        py = 0;
      };
      const onDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        host!.classList.add('is-held');
        (e.target as Element).setPointerCapture?.(e.pointerId);
      };
      const onUp = () => {
        dragging = false;
        host!.classList.remove('is-held');
      };

      scope.addEventListener('pointermove', onMove, { passive: true });
      scope.addEventListener('pointerleave', onLeave);
      host!.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);

      let markScale = 1;

      function resize() {
        const r = host!.getBoundingClientRect();
        if (!r.width || !r.height) return;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();

        /* The canvas covers a sticky full-height layer, so neither of its own
           dimensions is a useful size — a phone's layer is far taller and
           narrower than a laptop's. The mark is fitted to the box the layout
           leaves clear for it, measured in world units through the frame. */
        const worldH = 2 * Math.tan(((camera.fov / 2) * Math.PI) / 180) * camera.position.z;
        const perPx = worldH / r.height;
        const box = (fitSel ? scope.querySelector(fitSel) : null) ?? host!;
        const b = box.getBoundingClientRect();
        markScale = Math.max(0.2, Math.min(3.4, Math.min(
          (b.width * perPx * cover) / mark.width,
          (b.height * perPx * cover) / mark.height,
        )));
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host!);

      let raf = 0;
      let running = false;
      let last = performance.now();

      function frame(now: number) {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        clock += dt;

        if (!dragging) {
          dragY += velY * dt;
          dragX += velX * dt;
          velY *= Math.pow(0.05, dt);
          velX *= Math.pow(0.05, dt);
          if (Math.abs(velY) < 0.25) dragY *= Math.pow(0.3, dt);
          if (Math.abs(velX) < 0.25) dragX *= Math.pow(0.3, dt);
        }
        dragX = Math.max(-0.6, Math.min(0.6, dragX));

        cx += (px - cx) * Math.min(1, dt * 4);
        cy += (py - cy) * Math.min(1, dt * 4);

        /* Measured here, on the frame that uses it, and eased rather than
           followed — so a coarse wheel step arrives as a movement, not a jolt. */
        if (run) {
          const wr = run.getBoundingClientRect();
          const travel = Math.max(wr.height - window.innerHeight, 1);
          runTarget = Math.max(0, Math.min(1, -wr.top / travel));
        }
        runP += (runTarget - runP) * Math.min(1, dt * 5);

        /* It breathes, but it does not travel: this one is the spine the
           chapters are hung on, and a spine that slides down the page takes
           their alignment with it. */
        group.position.y = Math.sin(clock * 0.5) * 0.03;
        group.scale.setScalar(markScale * (1 + Math.sin(clock * 0.4) * 0.012));

        spinFree += dt * idle;
        group.rotation.y =
          -0.34 + spinFree + Math.sin(clock * 0.24) * 0.2 + runP * Math.PI * 2 * turns + dragY + cx * 0.42;
        /* A standing tilt, so the pass through 90° on Y still shows a face
           rather than a knife edge — a background that vanishes twice a minute
           is not a background. */
        group.rotation.x = 0.26 + Math.sin(clock * 0.33) * 0.06 + cy * 0.18 + dragX;
        group.rotation.z = Math.sin(clock * 0.19) * 0.03 + cx * 0.03;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      }

      function play() {
        if (running || disposed) return;
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
      function pause() {
        running = false;
        cancelAnimationFrame(raf);
      }

      const vis = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) play();
          else pause();
        },
        { rootMargin: '120px 0px' },
      );
      vis.observe(host!);
      const onVisibility = () => (document.hidden ? pause() : play());
      document.addEventListener('visibilitychange', onVisibility);

      scope.classList.add('is-gl');

      stop = () => {
        pause();
        vis.disconnect();
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        scope.removeEventListener('pointermove', onMove);
        scope.removeEventListener('pointerleave', onLeave);
        host!.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        mark.dispose();
        envMap.dispose();
        renderer.dispose();
        canvas.remove();
        scope.classList.remove('is-gl');
      };
    }

    return () => {
      disposed = true;
      io.disconnect();
      stop?.();
    };
    // The mark is fixed for the life of the section it is the ground of.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="vxh-mark vxh-mark--solo" ref={hostRef} aria-hidden="true" />;
}
