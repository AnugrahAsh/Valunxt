'use client';

/**
 * The two accordions: the process steps and the FAQ list.
 *
 * One component, two skins, because the behaviour is identical and the only
 * differences are chrome. `variant="steps"` renders the numbered dark panel on
 * the process section; `variant="faq"` renders the bordered light list.
 *
 * Open state is real React state and the panel heights come from a CSS
 * max-height transition, so there is no measuring, no layout thrash and no
 * dependency. The trade-off is the max-height ceiling in the stylesheet — long
 * enough for the copy these carry, and stated there so it can be raised.
 *
 * Accessibility: each header is a real <button> with aria-expanded pointing at
 * its panel, and the panel is hidden from the a11y tree while closed.
 */
import { useId, useState } from 'react';
import { Chevron } from './icons';

export interface AccordionItem {
  /** Shown on the left of the header row. Optional; steps use it, FAQs do not. */
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

  const isSteps = variant === 'steps';

  return (
    <div className={isSteps ? 're-steps' : 're-faq__list'}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-p${i}`;
        const btnId = `${uid}-b${i}`;
        return (
          <div
            key={item.title}
            className={isSteps ? 're-step' : 're-faq__item'}
            data-open={isOpen ? 'true' : 'false'}
          >
            <button
              type="button"
              id={btnId}
              className={isSteps ? 're-step__btn' : 're-faq__btn'}
              aria-expanded={isOpen}
              aria-controls={panelId}
              /* Clicking the open row closes it — a section with everything
                 collapsed is a valid state, not a dead end. */
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>
                {item.number ? `${item.number}. ` : ''}
                {item.title}
              </span>
              {isSteps ? (
                <span className="re-step__chev" aria-hidden="true">
                  <Chevron />
                </span>
              ) : (
                <span className="re-faq__sign" aria-hidden="true" />
              )}
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={isSteps ? 're-step__body' : 're-faq__body'}
              /* inert while closed so the copy is not read out or tabbed into */
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
