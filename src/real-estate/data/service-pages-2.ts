/**
 * The five sector and advisory pages.
 *
 * These exist because the landing page advertises them. Residential,
 * Commercial, Mortgage Services, Investment and Valuations & Advisory are all
 * named as services on the pillar page; before this file they had no pages and
 * their buttons pointed at whichever of the three transaction pages was
 * closest, or at a contact anchor. A service the site names but cannot open is
 * worse than one it never mentions.
 *
 * They are kept separate from pages.ts only for file size — both are merged
 * into SERVICE_PAGES there, and the route resolves any slug in the map.
 *
 * DIVISION OF LABOUR, so the eight pages do not compete with each other:
 *   buy-property        the mechanics of transacting a purchase
 *   sell-rent-lease     the mechanics of disposing or letting
 *   off-plan-properties assessing a launch before committing
 *   residential         matching a household to a community and a home
 *   commercial          premises for a business, and commercial stock
 *   mortgage-services   arranging the financing
 *   investment-advisory building and running a portfolio
 *   valuations-advisory independent valuation as a professional service
 *
 * ON THE NUMBERS: nothing here states a fee, an LTV cap or a visa threshold as
 * fact. UAE lending rules and fee schedules change, and a figure quoted wrongly
 * on a service page is a commercial promise the practice has to honour. Where a
 * number matters, the copy describes the mechanism and says the current figure
 * is confirmed in writing. Do not "helpfully" fill these in without a source.
 */
/*
 * ON THE HERO PHOTOGRAPHS, 2026-09-08. These four opened on the stock the home
 * page dropped — a handshake, a glowing data chart, a keychain and a man in
 * front of a neon "CAPITAL MARKET" graph. It mattered more here than it did
 * there: the rebuilt template gives every page a FULL-SCREEN masthead, so that
 * stock was the first and largest thing a visitor saw on four of eleven pages.
 * They are Dubai property now, from img/services/.
 */
import type { ServicePage } from '../lib/types';

const RESIDENTIAL: ServicePage = {
  slug: 'residential',
  eyebrow: 'Residential',
  title: 'The Right Home,',
  titleAccent: 'In the Right Community.',
  lede: 'Choosing where to live in Dubai is a decision about schools, commutes, service charges and how a building is actually run — not just about the apartment. We start with the household, not the listing.',
  heroImg: '/real-estate/img/services/residential.webp',
  highlights: [
    { value: 'Community', label: 'First, not last', detail: 'The building matters less than the neighbourhood you wake up in.' },
    { value: 'Handover', label: 'Quality checked', detail: 'We inspect what the developer actually delivered, not the brochure.' },
    { value: 'Whole cost', label: 'Stated upfront', detail: 'Service charge, chiller and DEWA modelled before you commit.' },
  ],
  offerTitle: 'What We Do for Residential Buyers and Tenants',
  offerLede:
    'A home is a long commitment to a place. These are the things that decide whether you are still happy with it in three years, and they are rarely on the listing.',
  offer: [
    {
      title: 'Community Matching',
      summary: 'Where you live decides most of your daily experience.',
      bullets: ['Schools, commute and amenity mapped', 'Freehold zones explained', 'Resale and rental depth assessed'],
    },
    {
      title: 'Building Due Diligence',
      summary: 'Two towers on the same street are not the same asset.',
      bullets: ['Service charge history reviewed', 'Owners association and management', 'Maintenance and common-area condition'],
    },
    {
      title: 'Running Cost Modelling',
      summary: 'The mortgage is rarely the whole monthly figure.',
      bullets: ['Service charge per square foot', 'Chiller: free, paid or district', 'DEWA connection and deposits'],
    },
    {
      title: 'Accompanied Viewings',
      summary: 'Viewings arranged around your schedule, with someone who has seen the stock.',
      bullets: ['Shortlist filtered before you travel', 'Honest comparison after each viewing', 'Second viewings at different times of day'],
    },
    {
      title: 'Family Requirements',
      summary: 'Layout, storage, outdoor space and school runs.',
      bullets: ['Villa, townhouse or apartment weighed', 'Maid and driver provision where needed', 'Pet and community rules confirmed'],
    },
    {
      title: 'Snagging & Handover',
      summary: 'Defects are far easier to fix before you move in.',
      bullets: ['Independent snagging inspection', 'Defects logged and pursued', 'Utilities and Ejari registered'],
    },
  ],
  stepsTitle: 'How a Residential Search Runs',
  steps: [
    { number: '01', title: 'The Brief', body: 'We establish the household: who lives there, where they work and study, what the budget covers, and what would make the move a mistake.' },
    { number: '02', title: 'Community Shortlist', body: 'We narrow to two or three communities and set out the trade-offs — price, commute, amenity, and how well each holds its value.' },
    { number: '03', title: 'Property Shortlist & Viewings', body: 'Verified availability only. We arrange the viewings and report honestly on each, including the ones we would advise against.' },
    { number: '04', title: 'Offer to Handover', body: 'We negotiate, verify title and service charges, manage the transfer or tenancy, and coordinate snagging before you take the keys.' },
  ],
  faqs: [
    {
      q: 'Which Dubai communities suit families with school-age children?',
      a: 'It depends far more on the specific school than the community. We work backwards from the schools you would accept, map the realistic morning commute to each, and shortlist communities from there. A ten-minute difference on paper can be thirty in term-time traffic.',
    },
    {
      q: 'What is a service charge and why does it vary so much?',
      a: 'It is the annual per-square-foot levy that funds the building’s upkeep, security, insurance and common areas, set through the owners association and overseen by the regulator. Towers with extensive amenity — pools, gyms, concierge, district cooling — carry materially higher charges. We pull the recent history for any building you are serious about, because a low purchase price with a high charge can be the worse deal.',
    },
    {
      q: 'What does "chiller free" actually mean?',
      a: 'It means the cost of cooling is included in your rent or service charge rather than billed to you separately. Where it is not included, cooling is often the largest single utility cost in summer. It is a real difference in monthly outgoings and worth pricing before comparing two properties.',
    },
    {
      q: 'Should I buy a ready home or wait for an off-plan handover?',
      a: 'If you need somewhere to live now, buy ready — you can inspect exactly what you are getting and move in. Off-plan suits buyers with time and somewhere to live meanwhile. We cover the launch assessment separately on our off-plan page.',
    },
    {
      q: 'Can I rent first and buy later in the same community?',
      a: 'Often the sensible route. A year in the community tells you things no viewing will — traffic at 8am, how the building is managed, whether the amenity is actually used. We are happy to arrange the letting and revisit the purchase later.',
    },
  ],
  ctaTitle: 'Start With the Household, Not the Listing',
  ctaBody: 'Tell us who is moving and what the day looks like, and we will come back with communities and homes that genuinely fit — including the ones we would rule out.',
};

