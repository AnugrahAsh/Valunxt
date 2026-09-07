/**
 * Per-practice extras for the UAE service pages: who the work is for, the
 * interactive tool the page carries, the "in practice" image set, the FAQ, the
 * deliverables list, and the three proof points shown for a sub-service.
 *
 * Split from the long-form copy because these are page furniture rather than
 * prose — a practice can gain a tool or a FAQ without its copy changing.
 *
 * Port of data/services-uae-extras.php.
 */

/** The four interactive tools a practice page can carry. */
export type UaeToolKind = 'calendar' | 'calc' | 'chooser' | 'readiness';

export interface UaeChooserOption {
  /** Button label. */
  t: string;
  /** Kit icon token. */
  i: string;
  /** The route this option recommends. */
  r: { h: string; href: string; d: string; steps: string[] };
}

export interface UaeReadinessResult {
  h: string;
  d: string;
  href: string;
  sub: string;
}

export interface UaeTool {
  kind: UaeToolKind;
  title: string;
  text: string;
  /** chooser only. */
  options?: UaeChooserOption[];
  /** readiness only. `k` is the answer key the scorer stores. */
  questions?: { q: string; k: string }[];
  results?: UaeReadinessResult[];
}

export interface UaeServiceExtras {
  /** "Who this is for" chips. */
  audience?: string[];
  tool?: UaeTool;
  /** The "in practice" strip; also the explorer's pane imagery. */
  gallery?: string[];
  /** The blog category whose posts lead "Related insights". */
  insight?: string;
  faq?: { q: string; a: string }[];
}

export interface UaeDeliverable {
  t: string;
  d: string;
  /** Kit icon token. */
  i: string;
}

