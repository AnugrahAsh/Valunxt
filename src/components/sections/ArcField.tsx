'use client';

/**
 * The arc field behind the enquiry block — the "Ready when you are" background,
 * rebuilt in three dimensions.
 *
 * The flat version is two SVGs of concentric rings centred off the top-right
 * corner, drifting on a CSS animation and multiplied into the cream ground
 * (assets/img/abs/arcs-1.svg). This is the same motif as real geometry: annulus
 * sectors at six radii, each on its own plane and its own spin, lit only by
 * their own colour.
 *
 * Two motions run at once. The field never stops moving on its own: the group
 * orbits slowly on all three axes, its centre drifts, and the rings counter-spin
 * and breathe apart and back together so the gaps between the planes open and
 * close. On top of that it answers the pointer — leaning toward it, tracking it
 * across the section, and easing forward while the section is hovered. Together
 * they give the flat artwork the depth it could only suggest.
 *
 * HOW IT DEGRADES. The CSS layers render first and are what a visitor sees
 * until — and unless — this takes over: three.js is fetched only when the
 * section nears the viewport, and only if the browser reports WebGL and the
 * visitor has not asked for reduced motion. On success the section gains
 * `is-gl`, which cross-fades the canvas in over them. Nothing here is on the
 * critical path, and the block reads identically without it.
 *
 * COST. three is dynamically imported, so it stays out of the initial bundle.
 * The scene is a dozen meshes with no lights, no shadows and no post-processing;
 * device pixel ratio is capped at 1.5, and the frame loop stops whenever the
 * section leaves the viewport or the tab is hidden.
 */
import { useEffect, useRef } from 'react';

/** The brand ramp, outermost ring first — as the SVG orders them. */
const RING_COLOURS = [0x1541e6, 0x0b2dbe, 0x2f63ff, 0x6e8ef5, 0x9db4ff, 0xc9d6ff];

/**
 * A ring's opacity, matched to the flat layers' .18 and fading down the ramp.
 * `hover` (0..1) lifts it a little while the pointer is in the section — enough
 * to notice, not enough to read as a different design.
 */
function ringOpacity(i: number, hover: number): number {
  return (0.2 - i * 0.022) * (1 + hover * 0.45);
}

