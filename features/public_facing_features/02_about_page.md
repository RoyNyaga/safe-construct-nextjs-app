# Feature 02: About Page

## 1. Overview

The About Page provides a clear, professional window into the identity, mission, and human side of Safe-Construct. It builds trust with prospects by communicating the company's origin story, its core values, and the people behind the work. The tone should be **confident, warm, and transparent** — avoiding corporate jargon while conveying technical authority. The team section is **database-driven**, allowing the admin to manage team members without touching code.

**Client Segments Served**: All visitors (lead nurturing and trust building).

---

## 2. User Personas & Access Levels

- **Public / Guest Users**: All visitors, no authentication required.
- The page reads team member data from the `team_members` table. No writes occur on this page.

---

## 3. User Journey & Workflow

1. Visitor navigates to `/about` from the navigation bar or a CTA link.
2. The page loads with a professional hero section.
3. The visitor scrolls through sections covering mission, values, the team, and a final CTA.
4. No form submissions or authentication flows exist on this page.

---

## 4. Page Sections & UI/UX Requirements

### Section 1: Page Hero
- **Shorter than the home page hero** (50–60vh).
- Background: A high-quality image of a completed Safe-Construct project, a team working on-site, or a blueprint review session.
- **H1 Heading**: e.g., *"Built on Integrity. Delivered with Precision."*
- **Short subtext**: 1–2 sentences on the company's founding purpose.

### Section 2: Our Story
- **Two-column layout**: Text on one side, a professional image (site, blueprint, or office) on the other.
- Tells the origin narrative: why Safe-Construct was founded, the problem it solves (lack of trust and transparency in construction), and how it evolved.
- **Max 3 paragraphs**. Minimal, no filler.
- Animate in on scroll (Framer Motion `whileInView`).

### Section 3: Our Mission & Vision
- **Two side-by-side cards**:
  - **Mission**: What we do and why. Focused on client de-risking.
  - **Vision**: Where we are heading. Digital transparency in African/regional construction.
- Clean card design with an icon and a bold heading for each.

### Section 4: Core Values
- **A grid of 4–6 value cards**, each with an icon, a value name, and a 1-sentence description.
- Suggested values:
  - **Transparency** — Clients see every step of their build.
  - **Quality Assurance** — No compromises on materials or workmanship.
  - **Integrity** — Honest pricing, honest timelines, honest advice.
  - **Innovation** — Technology-driven project management.
  - **Client Partnership** — We build relationships, not just buildings.
  - **Reliability** — We deliver on our commitments.
- Cards animate in with a stagger on scroll.

### Section 5: Meet the Team / Leadership
- **Team member cards** in a responsive grid (2 or 3 columns).
- Data is fetched from the `team_members` table, ordered by `order_index asc`.
- Each card displays:
  - Professional headshot image (from Supabase Storage `team-photos` bucket); fallback to an initials avatar if `photo_url` is null.
  - Full name
  - Title / Role (e.g., Founder & CEO, Head of Architecture, Site Operations Manager)
  - Phone number (displayed as a click-to-call link)
- Cards animate in with a scale-in stagger on scroll entry.
- **Empty state**: If no team members are in the DB, this section is hidden entirely.

### Section 6: By the Numbers (Stats Strip)
- A clean, full-width strip displaying key company statistics (same values as the home page counter section):
  - Projects Completed
  - Years in Business
  - Satisfied Clients
  - Architectural Designs Delivered
- No animation needed here (simpler presentation than home page).

### Section 7: Call to Action Banner
- Full-width CTA section at the bottom:
  - Heading: *"Ready to start your project?"*
  - Two buttons:
    - `Browse Our Catalogue` → `/catalogue`
    - `Get in Touch` → `/contact`

---

## 5. Database Requirements

### New Table: `team_members`

```sql
create table public.team_members (
    id uuid default uuid_generate_v4() primary key,
    full_name text not null,
    title text not null,          -- e.g., "Founder & CEO", "Head of Architecture"
    phone text,                   -- Displayed as a click-to-call link on the card
    photo_url text,               -- Supabase Storage: 'team-photos' bucket
    order_index integer not null default 0, -- Controls display order on the About page
    is_visible boolean not null default true, -- Admin can hide a member without deleting
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
```

**RLS Policies**:
- Public can select rows where `is_visible = true`.
- Admin has full access.

**Storage Bucket**: `team-photos` — public read access.

---

## 6. API & Data Layer

| Operation | Table | Details |
| :--- | :--- | :--- |
| Fetch visible team members | `team_members` | `select * from team_members where is_visible = true order by order_index asc` |

- **Rendering**: Next.js Server Component with ISR (`revalidate = 3600`). Team data updates within one hour of an admin change without a redeploy.

---



## 7. Empty States, Loading States & Error States

| Scenario | Behaviour |
| :--- | :--- |
| No visible team members in DB | Section 5 (Meet the Team) is hidden entirely |
| Team photo URL is null | Render an initials-based avatar component as a fallback |

---

## 8. Animation Notes

- **Hero**: Fade-in on mount.
- **Our Story**: Slide-in from left (text) and right (image) on scroll entry.
- **Values grid**: Staggered fade-up on scroll entry.
- **Team cards**: Scale-in with slight stagger on scroll entry.

---

## 9. Resolved Decisions

| Question | Decision |
| :--- | :--- |
| How are team members managed? | Via the `team_members` DB table, managed from the admin dashboard |
| Are headshots required? | Admin uploads photos via the backend; initials avatar is the fallback |
| Company founding year | **2021** — use this in the *Our Story* section |
| Awards / certifications | Not applicable at this stage |
