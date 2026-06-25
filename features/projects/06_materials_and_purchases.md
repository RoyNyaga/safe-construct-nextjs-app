# Feature: Materials & Purchase Orders

## 1. Overview

Materials tracking is the financial and logistical core of a building project. The **Materials & Purchase Orders** module (`/app/projects/[project_id]/materials`) manages the intake and consumption of building supplies (e.g. cement, sand, gravel, rebars).

To maintain strict traceability, **materials.current_quantity cannot be directly edited by users**. Quantity changes occur strictly through two transaction channels:
1.  **Inflow (Purchased)**: Purchase Orders (POs) catalog items to buy. When a PO is marked as `purchased`, the quantities are automatically added to the inventory.
2.  **Outflow (Consumed)**: Daily Progress updates report site material consumption. When a progress report is approved, those quantities are automatically deducted from the inventory.

---

## 2. Page Structure & Tabs

The module is divided into two primary sub-sections:

### Tab 1: Materials Inventory
*   **Listing View**: Grid/Table listing materials, showing Name, Unit Type (e.g. bags, tons), Current Stock level, Unit Cost, Location, and Supplier Info.
*   **Details Drawer (`CustomDrawer`)**: Inspects a material's history:
    *   *Transaction Ledger Feed*: List of every audit entry showing date, delta (e.g. "+50 bags" or "-4 bags"), type (Purchase vs. Progress Log), and the creator.
*   **Creation Modal (`CustomModal`)**: Adds a new material category to the project catalog (initial quantity defaults to `0`).

### Tab 2: Purchase Orders (POs)
*   **Listing View**: Table displaying:
    *   *PO ID*: Unique identifier.
    *   *Phase*: Target phase (e.g. "Foundation").
    *   *Total Cost*: Dynamic sum of purchase items.
    *   *Status Badge*: `Draft` (Gray), `Approved` (Blue), `Purchased` (Green), `Cancelled` (Red).
    *   *Creator & Approver*: Staff profiles.
    *   *Actions*: View Details (Shield/Inspect), Edit, or Delete.

---

## 3. Core Workflows & Logic

### Workflow 1: The Purchase Order Lifecycle
1.  **Drafting**: A collaborator (e.g., Technician or Treasurer) clicks `+ Create Purchase Order`.
    *   They select the target **Phase** (required).
    *   They select materials from the inventory list, inputting target quantities.
    *   The form displays the material unit cost, auto-calculates row totals (`quantity * unit_cost`), and displays the overall PO total cost.
    *   Clicking `Save Draft` creates a PO row with status `'draft'`.
2.  **Approval**: Only the **Owner** or **Coordinator** can review and approve a draft PO:
    *   They click `Approve PO` in the inspector drawer.
    *   Status shifts to `'approved'` (no inventory changes happen yet).
3.  **Purchase & Intake (Execution)**: Once the physical transaction occurs:
    *   The Coordinator uploads the receipt photograph and clicks `Mark as Purchased`.
    *   Status shifts to `'purchased'`.
    *   **Automated Action (Trigger)**: The database trigger `trigger_process_purchase_inventory` fires:
        *   It reads each item in `purchase_items`.
        *   It inserts positive `inflow_purchase` rows into `material_transactions` for each material.
        *   The transaction ledger trigger `trigger_sync_material_stock` automatically updates `materials.current_quantity`.
    *   An audit log is recorded in `project_activities` (Action: `'purchase_completed'`).

### Workflow 2: Manual Stock Adjustments (Overrides)
1.  If materials are donated or transferred from another project without a PO:
    *   Coordinator opens the material inspector drawer and clicks `Adjust Stock`.
    *   They input the quantity change (+/-) and select a reason (e.g. "Site Transfer", "Damaged Bags").
    *   Clicking submit inserts a transaction of type `'adjustment'` into `material_transactions`. This immediately updates stock levels and logs the event.

---

## 4. UI/UX Requirements

### Purchase Order Creator Page (`/app/projects/[project_id]/purchases/new`)
*   **Header**: Title: *"Draft Purchase Order"*, Phase selector dropdown, and `Save Draft` `LoadingButton`.
*   **Items Table**:
    *   Each row contains: Material selector, Quantity input, Unit cost input (pre-fills default cost, editable for this invoice), and auto-calculated Row Total.
    *   Trash icon to remove rows.
    *   `+ Add Material Line` button at the bottom of the table.
*   **Summary Card (Sticky Sidebar)**: Displays item count, subtotal, taxes/fees input, and the overall Grand Total.

### Purchase Order Inspector Drawer
*   Displays the full invoice list and uploaded receipt thumbnail (clickable to expand).
*   **Action Footer**:
    *   Renders `Approve PO` (or `Mark as Purchased` if already approved) as a prominent button only to users with Coordinator/Owner capabilities. Other users see the status but no button.

---

## 5. Database Requirements

*   **Existing Tables Used**:
    *   `public.materials`: Active stock catalog.
    *   `public.material_transactions`: Ledger recording stock inflow/outflows.
    *   `public.purchases`: Purchase order status and metadata.
    *   `public.purchase_items`: Specific quantities bought in a PO.
    *   `public.project_activities`: Log of PO approvals.

---

## 6. API & Data Layer

| Operation | Target Table | Detail / Constraints |
| :--- | :--- | :--- |
| **Draft PO** | `purchases` & `purchase_items` | Inserts header and child rows in a single database transaction |
| **Approve PO** | `purchases` | Updates status to `'approved'`, setting `approved_by` to active user ID |
| **Complete PO** | `purchases` | Updates status to `'purchased'` (triggers DB triggers to adjust stock) |

---

## 7. Validation Rules

*   **PO Items**: Must contain at least one material item with a quantity greater than zero.
*   **Approval Authority**: RLS blocks non-coordinators/owners from editing a PO's status beyond `'draft'`.

---

## 8. Edge Cases & Error Handling

*   **Negative Stock Warning**: If a manual adjustment or progressive deduction will result in a negative stock level, warning dialog alerts the coordinator: *"This action will result in a negative inventory level (-5 bags). Please confirm if you wish to proceed."* (Postgres checks block negative values unless explicitly allowed, keeping the system safe).
*   **Double Purchase Execution**: Enforce that a PO status can only transition to `'purchased'` **once**. Subsequent attempts to update must be blocked to prevent duplicating stock inflow deltas.

---

## 9. Open Questions / Decisions Pending

*   Should we support multi-currency purchases? *(Recommended: keep currency unified at the project country level for Version 2).*
