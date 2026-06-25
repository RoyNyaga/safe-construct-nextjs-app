# Feature: Project Files & Media Library

## 1. Overview

Active construction projects involve numerous documents, including site plans, architectural drawings, cost estimates, structural calculations, and permit files. The **Project Files & Media Library** provides a structured digital storage workspace. 

Users can upload documents, name them, and optionally link them to specific phases of construction. To maintain structure, the library accepts only **PDF** and **Image (PNG/JPG)** formats. Files uploaded to a phase are viewable both within that phase and in the global project files tab.

**Key Scope**:
*   **Unified Upload Modal**: Multi-file drop zone validating file types.
*   **Global Project Files Tab**: Categorized directory showing all documents.
*   **Phase-Specific File Sections**: Dynamic file filters showing documents belonging to active phases.

---

## 2. User Personas & Access Levels

*   **Collaborators (Architects/Treasurers)**: Can view all files; can upload files if granted the `'upload_blueprints'` capability.
*   **Project Owner**: Full access to view all files, download, and upload.
*   **Project Coordinator**: Full access to view, upload, rename, and delete any files. Requires `'upload_blueprints'` or `'manage_phases'`.

---

## 3. User Journey & Workflow

### Workflow 1: Uploading a File
1.  Coordinator opens `/app/projects/[project_id]/files` (or views a specific Phase page).
2.  Coordinator clicks `+ Upload File`.
3.  A upload window opens (`CustomModal`):
    *   Coordinator selects or drags a file.
    *   System checks file extension. If not a PDF or image, blocks the upload and shows an error notification.
    *   Coordinator inputs a custom *File Name* (defaults to the original filename).
    *   Coordinator selects an optional *Phase association* from a dropdown menu.
4.  Coordinator clicks `Start Upload` (`LoadingButton`).
5.  File is stored in the `project-documents` Supabase Storage bucket.
6.  An index entry is created in `project_files` mapping it to the project and phase.
7.  The feed updates, and an action log is created in `project_activities` (Action: `'file_uploaded'`).

### Workflow 2: Browsing Phase-Specific Files
1.  Owner navigates to `/app/projects/[project_id]/phases/[phase_id]`.
2.  Under the "Phase Files" section, the page displays only files where `phase_id` matches the current phase.
3.  Clicking a file thumbnail:
    *   If it is a Photo, opens a full-screen lightbox slider.
    *   If it is a PDF, opens the file in a new browser tab or renders it inside an inline document viewer component.

---

## 4. UI/UX Requirements

### Global Files Directory (`/app/projects/[project_id]/files`)
*   **Filter Toolbar**:
    *   *Search*: Text search matching the custom file name.
    *   *Type Selector*: Tabs separating `All`, `PDFs`, and `Images`.
    *   *Phase Dropdown*: Filter files belonging to a specific phase.
*   **Files Grid**: Displays cards representing files:
    *   *Thumbnail preview*: Image preview for photos; standard file icon with a "PDF" label for documents.
    *   *Metadata*: Name, file size, upload date, and uploader name.
    *   *Actions*: Download icon, rename icon (opens quick text edit field), and delete icon (uses `DeletePromptButton`).
*   **Empty State**: Displays a blueprint folder icon with text: *"No documents uploaded yet. Upload site plans, estimates, or blueprints to get started."*

---

## 5. Database Requirements

*   **Existing Tables Used**:
    *   `public.project_files`: Stores document names, URLs, file types, and phase/project IDs.
    *   `public.project_activities`: Records upload events.

---

## 6. API & Data Layer

| Operation | Target Table | Detail / Constraints |
| :--- | :--- | :--- |
| **List Project Files** | `project_files` | `select * from project_files where project_id = $1 order by created_at desc` |
| **List Phase Files** | `project_files` | `select * from project_files where phase_id = $1 order by created_at desc` |
| **Insert File Record** | `project_files` | Saves URL, name, type, and uploader profile ID |

---

## 7. Validation Rules

*   **Allowed Formats**: `.pdf`, `.png`, `.jpg`, `.jpeg`, `.webp`. Any other format (e.g. zip, dwg, xlsx) is blocked on upload.
*   **File Size Limit**: Maximum 15MB per file to prevent database bloating.

---

## 8. Edge Cases & Error Handling

*   **Storage Upload Failure**: If the file upload to Supabase Storage fails (e.g. timeout), abort the database insert operation and alert the user with a retry warning.
*   **Phase Deletion**: If a project phase is deleted, set the `phase_id` on its files to `NULL` (cascade set null), keeping the files accessible in the global project files tab rather than deleting them.

---

## 9. Open Questions / Decisions Pending

*   Should we implement folders/subfolders? *(Recommended: keep it flat with phase tagging and search filters for simplicity in Version 2).*
