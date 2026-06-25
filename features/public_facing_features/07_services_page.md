# Feature 07: Services Pages (Listing & Individual Service Landing Pages)

## 1. Overview

The Services section of the Safe-Construct website is the primary destination for visitors who want to understand what the company offers in detail. It consists of two levels:

1. **Services Listing Page (`/services`)** — A visually rich overview of all offered services, each presented as a distinct card with a representative photo and a brief value proposition. The goal is to guide the visitor toward the service most relevant to their current situation.

2. **Individual Service Landing Pages (`/services/[slug]`)** — A dedicated, in-depth page for each service. These pages are the primary conversion points — each one is crafted to address a specific client segment's concerns, explain the process, build confidence, and prompt action (via a form or a contact CTA).

The home page references services only at a high level. All detailed service information lives exclusively in these pages, keeping each surface focused and uncluttered.

**Client Segments Served**:
- Segment 1 — The Design Seeker → `/services/architectural-design`
- Segment 2 — The Ready-to-Build Client → `/services/general-contracting`
- Segment 3 — The Overseer → `/services/construction-supervision`
- Segment 4 — The Budget Planner → `/services/cost-estimation`

---

## 2. User Personas & Access Levels

- **Public / Guest Users**: All visitors, no authentication required.
- No writes to the database from static service pages except for lead capture form submissions (which insert into `service_requests`).

---

## 3. User Journey & Workflow

### 3.1 Services Listing Page (`/services`)

1. Visitor arrives at `/services` via:
   - The navigation bar `Services` link.
   - A `Explore Our Services` CTA on the home page.
2. The page loads with a short hero and a grid of four service cards.
3. Each service card displays:
   - A high-quality, contextually relevant header photo.
   - Service name.
   - A two-sentence summary of what the service is and who it is for.
   - A `Learn More` button.
4. Clicking a card or its button navigates to the individual service landing page.
5. No forms, no authentication, no database interaction.

### 3.2 Individual Service Landing Page (`/services/[slug]`)

1. Visitor arrives on a specific service page (e.g., `/services/architectural-design`).
2. The page loads with:
   - A full-width cinematic header photo representing the service.
   - The service name as the H1.
   - A compelling one-liner subtext.
3. The visitor scrolls through sections: what the service is, who it is for, how the process works, what is included, and FAQs.
4. A **sticky or prominent CTA** button (e.g., `Request This Service`) remains visible as the user scrolls.
5. Clicking the CTA either:
   - Opens a `CustomModal` with a service-specific request form (for Architectural Design, General Contracting, and Supervision), or
   - Scrolls to an inline lead form at the bottom of the page (for Cost Estimation — which includes the interactive estimator widget).
6. On form submission: a `service_requests` row is inserted with the appropriate `type` and client details.

---

## 4. Page Sections & UI/UX Requirements

### 4.1 Services Listing Page (`/services`)

#### Section 1: Page Hero
- **Half-screen height** (~50vh).
- Background: A panoramic photo of a construction site, architectural blueprints, or a completed building exterior.
- **H1**: *"What We Build. How We Help."* (or similar — confident, minimal).
- **Subtext**: One sentence: *"From architectural design to full construction management — choose the service that fits where you are today."*

#### Section 2: Service Cards Grid
- **2×2 grid** (desktop); single column (mobile).
- Each of the four service cards contains:
  - **Full-card background image**: A rich, contextually relevant photo (e.g., an architect reviewing blueprints for Design; construction workers for Contracting; an inspector with a checklist for Supervision; a calculator/spreadsheet for Estimation).
  - A **dark gradient overlay** at the bottom of the card for text legibility.
  - **Service icon** (top-left or centered).
  - **Service name** (H2, bold).
  - **Short description**: 2 sentences maximum.
  - **`Learn More →` button** (links to `/services/[slug]`).
- Cards have a hover effect: subtle scale-up and brightness increase (Framer Motion `whileHover`).
- Use `CustomTooltip` on each card to display a hint such as *"For clients who don't yet have an architectural plan."*

#### Section 3: CTA Strip
- Full-width strip: *"Not sure which service you need? Let's talk."*
- Single button: `Contact Us` → `/contact`.

---

### 4.2 Individual Service Landing Pages (`/services/[slug]`)

Each of the four service pages shares the same layout template but with distinct content, imagery, and CTA forms. Below are the layout sections followed by per-service content notes.

#### Shared Layout Template

