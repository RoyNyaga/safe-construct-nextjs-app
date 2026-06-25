---
alwaysApply: true
---

# Feature Development Workflow & Specification Standards

## Purpose

This document defines the **mandatory process for planning, documenting, and implementing every feature** in the Safe-Construct application. Its goal is to ensure consistency, maintainability, and completeness across the entire codebase — from the database layer to the user interface.

All contributors and AI agents working on this project **must follow this workflow for every feature without exception**.

---

## Core Principle: Specification-First Development

Every feature must be fully specified before a single line of implementation code is written. This means:

1. A dedicated feature specification file must be created.
2. The schema must be reviewed and updated to reflect any new or modified data structures.
3. Implementation begins only after both the spec file and schema are finalized and reviewed.

This approach guarantees that the AI agent, developers, and stakeholders share a single source of truth at every stage of development.

---

## Step-by-Step Feature Development Protocol

### Step 1: Create a Feature Specification File

For each new feature, create a dedicated Markdown file inside the `/features` directory at the root of the project. Use the following naming convention:

```
/features/<feature-number>_<feature-slug>.md
```

**Example**:
```
/features/01_architectural_plan_gallery.md
/features/02_construction_bid_portal.md
/features/03_client_portal_dashboard.md
```

---

### Step 2: Populate the Feature Spec File

Every feature specification file **must** include all of the following sections:

```markdown
# Feature: [Feature Name]

## 1. Overview
A concise description of what this feature does and which client segment(s) it serves.

## 2. User Personas & Access Levels
- Who uses this feature? (Public/Guest, Client, Supervisor, Admin)
- What role(s) from the `user_role` enum are involved?

## 3. User Journey & Workflow
A step-by-step description of the full end-to-end user experience, including:
- Entry point (which page/URL)
- Each action the user takes
- System responses (API calls, validation, DB interactions)
- Success and failure states
- Any redirects or email triggers

## 4. UI/UX Requirements
- Page layout and component breakdown
- Which custom UI wrappers are used (e.g., CustomDrawer, CustomModal, LoadingButton, CustomTooltip)
- Tooltip guidance descriptions for key elements
- Empty states, loading states, and error states

## 5. Database Requirements
- Which existing tables are read from or written to
- Any new tables, columns, or enums required
- Any new RLS policies needed
- Any new database functions or triggers needed

## 6. API & Data Layer
- List of Supabase queries (select, insert, update, delete) needed
- Any Supabase Storage bucket interactions (uploads, reads)
- Any server actions or API routes required

## 7. Validation Rules
- Frontend validation (required fields, formats, constraints)
- Backend/DB-level constraints already enforced in the schema

## 8. Edge Cases & Error Handling
- What happens when a required resource is missing?
- What are the fallback behaviors?

## 9. Open Questions / Decisions Pending
- Any unresolved design or business logic questions before implementation can proceed.
```

---

### Step 3: Update the Master Schema File

Once the feature spec has been reviewed and approved, **update `/schema.sql`** to incorporate any required database changes:

- Add new `CREATE TABLE` statements.
- Add new columns to existing tables (using `ALTER TABLE` if appending to existing schema).
- Add new `ENUM` values or types.
- Add or revise `CREATE INDEX` statements for performance.
- Add or revise `CREATE POLICY` (RLS) statements for security.
- Add or revise `CREATE TRIGGER` or `CREATE FUNCTION` statements for automated behavior.

> **Critical Rule**: The `/schema.sql` file is the **single source of truth** for the entire database structure. It must always be kept up to date and represent the complete, runnable database definition for the application. Do not describe schema changes only in feature files — always reflect them in `/schema.sql`.

---

### Step 4: Implementation

With the feature spec finalized and the schema updated, proceed to implementation in the following order:

1. **Database layer**: Apply schema changes to Supabase.
2. **Data access layer**: Write Supabase query functions or server actions.
3. **UI Components**: Build or reuse custom wrapper components (see [`ui_styles.md`](./ui_styles.md)).
4. **Page assembly**: Compose the page from components, handling loading, error, and empty states.
5. **Testing**: Verify all user flows described in the spec are working correctly.

---

## Schema Governance Rules

To maintain schema integrity throughout the project lifecycle:

| Rule | Description |
| :--- | :--- |
| **Single Source of Truth** | `/schema.sql` is always complete and runnable. No partial schema should exist anywhere else. |
| **Additive Changes Only** | Never silently remove or rename a column. Use comments or migration notes within the file if a column is deprecated. |
| **RLS on Every Table** | Every new table must have Row Level Security enabled and at least one policy defined. |
| **Consistent Naming** | Tables: `snake_case` plural nouns. Columns: `snake_case`. Foreign keys: `referenced_table_singular_id` (e.g., `project_id`, `client_id`). |
| **Enum Before Table** | Always declare `CREATE TYPE` enums before the tables that reference them. |
| **Index Foreign Keys** | Every foreign key column must have a corresponding `CREATE INDEX`. |
| **Trigger for Timestamps** | Every table must use the `handle_updated_at()` trigger for the `updated_at` column. |

---

## Reference Files

Always consult these files throughout the development process:

| File | Purpose |
| :--- | :--- |
| [`/schema.sql`](../schema.sql) | The master database schema. Update after every feature spec. |
| [`/rules/ui_styles.md`](./ui_styles.md) | UI component selection rules, tech stack decisions, and component abstraction guidelines. |
| [`/rules/feature_development_workflow.md`](./feature_development_workflow.md) | This document. The process to follow for every feature. |
| [`/README.md`](../README.md) | General project overview, objectives, and client segments. |
| [`/spec_for_bass44.md`](../spec_for_bass44.md) | High-level implementation instructions and database relationship diagram. |
| [`/features/*.md`](../features/) | Individual feature specification files, one per feature. |