export default function ArcField() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const section = host.closest('.vxc') as HTMLElement | null;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let disposed = false;
    let stop: (() => void) | undefined;

    /* Only pay for any of this once the section is close enough to matter. */
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        start().catch(() => {
          /* Any failure — no WebGL, a blocked chunk — leaves the CSS layers up. */
        });
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(host);

    async function start() {
      const THREE = await import('three');
      if (disposed) return;

      const canvas = document.createElement('canvas');
      canvas.className = 'vxc-arcs__canvas';
      canvas.setAttribute('aria-hidden', 'true');

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        });
      } catch {
        return; // no WebGL: the CSS layers stay
      }
      if (disposed) {
        renderer.dispose();
        return;
      }

      renderer.setClearAlpha(0);
      host!.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 7);

      /* The rings share one centre well off the top-right corner, exactly as the
         flat artwork does (its circles are centred at cx=1500 on a 1600-wide
         canvas). Only the outer sweeps come into frame, which is what keeps this
         a background: the copy and the form sit in the clear middle. */
      const group = new THREE.Group();
      group.position.set(5.4, 3.2, 0);
      scene.add(group);

      const geometries: import('three').BufferGeometry[] = [];
      const materials: import('three').Material[] = [];
      const rings: {
        mesh: import('three').Mesh;
        spin: number;
        tilt: number;
        z0: number;
        phase: number;
        bob: number;
      }[] = [];

      RING_COLOURS.forEach((colour, i) => {
        const inner = 2.6 + i * 1.05;
        const band = 0.16 + (i % 3) * 0.14;
        const geometry = new THREE.RingGeometry(inner, inner + band, 160, 1, Math.PI * 0.5, Math.PI * 1.3);
        const material = new THREE.MeshBasicMaterial({
          color: colour,
          transparent: true,
          /* The flat layers sit at .18 and multiply into the cream. Anything
             louder stops being a ground and starts competing with the form. */
          opacity: ringOpacity(i, 0),
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geometry, material);
        /* Each ring on its own plane, so the stack has real depth to parallax. */
        mesh.position.z = -i * 0.42;
        mesh.rotation.z = i * 0.22;
        geometries.push(geometry);
        materials.push(material);
        rings.push({
          mesh,
          /* Alternating directions, so the stack shears as it turns rather than
             rotating as one disc. */
          spin: (i % 2 ? 1 : -1) * (0.09 + i * 0.026),
          tilt: i * 0.05,
          z0: -i * 0.42,
          /* Each ring breathes on its own phase and period. */
          phase: i * 1.15,
          bob: 0.16 + i * 0.05,
        });
        group.add(mesh);
      });

      /* Pointer state, in normalised section coordinates, eased every frame. */
      let px = 0;
      let py = 0;
      let cx = 0;
      let cy = 0;
      let hover = 0;
      let hoverTarget = 0;

      const onMove = (e: PointerEvent) => {
        const r = (section ?? host!).getBoundingClientRect();
        px = ((e.clientX - r.left) / r.width) * 2 - 1;
        py = ((e.clientY - r.top) / r.height) * 2 - 1;
      };
      const onEnter = () => {
        hoverTarget = 1;
      };
      const onLeave = () => {
        hoverTarget = 0;
        px = 0;
        py = 0;
      };

      const target = section ?? host!;
      target.addEventListener('pointermove', onMove, { passive: true });
      target.addEventListener('pointerenter', onEnter);
      target.addEventListener('pointerleave', onLeave);

      function resize() {
        const r = host!.getBoundingClientRect();
        if (!r.width || !r.height) return;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / r.height;
        camera.updateProjectionMatrix();
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host!);

      let raf = 0;
      let running = false;
      let last = performance.now();
      let clock = 0;

      /* Where the assembly sits at rest, before the pointer moves it. */
      const HOME = { x: 5.4, y: 3.2 };

      function frame(now: number) {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        clock += dt;

        cx += (px - cx) * 0.055;
        cy += (py - cy) * 0.055;
        hover += (hoverTarget - hover) * 0.06;

        /* Two motions layered: a slow orbit the field never stops making, and
           the lean toward the pointer on top of it. The orbit is what keeps it
           alive when nobody is touching anything. */
        group.rotation.z = Math.sin(clock * 0.11) * 0.16 + clock * 0.02;
        group.rotation.y = Math.sin(clock * 0.17) * 0.08 + cx * 0.5;
        group.rotation.x = Math.cos(clock * 0.13) * 0.06 - cy * 0.34;

        /* The centre drifts a little, and the whole stack eases toward the
           viewer while the pointer is in the section. */
        group.position.x = HOME.x + Math.sin(clock * 0.09) * 0.5 - cx * 0.85;
        group.position.y = HOME.y + Math.cos(clock * 0.12) * 0.38 + cy * 0.6;
        group.position.z = hover * 1.6;

        rings.forEach((ring, i) => {
          ring.mesh.rotation.z += ring.spin * dt * (1 + hover * 0.7);
          ring.mesh.rotation.x = ring.tilt + Math.sin(clock * 0.2 + ring.phase) * 0.1 + cy * 0.1 * (i % 2 ? 1 : -1);
          ring.mesh.rotation.y = Math.cos(clock * 0.15 + ring.phase) * 0.08 + cx * 0.12 * (i % 2 ? -1 : 1);
          /* Depth breathing: the gaps between the planes open and close, so the
             parallax reads even while the pointer is still. */
          ring.mesh.position.z = ring.z0 + Math.sin(clock * 0.24 + ring.phase) * ring.bob;
          (ring.mesh.material as import('three').MeshBasicMaterial).opacity = ringOpacity(i, hover);
        });

        renderer.render(scene, camera);
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

      /* Runs only while it is on screen and the tab is in front. */
      const vis = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting) && !document.hidden) play();
          else pause();
        },
        { rootMargin: '120px 0px' },
      );
      vis.observe(host!);
      const onVisibility = () => (document.hidden ? pause() : play());
      document.addEventListener('visibilitychange', onVisibility);

      section?.classList.add('is-gl');

      stop = () => {
        pause();
        vis.disconnect();
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        target.removeEventListener('pointermove', onMove);
        target.removeEventListener('pointerenter', onEnter);
        target.removeEventListener('pointerleave', onLeave);
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        renderer.dispose();
        canvas.remove();
        section?.classList.remove('is-gl');
      };
    }

    return () => {
      disposed = true;
      io.disconnect();
      stop?.();
    };
  }, []);

  return <div className="vxc-arcs" ref={hostRef} aria-hidden="true" />;
}
