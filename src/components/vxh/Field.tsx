/**
 * The animated grounds, named.
 *
 * ShaderField takes a fragment and four colours, which is the right interface
 * for a shader and the wrong one for a page — six pages each picking their own
 * four hex values is how a palette stops being a palette. So the combinations
 * the site actually uses are named here, and a section asks for a tone.
 *
 * Four tones, two shaders. `ink` and `slate` are the dark grounds: white type
 * over moving cobalt. `paper` and `mist` are their light counterparts, turned
 * right down so body copy still reads over them — those two are what goes
 * behind a hero. Reach for a dark one only where the section is already dark,
 * because the shader paints the whole box.
 *
 * ShaderField is a client component and this is a thin pass-through, so a
 * server-rendered section can drop one in without a boundary of its own. It
 * renders nothing under reduced motion or without WebGL: whatever ground the
 * section paints underneath is what shows.
 */
import ShaderField from '@/components/sections/backgrounds/ShaderField';
import { DRIFT_FRAGMENT, LATTICE_FRAGMENT } from '@/components/sections/backgrounds/shaders';

export type FieldTone = 'ink' | 'slate' | 'paper' | 'mist';

const TONES: Record<
  FieldTone,
  { fragment: string; colors: [string, string, string, string]; intensity: number }
> = {
  /* Deep navy → cobalt → the bright end → a whisper of ice. */
  ink: { fragment: DRIFT_FRAGMENT, colors: ['#04102F', '#0B2DBE', '#2F63FF', '#9DB4FF'], intensity: 0.8 },
  /* The same drift, colder and flatter — for a dark band that carries a table. */
  slate: { fragment: LATTICE_FRAGMENT, colors: ['#050D26', '#0B2DBE', '#2F63FF', '#DCE4FF'], intensity: 0.62 },
  /* White ground, so the ribbons read as a tint rather than a picture. */
  paper: { fragment: DRIFT_FRAGMENT, colors: ['#FFFFFF', '#DCE4FF', '#8FA9FF', '#EEF2FF'], intensity: 0.5 },
  /* The lattice at its lightest: structure you notice only if you look for it. */
  mist: { fragment: LATTICE_FRAGMENT, colors: ['#FFFFFF', '#E8EDFF', '#B9C8FF', '#F6F4EF'], intensity: 0.42 },
};

export default function Field({
  tone = 'paper',
  className = 'vxh-field',
}: {
  tone?: FieldTone;
  className?: string;
}) {
  const t = TONES[tone] ?? TONES.paper;
  return (
    <ShaderField
      className={className}
      fragment={t.fragment}
      colors={t.colors}
      intensity={t.intensity}
    />
  );
}
