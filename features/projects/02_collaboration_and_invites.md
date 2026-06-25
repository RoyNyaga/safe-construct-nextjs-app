# Feature: Collaboration & Project Invites

## 1. Overview

To collaborate on building projects, coordinators and owners can add team members (architects, technicians, treasurers) to a project. While administrators can add users directly from the dashboard, project-level invitations are managed dynamically using the **Project Invites System**.

Invites track the delivery of project invitations via a junction token. If direct WhatsApp API messages are unavailable, the system provides copyable links to share manually. Accepting an invite triggers one of two workflows: logging in to an existing account, or creating a new account.

**Key Scope**:
*   **Invitation Dashboard**: Project settings panel listing active collaborators and pending invites.
*   **Invite Token Generation**: Secure link generation containing the project context.
*   **Sign-In / Sign-Up Acceptance Flows**: Smart redirection logic depending on user session states.

---

## 2. User Personas & Access Levels

*   **Public Users**: Can only view invite acceptance landing pages if they possess a valid token in the URL path.
*   **Collaborators**: Can view project members but cannot invite, kick, or modify permissions.
*   **Project Owner / Coordinator**: Full access to invite collaborators, edit overrides, and revoke memberships. Requires `'manage_collaborators'` project capability.

---

## 3. User Journey & Workflow

### Workflow 1: Creating & Sharing Invites
1.  Coordinator navigates to `/app/projects/[project_id]/users`.
2.  Coordinator clicks `+ Invite Collaborator`.
3.  Coordinator fills in the Invitee's **Phone Number** (required), Email (optional), and selects their **Project Role template** (e.g. `'architect'`, `'technician'`).
4.  Upon clicking `Send Invitation`:
    *   System generates a cryptographically secure, random `invite_token`.
    *   Creates a row in `project_collaborator_invites` with status `'pending'`.
    *   Builds a shareable link: `https://safe-construct.com/invite?token=[token]`.
5.  A success modal displays the link with two buttons:
    *   `Copy Invite Link` -> Copies the link to the clipboard.
    *   `Share via WhatsApp` -> Opens a WhatsApp Web pre-populated text link: *"Hello! You have been invited to collaborate on Safe-Construct Project [Project Title]. Click here to accept: [Invite Link]"*.

### Workflow 2: Accepting Invites (Flow A - User Has Account)
1.  Invitee clicks the link and lands on `/invite?token=[token]`.
2.  System validates the token. If invalid, expired, or already accepted, shows an error screen.
3.  If valid, and the invitee is **already logged in**:
    *   Renders an invitation card showing the project name, coordinator, and role.
    *   Invitee clicks `Accept & Join`.
    *   Updates invite status to `'accepted'`.
    *   Inserts membership row into `project_members`.
    *   Redirects user to the project portal `/app/projects/[project_id]`.
4.  If the user has an account but is **not logged in**, the page displays a login panel. Logging in successfully returns them to step 3.

### Workflow 3: Accepting Invites (Flow B - User Has No Account)
1.  Invitee lands on `/invite?token=[token]`.
2.  System validates the token and detects no active session. Invitee selects *"I don't have an account yet"*.
3.  The page renders a registration form:
    *   *First Name & Last Name* (required)
    *   *Phone Number* (Pre-filled from invite, disabled to force phone matching)
    *   *Password* (required)
4.  Invitee submits registration.
5.  **Backend Processes**:
    *   Registers user in Supabase Auth. Bypasses verification since the phone is validated by invite possession.
    *   Db trigger creates the `profiles` record.
    *   Inserts the new profile into `project_members`.
    *   Updates invite status to `'accepted'`.
    *   Auto-logs the user in and redirects them to `/app/projects/[project_id]`.

---

## 4. UI/UX Requirements

### Project Collaboration Panel (`/app/projects/[project_id]/users`)
*   **Sections**:
    *   *Collaborators Grid*: Displays cards of active members, showing their name, role badge, contact details, and a settings button (to edit overrides).
    *   *Pending Invites Table*: Displays pending invitations (phone number, role, created date, and a `Resend / Copy Link` action).
*   **Modal Form (`CustomModal`)**: Simple popover form for `+ Invite Collaborator`.
*   **Success Screen (`CustomModal`)**: Displays the invitation card with copy buttons.

### Invite Acceptance Portal (`/invite`)
*   **Design**: A centered, card-based login/signup screen.
*   **Header**: Brand logo + project cover banner.
*   **Form**: Toggles between Log In (existing account) and Sign Up (new account). Shows clean progress loaders during credential processing.

---

## 5. Database Requirements

*   **Existing Tables Used**:
    *   `public.project_collaborator_invites`: Inserts invites, updates status.
    *   `public.project_members`: Inserts memberships on acceptance.
    *   `public.profiles`: Reads invitee profile information.

---

## 6. API & Data Layer

| Operation | Target Table | Detail / Constraints |
| :--- | :--- | :--- |
| **Insert Invite** | `project_collaborator_invites` | Saves token, target role, project ID, invitee contact info |
| **Validate Token** | `project_collaborator_invites` | `select * from project_collaborator_invites where invite_token = $token and status = 'pending'` |
| **Accept Invite** | `project_members` | Inserts membership + updates invite status to `'accepted'` (runs in database transaction) |

---

## 7. Validation Rules

*   **Phone Number**: Must contain country code (e.g. WhatsApp format).
*   **Role**: Must match the `project_role` enum (`coordinator`, `collaborator` - owners cannot be invited).

---

## 8. Edge Cases & Error Handling

*   **Token Spoofing**: Validate invite tokens strictly. Expire invitations after 7 days automatically via database checks.
*   **Phone Mismatch**: During registration (Flow B), the phone input is disabled. This prevents users from signing up with a different phone number and hijacking the invite.

---

## 9. Open Questions / Decisions Pending

*   Should we auto-expire invites? *(Yes, standard 7-day expiration is recommended).*
