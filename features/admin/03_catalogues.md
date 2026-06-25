# Admin Module: Catalogues Management

## 1. Overview

The Catalogues Management module (`/admin/catalogues`) allows administrators to manage the company's portfolio of architectural design plans. Admins can create new designs, write descriptions, manage photo galleries, specify room layouts, and add line-item estimated costs.

---

## 2. Listing Page: Design Plan Directory

*   **Layout**: Full-width data grid with a sticky top action and filter bar.
*   **Sticky Toolbar**:
    *   *Search*: Text input filtering by title or description.
    *   *Filter Dropdowns*: Filter by Style (Bungalow, Duplex, Villa, etc.) and Design Origin (Africa, Europe, America, Canada).
    *   *Create Button*: A prominent primary button labelled `+ Create Design Plan` linking to the dedicated creation page.
*   **Data Grid Columns**:
    *   *Main Photo*: Miniature circular thumbnail.
    *   *Title*: Text displaying design name.
    *   *Style & Origin*: Text badges.
    *   *Rooms*: Format: "X Beds | Y Baths | Z Floors".
    *   *Area*: "Size (sqm)".
    *   *Estimated Cost*: Total cost calculated dynamically from cost items, formatted in local currency.
    *   *Status Badges*: 
        *   `Published` (Green) / `Draft` (Gray) toggle switches.
        *   `Featured` (Amber star toggle) to promote designs to the homepage.
    *   *Actions*: Edit icon (pencil) and Delete icon (trash).

---

## 3. Create / Edit Flow: The Dedicated Page

Because configuring a catalogue design is highly complex, the system uses a **Dedicated Form Page** (`/admin/catalogues/new` and `/admin/catalogues/[id]/edit`) rather than a modal or drawer. This provides ample workspace and avoids input clutter.

The edit/creation form is structured into three clear, accessible **horizontal tabs**:

### Tab 1: General Details & Layout
*   **Form Fields**:
    *   *Design Title*: Text input (required).
    *   *Description*: Rich-text input area detailing construction specifications and styling notes.
    *   *Dimensions*: Size (sqm), Bedrooms, Bathrooms, and Floors (number inputs).
    *   *Style & Origin*: MUI Select dropdowns populated by enums.
    *   *Cover Image Uploader*: A drag-and-drop region for uploading the primary card photo. Shows a progress bar during upload, converting to an image preview with a "Remove" button once uploaded.
*   **Action Buttons (Sticky Footer)**:
    *   `Cancel` -> Warns about unsaved changes if fields are dirty, then redirects back to listing.
    *   `Save Draft` / `Publish` -> `LoadingButtons` that save state and redirect.

### Tab 2: Gallery & Media Manager
*   **Upload Area**: Drag-and-drop bucket allowing multiple image files to be uploaded simultaneously.
*   **Photo List Grid**: Once uploaded, images render as individual cards. Each card contains:
    *   A preview of the photo.
    *   A text input field for the *Caption* (e.g. "Spacious Living Room view", "Rear Elevation").
    *   An *Order Index* number input (or drag-and-drop handle) to arrange rendering order on the client page.
    *   A `Delete` icon, using `DeletePromptButton` to confirm removal.

### Tab 3: Dynamic Cost Breakdown Estimator
*   **Design**: A list table representing components of the building cost (e.g., Foundation, Roofing, Masonry, Plumbing).
*   **Interaction**:
    *   Admins can click `+ Add Cost Line` to append a new blank row.
    *   Each row has two inputs: *Label* (text) and *Estimated Cost* (number).
    *   As numbers are typed, a **Running Total** row at the bottom of the card dynamically updates in real-time.
*   **Deletion**: Clicking the trash icon next to a row removes it immediately, recalculating the sum.

---

## 4. UI/UX Flow Summary

| Action | UI Element | Flow & Navigation |
| :--- | :--- | :--- |
| **Create new design** | Button | Redirects to dedicated page `/admin/catalogues/new` |
| **Edit existing design** | Grid Pencil Icon | Redirects to dedicated page `/admin/catalogues/[id]/edit` |
| **Change Published status** | Switch component | Immediate background action, triggers brief success notification |
| **Toggle Featured status** | Star Icon | Immediate update, triggers brief success notification |
| **Delete plan** | Trash Icon | Opens `DeletePromptButton` popover: *"Are you sure you want to permanently delete this plan and all associated media?"* |
