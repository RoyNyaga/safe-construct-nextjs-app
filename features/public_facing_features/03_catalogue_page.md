# Feature 03: Catalogue (Listing & Detail Pages)

## 1. Overview

The Catalogue is the primary visual showcase of Safe-Construct's portfolio of **architectural designs**. Every entry represents a design that Safe-Construct has developed. Because every building starts with a plan, the Catalogue serves as the company's strongest lead generation tool — allowing visitors to browse completed designs, be inspired, and then request their own custom version. Catalogue data is **fully database-driven**, enabling the admin to add, update, and remove items without touching the codebase.

**Client Segments Served**:
- Segment 1 — The Design Seeker (primary and sole audience)
- All public visitors (brand impression and trust building)

---

## 2. User Personas & Access Levels

- **Public / Guest Users**: Can browse, view, like, and navigate all catalogue items. No authentication required.
- **Admin**: Creates and manages catalogue items via the Admin Dashboard (specified separately).

---

## 3. User Journey & Workflow

### 3.1 Catalogue Listing Page (`/catalogue`)

1. Visitor navigates to `/catalogue` from the nav bar, home page CTA, or a deep link.
2. The page loads with a header section and a grid of catalogue design cards.
3. Filter and sort controls are visible at the top of the grid.
4. The system detects the user's approximate location (via IP geolocation on the server or browser timezone/locale) to set the default **Design Style Origin** filter (e.g., visitors from Africa see African-style designs first, while visitors from Europe/America/Canada see styles originating from/tailored to their regions).
5. Visitor applies filters (by style, design style origin, bedroom count, surface area range, floor count).
6. Grid updates reactively (client-side filter, no page reload).
7. Visitor clicks a catalogue card → navigated to `/catalogue/[slug]`.
8. At the **bottom of the listing page**, a prominent `Request a Custom Design` button is displayed. Clicking it navigates to `/request-design` (a standalone multi-step conversational form — see [Feature 08](./08_request_architectural_design.md)).

### 3.2 Catalogue Detail Page (`/catalogue/[slug]`)

1. Visitor lands on the detail page for a specific item.
2. The **main image** is displayed prominently at the top (hero-style).
3. A **scrollable image gallery** is shown below — visitors can navigate forward/backward through photos.
4. Each photo in the gallery is displayed alongside its **caption**.
5. Full design specifications are listed (surface area, estimated cost breakdown, style, origin, floors, rooms, etc.).
6. A **Likes** counter is displayed. Clicking the heart icon:
   - Increments the `like_count` column in the DB (anonymous; no user identity stored).
   - Persists via `localStorage` (key: `liked_catalogue_<id>`) to prevent double-liking on the same browser session.
   - Heart icon toggles visual state accordingly.
7. A **Views** counter is incremented automatically when the detail page loads (a Server Action fires on page mount).
8. At the bottom of the detail page, a single CTA is displayed:
   - **`Request This Design`** button → prompts the visitor with a `CustomModal` asking: *"Would you like to request this exact design, or a customised version of it?"*
     - If they confirm: navigates to `/request-design?catalogue=[slug]`. The multi-step request form is pre-populated with this catalogue's specifications. The visitor reviews and adjusts the answers, then submits. A `catalogue_id` link is saved on the resulting `design_request` record.
     - The full form spec is defined in [Feature 08](./08_request_architectural_design.md).
9. A `Back to Catalogue` navigation link is displayed at the top.

---

## 4. UI/UX Requirements

### Catalogue Listing (`/catalogue`)

- **Page header**: Title *"Our Portfolio"*, short subtitle.
- **Filter bar** (sticky or top-aligned):
  - **Design Style Origin dropdown**: Select (All, Africa, Europe, America, Canada) — pre-selected based on user's detected region/IP.
  - Style dropdown: All, Bungalow, Duplex, Villa, Apartment, Commercial (uses `CustomTooltip` explaining each style).
  - Bedrooms: Select (1, 2, 3, 4, 5+).
  - Floors: Select (1, 2, 3+).
  - Surface area: Range slider (min–max sqm).
  - Sort by: Newest, Most Viewed, Most Liked, Lowest Cost, Highest Cost.
  - `Reset Filters` link.