**Section 1: Cinematic Header**
- **Full-width, tall header** (~70vh).
- Background: High-quality photo representing the specific service concept (see per-service notes below).
- **H1**: Service name.
- **Subtext**: One-sentence value proposition tailored to the visitor's situation.
- **Primary CTA button** (e.g., `Request Architectural Design`, `Get a Construction Quote`).
- A `← Back to Services` breadcrumb link.

**Section 2: What Is This Service?**
- Two-column layout: a descriptive paragraph on the left, a supporting photo or illustration on the right.
- Plain language: Who is this for? What problem does it solve?

**Section 3: What Is Included?**
- A bulleted or icon-grid list of specific deliverables.
- E.g., for Architectural Design: "Floor plan drawings," "3D elevation renderings," "Structural engineering review," etc.
- Use `CustomTooltip` on each deliverable item to explain it in non-technical terms.

**Section 4: How the Process Works**
- A numbered step-flow (3–5 steps) showing the end-to-end journey for this specific service.
- Each step has an icon, a title, and a one-line description.
- Animate steps in on scroll with staggered entrance (Framer Motion `whileInView`).

**Section 5: Why Choose Safe-Construct?**
- 3–4 differentiator bullets or cards (e.g., "10+ years of experience," "Licensed architects," "Independent QA inspectors," "Real-time progress reporting").

**Section 6: FAQ (Accordion)**
- 3–5 frequently asked questions specific to this service (MUI `Accordion`).
- Use `CustomTooltip` on each collapsed item to hint at the answer.

**Section 7: Lead Capture / Request Form**
- A full-width, visually distinct section with the service request form.
- Wrapped in a lightly-shaded background to visually separate it from the rest of the page.
- On submission: inserts into `service_requests` with the appropriate `type` enum value.
- Uses `LoadingButton` for the submit action.
- On success: `CustomNotification` (success variant): *"Your request has been received. We'll be in touch within 24–48 hours."*

---

### 4.3 Per-Service Content & Form Details

#### Service 1: Architectural Design (`/services/architectural-design`)
- **Header photo concept**: An architect's desk — open blueprint rolls, a scale model, pencils, a bright modern office.
- **CTA label**: `Request a Custom Design`
- **Form fields**:
  - Full Name (required)
  - Email (required)
  - Phone / WhatsApp (required)
  - Desired building style (Select: Bungalow, Duplex, Villa, Apartment, Other)
  - Approximate size (sqm) (optional)
  - Number of bedrooms (Select: 1–5+)
  - Special requirements / notes (Textarea)
- **`service_requests` type**: `'custom_design'`
- **Included deliverables**: Floor plans, elevation drawings, section drawings, site plan, structural layout, material schedule.

#### Service 2: General Contracting (`/services/general-contracting`)
- **Header photo concept**: A construction site in full activity — workers, scaffolding, a partially completed building structure.
- **CTA label**: `Submit Your Plan for a Quote`
- **Form fields**:
  - Full Name (required)
  - Email (required)
  - Phone / WhatsApp (required)
  - Upload existing architectural plan (PDF/image, required) — stored to Supabase Storage `documents` bucket
  - Estimated budget range (Select: ranges in local currency)
  - Expected start date (Date picker, optional)
  - Project location / address (required)
  - Additional notes (Textarea)
- **`service_requests` type**: `'construction_bid'`
- **Included deliverables**: Excavation, masonry, reinforced concrete structure, roofing, plumbing, electrical, interior plastering, tiling, painting, exterior finishing.

#### Service 3: Construction Supervision & QA (`/services/construction-supervision`)
- **Header photo concept**: An inspector on-site, clipboard in hand, reviewing concrete work or brick laying with a hard hat.
- **CTA label**: `Request Supervision & QA`
- **Form fields**:
  - Full Name (required)
  - Email (required)
  - Phone / WhatsApp (required)
  - Site address / location (required)
  - Current construction phase (Select: Foundation, Structure/Frame, Roofing, Finishing, Not Started)
  - Active contractor name (optional)
  - Inspection frequency preference (Select: Weekly, Bi-weekly, Monthly, One-time Audit)
  - Additional notes / concerns (Textarea)
- **`service_requests` type**: `'supervision_qa'`
- **Included deliverables**: Site visits, photo-documented inspection reports, quality checklists, material verification, defect reporting, client report delivery via the app.

