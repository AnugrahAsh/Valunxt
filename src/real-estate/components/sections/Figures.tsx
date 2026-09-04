/**
 * The figures band — 50K+ / 48+ / 6+.
 *
 * Three dark tiles separated by a 1px grid gap rather than borders, so the
 * dividers stay hairline at any zoom and disappear cleanly when the grid
 * collapses to one column.
 */
import { FIGURES } from '../../data/home';
import { FIGURE_ICONS } from '../icons';

export default function Figures() {
  return (
    <section className="re-section re-section--tight">
      <div className="re-wrap">
        <div className="re-figs">
          {FIGURES.map((f, i) => {
            const Icon = FIGURE_ICONS[i % FIGURE_ICONS.length]!;
            return (
              <div className="re-fig" key={f.label}>
                <Icon className="re-fig__icon" />
                <p className="re-fig__value">{f.value}</p>
                <p className="re-fig__label">{f.label}</p>
                {f.detail ? <p className="re-fig__detail">{f.detail}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
