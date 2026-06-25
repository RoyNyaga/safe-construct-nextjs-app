# Feature 05: Blog Listing Page

## 1. Overview

The Blog Listing Page is the public hub for all Safe-Construct editorial content. It serves as an SEO-optimized content channel for attracting organic traffic and establishing the company as a thought leader in construction, architecture, and real estate. Visitors can browse, filter, and discover articles — with engagement features (views, likes, comments) that foster community and return visits.

**Client Segments Served**: All public visitors. Blogs are a passive lead-generation and brand-authority tool.

---

## 2. User Personas & Access Levels

- **Public / Guest Users**: Can read all published blog posts, like posts, view posts, and submit comments (as a guest, no auth required).
- **Admin**: Creates and manages blog content via the Admin Dashboard (specified separately).
- **Newsletter Subscribers**: Captured via a subscribe prompt on the listing page.

---

## 3. User Journey & Workflow

1. Visitor navigates to `/blog` from the nav bar or a footer link.
2. The page loads with a featured/hero blog post at the top (the most recent or manually pinned article).
3. Below the hero, a **grid of blog cards** is displayed, with the most recent posts first.
4. A **tag filter bar** allows filtering by topic tag (e.g., Architecture, Construction Tips, Project Stories).
5. A **search bar** allows keyword search across blog titles and excerpts.
6. Pagination or infinite scroll loads more posts as the user reaches the bottom.
7. Clicking a blog card navigates to `/blog/[slug]` (the Blog Show page — Feature 06).
8. A **Newsletter Subscribe banner** is embedded mid-page to capture emails.

---

## 4. Page Sections & UI/UX Requirements

### Section 1: Page Header
- Short page title: *"Insights & Stories"* or *"The Safe-Construct Blog"*.
- Short subtitle: 1 sentence describing the content (e.g., *"Construction insights, architectural inspiration, and project updates."*).

### Section 2: Featured / Hero Post
- The **latest published post** (or one manually flagged `is_pinned = true`) is displayed in a full-width banner card:
  - Header photo (wide crop)
  - Title
  - Excerpt (first ~150 characters of the post)
  - Author name and avatar
  - Published date
  - Tags (up to 3)
  - Estimated read time
  - `Read Article` button
- This section is skipped if no posts exist.

### Section 3: Filter & Search Bar
- **Tag filter pills**: Horizontally scrollable row of topic tags. Clicking a tag filters the grid. Active tag is visually highlighted.
- **Search input**: Debounced text search across post titles. Uses `CustomTooltip` with hint: *"Search by title or topic"*.
- **Sort**: Dropdown — Newest, Most Viewed, Most Liked.
- All filters operate client-side over already-loaded data (if dataset is small) or trigger a new server-side fetch (if paginated).

### Section 4: Blog Card Grid
- **Grid layout**: 3 columns (desktop), 2 (tablet), 1 (mobile).
- **Blog card** contains:
  - Header photo (aspect ratio 16:9, object-cover)
  - Tag pills (up to 2 visible)
  - Title (H3, max 2 lines, truncated)
  - Excerpt (max 3 lines, truncated)
  - Author avatar + name
  - Published date
  - 🕐 Read time (e.g., *"5 min read"*)
  - 👁 View count | ❤️ Like count | 💬 Comment count
  - `Read More` button / the entire card is clickable
- Cards animate in with a stagger on mount (Framer Motion).

### Section 5: Newsletter Subscribe Banner (Mid-page)
- Inserted after the 6th post card (or at the bottom of the first page of results).
- Design: A visually distinct, colored strip — not a modal.
- Contains: Short headline, email input, `Subscribe` button (`LoadingButton`).
- On success: `CustomNotification` (success variant).
- Inserts into `newsletter_subscribers` table (same as the home page action).

### Section 6: Pagination / Load More
- If total posts > 9: Show a `Load More` button or paginate with page numbers.
- Loading state: `MUI Skeleton` cards placeholder while fetching next page.

---

## 5. Database Requirements

### New Table: `blogs`

```sql
create type blog_status as enum ('draft', 'published', 'archived');

create table public.blogs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    slug text not null unique,          -- URL-friendly identifier
    excerpt text,                        -- Short summary for listing cards (~150 chars)
    body text not null,                  -- Rich text / HTML from the text editor (e.g. TipTap)
    header_photo_url text,               -- Main header image (Supabase Storage: 'blog-media')
    author_id uuid references public.profiles(id) on delete set null,
    status blog_status not null default 'draft',
    is_pinned boolean not null default false, -- Pin as featured post on listing page
    read_time_minutes integer,           -- Auto-calculated or manually set by admin
    view_count integer not null default 0,
    like_count integer not null default 0,
    comment_count integer not null default 0, -- Denormalized for fast listing queries; kept in sync via trigger
    published_at timestamptz,            -- Set when status changes to 'published'
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
```

