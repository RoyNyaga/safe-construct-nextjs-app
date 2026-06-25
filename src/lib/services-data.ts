import { Ruler, HardHat, Eye, Calculator } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ServiceDefinition = {
  slug: string
  icon: LucideIcon
  color: string
  type: 'custom_design' | 'construction_bid' | 'supervision_qa' | 'cost_estimate'
  deliverables: string[]
  process: { title: string; desc: string }[]
  differentiators: string[]
  faqs: { q: string; a: string }[]
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: 'architectural-design',
    icon: Ruler,
    color: '#F26419',
    type: 'custom_design',
    deliverables: [
      'Floor plan drawings',
      '3D elevation renderings',
      'Section drawings',
      'Site plan layout',
      'Structural layout sketch',
      'Material & finish schedule',
    ],
    process: [
      { title: 'Initial Consultation', desc: 'We listen to your vision, site conditions, budget, and lifestyle requirements.' },
      { title: 'Concept Design', desc: 'We produce sketch concepts and floor plan options for your review.' },
      { title: 'Design Development', desc: 'Approved concept is developed into full architectural drawings.' },
      { title: '3D Visualisation', desc: 'Photorealistic renders of your building exterior and key interior spaces.' },
      { title: 'Final Delivery', desc: 'Complete digital package delivered in PDF and DWG format.' },
    ],
    differentiators: [
      'Licensed architects with 10+ years of residential experience',
      'Designs optimised for Cameroonian climate and regulations',
      'Revisions included until you\'re fully satisfied',
      'Delivered in 10–21 business days',
    ],
    faqs: [
      { q: 'Can I request changes after seeing the first draft?', a: 'Yes — two rounds of revisions are included in the standard package. Additional revisions are billed at a flat rate.' },
      { q: 'Do you design commercial buildings?', a: 'Yes. We design commercial, mixed-use, and multi-unit residential buildings in addition to private homes.' },
      { q: 'What file formats will I receive?', a: 'You will receive your complete design package as PDF drawings and, on request, DWG/CAD files compatible with AutoCAD and ArchiCAD.' },
    ],
  },
  {
    slug: 'general-contracting',
    icon: HardHat,
    color: '#F6AE2D',
    type: 'construction_bid',
    deliverables: [
      'Excavation & foundation work',
      'Reinforced concrete structure',
      'Masonry & block work',
      'Roofing system',
      'Plumbing & electrical rough-in',
      'Interior plastering & tiling',
      'Painting & exterior finishing',
    ],
    process: [
      { title: 'Submit Your Plans', desc: 'Provide your approved architectural plans. We review and assess feasibility.' },
      { title: 'Detailed Quotation', desc: 'Receive an itemised cost breakdown covering all materials and labour.' },
      { title: 'Contract & Mobilisation', desc: 'Sign the contract and we begin site preparation and procurement.' },
      { title: 'Construction', desc: 'Our teams execute every phase under strict quality supervision.' },
      { title: 'Handover', desc: 'Final inspection, punch list, and keys handed over to you.' },
    ],
    differentiators: [
      'End-to-end project management — no sub-contracting surprises',
      'Transparent cost tracking with weekly budget reports',
      'Vetted, experienced site teams',
      'Milestone-based payment schedule',
    ],
    faqs: [
      { q: 'Do I need to have my plans ready before contacting you?', a: 'Ideally yes, but we can also help you source or produce the plans through our Architectural Design service.' },
      { q: 'How long does construction typically take?', a: 'A standard 3-bedroom villa typically takes 8–14 months. Timeline depends on size, design complexity, and material availability.' },
    ],
  },
  {
    slug: 'construction-supervision',
    icon: Eye,
    color: '#42A5F5',
    type: 'supervision_qa',
    deliverables: [
      'Regular on-site inspection visits',
      'Photo-documented inspection reports',
      'Quality checklists per construction phase',
      'Material verification & testing oversight',
      'Defect identification & contractor notifications',
      'Client progress reports delivered digitally',
    ],
    process: [
      { title: 'Site Assessment', desc: 'We visit your site and review the existing plans and contractor agreement.' },
      { title: 'Inspection Schedule', desc: 'A visit frequency is agreed upon (weekly, bi-weekly, or milestone-based).' },
      { title: 'On-Site Inspections', desc: 'Our engineers conduct inspections against approved plans and standards.' },
      { title: 'Report Delivery', desc: 'Detailed reports with photos sent to you after every visit.' },
      { title: 'Final Sign-Off', desc: 'Comprehensive final inspection checklist before handover.' },
    ],
    differentiators: [
      'Qualified engineers with hands-on site experience',
      'Independent — we work for you, not the contractor',
      'Photo evidence included in every report',
      'Quick escalation process for defects',
    ],
    faqs: [
      { q: 'Can you supervise a project where construction has already started?', a: 'Yes — we can onboard at any phase. We will conduct an initial audit of work completed to date before starting regular inspections.' },
      { q: 'What happens if the contractor ignores our defect reports?', a: 'We escalate formally in writing and can, if required, advise you on contractual remedies and recommend alternative contractors.' },
    ],
  },
  {
    slug: 'cost-estimation',
    icon: Calculator,
    color: '#66BB6A',
    type: 'cost_estimate',
    deliverables: [
      'Itemised Bill of Quantities (BOQ)',
      'Material specifications & unit rates',
      'Labour cost breakdown by trade',
      'Contingency & provisional allowances',
      'Phase-by-phase cost schedule',
      'Comparison of finish quality tiers',
    ],
    process: [
      { title: 'Plan Review', desc: 'We review your architectural drawings and site conditions.' },
      { title: 'Quantity Take-Off', desc: 'Every element of the build is measured and quantified.' },
      { title: 'Pricing', desc: 'Current local market rates applied to each line item.' },
      { title: 'BOQ Report', desc: 'A full, structured Bill of Quantities delivered in Excel and PDF.' },
      { title: 'Briefing', desc: 'Optional call to walk through the estimate and answer questions.' },
    ],
    differentiators: [
      'Based on current local Cameroonian market pricing',
      'Delivered within 5–7 business days',
      'Helps you negotiate confidently with contractors',
      'Reduces the risk of unexpected costs mid-build',
    ],
    faqs: [
      { q: 'Is the estimate legally binding?', a: 'No — a cost estimate is an advisory document to help you plan and budget. Actual costs depend on the contractor you hire and market fluctuations.' },
      { q: 'Can I get an estimate without final architectural drawings?', a: 'Yes — we can produce a rough estimate from sketch plans or your brief, clearly marked as preliminary. A detailed BOQ requires finalised drawings.' },
    ],
  },
]

