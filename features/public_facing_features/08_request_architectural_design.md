# Feature 08: Request a Design (Architectural Design Inquiry)

## 1. Overview

The Request a Design feature is the primary **lead conversion mechanism** for visitors who want an architectural plan. It provides a multi-step, conversational form that feels like a consultation session — guiding the visitor through questions about their dream home in plain, non-technical language.

A `request_design` is a **pre-sales inquiry artifact**. It is:
- Submitted publicly (no account required).
- Reviewed exclusively in the Admin Dashboard.
- Progressed through a lightweight status lifecycle.
- Either declined or manually converted into a **Project** by the admin.

All deeper engagement — file uploads, phases, tasks, timelines, and collaborations — belongs on the **Project**, not on the request. The `request_design` ends its life the moment a project is born from it.

The feature supports two entry flows:
- **Flow A (Blank Request)**: Visitor clicks `Request a Custom Design` from the catalogue listing page or any site-wide CTA. The form starts empty.
- **Flow B (Catalogue-Seeded Request)**: Visitor clicks `Request This Design` on a catalogue detail page. The form is pre-populated with the catalogue's specifications. The visitor reviews and may adjust any field before submitting. The resulting `request_design` is linked to the source catalogue via `catalogue_id`.

**Client Segments Served**: Segment 1 — The Design Seeker.

---

## 2. User Personas & Access Levels

| Persona | Auth Required | Access |
| :--- | :--- | :--- |
| Public visitor | No | Submits the multi-step inquiry form |
| Admin | Yes (admin role) | Views and manages all submitted requests from the Admin Dashboard |

---

## 3. User Journey & Workflow

### Flow A: Blank Request (`/request-design`)

1. Visitor arrives at `/request-design` from the catalogue listing CTA or any other `Request a Design` button on the site.
2. The multi-step form loads at **Step 1** with all fields empty.
3. Visitor progresses through 7 steps at their own pace.
4. All steps except Step 7 (contact details) are fully optional — no validation blocks forward progress.
5. On Step 7, only `full_name`, `phone_country_code`, `whatsapp_phone`, and `preferred_contact` are required.
6. Visitor submits the form. A `request_design` row is inserted into the database with `status = 'submitted'`.
7. A confirmation screen is shown.

### Flow B: Catalogue-Seeded Request (`/request-design?catalogue=[slug]`)

1. Visitor clicks `Request This Design` on a catalogue detail page.
2. A `CustomModal` confirms: *"Would you like to use this design as a starting point?"* — Yes / Start Fresh.
3. If Yes: form loads with the catalogue's specifications pre-populated. A notice banner reads: *"Based on '[Design Title]' — feel free to adjust anything."*
4. Visitor reviews each step, modifying as needed, then submits.
5. The `request_design` is created with `catalogue_id` linking it to the source catalogue.

### Status Lifecycle

```
submitted          ← Public submits the form
  → meeting_attended    ← Admin marks after initial online meeting
    → client_declined   ← Client or admin decides not to proceed
    → project_created   ← Admin manually creates a Project from this request
```

- Status is updated exclusively by the admin from the Admin Dashboard.
- `project_created` is the terminal success state. The request is then considered closed and the Project takes over.
- `client_declined` is the terminal failure state.

### Admin Dashboard Flow

1. Admin sees new `request_design` in the inbox (status: `submitted`).
2. Admin contacts the client via their preferred method (WhatsApp or email).
3. Online meeting is held. Admin updates status to `meeting_attended`.
4. Admin adds `admin_notes` (internal field) to record key discussion points.
5. Decision:
   - If the client decides not to proceed: Admin marks `client_declined`.
   - If the client wants to go ahead: Admin manually creates a **Project** in the system, then marks `project_created`.

---

## 4. UI/UX Requirements

### Page Header (`/request-design`)
- **Short hero** (~40vh) with a blueprint or architectural sketch background.
- **H1**: *"Tell Us About Your Dream Home."*
- **Subtext**: *"Answer a few questions at your own pace. Anything you're not sure about, we'll clarify in our online meeting."*
- A **progress bar** at the top shows the current step (e.g., *"Step 3 of 7"*).

### Multi-Step Form Layout
- **Conversational tone**: Each step is framed as a natural question, not a data entry screen.
- **Navigation**: `Back` and `Continue` buttons. No step blocks forward progress due to missing answers (except required fields on Step 7).
- **Flow B banner**: If pre-populated, display: *"Based on [Design Title] — feel free to modify anything."* with a link back to the catalogue item.
- Steps transition with smooth horizontal slide animations (Framer Motion).
- On mobile, each step occupies the full screen.
- If a step is skipped entirely with no input, a subtle helper line appears: *"No problem — we'll cover this in the meeting."*

