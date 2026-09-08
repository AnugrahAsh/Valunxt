/**
 * The VALUNXT X as geometry — shared by every place the mark is rendered in
 * three dimensions.
 *
 * EXACT, BECAUSE IT IS THE SAME FILE. The shape is not a redraw: the mark's own
 * SVG (uploads/logo/favicon.svg — the four paths of the X on a 1080 grid) is
 * fetched, parsed with three's SVGLoader and extruded. Change the logo file and
 * every 3D mark on the site changes with it.
 *
 * THE ONE THING THAT IS NOT VERBATIM is the pair of fills. The mark file is
 * still authored in the older magenta/navy pair; the logo as it is drawn
 * everywhere on this site is the brand blue and violet, so the two are mapped.
 *
 * This module holds only what every mark needs — the import, the room it is lit
 * by, and the meshes. What each one does with it afterwards (where it sits, how
 * it turns, what the scroll does to it) belongs to the component, because that
 * is the part that genuinely differs between the home hero and the About story.
 *
 * `three` and its SVG loader are imported here, dynamically, so neither reaches
 * a bundle that does not draw the mark.
 */

/** The mark itself. Its four paths are the only geometry in any of these scenes. */
export const MARK_SRC = '/assets/content/uploads/logo/favicon.svg';

/** The mark file's fills, mapped to the palette the site draws the logo in. */
const RECOLOUR: Record<string, string> = {
  '#be3a95': '#9C00DD',
  '#2d419a': '#0053B7',
};

/** Extrusion, in the mark's own units (its viewBox is 1080 square). */
const DEPTH = 132;
const BEVEL = 11;

export type Three = typeof import('three');
type SVGLoaderCtor = (typeof import('three/examples/jsm/loaders/SVGLoader.js'))['SVGLoader'];

export interface MarkModules {
  THREE: Three;
  SVGLoader: SVGLoaderCtor;
  markSvg: string;
}

/** three, the SVG loader and the mark file — fetched together, once per mount. */
export async function importMark(): Promise<MarkModules> {
  const [THREE, loaderMod, markSvg] = await Promise.all([
    import('three'),
    import('three/examples/jsm/loaders/SVGLoader.js'),
    fetch(MARK_SRC).then((r) => {
      if (!r.ok) throw new Error('mark ' + r.status);
      return r.text();
    }),
  ]);
  return { THREE, SVGLoader: loaderMod.SVGLoader, markSvg };
}

/**
 * The room the mark is lit by, made rather than loaded: a canvas with a soft
 * sky, a floor and three softboxes, run through PMREM. Nothing is fetched.
 *
 * An environment map does the work lights would, at a fraction of the cost —
 * there are no lights in any of these scenes, and no shadows.
 */
export function buildEnvironment(
  THREE: Three,
  renderer: import('three').WebGLRenderer,
): import('three').Texture {
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
  return envMap;
}

export interface BuiltMark {
  /** The mark, normalised to one unit tall and centred on its own middle. */
  inner: import('three').Group;
  /** Its width and height in those units, for fitting it to a box on the page. */
  width: number;
  height: number;
  dispose(): void;
}

/**
 * Parse the mark and extrude it.
 *
 * SVGLoader reads presentation attributes and inline styles, not a `<style>`
 * block — and this file colours its paths by class. So the class-to-fill map is
 * read off the stylesheet here and applied by hand.
 */
export function buildMark(THREE: Three, SVGLoader: SVGLoaderCtor, markSvg: string): BuiltMark {
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
        /* Enough metal to catch the softboxes along the bevels and read as a
           solid object; not so much that the brand colour goes grey. */
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

  /* SVG counts y downward. Flip it, normalise the mark to one unit tall, and
     sit it on its own centre so every rotation is about the middle of the X
     rather than a corner of its viewBox. */
  inner.scale.set(1, -1, 1);
  inner.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(inner);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());
  const unit = 1 / Math.max(size.y, 1);
  inner.scale.multiplyScalar(unit);
  inner.position.set(-centre.x * unit, -centre.y * unit, -centre.z * unit);

  return {
    inner,
    width: size.x * unit,
    height: size.y * unit,
    dispose() {
      geometries.forEach((g) => g.dispose());
      materials.forEach((mat) => mat.dispose());
    },
  };
}
