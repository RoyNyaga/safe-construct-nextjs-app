# Admin Module: About Team Management

## 1. Overview

The About Team Management module (`/admin/team`) allows administrators to manage the profiles of directors, engineers, and architects shown on the public About page. Admins can add team members, upload profile photographs, define display hierarchies, and temporarily hide profiles without deleting them.

---

## 2. Listing Page: Team Directory & Sorting Grid

Because the public About page shows team members in a specific grid order, the listing page must support sorting.

*   **Layout**: A card grid matching the visual layout of the public About page, giving the admin a direct preview of how profiles will render.
*   **Card UI Elements**:
    *   *Avatar*: High-quality image or circular initials placeholder.
    *   *Name & Job Title*: Prominent text.
    *   *Contact Link*: Phone number (if provided).
    *   *Sort Handle*: A drag-and-drop icon allowing cards to be dragged and reordered. Reordering cards recalculates and updates the `order_index` database values instantly in the background.
    *   *Visibility Toggle*: A switch labelled `Visible` to easily hide a profile from the public grid.
*   **Header Toolbar**:
    *   *Search*: Text filter by name or title.
    *   *Action Button*: A primary button `+ Add Team Member` which opens the creation modal.

---

## 3. Create / Edit Flow: Centered Modals

Because team profiles are lightweight (containing only 4–5 fields), the system uses a **Centered Modal Dialog (`CustomModal`)** instead of redirecting pages or sliding drawers.

*   **Trigger**: Clicking `+ Add Team Member` or the edit button on a profile card.
*   **Form Fields**:
    *   *Full Name*: Text input (required).
    *   *Job Title*: Text input (required, e.g., "Head of Space Planning").
    *   *Phone Number*: Text input (optional; used on public cards as a call shortcut).
    *   *Avatar Uploader*: A circular uploader component. Clicking it prompts file selection. Once selected, shows a crop utility (forces square/circular aspect ratio) and shows the uploaded preview.
    *   *Visibility*: Checkbox defaulting to true.
*   **Actions**:
    *   `Cancel` button: Closes the modal.
    *   `Save Profile`: A `LoadingButton` that uploads the image to Supabase Storage (`team-photos` bucket), inserts or updates the database row, and closes the modal on success.

---

## 4. UI/UX Flow Summary

| Action | UI Element | Flow & Navigation |
| :--- | :--- | :--- |
| **Add Member** | Toolbar Button | Opens `CustomModal` with blank form fields |
| **Edit Profile** | Card Pencil Icon | Opens `CustomModal` populated with selected profile details |
| **Delete Profile** | Card Trash Icon | Triggers `DeletePromptButton` confirmation popover: *"Are you sure you want to permanently remove this profile? This cannot be undone."* |
| **Reorder Grid** | Card Drag Handles | Dragging a card and dropping it performs an instant database batch update to align `order_index` positions |
| **Hide / Show Profile** | Switch component | Instant database flag update, triggers a toast notification |