---

### Step 1: Your Project Location
> *"Let's start with the basics. Where are you planning to build?"*

| Field | Type | Required |
| :--- | :--- | :--- |
| Country where you want to build | Select (with flag icons) | No |
| Do you already own a plot of land? | Yes / No / Not Sure toggle | No |
| Do you already have a site plan? | Yes / No / Not Sure toggle | No |

`CustomTooltip` on site plan: *"A site plan shows the exact position and orientation of the building on your land."*

---

### Step 2: Your Building Style
> *"What kind of home are you imagining?"*

| Field | Type | Required |
| :--- | :--- | :--- |
| Building style | Select (Bungalow, Duplex, Villa, Apartment, Townhouse, Other) | No |
| Number of floors | Select (1, 2, 3+) | No |

Each style option has a small thumbnail image and a `CustomTooltip` description.

---

### Step 3: Room Layout
> *"How would you like to use the space inside?"*

| Field | Type | Required |
| :--- | :--- | :--- |
| Number of bedrooms | Select (1, 2, 3, 4, 5+) | No |
| Number of bathrooms | Select (1, 2, 3, 4+) | No |
| Would you like a car park attached? | Yes / No / Not Sure toggle | No |
| Would you like a garden or outdoor area? | Yes / No / Not Sure toggle | No |
| Would you like a perimeter fence? | Yes / No / Not Sure toggle | No |

---

### Step 4: Special Features
> *"Would you like any of these additions?"*

| Field | Type | Required |
| :--- | :--- | :--- |
| Swimming pool | Yes / No / Not Sure toggle | No |
| Solar energy provision | Yes / No / Not Sure toggle | No |
| Borehole / water system provision | Yes / No / Not Sure toggle | No |
| Staff / servant quarters | Yes / No / Not Sure toggle | No |
| Approximate surface area (sqm) | Number input | No |

`CustomTooltip` on solar: *"We'll pre-wire the roof and electrical panel for future solar installation."*
`CustomTooltip` on borehole: *"Infrastructure to support a private underground water source."*

---

### Step 5: Documents You Need
> *"Which of these documents would you like us to produce? Select all that apply."*

Displayed as a checklist with icons. Each item has a `CustomTooltip` in plain language:

| Key | Label | Tooltip |
| :--- | :--- | :--- |
| `distribution_plan` | Floor / Distribution Plan | The layout showing rooms, walls, doors, and windows on each floor. |
| `3d_rendering` | 3D Rendering | A realistic visual of what the finished building will look like. |
| `structural_plan` | Structural / Engineering Plan | Technical drawings for the concrete columns, beams, and slabs. |
| `plumbing_plan` | Plumbing Plan | Layout of all water supply pipes and drainage systems. |
| `electrification_plan` | Electrification Plan | Layout of all electrical wiring, sockets, and circuit breakers. |
| `boq_estimate` | BOQ / Estimate (Bill of Quantities) | A detailed cost list of every material and quantity needed to build. |
| `site_plan` | Site Plan | A top-down view showing how the building sits on your land. |
| `interior_design_layout` | Interior Design Layout | Furniture placement and interior décor concept drawings. |
| `hvac_plan` | Ventilation / HVAC Plan | Air conditioning, ventilation, and heating system layout. |

Note below the checklist: *"Not sure what you need? Select what sounds relevant — we'll guide you in the meeting."*

---

### Step 6: Anything Else?
> *"Is there anything else we should know about your dream home?"*

| Field | Type | Required |
| :--- | :--- | :--- |
| Additional notes | Textarea | No |

Placeholder: *"e.g. I want large windows in the living room, a home office on the ground floor, or space for a generator..."*

---

### Step 7: Schedule a Meeting & Your Contact Details
> *"Almost there! When would be a good time for a short online consultation?"*

**Meeting Scheduling:**

| Field | Type | Required |
| :--- | :--- | :--- |
| Preferred date | Date picker | No |
| Preferred time | Time picker | No |
| Your timezone | Select (timezone list, auto-detected) | No |

**Your Information:**
> *"How should we reach you?"*

| Field | Type | Required |
| :--- | :--- | :--- |
| Full Name | Text | **Yes** — min 2 chars |
| Country code | Select with flags | **Yes** |
| WhatsApp phone number | Tel input | **Yes** — numeric, min 8 digits |
| Email address | Email input | No — required only if email is preferred contact |
| Preferred contact method | Toggle (WhatsApp / Email) | **Yes** |

If `Email` is selected as preferred contact, the email field becomes required with real-time validation.

**Submit**: `LoadingButton` — *"Submit My Request"*. Shows spinner during DB insert.

---

