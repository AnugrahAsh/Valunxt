/**
 * The long-form copy for the UAE service pages — everything the detail template
 * shows beyond the name, lede and sub-service list in UAE_SERVICES.
 *
 * Keys are the practice slug ("mortgage-services") or "practice/sub-service"
 * ("mortgage-services/refinancing"). Each entry:
 *
 *   what        the "What We Do" split — heading and two paragraphs
 *   offer       the "Services Offered" grid — heading, lede and the text on the
 *               one solid-blue card
 *   process     the "Our Process" panel — heading, lede and four steps, each a
 *               [title, one-line explanation] pair
 *   expertise   the sentences behind the "Expertise" tiles, written as
 *               "Label: sentence." so the template can split them
 *   integrated  the lede beside the other five practices
 *
 * A sub-service with no entry inherits its practice's copy, keeping its own
 * name and lede — so no page is ever a placeholder.
 *
 * Port of data/services-uae-detail.php.
 */

export interface UaeServiceDetail {
  what: { title: string; p: string[] };
  offer: { title: string; text: string; card: string };
  /** Each step is a [title, explanation] pair. */
  process: { title: string; text: string; steps: string[][] };
  expertise: string;
  integrated: string;
}

const UAE_SERVICE_DETAIL: Record<string, UaeServiceDetail> = {
  'accounting-and-tax-services': {
    what: {
      title: 'Books you can hand to any auditor, any day.',
      p: [
        'Good decisions start with clean books. We maintain your accounts to IFRS standards, reconcile every figure and report with clarity — from day-to-day bookkeeping to part-time CFO leadership, audit support and board-ready financial statements.',
        'UAE tax rules are unforgiving and FTA penalties are real. Our tax team handles the complete lifecycle — registration, impact assessment, return filing, transfer pricing documentation and audit support — so your business stays penalty-free and fully protected under Federal Decree-Law No. 47 of 2022.',
      ],
    },
    offer: {
      title: 'Accounting &amp; Tax, End to End',
      text: 'Accurate books, clear reporting and reliable financial operations — managed end to end so you always know exactly where you stand, with full FTA compliance across corporate tax, VAT and transfer pricing.',
      card: 'IFRS-standard books, closed by day five, at a fixed monthly fee — and every tax position documented as if the audit letter arrives tomorrow.',
    },
    process: {
      title: 'The Same Discipline on Every Engagement',
      text: 'Fixed fees agreed up front. A senior adviser on every engagement. Day-5 month-end close — management accounts on your desk. FTA-registered processes, fixed fees.',
      steps: [
        [
          'Setup &amp; review',
          'We assess your current books, clear backlogs and set up a chart of accounts that fits the business',
        ],
        [
          'Run the rhythm',
          'Monthly bookkeeping, reconciliations and payroll processed accurately and on schedule',
        ],
        [
          'Report',
          'Management accounts and financial statements your leadership actually reads — closed by day five',
        ],
        [
          'Advise',
          'Quarterly reviews, budgets and forecasts that turn the numbers into decisions',
        ],
      ],
    },
    expertise: 'IFRS-standard books: every ledger maintained to international standards — ready for VAT, corporate tax and audit. Senior oversight: qualified accountants review every close, with a part-time CFO option when you need leadership. Fixed monthly fee: predictable cost for a complete finance function — no hourly meters. Penalties avoided: late corporate tax registration alone carries an AED 10,000 penalty, and we keep you ahead of every deadline. One tax team: corporate tax, VAT, transfer pricing and international tax under one accountable engagement. FTA-ready always: positions documented and defensible — prepared as if the audit letter arrives tomorrow.',
    integrated: 'Accounting and Tax works alongside our transactions, mortgage, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'accounting-and-tax-services/accounting-and-bookkeeping': {
    what: {
      title: 'Bookkeeping, Done Right',
      p: [
        'Every invoice, receipt and bank line recorded and reconciled on time — accurate, VAT-ready books maintained to IFRS so nothing slips and your numbers are always current.',
        'Clean books are the foundation of everything else. We record and reconcile your daily transactions, keep accounts payable and receivable current, and hand you reliable numbers ready for reporting, VAT and year-end. From maintaining your ledgers to closing the month and preparing audit-ready statements, our senior accountants run the full accounting function to IFRS standards.',
      ],
    },
    offer: {
      title: 'Accounting Services, End to End',
      text: 'Your complete finance function, run to IFRS at a fixed monthly fee — bookkeeping, reconciliations, payroll, management reporting and audit-ready working papers, with management accounts on your desk by day five.',
      card: 'Every balance reconciled, every month. IFRS treatment on every ledger. A qualified accountant reviews each close. Audit-ready working papers, always.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Fixed fees agreed up front. A senior adviser on every engagement. Engagements are scoped by a senior adviser, priced as a fixed fee before work begins, and delivered by the same team that answers when you call.',
      steps: [
        [
          'Setup &amp; review',
          'We assess your current books, clear backlogs and set up a chart of accounts that fits the business',
        ],
        [
          'Run the rhythm',
          'Monthly bookkeeping, reconciliations and payroll processed accurately and on schedule',
        ],
        [
          'Report',
          'Management accounts and financial statements your leadership actually reads — closed by day five',
        ],
        [
          'Advise',
          'Quarterly reviews, budgets and forecasts that turn the numbers into decisions',
        ],
      ],
    },
    expertise: 'IFRS-standard books: every ledger maintained to international standards — ready for VAT, corporate tax and audit. Senior oversight: qualified accountants review every close, with a part-time CFO option when you need leadership. Fixed monthly fee: predictable cost for a complete finance function — no hourly meters. Backlog reconstruction is a common first phase: we rebuild the ledgers from bank statements and source documents, reconcile everything, then move you onto a clean monthly rhythm. We work inside Zoho Books, QuickBooks, Xero, Tally and most major ERPs.',
    integrated: 'Accounting and Tax works alongside our transactions, mortgage, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'accounting-and-tax-services/corporate-tax-services': {
    what: {
      title: 'Corporate Tax, End to End',
      p: [
        'UAE corporate tax at 9% is here — and the deadlines are unforgiving. From registration to return filing, advisory and FTA audit support, we keep your business compliant under Federal Decree-Law No. 47 of 2022, on fixed fees.',
        'From the day you register to every return you file, we run the full UAE corporate tax lifecycle — impact assessment, registration, return filing, ongoing advisory, deregistration and FTA audit support — so your business stays penalty-free and fully protected. Revenue under AED 3 million? Small Business Relief now runs to 2029, and we check your eligibility as part of the engagement.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Corporate tax registration handled correctly and ahead of the deadline; impact assessment so you know exactly what corporate tax means for your structure and margins; returns prepared from reconciled numbers and filed on time; ongoing counsel on structures, transactions and elections; clean deregistration; and representation and defence when the FTA asks questions.',
      card: 'Late corporate tax registration alone carries an AED 10,000 penalty. We keep you ahead of every deadline.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Prepared as if the audit letter arrives tomorrow. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Assess',
          'A senior review of your registrations, filings and exposures — where you stand today, stated plainly',
        ],
        [
          'Register',
          'Corporate tax, VAT and TRC registrations completed correctly and ahead of every FTA deadline',
        ],
        [
          'File',
          'Returns prepared from reconciled numbers and filed on time — no scrambles, no penalties',
        ],
        [
          'Defend',
          'Ongoing advisory, health checks and audit support whenever the FTA asks questions',
        ],
      ],
    },
    expertise: 'Penalties avoided: late corporate tax registration alone carries an AED 10,000 penalty, and we keep you ahead of every deadline. One tax team: corporate tax, VAT, transfer pricing and international tax under one accountable engagement. FTA-ready always: positions documented and defensible — prepared as if the audit letter arrives tomorrow. We act for mainland, free zone and offshore entities across the UAE; free zone rules, including Qualifying Free Zone Person status, are assessed explicitly since they change both the tax position and the documentation required.',
    integrated: 'Accounting and Tax works alongside our transactions, mortgage, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'accounting-and-tax-services/vat-services': {
    what: {
      title: 'VAT Returns That Reconcile to Your Books',
      p: [
        'VAT touches every invoice you issue and receive. We run the complete compliance cycle so returns are right, on time and reconciled to your books.',
        'Our core VAT service covers the full quarterly (or monthly) cycle: transaction review, input tax recovery checks, return preparation, filing and payment planning — with your VAT ledger reconciled to the accounting records every period. Around the cycle sits the advisory that keeps you out of trouble: place-of-supply questions, zero-rating evidence, reverse charge treatment, designated zone rules and invoice compliance.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'VAT return preparation and filing, input tax recovery review, output tax and place-of-supply analysis, VAT ledger reconciliation, tax invoice compliance checks and ongoing VAT advisory — plus registration, de-registration, health checks, reconsideration and voluntary disclosure when they are needed.',
      card: 'Every position documented and defensible. Deadlines tracked firm-wide, never per person. Reconciled numbers behind every return. Senior review before anything is filed.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Late filing starts at AED 1,000 (AED 2,000 on repetition) plus percentage-based penalties on late payment that escalate quickly — accuracy and timing both matter. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Assess',
          'A senior review of your registrations, filings and exposures — where you stand today, stated plainly',
        ],
        [
          'Register',
          'Corporate tax, VAT and TRC registrations completed correctly and ahead of every FTA deadline',
        ],
        [
          'File',
          'Returns prepared from reconciled numbers and filed on time — no scrambles, no penalties',
        ],
        [
          'Defend',
          'Ongoing advisory, health checks and audit support whenever the FTA asks questions',
        ],
      ],
    },
    expertise: 'Penalties avoided: late corporate tax registration alone carries an AED 10,000 penalty, and we keep you ahead of every deadline. One tax team: corporate tax, VAT, transfer pricing and international tax under one accountable engagement. FTA-ready always: positions documented and defensible — prepared as if the audit letter arrives tomorrow. We can take over VAT mid-year: we review the open periods, correct what needs correcting — via voluntary disclosure where required — and run the cycle from the next return.',
    integrated: 'Accounting and Tax works alongside our transactions, mortgage, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'accounting-and-tax-services/cfo-services': {
    what: {
      title: 'CFO-Level Judgement, a Few Days a Month',
      p: [
        'CFO-level judgement — cash strategy, banking relationships, board reporting — for a fraction of a full-time hire. Growing businesses hit questions bookkeeping can\'t answer: how much cash the growth plan really needs, which financing to take, what the board pack should say, when to hire finance staff. Our part-time CFO service puts an experienced finance leader in your business for the days you need.',
        'The engagement flexes with you — heavier during fundraising, budgeting or a crisis; lighter in steady state — while giving lenders and investors a credible senior counterpart. Accounting records and reports what happened; a CFO decides what should happen next. Most clients combine both — our accountants run the books, the CFO runs the strategy.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Cash flow strategy and 13-week forecasting, board and investor reporting, banking and financing relationships, budgeting and KPI frameworks, finance team design and oversight, and fundraising and diligence support.',
      card: 'Anywhere from two days a month to two days a week. We agree a fixed monthly scope and adjust it as the business changes.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Fixed fees agreed up front. A senior adviser on every engagement. Engagements are scoped by a senior adviser, priced as a fixed fee before work begins, and delivered by the same team that answers when you call.',
      steps: [
        [
          'Setup &amp; review',
          'We assess your current books, clear backlogs and set up a chart of accounts that fits the business',
        ],
        [
          'Run the rhythm',
          'Monthly bookkeeping, reconciliations and payroll processed accurately and on schedule',
        ],
        [
          'Report',
          'Management accounts and financial statements your leadership actually reads — closed by day five',
        ],
        [
          'Advise',
          'Quarterly reviews, budgets and forecasts that turn the numbers into decisions',
        ],
      ],
    },
    expertise: 'IFRS-standard books: every ledger maintained to international standards — ready for VAT, corporate tax and audit. Senior oversight: qualified accountants review every close, with a part-time CFO option when you need leadership. Fixed monthly fee: predictable cost for a complete finance function — no hourly meters.',
    integrated: 'Accounting and Tax works alongside our transactions, mortgage, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'accounting-and-tax-services/financial-reporting': {
    what: {
      title: 'Financial Reporting, Board-Ready',
      p: [
        'Board-ready financial statements and management reports, prepared to IFRS from fully reconciled numbers — so leadership, lenders and auditors all see the same clear, defensible picture. Numbers only help when they are clear and trusted: we turn reconciled ledgers into IFRS financial statements, management accounts and board packs that stand up to auditors, lenders and investors.',
        'Numbers only matter if they arrive in time to act on. We design and produce a monthly reporting pack around what your business actually runs on: profitability by line, cash and runway, working capital, budget variances and the handful of KPIs that predict your next quarter — each with a short written commentary on what moved, why, and what deserves a decision.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Monthly P&amp;L, balance sheet and cash flow; KPI dashboard design; budget-versus-actual variance analysis; segment and project profitability; written performance commentary; board pack preparation; and IFRS financial statements ready for auditors, banks and the FTA.',
      card: 'Monthly packs your leadership actually reads — closed and delivered by day five.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Fixed fees agreed up front. A senior adviser on every engagement. Engagements are scoped by a senior adviser, priced as a fixed fee before work begins, and delivered by the same team that answers when you call.',
      steps: [
        [
          'Setup &amp; review',
          'We assess your current books, clear backlogs and set up a chart of accounts that fits the business',
        ],
        [
          'Run the rhythm',
          'Monthly bookkeeping, reconciliations and payroll processed accurately and on schedule',
        ],
        [
          'Report',
          'Management accounts and financial statements your leadership actually reads — closed by day five',
        ],
        [
          'Advise',
          'Quarterly reviews, budgets and forecasts that turn the numbers into decisions',
        ],
      ],
    },
    expertise: 'IFRS-standard books: every ledger maintained to international standards — ready for VAT, corporate tax and audit. Senior oversight: qualified accountants review every close, with a part-time CFO option when you need leadership. Fixed monthly fee: predictable cost for a complete finance function — no hourly meters. System reports show balances; management reporting explains performance. We structure the chart of accounts and dimensions so profitability is visible at the level you manage: project, branch, product line or client.',
    integrated: 'Accounting and Tax works alongside our transactions, mortgage, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'real-estate-transactions': {
    what: {
      title: 'One side of the table. Yours.',
      p: [
        'For acquisitions and disposals of property and investment assets, we act as your transaction team: testing price against market evidence, coordinating technical and financial due diligence, structuring the deal and managing execution through to handover.',
        'One interest is represented throughout — yours. No listing commissions, no double agency, no pressure to close the wrong deal. Every deal is grounded in verified market data — pay too much or sell too low and the market keeps the difference.',
      ],
    },
    offer: {
      title: 'Transaction Advisory, End to End',
      text: 'End-to-end support across property and investment transactions — priced on evidence, diligenced properly and managed cleanly from first offer to final handover: evidence-based pricing and offer strategy, financial and commercial due diligence, technical diligence coordination, deal structuring and negotiation, documentation through completion and post-completion handover management.',
      card: 'Every deal priced on verified evidence. Bank-grade information packs. Your interest alone at the table. Fixed fees agreed before the mandate.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Engagements are scoped by a senior adviser, priced as a fixed fee before work begins, and delivered by the same team that answers when you call.',
      steps: [
        [
          'Brief &amp; strategy',
          'We understand the objective, test it against the market and agree the plan',
        ],
        [
          'Prepare &amp; shortlist',
          'Financials, information packs and counterparties readied — priced on evidence',
        ],
        [
          'Structure &amp; negotiate',
          'Terms structured and negotiated with your interest alone at the table',
        ],
        [
          'Manage &amp; close',
          'Diligence, documentation and completion managed cleanly to handover',
        ],
      ],
    },
    expertise: 'Evidence-priced: every deal grounded in verified market data — pay too much or sell too low and the market keeps the difference. Bank-ready packs: financing applications prepared to the standard UAE lenders actually approve. Conflict-free: we are not brokers chasing a spread — fixed advisory fees, your side only. Brokers are paid to complete transactions; we are paid to protect your interest in one — and the diligence discipline is identical for acquisitions and disposals, because sellers who pre-empt buyer findings keep control of price.',
    integrated: 'Real Estate Transactions works alongside our accounting, mortgage, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'real-estate-transactions/buy-property': {
    what: {
      title: 'Keep the Evidence on Your Side of the Table',
      p: [
        'Buying a property or investment asset is the fastest way to grow — and the fastest way to overpay. Buy-side advisory keeps the evidence on your side of the table.',
        'We represent acquirers through the full cycle: defining criteria, sourcing and approaching targets, valuing on evidence, structuring offers, coordinating due diligence and negotiating to completion. Our valuation and tax teams sit inside the deal team — so price, structure and post-deal integration are tested together, not sequentially.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Acquisition criteria and target search, target screening and approach, valuation and offer strategy, due diligence coordination, sale-and-purchase negotiation support, and completion and integration planning — including direct, discreet approaches to off-market assets that never reach a process.',
      card: 'Fixed and milestone-based advisory fees agreed up front — we deliberately avoid pure success-fee structures that pressure advisers toward any deal over the right deal.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Engagements are scoped by a senior adviser, priced as a fixed fee before work begins, and delivered by the same team that answers when you call.',
      steps: [
        [
          'Brief &amp; strategy',
          'We understand the objective, test it against the market and agree the plan',
        ],
        [
          'Prepare &amp; shortlist',
          'Financials, information packs and counterparties readied — priced on evidence',
        ],
        [
          'Structure &amp; negotiate',
          'Terms structured and negotiated with your interest alone at the table',
        ],
        [
          'Manage &amp; close',
          'Diligence, documentation and completion managed cleanly to handover',
        ],
      ],
    },
    expertise: 'Evidence-priced: every deal grounded in verified market data — pay too much or sell too low and the market keeps the difference. Bank-ready packs: financing applications prepared to the standard UAE lenders actually approve. Conflict-free: we are not brokers chasing a spread — fixed advisory fees, your side only.',
    integrated: 'Real Estate Transactions works alongside our accounting, mortgage, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'real-estate-transactions/sell-rent-lease-property': {
    what: {
      title: 'Preparation, Positioning and Competitive Tension',
      p: [
        'You sell an asset once. Preparation, positioning and competitive tension decide whether the market pays for what you built. We manage disposals end to end: preparing the asset for scrutiny, building the information memorandum and data room, running a discreet competitive process among qualified buyers and negotiating structure, price and terms to completion.',
        'A commercial lease is one of your largest long-term liabilities — or your asset\'s entire income. For landlords, we advise on leasing strategy, tenant covenant assessment and lease structures that protect asset value; for occupiers, we plan requirements, compare options on true total cost, and negotiate rents, incentives and flexibility with market evidence. Lease-versus-buy analysis and IFRS 16 implications are modelled alongside.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Exit readiness and value diagnostics, valuation and pricing strategy, information memorandum and data room build, qualified buyer identification and outreach, competitive process and negotiation management, landlord leasing strategy, rent and incentive negotiation, and renewal, rent review and exit advisory.',
      card: 'Anonymous teasers, staged disclosure under NDA and tightly controlled data room access — the process is designed so staff, customers and competitors learn only when you choose.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'The best exits start early — value-building and readiness work twelve to twenty-four months out routinely pays for itself many times over at the closing table. For lease renewals, start twelve months before expiry: options and leverage evaporate as the deadline approaches.',
      steps: [
        [
          'Brief &amp; strategy',
          'We understand the objective, test it against the market and agree the plan',
        ],
        [
          'Prepare &amp; shortlist',
          'Financials, information packs and counterparties readied — priced on evidence',
        ],
        [
          'Structure &amp; negotiate',
          'Terms structured and negotiated with your interest alone at the table',
        ],
        [
          'Manage &amp; close',
          'Diligence, documentation and completion managed cleanly to handover',
        ],
      ],
    },
    expertise: 'Evidence-priced: every deal grounded in verified market data — pay too much or sell too low and the market keeps the difference. Bank-ready packs: financing applications prepared to the standard UAE lenders actually approve. Conflict-free: we are not brokers chasing a spread — fixed advisory fees, your side only. We never act for landlord and tenant on the same transaction — single-interest representation is the point of the service.',
    integrated: 'Real Estate Transactions works alongside our accounting, mortgage, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'mortgage-services': {
    what: {
      title: 'The Right Property Finance Is More Than a Rate',
      p: [
        'Structure, covenants and valuation treatment decide what a loan really costs. We arrange and negotiate mortgage finance for residential investment, commercial property and development assets: preparing the credit pack, running the lender process competitively and negotiating terms that survive scrutiny beyond the headline rate.',
        'With RICS valuations available through Reliant Surveyors, the collateral case is built to the standard lenders trust — which shows up in leverage and pricing. Whether you are raising a mortgage, a corporate facility or structured debt, the difference between a good deal and a costly one is preparation.',
      ],
    },
    offer: {
      title: 'Property Finance, End to End',
      text: 'Financing strategy and leverage planning, bank-ready credit pack preparation, competitive lender process management, term negotiation beyond the headline rate, valuation coordination, and completion and drawdown management.',
      card: 'We run competitive processes across the major UAE lenders and are paid by you, not by lender commissions — so the recommendation is unconflicted.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Every engagement moves through four disciplined phases — each with deliverables you can hold in your hand, not promises. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Brief &amp; strategy',
          'We understand the objective, test it against the market and agree the plan',
        ],
        [
          'Prepare &amp; shortlist',
          'Financials, information packs and counterparties readied — priced on evidence',
        ],
        [
          'Structure &amp; negotiate',
          'Terms structured and negotiated with your interest alone at the table',
        ],
        [
          'Manage &amp; close',
          'Diligence, documentation and completion managed cleanly to handover',
        ],
      ],
    },
    expertise: 'Evidence-priced: every deal grounded in verified market data — pay too much or sell too low and the market keeps the difference. Bank-ready packs: financing applications prepared to the standard UAE lenders actually approve. Conflict-free: we are not brokers chasing a spread — fixed advisory fees, your side only. Refinancing existing property debt — repricing, releasing equity or restructuring covenants — is core work; we model break costs against savings before recommending a move.',
    integrated: 'Mortgage Services works alongside our accounting, transactions, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'mortgage-services/residential-mortgages': {
    what: {
      title: 'Mortgage Finance Negotiated Beyond the Headline Rate',
      p: [
        'The right property finance is more than a rate — structure, covenants and valuation treatment decide what the loan really costs. We arrange and negotiate mortgage finance for residential investment property: preparing the credit pack, running the lender process competitively and negotiating terms that survive scrutiny beyond the headline rate.',
        'With RICS valuations available through Reliant Surveyors, the collateral case is built to the standard lenders trust — which shows up in leverage and pricing.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Financing strategy and leverage planning, bank-ready credit pack preparation, competitive lender process management, term negotiation beyond the headline rate, valuation coordination, and completion and drawdown management.',
      card: 'We run competitive processes across the major UAE lenders and are paid by you, not by lender commissions — so the recommendation is unconflicted.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Every engagement moves through four disciplined phases — each with deliverables you can hold in your hand, not promises. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Brief &amp; strategy',
          'We understand the objective, test it against the market and agree the plan',
        ],
        [
          'Prepare &amp; shortlist',
          'Financials, information packs and counterparties readied — priced on evidence',
        ],
        [
          'Structure &amp; negotiate',
          'Terms structured and negotiated with your interest alone at the table',
        ],
        [
          'Manage &amp; close',
          'Diligence, documentation and completion managed cleanly to handover',
        ],
      ],
    },
    expertise: 'Evidence-priced: every deal grounded in verified market data — pay too much or sell too low and the market keeps the difference. Bank-ready packs: financing applications prepared to the standard UAE lenders actually approve. Conflict-free: we are not brokers chasing a spread — fixed advisory fees, your side only.',
    integrated: 'Mortgage Services works alongside our accounting, transactions, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'mortgage-services/commercial-mortgages': {
    what: {
      title: 'Facilities UAE Banks Approve',
      p: [
        'Commercial borrowing should fit the cash flows that repay it. We structure, package and negotiate property and corporate facilities UAE banks approve — for commercial property, development assets, working capital lines, trade finance, term loans and capex.',
        'We determine the right quantum and structure, prepare projections in the format credit committees expect and negotiate terms across competing lenders. Because our accounting team often maintains the underlying numbers, the credit story is consistent from management accounts to covenant model — which is precisely what banks price.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Debt capacity and structure analysis, credit pack and projection preparation, a multi-bank competitive process, covenant negotiation and headroom modelling, trade and working capital facilities, and annual review and renewal support.',
      card: 'Why do UAE banks decline good businesses? Usually presentation: unreconciled numbers, missing projections or an unclear repayment story. Packaging the case properly changes outcomes more than most borrowers expect.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Already been declined? We diagnose the decline, repair the file and re-approach the right lenders — a decline at one bank is rarely a verdict on the business. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Brief &amp; strategy',
          'We understand the objective, test it against the market and agree the plan',
        ],
        [
          'Prepare &amp; shortlist',
          'Financials, information packs and counterparties readied — priced on evidence',
        ],
        [
          'Structure &amp; negotiate',
          'Terms structured and negotiated with your interest alone at the table',
        ],
        [
          'Manage &amp; close',
          'Diligence, documentation and completion managed cleanly to handover',
        ],
      ],
    },
    expertise: 'Evidence-priced: every deal grounded in verified market data — pay too much or sell too low and the market keeps the difference. Bank-ready packs: financing applications prepared to the standard UAE lenders actually approve. Conflict-free: we are not brokers chasing a spread — fixed advisory fees, your side only.',
    integrated: 'Mortgage Services works alongside our accounting, transactions, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'mortgage-services/refinancing': {
    what: {
      title: 'The Layer of Debt That Fits',
      p: [
        'Beyond the standard bank loan sits a full spectrum of debt — structured, mezzanine, asset-backed and private credit. We advise on refinancing and debt raising across the capital structure: senior facilities, structured and asset-backed lending, mezzanine and private credit — for growth, acquisitions, refinancing and special situations where standard bank appetite runs out.',
        'The work spans sizing and structure, lender selection across banks and funds, competitive negotiation and covenant design your business can actually operate under. Repricing, releasing equity or restructuring covenants on existing property debt — we model break costs against savings before recommending a move.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Capital structure and quantum analysis, instrument selection across the debt spectrum, bank and private credit lender access, term sheet negotiation, intercreditor and security structuring, and refinancing and restructuring advisory.',
      card: 'Covenant resets, maturity extensions and refinancing under pressure are core work — and earlier engagement always preserves more options.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Private credit makes sense over banks where speed, leverage or flexibility matter more than headline pricing — acquisitions on a clock, transitional assets or borrowers between rating bands. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Brief &amp; strategy',
          'We understand the objective, test it against the market and agree the plan',
        ],
        [
          'Prepare &amp; shortlist',
          'Financials, information packs and counterparties readied — priced on evidence',
        ],
        [
          'Structure &amp; negotiate',
          'Terms structured and negotiated with your interest alone at the table',
        ],
        [
          'Manage &amp; close',
          'Diligence, documentation and completion managed cleanly to handover',
        ],
      ],
    },
    expertise: 'Evidence-priced: every deal grounded in verified market data — pay too much or sell too low and the market keeps the difference. Bank-ready packs: financing applications prepared to the standard UAE lenders actually approve. Conflict-free: we are not brokers chasing a spread — fixed advisory fees, your side only.',
    integrated: 'Mortgage Services works alongside our accounting, transactions, valuation, research and technology practices — one integrated group behind every decision.',
  },
  'valuation-and-advisory': {
    what: {
      title: 'A number you can defend — to banks, courts and buyers.',
      p: [
        'Independent, evidence-led valuations of businesses, property, plant and machinery — built to withstand scrutiny from banks, auditors and investors.',
        'A valuation is only as good as the evidence behind it. We value businesses, real estate and industrial assets using recognised methods and real market data — with formal RICS-compliant real estate valuations delivered through our group firm, Reliant Surveyors.',
      ],
    },
    offer: {
      title: 'Valuation &amp; Advisory, End to End',
      text: 'Defensible company valuations for deals, disputes and reporting; RICS-compliant real estate valuations through Reliant Surveyors; industrial asset valuations for lending, insurance and reporting; and senior counsel on the decisions that shape the business.',
      card: 'Truly independent. We answer to the valuation, not the deal. No contingent fees, no pressure.',
    },
    process: {
      title: 'The Same Discipline on Every Engagement',
      text: 'Fixed fees agreed up front. A senior adviser on every engagement. Bank and court accepted, independent.',
      steps: [
        [
          'Scope',
          'We agree the purpose, standard and basis of value before any work begins',
        ],
        [
          'Research',
          'Market evidence gathered and verified — comparables, cash flows, cost data',
        ],
        [
          'Assess',
          'Valuation modelled under recognised methods and reviewed by a senior valuer',
        ],
        [
          'Report',
          'A defensible, clearly reasoned report — and a walkthrough of what it means',
        ],
      ],
    },
    expertise: 'Truly independent: we answer to the valuation, not the deal — no contingent fees, no pressure. RICS-compliant: formal real estate valuations through Reliant Surveyors, accepted by UAE banks and courts. Every asset class: businesses, property, plant and machinery — one standard of evidence across all of them.',
    integrated: 'Valuation and Advisory works alongside our accounting, transactions, mortgage, research and technology practices — one integrated group behind every decision.',
  },
  'valuation-and-advisory/business-valuation': {
    what: {
      title: 'An Independent Opinion of What a Business Is Worth',
      p: [
        'An independent, evidence-led opinion of what a business is worth — for transactions, disputes, financial reporting or regulatory requirements. We value companies and shareholdings using recognised approaches — income (DCF), market multiples and asset-based — selected and weighted for the purpose: M&amp;A, shareholder buyouts, litigation, IFRS impairment testing, corporate tax or family settlement.',
        'Every valuation is delivered as a reasoned report that shows its evidence: cash flow assumptions, comparable selection, discount rate build-up and sensitivities — figures that withstand scrutiny from banks, auditors, counterparties and courts.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'DCF and income approach modelling, market multiple analysis, minority and marketability discounts, purchase price allocation and impairment testing, litigation and dispute valuations, and expert report presentation.',
      card: 'Basis of value agreed before work begins. Verified market evidence, never assumptions. Recognised methods, senior-valuer review. No contingent fees — ever.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Typically three to five years of financials, management accounts, forecasts if available and an hour with management. Most engagements complete in two to four weeks — faster where a deal clock demands it.',
      steps: [
        [
          'Scope',
          'We agree the purpose, standard and basis of value before any work begins',
        ],
        [
          'Research',
          'Market evidence gathered and verified — comparables, cash flows, cost data',
        ],
        [
          'Assess',
          'Valuation modelled under recognised methods and reviewed by a senior valuer',
        ],
        [
          'Report',
          'A defensible, clearly reasoned report — and a walkthrough of what it means',
        ],
      ],
    },
    expertise: 'Truly independent: we answer to the valuation, not the deal — no contingent fees, no pressure. RICS-compliant: formal real estate valuations through Reliant Surveyors, accepted by UAE banks and courts. Every asset class: businesses, property, plant and machinery — one standard of evidence across all of them.',
    integrated: 'Valuation and Advisory works alongside our accounting, transactions, mortgage, research and technology practices — one integrated group behind every decision.',
  },
  'valuation-and-advisory/company-valuation': {
    what: {
      title: 'Share and Entity Valuation That Withstands Scrutiny',
      p: [
        'We value companies and shareholdings using recognised approaches — income (DCF), market multiples and asset-based — selected and weighted for the purpose: M&amp;A, shareholder buyouts, litigation, IFRS impairment testing, corporate tax or family settlement.',
        'Every valuation is delivered as a reasoned report that shows its evidence: cash flow assumptions, comparable selection, discount rate build-up and sensitivities — figures that withstand scrutiny from banks, auditors, counterparties and courts. Business and asset valuations follow IVS — accepted by banks, auditors, courts and regulators across the UAE.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'DCF and income approach modelling, market multiple analysis, minority and marketability discounts, purchase price allocation and impairment testing, litigation and dispute valuations, and expert report presentation.',
      card: 'Completely independent. We hold no brokerage or transaction interest in the outcome — the number is evidence-led and defensible, whichever way it lands.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Fixed fees agreed up front. A senior adviser on every engagement. Engagements are scoped by a senior adviser, priced as a fixed fee before work begins, and delivered by the same team that answers when you call.',
      steps: [
        [
          'Scope',
          'We agree the purpose, standard and basis of value before any work begins',
        ],
        [
          'Research',
          'Market evidence gathered and verified — comparables, cash flows, cost data',
        ],
        [
          'Assess',
          'Valuation modelled under recognised methods and reviewed by a senior valuer',
        ],
        [
          'Report',
          'A defensible, clearly reasoned report — and a walkthrough of what it means',
        ],
      ],
    },
    expertise: 'Truly independent: we answer to the valuation, not the deal — no contingent fees, no pressure. RICS-compliant: formal real estate valuations through Reliant Surveyors, accepted by UAE banks and courts. Every asset class: businesses, property, plant and machinery — one standard of evidence across all of them.',
    integrated: 'Valuation and Advisory works alongside our accounting, transactions, mortgage, research and technology practices — one integrated group behind every decision.',
  },
  'valuation-and-advisory/plant-and-machinery-valuation': {
    what: {
      title: 'Specialist Valuation of Plant, Machinery and Equipment',
      p: [
        'Specialist valuation of plant, machinery and equipment — from single production lines to complete industrial facilities. Industrial assets demand specialist method: replacement cost analysis, depreciation and obsolescence assessment and, where markets exist, comparable sales evidence.',
        'We value manufacturing plants, construction fleets, logistics equipment, medical technology and complete facilities. Engagements serve lending, insurance placement, financial reporting, liquidation and transaction purposes — each with the basis of value the purpose requires.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Physical inspection and asset verification, depreciated replacement cost analysis, the market approach where evidence exists, insurance reinstatement values, lending and asset-based-lending valuations, and fixed asset register reconciliation.',
      card: 'We physically inspect the assets — condition, hours, maintenance history and installation context materially affect value. Desktop updates are available between full inspections.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Plant and machinery valuations frequently support purchase price allocations and asset-based lending within wider transactions, alongside our business valuation team. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Scope',
          'We agree the purpose, standard and basis of value before any work begins',
        ],
        [
          'Research',
          'Market evidence gathered and verified — comparables, cash flows, cost data',
        ],
        [
          'Assess',
          'Valuation modelled under recognised methods and reviewed by a senior valuer',
        ],
        [
          'Report',
          'A defensible, clearly reasoned report — and a walkthrough of what it means',
        ],
      ],
    },
    expertise: 'Truly independent: we answer to the valuation, not the deal — no contingent fees, no pressure. RICS-compliant: formal real estate valuations through Reliant Surveyors, accepted by UAE banks and courts. Every asset class: businesses, property, plant and machinery — one standard of evidence across all of them.',
    integrated: 'Valuation and Advisory works alongside our accounting, transactions, mortgage, research and technology practices — one integrated group behind every decision.',
  },
  'valuation-and-advisory/asset-valuation': {
    what: {
      title: 'RICS-Compliant Valuation Across Every Property Class',
      p: [
        'Formal, RICS-compliant real estate valuations across every property class — delivered through our group firm, Reliant Surveyors, and accepted by UAE banks. We value development land, offices, retail, residential, industrial, hospitality, healthcare, education and infrastructure assets across the UAE — for lending, acquisition, financial reporting, insurance, litigation and tax.',
        'Reports follow the RICS Red Book: inspected, evidenced from verified comparables and signed by qualified valuers — the standard banks, auditors and courts require.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'RICS Red Book valuations, mortgage and lending valuations, IFRS fair value for financial reporting, development land and residual appraisals, portfolio and periodic revaluations, and expert witness and dispute reports.',
      card: 'RICS-compliant reports through Reliant Surveyors are accepted by major UAE lenders for mortgage and corporate facility purposes.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Standard single assets typically complete within five to ten working days of inspection and document receipt; portfolios are scheduled to your deadline. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Scope',
          'We agree the purpose, standard and basis of value before any work begins',
        ],
        [
          'Research',
          'Market evidence gathered and verified — comparables, cash flows, cost data',
        ],
        [
          'Assess',
          'Valuation modelled under recognised methods and reviewed by a senior valuer',
        ],
        [
          'Report',
          'A defensible, clearly reasoned report — and a walkthrough of what it means',
        ],
      ],
    },
    expertise: 'Truly independent: we answer to the valuation, not the deal — no contingent fees, no pressure. RICS-compliant: formal real estate valuations through Reliant Surveyors, accepted by UAE banks and courts. Every asset class: businesses, property, plant and machinery — one standard of evidence across all of them.',
    integrated: 'Valuation and Advisory works alongside our accounting, transactions, mortgage, research and technology practices — one integrated group behind every decision.',
  },
  'valuation-and-advisory/financial-valuation': {
    what: {
      title: 'Arm\'s-Length Values the FTA Will Accept',
      p: [
        'Every transaction between related parties must be priced as if between strangers. UAE Corporate Tax law applies OECD-aligned transfer pricing rules to all related-party dealings — goods, services, financing, royalties and management charges. We determine defensible arm\'s-length prices using recognised methods and real comparable data.',
        'The valuation work feeds directly into your disclosure forms and documentation file, so pricing, paperwork and returns all tell the same story. Related-party rules apply to domestic and cross-border transactions alike, including dealings with connected persons such as owners and directors.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Related-party transaction mapping, method selection and application, comparable searches and benchmarking, intra-group services and financing pricing, disclosure form support, and documentation-ready valuation reports.',
      card: 'The FTA can adjust taxable income and levy penalties. Contemporaneous valuation evidence is the defence — created when the transaction happens, not after the audit letter.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Prepared as if the audit letter arrives tomorrow. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Assess',
          'A senior review of your registrations, filings and exposures — where you stand today, stated plainly',
        ],
        [
          'Register',
          'Corporate tax, VAT and TRC registrations completed correctly and ahead of every FTA deadline',
        ],
        [
          'File',
          'Returns prepared from reconciled numbers and filed on time — no scrambles, no penalties',
        ],
        [
          'Defend',
          'Ongoing advisory, health checks and audit support whenever the FTA asks questions',
        ],
      ],
    },
    expertise: 'Penalties avoided: late corporate tax registration alone carries an AED 10,000 penalty, and we keep you ahead of every deadline. One tax team: corporate tax, VAT, transfer pricing and international tax under one accountable engagement. FTA-ready always: positions documented and defensible — prepared as if the audit letter arrives tomorrow.',
    integrated: 'Valuation and Advisory works alongside our accounting, transactions, mortgage, research and technology practices — one integrated group behind every decision.',
  },
  'research-and-intelligence': {
    what: {
      title: 'Evidence first. Opinion second.',
      p: [
        'Feasibility, market research and financial advisory that turn a question into a confident, evidence-backed decision.',
        'Before capital is committed, the questions deserve real answers. Our consulting team delivers feasibility studies, real estate market research, highest-and-best-use analysis, financial accounting advisory and complete UAE business setup support.',
      ],
    },
    offer: {
      title: 'Research &amp; Intelligence, End to End',
      text: 'Bankable feasibility studies before capital is committed; supply, demand and pricing evidence for UAE property decisions; highest-and-best-use analysis — what should this land become, tested, compared and quantified; and technical accounting firepower for complex transactions and change.',
      card: 'One study can save a project — test the numbers before capital is committed. Decision-first, with UAE market evidence.',
    },
    process: {
      title: 'The Same Discipline on Every Engagement',
      text: 'Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Define',
          'We frame the decision, the options on the table and the evidence needed to choose',
        ],
        [
          'Research',
          'Primary and secondary research across the UAE market — data, not anecdotes',
        ],
        [
          'Model',
          'Scenarios, sensitivities and financials stress-tested before you commit',
        ],
        [
          'Recommend',
          'A clear, defensible recommendation — and support through execution',
        ],
      ],
    },
    expertise: 'Decision-first: every study is built around the decision it must support — never research for its own sake. UAE market depth: real, current market evidence from the markets you operate in. End-to-end: from feasibility to setup to ongoing advisory — one team carries it through.',
    integrated: 'Research &amp; Intelligence works alongside our accounting, transactions, mortgage, valuation and technology practices — one integrated group behind every decision.',
  },
  'research-and-intelligence/real-estate-research': {
    what: {
      title: 'Real Evidence on UAE Property Markets',
      p: [
        'Real evidence on UAE property markets — supply pipelines, demand drivers, rents, yields and absorption — before you buy, build or reposition. We research UAE real estate markets asset class by asset class: current and pipeline supply, demand fundamentals, achieved rents and prices, vacancy, yields and the regulatory changes that move them.',
        'Deliverables range from location studies for a single site to sector reports underpinning fund strategy — always from verified data and fieldwork, not recycled headlines.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Supply and pipeline mapping, demand driver analysis, rent, price and yield evidence, absorption and vacancy studies, competitor and positioning analysis, and location and catchment studies.',
      card: 'Registered transaction data, developer disclosures, primary fieldwork and our valuation practice\'s live evidence base through Reliant Surveyors — triangulated, never single-sourced.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Market research typically forms the demand core of our feasibility work, or stands alone when you need the market answer only. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Define',
          'We frame the decision, the options on the table and the evidence needed to choose',
        ],
        [
          'Research',
          'Primary and secondary research across the UAE market — data, not anecdotes',
        ],
        [
          'Model',
          'Scenarios, sensitivities and financials stress-tested before you commit',
        ],
        [
          'Recommend',
          'A clear, defensible recommendation — and support through execution',
        ],
      ],
    },
    expertise: 'Decision-first: every study is built around the decision it must support — never research for its own sake. UAE market depth: real, current market evidence from the markets you operate in. End-to-end: from feasibility to setup to ongoing advisory — one team carries it through.',
    integrated: 'Research &amp; Intelligence works alongside our accounting, transactions, mortgage, valuation and technology practices — one integrated group behind every decision.',
  },
  'research-and-intelligence/market-research': {
    what: {
      title: 'Data, Not Anecdotes',
      p: [
        'Before capital is committed, the questions deserve real answers. We research UAE markets sector by sector: current and pipeline supply, demand fundamentals, achieved prices, the competitive set and the regulatory changes that move them — framed around the decision the research has to support.',
        'Deliverables range from a location or catchment study for a single site to sector reports underpinning fund or expansion strategy — always from verified data and fieldwork, not recycled headlines. Every recommendation traces back to a verifiable source, not opinion.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Supply and pipeline mapping, demand driver analysis, price and yield evidence, absorption studies, competitor and positioning analysis, and location and catchment studies.',
      card: 'Primary UAE market data — comparable transactions, operator benchmarks, demand and supply indicators — combined with financial modelling.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Most market studies complete in two to four weeks depending on scope. Timelines are fixed in the proposal. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Define',
          'We frame the decision, the options on the table and the evidence needed to choose',
        ],
        [
          'Research',
          'Primary and secondary research across the UAE market — data, not anecdotes',
        ],
        [
          'Model',
          'Scenarios, sensitivities and financials stress-tested before you commit',
        ],
        [
          'Recommend',
          'A clear, defensible recommendation — and support through execution',
        ],
      ],
    },
    expertise: 'Decision-first: every study is built around the decision it must support — never research for its own sake. UAE market depth: real, current market evidence from the markets you operate in. End-to-end: from feasibility to setup to ongoing advisory — one team carries it through.',
    integrated: 'Research &amp; Intelligence works alongside our accounting, transactions, mortgage, valuation and technology practices — one integrated group behind every decision.',
  },
  'research-and-intelligence/feasibility-studies': {
    what: {
      title: 'Before the Capital Goes In',
      p: [
        'Before the capital goes in, the questions deserve answers: is there a market, do the numbers work and what has to be true for the project to succeed? Our feasibility studies test a project across market, technical, financial and regulatory dimensions: demand evidence, competitive supply, cost structure, funding requirement, returns and the sensitivities that break the case.',
        'Studies are built to bank standard — UAE lenders and investors receive a document they can underwrite, and you receive an honest answer, including when that answer is no.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Market demand and supply analysis, concept and capacity definition, capex and opex build-up, financial modelling with sensitivities, funding structure recommendations, and bank-ready study documentation.',
      card: 'For project and development finance in the UAE, banks almost always require a feasibility study — and its quality directly affects credit appetite and pricing.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Typically four to eight weeks depending on sector and data availability — with a preliminary go/no-go read earlier where timing matters. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Define',
          'We frame the decision, the options on the table and the evidence needed to choose',
        ],
        [
          'Research',
          'Primary and secondary research across the UAE market — data, not anecdotes',
        ],
        [
          'Model',
          'Scenarios, sensitivities and financials stress-tested before you commit',
        ],
        [
          'Recommend',
          'A clear, defensible recommendation — and support through execution',
        ],
      ],
    },
    expertise: 'Decision-first: every study is built around the decision it must support — never research for its own sake. UAE market depth: real, current market evidence from the markets you operate in. End-to-end: from feasibility to setup to ongoing advisory — one team carries it through. What if the numbers say the project doesn\'t work? Then the study has done its job — a clear no before capital is committed is often the most valuable outcome.',
    integrated: 'Research &amp; Intelligence works alongside our accounting, transactions, mortgage, valuation and technology practices — one integrated group behind every decision.',
  },
  'technology-data-and-ai': {
    what: {
      title: 'Technology measured back to the profit line.',
      p: [
        'Digital transformation, cloud-era enterprise solutions and performance marketing — technology in service of the business case.',
        'Technology spend should behave like any other investment: measured, justified and accountable. We help UAE businesses modernise customer experience, move core systems to the cloud and build digital marketing engines that report to the P&amp;L.',
      ],
    },
    offer: {
      title: 'Technology Consulting, End to End',
      text: 'Customer journeys and operations redesigned around measurable value; ERP and core systems moved to the cloud with finance-grade discipline; and performance marketing measured on pipeline, not impressions.',
      card: 'Every technology case measured back to the profit line. Vendor-neutral and e-invoicing ready.',
    },
    process: {
      title: 'The Same Discipline on Every Engagement',
      text: 'Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Diagnose',
          'Current systems, costs and customer journeys mapped against where the business is going',
        ],
        [
          'Design',
          'A pragmatic roadmap — platforms, sequencing and budget the business can absorb',
        ],
        [
          'Implement',
          'Delivery managed with vendor discipline and clear milestones',
        ],
        [
          'Measure',
          'Adoption, cost and revenue impact tracked back to the original case',
        ],
      ],
    },
    expertise: 'Finance-grade cases: technology decisions built and measured like investments, not fashion. Vendor-neutral: we recommend what fits — we do not resell licences. UAE-ready: solutions that respect UAE data, e-invoicing and compliance requirements.',
    integrated: 'Technology, Data &amp; AI works alongside our accounting, transactions, mortgage, valuation and research practices — one integrated group behind every decision.',
  },
  'technology-data-and-ai/technology-consulting': {
    what: {
      title: 'Transformation That Starts From the Customer',
      p: [
        'Digital transformation that starts from the customer and reports to the P&amp;L — journeys redesigned, processes automated, results measured. We help UAE businesses modernise how customers find, buy from and stay with them: journey mapping, CRM and service platform selection, process automation and the operating-model changes that make new tools actually stick.',
        'Every initiative carries a business case — cost, benefit, owner and measurement — because transformation without accountability is just software procurement. For most SMEs it means a CRM that sales actually uses, automated invoicing and service processes that don\'t leak customers. Scope follows value.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Customer journey mapping and redesign, CRM selection and implementation oversight, process automation and workflow design, digital operating model design, change management and adoption, and benefits tracking against the case.',
      card: 'A business case before any build. Vendor-neutral recommendations. UAE data and e-invoicing compliance. Impact measured back to the P&amp;L.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'We design, select and govern; certified implementation partners build. That separation keeps our advice vendor-neutral. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Diagnose',
          'Current systems, costs and customer journeys mapped against where the business is going',
        ],
        [
          'Design',
          'A pragmatic roadmap — platforms, sequencing and budget the business can absorb',
        ],
        [
          'Implement',
          'Delivery managed with vendor discipline and clear milestones',
        ],
        [
          'Measure',
          'Adoption, cost and revenue impact tracked back to the original case',
        ],
      ],
    },
    expertise: 'Finance-grade cases: technology decisions built and measured like investments, not fashion. Vendor-neutral: we recommend what fits — we do not resell licences. UAE-ready: solutions that respect UAE data, e-invoicing and compliance requirements.',
    integrated: 'Technology, Data &amp; AI works alongside our accounting, transactions, mortgage, valuation and research practices — one integrated group behind every decision.',
  },
  'technology-data-and-ai/erp-dashboards': {
    what: {
      title: 'Core Systems Run With the Discipline of a Capital Project',
      p: [
        'Core systems — ERP, accounting, HR — moved to the cloud with the discipline of a capital project: scoped, governed and measured. We guide the modernisation of core business systems: requirements definition, platform evaluation (ERP, accounting, HR, procurement), migration planning and implementation governance — keeping vendors honest on scope, timeline and cost.',
        'UAE specifics are designed in from the start: VAT and corporate tax logic, e-invoicing readiness, WPS payroll and data residency requirements. We evaluate across tiers — from Zoho and Odoo to Microsoft Dynamics, Oracle NetSuite and SAP — and recommend by fit and total cost, not partnership incentives.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Systems landscape and requirements definition, platform evaluation and selection, business case and TCO analysis, migration and cutover planning, implementation governance and vendor management, and UAE compliance configuration (VAT, e-invoicing, WPS).',
      card: 'Why do ERP projects fail? Unclear requirements, underestimated data migration and absent ownership. Governance exists to catch all three early — that is the service.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Migrations run in parallel with reconciliation checkpoints — opening balances, ledgers and history are verified against the old system before cut-over, so the books never skip a beat. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Diagnose',
          'Current systems, costs and customer journeys mapped against where the business is going',
        ],
        [
          'Design',
          'A pragmatic roadmap — platforms, sequencing and budget the business can absorb',
        ],
        [
          'Implement',
          'Delivery managed with vendor discipline and clear milestones',
        ],
        [
          'Measure',
          'Adoption, cost and revenue impact tracked back to the original case',
        ],
      ],
    },
    expertise: 'Finance-grade cases: technology decisions built and measured like investments, not fashion. Vendor-neutral: we recommend what fits — we do not resell licences. UAE-ready: solutions that respect UAE data, e-invoicing and compliance requirements.',
    integrated: 'Technology, Data &amp; AI works alongside our accounting, transactions, mortgage, valuation and research practices — one integrated group behind every decision.',
  },
  'technology-data-and-ai/enterprise-solutions': {
    what: {
      title: 'Enterprise and Cloud Transformation, Governed and Measured',
      p: [
        'Move your ERP, accounting and core systems to the cloud with the discipline of a capital project — scoped, governed, secured and measured, with finance-grade controls at every step. We guide the modernisation of core business systems: requirements definition, platform evaluation, migration planning and implementation governance — keeping vendors honest on scope, timeline and cost.',
        'UAE specifics are designed in from the start: VAT and corporate tax logic, e-invoicing readiness, WPS payroll and data residency requirements. We map your invoicing flow against the UAE e-invoicing framework, close the gaps in systems and process, and test end to end before the mandate applies to you.',
      ],
    },
    offer: {
      title: 'What the Engagement Covers',
      text: 'Systems landscape and requirements definition, platform evaluation and selection, business case and TCO analysis, migration and cutover planning, implementation governance and vendor management, and UAE compliance configuration (VAT, e-invoicing, WPS).',
      card: 'We are vendor-neutral — recommendations are driven by your requirements and the business case, and we are paid by you, not by referral commissions.',
    },
    process: {
      title: 'How This Engagement Runs',
      text: 'Migrations run in parallel with reconciliation checkpoints — opening balances, ledgers and history are verified against the old system before cut-over, so the books never skip a beat. Fixed fees agreed up front. A senior adviser on every engagement.',
      steps: [
        [
          'Diagnose',
          'Current systems, costs and customer journeys mapped against where the business is going',
        ],
        [
          'Design',
          'A pragmatic roadmap — platforms, sequencing and budget the business can absorb',
        ],
        [
          'Implement',
          'Delivery managed with vendor discipline and clear milestones',
        ],
        [
          'Measure',
          'Adoption, cost and revenue impact tracked back to the original case',
        ],
      ],
    },
    expertise: 'Finance-grade cases: technology decisions built and measured like investments, not fashion. Vendor-neutral: we recommend what fits — we do not resell licences. UAE-ready: solutions that respect UAE data, e-invoicing and compliance requirements.',
    integrated: 'Technology, Data &amp; AI works alongside our accounting, transactions, mortgage, valuation and research practices — one integrated group behind every decision.',
  },
};

/**
 * The copy for a page key, or null while it is unwritten.
 *
 * `slug` is "practice" or "practice/sub-service".
 */
export function uaeServiceDetail(slug: string): UaeServiceDetail | null {
  return UAE_SERVICE_DETAIL[slug] ?? null;
}
