/**
 * The two fragment shaders behind tabs two and three of "Find the right
 * solution". The first tab uses GradientBlinds, which ships its own.
 *
 * All three are deliberately different abstracts, so switching tab is a change
 * you cannot miss: vertical light shafts, then flowing diagonal ribbons, then a
 * measured lattice. The palette is the brand's — white ground, cobalt, a pale
 * blue and a very light violet, with near-black used only as the lattice's ink.
 *
 * Uniform contract (see ShaderField): iResolution, iMouse (pixels, y-up), iTime,
 * uIntensity, and four colour stops uColor0..uColor3.
 */

const COMMON = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;
uniform float uIntensity;
uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;

varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 x){
  vec2 p = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(p), b = hash(p + vec2(1.0, 0.0));
  float c = hash(p + vec2(0.0, 1.0)), d = hash(p + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
`;

/**
 * Tab two — "Drift".
 *
 * Wide ribbons pouring diagonally across the frame, built from layered value
 * noise and folded so each band has a bright edge. Nothing repeats: the fold
 * positions move on their own, and the pointer bends the flow around itself, so
 * the ribbons part as you move through them. Reads as light through water, which
 * is as far from the first tab's hard vertical shafts as the same palette gets.
 */
export const DRIFT_FRAGMENT = `${COMMON}
void main(){
  vec2 uv = vUv;
  float aspect = iResolution.x / max(iResolution.y, 1.0);
  vec2 p = uv;
  p.x *= aspect;

  vec2 m = iMouse / iResolution.xy;
  m.x *= aspect;

  float t = iTime * 0.05;

  /* The pointer bends the field around itself rather than lighting it: the
     closer it is, the more the ribbons are pushed aside. */
  vec2 toM = p - m;
  float pull = exp(-dot(toM, toM) * 3.2);
  p += normalize(toM + 1e-5) * pull * 0.14;

  /* Diagonal flow: the axis the bands travel along. */
  float axis = (p.x * 0.72 + p.y * 0.68);

  float n1 = fbm(vec2(axis * 2.1 - t * 1.6, p.y * 1.5 + t * 0.5));
  float n2 = fbm(vec2(axis * 3.4 + t * 1.1, p.y * 2.3 - t * 0.7) + n1 * 1.4);

  /* Fold the field so each band gets a crisp edge and a soft body. */
  float bands = fract(axis * 2.6 + n1 * 1.35 + n2 * 0.5 + t * 0.6);
  float edge = smoothstep(0.0, 0.14, bands) * smoothstep(1.0, 0.72, bands);
  float body = smoothstep(0.15, 0.95, n2);

  vec3 col = uColor0;
  col = mix(col, uColor1, body * 0.85);
  col = mix(col, uColor2, edge * 0.7);
  col = mix(col, uColor3, pow(edge, 2.2) * 0.55 * (0.4 + body));

  /* A wash toward the ground colour at the edges, so the panel's copy always
     has quiet to sit on. */
  float vign = smoothstep(1.15, 0.25, length((uv - 0.5) * vec2(aspect, 1.0)) * 1.6);
  col = mix(uColor0, col, vign * uIntensity);

  col += (hash(gl_FragCoord.xy + iTime) - 0.5) * 0.012;
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Tab three — "Lattice".
 *
 * A measured grid of dots with a ruled line every fourth column, and a ripple
 * that travels out from the pointer and keeps travelling after it stops. The
 * dots swell where the ripple passes. Where the other two tabs are weather, this
 * one is instrumentation — the right register for the tab about testing a case
 * before committing capital.
 */
export const LATTICE_FRAGMENT = `${COMMON}
void main(){
  vec2 uv = vUv;
  float aspect = iResolution.x / max(iResolution.y, 1.0);
  vec2 p = uv;
  p.x *= aspect;

  vec2 m = iMouse / iResolution.xy;
  m.x *= aspect;

  float t = iTime;

  /* Rings leaving the pointer, plus a slow tide across the whole field so the
     lattice is never completely still. */
  float d = length(p - m);
  float ripple = sin(d * 26.0 - t * 2.4) * exp(-d * 2.6);
  float tide = sin((p.x * 1.6 + p.y * 1.1) * 3.0 - t * 0.5) * 0.5 + 0.5;

  float cells = 26.0;
  vec2 g = p * cells;
  vec2 id = floor(g);
  vec2 f = fract(g) - 0.5;

  /* Dot size: base, plus the tide, plus the ripple as it passes through. */
  float radius = 0.11 + tide * 0.05 + ripple * 0.16;
  radius = max(radius, 0.02);
  float aa = 2.0 / min(iResolution.x, iResolution.y) * cells;
  float dot = 1.0 - smoothstep(radius - aa, radius + aa, length(f));

  /* A ruled line every fourth column and row — the grid the dots sit on. */
  float rule = 0.0;
  rule += (1.0 - smoothstep(0.0, 0.018, abs(fract(p.x * cells / 4.0) - 0.5) / (cells / 4.0)));
  rule += (1.0 - smoothstep(0.0, 0.018, abs(fract(p.y * cells / 4.0) - 0.5) / (cells / 4.0)));
  rule = clamp(rule, 0.0, 1.0) * 0.5;

  /* Depth: the dots nearest the pointer read darkest. */
  float near = exp(-d * 1.9);
  vec3 ink = mix(uColor2, uColor3, clamp(near + max(ripple, 0.0) * 0.8, 0.0, 1.0));

  vec3 col = uColor0;
  col = mix(col, uColor1, rule * 0.5);
  col = mix(col, ink, dot * (0.30 + near * 0.55 + max(ripple, 0.0) * 0.4));

  float vign = smoothstep(1.25, 0.3, length((uv - 0.5) * vec2(aspect, 1.0)) * 1.55);
  col = mix(uColor0, col, vign * uIntensity);

  col += (hash(gl_FragCoord.xy + iTime) - 0.5) * 0.01;
  gl_FragColor = vec4(col, 1.0);
}
`;
