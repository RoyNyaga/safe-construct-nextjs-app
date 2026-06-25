# Feature: Project Initialization

## 1. Overview

Project Initialization is the first step in the Version 2 building lifecycle. When a client accepts the custom design proposal or construction bid, an administrator creates an active **Project** inside the system. 

During initialization, the admin defines the project name, country, specific address, estimated cost, and uploads a header photograph. Crucially, the creator must designate two fundamental roles immediately: the **Project Owner** (the client) and the **Project Coordinator** (the general contractor/supervisor). 

**Key Scope**:
*   **Initialization Form**: An admin-facing page with Google Maps Places autocomplete.
*   **Role Mapping**: Automatic project membership generation for the Owner and Coordinator.
*   **Audit Logging**: Immediate tracking entry logging the creation event.

---

## 2. User Personas & Access Levels

*   **Public / Clients**: Cannot initialize a project.
*   **Project Coordinator**: Cannot initialize a project (this is an admin-level dashboard function).
*   **System Admins**: Can initialize a project globally from `/admin/projects/new`. Requires the `'manage_projects'` dashboard permission.

---

## 3. User Journey & Workflow

1.  Admin navigates to the Request Designs list (under `/admin/leads`) to review an accepted design inquiry, or views the Projects list page.
2.  Admin clicks `Convert to Active Project` (from the design request details) or `+ Create Project` (from the projects list page, which navigates directly to `/admin/projects/new`).
3.  The system displays the **Project Initialization Form**.
4.  Admin fills in project title, description, and selects the country.
5.  Admin clicks the *Location Address* field and types the location. The field triggers a **Google Places Autocomplete list**. Admin selects the address.
6.  Admin selects the *Owner* (searches the profiles table by name or phone) and the *Coordinator* (searches admin/staff profiles).
7.  Admin uploads a *Header Photo* and clicks `Initialize Project`.
8.  **Backend Processes**:
    *   Creates a row in `projects` (storing coordinates, place ID, and metadata).
    *   Creates two rows in `project_members`:
        *   Row A: Link to Owner (Role: `'owner'`).
        *   Row B: Link to Coordinator (Role: `'coordinator'`).
    *   Records a log in `project_activities` (Action: `'project_created'`, detail: `{ "owner_id": "uuid", "coordinator_id": "uuid" }`).
9.  Admin is redirected to `/admin/projects` (dashboard view), and the Owner/Coordinator receive a notification.

---

## 4. UI/UX Requirements

### Project Creation Form Page (`/admin/projects/new`)
*   **Header Section**: Title: *"Initialize Active Construction Project"*, Back button, and `Initialize Project` `LoadingButton`.
*   **Form Fields Grid**:
    *   *Project Title*: Text input.
    *   *Country*: Select dropdown.
    *   *Google Location Address*: Autocomplete search field showing matching location results. Selected items save coordinates (latitude and longitude) and place ID in hidden inputs.
    *   *Estimated Cost*: Number input with currency prefix.
    *   *Description*: Standard textarea block.
    *   *Owner Search*: Autocomplete selection listing profile names, emails, and phone numbers.
    *   *Coordinator Search*: Autocomplete selection listing profile names marked with the `'admin'` system role.
    *   *Header Photo Box*: Drag-and-drop file uploader showing thumbnail preview once uploaded.
*   **Feedback**: Successful submissions trigger a `CustomNotification` success toast: *"Project successfully initialized. Owner and Coordinator profiles mapped."*

---

## 5. Database Requirements

*   **Existing Tables Used**:
    *   `public.projects`: Inserts project title, country, address, coordinates, and cost.
    *   `public.project_members`: Inserts owner and coordinator records.
    *   `public.project_activities`: Inserts action trail record.

---

## 6. API & Data Layer

| Operation | Target Table | Detail / Constraints |
| :--- | :--- | :--- |
| **Insert Project** | `projects` | Title, country, address, lat/long, place_id, cost, description, cover photo |
| **Create Membership** | `project_members` | Map user ID + project ID + role (`owner` / `coordinator`) |
| **Audit Activity** | `project_activities` | Log `project_id`, admin `user_id`, type `'project_created'`, and json details |

---

## 7. Validation Rules

*   **Project Title**: Required; minimum 5 characters.
*   **Country**: Required.
*   **Location Address**: Required; must be resolved from Google Places Autocomplete to capture place ID and coordinates.
*   **Owner & Coordinator**: Required. Cannot map the same user account to both roles simultaneously.

---

## 8. Edge Cases & Error Handling

*   **Google API Timeout**: If the autocomplete API fails to load coordinates, allow the admin to manually input the address, logging a warning flag in the database location metadata.
*   **Orphaned Members**: If mapping coordinator/owner memberships fails during transaction execution, the entire transaction is rolled back, preventing projects from existing without primary stakeholders.

---

## 9. Open Questions / Decisions Pending

*   Should we auto-generate default project timelines (e.g. phases) during initialization? *(Recommended: keep it manual; phases are added by the coordinator after project creation).*
