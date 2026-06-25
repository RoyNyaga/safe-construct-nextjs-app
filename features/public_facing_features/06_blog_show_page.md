# Feature 06: Blog Show Page (Article Detail)

## 1. Overview

The Blog Show Page renders the full content of a single blog article. It provides an immersive reading experience with rich media support, social sharing, engagement features (likes, comments), and a prominent newsletter subscription prompt. The page is designed to convert engaged readers into newsletter subscribers and, ultimately, into prospective clients.

**Client Segments Served**: All public visitors. This page is SEO-critical — each blog post should function as an independently indexable, shareable web page.

---

## 2. User Personas & Access Levels

- **Public / Guest Users**: Can read, like, and comment on blog posts. No authentication required.
- **Newsletter Subscribers**: Captured via the subscribe CTA on this page.

---

## 3. User Journey & Workflow

1. Visitor arrives at `/blog/[slug]` from:
   - The blog listing page card click.
   - A direct link shared on social media or WhatsApp.
   - A search engine result.
2. The page loads the full blog article.
3. On page mount, the view counter is incremented via a Server Action (`increment_blog_view`).
4. The visitor reads the article.
5. The visitor can:
   - **Like the post**: Click the heart/like button → increments `like_count`. Persisted via `localStorage` (key: `liked_blog_<id>`) to prevent duplicate likes in the same session.
   - **Share the post**: Click share buttons (copy link, WhatsApp, LinkedIn, Twitter/X).
   - **Subscribe to newsletter**: Clicks the subscribe CTA embedded at the mid-point or bottom of the article.
   - **Leave a comment**: Fills in the comment form and submits. Comment goes into `blog_comments` with `is_approved = false`. A success message confirms submission and notes it is pending review.
6. A **Related Posts** section at the bottom shows 3 posts sharing at least one common tag.
7. Navigation to the next/previous article is available.

---

## 4. Page Sections & UI/UX Requirements

### Section 1: Article Header
- **Full-width header image** (16:9 or cinematic ratio) — the `header_photo_url`.
- **Breadcrumb**: `Home > Blog > [Article Title]`
- **H1**: Article title — large, bold.
- **Meta info row**:
  - Author avatar + name
  - Published date (formatted: "June 12, 2025")
  - 🕐 Estimated read time (e.g., *"6 min read"*)
  - 👁 View count
  - ❤️ Like count (interactive)
- **Tag pills**: Clickable — navigates to `/blog?tag=[tag-slug]`.

### Section 2: Article Body
- Rendered HTML from the `body` field (written with a rich text editor — e.g., TipTap, Quill, or Lexical).
- The body must support:
  - Headings (H2, H3, H4)
  - Bold, italic, underline, strikethrough
  - Ordered and unordered lists
  - Blockquotes
  - Code blocks (inline and fenced)
  - Embedded images with captions
  - Horizontal rules
  - Hyperlinks
- Typography styling: Clean reading typography (large line-height, comfortable font size, max-width content column ~70ch).
- A **floating sticky sidebar** on desktop (right side):
  - Table of contents (auto-generated from H2/H3 headings in the body).
  - Social share icons.
  - Like button (repeated for easy access).

### Section 3: Newsletter Subscribe CTA (Mid-Article)
- Injected **after approximately 60% of the article body** (or after a specific placeholder marker in the content).
- Design: A visually distinct card/banner that breaks the reading flow intentionally but subtly.
- Contains:
  - Icon + heading: *"Enjoyed this article? Get more in your inbox."*
  - Short description: *"Join our newsletter for construction insights, project updates, and architectural inspiration."*
  - Email input + `Subscribe` `LoadingButton`.
- On success: `CustomNotification` (success variant). Input cleared.
- On duplicate: `CustomNotification` (info variant): *"You're already subscribed!"*

### Section 4: Engagement Bar (Bottom of Article)
- Full-width bar after the article ends:
  - ❤️ `Like this article` — interactive like button with count.
  - Share row: WhatsApp share link, Copy Link button, LinkedIn, Twitter/X.
  - Use `CustomTooltip` on each share button explaining the platform.

### Section 5: Comments Section
- **Heading**: *"Discussion (X comments)"* where X = `comment_count`.
- **Approved comments list**:
  - Each comment shows: Author name, posted date, comment body.
  - Threaded replies rendered indented under parent comments (if `parent_comment_id` is set).
  - If no comments yet: *"Be the first to leave a comment."*
