'use client';

/**
 * A full-bleed fragment shader on an `ogl` triangle — the canvas the section's
 * own two backgrounds are painted on.
 *
 * GradientBlinds (the third) ships as its own self-contained component, so this
 * deliberately mirrors its lifecycle rather than trying to absorb it: same
 * pointer dampening, same pause flag, same resize observer, same teardown. What
 * differs between the two fields it does render is the fragment shader and four
 * colours, and nothing else — so they are data, not components.
 *
 * `paused` stops the frame loop but leaves the last frame on the canvas, which
 * is what lets an inactive tab's background sit still underneath the cross-fade
 * instead of going blank.
 */
import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

export type Rgb = [number, number, number];

const VERTEX = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export function hexToRgb(hex: string): Rgb {
  const c = hex.replace('#', '').padEnd(6, '0');
  return [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ];
}

export default function ShaderField({
  fragment,
  colors,
  paused = false,
  intensity = 1,
  dpr,
  mouseDampening = 0.18,
  className,
}: {
  fragment: string;
  /** Exactly four stops, darkest last — the shaders all read them that way. */
  colors: [string, string, string, string];
  paused?: boolean;
  intensity?: number;
  dpr?: number;
  mouseDampening?: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  /* The frame loop reads these every tick, so they must not be stale between
     renders — refs rather than state, and no re-init when `paused` flips. */
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        dpr: dpr ?? Math.min(window.devicePixelRatio || 1, 1.75),
        alpha: true,
        antialias: true,
      });
    } catch {
      return; // no WebGL: the section's flat ground is what shows
    }

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    host.appendChild(canvas);

    const [c0, c1, c2, c3] = colors.map(hexToRgb);
    const uniforms = {
      iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] as [number, number, number] },
      iMouse: { value: [gl.drawingBufferWidth / 2, gl.drawingBufferHeight / 2] as [number, number] },
      iTime: { value: 0 },
      uIntensity: { value: intensity },
      uColor0: { value: c0 },
      uColor1: { value: c1 },
      uColor2: { value: c2 },
      uColor3: { value: c3 },
    };

    const program = new Program(gl, { vertex: VERTEX, fragment, uniforms });
    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const target: [number, number] = [...uniforms.iMouse.value];
    function resize() {
      const rect = host!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      renderer.setSize(rect.width, rect.height);
      uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* Listened for on the section, not the canvas: the whole background is
       pointer-events:none, and the pointer is usually over the copy anyway. */
    const surface = (host.closest('.vxs') as HTMLElement | null) ?? host;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scale = (renderer as unknown as { dpr?: number }).dpr || 1;
      target[0] = (e.clientX - rect.left) * scale;
      target[1] = (rect.height - (e.clientY - rect.top)) * scale;
    };
    surface.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    let last = 0;
    function loop(t: number) {
      raf = requestAnimationFrame(loop);
      if (!last) last = t;
      const dt = (t - last) / 1000;
      last = t;

      const factor = Math.min(1, 1 - Math.exp(-dt / Math.max(1e-4, mouseDampening)));
      const cur = uniforms.iMouse.value;
      cur[0] += (target[0] - cur[0]) * factor;
      cur[1] += (target[1] - cur[1]) * factor;

      if (pausedRef.current) return;
      uniforms.iTime.value = t * 0.001;
      try {
        renderer.render({ scene: mesh });
      } catch {
        cancelAnimationFrame(raf);
      }
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      surface.removeEventListener('pointermove', onMove);
      if (canvas.parentElement === host) host.removeChild(canvas);
      const ext = gl.getExtension('WEBGL_lose_context');
      ext?.loseContext();
    };
    // Colours and shader are fixed per tab, so this initialises once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={className} ref={hostRef} aria-hidden="true" />;
}