#### Service 4: Cost Estimation (`/services/cost-estimation`)
- **Header photo concept**: A professional reviewing a budget spreadsheet or a Bill of Quantities document, with blueprints in the background.
- **CTA label**: `Get an Instant Estimate`
- **Layout note**: This page includes an **interactive estimator widget** (Section 6 replaces the static FAQ for this service page). After getting the estimate, the visitor is prompted to submit their email to receive a detailed breakdown — which also creates a `service_requests` entry.
- **Interactive Estimator Widget**:
  - Input: Building style (Select), floor count, bedroom count, finish quality (Standard / Premium / Luxury).
  - Output: An instant rough cost range displayed as a formatted currency range.
  - Calculation: Client-side formula stored in a constants/config file (not DB-driven).
  - Below the estimate: *"This is a rough estimate. For a detailed Bill of Quantities (BOQ), submit your information."*
- **Form fields** (after estimator):
  - Full Name (required)
  - Email (required)
  - Phone / WhatsApp (required)
  - The estimator inputs are automatically pre-filled (passed as form state)
- **`service_requests` type**: `'cost_estimate'`

---

## 5. Database Requirements

**No new tables are required for the Services pages.** All service request submissions write to the existing `service_requests` table (already defined in the core schema), using the `request_type` enum values: `'custom_design'`, `'construction_bid'`, `'supervision_qa'`, `'cost_estimate'`.

For the blueprint upload on the General Contracting form:
- File is uploaded to the `documents` Supabase Storage bucket.
- The returned public URL is stored in `service_requests.details->>'blueprint_url'`.

---

## 6. API & Data Layer

| Operation | Table | Details |
| :--- | :--- | :--- |
| Submit design request | `service_requests` | Insert with `type = 'custom_design'`, details JSON |
| Submit construction bid | `service_requests` | Insert with `type = 'construction_bid'`, `details->>'blueprint_url'` |
| Submit supervision request | `service_requests` | Insert with `type = 'supervision_qa'`, details JSON |
| Submit cost estimate request | `service_requests` | Insert with `type = 'cost_estimate'`, details JSON including estimator inputs and calculated range |
| Upload blueprint PDF | Supabase Storage `documents` | `storage.from('documents').upload(...)` — returns public URL |

- All form submissions use **Next.js Server Actions**.
- Service pages are **fully static** (no database reads). Rendered with Next.js static generation (`generateStaticParams`).

---

## 7. Validation Rules

### All Service Forms (Shared)
| Field | Rule |
| :--- | :--- |
| Full Name | Required, min 2 characters |
| Email | Required, valid email format |
| Phone / WhatsApp | Required, numeric, min 8 digits |

### Architectural Design Form
| Field | Rule |
| :--- | :--- |
| Building style | Required, must be a valid option |

### General Contracting Form
| Field | Rule |
| :--- | :--- |
| Blueprint upload | Required, max 20MB, accepted types: PDF, JPG, PNG |
| Project location | Required |

### Supervision Form
| Field | Rule |
| :--- | :--- |
| Site address | Required |
| Inspection frequency | Required, must be a valid option |

---

## 8. Edge Cases & Error Handling

- **Blueprint upload fails (Contracting form)**: Show `CustomNotification` (error variant) indicating the file failed to upload. Prevent form submission until upload resolves.
- **Blueprint file too large**: Validate file size client-side before upload attempt. Show inline error below the file input.
- **Service request insert fails**: `CustomNotification` (error variant) with a retry message.
- **Cost estimator returns 0**: If inputs are missing or invalid, show a *"Please fill in all fields to calculate your estimate."* inline message — do not display a zero value.

---

## 9. Animation Notes

- **Listing page cards**: `whileHover` scale-up + brightness lift; `whileInView` fade-up stagger on mount.
- **Individual service page header**: Parallax scroll on the background photo.
- **Process steps**: Staggered fade-up with animated connector line on scroll entry.
- **Estimator result**: Animate the cost range number counting up when it first appears (Framer Motion or `react-countup`).
- **Form section**: Slides up into view on scroll.

---

## 10. Open Questions / Decisions Pending

- What are the actual cost estimation formulas (price per sqm, multipliers for quality tier, etc.)?
- What currency and locale should be used for cost display?
- Are service page photos to be sourced by the client (actual project photos), or should stock photography be used for the initial build?
- Should the general contracting form allow multiple file uploads (e.g., multiple blueprint pages)?
- Should there be a fifth service page for **Cost Estimation / BOQ** standalone, or is the widget on this page sufficient?
- What is the maximum PDF file size allowed for blueprint uploads?