- **Comment form** (always visible below the comment list):
  - Fields:
    - **Name** (required, text)
    - **Email** (optional, not displayed publicly — only used by admin for moderation context)
    - **Comment** (required, textarea, min 5 characters)
    - **Reply to** (auto-populated when replying to a specific comment; hidden field)
  - `Post Comment` `LoadingButton`.
  - On success: `CustomNotification` (info variant): *"Your comment has been submitted and is pending review."*
  - Comment immediately appears in a "Pending" state in the UI (dimmed or with a badge) for the commenter's current session to confirm it was received.

### Section 6: Related Posts
- **Heading**: *"You might also enjoy"*
- 3 blog cards sharing at least one common tag with the current post.
- Same card design as the listing page.
- If no related posts found, this section is hidden.

### Section 7: Post Navigation
- **Previous / Next article** links at the bottom.
- Shows the title of the adjacent post.

---

## 5. Database Requirements

All required tables are defined in **Feature 05 (Blog Listing Page)**:
- `blogs`
- `blog_tags` / `blog_tag_assignments`
- `blog_comments`
- `newsletter_subscribers` (shared with home page and listing page)
- DB functions: `increment_blog_view`, `increment_blog_like`
- DB trigger: `sync_blog_comment_count`

**No additional tables are required for the Blog Show page.**

### Additional Notes on `blog_comments`
- The `parent_comment_id` field enables threaded comment replies (one level deep in v1).
- `is_approved` defaults to `false`. Admin approves comments via the Admin Dashboard.
- The comment author's email is stored but never rendered on the page — it is for admin moderation context only.

---

## 6. API & Data Layer

| Operation | Table / Function | Details |
| :--- | :--- | :--- |
| Fetch single blog post | `blogs` | `select * from blogs where slug = $slug and status = 'published'` |
| Fetch blog tags | `blog_tag_assignments` → `blog_tags` | Join to get tag list for the post |
| Increment view count | `increment_blog_view()` | Server Action, called on page mount |
| Increment like count | `increment_blog_like()` | Server Action, called on like button click |
| Fetch approved comments | `blog_comments` | `select * from blog_comments where blog_id = $id and is_approved = true order by created_at asc` |
| Submit comment | `blog_comments` | Insert new comment with `is_approved = false` |
| Fetch related posts | `blogs` + `blog_tag_assignments` | Find posts sharing at least one tag, exclude current post, limit 3 |
| Subscribe to newsletter | `newsletter_subscribers` | Shared Server Action |

- **Rendering**: ISR with `revalidate = 1800` (30 minutes). Dynamic data (likes, comments) is handled client-side via Server Actions.

---

## 7. SEO Requirements

This page is SEO-critical. The following must be implemented:

- **`<title>`**: `[Blog Post Title] | Safe-Construct Blog`
- **`<meta name="description">`**: The `excerpt` field of the blog post.
- **Open Graph tags**:
  - `og:title`, `og:description`, `og:image` (= `header_photo_url`), `og:type = article`
- **Twitter Card tags**: `twitter:card = summary_large_image`
- **Structured data (JSON-LD)**: `Article` schema with author, published date, and image.
- **Canonical URL**: Each slug maps to a canonical URL.

---

## 8. Validation Rules

### Comment Form

| Field | Rule |
| :--- | :--- |
| Name | Required, min 2 characters |
| Email | Optional; if provided, must be a valid email format |
| Comment body | Required, min 5 characters |

### Newsletter Form

| Field | Rule |
| :--- | :--- |
| Email | Required, valid email format |

---

## 9. Edge Cases & Error Handling

- **Post not found or unpublished**: Return a styled 404 page.
- **Body is empty**: Display a placeholder *"Content coming soon."* message.
- **No approved comments**: Show *"Be the first to start the discussion."*
- **No related posts**: Hide the related posts section entirely.
- **Like already pressed (localStorage check)**: Heart icon is filled; clicking again does nothing.
- **Comment submission fails**: `CustomNotification` error variant with retry suggestion.

---

## 10. Animation Notes

- **Article body**: Fade-in on mount.
- **Like button**: A pulse/bounce animation on click (Framer Motion `whileTap`).
- **Comments**: Each approved comment fades in when the section enters the viewport.
- **Table of contents**: Highlights the current section header as the user scrolls (intersection observer).

---

## 11. Open Questions / Decisions Pending

- Which rich text editor will be used for writing blog posts in the Admin Dashboard? *(Recommendation: TipTap — React-native, extensible, and produces clean HTML.)*
- Should comments support Markdown formatting, or plain text only? *(Recommendation: Plain text in v1.)*
- Should the social share buttons include a native mobile share API (`navigator.share`)? *(Recommendation: Yes — detect and use native share on mobile devices.)*
- What is the policy for comment moderation speed? Should the admin receive an email notification when a new comment is submitted?
- Should the article reading progress be shown as a progress bar at the top of the viewport (sticky progress indicator)?
