# Feature: Equipments & Tools Inventory

## 1. Overview

Construction sites utilize numerous hand tools, safety gear, and machinery (e.g. spades, handsaws, spirit levels, cement mixers). The **Equipments & Tools Inventory** module (`/app/projects/[project_id]/equipments`) allows coordinators to record, track, and monitor the quantity and condition of these assets. 

Tracking the condition of tools (Good, Manageable, Bad) helps the team anticipate equipment replacements, prevent project delays, and audit loss or damage over the project lifecycle.

**Key Scope**:
*   **Inventory Panel**: Searchable tool directory with quick quantity counters.
*   **Asset Condition Monitor**: Status indicators tracking wear-and-tear.
*   **Add/Edit Asset Form**: Light modal uploader for cataloging equipment.

---

## 2. User Personas & Access Levels

*   **Collaborators**: Can view the tool list to verify site resources. Cannot add new assets or edit quantity levels.
*   **Project Owner**: Can view the equipment registry and status logs.
*   **Project Coordinator**: Full access to add tools, update quantities, change status conditions, and delete tool logs. Requires the `'manage_equipments'` project capability.

---

## 3. User Journey & Workflow

### Workflow 1: Logging Site Tools
1.  Coordinator navigates to the project equipment directory and clicks `+ Add Tool / Equipment`.
2.  A dialog modal (`CustomModal`) opens.
3.  Coordinator enters Name (e.g. "Spirit Level"), selects Status (Good), sets Quantity (4), and uploads an optional photo.
4.  Coordinator clicks `Save Equipment`.
5.  System inserts a record into `equipments` and writes an audit log in `project_activities` (Action: `'equipment_created'`).

### Workflow 2: Updating Quantities & Condition
1.  Coordinator reviews the tool list on site.
2.  For "Spades", they notice one is broken. They click `Edit` on the Spades card.
3.  In the edit modal, they reduce the quantity of 'Good' spades and create a new row for 'Bad' spades, or simply update the card:
    *   Change Status to `Manageable`.
    *   Decrease or increase count using quick `+` and `-` quantity buttons.
4.  Upon saving, the system updates the row in `equipments` and writes a detailed action log in `project_activities` (Action: `'equipment_updated'`, detail: `{ "equipment_name": "Spades", "quantity_delta": -1, "new_status": "manageable" }`).

---

## 4. UI/UX Requirements

### Equipments Directory Page
*   **Tool Listing Cards**: Rendered with:
    *   *Preview Avatar*: Thumbnail photo of the equipment.
    *   *Asset Name*: Bold text.
    *   *Status Badge*: Good (Green chip), Manageable (Yellow chip), Bad (Red chip).
    *   *Quantity Pill*: Displays active quantity (e.g. "Qty: 12"). Renders inline `+` and `-` icons for quick coordinator increments/decrements.
    *   *Action Menu*: Quick access to edit properties or delete records.
*   **Interactive Tooltips**: Hovering over the status badge displays details:
    *   *Good*: "Fully functional, zero defects."
    *   *Manageable*: "Functional, showing signs of wear."
    *   *Bad*: "Damaged, requires repair or replacement."
*   **Empty State View**: Displays a toolbox icon with text: *"No tools logged for this site. Add shovels, saws, levels, or machinery to begin tracking site inventory."*

---

## 5. Database Requirements

*   **Existing Tables Used**:
    *   `public.equipments`: Stores tool properties, counts, and conditions per project.
    *   `public.project_activities`: Audits inventory and status adjustments.

---

## 6. API & Data Layer

| Operation | Target Table | Detail / Constraints |
| :--- | :--- | :--- |
| **Fetch Project Tools** | `equipments` | `select * from equipments where project_id = $1 order by name asc` |
| **Insert Tool** | `equipments` | Creates new equipment record linked to the project |
| **Update Quantity/Status** | `equipments` | Updates counts or status condition |

---

## 7. Validation Rules

*   **Quantity**: Required; must be an integer greater than or equal to zero.
*   **Status**: Required; must match `equipment_status` enum (`good`, `manageable`, `bad`).

---

## 8. Edge Cases & Error Handling

*   **Negative Counts**: The quantity input blocks entries below zero. If a coordinator attempts to decrement a tool count below zero via quick buttons, the action is disabled and a warning tooltip appears.
*   **Resource Orphans**: If an equipment uploader fails, the database rollback triggers to prevent invalid rows without image assets or project ID.

---

## 9. Open Questions / Decisions Pending

*   Should we track tool assignments (e.g. which worker has which spade)? *(Recommended: keep it general at the project inventory level to avoid over-complicating Version 2).*
