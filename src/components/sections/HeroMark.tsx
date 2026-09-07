'use client';

/**
 * The VALUNXT X, in three dimensions — the hero's ground, not an ornament
 * placed on it.
 *
 * EXACT, BECAUSE IT IS THE SAME FILE. The geometry is not a redraw: the mark's
 * own SVG (uploads/logo/favicon.svg — the four paths of the X on a 1080 grid)
 * is fetched, parsed with three's SVGLoader and extruded. Change the logo file
 * and this changes with it. Nothing here traces or approximates the shape.
 *
 * THE ONE THING THAT IS NOT VERBATIM is the pair of fills. The mark file is
 * still authored in the older magenta/navy pair; the logo as it is drawn
 * everywhere on this site — the header two inches above this section included —
 * is the brand blue and violet. A 3D mark in different colours from the
 * wordmark beside it would read as a mistake, so the two fills are mapped.
 *
 * The room it is lit by is made rather than loaded: a canvas with a soft sky, a
 * floor and three softboxes, run through PMREM. Nothing is fetched but `three`
 * and the mark itself.
 *
 * INTERACTION. It turns on its own account, always, and the scroll adds to
 * that — so the rotation never stops between wheel events and never steps with
 * them. Both scroll readings are measured on the frame that uses them and eased
 * toward, rather than written to a custom property by a scroll handler and read
 * back with getComputedStyle, which is a forced style resolve every frame off a
 * value that is always one event stale. It also leans toward the pointer, eases
 * forward while hovered, and can be grabbed: a drag turns it directly, the
 * throw carries and decays, and the offset eases home.
 *
 * HOW IT DEGRADES. The stage renders its flat artwork first and keeps it if
 * this never arrives: three is imported only when the hero is near the
 * viewport, only if WebGL is available, and never under reduced motion. On
 * success the hero gains `is-gl`, which fades the canvas in over the artwork.
 *
 * COST. three and the loader are dynamically imported, so they stay out of the
 * initial bundle. Four meshes, no lights, no shadows, no post-processing; the
 * pixel ratio is capped at 1.75 and the frame loop stops when the hero scrolls
 * away or the tab is hidden.
 */
import { useEffect, useRef } from 'react';

/** The mark itself. Its four paths are the only geometry in the scene. */
const MARK_SRC = '/assets/content/uploads/logo/favicon.svg';

/** The mark file's fills, mapped to the palette the site draws the logo in. */
const RECOLOUR: Record<string, string> = {
  '#be3a95': '#9C00DD',
  '#2d419a': '#0053B7',
};

/** Extrusion, in the mark's own units (its viewBox is 1080 square). */
const DEPTH = 132;
const BEVEL = 11;