export const SERVICE_META: Record<string, { name: string; tagline: string; ctaLabel: string; summary: string }> = {
  'architectural-design': {
    name: 'Architectural Design',
    tagline: 'From your vision to a complete set of construction-ready drawings.',
    ctaLabel: 'Request a Custom Design',
    summary: 'Custom architectural plans tailored to your lifestyle, budget and location. Floor plans, 3D renders, elevations and full documentation.',
  },
  'general-contracting': {
    name: 'General Contracting',
    tagline: 'End-to-end construction management from foundation to handover.',
    ctaLabel: 'Submit Your Plan for a Quote',
    summary: 'We coordinate every trade, manage your timeline and budget, and build your project to the highest standard — start to finish.',
  },
  'construction-supervision': {
    name: 'Construction Supervision',
    tagline: 'Independent quality assurance so your builder stays accountable.',
    ctaLabel: 'Request Supervision & QA',
    summary: 'Regular on-site inspections, photo-documented reports, and defect tracking — protecting your investment throughout the build.',
  },
  'cost-estimation': {
    name: 'Cost Estimation',
    tagline: 'Know the real cost before a single brick is laid.',
    ctaLabel: 'Get an Estimate',
    summary: 'Detailed Bill of Quantities with current local market rates. Reduce guesswork and negotiate with confidence.',
  },
}
