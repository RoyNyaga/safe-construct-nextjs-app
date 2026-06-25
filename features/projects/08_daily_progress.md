# Feature: Daily Site Progress Reports

## 1. Overview

The **Daily Site Progress Reports** module (`/app/projects/[project_id]/progress`) acts as the project's active construction log. Every day, the supervisor or project coordinator creates a journal detailing what work was performed, worker attendance, difficulties encountered, and materials consumed. 

Reports support **backdating** (in case a manager skips logging a day on site) and support uploading multiple photos and videos. Crucially, approving a progress report triggers the **automatic deduction** of the specified material counts from the project's inventory catalog.

**Key Scope**:
*   **Journal Feed**: Chronological stream of daily updates with photo/video sliders.
*   **Intake Form**: Form including attendance checks, material sheets, and file upload fields.
*   **Cost Calculator**: Dynamic running indicators for daily labor and supply costs.
*   **Inventory Deductions**: Trigger-based stock reduction on report approval.

---

## 2. User Personas & Access Levels

*   **Collaborators (Architects/Treasurers)**: Can view the progress log stream to check site updates. Cannot create progress reports or approve them.
*   **Project Owner**: Can view all progress journals, watch site videos, read supervisor notes, and click `Approve Progress Log` to sign off on updates.
*   **Project Coordinator**: Can create, edit, backdate, and approve daily progress logs. Requires the `'post_site_journal'` or `'manage_progress'` project capability.

---

## 3. User Journey & Workflow

### Workflow 1: Posting a Daily Update
1.  Coordinator navigates to the project progress tab and clicks `+ Post Daily Update`.
2.  The **Daily Progress Creator Form** opens (dedicated layout):
    *   *Date Selection*: Calendar input pre-filled with today's date (can be changed to backdate).
    *   *Phase*: Selects the active phase (e.g. "Foundation").
    *   *Work Description & Difficulties*: Text areas detailing masonry, framing, or weather delays.
    *   *Attendance*: Checklist displaying all workers assigned to this project. Coordinator checks those present today.
    *   *Materials Used*: Coordinator selects materials from inventory and inputs quantities (e.g. "Cement", "4 bags").
    *   *Media*: Coordinator uploads site photos and videos.
3.  The form sidebar displays a running **Daily Cost Summary** (Attendance labor cost sum + Materials value sum).
4.  Coordinator clicks `Submit Progress Log`.
5.  System inserts the header in `daily_progress`, inserts child rows in `daily_progress_attendance`, `daily_progress_materials`, and `daily_progress_media`, and writes an audit log. The log status starts as `is_approved = false`.

### Workflow 2: Approval & Stock Deductions
1.  Owner (or Coordinator) opens a pending progress log card and reviews description, photographs, and attendance.
2.  If satisfied, they click `Approve Progress Log` (`LoadingButton`).
3.  **Database Automation (Trigger)**:
    *   System updates the row setting `is_approved = true` and `approved_by = auth.uid()`.
    *   The database trigger `trigger_process_progress_inventory` fires:
        *   It queries `daily_progress_materials` for the approved log.
        *   For each material, it inserts a negative outflow row (`-quantity`) into the `material_transactions` ledger.
        *   The ledger trigger updates the material's current stock.
4.  A success toast appears, and the journal card displays a green approved badge.

---

## 4. UI/UX Requirements

### Progress Creator Page (`/app/projects/[project_id]/progress/new`)
*   **Form Grid**: Double-column layout.
    *   *Left Column*: Description, difficulties, phase selection, and calendar uploader.
    *   *Right Column*: Attendance checklist (worker names + responsibilities) and Materials consumed section (search dropdown, qty input, unit indicator).
*   **Drag-and-Drop Media Zone**: Multi-file uploader validating photos/videos, rendering upload progress bars.
*   **Daily cost calculator**: Sticky panel showing real-time cost feedback as inputs change.

### Progress Feed List View
*   **Timeline Stream**: Chronological cards. Each card displays:
    *   *Header*: Log date, Phase badge, Uploader name, and Approved status badge.
    *   *Content*: Truncated work description (with "Read More" link) and bullet points listing difficulties.
    *   *Metrics summary*: Present workers counts, materials consumed list, and total calculated day cost.
    *   *Media Slider*: A swipeable horizontal gallery carousel displaying progress photos and videos. Clicking media opens a lightbox.
    *   *Approval Action (Footer)*: Renders the `Approve` button (visible only to Owner/Coordinator on pending cards).

---

## 5. Database Requirements

*   **Existing Tables Used**:
    *   `public.daily_progress`: Stores daily description, costs, and approval status.
    *   `public.daily_progress_materials`: Stores quantities of materials used.
    *   `public.daily_progress_attendance`: Stores worker attendance checklist.
    *   `public.daily_progress_media`: Stores links to photos/videos.
    *   `public.material_transactions`: Outflow ledger logs generated on approval.
    *   `public.project_activities`: Audit logs.

---

## 6. API & Data Layer

| Operation | Target Table | Detail / Constraints |
| :--- | :--- | :--- |
| **Insert Log** | `daily_progress` & children | Saves details, attendance, materials, and media in a single transaction |
| **Approve Log** | `daily_progress` | Sets `is_approved = true` (triggers stock reduction trigger) |

---

## 7. Validation Rules

*   **Date**: Required; cannot be set to future dates.
*   **Description**: Required; minimum 20 characters.
*   **Quantities**: Consumed materials must have quantities greater than zero.

---

## 8. Edge Cases & Error Handling

*   **Overdraft Warning**: If a coordinator logs a progress report that uses more materials than currently exist in stock:
    *   The UI displays a warning banner: *"Warning: Insufficient stock for Cement. Logging this report will result in a negative stock count. Please record a purchase order or adjust inventory."*
    *   The submission is allowed, but marked with an inventory overdraft flag.
*   **Re-approvals**: Prevent a progress report from being approved more than once, ensuring material transactions are not duplicated.

---

## 9. Open Questions / Decisions Pending

*   Should we allow editing an approved progress log? *(Recommended: block edits once approved. If corrections are needed, the coordinator must delete the log - which rolls back the material transactions - and re-log, or make a manual inventory adjustment).*