export default function HeroMark() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    /* The layer spans the hero and the services; the hero is only consulted
       for the band the mark is composed into while it is still on screen. */
    const run = host.closest('.vxh-x') as HTMLElement | null;
    const hero = run?.querySelector('.vxh-hero') as HTMLElement | null;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let disposed = false;
    let stop: (() => void) | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        start().catch(() => {
          /* No WebGL, a blocked chunk, a missing mark: the artwork stays up. */
        });
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(host);

    async function start() {
      const [THREE, loaderMod, markSvg] = await Promise.all([
        import('three'),
        import('three/examples/jsm/loaders/SVGLoader.js'),
        fetch(MARK_SRC).then((r) => {
          if (!r.ok) throw new Error('mark ' + r.status);
          return r.text();
        }),
      ]);
      if (disposed) return;
      const { SVGLoader } = loaderMod;

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
      camera.position.set(0, 0.2, 4.6);
      camera.lookAt(0, 0, 0);

      /* ---- the room it is lit by ---------------------------------------- */
      const env = document.createElement('canvas');
      env.width = 1024;
      env.height = 512;
      const ec = env.getContext('2d')!;
      const sky = ec.createLinearGradient(0, 0, 0, 512);
      sky.addColorStop(0, '#ffffff');
      sky.addColorStop(0.4, '#f2f5fb');
      sky.addColorStop(0.5, '#cbd3e6');
      sky.addColorStop(0.52, '#8b95ad');
      sky.addColorStop(1, '#3b4358');
      ec.fillStyle = sky;
      ec.fillRect(0, 0, 1024, 512);
      ec.globalCompositeOperation = 'lighter';
      for (const [x, y, rx, ry, a] of [
        [200, 118, 220, 96, 0.95],
        [660, 80, 150, 68, 0.75],
        [900, 240, 130, 130, 0.4],
      ] as const) {
        const g = ec.createRadialGradient(x, y, 0, x, y, rx);
        g.addColorStop(0, `rgba(255,255,255,${a})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ec.fillStyle = g;
        ec.save();
        ec.translate(x, y);
        ec.scale(1, ry / rx);
        ec.beginPath();
        ec.arc(0, 0, rx, 0, Math.PI * 2);
        ec.fill();
        ec.restore();
      }
      ec.globalCompositeOperation = 'source-over';

      const envTex = new THREE.CanvasTexture(env);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      envTex.colorSpace = THREE.SRGBColorSpace;
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envMap = pmrem.fromEquirectangular(envTex).texture;
      pmrem.dispose();
      envTex.dispose();
      scene.environment = envMap;

      /* ---- the mark ------------------------------------------------------ */
      /* SVGLoader reads presentation attributes and inline styles, not a
         <style> block — and this file colours its paths by class. So the
         class-to-fill map is read off the stylesheet here and applied by hand. */
      const byClass = new Map<string, string>();
      const styleBlock = /\.([\w-]+)\s*\{[^}]*?fill:\s*([^;}\s]+)/g;
      let m: RegExpExecArray | null;
      while ((m = styleBlock.exec(markSvg)) !== null) byClass.set(m[1], m[2]);

      const paths = new SVGLoader().parse(markSvg).paths;
      if (!paths.length) throw new Error('mark has no paths');

      const materials = new Map<string, import('three').MeshPhysicalMaterial>();
      const geometries: import('three').BufferGeometry[] = [];
      const inner = new THREE.Group();

      for (const path of paths) {
        const node = path.userData?.node as SVGElement | undefined;
        const cls = node?.getAttribute('class') ?? '';
        const authored = (byClass.get(cls) ?? node?.getAttribute('fill') ?? '#0053B7').toLowerCase();
        const hex = RECOLOUR[authored] ?? authored;

        let material = materials.get(hex);
        if (!material) {
          material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(hex),
            /* Enough metal to catch the softboxes along the bevels and read as
               a solid object; not so much that the brand colour goes grey. */
            metalness: 0.42,
            roughness: 0.22,
            clearcoat: 1,
            clearcoatRoughness: 0.16,
            envMapIntensity: 1.15,
          });
          materials.set(hex, material);
        }

        for (const shape of SVGLoader.createShapes(path)) {
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: DEPTH,
            bevelEnabled: true,
            bevelThickness: BEVEL,
            bevelSize: BEVEL,
            bevelSegments: 4,
            curveSegments: 14,
          });
          geometries.push(geometry);
          inner.add(new THREE.Mesh(geometry, material));
        }
      }

      /* SVG counts y downward. Flip it, normalise the mark to one unit tall,
         and sit it on its own centre so every rotation is about the middle of
         the X rather than a corner of its viewBox. */
      inner.scale.set(1, -1, 1);
      inner.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(inner);
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      const unit = 1 / Math.max(size.y, 1);
      inner.scale.multiplyScalar(unit);
      inner.position.set(-centre.x * unit, -centre.y * unit, -centre.z * unit);

      const OBJ_W = size.x * unit;
      const OBJ_H = size.y * unit;

      const group = new THREE.Group();
      group.add(inner);
      group.rotation.set(0.26, -0.34, 0);
      scene.add(group);

      /* ---- what moves it -------------------------------------------------- */
      let px = 0;
      let py = 0;
      let cx = 0;
      let cy = 0;
      let hover = 0;
      let hoverTarget = 0;

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
      let settle = 0;
      let settleTarget = 0;

      const target = run ?? host!;

      const onMove = (e: PointerEvent) => {
        const r = target.getBoundingClientRect();
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
      const onEnter = () => {
        hoverTarget = 1;
      };
      const onLeave = () => {
        hoverTarget = 0;
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

      target.addEventListener('pointermove', onMove, { passive: true });
      target.addEventListener('pointerenter', onEnter);
      target.addEventListener('pointerleave', onLeave);
      host!.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);

      let heroY = 0;
      let heroScale = 1;

      function resize() {
        const r = host!.getBoundingClientRect();
        if (!r.width || !r.height) return;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();

        /* The canvas covers the whole section, so neither of its dimensions is
           a useful size on its own — a phone's section is far taller and
           narrower than a laptop's. The mark is fitted to the band the layout
           leaves clear for it, measured in world units through the frame. */
        const worldH = 2 * Math.tan(((camera.fov / 2) * Math.PI) / 180) * camera.position.z;
        const perPx = worldH / r.height;

        const art = (run ?? host!).querySelector('.vxh-hero__art');
        const ar = art ? art.getBoundingClientRect() : r;
        /* Well over the band on both axes. It is the ground, not a picture hung
           on it, so it is meant to run past the band and off the sides — the
           veil is what keeps the type legible where they overlap, and a mark
           that stops politely at the edges of its box reads as an illustration
           rather than as a backdrop. */
        heroScale = Math.max(0.2, Math.min(3.2, Math.min(
          (ar.width * perPx * 0.92) / OBJ_W,
          (ar.height * perPx * 1.6) / OBJ_H,
        )));

        /* Where the mark rests while the hero is on screen: the middle of the
           hero's own band, which is below the middle of the sticky layer. It
           settles from here to the centre as the hero scrolls away. */
        heroY = ((r.top + r.height / 2 - (ar.top + ar.height / 2)) / r.height) * worldH;
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
        hover += (hoverTarget - hover) * Math.min(1, dt * 4);

        /* Both scroll readings are measured here, on the frame that uses them.
           An earlier pass had the page's script write the progress to a custom
           property and read it back with getComputedStyle: a forced style
           resolve every frame, off a value that was always one scroll event
           behind. That is what the rotation's stutter was. */
        if (run) {
          const wr = run.getBoundingClientRect();
          const travel = Math.max(wr.height - window.innerHeight, 1);
          runTarget = Math.max(0, Math.min(1, -wr.top / travel));
        }
        if (hero) {
          const hr = hero.getBoundingClientRect();
          settleTarget = Math.max(0, Math.min(1, -hr.top / Math.max(hr.height * 0.7, 1)));
        }
        /* And both are eased rather than followed, so a coarse wheel step or a
           jumped scroll position arrives as a movement instead of a jolt. */
        runP += (runTarget - runP) * Math.min(1, dt * 5);
        settle += (settleTarget - settle) * Math.min(1, dt * 5);

        /* Down out of the hero's band and on down the lane between the two
           columns of cards, shrinking to leave them the room. */
        group.position.y = heroY * (1 - settle) - runP * 0.42 + Math.sin(clock * 0.5) * 0.03;
        group.position.z = hover * 0.3;
        group.scale.setScalar(heroScale * (1 - settle * 0.42));

        /* It turns on its own account, always, and the scroll adds to that
           rather than being the only thing driving it — so the rotation never
           stops between wheel events and never steps with them. */
        spinFree += dt * 0.11;
        group.rotation.y =
          -0.34 + spinFree + Math.sin(clock * 0.24) * 0.2 + runP * Math.PI * 2 + dragY + cx * 0.42;
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

      (run ?? host!).classList.add('is-gl');

      stop = () => {
        pause();
        vis.disconnect();
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        target.removeEventListener('pointermove', onMove);
        target.removeEventListener('pointerenter', onEnter);
        target.removeEventListener('pointerleave', onLeave);
        host!.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        geometries.forEach((g) => g.dispose());
        materials.forEach((mat) => mat.dispose());
        envMap.dispose();
        renderer.dispose();
        canvas.remove();
        (run ?? host!).classList.remove('is-gl');
      };
    }

    return () => {
      disposed = true;
      io.disconnect();
      stop?.();
    };
  }, []);

  return <div className="vxh-mark" ref={hostRef} aria-hidden="true" />;
}
