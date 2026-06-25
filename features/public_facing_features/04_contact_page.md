# Feature 04: Contact Page

## 1. Overview

The Contact Page provides a clean, professional channel for visitors to reach the Safe-Construct team directly. It collects essential contact information and the visitor's message, and captures their preferred communication method (WhatsApp or email) so the team can respond on the platform that best suits the client. All submissions are stored in a dedicated table for admin follow-up.

**Client Segments Served**: All five segments and general inquiries.

---

## 2. User Personas & Access Levels

- **Public / Guest Users**: All visitors, no authentication required.
- **Admin**: Views and manages incoming contact submissions via the Admin Dashboard (specified separately).

---

## 3. User Journey & Workflow

1. Visitor navigates to `/contact` from the navigation bar or a CTA button.
2. The page loads with a professional header and contact form.
3. Visitor fills in their details and message.
4. Visitor selects their preferred method of communication (WhatsApp or Email).
5. Visitor clicks `Send Message`.
6. A `LoadingButton` shows a spinner while the form is being submitted.
7. On success: Form clears, and a `CustomNotification` (success snackbar) appears: *"Your message has been sent. We'll be in touch shortly."*
8. On failure: `CustomNotification` (error variant) appears with a retry suggestion.
9. Optionally, the admin receives an email notification via a Supabase Edge Function or a third-party transactional email service (e.g., Resend or SendGrid).

---

## 4. Page Sections & UI/UX Requirements

### Section 1: Page Header
- **Short hero** (~40vh) with a background image (an office setting, team meeting, or blueprint review).
- **H1**: *"Let's Build Something Together."*
- **Subtext**: One sentence encouraging visitors to reach out.

### Section 2: Contact Form + Info Panel
- **Two-column layout**:
  - **Left column**: Contact form (full-width on mobile).
  - **Right column**: Company contact information panel.

#### Contact Form Fields
| Field | Type | Required | Notes |
| :--- | :--- | :--- | :--- |
| Full Name | Text input | Yes | Min 2 characters |
| Email Address | Email input | Yes | Valid email format |
| WhatsApp Phone Number | Tel input | Yes | Include country code selector |
| Subject | Text input | Yes | Brief topic (e.g., "Architectural Design Inquiry") |
| Message | Textarea | Yes | Min 20 characters |
| Preferred Communication | Toggle / Radio | Yes | Options: WhatsApp, Email |

- Use `CustomTooltip` on the **Preferred Communication** field: *"Select how you'd like us to contact you back. We respond faster on WhatsApp."*
- Use `CustomTooltip` on the **WhatsApp Phone Number** field: *"Include your country code, e.g. +237 for Cameroon."*
- `Send Message` is a `LoadingButton` with spinner on submission.

#### Contact Info Panel (Right Column)
- Company phone / WhatsApp number (click-to-dial).
- Email address (click-to-compose).
- Physical address or general service area.
- Office hours.
- A row of social media icon links.
- An embedded map (optional — Google Maps iframe of office location).

### Section 3: FAQ Strip (Optional)
- 3–4 frequently asked questions with accordion-style answers (MUI `Accordion`).
- Example questions:
  - *"How long does it take to get an architectural design?"*
  - *"Do you work outside [city/region]?"*
  - *"What documents do I need to start a construction project?"*
  - *"How do I track my project's progress?"*
- Use `CustomTooltip` on each accordion to hint at the answer before expanding.

---

## 5. Database Requirements

### New Table: `contact_messages`

```sql
create type preferred_contact_method as enum ('whatsapp', 'email');

create table public.contact_messages (
    id uuid default uuid_generate_v4() primary key,
    full_name text not null,
    email text not null,
    whatsapp_phone text not null,
    subject text not null,
    message text not null check (char_length(message) >= 20),
    preferred_contact preferred_contact_method not null,
    is_read boolean not null default false,        -- Admin marks as read
    is_replied boolean not null default false,     -- Admin marks as replied
    created_at timestamptz not null default now()
);
```

**Notes**:
- No `updated_at` column needed — messages are immutable once submitted. `is_read` and `is_replied` are updated by the admin.
- `updated_at` trigger is not required on this table.

### RLS Policies for `contact_messages`

```sql
-- Public can insert (submit) a contact message
create policy "Public can submit contact messages"
    on public.contact_messages for insert
    with check (true);

-- Only admin can view and manage messages
create policy "Admin can manage contact messages"
    on public.contact_messages for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );
```

---

## 6. API & Data Layer

| Operation | Table | Details |
| :--- | :--- | :--- |
| Submit contact form | `contact_messages` | Insert a new row with all form fields |
| (Future) Notify admin | Edge Function | Trigger a Resend/SendGrid email on insert via a Supabase webhook or Edge Function |

- **Server Action**: Form submission is handled via a Next.js Server Action (POST).
- **No ISR** needed; the page is fully static.

---

## 7. Validation Rules

| Field | Rule |
| :--- | :--- |
| Full Name | Required, min 2 characters |
| Email | Required, valid email format |
| WhatsApp Phone | Required, numeric, min 8 digits |
| Subject | Required, min 3 characters |
| Message | Required, min 20 characters |
| Preferred Communication | Required, must be one of: `whatsapp`, `email` |

- All validations are performed client-side first (using `react-hook-form` + `zod`), then enforced at the DB level via column constraints.

---

## 8. Edge Cases & Error Handling

- **Submission fails (network error)**: `CustomNotification` error variant with message: *"Something went wrong. Please try again."*
- **Duplicate rapid submissions**: Disable the submit button after first click until the Server Action resolves.
- **Empty form on submit**: Each field shows an inline validation error below it (MUI `FormHelperText`).
- **Very long message**: No hard character cap, but UI should use a `textarea` with a visible character count hint.

---

## 9. Animation Notes

- **Form fields**: Fade-in on mount with a subtle stagger.
- **Submit button**: `LoadingButton` with spinner animation during async submission.
- **Success state**: Confetti burst or a checkmark animation after successful submit (Framer Motion).

---

## 10. Open Questions / Decisions Pending

- What is the company's official WhatsApp Business number?
- What is the physical office address (for the map embed)?
- What are the official office hours?
- Should a Supabase Edge Function be set up now to send admin email notifications on each submission, or handled later?
- Is the FAQ section required in the first version, or should it be deferred?