const COMMERCIAL: ServicePage = {
  slug: 'commercial',
  eyebrow: 'Commercial',
  title: 'Premises That Fit',
  titleAccent: 'How You Actually Operate.',
  lede: 'Offices, retail, F&B, warehousing and light industrial across Dubai — advised on the things that decide whether a space works: permitted use, fit-out terms, licensing and the real cost of occupation.',
  heroImg: '/real-estate/img/services/commercial.webp',
  highlights: [
    { value: 'Permitted use', label: 'Verified first', detail: 'A unit your licence cannot occupy is not an option.' },
    { value: 'Fit-out', label: 'Terms negotiated', detail: 'Rent-free periods are part of the price, not a favour.' },
    { value: 'Both sides', label: 'Landlord or tenant', detail: 'We represent one side of a deal, and say which.' },
  ],
  offerTitle: 'What We Handle on Commercial Space',
  offerLede:
    'A commercial lease commits a business for years and is far harder to exit than a home. The terms matter as much as the rent, and most of the cost is decided before signature.',
  offer: [
    {
      title: 'Requirement & Licence Fit',
      summary: 'What your trade licence permits comes before what you like.',
      bullets: ['Permitted use confirmed per unit', 'Free zone vs mainland implications', 'Headcount and growth allowed for'],
    },
    {
      title: 'Office Space',
      summary: 'Fitted, shell-and-core, or serviced — each has a different true cost.',
      bullets: ['Fitted vs shell cost compared', 'Parking ratio confirmed', 'Floor plate and layout efficiency'],
    },
    {
      title: 'Retail & F&B',
      summary: 'Footfall, frontage, and whether the kitchen can legally exist.',
      bullets: ['Footfall and catchment reviewed', 'Extraction and grease trap checked', 'Signage and frontage rights'],
    },
    {
      title: 'Warehousing & Industrial',
      summary: 'Clear height, power and access decide what you can run.',
      bullets: ['Clear height and floor loading', 'Power capacity confirmed', 'Loading bays and truck access'],
    },
    {
      title: 'Lease Negotiation',
      summary: 'Rent is one line of many that cost money.',
      bullets: ['Rent-free and fit-out periods', 'Escalation and renewal terms', 'Reinstatement obligations at exit'],
    },
    {
      title: 'Commercial Acquisition',
      summary: 'For buyers of commercial stock rather than occupiers.',
      bullets: ['Tenant covenant assessed', 'Passing rent vs market rent', 'Ejari and title verified'],
    },
  ],
  stepsTitle: 'How a Commercial Requirement Runs',
  steps: [
    { number: '01', title: 'Operational Brief', body: 'Headcount, licence activity, power and access needs, growth horizon, and the date you must be operating by.' },
    { number: '02', title: 'Market Search', body: 'We search on-market and off-market stock that actually permits your use, and set out the total occupation cost of each option rather than the headline rent.' },
    { number: '03', title: 'Negotiation', body: 'Rent, rent-free, fit-out contribution, escalation, renewal and reinstatement are negotiated together — conceding one to win another is how tenants overpay.' },
    { number: '04', title: 'Fit-Out & Occupation', body: 'We manage Ejari or the transfer, coordinate approvals for fit-out, and hand over a space you can trade from.' },
  ],
  faqs: [
    {
      q: 'What is the difference between a free zone and a mainland commercial lease?',
      a: 'It follows your trade licence. A free zone licence generally requires premises inside that free zone, while a mainland licence allows premises across the mainland and is registered through Ejari. Which you hold constrains where you can legally operate, so we confirm the licence before searching.',
    },
    {
      q: 'What does shell-and-core mean, and should I take it?',
      a: 'Shell-and-core is an unfinished space — structure, core services to the boundary, and nothing else. You build everything inside. It usually carries a lower rent and a fit-out period rent-free, but the capital cost of fitting out is yours and rarely recoverable at exit. Fitted space costs more per year and far less upfront. Which is cheaper depends entirely on your lease length.',
    },
    {
      q: 'Can I open a restaurant in any retail unit?',
      a: 'No. F&B needs the right permitted use plus practical provisions — kitchen extraction, grease interception, gas where required, and adequate power. Retrofitting these into a unit not designed for them is expensive and sometimes impossible. We check them before you fall in love with a location.',
    },
    {
      q: 'What is reinstatement and why does it matter at the end?',
      a: 'It is the obligation to return the premises to their original condition when the lease ends — often stripping out the fit-out you paid for. It is a real cost that lands years later, and it is negotiable at the start. Tenants routinely sign it without pricing it.',
    },
  ],
  ctaTitle: 'Tell Us How the Business Operates',
  ctaBody: 'Headcount, licence, power, access and the date you need to be trading. We will come back with premises that work and the full cost of occupying each.',
};

