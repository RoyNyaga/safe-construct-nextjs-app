# Admin Module: Blog & Comments Moderation

## 1. Overview

The Blog & Comments module (`/admin/blogs`) allows administrators to create and schedule editorial content, configure tags, and moderate reader comments before they appear on the public website.

---

## 2. Listing Page: Article Management

*   **Layout**: Tabbed view separating **Articles** from **Comment Moderation**.
*   **Articles Grid**: A list containing:
    *   *Header Preview*: Small crop of the cover photo.
    *   *Title & Slug*: Text fields.
    *   *Author*: Author's name.
    *   *Status*: Badges for `Draft` (Yellow), `Published` (Green), or `Archived` (Gray).
    *   *Metrics*: Columns for Views, Likes, and Approved Comments.
    *   *Published Date*: Formatted timestamp.
    *   *Quick Actions*: Pin toggle (pin to top of listing page), Edit button, Delete button.

---

## 3. Create / Edit Flow: The Dedicated Page

Like Catalogues, creating blog posts involves complex rich text entry, and is managed on a **Dedicated Page** (`/admin/blogs/new` or `/admin/blogs/[id]/edit`).

### The Writing Canvas Layout
A wide text editor canvas simulating the width of the public article view:
*   **Title Input**: Large borderless text field at the top (*"Enter Article Title..."*).
*   **Header Image Selector**: Drag-and-drop banner section to upload the main article graphic.
*   **Rich Text Editor Container**: Integrates a WYSIWYG editor supporting:
    *   Headers (H2, H3), lists, blockquotes, bold/italic, and inline links.
    *   Image insertion (uploads directly to Supabase storage `blog-media` and embeds).
*   **Sidebar Properties Panel (Sticky Right)**:
    *   *Status Selection*: Dropdown (Draft, Published, Archived).
    *   *Excerpt*: A short text area (~150 characters max) for list cards.
    *   *Read Time*: Optional number field (minutes). If left blank, it calculates automatically based on word count.
    *   *Tag Selector*: Multi-select chips list. Clicking `+ Manage Tags` opens a side drawer (`CustomDrawer`) to add or remove tags globally without leaving the blog editor.
*   **Sticky Actions**: `Save Draft`, `Publish Post`, and `Cancel` with dirty-form guards.

---

## 4. Tag Management Drawer

*   **Trigger**: A "Manage Tags" button in the blog list toolbar or the writing properties panel.
*   **UI Component**: A `CustomDrawer` sliding out from the right.
*   **Features**:
    *   *Add Tag Section*: A text field (Tag Name) + `Add` button. It automatically slugs the tag (e.g. "Architecture Tips" -> "architecture-tips") and inserts it into the database.
    *   *List of Existing Tags*: A list of all tags, each showing name, slug, and a delete icon.
    *   *Safe Deletion*: Deleting a tag uses `DeletePromptButton` and checks if any articles are currently assigned to it, warning the admin.

---

## 5. Comment Moderation Panel

Moderating comments is a key task to protect the site from spam. This panel lives in the second main tab of the blog dashboard.

*   **Filter States**: Tabs separating comments into `Pending` (Default), `Approved`, and `Spam/Deleted`.
*   **Comment Cards**: Each card displays:
    *   *Sender Info*: Author Name, optional Email, and date/time of submission.
    *   *Article Link*: The title of the blog post the comment was left on.
    *   *Content*: The raw text body of the comment.
    *   *Context*: If it is a reply to another comment, shows the parent author's name.
*   **Quick Moderation Actions**:
    *   `Approve` (Green button): Sets `is_approved = true` in the DB. Automatically increments the blog's `comment_count` trigger and notifies the client via custom notification.
    *   `Mark Spam / Delete` (Red button): Triggers `DeletePromptButton` to delete the row or mark it as spam.
*   **Dynamic UI Flow**: Moderating a comment uses smooth fade-out animations (`Framer Motion` layout transition) as the card removes itself from the "Pending" list, updating the tab counters immediately.
