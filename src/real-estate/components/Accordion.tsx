'use client';

/**
 * The two accordions: the process steps on the navy panel, and the FAQ list.
 *
 * One component, two skins, because the behaviour is identical and only the
 * chrome differs. Open state is real React state and the panel heights come from
 * a CSS max-height transition, so there is no measuring and no layout thrash.
 * The trade-off is the max-height ceiling in the stylesheet — long enough for
 * the copy these carry, and stated there so it can be raised.
 *
 * Accessibility: each header is a real <button> with aria-expanded pointing at
 * its panel, and the panel is hidden from the accessibility tree while closed.
 * Clicking an open row closes it — everything collapsed is a valid state, not a
 * dead end.
 */
import { useId, useState } from 'react';

export interface AccordionItem {
  /** '01' … '04'. Rendered, so it is copy rather than an index. */
  number?: string;
  title: string;
  body: string;
}

export default function Accordion({
  items,
  variant = 'faq',
  /** Index open on first paint. -1 leaves them all closed. */
  initial = 0,
}: {
  items: AccordionItem[];
  variant?: 'faq' | 'steps';
  initial?: number;
}) {
  const [open, setOpen] = useState(initial);
  const uid = useId();
  const steps = variant === 'steps';

  return (
    <div className={steps ? 'vxn-re-steps' : 'vxn-re-faqs'}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-p${i}`;
        const btnId = `${uid}-b${i}`;
        return (
          <div
            key={item.title}
            className={steps ? 'vxn-re-step' : 'vxn-re-faq'}
            data-open={isOpen ? 'true' : 'false'}
          >
            <button
              type="button"
              id={btnId}
              className={steps ? 'vxn-re-step__btn' : 'vxn-re-faq__btn'}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              {steps && item.number ? <span className="vxn-re-step__num">{item.number}</span> : null}
              <span>{item.title}</span>
              <span className={steps ? 'vxn-re-step__sign' : 'vxn-re-faq__sign'} aria-hidden="true" />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={steps ? 'vxn-re-step__body' : 'vxn-re-faq__body'}
              /* inert while closed, so the copy is not read out or tabbed into */
              aria-hidden={!isOpen}
            >
              <p>{item.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
