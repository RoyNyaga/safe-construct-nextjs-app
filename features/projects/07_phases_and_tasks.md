# Feature: Project Phases & Tasks TIMELINE

## 1. Overview

Building projects are executed in sequential, time-bound stages. The **Project Phases & Tasks** module (`/app/projects/[project_id]/phases`) organizes construction milestones.

*   **Phases**: Large milestones (e.g. Foundation, Elevation, Roofing) with estimated budgets, timelines, and status tracks. A phase is considered completed once physical milestones are validated and installment payments are finalized.
*   **Tasks**: Specific, actionable work items under a phase (e.g., "Tie reinforcement bars", "Install plumbing conduits") assigned to one or more collaborators.

---

## 2. Page Layouts & UX Structure

The phases interface uses two main layouts:

### Layout A: The Master Timeline Directory
*   **Visual Layout**: A vertical timeline stack representing each Phase in chronological order.
*   **Phase Cards**: Each phase displays:
    *   *Timeline dates*: Start and end dates with a calculated duration tag (e.g. "45 days").
    *   *Status Badge*: Enums (`Backlog`, `Ready to Start`, `Started`, `Ongoing`, `Ended`, `Completed`).
    *   *Progress Bar*: Calculated as percentage of completed tasks (e.g. 5 of 8 tasks completed = 62%).
    *   *Cost Tracker*: Displays estimated budget alongside actual purchase costs logged in this phase.
    *   *Action Icons*: View details, Edit phase, and `+ Add Task`.

### Layout B: The Phase Dashboard (`/app/projects/[project_id]/phases/[phase_id]`)
Clicking a phase card opens a dedicated phase panel. This dashboard has three tabs:
1.  **Tasks list**: The detailed schedule grid for this phase.
2.  **Daily Journals**: Site progress reports posted during this phase.
3.  **Phase Documents**: Blueprints, site photos, or invoices tagged to this phase.

---

## 3. Core Workflows & Collaboration

### Workflow 1: Phase Creation
1.  Coordinator navigates to the project phases timeline and clicks `+ Add Phase`.
2.  A side drawer (`CustomDrawer`) opens:
    *   Coordinator fills: Title (e.g., "Roofing"), Start/End Dates, Budget Estimate, and Description.
3.  On submission, the system creates the row in `project_phases` and logs it in `project_activities` (Action: `'phase_created'`).

### Workflow 2: Task Assignment
1.  Coordinator opens a Phase page and clicks `+ Create Task`.
2.  A modal dialog (`CustomModal`) opens:
    *   Inputs: Task Name, Start/End Dates, Description, and Initial Status.
    *   *Assignees checklist*: A list of checkbox options displaying all active project collaborators. Coordinator can check one or multiple assignees (e.g. checking the Architect and Technician).
3.  Clicking `Save Task`:
    *   Inserts the task row in `phase_tasks`.
    *   Inserts mapping rows in `task_assignments` for each checked user.
    *   Creates a notification alert for the assignees, and writes a log in `project_activities` (Action: `'task_created'`).

---

## 4. UI/UX Requirements

*   **Task List Grid**: Rendered as a list of expandable cards.
    *   *Status Selector*: Dropdown inline on the task (allows assignees to shift status from `started` to `completed` easily).
    *   *Assignee Avatars*: Miniature circle profile pictures displaying initials or photos of assigned users. Hovering shows a tooltip with their name.
    *   *Action Toolbar*: Edit/Delete buttons (Visible only to Coordinator/Owner).
*   **Dirty Date Validation**: If an admin sets a task's start or end date outside the boundary dates of its parent Phase, a warning tooltip appears: *"Warning: Task dates exceed parent Phase limits (Start: Jan 10 - End: Feb 20)"*.

---

## 5. Database Requirements

*   **Existing Tables Used**:
    *   `public.project_phases`: Core milestones.
    *   `public.phase_tasks`: Actionable tasks under phases.
    *   `public.task_assignments`: Junction mapping tasks to user profiles.
    *   `public.project_activities`: Activity logs.

---

## 6. API & Data Layer

| Operation | Target Table | Detail / Constraints |
| :--- | :--- | :--- |
| **Insert Phase** | `project_phases` | Standard insert; validates that start_date <= end_date |
| **Insert Task** | `phase_tasks` | Standard insert |
| **Assign Task** | `task_assignments` | Inserts rows mapping `task_id` to `user_id` |
| **Task Progress Update** | `phase_tasks` | Updates status field |

---

## 7. Validation Rules

*   **Timeline Boundaries**: `start_date` must always be less than or equal to `end_date` (applies to both phases and tasks).
*   **Assignees**: Tasks must be assigned to profiles associated as members of the parent project.

---

## 8. Edge Cases & Error Handling

*   **Phase Timeline Adjustments**: If a Coordinator shifts a Phase's dates, verify if any child tasks fall outside the new limits. If they do, display a review dialog listing the affected tasks and asking the coordinator to adjust them.
*   **Cascade Deletion Safeguards**: Deleting a phase automatically deletes all associated tasks and assignments (`cascade` constraints), but prompts the user with `DeletePromptButton` first.

---

## 9. Open Questions / Decisions Pending

*   Should we support task dependencies (e.g. Task B cannot start until Task A completes)? *(Recommended: keep it simple in Version 2 with individual dates; dependency logic can be added in subsequent updates).*