const MORTGAGE: ServicePage = {
  slug: 'mortgage-services',
  eyebrow: 'Mortgage Services',
  title: 'Financing Compared,',
  titleAccent: 'Not Just Arranged.',
  lede: 'We approach the market as a whole rather than one lender, put the offers side by side, and manage the process from pre-approval through to the bank’s valuation and drawdown.',
  heroImg: '/real-estate/img/services/mortgage.webp',
  highlights: [
    { value: 'Whole market', label: 'Not one bank', detail: 'Offers compared across UAE lenders on like-for-like terms.' },
    { value: 'Reversion', label: 'Rate modelled', detail: 'The rate after the fixed period, not just the headline.' },
    { value: 'Written', label: 'Costs upfront', detail: 'Arrangement, valuation and insurance stated before you apply.' },
  ],
  offerTitle: 'What We Do on Financing',
  offerLede:
    'The advertised rate is the least useful number a lender gives you. What decides the cost is the reversion rate, the fees, the insurance requirement and the early-settlement terms.',
  offer: [
    {
      title: 'Eligibility Review',
      summary: 'What you can borrow, before you start looking.',
      bullets: ['Income and liability assessment', 'Resident and non-resident routes', 'Salaried vs self-employed evidence'],
    },
    {
      title: 'Pre-Approval',
      summary: 'A pre-approval makes your offer credible to a seller.',
      bullets: ['Documentation prepared with you', 'Submitted and chased to issue', 'Validity period tracked'],
    },
    {
      title: 'Offer Comparison',
      summary: 'Side by side on the terms that actually cost money.',
      bullets: ['Fixed period and reversion rate', 'Arrangement and valuation fees', 'Early settlement terms'],
    },
    {
      title: 'Bank Valuation',
      summary: 'The lender values the property, and it can differ from your price.',
      bullets: ['Valuation instructed and tracked', 'Shortfall implications explained', 'Challenged where evidence supports it'],
    },
    {
      title: 'Insurance Requirements',
      summary: 'Life and property cover are conditions, not extras.',
      bullets: ['Cover requirements explained', 'Quotes compared', 'Assignment handled with the lender'],
    },
    {
      title: 'Refinance & Buyout',
      summary: 'For borrowers already holding a mortgage.',
      bullets: ['Existing rate benchmarked', 'Settlement cost weighed against saving', 'Transfer between lenders managed'],
    },
  ],
  stepsTitle: 'How a Mortgage Application Runs',
  steps: [
    { number: '01', title: 'Assessment', body: 'We review income, existing commitments, residency status and the property type, and tell you what is realistically available before you commit to anything.' },
    { number: '02', title: 'Pre-Approval', body: 'We prepare the file, submit to the lenders whose criteria you actually fit, and manage it to a written pre-approval.' },
    { number: '03', title: 'Offer & Valuation', body: 'Once a property is agreed, the lender instructs its valuation. We track it and explain the consequences if it comes in below the agreed price.' },
    { number: '04', title: 'Final Offer & Drawdown', body: 'We manage conditions, insurance assignment and the coordination between lender, seller and the transfer itself.' },
  ],
  faqs: [
    {
      q: 'Can a non-resident get a mortgage in the UAE?',
      a: 'Yes, several UAE lenders finance non-residents, though the criteria are tighter than for residents and the maximum loan-to-value is lower. Eligible nationalities, minimum income and acceptable property types vary by bank. We confirm current criteria with the lenders directly at the point you apply rather than working from published summaries, which date quickly.',
    },
    {
      q: 'What deposit will I need?',
      a: 'It depends on your residency status, whether it is your first property, the value, and whether the property is ready or off-plan. Regulatory caps set the ceiling and individual lenders often sit below it. We give you the current figure for your specific situation in writing before you make an offer — quoting a general percentage here would be unreliable.',
    },
    {
      q: 'What is the reversion rate and why does it matter more than the headline?',
      a: 'Most UAE mortgages offer a fixed rate for an initial period, then revert to a variable rate — typically a published benchmark plus a margin. That margin is fixed for the life of the loan and is where the long-term cost sits. A very attractive fixed rate with a poor reversion margin usually costs more over the full term.',
    },
    {
      q: 'What happens if the bank values the property below the agreed price?',
      a: 'The lender lends against its own valuation, not your price. If it comes in lower you must fund the gap in cash, renegotiate with the seller, or withdraw. It is one of the more common reasons a purchase falls over, which is why we track the valuation closely and prepare you for the possibility.',
    },
    {
      q: 'Can I get a mortgage on an off-plan property?',
      a: 'Financing an off-plan purchase is possible but works differently — many lenders will only fund at or near handover rather than during construction, so the construction-stage payments come from your own funds. We model the cash requirement across the payment plan so there is no gap you cannot bridge.',
    },
  ],
  ctaTitle: 'Find Out What You Can Actually Borrow',
  ctaBody: 'A short conversation about income, commitments and status gives you a realistic borrowing figure — before you start viewing properties you may not be able to finance.',
};