const UAE_SERVICE_EXTRAS: Record<string, UaeServiceExtras> = {
  'accounting-and-tax-services': {
    audience: [
      'Founders and SMEs',
      'Family businesses',
      'Free-zone and mainland entities',
      'Groups with UAE subsidiaries',
    ],
    tool: {
      kind: 'calendar',
      title: 'Your compliance calendar, on your financial year.',
      text: 'Pick your financial year end and see where the corporate tax return and the VAT returns fall. This is the calendar we track against &mdash; not the week a deadline is due.',
    },
    gallery: [
      '/assets/content/uploads/uae-services/1.webp',
      '/assets/content/uploads/homepage/industry-3.webp',
      '/assets/content/uploads/new-folder/client-success-1.webp',
    ],
    insight: 'Capital Advisory',
    faq: [
      {
        q: 'How quickly are the management accounts ready after month end?',
        a: 'We close by day five. Management accounts are on your desk in the first week of the month, prepared from reconciled numbers to IFRS, with working papers an auditor can follow.',
      },
      {
        q: 'When is the UAE corporate tax return due?',
        a: 'Within nine months of the end of your financial year, with any payment due in the same window. We track that date against your financial year from the start of the engagement, and the impact assessment and return are prepared from reconciled books rather than assembled in the final month.',
      },
      {
        q: 'How are VAT returns handled?',
        a: 'Each return is prepared from reconciled input and output tax for the tax period and filed within 28 days of the period end. Registration, reconciliation and filing are one engagement, so nothing falls between two desks.',
      },
      {
        q: 'How is the fee set?',
        a: 'A fixed monthly fee, agreed in writing before work begins, for the complete finance function you have scoped. There is no hourly meter, and the fee does not move once work has started.',
      },
    ],
  },
  'real-estate-transactions': {
    audience: [
      'Private buyers',
      'Investors',
      'Landlords',
      'Developers',
    ],
    tool: {
      kind: 'chooser',
      title: 'What are you trying to do?',
      text: 'Choose the transaction and see how we run it &mdash; the steps, the evidence behind the price, and the sub-service that carries it.',
      options: [
        {
          t: 'Buy a property',
          i: 'building',
          r: {
            h: 'Buy Property',
            href: '/services/real-estate-transactions/buy-property/',
            d: 'Sourcing and acquisition across residential and commercial property, with the evidence behind every price.',
            steps: [
              'Brief and strategy agreed',
              'Shortlist priced on comparable evidence',
              'Offer, diligence and terms negotiated on your side only',
              'Transfer managed to handover',
            ],
          },
        },
        {
          t: 'Sell, rent or lease',
          i: 'key',
          r: {
            h: 'Sell &amp; Rent/Lease Property',
            href: '/services/real-estate-transactions/sell-rent-lease-property/',
            d: 'Disposal and leasing strategy, pricing and execution for owners and landlords.',
            steps: [
              'Asset and market position assessed',
              'Pricing set on evidence, not on hope',
              'Counterparties readied and terms structured',
              'Completion managed cleanly',
            ],
          },
        },
        {
          t: 'Assess an off-plan purchase',
          i: 'layers',
          r: {
            h: 'Off Plan Properties',
            href: '/services/real-estate-transactions/off-plan-properties/',
            d: 'Independent assessment of off-plan opportunities &mdash; developer, payment plan and delivery risk.',
            steps: [
              'Developer and project record reviewed',
              'Payment plan tested against your position',
              'Delivery and exit risk stated plainly',
              'A recommendation you can act on, or decline',
            ],
          },
        },
      ],
    },
    gallery: [
      '/assets/content/uploads/homepage/building-real-esate.webp',
      '/assets/content/uploads/homepage/industry-1.webp',
      '/assets/content/uploads/services/real-estate-transactions.webp',
    ],
    insight: 'Real Estate Wealth',
    faq: [
      {
        q: 'Do you take a commission on the transaction?',
        a: 'No. We hold no inventory and take no commissions. The advisory fee is fixed and agreed before work begins, so the advice is not tied to a transaction completing &mdash; which sometimes means advising against one.',
      },
      {
        q: 'What does &ldquo;priced on evidence&rdquo; mean in practice?',
        a: 'Every offer, asking price or lease term is grounded in verified comparable evidence. Where a formal opinion of value is needed, it is delivered through our group firm Reliant Surveyors to RICS standards.',
      },
      {
        q: 'Can you assess an off-plan purchase before I commit?',
        a: 'Yes. We review the developer, the payment plan and the delivery risk independently, and say plainly whether the case holds up before any money moves.',
      },
      {
        q: 'Do you act for buyers outside the UAE?',
        a: 'Yes, across Dubai, Abu Dhabi and beyond. Where finance is needed, our mortgage practice structures it for non-resident as well as resident borrowers.',
      },
    ],
  },
  'mortgage-services': {
    audience: [
      'Resident buyers',
      'Non-resident buyers',
      'Corporate borrowers',
      'Owners refinancing',
    ],
    tool: {
      kind: 'calc',
      title: 'How much could you borrow, and what would it cost?',
      text: 'An indicative view under UAE Central Bank loan-to-value caps. Lender criteria, eligibility and pricing apply &mdash; a whole-of-market comparison is what turns this into a real offer.',
    },
    gallery: [
      '/assets/content/uploads/services/mortgage-services.webp',
      '/assets/content/uploads/homepage/industry-2.webp',
      '/assets/content/uploads/new-folder/home-page-2.webp',
    ],
    insight: 'Real Estate Wealth',
    faq: [
      {
        q: 'What does whole-of-market mean?',
        a: 'Terms are compared across the lenders in the market rather than the one bank you already use &mdash; for resident, non-resident and corporate borrowers, conventional and Sharia-compliant alike.',
      },
      {
        q: 'What is the maximum loan-to-value in the UAE?',
        a: 'For a first residential property, UAE Central Bank regulations cap the loan at 80% of value for expatriate residents and 85% for UAE nationals on properties up to AED 5 million, with lower caps above that value, for subsequent properties and for off-plan purchases. Lender criteria apply on top.',
      },
      {
        q: 'Why get pre-approved before choosing a property?',
        a: 'So you know what you can borrow, and on what terms, before you commit. The documentation is prepared to the standard UAE lenders actually approve, which also shortens the time to completion.',
      },
      {
        q: 'Do you advise on Islamic finance?',
        a: 'Yes. Sharia-compliant structures are compared on the same evidence and the same terms as conventional finance, so the choice is made on what the facility really costs.',
      },
    ],
  },
  'valuation-and-advisory': {
    audience: [
      'Lenders and funds',
      'Developers',
      'Private owners',
      'Auditors and boards',
    ],
    tool: {
      kind: 'chooser',
      title: 'Which valuation do you need?',
      text: 'Start from the purpose. The purpose sets the standard, the basis of value and the method &mdash; which is why we agree it before any work begins.',
      options: [
        {
          t: 'Bank lending or refinancing',
          i: 'building',
          r: {
            h: 'Asset Valuation',
            href: '/services/valuation-and-advisory/asset-valuation/',
            d: 'A formal opinion of value for a lender, delivered to RICS Red Book standards through Reliant Surveyors and accepted by UAE banks.',
            steps: [
              'Purpose, standard and basis agreed',
              'Inspection and verified comparables',
              'Senior valuer review',
              'Signed report the lender can rely on',
            ],
          },
        },
        {
          t: 'Financial reporting or audit',
          i: 'doc',
          r: {
            h: 'Financial Valuation',
            href: '/services/valuation-and-advisory/financial-valuation/',
            d: 'Values for the balance sheet, impairment and audit support &mdash; documented so the auditor can follow every step.',
            steps: [
              'Reporting standard and date fixed',
              'Inputs verified and sourced',
              'Method modelled and reviewed',
              'Working papers handed to the auditor',
            ],
          },
        },
        {
          t: 'A transaction, dispute or shareholder matter',
          i: 'scales',
          r: {
            h: 'Business Valuation',
            href: '/services/valuation-and-advisory/business-valuation/',
            d: 'Independent enterprise value for transactions, disputes and reporting, with no contingent fee and no pressure.',
            steps: [
              'Scope and basis of value agreed',
              'Cash flows, comparables and market evidence',
              'Recognised methods, senior review',
              'A defensible, clearly reasoned report',
            ],
          },
        },
        {
          t: 'Insurance or asset finance',
          i: 'layers',
          r: {
            h: 'Plant &amp; Machinery Valuation',
            href: '/services/valuation-and-advisory/plant-and-machinery-valuation/',
            d: 'Asset-level valuation for finance, insurance and balance-sheet purposes.',
            steps: [
              'Asset register and purpose agreed',
              'Inspection and cost data',
              'Depreciation and market evidence applied',
              'Report to the required basis',
            ],
          },
        },
      ],
    },
    gallery: [
      '/assets/content/uploads/services/valuation-and-advisory.webp',
      '/assets/content/uploads/homepage/industry-4.webp',
      '/assets/content/uploads/uae-services/3.webp',
    ],
    insight: 'Research & Intelligence',
    faq: [
      {
        q: 'Are your valuations accepted by banks?',
        a: 'Formal real estate valuations are delivered through our group firm Reliant Surveyors to RICS Red Book standards and are accepted by UAE banks and courts. Business, plant and machinery and financial valuations run to the same standard of evidence.',
      },
      {
        q: 'What can you value?',
        a: 'Businesses and companies, property, plant and machinery, and financial instruments &mdash; one standard of evidence across all of them, with the method written down in full.',
      },
      {
        q: 'How independent is the opinion?',
        a: 'Entirely. There are no contingent fees and no pressure from a transaction: we answer to the valuation, not the deal.',
      },
      {
        q: 'Do you use automated valuation models?',
        a: 'As an input, not as the opinion. Automated output informs the work; a formal valuation is signed by a qualified valuer who can and does override it.',
      },
    ],
  },
  'research-and-intelligence': {
    audience: [
      'Investors',
      'Developers',
      'Family offices',
      'Businesses entering the UAE',
    ],
    tool: {
      kind: 'chooser',
      title: 'What decision are you making?',
      text: 'Every study is built around the decision it must support. Choose the decision and see the study that answers it, and what it contains.',
      options: [
        {
          t: 'Enter or size up a market',
          i: 'globe',
          r: {
            h: 'Market Research',
            href: '/services/research-and-intelligence/market-research/',
            d: 'Demand, supply and pricing evidence for the market you are about to enter &mdash; data, not anecdotes.',
            steps: [
              'The decision and the options framed',
              'Primary and secondary research across the UAE market',
              'Scenarios and sensitivities tested',
              'A clear recommendation, and support through execution',
            ],
          },
        },
        {
          t: 'Develop a site',
          i: 'building',
          r: {
            h: 'Feasibility Studies',
            href: '/services/research-and-intelligence/feasibility-studies/',
            d: 'Whether a scheme stacks up, and what the land should actually carry &mdash; highest and best use, tested before you commit.',
            steps: [
              'Site, planning and market context',
              'Use options modelled',
              'Costs, values and sensitivities stress-tested',
              'The scheme that holds, stated plainly',
            ],
          },
        },
        {
          t: 'Acquire an asset',
          i: 'target',
          r: {
            h: 'Investment Research',
            href: '/services/research-and-intelligence/investment-research/',
            d: 'Independent research and valuation intelligence for clearer, more confident investment decisions.',
            steps: [
              'Investment case framed',
              'Evidence gathered and verified',
              'Returns and risks modelled',
              'A defensible go / no-go',
            ],
          },
        },
        {
          t: 'Brief a board or an investor',
          i: 'doc',
          r: {
            h: 'Research Reports',
            href: '/services/research-and-intelligence/research-reports/',
            d: 'Reports written for the leaders who have to act on them &mdash; independent, current, and sourced.',
            steps: [
              'Audience and question defined',
              'Market evidence assembled',
              'Findings reviewed by a senior adviser',
              'A report the room can act on',
            ],
          },
        },
      ],
    },
    gallery: [
      '/assets/content/uploads/services/research-and-intelligences.webp',
      '/assets/content/uploads/homepage/research-and-intellegance.webp',
      '/assets/content/uploads/uae-services/2.webp',
    ],
    insight: 'Research & Intelligence',
    faq: [
      {
        q: 'What makes the research &ldquo;decision-first&rdquo;?',
        a: 'Every study is built around the decision it must support &mdash; never research for its own sake. We frame the decision, the options and the evidence needed to choose before any work begins.',
      },
      {
        q: 'What does a feasibility study cover?',
        a: 'Whether a scheme stacks up and what the land should actually carry: highest and best use, costs, values, and the scenarios and sensitivities stress-tested before you commit capital.',
      },
      {
        q: 'Is the research independent of your transaction work?',
        a: 'Yes. Research is delivered on a fixed fee, independently of whether a transaction follows, and the recommendation stands whether or not it leads to one.',
      },
      {
        q: 'Which markets do you cover?',
        a: 'The UAE, with real, current market evidence from the markets you operate in &mdash; and India and international markets through the wider group.',
      },
    ],
  },
  'technology-data-and-ai': {
    audience: [
      'Finance leaders',
      'Property businesses',
      'Investment firms',
      'Growing SMEs',
    ],
    tool: {
      kind: 'readiness',
      title: 'Where should you start?',
      text: 'Three questions about how the business runs today. The answers point to the first step that pays for itself.',
      questions: [
        {
          q: 'Are the books kept in a proper accounting system, reconciled monthly?',
          k: 'books',
        },
        {
          q: 'Does leadership see current numbers in a dashboard, without waiting for a report?',
          k: 'dash',
        },
        {
          q: 'Is any part of the work automated or supported by AI today?',
          k: 'ai',
        },
      ],
      results: [
        {
          h: 'Start with the foundations',
          href: '/services/technology-data-and-ai/enterprise-solutions/',
          d: 'Get the books into a system and the processes documented. Everything else builds on this.',
          sub: 'Enterprise Solutions',
        },
        {
          h: 'Start with the dashboards',
          href: '/services/technology-data-and-ai/erp-dashboards/',
          d: 'The data exists; leadership cannot see it yet. ERP and dashboards turn month-end into a live view.',
          sub: 'ERP &amp; Dashboards',
        },
        {
          h: 'Start with AI where it pays',
          href: '/services/technology-data-and-ai/ai-solutions/',
          d: 'The foundations are in place. Now the case for AI can be built and measured like an investment.',
          sub: 'AI Solutions',
        },
        {
          h: 'Build the roadmap',
          href: '/services/technology-data-and-ai/technology-consulting/',
          d: 'You are further along than most. A vendor-neutral roadmap sequences what comes next and what it should cost.',
          sub: 'Technology Consulting',
        },
      ],
    },
    gallery: [
      '/assets/content/uploads/services/technology-data-ai.webp',
      '/assets/content/uploads/homepage/technology-and-ai.webp',
      '/assets/content/uploads/uae-services/4.webp',
    ],
    insight: 'Technology & AI',
    faq: [
      {
        q: 'Do you resell software or licences?',
        a: 'No. We are vendor-neutral and recommend what fits the business &mdash; we do not resell licences, so the recommendation is not tied to a margin.',
      },
      {
        q: 'How is a technology project measured?',
        a: 'Like an investment. Adoption, cost and revenue impact are tracked back to the original case, so the business can see whether it paid.',
      },
      {
        q: 'Do the solutions meet UAE requirements?',
        a: 'Yes. Solutions are designed to respect UAE data, e-invoicing and compliance requirements from the start rather than retrofitted.',
      },
      {
        q: 'Where does an engagement begin?',
        a: 'With a diagnosis: current systems, costs and customer journeys mapped against where the business is going. The roadmap follows from that, with platforms, sequencing and a budget the business can absorb.',
      },
    ],
  },
};