- **Card grid**: 3 columns on desktop, 2 on tablet, 1 on mobile.
- **Catalogue card** displays:
  - Main image (cover, aspect ratio 4:3)
  - Design title
  - **Origin & Style badges** (e.g., "Africa" and "Duplex")
  - Bedrooms / Bathrooms / Floors — icon row
  - Surface area (sqm)
  - 👁 View count | ❤️ Like count
  - `View Details` button
- Cards animate in with staggered fade-up on mount.
- Empty state: Illustrated empty state graphic + *"No designs match your filters."* + `Reset Filters` button.
- **Bottom of listing page**: A full-width CTA strip: *"Don't see what you're looking for? We design from scratch."* + `Request a Custom Design →` button linking to `/request-design`.

### Catalogue Detail (`/catalogue/[slug]`)

- **Hero image**: Full-width, tall aspect ratio with the main image.
- **Gallery component**:
  - Horizontal scrollable strip of thumbnail images below the hero.
  - Clicking a thumbnail updates the main displayed image.
  - Left/right arrow navigation buttons for next/previous.
  - Keyboard navigation support (← → arrow keys).
  - Each image is displayed with its **caption** rendered below or overlaid on the image as a semi-transparent bar.
  - Lightbox mode: Clicking the main image opens it in a fullscreen lightbox (use MUI `Dialog` wrapped as `CustomModal`).
- **Specifications panel**:
  - Style, **Design Style Origin**, Surface Area (sqm), Bedrooms, Bathrooms, Floors, Estimated Total Cost.
  - **Cost breakdown table**: Dynamic list of `catalogue_cost_items` (e.g., Foundation, Elevation, Roofing) with individual costs. Footer row shows the sum, which must match `total_cost` (enforced via a DB trigger).
  - Description (rich text, rendered from stored HTML/markdown).
- **Engagement bar**: 👁 `X views` | ❤️ `Y likes` with interactive like button.
- **Related catalogue items**: 3 cards of other items with the same style/origin, at the bottom.
- Use `CustomTooltip` on cost breakdown items explaining what each phase covers.

---

## 5. Database Requirements

### New Table: `catalogues`

```sql
create type catalogue_style as enum (
    'bungalow', 'duplex', 'villa', 'apartment', 'commercial', 'townhouse', 'other'
);

create type design_style_origin as enum (
    'africa', 'europe', 'america', 'canada'
);

create table public.catalogues (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    slug text not null unique, -- URL-friendly identifier, e.g. 'modern-3-bed-bungalow'
    description text,          -- Rich text / HTML description
    style catalogue_style not null,
    design_style_origin design_style_origin not null,
    size_sqm numeric(10, 2) not null,
    bedrooms integer not null default 0 check (bedrooms >= 0),
    bathrooms integer not null default 0 check (bathrooms >= 0),
    floors integer not null default 1 check (floors >= 1),
    total_cost numeric(14, 2) not null default 0, -- Auto-calculated via trigger
    main_image_url text not null, -- Cover image (Supabase Storage: 'catalogue-media')
    is_featured boolean not null default false, -- Shown on home page preview
    is_published boolean not null default false, -- Draft vs published
    view_count integer not null default 0,
    like_count integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
```

### New Table: `catalogue_images`

```sql
create table public.catalogue_images (
    id uuid default uuid_generate_v4() primary key,
    catalogue_id uuid references public.catalogues(id) on delete cascade not null,
    image_url text not null,   -- Supabase Storage: 'catalogue-media'
    caption text,              -- Descriptive caption displayed with the image
    order_index integer not null default 0, -- Display order
    created_at timestamptz not null default now(),
    unique (catalogue_id, order_index)
);
```

### New Table: `catalogue_cost_items`

```sql
create table public.catalogue_cost_items (
    id uuid default uuid_generate_v4() primary key,
    catalogue_id uuid references public.catalogues(id) on delete cascade not null,
    label text not null,          -- e.g., "Foundation", "Elevation", "Roofing", "Electrical"
    cost numeric(14, 2) not null check (cost >= 0),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
```

### DB Trigger: Auto-update `total_cost` on `catalogues`