const INVESTMENT: ServicePage = {
  slug: 'investment-advisory',
  eyebrow: 'Investment Advisory',
  title: 'Yield You Keep,',
  titleAccent: 'Not Yield on Paper.',
  lede: 'Gross yield is a marketing number. We model what a property actually returns after service charges, voids, management and the cost of getting in and out — then build a portfolio around it.',
  heroImg: '/real-estate/img/services/investment.webp',
  highlights: [
    { value: 'Net', label: 'Not gross', detail: 'Modelled after charges, voids and management.' },
    { value: 'Exit', label: 'Planned at entry', detail: 'How you leave decides what the holding was worth.' },
    { value: 'Independent', label: 'No inventory', detail: 'We hold no stock, so no property needs shifting.' },
  ],
  offerTitle: 'What Investment Advisory Covers',
  offerLede:
    'Most Dubai investment cases are argued on gross yield and capital growth assumptions. The work that matters is the part underneath: what erodes the return, and what happens when you want out.',
  offer: [
    {
      title: 'Net Yield Modelling',
      summary: 'The number after everything that reduces it.',
      bullets: ['Service charge and chiller deducted', 'Void periods assumed honestly', 'Management and re-letting costed'],
    },
    {
      title: 'Yield vs Growth',
      summary: 'Income now and capital later pull in different directions.',
      bullets: ['Objective established first', 'Communities matched to the objective', 'Trade-offs stated plainly'],
    },
    {
      title: 'Letting Strategy',
      summary: 'Long-term and short-term are different businesses.',
      bullets: ['Long-let vs short-let compared', 'Short-let permits and rules', 'Furnishing and operating cost'],
    },
    {
      title: 'Portfolio Construction',
      summary: 'Several units in one tower is one bet, not a portfolio.',
      bullets: ['Spread across communities and types', 'Concentration risk identified', 'Phasing acquisitions over time'],
    },
    {
      title: 'Financing & Leverage',
      summary: 'Borrowing amplifies the outcome in both directions.',
      bullets: ['Cash vs leveraged return compared', 'Rate sensitivity tested', 'Currency exposure noted for overseas buyers'],
    },
    {
      title: 'Exit Planning',
      summary: 'Decided at purchase, not when you want to sell.',
      bullets: ['Realistic holding period set', 'Resale depth of the community', 'Transaction costs on both ends'],
    },
  ],
  stepsTitle: 'How an Investment Mandate Runs',
  steps: [
    { number: '01', title: 'Objective & Constraints', body: 'Income or growth, holding period, appetite for management, currency and financing position. The answers change which communities are even worth looking at.' },
    { number: '02', title: 'Market Analysis', body: 'We assess supply pipeline, rental depth and service charge levels in the communities that fit the objective, and rule out those that do not.' },
    { number: '03', title: 'Underwriting', body: 'Each candidate is modelled to a net figure with the assumptions written down, so you can challenge them rather than take them on trust.' },
    { number: '04', title: 'Acquisition & Ongoing Review', body: 'We handle the purchase, arrange letting or management, and review the portfolio against the original assumptions rather than filing them away.' },
  ],
  faqs: [
    {
      q: 'What is the difference between gross and net yield?',
      a: 'Gross yield is annual rent divided by purchase price. Net yield subtracts what you actually pay to hold and let the property: service charge, cooling where not recovered, management, re-letting costs, maintenance and realistic void periods. The gap between the two is routinely substantial, and it is the net figure that reaches you.',
    },
    {
      q: 'Is short-term letting more profitable than a long lease?',
      a: 'Gross income is usually higher and net income often is not. Short-term letting requires the appropriate permit, carries furnishing and operating costs, higher management fees, utilities in your name, and occupancy that varies by season. It is an operating business rather than a passive holding. We model both before recommending either.',
    },
    {
      q: 'Does buying property in Dubai grant residency?',
      a: 'Property ownership can support a residency visa where the investment meets the qualifying criteria, which are set by the authorities and have changed more than once. Thresholds, whether mortgaged property qualifies, and the documentation required all need confirming against current rules at the time you apply. We will not quote a figure here that may be out of date by the time you read it.',
    },
    {
      q: 'How many properties make a portfolio rather than a bet?',
      a: 'It is about spread, not count. Three units in the same tower share one service charge regime, one owners association, one supply pipeline and one tenant pool — that is a single concentrated position. Spreading across communities, price points and asset types is what actually diversifies the risk.',
    },
    {
      q: 'What are the real costs of getting in and out?',
      a: 'Entry carries the DLD transfer fee, trustee office fee, agency commission and, where financed, mortgage registration and bank fees. Exit carries agency commission, a developer NOC and any early settlement charge. Together they set a minimum holding period below which a sale is unlikely to make sense, and we set that out before you buy.',
    },
  ],
  ctaTitle: 'Have the Numbers Checked Before You Commit',
  ctaBody: 'Send us the property or the pitch you have been given, and we will model it to a net figure with the assumptions written down for you to challenge.',
};

