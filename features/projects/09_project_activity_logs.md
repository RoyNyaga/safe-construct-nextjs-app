# Feature: Project Activity Logs (Audit Feed)

## 1. Overview

Transparency is a core value of the Safe-Construct platform. The **Project Activity Logs (Audit Feed)** module (`/app/projects/[project_id]/activity-logs`) provides a permanent, immutable record of every action taken within a project. 

Every project creation, user invitation, document upload, purchase approval, material adjustment, and daily progress sign-off is logged automatically. The page allows stakeholders to inspect the detailed history, filtering by user, date, or event type to verify who did what, and when.

**Key Scope**:
*   **Audit Feed Stream**: Chronological list of events with user avatars and relative timestamps.
*   **Structured Metadata Inspector**: Expandable drawers/accordions translating JSONB data into readable key-value logs.
*   **History Filters**: Toolbar filtering events by collaborator, action category, or calendar range.

---

## 2. User Personas & Access Levels

*   **Collaborators**: Cannot view the audit feed tab (to protect administrative history and financial actions).
*   **Project Owner**: Full access to view the audit feed to track supervisor and builder actions.
*   **Project Coordinator**: Full access to browse the activity feed to monitor technician logs and material entries.
*   **System Admins**: Full access to view and export the audit logs.

---

## 3. User Journey & Workflow

1.  Owner navigates to `/app/projects/[project_id]` and clicks on the `Activity Logs` tab.
2.  The page loads a chronological feed of the latest 50 events.
3.  Owner wants to check who approved a specific material purchase. They go to the *Action Type* filter in the sticky toolbar and select `Purchase Approved`.
4.  The feed dynamically filters to show only purchase events.
5.  Owner identifies the card: *"Sarah Jenkins (Coordinator) approved Purchase Order #1204 - Cost: $4,500"*.
6.  Owner clicks the card to expand the **Details Panel**:
    *   An accordion opens showing the list of materials inside the PO, quantities, unit prices, and uploader comments.
7.  The database query reads directly from `project_activities` without joins, ensuring maximum speed.

---

## 4. UI/UX Requirements

### Activity Logs Page Layout
*   **Filter Toolbar**:
    *   *Member Dropdown*: Filter by specific user (lists Owner, Coordinator, and Collaborators).
    *   *Action Category Selector*: Grouped checkboxes:
        *   `Collaborators` (Invites, role shifts)
        *   `Files` (Uploads, renames)
        *   `Finances` (PO drafts, PO approvals)
        *   `Site Journals` (Progress posts, approvals)
    *   *Calendar Range*: Datepicker selecting start/end dates.
*   **Activity Feed Timeline**: A vertical timeline layout:
    *   *Avatar Node*: Circular profile picture of the user.
    *   *Event Text*: Descriptive sentence with bold highlights (e.g. *"**Marcus Vance** uploaded **site_plan_rev2.pdf**"*).
    *   *Time Badge*: Small relative text (e.g., *"12 mins ago"*, *"Yesterday at 4:15 PM"*).
    *   *Expandable Accordion*: Toggles to reveal a detailed card showing the raw properties (metadata JSONB) formatted into a clean table (e.g., showing old status, new status, or list of items).

---

## 5. Database Requirements

*   **Existing Tables Used**:
    *   `public.project_activities`: Master table storing logs.
    *   `public.profiles`: Joined to show actor avatars, names, and roles.

---

## 6. API & Data Layer

| Operation | Target Table | Detail / Constraints |
| :--- | :--- | :--- |
| **Fetch Activity Feed** | `project_activities` | `select * from project_activities where project_id = $1 order by created_at desc limit 100` |
| **Filtered Search** | `project_activities` | Dynamic query building filters based on date range, user ID, and action category |

---

## 7. Validation Rules

*   **Immutable Logs**: RLS policies prevent any UPDATE or DELETE operations on `project_activities`. It is an **insert-only** table. No user (not even admins) can alter history.

---

## 8. Edge Cases & Error Handling

*   **Deleted Users**: If a collaborator profile is deleted cascade-style, the `user_id` in `project_activities` is set to `NULL` (set null constraint). The event card remains in the feed, displaying: *"Former Collaborator performed this action"* to preserve audit history integrity.
*   **JSONB Corruption**: If the metadata JSONB column contains malformed details or is missing keys, the UI falls back to showing only the default event text, hiding the empty accordion trigger to avoid broken components.

---

## 9. Open Questions / Decisions Pending

*   Should we support exporting activity logs to PDF or Excel? *(Recommended: keep it as a screen-only feed for Version 2; exports can be added as an administrative setting later).*