```sql
-- Recalculate total_cost whenever a cost item is inserted/updated/deleted
create or replace function public.sync_catalogue_total_cost()
returns trigger as $$
begin
    update public.catalogues
    set total_cost = (
        select coalesce(sum(cost), 0)
        from public.catalogue_cost_items
        where catalogue_id = coalesce(new.catalogue_id, old.catalogue_id)
    )
    where id = coalesce(new.catalogue_id, old.catalogue_id);
    return coalesce(new, old);
end;
$$ language plpgsql;

create trigger trigger_sync_catalogue_total_cost
    after insert or update or delete on public.catalogue_cost_items
    for each row execute procedure public.sync_catalogue_total_cost();
```

### DB Function: Increment View Count (Atomic)

```sql
create or replace function public.increment_catalogue_view(p_catalogue_id uuid)
returns void as $$
begin
    update public.catalogues
    set view_count = view_count + 1
    where id = p_catalogue_id;
end;
$$ language plpgsql security definer;
```

### DB Function: Increment Like Count (Atomic)

```sql
create or replace function public.increment_catalogue_like(p_catalogue_id uuid)
returns void as $$
begin
    update public.catalogues
    set like_count = like_count + 1
    where id = p_catalogue_id;
end;
$$ language plpgsql security definer;
```

### RLS Policies

- **`catalogues`**:
  - Public can select where `is_published = true`.
  - Admin has full access.
- **`catalogue_images`**:
  - Public can select (via join to published catalogue).
  - Admin has full access.
- **`catalogue_cost_items`**:
  - Public can select (via join to published catalogue).
  - Admin has full access.

---

## 6. API & Data Layer

| Operation | Table / Function | Details |
| :--- | :--- | :--- |
| List published catalogues | `catalogues` | `select * from catalogues where is_published = true order by created_at desc` |
| Fetch single catalogue (by slug) | `catalogues` | `select * from catalogues where slug = $slug and is_published = true` |
| Fetch catalogue images | `catalogue_images` | `select * from catalogue_images where catalogue_id = $id order by order_index asc` |
| Fetch cost breakdown | `catalogue_cost_items` | `select * from catalogue_cost_items where catalogue_id = $id` |
| Increment view count | `increment_catalogue_view()` | Called via Server Action on detail page mount |
| Increment like count | `increment_catalogue_like()` | Called via Server Action on like button click |
| Navigate to request form | N/A — client-side navigation | `router.push('/request-design')` or `router.push('/request-design?catalogue=[slug]')` |

- **Rendering**: Listing page uses ISR (`revalidate = 1800`). Detail page uses ISR (`revalidate = 3600`).
- Likes and views are **not** ISR-sensitive; they are incremented via Server Actions with no revalidation.

---

## 7. Validation Rules

No form submissions occur on the catalogue pages themselves. All validation lives in the request design form (see [Feature 08](./08_request_architectural_design.md)).

---

## 8. Edge Cases & Error Handling

- **Catalogue not found**: If slug does not exist or `is_published = false`, return a styled 404 page.
- **No images uploaded**: If `catalogue_images` is empty, display the `main_image_url` as the only image in the gallery.
- **Empty catalogue listing**: Show illustrated empty state.
- **Like already pressed (localStorage check)**: Heart icon remains filled; clicking again does nothing (idempotent UI).
- **View count race condition**: The atomic DB function handles concurrent increments safely.
- **Filter returns zero results**: Show empty state with reset option.

---

## 9. Storage Buckets

| Bucket Name | Access | Purpose |
| :--- | :--- | :--- |
| `catalogue-media` | Public read | All catalogue images (main image + gallery images) |

---

## 10. Open Questions / Decisions Pending

- What currency should costs be displayed in? (e.g., XAF, USD, EUR?)
- Should the slug be auto-generated from the title or entered manually by the admin?
- Should there be a maximum number of gallery images per catalogue item?
- Should `like_count` be decrement-able (un-like), or is it permanently additive? *(Recommendation: permanently additive — simpler and avoids manipulation.)*
- Will there be a "Share" feature (copy link, share to WhatsApp)? *(Recommended addition.)*