### New Table: `blog_tags`

```sql
create table public.blog_tags (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,   -- e.g., 'Architecture', 'Construction Tips', 'Project Stories'
    slug text not null unique,   -- e.g., 'architecture', 'construction-tips'
    created_at timestamptz not null default now()
);
```

### New Junction Table: `blog_tag_assignments`

```sql
create table public.blog_tag_assignments (
    blog_id uuid references public.blogs(id) on delete cascade not null,
    tag_id uuid references public.blog_tags(id) on delete cascade not null,
    primary key (blog_id, tag_id)
);
```

### New Table: `blog_comments`

```sql
create table public.blog_comments (
    id uuid default uuid_generate_v4() primary key,
    blog_id uuid references public.blogs(id) on delete cascade not null,
    author_name text not null,                -- Guest name (no auth required)
    author_email text,                        -- Optional; not displayed publicly
    body text not null check (char_length(body) >= 5),
    is_approved boolean not null default false, -- Admin moderation; only approved comments are displayed
    parent_comment_id uuid references public.blog_comments(id) on delete cascade, -- Threaded replies
    created_at timestamptz not null default now()
);
```

### DB Trigger: Sync `comment_count` on `blogs`

```sql
create or replace function public.sync_blog_comment_count()
returns trigger as $$
begin
    update public.blogs
    set comment_count = (
        select count(*) from public.blog_comments
        where blog_id = coalesce(new.blog_id, old.blog_id)
          and is_approved = true
    )
    where id = coalesce(new.blog_id, old.blog_id);
    return coalesce(new, old);
end;
$$ language plpgsql;

create trigger trigger_sync_blog_comment_count
    after insert or update or delete on public.blog_comments
    for each row execute procedure public.sync_blog_comment_count();
```

### DB Function: Increment Blog View Count (Atomic)

```sql
create or replace function public.increment_blog_view(p_blog_id uuid)
returns void as $$
begin
    update public.blogs set view_count = view_count + 1 where id = p_blog_id;
end;
$$ language plpgsql security definer;
```

### DB Function: Increment Blog Like Count (Atomic)

```sql
create or replace function public.increment_blog_like(p_blog_id uuid)
returns void as $$
begin
    update public.blogs set like_count = like_count + 1 where id = p_blog_id;
end;
$$ language plpgsql security definer;
```

### RLS Policies

**`blogs`**:
- Public can select where `status = 'published'`.
- Admin has full access.

**`blog_tags`** and **`blog_tag_assignments`**:
- Public can select all.
- Admin has full access.

**`blog_comments`**:
- Public can select where `is_approved = true`.
- Anyone can insert a comment (guest submission; pending admin approval).
- Admin has full access (approve, delete).

---

## 6. API & Data Layer

| Operation | Table / Function | Details |
| :--- | :--- | :--- |
| List published blogs | `blogs` + `blog_tag_assignments` + `blog_tags` | `select ... where status = 'published' order by published_at desc` |
| Fetch all tags | `blog_tags` | `select * from blog_tags order by name asc` |
| Filter blogs by tag | `blog_tag_assignments` | Join to filter |
| Subscribe to newsletter | `newsletter_subscribers` | Shared with home page |

- **Rendering**: ISR with `revalidate = 600` (10 minutes).
- Tag filtering is client-side if total posts ≤ 50; otherwise paginated server-side.

---

## 7. Validation Rules

| Field | Rule |
| :--- | :--- |
| Newsletter email | Required, valid email format |

---

## 8. Edge Cases & Error Handling

- **No published posts**: Show illustrated empty state: *"We're working on our first article. Check back soon!"*
- **Tag filter returns zero results**: Show empty state with `Reset Filters` link.
- **Search returns zero results**: Show friendly empty state.
- **Newsletter already subscribed**: Show `CustomNotification` info variant: *"You're already subscribed!"*

---

## 9. Storage Buckets

| Bucket Name | Access | Purpose |
| :--- | :--- | :--- |
| `blog-media` | Public read | Blog header photos and inline images |

---

## 10. Open Questions / Decisions Pending

- What initial tags/categories should be pre-seeded in `blog_tags`?
- Should comments require admin approval before display, or should they be live immediately? *(Recommendation: Require approval to prevent spam.)*
- Should guest commenters verify their email before the comment appears? *(Recommendation: No — lower friction.)*
- Will the blog support threaded comments (replies to comments) in v1, or is a flat comment list sufficient?
