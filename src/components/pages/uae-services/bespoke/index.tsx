/**
 * The two sections each practice page owns.
 *
 * The template around them is shared — the same hero, the same overview, the
 * same process, the same FAQ — so six pages read as one family. These are the
 * two places where a page is allowed to be nothing like the other five: the
 * argument only that practice can make, drawn the way only it needs drawing.
 *
 * `A` sits where the shared tool used to, between the services offered and what
 * you receive; `B` closes the body, before the FAQ. A practice with nothing
 * here keeps the template's own sections, so no page is ever a hole.
 *
 * ONE IDEA EACH, AND NO MORE. The first pass answered "make each page unique"
 * by adding furniture, and the pages came out longer and denser rather than
 * better. Unique is not the same as more: every section here is one question or
 * one list, set large, on a lot of air. Three of the six carry a live ground
 * from the ogl field; the rest are white, so the page has one dark band at
 * most.
 */
import type { ReactNode } from 'react';

import AccountingYear from './AccountingYear';
import AccountingClose from './AccountingClose';
import { RealEstateCosts, RealEstatePath } from './RealEstate';
import { MortgageBorrow, MortgageRate } from './Mortgages';
import { ValuationReport, ValuationAccepted } from './Valuation';
import { ResearchProvenance, ResearchNever } from './Research';
import { TechPipeline, TechRules } from './Technology';

export interface Bespoke {
  A?: ReactNode;
  B?: ReactNode;
}

/** Keyed by practice slug. */
export function bespokeFor(slug: string): Bespoke {
  switch (slug) {
    case 'accounting-and-tax-services':
      return { A: <AccountingYear />, B: <AccountingClose /> };
    case 'real-estate-transactions':
      return { A: <RealEstateCosts />, B: <RealEstatePath /> };
    case 'mortgage-services':
      return { A: <MortgageBorrow />, B: <MortgageRate /> };
    case 'valuation-and-advisory':
      return { A: <ValuationReport />, B: <ValuationAccepted /> };
    case 'research-and-intelligence':
      return { A: <ResearchProvenance />, B: <ResearchNever /> };
    case 'technology-data-and-ai':
      return { A: <TechPipeline />, B: <TechRules /> };
    default:
      return {};
  }
}