const UAE_SERVICE_DELIVERABLES: Record<string, UaeDeliverable[]> = {
  'accounting-and-tax-services': [
    {
      t: 'Management accounts by day five',
      d: 'Prepared from reconciled numbers to IFRS, every month.',
      i: 'doc',
    },
    {
      t: 'Corporate tax and VAT filings',
      d: 'Registered, reconciled and filed on time, with the FTA acknowledgements in your file.',
      i: 'shield',
    },
    {
      t: 'Audit-ready working papers',
      d: 'Every position sourced and dated, so an auditor can follow it.',
      i: 'layers',
    },
    {
      t: 'A named senior accountant',
      d: 'Who reviews each close and answers when you call.',
      i: 'users',
    },
  ],
  'real-estate-transactions': [
    {
      t: 'An evidence-priced position',
      d: 'Comparable evidence behind every offer, asking price or lease term.',
      i: 'target',
    },
    {
      t: 'Diligence you can read',
      d: 'Title, developer, service charge and delivery risk stated plainly before you commit.',
      i: 'shield',
    },
    {
      t: 'Terms negotiated on your side only',
      d: 'No inventory behind the advice and no commission on the outcome.',
      i: 'scales',
    },
    {
      t: 'Completion managed to handover',
      d: 'Documentation, transfer and handover run cleanly by the same team.',
      i: 'check',
    },
  ],
  'mortgage-services': [
    {
      t: 'A whole-of-market comparison',
      d: 'Terms compared across lenders, conventional and Sharia-compliant alike.',
      i: 'chart',
    },
    {
      t: 'A bank-ready application pack',
      d: 'Documentation prepared to the standard UAE lenders actually approve.',
      i: 'doc',
    },
    {
      t: 'Structure, not just a rate',
      d: 'Covenants, fees and valuation treatment explained, so you know what the loan really costs.',
      i: 'layers',
    },
    {
      t: 'One adviser to completion',
      d: 'From pre-approval to drawdown, the same person on the file.',
      i: 'users',
    },
  ],
  'valuation-and-advisory': [
    {
      t: 'A signed, defensible report',
      d: 'To the agreed standard and basis of value, reviewed by a senior valuer.',
      i: 'doc',
    },
    {
      t: 'RICS Red Book valuations',
      d: 'Formal real estate valuations through Reliant Surveyors, accepted by UAE banks and courts.',
      i: 'shield',
    },
    {
      t: 'The method, written down',
      d: 'Comparables, cash flows and cost data verified and documented in full.',
      i: 'layers',
    },
    {
      t: 'A walkthrough of what it means',
      d: 'The reasoning explained, so the number can be used and defended.',
      i: 'users',
    },
  ],
  'research-and-intelligence': [
    {
      t: 'A decision-first brief',
      d: 'The decision, the options and the evidence needed to choose, agreed up front.',
      i: 'target',
    },
    {
      t: 'Verified market evidence',
      d: 'Primary and secondary research across the UAE market — data, not anecdotes.',
      i: 'chart',
    },
    {
      t: 'Scenarios stress-tested',
      d: 'Sensitivities and financials modelled before capital is committed.',
      i: 'layers',
    },
    {
      t: 'A clear recommendation',
      d: 'Defensible, sourced, and supported through execution.',
      i: 'check',
    },
  ],
  'technology-data-and-ai': [
    {
      t: 'A diagnosis, not a pitch',
      d: 'Current systems, costs and journeys mapped against where the business is going.',
      i: 'target',
    },
    {
      t: 'A vendor-neutral roadmap',
      d: 'Platforms, sequencing and a budget the business can absorb — no licences resold.',
      i: 'layers',
    },
    {
      t: 'Delivery with milestones',
      d: 'Vendor discipline, clear milestones and UAE compliance built in.',
      i: 'check',
    },
    {
      t: 'Impact measured back to the case',
      d: 'Adoption, cost and revenue tracked like an investment.',
      i: 'chart',
    },
  ],
};

