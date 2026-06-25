# Feature: Admin Portal & Context Switcher

## 1. Overview

The Admin Portal is the internal command center for the Safe-Construct platform. It allows administrators to manage public content, moderate comments, review inquiries and leads, and allocate system permissions. 

Because administrators also need to use the app in client context (e.g., testing features, browsing portfolios, or checking client portals), the authentication flow incorporates a **Context Switcher** screen immediately after login. This screen prompts the administrator to select their operating workspace (Admin Dashboard vs. Client App), and is expandable to support future contexts (e.g., Contractor Portal, Supervisor Portal) in subsequent versions.

**Key Scope**:
*   **Context Switcher Screen**: A portal entry layout where admins select their active workspace context.
*   **Dynamic Sidebar Navigation**: Tab items load dynamically based on the admin's granular capability tokens.
*   **Resource Management Modules**: Admin CRUD tools for catalogues, blog articles, incoming leads, team listings, and user permission overrides.

---

## 2. User Personas & Access Levels

*   **Public / Guest Users**: Cannot access the admin layout, `/admin/*` routes, or `/select-context`. Redirected to `/login` or `/`.
*   **Clients (Standard Users)**: Cannot access `/admin/*` or `/select-context`. If they sign in, they bypass the context switcher entirely and redirect to `/` or `/app`.
*   **Administrators**: Have access to `/select-context` upon login. Within the Admin Dashboard `/admin`, their access is gated by granular capability tokens stored in the database:
    *   `manage_catalogues`: Access to catalogues, cost breakdowns, and photo galleries.
    *   `manage_blogs`: Access to blog articles, tags, newsletter subscribers list, and comment moderation.
    *   `manage_leads`: Access to service requests, design inquiries, and contact messages.
    *   `manage_team`: Access to team member listings displayed on the About page.
    *   `manage_users`: Access to profile listings, role adjustments, and admin permission edits.

---

## 3. User Journey & Workflow

### Workflow 1: Login & Context Selection
1. An administrator inputs their phone number and password on `/login`.
2. Upon successful authentication, the system reads their `system_role` from their profile.
3. If `system_role` is `'admin'`, the application redirects them to `/select-context`.
4. On the `/select-context` page, the administrator is presented with two workspace cards:
   *   *Card A: Go to Client Portal* (Redirects to client-facing `/app` or `/`)
   *   *Card B: Go to Admin Dashboard* (Redirects to `/admin/dashboard`)
5. If a standard client logs in (`system_role = 'client'`), the system bypasses this page and sends them straight to `/` or the client portal `/app`.
6. If an unauthenticated user or client attempts to access `/select-context` directly, they are redirected to `/` with an access denied message.

### Workflow 2: Dynamic Admin Navigation
1. The admin selects "Admin Dashboard" and lands on `/admin/dashboard`.
2. The dashboard layout fetches the admin's granular permissions from `admin_permissions`.
3. The layout compiles the navigation sidebar. It renders only the tabs that match the admin's capabilities (e.g. if they only have `manage_blogs`, they only see the "Blog Posts" and "Comment Moderation" links).
4. If the admin attempts to access a restricted sub-route directly (e.g., typing `/admin/users` when they lack `manage_users`), they land on a full-screen "Access Denied" error message.

### Workflow 3: Resource Moderation & Management
1.  **Catalogue Management**: Admin browses `/admin/catalogues` -> Creates designs, uploads images, logs line-item costs, and toggles published/featured flags.
2.  **Blog & Tag Management**: Admin browses `/admin/blogs` -> Writes posts, configures tags, and approves pending comments from the public.
3.  **Leads & Messages Inbox**: Admin browses `/admin/leads` -> Views contact messages, newsletter lists, service bids, and conversational design inquiries, marking them as read, replied, or reviewed.
4.  **Team List Management**: Admin browses `/admin/team` -> Adds, uploads photos, or hides team members on the public About page.
5.  **User Access Controls**: Admin browses `/admin/users` -> Creates new users with auto-generated temporary passwords, inspects details, tracks user password update state, edits roles, and adds or removes specific capability rows for other admins.

---

## 4. UI/UX Requirements

### Section 1: Context Selector Page (`/select-context`)
*   **Layout**: Centered, dark slate grid on an amber accent background. Encapsulated in a container.
*   **Workspace Cards**: Rendered with entrance animations.
    *   *Client App Card*: Displays a laptop icon, text: *"Access the public website and client portals. Search plans and view tracking boards."*
    *   *Admin Dashboard Card*: Displays a gear/shield icon, text: *"Manage design files, moderate blogs, review customer requests, and manage staff permissions."*
