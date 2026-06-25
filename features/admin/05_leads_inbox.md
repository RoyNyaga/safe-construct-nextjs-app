# Admin Module: Unified Leads Inbox

## 1. Overview

The Unified Leads Inbox (`/admin/leads`) aggregates all customer inquiries, custom design wizard submissions, general service requests, contact forms, and newsletter subscriptions into a single interface. 

To keep the workspace clean and modern, listing tables are simple, while **detailed inspection, status updates, and note-taking are handled entirely inside side slide-out drawers (`CustomDrawer`)**. This ensures the admin never leaves the inbox context when processing multiple leads.

---

## 2. Page Structure & Tabs

The inbox uses a horizontal tab navigation bar to filter by entry point:

### Tab 1: Design Inquiries (Conversational Wizard Leads)
*   **Listing View**: Table displaying:
    *   *Client*: Full Name.
    *   *Location*: Target Country.
    *   *Design Style*: Selected style (e.g., Duplex, Bungalow).
    *   *Meeting Date*: Selected consultation time and timezone.
    *   *Status*: Badges matching the workflow lifecycle (`Submitted`, `Meeting Attended`, `Client Declined`, `Project Created`).
*   **Inspector Flow (Right Drawer)**: Clicking a row slides out a `CustomDrawer`:
    *   *Section 1: Contact Details*: Clickable WhatsApp number (launches WhatsApp web) and email link.
    *   *Section 2: Site Location & Land*: Details on build country, land ownership, and site plan link.
    *   *Section 3: Structural Specs*: Rooms, bathrooms, swimming pool, solar power, and size requirements.
    *   *Section 4: Requested Documents*: Badges showing the blueprints/calculations requested.
    *   *Section 5: Follow-Up & Actions*:
        *   *Admin Notes*: A rich text area where staff logs call summaries or details (autosaves on blur).
        *   *Status Selector*: Dropdown to advance the lead.
        *   *Convert Button*: If status is changed to `Project Created`, renders a button to initialize a project record (Version 2 trigger).

---

### Tab 2: Service Requests (Inquiries from service pages)
*   **Listing View**: Table displaying client name, request type (Custom Design, Construction Bid, Supervision, Cost Estimate), submission date, and status.
*   **Inspector Flow (Right Drawer)**: Slides out details matching the specific type:
    *   *Construction Bid*: Displays budget range, target Timeline, and a clickable link to download the client's uploaded blueprint file.
    *   *Supervision & QA*: Displays site address, current builder's name, and scope details.
    *   *Actions*: Status dropdown (`Pending`, `Under Review`, `Proposal Sent`, `Accepted`, `Declined`) + admin follow-up log.

---

### Tab 3: Contact Messages (General Contact Form)
*   **Listing View**: Table showing Sender Name, Subject, Preferred Contact Method (WhatsApp or Email), and Status (Read / Replied).
*   **Inspector Flow (Right Drawer)**: 
    *   Displays the full message body.
    *   *Action Buttons*:
        *   `Open WhatsApp Chat` -> Launches chat.
        *   `Mark as Replied` -> Toggles database flag, updates listing status badge.
        *   `Archive Message` -> Removes from active list.

---

### Tab 4: Newsletter Subscribers
*   **Listing View**: A simple checklist of email addresses, subscription dates, and active flags.
*   **Toolbar Actions**:
    *   *Search*: Email filter.
    *   *Status Toggle*: Button to change a user to "Unsubscribed".
    *   *Export Button*: A primary button labelled `Export to CSV` which compiles active emails for copy-paste or CRM import.

---

## 3. UI/UX Flow Summary

*   **Slide-Out Inspections**: All details and edits happen in `CustomDrawer`. The drawer contains a header with the client's name and status badge, a scrollable form body, and a sticky action footer.
*   **Status Toggles**: Standard switches inside lists and detail drawers allow quick, immediate database updates without reloading pages.
*   **Notifications**: Successful actions (e.g. updating a lead status, archiving, exporting) trigger a `CustomNotification` toast overlay.
