# Feature: Workers & Labor Directory

## 1. Overview

A critical component of project execution is managing the human resources on site. The **Workers & Labor Directory** (`/app/projects/[project_id]/workers`) serves as the contractor's site workforce registry. 

Project coordinators can create new worker records, search and import existing workers by phone number (enabling reuse of trusted labor across projects), assign them responsibilities, and rate their performance on a 1-to-10 scale. Worker daily rates are used in daily progress updates to automatically calculate project labor costs.

**Key Scope**:
*   **Worker Directory List**: Grid view of active workers, responsibilities, and performance cards.
*   **Import/Create Drawer**: Dual-pathway drawer (search by phone first, fallback to creation).
*   **Worker Rating System**: Owner/Coordinator performance review cards.

---

## 2. User Personas & Access Levels

*   **Collaborators**: Can view the worker directory to coordinate tasks, but cannot add, edit, or view worker rating values (ratings are confidential).
*   **Project Owner**: Can view the worker list, read ratings, and rate workers.
*   **Project Coordinator**: Full access to add, import, edit, rate, and manage worker directory listings. Requires the `'manage_workers'` project capability.

---

## 3. User Journey & Workflow

### Workflow 1: Adding or Importing a Worker
1.  Coordinator navigates to the project worker directory and clicks `+ Add Worker`.
2.  A search drawer (`CustomDrawer`) slides out from the right: *"Enter Worker Phone Number..."*.
3.  Coordinator types the phone number and hits search.
4.  **Flow A: Worker Exists**:
    *   The system finds the phone number in the database `workers` table.
    *   Displays their profile card: Photo, Name, Responsibility, and their average performance Rating (e.g. "8.5/10 stars").
    *   Coordinator clicks `Add to Project`.
    *   The system creates a mapping in `worker_assignments` for this project.
5.  **Flow B: Worker is New**:
    *   The system alerts that no worker was found with that phone number, and displays the **New Worker Form**.
    *   Coordinator enters Full Name, Has WhatsApp flag, Photo, Daily Labor Cost, Location, Responsibility (Select dropdown), and notes.
    *   Coordinator clicks `Create & Add`.
    *   System inserts a new row in `workers`, and maps them to `worker_assignments` for this project.
6.  The worker grid updates, and a project action log is recorded (Action: `'worker_added'`).

### Workflow 2: Rating Worker Performance
1.  Owner or Coordinator opens a worker profile card.
2.  In the details inspector, they scroll to the **Performance Evaluation** section.
3.  They select a rating slider from 1 to 10 and write evaluation notes (e.g., *"Fast mason, high quality foundation finish"*).
4.  They click `Submit Rating`. The database updates the worker's rating value, and logs the rating event for internal auditing.

---

## 4. UI/UX Requirements

### Project Workers Directory Grid
*   **Sticky Search Toolbar**:
    *   *Search*: Text input filtering by worker name or phone number.
    *   *Responsibility Filter*: Checkbox dropdown list (Mason, Carpenter, Tiler, etc.).
    *   *Status Filter*: Filter by activity status.
*   **Worker Profile Cards**: Rendered with:
    *   *Avatar Image*: Circle photo of the worker.
    *   *Name & Responsibility Badge*: Bold text + colored tag.
    *   *Daily Rate*: Displayed in local currency (e.g., "$35/day").
    *   *Rating Badge*: Small star icon with rating number (Visible only to Owner/Coordinator).
    *   *Action menu*: Quick links to edit, rate, or remove them from the project.

### Worker Creator & Import Drawer (`CustomDrawer`)
*   Contains a sticky search header.
*   Shows a loading spinner while searching phone numbers.
*   Form inputs use standard styled fields with descriptive tooltips:
    *   *Labor Cost*: Tooltip: *"Estimated daily pay rate. Used to calculate daily site burn rate."*
    *   *Responsibility*: Tooltip: *"Primary skill category for task mapping."*

---

## 5. Database Requirements

*   **Existing Tables Used**:
    *   `public.workers`: Global registry of worker profiles.
    *   `public.worker_assignments`: Maps worker ID to project ID.
    *   `public.project_activities`: Records worker assignments.

---

## 6. API & Data Layer

| Operation | Target Table | Detail / Constraints |
| :--- | :--- | :--- |
| **Search by Phone** | `workers` | `select * from workers where phone_number = $1` |
| **Assign Worker** | `worker_assignments` | Maps `worker_id` to `project_id` |
| **Insert Worker** | `workers` | Creates new worker profile |
| **Update Rating** | `workers` | Updates rating field (1-10) for selected worker |

---

## 7. Validation Rules

*   **Phone Number**: Required; must be unique in `workers` table.
*   **Labor Cost**: Required; must be a positive number greater than or equal to zero.
*   **Rating**: Must be an integer between 1 and 10.

---

## 8. Edge Cases & Error Handling

*   **Duplicate Worker Profiles**: Prevent double entries by enforcing the `unique(phone_number)` database index. If an admin tries to create a worker with a phone number that already exists, force them into the "Import Flow" instead.
*   **Double Assignment**: Enforce a unique constraint on `worker_assignments(worker_id, project_id)` to prevent adding a worker to the same project multiple times.

---

## 9. Open Questions / Decisions Pending

*   Should workers be able to view their own ratings? *(No, ratings are strictly supervisor/owner notes to maintain team collaboration harmony).*