*   **Interactions**: Micro-animations on hover (scale up by 2%, subtle glow border).
*   **Accessibility**: Focus states with clear outlines and tooltips clarifying the function of each workspace.

### Section 2: Admin Dashboard Sidebar & Header Layout
*   **Sidebar Navigation Drawer**: Uses `CustomDrawer` built on MUI. Displays the company logo and the dynamic link list.
*   **Dynamic Tabs**:
    *   `Dashboard` (Available to all admins)
    *   `Catalogues` (Requires `manage_catalogues`)
    *   `Blog Posts & Comments` (Requires `manage_blogs`)
    *   `Inbox / Leads` (Requires `manage_leads`)
    *   `About Team` (Requires `manage_team`)
    *   `User Settings` (Requires `manage_users`)
*   **Header Bar**: Displays the active page title, a "Context Switcher" fast-toggle link (allowing the admin to jump back to `/select-context`), and the active user's avatar.

### Section 3: Sub-Module Layouts
*   **Lists/Tables**: Structured lists using styled data grids, with search fields and filter dropdowns.
*   **Modals**: Uses `CustomModal` for confirmation steps (e.g., approving service requests, deleting cost items) and editor slide-outs.
*   **Tooltips**: Uses `CustomTooltip` over status icons, action buttons (edit/delete), and override checkboxes to guide administrative operations.
*   **Buttons**: Uses `LoadingButton` for async submissions (like saving blog posts or saving new design records) to prevent duplicate submissions.

---

## 5. Database Requirements

We will need a new table in our schema to store the modular permissions for admin users. This will decouple the global `'admin'` system role from specific dashboard actions.

### [NEW] Table: `admin_permissions`
Stores mapping between administrators and their specific modular permission key assignments.

```sql
create table public.admin_permissions (
    id uuid default uuid_generate_v4() primary key,
    admin_id uuid references public.profiles(id) on delete cascade not null,
    permission_key text not null,
    created_at timestamptz not null default now(),
    unique (admin_id, permission_key)
);

-- Performance Index
create index idx_admin_permissions_admin on public.admin_permissions(admin_id);
```

### Row Level Security (RLS) Policies for `admin_permissions`
*   Only users with the system role `'admin'` who possess the `'manage_users'` capability can select or modify rows in this table.

---

## 6. API & Data Layer

| Operation | Table | Target Conditions |
| :--- | :--- | :--- |
| Fetch User Role | `profiles` | Find role by authenticated user ID |
| Fetch Admin Permissions | `admin_permissions` | Get all capability rows matching the admin ID |
| Update Admin Capability | `admin_permissions` | Insert/Delete rows mapping admin ID to permission key |
| Manage Catalogue | `catalogues`, `catalogue_images`, `catalogue_cost_items` | Standard CRUD operations (Requires `manage_catalogues`) |
| Manage Blog | `blogs`, `blog_tags`, `blog_comments` | Standard CRUD operations + Comment approval flags (Requires `manage_blogs`) |
| Manage Leads | `service_requests`, `request_designs`, `contact_messages`, `newsletter_subscribers` | Read entries + Update lifecycle status (Requires `manage_leads`) |
| Manage Team | `team_members` | Standard CRUD operations (Requires `manage_team`) |

---

## 7. Validation Rules

*   **Blogs**: Title must be at least 10 characters; body content must not be blank.
*   **Catalogues**: Size (sqm) must be greater than zero; bedroom and bathroom count must be positive integers.
*   **Admin Permissions**: An admin user cannot delete their own `manage_users` permission row to prevent accidental self-lockouts.

---

## 8. Edge Cases & Error Handling

*   **Accidental Lockout**: Prevent an admin from removing their own `manage_users` role or editing their own profile role from `'admin'` to `'client'` while active in the session.
*   **Dynamic Role Revocation**: If an admin's capability is revoked while they are active on a page, the next API request or database query (secured by RLS) will reject the operation and trigger an automatic UI redirect to the Access Denied screen.
*   **Deep Linking**: If an admin types a direct URL (e.g., `/admin/users`) without the corresponding permission, the route guard component intercepts the render, showing the Access Denied UI rather than rendering empty components.

---

## 9. Open Questions / Decisions Pending

*   Should we auto-expire inactive admin sessions after a specific period (e.g., 30 minutes of idle time) for compliance and security?
*   Should newsletter subscriber list management be grouped under `manage_blogs` (since newsletters relate to article distribution) or `manage_leads` (since subscribers are prospects)? *(Currently grouped under `manage_blogs` to centralize content marketing, but can be split).*