const VALUATIONS: ServicePage = {
  slug: 'valuations-advisory',
  eyebrow: 'Valuations & Advisory',
  title: 'An Independent Figure,',
  titleAccent: 'Evidenced and Defensible.',
  lede: 'RICS and RERA-aligned valuations across residential, commercial and industrial assets — prepared for lenders, auditors, courts and boards by a valuer with no interest in the outcome.',
  heroImg: '/real-estate/img/valuation.webp',
  highlights: [
    { value: 'RICS', label: 'Red Book standard', detail: 'Prepared to a recognised professional standard.' },
    { value: 'RERA', label: 'Registered valuers', detail: 'Registration is what makes a report acceptable.' },
    { value: 'Independent', label: 'By construction', detail: 'The valuer is never the agent selling the asset.' },
  ],
  offerTitle: 'What We Value, and What For',
  offerLede:
    'A valuation is prepared for a stated purpose and a stated date. The same asset can carry different figures for lending, for accounts and for a dispute — and a report written for one purpose should not be relied on for another.',
  offer: [
    {
      title: 'Secured Lending',
      summary: 'For banks deciding what to lend against an asset.',
      bullets: ['Market value on Red Book basis', 'Bank panel requirements met', 'Reinstatement cost where required'],
    },
    {
      title: 'Financial Reporting',
      summary: 'For auditors and year-end accounts.',
      bullets: ['Fair value for reporting standards', 'Investment property portfolios', 'Consistent basis year to year'],
    },
    {
      title: 'Transactions',
      summary: 'An independent view before you commit a price.',
      bullets: ['Acquisition and disposal advice', 'Comparable evidence disclosed', 'Negotiating position supported'],
    },
    {
      title: 'Disputes & Legal',
      summary: 'Where a figure has to withstand challenge.',
      bullets: ['Court and arbitration reporting', 'Probate and estate division', 'Expert evidence where instructed'],
    },
    {
      title: 'Plant & Machinery',
      summary: 'Industrial assets valued in their own right.',
      bullets: ['Equipment and installed plant', 'In-situ and ex-situ bases', 'Insurance and finance purposes'],
    },
    {
      title: 'Advisory & Consultancy',
      summary: 'Where the question is broader than a number.',
      bullets: ['Highest and best use', 'Feasibility and development appraisal', 'Portfolio strategy review'],
    },
  ],
  stepsTitle: 'How a Valuation Instruction Runs',
  steps: [
    { number: '01', title: 'Scope & Purpose', body: 'We agree the purpose, the basis of value, the valuation date and who is entitled to rely on the report. This is confirmed in writing before work starts, because it determines everything that follows.' },
    { number: '02', title: 'Information & Inspection', body: 'We collect title, tenancy, floor areas and service charge information, and inspect the property. A desktop assessment is possible for some purposes and is stated as such.' },
    { number: '03', title: 'Analysis', body: 'Comparable transactions and, where relevant, income and cost approaches are applied. The evidence used is set out in the report rather than summarised as a conclusion.' },
    { number: '04', title: 'Report & Discussion', body: 'You receive the report with its assumptions and limitations stated, and we will talk it through. Where you disagree, bring evidence and we will consider it.' },
  ],
  faqs: [
    {
      q: 'Why can the valuer not be the same firm selling the property?',
      a: 'Because the valuation would not be independent. A firm earning commission on a sale has an interest in the figure. Professional standards separate the two roles, and lenders, auditors and courts will not accept a report where that separation is absent. It is the reason the valuation practice sits apart from the agency work.',
    },
    {
      q: 'What is the RICS Red Book?',
      a: 'It is the professional standard governing how valuations are prepared and reported — the bases of value, the assumptions to disclose, the conflicts to declare and the form the report takes. Working to it is what makes a valuation something a third party can rely on rather than an opinion.',
    },
    {
      q: 'Why does a valuation differ from what an agent says my property is worth?',
      a: 'An agent gives an asking-price opinion aimed at winning the instruction and attracting interest. A valuation is a considered figure at a stated date, on a defined basis, supported by disclosed comparable evidence, prepared by someone with no stake in the outcome. They answer different questions.',
    },
    {
      q: 'Can you value without inspecting the property?',
      a: 'For some purposes, yes — a desktop or restricted assessment based on supplied information. It carries stated limitations and is not appropriate for every purpose; most lenders and auditors require inspection. We will tell you which your purpose allows before you instruct.',
    },
    {
      q: 'What do you need from me to start?',
      a: 'Title deed, floor plans or area schedules, any tenancy agreements and Ejari, recent service charge statements, and access for the inspection. For plant and machinery, an asset register with dates and specifications. Missing information becomes a stated assumption, so the more you provide, the tighter the figure.',
    },
  ],
  ctaTitle: 'Instruct a Valuation',
  ctaBody: 'Tell us the asset and what the figure is for, and we will confirm scope, basis, timescale and fee in writing before any work begins.',
};

export const SECTOR_PAGES: ServicePage[] = [
  RESIDENTIAL,
  COMMERCIAL,
  MORTGAGE,
  INVESTMENT,
  VALUATIONS,
];
