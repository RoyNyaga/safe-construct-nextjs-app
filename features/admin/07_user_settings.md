# Admin Module: User Settings & Permissions

## 1. Overview

The User Settings & Permissions module (`/admin/users`) is the security and user administration core. It allows authorized administrators to view registered client profiles, create new users directly from the dashboard with temporary passwords, elevate system roles from `client` to `admin`, and manage granular dashboard capability permissions.

---

## 2. Listing Page: User Directory

*   **Layout**: Full-width structured data table.
*   **Sticky Search Toolbar**:
    *   *Search*: Text search matching First Name, Last Name, Email, or Phone number.
    *   *Role Filter*: Dropdown separating `Clients` from `Administrators`.
    *   *Action Button*: A primary button labelled `+ Create New User` which opens the User Creation Drawer.
*   **Data Grid Columns**:
    *   *User*: Circular avatar + Full Name (Title + First Name + Last Name).
    *   *Email & Phone*: Contact columns.
    *   *Country*: Registered country of residence.
    *   *System Role*: Badge displaying `Admin` (Amber) or `Client` (Blue).
    *   *Password Status*: Badges showing:
        *   `Temp Password Active` (Orange) if the user has not logged in/updated their password.
        *   `Password Updated` (Green) if they have updated their credentials.
    *   *Joined Date*: Formatted sign-up timestamp.
    *   *Actions*: Edit/Inspect Details button (pencil) or Permission Settings (shield icon).

---

## 3. Permissions & Details Inspector (Right Drawer)

Because role management and capability allocation require inspecting active settings while browsing, the system loads user properties in a **Side Drawer (`CustomDrawer`)** rather than shifting pages.

*   **Trigger**: Clicking a user row or the Shield/Pencil action icon in the directory list.
*   **Drawer Structure**:
    
    ### Section 1: User Profile Header
    *   Displays avatar, Title, First Name, Last Name, Email, Phone, and registration timestamp.
    
    ### Section 2: Temporary Credentials Utility
    *   **Conditional Rendering**:
        *   *Scenario A: User has NOT updated password* (i.e. `profiles.temp_default_password` is present):
            *   Displays a warning alert box: *"This user is using a temporary password. Once they update their password, it will be permanently cleared from this screen."*
            *   Displays a read-only password text field with a `Copy Password` button. Clicking the button copies the password and fires a success toast.
        *   *Scenario B: User HAS updated password* (i.e. `profiles.temp_default_password` is null and `profiles.password_updated_at` is set):
            *   Displays a green badge: *"Security: Password Updated by User"*
            *   Displays a timestamp field: *"Last Updated: [Date/Time]"*. The actual password string is hidden and inaccessible.
    
    ### Section 3: Global Role Selection
    *   Contains a styled MUI Select dropdown containing the `system_role` enum options:
        *   `Client`
        *   `Admin`
    *   Changing this selection triggers a confirmation check. If elevated to `Admin`, the Permission Matrix (Section 4) slides into view. If demoted to `Client`, the Permission Matrix is hidden, and any existing permission assignments are deactivated.
    
    ### Section 4: Admin Capabilities Checklist
    This checklist is visible **only** if the selected user's role is set to `Admin`. It displays the five granular dashboard capabilities:
    *   [ ] **Manage Catalogues** (Access to portfolio designs and estimates)
    *   [ ] **Manage Blogs & Comments** (Access to articles, tags, comments, and newsletter list)
    *   [ ] **Manage Leads & Inbox** (Access to service bids, design wizard forms, and contact inquiries)
    *   [ ] **Manage About Team** (Access to about page team cards)
    *   [ ] **Manage User Roles** (Access to user listing and this permissions manager)
    
    *   **Interaction**: Checkboxes operate as instant toggles. Toggling a checkbox appends or deletes a permission row in the `admin_permissions` database table.
    
    ### Section 5: Self-Access Validation Guard (Anti-Lockout)
    To prevent administrators from locking themselves out of the system:
    *   If the profile being inspected matches the **currently logged-in session ID**, the Role Selector and the `Manage User Roles` capability checkbox are **disabled**.
    *   Hovering over these disabled fields displays a `CustomTooltip` explaining: *"You cannot revoke user management capabilities or demote your own admin account. Contact another system administrator to adjust your credentials."*

---

## 4. User Creation Flow (Right Drawer)

Admins can register new clients or admins directly from the dashboard. This action integrates with the database trigger to create matching auth and profile entries.

*   **Trigger**: Clicking `+ Create New User` in the directory toolbar.
*   **UI Component**: A `CustomDrawer` sliding out from the right (to keep listing context).
*   **Form Fields**:
    *   *First Name & Last Name*: Text fields (required).
    *   *Title*: Text input (e.g. Mr, Ms, Dr, Architect) to define professional salutations.
    *   *Email*: Text field. Natively verified in `auth.users` for credentials.
    *   *Phone Number & Country Code*: Text inputs for phone-based credentials.
    *   *Country*: Country of residence (dropdown/text).
    *   *Avatar Image Uploader*: Square crop uploader to save profile pictures.
    *   *Global Role*: Select dropdown (`Client` or `Admin`). If `Admin` is selected, the 5 checkbox permissions render below.
*   **Workflow Execution**:
    1.  Admin fills details. The system generates a **default password** behind the scenes (or allows custom text input).
    2.  Admin clicks `Create User` (`LoadingButton`).
    3.  **Authentication Action**: Registers the user in Supabase Auth (`auth.users`) using the provided email/phone and generated password. Email/phone verification constraints are bypassed (auto-confirmed).
    4.  **Database Profile Sync**: The insert triggers the database to create a `public.profiles` row, adding `first_name`, `last_name`, `title`, `country`, `avatar_url`, and storing the generated password in `profiles.temp_default_password`.
    5.  **Success Screen State**: On completion, the drawer does **not** close automatically. Instead, it transitions to a success screen inside the drawer displaying:
        *   A success checkmark animation.
        *   The created username/email/phone.
        *   The generated temporary password.
        *   A prominent `Copy Credentials` button.
        *   A warning: *"Please copy these credentials and share them with the user immediately. Once this drawer is closed, the password cannot be retrieved easily."*
    6.  **Close & Refresh**: Clicking `Done` closes the drawer and refreshes the main user directory list.

---

## 5. UI/UX Flow Summary

| Action | UI Element | Flow & Navigation |
| :--- | :--- | :--- |
| **Inspect User** | Grid Row Click | Slides out the `CustomDrawer` on the right showing details, role, and capabilities |
| **Create User** | Toolbar Button | Slides out the User Creation Drawer |
| **Demote Admin** | Select Dropdown | Opens confirmation dialogue: *"Are you sure you want to demote this admin? This removes all dashboard access."* |
| **Toggle Permission** | Checkbox | Check/Uncheck inserts/deletes rows in `admin_permissions` instantly |
| **Self-Edit Block** | Disabled Checkbox | Displays tooltip warning when admin attempts to modify their own permissions |
