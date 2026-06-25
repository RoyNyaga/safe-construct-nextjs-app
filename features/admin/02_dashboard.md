# Admin Module: Dashboard (Overview & Analytics)

## 1. Overview

The Admin Dashboard (`/admin/dashboard`) is the central landing point of the administrative portal. It provides a real-time, high-level summary of website activity, lead acquisition channels, and content moderation status. It serves to help the admin understand the overall health of the business funnels at a glance and navigate quickly to pending tasks.

---

## 2. Page Layout & UI/UX Structure

The dashboard uses a modern, responsive **grid layout** with four main zones:

### Zone 1: Quick Stats Row (Top)
A horizontal row of four cards showing critical system metrics. Each card features an icon, a summary number with an animated count-up effect, a comparison trend indicator (e.g., "+12% this week"), and a helper tooltip.

*   **Total Catalog Designs**:
    *   *Visuals*: Icon of a blueprint, orange background accent.
    *   *Tooltip*: "Total architectural plans published in the catalog."
*   **Active Design Inquiries**:
    *   *Visuals*: Icon of a house with a checklist, yellow background accent.
    *   *Tooltip*: "Unprocessed conversational design requests awaiting review."
*   **Pending Comment Moderation**:
    *   *Visuals*: Icon of a message bubble, blue background accent.
    *   *Tooltip*: "User comments submitted to the blog awaiting approval."
*   **Unread Contact Leads**:
    *   *Visuals*: Icon of an envelope, red background accent.
    *   *Tooltip*: "New contact form entries that have not been marked as read."

### Zone 2: Conversion & Analytics Charts (Middle Left)
A container housing two visual reports (built using a charting library, styled to match the dark slate/construction orange theme):
*   **Lead Intake Funnel**: A horizontal bar chart demonstrating conversion rates (Visits -> Service Forms -> Custom Design Wizard Starts -> Completed Submissions).
*   **Popularity by Design Origin**: A pie chart showing the percentage of catalog design views categorized by geographical origin (Africa, Europe, America, Canada) to help the admin understand targeting effectiveness.

### Zone 3: Quick Action Center (Middle Right)
A dashboard-specific panel providing instant action shortcuts to common admin tasks. Uses clean, prominent action tiles with micro-animations:
*   `Create New Design` -> Opens the Catalogue Form page.
*   `Write Blog Post` -> Opens the Blog Editor.
*   `Add Team Member` -> Opens the Team Member creation drawer.
*   `Moderate Comments` -> Opens the Comments list.

### Zone 4: Recent Activity Feed (Bottom)
A chronological list of the latest 10 system actions (e.g., *"John Doe submitted a Custom Design Inquiry"*, *"Newsletter signup from jane@example.com"*, *"Admin Sarah published a new blog post"*).
*   Each row has a timestamp, action description, and a quick-view button.
*   Clicking a row in the feed opens the corresponding resource inside a side slide-out drawer (`CustomDrawer`), keeping the admin inside their dashboard workspace.

---

## 3. Interaction & Navigation Flow

*   **No Modals or Drawers for Creation Here**: The dashboard is strictly read-only. Clicking quick actions redirects the user to the respective dedicated pages or opens the creation panels in their corresponding modules.
*   **Details Inspection**: Clicking "View Details" on any metric card or activity feed row opens a `CustomDrawer` on the right side. This drawer presents a read-only inspect view of the object (e.g., the submitted message details) so the admin can review it without breaking their dashboard context.
