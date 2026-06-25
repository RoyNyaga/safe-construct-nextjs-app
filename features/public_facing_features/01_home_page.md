# Feature 01: Home Page (Public Landing Page)

## 1. Overview

The Home Page is the primary public-facing entry point of the Safe-Construct web application. It serves as the digital first impression of the company and must immediately communicate credibility, technical expertise, and professionalism. Its core purpose is **lead conversion** — directing each type of visitor toward their most relevant next step, without overwhelming them with text or duplicating content that lives on deeper pages.

The home page stays **high-level and visual**. It does not explain services in detail — that is the responsibility of the Services section (`/services` and `/services/[slug]`). Here, every section exists to either build trust or prompt action.

**Client Segments Served**: All five (Design Seekers, Ready-to-Build Clients, Overseers, Budget Planners, Active Clients).

---

## 2. User Personas & Access Levels

- **Public / Guest Users**: All visitors, no authentication required.
- The only database write on this page is the newsletter subscription (insert into `newsletter_subscribers`).

---

## 3. User Journey & Workflow

1. Visitor lands on `/` (the root URL).
2. The Hero Section loads with a cinematic full-screen background and two primary CTAs.
3. The visitor scrolls through high-level trust-building sections.
4. At any CTA, the visitor is directed to a deeper page — the Catalogue, the Services listing, or the Contact page.
5. No authentication is required on this page.

---

## 4. Page Sections & UI/UX Requirements

### Section 1: Hero
- **Full-screen height** (`100vh`) with a dark overlay on a high-quality background video or animated image of a construction site or completed building.
- **Construction animation**: A subtle CSS or Framer Motion effect — a building silhouette "rising", a blueprint line-drawing SVG, or an animated structural grid overlay — creating an immediate sense of the industry without relying on text.
- **H1 Headline**: Bold, short, impactful. E.g., *"We Build What Others Dream."*
- **Subline**: One sentence summarising the company's value proposition. E.g., *"Architecture. Construction. Supervision. End to end."*
- **Two primary CTAs**:
  - `Explore Our Work` → `/catalogue`
  - `Talk to a Professional` → `/contact`
- **Animated trust badge row** below the CTAs:
  - _X+ Projects Completed_ | _Y+ Years of Experience_ | _Z+ Satisfied Clients_ | _N+ Architectural Designs_
  - Values are hardcoded in a constants file. Counters animate from 0 upward on first viewport entry (`react-countup` or a custom hook).

### Section 2: Services Teaser (High-Level Overview)
- **Heading**: *"What We Do"* or *"How We Can Help You"*
- **Three or four minimal service tiles** in a clean row or grid, each containing:
  - A single icon representing the service.
  - Service name (e.g., *Architectural Design*, *General Contracting*, *Construction Supervision*, *Cost Estimation*).
  - One sentence max describing who it is for.
- A single **`View All Services →`** button below the tiles, linking to `/services`.
- This section is **intentionally brief**. Visitors wanting detail click through to `/services`. No duplication of content from the service landing pages.
- Tiles animate in on scroll (`whileInView` stagger).

### Section 3: Our Process
- **Heading**: *"How It Works"*
- A horizontal step-flow (4 steps) showing the Safe-Construct client journey at a glance:
  1. Consult & Design
  2. Plan & Estimate
  3. Build & Supervise
  4. Deliver & Handover
- Each step has a number badge, icon, title, and a single-line description.
- An animated connector line draws progressively between steps as the user scrolls.
- **No CTAs here** — this section is purely informational and trust-building.

### Section 4: Featured Catalogue Preview
- **Heading**: *"Our Work"* or *"Projects We're Proud Of"*
- A **curated grid of 3–6 catalogue items** fetched from the `catalogues` table where `is_featured = true`, ordered by `created_at desc`.
- Each card shows:
  - Main image (cover, dark overlay on hover)
  - Project title
  - Style badge (e.g., "Modern Duplex")
  - Surface area (sqm)
- A single `View Full Catalogue →` button below the grid links to `/catalogue`.
- This section is **database-driven** — no code changes needed when admin updates featured items.
- Cards animate in with a staggered scale-in on scroll entry.
- **Empty state**: If no featured items exist, this section is hidden entirely.

### Section 5: Testimonials
- **Heading**: *"What Our Clients Say"*
- **2–4 client testimonials** displayed in a looping horizontal carousel.
- Each slide contains: a short quote, client name (or alias), star rating, and project type label.
- Testimonials are hardcoded in a constants/data file at this stage (no DB table required).

### Section 6: Newsletter Subscription Strip
- A minimal, full-width section:
  - **Heading**: *"Stay informed on construction insights."*
  - Email input field + `Subscribe` `LoadingButton`.
- On success: `CustomNotification` (success snackbar): *"You're on the list!"*
- On duplicate: `CustomNotification` (info variant): *"You're already on our list!"*
- On error: `CustomNotification` (error variant) with a retry message.
- Inserts into `newsletter_subscribers` via a Server Action.

### Section 7: Footer
- Logo + tagline.
- Navigation links: Home, About, Services, Catalogue, Blog, Contact.
- Social media icons: WhatsApp, Instagram, LinkedIn, Facebook.
- Copyright line.
- *Recommended addition*: A fixed floating WhatsApp chat button (bottom-right corner) with `CustomTooltip`: *"Chat with us on WhatsApp."*

---

## 5. Database Requirements

### Existing Table: `newsletter_subscribers`
- Defined in the master schema. Insert on subscription.
- Query: `insert into newsletter_subscribers (email) values ($email) on conflict (email) do update set is_active = true`

### Existing Table: `catalogues`
- Section 4 queries `catalogues` where `is_featured = true`, ordered by `created_at desc`, limit 6.
- Full table definition in [Feature 03 — Catalogue](./03_catalogue_page.md).

**No new tables required for the Home Page.**

---

## 6. API & Data Layer

| Operation | Table | Details |
| :--- | :--- | :--- |
| Fetch featured catalogue items | `catalogues` | `select * from catalogues where is_featured = true and is_published = true order by created_at desc limit 6` |
| Subscribe to newsletter | `newsletter_subscribers` | Upsert — sets `is_active = true` on conflict |

- **Rendering**: Server Component with ISR (`revalidate = 3600`) for featured catalogue items.
- **Newsletter**: Next.js Server Action.

---

## 7. Validation Rules

| Field | Rule |
| :--- | :--- |
| Newsletter email | Required; valid email format |

---

## 8. Empty States, Loading States & Error States

| Scenario | Behaviour |
| :--- | :--- |
| No featured catalogue items | Section 4 is hidden entirely |
| Newsletter submitting | `LoadingButton` shows spinner; input disabled |
| Newsletter — already subscribed | `CustomNotification` info variant |
| Newsletter — error | `CustomNotification` error variant with retry message |

---

## 9. Animation Notes

- **Hero**: Parallax scroll on background; blueprint SVG line-draw or rising building silhouette animation on mount.
- **Trust counters**: Count up from 0 on first viewport entry.
- **Services tiles**: `whileInView` fade-up with staggered delay.
- **Process steps**: Connector line animates progressively on scroll.
- **Catalogue cards**: Staggered scale-in on scroll entry.
- **Testimonial carousel**: Auto-advances with a smooth slide transition.

---

## 10. Open Questions / Decisions Pending

- What are the actual stat values for the trust badge counters (projects, years, clients, designs)?
- Will testimonials eventually be admin-managed from a DB table? *(Recommended for a future iteration.)*
- What social media links and handles should be used in the footer?
- What is the WhatsApp Business number for the floating chat button?