### Confirmation Screen (Post-Submit)
- Animated checkmark (Framer Motion).
- Message: *"Your request has been received! We'll reach out on [WhatsApp / Email] within 24–48 hours to confirm your meeting."*
- Two CTAs:
  - `Browse More Designs` → `/catalogue`
  - `Back to Home` → `/`

---

## 5. Database Requirements

### Enum: `request_design_status`

```sql
create type request_design_status as enum (
    'submitted',
    'meeting_attended',
    'client_declined',
    'project_created'
);
```

### Table: `request_designs`

```sql
create table public.request_designs (
    id uuid default uuid_generate_v4() primary key,

    -- Optional: linked catalogue item (Flow B pre-population)
    catalogue_id uuid references public.catalogues(id) on delete set null,

    -- Step 1
    build_country text,
    has_land boolean,
    has_site_plan boolean,

    -- Step 2
    style catalogue_style,
    floors integer check (floors is null or floors >= 1),

    -- Step 3
    bedrooms integer check (bedrooms is null or bedrooms >= 0),
    bathrooms integer check (bathrooms is null or bathrooms >= 0),
    has_car_park boolean,
    has_garden boolean,
    has_fence boolean,

    -- Step 4
    has_swimming_pool boolean,
    has_solar_provision boolean,
    has_borehole_provision boolean,
    has_servant_quarters boolean,
    size_sqm numeric(10, 2),

    -- Step 5: Document checklist (JSONB array of string keys)
    requested_documents jsonb not null default '[]'::jsonb,

    -- Step 6
    additional_notes text,

    -- Step 7: Meeting
    meeting_date date,
    meeting_time time without time zone,
    meeting_timezone text,

    -- Step 7: Contact (required fields)
    full_name text not null,
    phone_country_code text not null,
    whatsapp_phone text not null,
    email text,
    preferred_contact preferred_contact_method not null,

    -- Admin-only internal notes (not shown to client)
    admin_notes text,

    status request_design_status not null default 'submitted',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
```

**No additional tables are required at this stage.** Comments, collaborations, file uploads, and financial tracking are all deferred to the Project feature.

### RLS Policies

- **Public (unauthenticated)**: `INSERT` only.
- **Admin**: Full access (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).

---

## 6. API & Data Layer

| Operation | Table / Function | Details |
| :--- | :--- | :--- |
| Fetch catalogue specs (Flow B) | `catalogues` | `select * from catalogues where slug = $slug and is_published = true` |
| Submit request design | `request_designs` | Insert with all form fields |
| Admin: list all requests | `request_designs` | `select * from request_designs order by created_at desc` |
| Admin: update status | `request_designs` | `update request_designs set status = $status where id = $id` |
| Admin: save notes | `request_designs` | `update request_designs set admin_notes = $notes where id = $id` |

- Form submission uses a **Next.js Server Action**.
- Admin operations use **authenticated Server Actions** (admin role checked server-side).

---

## 7. Validation Rules

### Steps 1–6
- No blocking validation. All fields are optional. Forward navigation is always allowed.

### Step 7 (Contact — only required step)

| Field | Rule |
| :--- | :--- |
| Full Name | Required, min 2 characters |
| Country code | Required |
| WhatsApp phone | Required, numeric, min 8 digits |
| Email | Required **only if** `preferred_contact = 'email'`; valid email format |
| Preferred contact | Required |

---

## 8. Edge Cases & Error Handling

| Scenario | Behaviour |
| :--- | :--- |
| Form submit fails | `CustomNotification` error variant + retry prompt; form state preserved |
| `?catalogue=[slug]` not found or unpublished | Form loads in Flow A (blank) mode; `CustomNotification` info: *"We couldn't find that design, so here's a blank form."* |
| Step 7 required fields missing on submit | Inline `FormHelperText` errors shown below each field; form does not submit |
| Duplicate WhatsApp number (same person submits twice) | No duplicate prevention at this stage — admin handles duplicates during review |

---

## 9. Animation Notes

- **Hero**: Blueprint SVG line-draw or building silhouette animation on mount.
- **Step transitions**: Horizontal slide (Framer Motion `AnimatePresence`).
- **Confirmation**: Animated checkmark scale-in.
- **Progress bar**: Smooth width transition between steps.

---

## 10. Resolved Decisions

| Question | Decision |
| :--- | :--- |
| Are all steps required? | No — only Step 7 contact fields are required |
| Does missing info block submission? | Never — soft guidance only ("we'll cover this in the meeting") |
| Where does a submitted request appear? | Admin Dashboard only |
| Can the client track their request? | Not at this stage — no authenticated portal for requests |
| Are comments/collaborations on the request? | No — these belong on the Project created from the request |
| How is a project created from a request? | Manually by the admin from the Admin Dashboard |
| What happens to the request once a project is created? | Status = `project_created`; request is closed |