const UAE_SERVICE_POINTS: Record<string, string[]> = {
  'accounting-and-bookkeeping': [
    'Daily transactions recorded and reconciled',
    'Payables and receivables kept current',
    'VAT-ready books maintained to IFRS',
  ],
  'corporate-tax-services': [
    'Registration and impact assessment',
    'Annual return prepared from reconciled numbers',
    'Filed within nine months of year end',
  ],
  'vat-services': [
    'Registration through to quarterly returns',
    'Input and output tax reconciled',
    'Filed within 28 days of the period end',
  ],
  'cfo-services': [
    'Reporting, controls and forecasts',
    'Board-ready numbers without a full-time hire',
    'Quarterly reviews that turn numbers into decisions',
  ],
  'financial-reporting': [
    'Statutory and management accounts',
    'Prepared to IFRS, documented to hold up',
    'Working papers an auditor can follow',
  ],
  'buy-property': [
    'Sourcing across residential and commercial',
    'Every price grounded in comparable evidence',
    'Offer to handover on your side only',
  ],
  'sell-rent-lease-property': [
    'Disposal and leasing strategy',
    'Pricing set on evidence',
    'Counterparties readied, terms structured',
  ],
  'off-plan-properties': [
    'Developer and project record reviewed',
    'Payment plan tested against your position',
    'Delivery and exit risk stated plainly',
  ],
  'residential-mortgages': [
    'Structured around your position',
    'Compared across the market, not one lender',
    'Pre-approval to drawdown with one adviser',
  ],
  'commercial-mortgages': [
    'Income-producing and owner-occupied property',
    'Covenants and valuation treatment explained',
    'Bank-ready packs UAE lenders approve',
  ],
  'mortgage-pre-approval': [
    'Know what you can borrow before you commit',
    'Documentation prepared to lender standard',
    'Terms known before the property search',
  ],
  refinancing: [
    'Existing facility reviewed against the market',
    'Moved only where that pays',
    'Fees and exit costs counted in',
  ],
  'non-resident-mortgages': [
    'Finance for overseas buyers',
    'The documentation and structuring that requires',
    'Lender caps compared, not assumed',
  ],
  'islamic-finance': [
    'Sharia-compliant property finance',
    'Compared on the same evidence as conventional terms',
    'What the facility really costs, stated plainly',
  ],
  'business-valuation': [
    'Independent enterprise value',
    'Transactions, disputes and reporting',
    'No contingent fees, no pressure',
  ],
  'company-valuation': [
    'Whole-company and shareholding values',
    'Recognised methods, senior review',
    'A report a board can rely on',
  ],
  'asset-valuation': [
    'Property valued to RICS Red Book standards',
    'Through group firm Reliant Surveyors',
    'Accepted by UAE banks and courts',
  ],
  'plant-and-machinery-valuation': [
    'Asset-level valuation',
    'Finance, insurance and balance-sheet purposes',
    'Inspection, cost data and market evidence',
  ],
  'financial-valuation': [
    'Values for financial reporting',
    'Impairment and audit support',
    'Working papers handed to the auditor',
  ],
  'market-research': [
    'Demand, supply and pricing evidence',
    'Primary and secondary research',
    'For the market you are about to enter',
  ],
  'feasibility-studies': [
    'Whether a scheme stacks up',
    'Highest and best use tested',
    'Scenarios and sensitivities stress-tested',
  ],
  'investment-research': [
    'The investment case framed',
    'Evidence gathered and verified',
    'A defensible go / no-go',
  ],
  'market-intelligence': [
    'Current market evidence, tracked',
    'The markets you operate in',
    'Delivered to the people who act on it',
  ],
  'real-estate-research': [
    'Residential and commercial market evidence',
    'Pricing, absorption and supply',
    'Independent of any transaction',
  ],
  'research-reports': [
    'Written for a board or an investor',
    'Sourced and reviewed by a senior adviser',
    'A report the room can act on',
  ],
  'technology-consulting': [
    'Diagnose before you buy',
    'A vendor-neutral roadmap',
    'Sequencing and budget the business can absorb',
  ],
  'enterprise-solutions': [
    'Enterprise and cloud systems',
    'Processes documented, foundations in place',
    'UAE data and e-invoicing requirements built in',
  ],
  'erp-dashboards': [
    'Month-end becomes a live view',
    'Dashboards leadership actually reads',
    'Finance made measurable and repeatable',
  ],
  'ai-solutions': [
    'AI where the case holds',
    'Built and measured like an investment',
    'Adoption and impact tracked back to the case',
  ],
  proptech: [
    'Platforms for property businesses',
    'Market data turned into decisions',
    'Delivered with vendor discipline',
  ],
};

/** The extras for a practice, or null. */
export function uaeServiceExtras(slug: string): UaeServiceExtras | null {
  return UAE_SERVICE_EXTRAS[slug] ?? null;
}

/** What a practice's engagement leaves in the client's file. */
export function uaeServiceDeliverables(slug: string): UaeDeliverable[] {
  return UAE_SERVICE_DELIVERABLES[slug] ?? [];
}

/** The three proof points listed under a sub-service in the explorer. */
export function uaeServicePoints(child: string): string[] {
  return UAE_SERVICE_POINTS[child] ?? [];
}
