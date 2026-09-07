/**
 * Research & Intelligence's two own sections.
 *
 * A — "Where a number comes from." The provenance chain, drawn as one: four
 * stages joined left to right. A research practice's whole claim is that its
 * figures can be traced, so the section is the trace.
 *
 * B — "What we will not publish." The negative space. Anyone can list what they
 * produce; saying what you refuse to produce is the part that is hard to copy,
 * and it is the reason to trust the rest.
 */
const CHAIN: [string, string][] = [
  ['Source', 'Registry filings, trustee records, our own transactions'],
  ['Verify', 'Two independent confirmations, or it does not run'],
  ['Method', 'Written down before the number, not after it'],
  ['Publish', 'With the date, the sample and the limits attached'],
];

export function ResearchProvenance() {
  return (
    <section className="vxb vxb-prov" id="vxd-tool" aria-labelledby="vxb-prov-h">
      <div className="vxh__in">
        <h2 className="vxh-h2 vxb-prov__h" id="vxb-prov-h">
          Every figure we publish{' '}
          <span className="vxh-em">can be walked back to where it came from.</span>
        </h2>
        <ol className="vxb-prov__chain">
          {CHAIN.map(([t, d], i) => (
            <li data-vxn-in="up" key={t}>
              <span className="vxb-prov__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="vxb-prov__t">{t}</span>
              <span className="vxb-prov__d">{d}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const NEVER: string[] = [
  'A number without its date',
  'A forecast without its assumptions',
  'A sample too small to name',
  'Research for a party to the deal',
];

export function ResearchNever() {
  return (
    <section className="vxb vxb-never vxh-dark" aria-labelledby="vxb-never-h">
      <div className="vxh__in">
        <h2 className="vxh-h2 vxb-never__h" id="vxb-never-h">
          Four things we will not publish.
        </h2>
        <ul className="vxb-never__list">
          {NEVER.map((n) => (
            <li data-vxn-in="up" key={n}>
              <s>{n}</s>
            </li>
          ))}
        </ul>
        <p className="vxb-never__f">
          Independence is not a value on a wall. It is a list of things you turn down.
        </p>
      </div>
    </section>
  );
}
