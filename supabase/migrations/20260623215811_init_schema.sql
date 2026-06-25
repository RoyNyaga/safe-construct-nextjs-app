-- =========================================================================
-- SAFE-CONSTRUCT DATABASE SCHEMA
-- Purpose: Complete database structure for Next.js & Supabase Web Application
-- Database: PostgreSQL (Supabase Compatible)
-- Features: Enums, Foreign Key Relationships, Automatic Profile Creation,
--           Updated_at triggers, Atomic Counter Functions, Auto-Calculation
--           Triggers, and Row Level Security (RLS) policies.
--
-- Coverage:
--   [CORE]    Profiles, Projects, Milestones, Site Updates, Documents, Payments
--   [PUBLIC]  Catalogues, Catalogue Images, Catalogue Cost Items
--   [PUBLIC]  Blogs, Blog Tags, Blog Comments, Newsletter Subscribers
--   [PUBLIC]  Contact Messages, Service Requests
--   [PUBLIC]  Team Members
--   [DESIGN]  Request Designs (Architectural Design Inquiry Form)
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =========================================================================
-- 1. ENUMS AND CUSTOM TYPES
-- =========================================================================

-- User Roles
create type user_role as enum ('admin', 'client');

-- Service Request Type (Leads/Prospect Entries)
create type request_type as enum ('custom_design', 'construction_bid', 'supervision_qa', 'cost_estimate');

-- Service Request Status
create type request_status as enum ('pending', 'under_review', 'proposal_sent', 'accepted', 'declined');

-- Catalogue Style (Design/Build type of the project)
create type catalogue_style as enum ('bungalow', 'duplex', 'villa', 'apartment', 'commercial', 'townhouse', 'other');

-- Design Style Origin (Geographical region design originates from/targets)
create type design_style_origin as enum ('africa', 'europe', 'america', 'canada');

-- Blog Publication Status
create type blog_status as enum ('draft', 'published', 'archived');

-- Contact Message Preferred Communication Method
create type preferred_contact_method as enum ('whatsapp', 'email');

-- Request Design Status (simplified)
create type request_design_status as enum (
    'submitted',
    'meeting_attended',
    'client_declined',
    'project_created'
);


-- =========================================================================
-- 2. TABLES
-- =========================================================================

-- A. PROFILES (Linked to Supabase Auth.users)
-- NOTE: Auth is phone-based (phone + password). No phone OTP or email confirmation required.
--       Users gain immediate access upon registration. Email is optional at registration.
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique,                  -- Nullable: phone is the primary auth identifier
    first_name text,
    last_name text,
    full_name text,
    title text,                         -- Job title or salutation (Mr/Ms/Dr/Architect)
    role user_role not null default 'client',
    phone text,
    phone_country_code text,            -- e.g., '+237' for Cameroon
    country text,                       -- Country of residence
    avatar_url text,
    temp_default_password text,         -- Temp password visible until updated by user
    password_updated_at timestamptz,    -- Null until user changes password
    preferred_locale text not null default 'en',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- A2. ADMIN PERMISSIONS (Granular admin dashboard permissions mapping)
create table public.admin_permissions (
    id uuid default uuid_generate_v4() primary key,
    admin_id uuid references public.profiles(id) on delete cascade not null,
    permission_key text not null,
    created_at timestamptz not null default now(),
    unique (admin_id, permission_key)
);




-- G. SERVICE REQUESTS (Lead generation submissions)
create table public.service_requests (
    id uuid default uuid_generate_v4() primary key,
    type request_type not null,
    status request_status not null default 'pending',
    full_name text not null,
    email text not null,
    phone text,
    -- JSONB to support dynamic data depending on the entry points:
    -- - custom_design: { size_sqm, style, bedrooms, details }
    -- - construction_bid: { blueprint_url, budget_range, timeline_months, details }
    -- - supervision_qa: { site_address, contractor_name, scope }
    -- - cost_estimate: { estimator_input_style, estimator_input_rooms, calculated_cost }
    details jsonb not null default '{}'::jsonb,
    locale text not null default 'en',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =========================================================================
-- PUBLIC-FACING FEATURE TABLES
-- =========================================================================

-- I. CATALOGUES (Portfolio of Architectural Designs & Completed Projects)
create table public.catalogues (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    title_fr text,                     -- French title translation
    slug text not null unique,         -- URL-friendly identifier, e.g. 'modern-3-bed-bungalow'
    description text,                  -- Rich text / HTML description
    description_fr text,               -- French description translation
    style catalogue_style not null,
    design_style_origin design_style_origin not null,
    size_sqm numeric(10, 2) not null,
    bedrooms integer not null default 0 check (bedrooms >= 0),
    bathrooms integer not null default 0 check (bathrooms >= 0),
    floors integer not null default 1 check (floors >= 1),
    total_cost numeric(14, 2) not null default 0, -- Auto-calculated via trigger from catalogue_cost_items
    currency text not null default 'XAF',  -- Display currency for cost values (e.g., 'XAF', 'USD', 'EUR')
    main_image_url text not null,      -- Cover image URL (Supabase Storage: 'catalogue-media')
    is_featured boolean not null default false, -- Shown on home page preview grid
    is_published boolean not null default false, -- Draft vs published visibility control
    view_count integer not null default 0,
    like_count integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- J. CATALOGUE IMAGES (Gallery photos per catalogue item, each with a caption)
create table public.catalogue_images (
    id uuid default uuid_generate_v4() primary key,
    catalogue_id uuid references public.catalogues(id) on delete cascade not null,
    image_url text not null,           -- Supabase Storage: 'catalogue-media'
    caption text,                      -- Descriptive caption displayed alongside the image
    order_index integer not null default 0, -- Controls display order in the gallery
    created_at timestamptz not null default now(),
    unique (catalogue_id, order_index)
);

-- K. CATALOGUE COST ITEMS (Customizable cost breakdown per catalogue item)
create table public.catalogue_cost_items (
    id uuid default uuid_generate_v4() primary key,
    catalogue_id uuid references public.catalogues(id) on delete cascade not null,
    label text not null,               -- e.g., "Foundation", "Elevation", "Roofing", "Electrical"
    label_fr text,                     -- French label translation
    cost numeric(14, 2) not null check (cost >= 0),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- L. BLOGS (Articles written by admin using a rich text editor)
create table public.blogs (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    title_fr text,                     -- French title translation
    slug text not null unique,          -- URL-friendly identifier
    excerpt text,                        -- Short summary for listing cards (~150 chars)
    excerpt_fr text,                   -- French excerpt translation
    body text not null,                  -- Rich HTML content from the text editor (e.g. TipTap)
    body_fr text,                      -- French body translation
    header_photo_url text,               -- Main header image (Supabase Storage: 'blog-media')
    author_id uuid references public.profiles(id) on delete set null,
    status blog_status not null default 'draft',
    is_pinned boolean not null default false,   -- Pin as featured post on listing page
    read_time_minutes integer,           -- Estimated reading time (manually set or auto-calculated)
    view_count integer not null default 0,
    like_count integer not null default 0,
    comment_count integer not null default 0,   -- Denormalized; kept in sync via trigger
    published_at timestamptz,            -- Timestamp set when status changes to 'published'
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- M. BLOG TAGS (Topic taxonomy for categorizing blog posts)
create table public.blog_tags (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,           -- e.g., 'Architecture', 'Construction Tips'
    name_fr text unique,                 -- French name translation
    slug text not null unique,           -- e.g., 'architecture', 'construction-tips'
    created_at timestamptz not null default now()
);

-- N. BLOG TAG ASSIGNMENTS (Many-to-many junction: blogs <-> blog_tags)
create table public.blog_tag_assignments (
    blog_id uuid references public.blogs(id) on delete cascade not null,
    tag_id uuid references public.blog_tags(id) on delete cascade not null,
    primary key (blog_id, tag_id)
);

-- O. BLOG COMMENTS (Guest comment submissions, displayed immediately)
create table public.blog_comments (
    id uuid default uuid_generate_v4() primary key,
    blog_id uuid references public.blogs(id) on delete cascade not null,
    author_name text not null,                    -- Guest display name (no auth required)
    author_email text,                            -- Optional; not shown publicly; for admin context only
    body text not null check (char_length(body) >= 5),
    is_approved boolean not null default true,    -- Comments appear immediately; admin can hide by setting to false
    parent_comment_id uuid references public.blog_comments(id) on delete cascade, -- Threaded replies (one level)
    created_at timestamptz not null default now()
);

-- P. CONTACT MESSAGES (Direct contact form submissions from the public)
create table public.contact_messages (
    id uuid default uuid_generate_v4() primary key,
    full_name text not null,
    email text not null,
    whatsapp_phone text not null,
    subject text not null,
    message text not null check (char_length(message) >= 20),
    preferred_contact preferred_contact_method not null,
    locale text not null default 'en',
    is_read boolean not null default false,       -- Admin marks as read
    is_replied boolean not null default false,    -- Admin marks as replied
    created_at timestamptz not null default now()
);

-- Q. NEWSLETTER SUBSCRIBERS (Email captures from home page, blog, and other CTAs)
create table public.newsletter_subscribers (
    id uuid default uuid_generate_v4() primary key,
    email text not null unique,
    subscribed_at timestamptz not null default now(),
    is_active boolean not null default true       -- Soft unsubscribe flag
);

-- R. TEAM MEMBERS (About page — managed by admin, displayed publicly)
-- Storage bucket: 'team-photos' (public read)
create table public.team_members (
    id uuid default uuid_generate_v4() primary key,
    full_name text not null,
    title text not null,              -- e.g., "Founder & CEO", "Head of Architecture"
    title_fr text,                    -- French title/role translation
    phone text,                       -- Displayed as a click-to-call link on the About page card
    photo_url text,                   -- Supabase Storage: 'team-photos' bucket; null triggers initials avatar
    order_index integer not null default 0, -- Controls display order on the About page
    is_visible boolean not null default true, -- Admin can hide without deleting
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- =========================================================================
-- REQUEST DESIGN FEATURE TABLES
-- =========================================================================

-- S. REQUEST DESIGNS (Multi-step conversational architectural design inquiry form)
-- Submitted by the public. Reviewed by admin. Converted to a Project on acceptance.
create table public.request_designs (
    id uuid default uuid_generate_v4() primary key,

    -- Optional link: set when request originates from a catalogue detail page (Flow B)
    catalogue_id uuid references public.catalogues(id) on delete set null,

    -- Step 1: Project Location
    build_country text,
    has_land boolean,
    has_site_plan boolean,

    -- Step 2: Building Style
    style catalogue_style,
    floors integer check (floors is null or floors >= 1),

    -- Step 3: Room Layout
    bedrooms integer check (bedrooms is null or bedrooms >= 0),
    bathrooms integer check (bathrooms is null or bathrooms >= 0),
    has_car_park boolean,
    has_garden boolean,
    has_fence boolean,

    -- Step 4: Special Features
    has_swimming_pool boolean,
    has_solar_provision boolean,
    has_borehole_provision boolean,
    has_servant_quarters boolean,
    size_sqm numeric(10, 2),

    -- Step 5: Requested Documents (JSONB array of string keys)
    -- Possible values: 'distribution_plan', '3d_rendering', 'structural_plan',
    --   'plumbing_plan', 'electrification_plan', 'boq_estimate',
    --   'site_plan', 'interior_design_layout', 'hvac_plan'
    requested_documents jsonb not null default '[]'::jsonb,

    -- Step 6: Additional Notes
    additional_notes text,

    -- Step 7: Meeting Scheduling
    meeting_date date,
    meeting_time time without time zone,
    meeting_timezone text,

    -- Step 7: Client Contact Information (mandatory fields collected on final submission)
    full_name text not null,
    phone_country_code text not null,
    whatsapp_phone text not null,
    email text,                          -- Optional; required only if preferred_contact = 'email'
    preferred_contact preferred_contact_method not null,
    locale text not null default 'en',

    -- Admin notes (internal only, not visible to the client)
    admin_notes text,

    -- Status Lifecycle
    status request_design_status not null default 'submitted',

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);



-- =========================================================================
-- 3. INDEXES FOR PERFORMANCE
-- =========================================================================
create index idx_profiles_role on public.profiles(role);
create index idx_admin_permissions_admin on public.admin_permissions(admin_id);
create index idx_service_requests_status on public.service_requests(status);
-- Catalogue indexes
create index idx_catalogues_style on public.catalogues(style);
create index idx_catalogues_is_published on public.catalogues(is_published);
create index idx_catalogues_is_featured on public.catalogues(is_featured);
create index idx_catalogues_slug on public.catalogues(slug);
create index idx_catalogue_images_catalogue on public.catalogue_images(catalogue_id);
create index idx_catalogue_cost_items_catalogue on public.catalogue_cost_items(catalogue_id);
-- Blog indexes
create index idx_blogs_status on public.blogs(status);
create index idx_blogs_slug on public.blogs(slug);
create index idx_blogs_author on public.blogs(author_id);
create index idx_blogs_published_at on public.blogs(published_at desc);
create index idx_blogs_is_pinned on public.blogs(is_pinned);
create index idx_blog_tag_assignments_blog on public.blog_tag_assignments(blog_id);
create index idx_blog_tag_assignments_tag on public.blog_tag_assignments(tag_id);
create index idx_blog_comments_blog on public.blog_comments(blog_id);
create index idx_blog_comments_approved on public.blog_comments(blog_id, is_approved);
create index idx_blog_comments_parent on public.blog_comments(parent_comment_id);
-- Contact & newsletter indexes
create index idx_contact_messages_is_read on public.contact_messages(is_read);
create index idx_newsletter_subscribers_email on public.newsletter_subscribers(email);
create index idx_newsletter_subscribers_active on public.newsletter_subscribers(is_active);
-- Team members indexes
create index idx_team_members_is_visible on public.team_members(is_visible);
create index idx_team_members_order on public.team_members(order_index);
-- Request design indexes
create index idx_request_designs_status on public.request_designs(status);
create index idx_request_designs_catalogue on public.request_designs(catalogue_id);
create index idx_request_designs_created_at on public.request_designs(created_at desc);


-- =========================================================================
-- 4. AUTOMATIC TIMESTAMPS (UPDATED_AT TRIGGERS)
-- =========================================================================

-- Reusable update trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Apply triggers
create trigger trigger_update_profiles before update on public.profiles
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_service_requests before update on public.service_requests
    for each row execute procedure public.handle_updated_at();

-- Updated_at triggers for new public-facing tables
create trigger trigger_update_catalogues before update on public.catalogues
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_catalogue_cost_items before update on public.catalogue_cost_items
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_blogs before update on public.blogs
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_team_members before update on public.team_members
    for each row execute procedure public.handle_updated_at();

-- Request design trigger
create trigger trigger_update_request_designs before update on public.request_designs
    for each row execute procedure public.handle_updated_at();

-- =========================================================================
-- 4b. AUTO-CALCULATION TRIGGERS & ATOMIC COUNTER FUNCTIONS
-- =========================================================================

-- CATALOGUE: Auto-recalculate total_cost when cost items are inserted/updated/deleted
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

-- CATALOGUE: Atomic view count increment (avoids race conditions)
create or replace function public.increment_catalogue_view(p_catalogue_id uuid)
returns void as $$
begin
    update public.catalogues
    set view_count = view_count + 1
    where id = p_catalogue_id;
end;
$$ language plpgsql security definer;

-- CATALOGUE: Atomic like count increment
create or replace function public.increment_catalogue_like(p_catalogue_id uuid)
returns void as $$
begin
    update public.catalogues
    set like_count = like_count + 1
    where id = p_catalogue_id;
end;
$$ language plpgsql security definer;

-- BLOG: Sync denormalized comment_count when comments are inserted/updated/deleted
create or replace function public.sync_blog_comment_count()
returns trigger as $$
begin
    update public.blogs
    set comment_count = (
        select count(*)
        from public.blog_comments
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

-- BLOG: Atomic view count increment
create or replace function public.increment_blog_view(p_blog_id uuid)
returns void as $$
begin
    update public.blogs
    set view_count = view_count + 1
    where id = p_blog_id;
end;
$$ language plpgsql security definer;

-- BLOG: Atomic like count increment
create or replace function public.increment_blog_like(p_blog_id uuid)
returns void as $$
begin
    update public.blogs
    set like_count = like_count + 1
    where id = p_blog_id;
end;
$$ language plpgsql security definer;


-- =========================================================================
-- 5. AUTOMATIC PROFILE CREATION TRIGGER (auth.users -> public.profiles)
-- =========================================================================

-- Trigger to copy sign-up user to profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (
        id, 
        email, 
        first_name, 
        last_name, 
        full_name, 
        title, 
        role, 
        avatar_url,
        temp_default_password,
        preferred_locale
    )
    values (
        new.id,
        new.email,
        new.raw_user_meta_data->>'first_name',
        new.raw_user_meta_data->>'last_name',
        coalesce(
            new.raw_user_meta_data->>'full_name',
            trim(coalesce(new.raw_user_meta_data->>'first_name', '') || ' ' || coalesce(new.raw_user_meta_data->>'last_name', ''))
        ),
        new.raw_user_meta_data->>'title',
        coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'client'),
        new.raw_user_meta_data->>'avatar_url',
        new.raw_user_meta_data->>'temp_default_password',
        coalesce(new.raw_user_meta_data->>'preferred_locale', 'en')
    );
    return new;
end;
$$ language plpgsql security definer;

-- Trigger to invoke on auth.users sign-up
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();

-- Trigger function to automatically clear temporary password and set password_updated_at when updated
create or replace function public.handle_password_update()
returns trigger as $$
begin
    if old.encrypted_password is distinct from new.encrypted_password then
        update public.profiles
        set temp_default_password = null,
            password_updated_at = now()
        where id = new.id;
    end if;
    return new;
end;
$$ language plpgsql security definer;

-- Trigger to invoke on auth.users updates
create trigger trigger_on_auth_password_updated
    after update on auth.users
    for each row execute procedure public.handle_password_update();


-- =========================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.admin_permissions enable row level security;
alter table public.service_requests enable row level security;
-- Public-facing feature tables
alter table public.catalogues enable row level security;
alter table public.catalogue_images enable row level security;
alter table public.catalogue_cost_items enable row level security;
alter table public.blogs enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_tag_assignments enable row level security;
alter table public.blog_comments enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.team_members enable row level security;
-- Request design table
alter table public.request_designs enable row level security;

-- --- A. PROFILES POLICIES ---
-- Users can view their own profile
create policy "Allow users to view own profile" 
    on public.profiles for select 
    using (auth.uid() = id);

-- Admins can view all profiles
create policy "Allow admin to view all profiles" 
    on public.profiles for select 
    using (
        exists (
            select 1 from public.profiles 
            where id = auth.uid() and role = 'admin'
        )
    );

-- Users can update their own profile
create policy "Allow users to update own profile" 
    on public.profiles for update 
    using (auth.uid() = id);

-- Only Admin can insert/delete profiles (beyond auth registration)
create policy "Only admin can delete profiles" 
    on public.profiles for delete 
    using (
        exists (
            select 1 from public.profiles 
            where id = auth.uid() and role = 'admin'
        )
    );


-- --- A2. ADMIN PERMISSIONS POLICIES ---
create policy "Admins can view and manage admin permissions"
    on public.admin_permissions for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );



-- --- G. SERVICE REQUESTS (LEADS) POLICIES ---
-- Any visitor can submit a request (insert only)
create policy "Public can submit service requests" 
    on public.service_requests for insert 
    with check (true);

-- Only Admin can view and manage requests
create policy "Admin can manage service requests" 
    on public.service_requests for all 
    using (
        exists (
            select 1 from public.profiles 
            where id = auth.uid() and role = 'admin'
        )
    );


-- =========================================================================
-- --- I. CATALOGUES POLICIES ---
-- =========================================================================

-- Public can view published catalogues
create policy "Public can view published catalogues"
    on public.catalogues for select
    using (is_published = true);

-- Admin has full access to all catalogues (including drafts)
create policy "Admin can manage all catalogues"
    on public.catalogues for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- --- J. CATALOGUE IMAGES POLICIES ---

-- Public can view images belonging to published catalogues
create policy "Public can view images of published catalogues"
    on public.catalogue_images for select
    using (
        exists (
            select 1 from public.catalogues
            where id = catalogue_images.catalogue_id and is_published = true
        )
    );

-- Admin has full access to catalogue images
create policy "Admin can manage catalogue images"
    on public.catalogue_images for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- --- K. CATALOGUE COST ITEMS POLICIES ---

-- Public can view cost items belonging to published catalogues
create policy "Public can view cost items of published catalogues"
    on public.catalogue_cost_items for select
    using (
        exists (
            select 1 from public.catalogues
            where id = catalogue_cost_items.catalogue_id and is_published = true
        )
    );

-- Admin has full access to catalogue cost items
create policy "Admin can manage catalogue cost items"
    on public.catalogue_cost_items for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- =========================================================================
-- --- L. BLOGS POLICIES ---
-- =========================================================================

-- Public can view published blog posts
create policy "Public can view published blogs"
    on public.blogs for select
    using (status = 'published');

-- Admin has full access to all blog posts (including drafts and archived)
create policy "Admin can manage all blogs"
    on public.blogs for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- --- M. BLOG TAGS POLICIES ---

-- Public can view all blog tags (used for filtering)
create policy "Public can view blog tags"
    on public.blog_tags for select
    using (true);

-- Admin has full access to blog tags
create policy "Admin can manage blog tags"
    on public.blog_tags for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- --- N. BLOG TAG ASSIGNMENTS POLICIES ---

-- Public can view tag assignments (needed to filter blog posts by tag)
create policy "Public can view blog tag assignments"
    on public.blog_tag_assignments for select
    using (true);

-- Admin has full access to tag assignments
create policy "Admin can manage blog tag assignments"
    on public.blog_tag_assignments for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- --- O. BLOG COMMENTS POLICIES ---

-- Public can view approved comments only
create policy "Public can view approved blog comments"
    on public.blog_comments for select
    using (is_approved = true);

-- Anyone can submit a comment (guest; pending admin approval)
create policy "Anyone can submit a blog comment"
    on public.blog_comments for insert
    with check (true);

-- Admin has full access to all comments (approve, delete, moderate)
create policy "Admin can manage all blog comments"
    on public.blog_comments for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- =========================================================================
-- --- P. CONTACT MESSAGES POLICIES ---
-- =========================================================================

-- Anyone can submit a contact message (public form)
create policy "Anyone can submit a contact message"
    on public.contact_messages for insert
    with check (true);

-- Only admin can view and manage contact messages
create policy "Admin can manage contact messages"
    on public.contact_messages for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- =========================================================================
-- --- Q. NEWSLETTER SUBSCRIBERS POLICIES ---
-- =========================================================================

-- Anyone can subscribe (insert only; upsert handled at application layer)
create policy "Anyone can subscribe to newsletter"
    on public.newsletter_subscribers for insert
    with check (true);

-- Only admin can view, manage, and export subscriber list
create policy "Admin can manage newsletter subscribers"
    on public.newsletter_subscribers for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- =========================================================================
-- --- R. TEAM MEMBERS POLICIES ---
-- =========================================================================

-- Public can view visible team members (displayed on the About page)
create policy "Public can view visible team members"
    on public.team_members for select
    using (is_visible = true);

-- Admin has full access to manage the team (create, update, hide, delete)
create policy "Admin can manage team members"
    on public.team_members for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

-- =========================================================================
-- --- S. REQUEST DESIGNS POLICIES ---
-- =========================================================================

-- Anyone (unauthenticated) can submit a new request design (public form)
create policy "Anyone can submit a request design"
    on public.request_designs for insert
    with check (true);

-- Admin has full access to all request designs
create policy "Admin can manage all request designs"
    on public.request_designs for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );


-- =========================================================================
-- VERSION 2: PROJECTS & COLLABORATION PORTAL SCHEMA
-- =========================================================================

-- 1. ENUMS AND CUSTOM TYPES
create type project_role as enum ('owner', 'coordinator', 'collaborator');
create type invite_status as enum ('pending', 'accepted', 'expired');
create type worker_status as enum ('backlog', 'ready_to_start', 'started', 'ongoing', 'ended', 'completed');
create type worker_responsibility as enum ('technician', 'general_laborer', 'iron_bender', 'carpenter', 'roofer', 'tiler', 'electrician', 'plumber', 'other');
create type equipment_status as enum ('good', 'manageable', 'bad');
create type phase_status as enum ('backlog', 'ready_to_start', 'started', 'on_going', 'ended', 'completed');
create type task_status as enum ('backlog', 'ready_to_start', 'started', 'ongoing', 'completed');
create type purchase_status as enum ('draft', 'approved', 'purchased', 'cancelled');
create type transaction_type as enum ('inflow_purchase', 'outflow_progress', 'adjustment');

-- 2. TABLES

-- A. PROJECTS
create table public.projects (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    country text not null,
    location_address text not null,
    location_latitude numeric(9, 6),
    location_longitude numeric(9, 6),
    location_place_id text,
    estimated_cost numeric(14, 2) check (estimated_cost >= 0),
    description text,
    head_photo_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- B. PROJECT MEMBERS (COLLABORATORS)
create table public.project_members (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    role project_role not null default 'collaborator',
    granted_overrides text[] not null default '{}'::text[],
    revoked_overrides text[] not null default '{}'::text[],
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (project_id, user_id)
);

-- C. PROJECT COLLABORATOR INVITES
create table public.project_collaborator_invites (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    email text,
    phone text not null,
    phone_country_code text,
    role project_role not null default 'collaborator',
    invite_token text not null unique,
    invite_link text not null,
    status invite_status not null default 'pending',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- D. WORKERS
create table public.workers (
    id uuid default uuid_generate_v4() primary key,
    full_name text not null,
    phone_number text not null unique,
    has_whatsapp boolean not null default false,
    photo_url text,
    labor_cost_per_day numeric(12, 2) not null check (labor_cost_per_day >= 0),
    location text,
    status worker_status not null default 'backlog',
    responsibility worker_responsibility not null default 'other',
    rating integer check (rating >= 1 and rating <= 10),
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- E. EQUIPMENTS
create table public.equipments (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    name text not null,
    status equipment_status not null default 'good',
    quantity integer not null check (quantity >= 0),
    photo_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- F. MATERIALS
create table public.materials (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    name text not null,
    description text,
    photo_url text,
    current_quantity numeric(12, 2) not null default 0 check (current_quantity >= 0),
    cost numeric(14, 2) not null check (cost >= 0),
    unit text not null, -- e.g., 'bags', 'tons', 'meters'
    location text,
    suppliers_name text,
    suppliers_contact text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- G. MATERIAL TRANSACTIONS (Unified ledger pattern uploader)
create table public.material_transactions (
    id uuid default uuid_generate_v4() primary key,
    material_id uuid references public.materials(id) on delete cascade not null,
    project_id uuid references public.projects(id) on delete cascade not null,
    type transaction_type not null,
    quantity numeric(12, 2) not null,
    reference_id uuid, -- Link to purchases, daily_progress, or manual adjustments
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now()
);

-- H. PROJECT PHASES
create table public.project_phases (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    title text not null,
    start_date date not null,
    end_date date not null,
    description text,
    estimated_cost numeric(14, 2) check (estimated_cost >= 0),
    status phase_status not null default 'backlog',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (start_date <= end_date)
);

-- I. PROJECT FILES
create table public.project_files (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    phase_id uuid references public.project_phases(id) on delete set null,
    name text not null,
    file_url text not null,
    file_type text not null, -- 'pdf', 'image'
    uploaded_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now()
);

-- J. PURCHASES
create table public.purchases (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    phase_id uuid references public.project_phases(id) on delete cascade not null,
    total_cost numeric(14, 2) not null default 0 check (total_cost >= 0),
    status purchase_status not null default 'draft',
    created_by uuid references public.profiles(id) on delete set null,
    approved_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- K. PURCHASE ITEMS
create table public.purchase_items (
    id uuid default uuid_generate_v4() primary key,
    purchase_id uuid references public.purchases(id) on delete cascade not null,
    material_id uuid references public.materials(id) on delete cascade not null,
    quantity numeric(12, 2) not null check (quantity > 0),
    unit_cost numeric(14, 2) not null check (unit_cost >= 0),
    total_cost numeric(14, 2) not null check (total_cost >= 0)
);

-- L. PHASE TASKS
create table public.phase_tasks (
    id uuid default uuid_generate_v4() primary key,
    phase_id uuid references public.project_phases(id) on delete cascade not null,
    name text not null,
    start_date date not null,
    end_date date not null,
    status task_status not null default 'backlog',
    description text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (start_date <= end_date)
);

-- M. TASK ASSIGNMENTS
create table public.task_assignments (
    task_id uuid references public.phase_tasks(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    primary key (task_id, user_id)
);

-- N. DAILY PROGRESS
create table public.daily_progress (
    id uuid default uuid_generate_v4() primary key,
    phase_id uuid references public.project_phases(id) on delete cascade not null,
    project_id uuid references public.projects(id) on delete cascade not null,
    work_done_description text not null,
    progress_date date not null,
    difficulties text,
    labor_cost numeric(14, 2) not null default 0 check (labor_cost >= 0),
    materials_cost numeric(14, 2) not null default 0 check (materials_cost >= 0),
    total_day_cost numeric(14, 2) not null default 0 check (total_day_cost >= 0),
    is_approved boolean not null default false,
    approved_by uuid references public.profiles(id) on delete set null,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- O. DAILY PROGRESS MATERIALS
create table public.daily_progress_materials (
    id uuid default uuid_generate_v4() primary key,
    progress_id uuid references public.daily_progress(id) on delete cascade not null,
    material_id uuid references public.materials(id) on delete cascade not null,
    quantity numeric(12, 2) not null check (quantity > 0)
);

-- P. DAILY PROGRESS ATTENDANCE
create table public.daily_progress_attendance (
    progress_id uuid references public.daily_progress(id) on delete cascade not null,
    worker_id uuid references public.workers(id) on delete cascade not null,
    primary key (progress_id, worker_id)
);

-- Q. DAILY PROGRESS MEDIA
create table public.daily_progress_media (
    id uuid default uuid_generate_v4() primary key,
    progress_id uuid references public.daily_progress(id) on delete cascade not null,
    media_url text not null,
    media_type text not null -- 'image', 'video'
);

-- R. PROJECT ACTIVITIES (AUDIT LOG)
create table public.project_activities (
    id uuid default uuid_generate_v4() primary key,
    project_id uuid references public.projects(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete set null,
    action_type text not null,
    details jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

-- 3. INDEXES FOR PERFORMANCE
create index idx_projects_created on public.projects(created_at desc);
create index idx_project_members_project on public.project_members(project_id);
create index idx_project_members_user on public.project_members(user_id);
create index idx_project_collaborator_invites_project on public.project_collaborator_invites(project_id);
create index idx_project_collaborator_invites_token on public.project_collaborator_invites(invite_token);
create index idx_equipments_project on public.equipments(project_id);
create index idx_materials_project on public.materials(project_id);
create index idx_material_transactions_material on public.material_transactions(material_id);
create index idx_material_transactions_project on public.material_transactions(project_id);
create index idx_project_phases_project on public.project_phases(project_id);
create index idx_project_files_project on public.project_files(project_id);
create index idx_project_files_phase on public.project_files(phase_id);
create index idx_purchases_project on public.purchases(project_id);
create index idx_purchases_phase on public.purchases(phase_id);
create index idx_purchase_items_purchase on public.purchase_items(purchase_id);
create index idx_phase_tasks_phase on public.phase_tasks(phase_id);
create index idx_daily_progress_phase on public.daily_progress(phase_id);
create index idx_daily_progress_project on public.daily_progress(project_id);
create index idx_daily_progress_materials_progress on public.daily_progress_materials(progress_id);
create index idx_daily_progress_attendance_progress on public.daily_progress_attendance(progress_id);
create index idx_daily_progress_media_progress on public.daily_progress_media(progress_id);
create index idx_project_activities_project on public.project_activities(project_id);

-- 4. AUTOMATIC TIMESTAMPS (UPDATED_AT TRIGGERS)
create trigger trigger_update_projects before update on public.projects
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_project_members before update on public.project_members
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_project_collaborator_invites before update on public.project_collaborator_invites
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_workers before update on public.workers
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_equipments before update on public.equipments
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_materials before update on public.materials
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_project_phases before update on public.project_phases
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_purchases before update on public.purchases
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_phase_tasks before update on public.phase_tasks
    for each row execute procedure public.handle_updated_at();

create trigger trigger_update_daily_progress before update on public.daily_progress
    for each row execute procedure public.handle_updated_at();

-- 5. STOCK AND INVENTORY CALCULATIONS AND TRIGGERS

-- Trigger to recalculate materials.current_quantity from material_transactions sum
create or replace function public.sync_material_stock()
returns trigger as $$
begin
    update public.materials
    set current_quantity = (
        select coalesce(sum(quantity), 0)
        from public.material_transactions
        where material_id = coalesce(new.material_id, old.material_id)
    )
    where id = coalesce(new.material_id, old.material_id);
    return coalesce(new, old);
end;
$$ language plpgsql;

create trigger trigger_sync_material_stock
    after insert or update or delete on public.material_transactions
    for each row execute procedure public.sync_material_stock();

-- Trigger to process Purchase Order when status becomes 'purchased'
create or replace function public.process_purchase_inventory()
returns trigger as $$
declare
    v_item record;
begin
    if new.status = 'purchased' and (old.status is null or old.status != 'purchased') then
        for v_item in 
            select material_id, quantity 
            from public.purchase_items 
            where purchase_id = new.id
        loop
            insert into public.material_transactions (material_id, project_id, type, quantity, reference_id, created_by)
            values (v_item.material_id, new.project_id, 'inflow_purchase', v_item.quantity, new.id, new.created_by);
        end loop;
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trigger_process_purchase_inventory
    after update of status on public.purchases
    for each row execute procedure public.process_purchase_inventory();

-- Trigger to process Daily Progress when it is approved (deduct materials used)
create or replace function public.process_progress_inventory()
returns trigger as $$
declare
    v_item record;
begin
    if new.is_approved = true and (old.is_approved is null or old.is_approved = false) then
        for v_item in 
            select material_id, quantity 
            from public.daily_progress_materials 
            where progress_id = new.id
        loop
            insert into public.material_transactions (material_id, project_id, type, quantity, reference_id, created_by)
            values (v_item.material_id, new.project_id, 'outflow_progress', -v_item.quantity, new.id, new.created_by);
        end loop;
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trigger_process_progress_inventory
    after update of is_approved on public.daily_progress
    for each row execute procedure public.process_progress_inventory();

-- 6. ROW LEVEL SECURITY (RLS) POLICIES & CAPABILITY FUNCTIONS

-- General access checker function
create or replace function public.has_project_capability(p_project_id uuid, p_user_id uuid, p_capability text)
returns boolean as $$
declare
    v_role public.project_role;
    v_granted text[];
    v_revoked text[];
begin
    -- System admins bypass all project checks
    if exists (
        select 1 from public.profiles 
        where id = p_user_id and role = 'admin'
    ) then
        return true;
    end if;

    -- Fetch user's local project credentials
    select role, granted_overrides, revoked_overrides
    into v_role, v_granted, v_revoked
    from public.project_members
    where project_id = p_project_id and user_id = p_user_id;

    if not found then
        return false;
    end if;

    -- Owners have all capabilities
    if v_role = 'owner' then
        return true;
    end if;

    -- Explicitly revoked capability overrides
    if p_capability = any(v_revoked) then
        return false;
    end if;

    -- Explicitly granted capability overrides
    if p_capability = any(v_granted) then
        return true;
    end if;

    -- Default role permissions mapping
    return case v_role
        when 'coordinator' then 
            p_capability in (
                'view_financials', 'update_financials', 'approve_payments',
                'view_blueprints', 'upload_blueprints', 'view_site_journal',
                'post_site_journal', 'manage_collaborators', 'manage_workers',
                'manage_equipments', 'manage_materials', 'manage_purchases',
                'manage_phases', 'manage_tasks', 'manage_progress'
            )
        when 'collaborator' then
            p_capability in (
                'view_blueprints', 'view_site_journal', 'view_progress', 'view_tasks'
            )
        else false
    end;
end;
$$ language plpgsql security definer;

-- Apply RLS Policies

alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.project_collaborator_invites enable row level security;
alter table public.project_files enable row level security;
alter table public.workers enable row level security;
alter table public.equipments enable row level security;
alter table public.materials enable row level security;
alter table public.material_transactions enable row level security;
alter table public.project_phases enable row level security;
alter table public.purchases enable row level security;
alter table public.purchase_items enable row level security;
alter table public.phase_tasks enable row level security;
alter table public.task_assignments enable row level security;
alter table public.daily_progress enable row level security;
alter table public.daily_progress_materials enable row level security;
alter table public.daily_progress_attendance enable row level security;
alter table public.daily_progress_media enable row level security;
alter table public.project_activities enable row level security;

-- Projects: Members and Admins can view
create policy "Allow members and admins to view projects"
    on public.projects for select
    using (
        exists (
            select 1 from public.project_members
            where project_id = projects.id and user_id = auth.uid()
        ) or exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

-- Projects: Only Admin can insert/delete (from main admin dashboard)
create policy "Only admin can manage project directory"
    on public.projects for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

-- Project Members: Read if member of project. Write requires manage_collaborators.
create policy "View project members"
    on public.project_members for select
    using (
        exists (
            select 1 from public.project_members
            where project_id = project_members.project_id and user_id = auth.uid()
        ) or exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Manage project members"
    on public.project_members for all
    using (
        public.has_project_capability(project_id, auth.uid(), 'manage_collaborators')
    );

-- Invites: Requires manage_collaborators
create policy "Manage invites"
    on public.project_collaborator_invites for all
    using (
        public.has_project_capability(project_id, auth.uid(), 'manage_collaborators')
    );

-- Project Files: View requires view_blueprints, write requires upload_blueprints
create policy "View project files"
    on public.project_files for select
    using (
        public.has_project_capability(project_id, auth.uid(), 'view_blueprints')
    );

create policy "Write project files"
    on public.project_files for all
    using (
        public.has_project_capability(project_id, auth.uid(), 'upload_blueprints')
    );

-- Workers: Requires manage_workers
create policy "Manage workers directory"
    on public.workers for all
    using (
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        ) or exists (
            select 1 from public.project_members
            where user_id = auth.uid() and role in ('coordinator', 'owner')
        )
    );

-- Equipments: Read if member. Write requires manage_equipments.
create policy "View equipments"
    on public.equipments for select
    using (
        exists (
            select 1 from public.project_members
            where project_id = equipments.project_id and user_id = auth.uid()
        ) or exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Manage equipments"
    on public.equipments for all
    using (
        public.has_project_capability(project_id, auth.uid(), 'manage_equipments')
    );

-- Materials: Read if member. Write requires manage_materials.
create policy "View materials"
    on public.materials for select
    using (
        exists (
            select 1 from public.project_members
            where project_id = materials.project_id and user_id = auth.uid()
        ) or exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Manage materials"
    on public.materials for all
    using (
        public.has_project_capability(project_id, auth.uid(), 'manage_materials')
    );

-- Material Transactions: Read if member. Write requires manage_materials.
create policy "View transactions"
    on public.material_transactions for select
    using (
        exists (
            select 1 from public.project_members
            where project_id = material_transactions.project_id and user_id = auth.uid()
        ) or exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Manage transactions"
    on public.material_transactions for all
    using (
        public.has_project_capability(project_id, auth.uid(), 'manage_materials')
    );

-- Phases: Read if member. Write requires manage_phases.
create policy "View phases"
    on public.project_phases for select
    using (
        exists (
            select 1 from public.project_members
            where project_id = project_phases.project_id and user_id = auth.uid()
        ) or exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Manage phases"
    on public.project_phases for all
    using (
        public.has_project_capability(project_id, auth.uid(), 'manage_phases')
    );

-- Purchases: Read requires view_financials. Write requires manage_purchases.
create policy "View purchases"
    on public.purchases for select
    using (
        public.has_project_capability(project_id, auth.uid(), 'view_financials')
    );

create policy "Manage purchases"
    on public.purchases for all
    using (
        public.has_project_capability(project_id, auth.uid(), 'manage_purchases')
    );

-- Purchase Items: Read if parent PO is readable. Write if parent PO is writeable.
create policy "View purchase items"
    on public.purchase_items for select
    using (
        exists (
            select 1 from public.purchases
            where id = purchase_items.purchase_id
              and public.has_project_capability(project_id, auth.uid(), 'view_financials')
        )
    );

create policy "Manage purchase items"
    on public.purchase_items for all
    using (
        exists (
            select 1 from public.purchases
            where id = purchase_items.purchase_id
              and public.has_project_capability(project_id, auth.uid(), 'manage_purchases')
        )
    );

-- Tasks: Read if member. Write requires manage_tasks.
create policy "View tasks"
    on public.phase_tasks for select
    using (
        exists (
            select 1 from public.project_phases p
            join public.project_members m on m.project_id = p.project_id
            where p.id = phase_tasks.phase_id and m.user_id = auth.uid()
        ) or exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Manage tasks"
    on public.phase_tasks for all
    using (
        exists (
            select 1 from public.project_phases
            where id = phase_tasks.phase_id
              and public.has_project_capability(project_id, auth.uid(), 'manage_tasks')
        )
    );

create policy "Manage task assignments"
    on public.task_assignments for all
    using (
        exists (
            select 1 from public.phase_tasks t
            join public.project_phases p on p.id = t.phase_id
            where t.id = task_assignments.task_id
              and public.has_project_capability(p.project_id, auth.uid(), 'manage_tasks')
        )
    );

-- Daily Progress: Read if member. Write requires post_site_journal. Approval requires manage_progress.
create policy "View daily progress"
    on public.daily_progress for select
    using (
        exists (
            select 1 from public.project_members
            where project_id = daily_progress.project_id and user_id = auth.uid()
        ) or exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "Manage daily progress"
    on public.daily_progress for all
    using (
        public.has_project_capability(project_id, auth.uid(), 'post_site_journal')
    );

create policy "Manage progress details"
    on public.daily_progress_materials for all
    using (
        exists (
            select 1 from public.daily_progress p
            where p.id = daily_progress_materials.progress_id
              and public.has_project_capability(p.project_id, auth.uid(), 'post_site_journal')
        )
    );

create policy "Manage progress attendance"
    on public.daily_progress_attendance for all
    using (
        exists (
            select 1 from public.daily_progress p
            where p.id = daily_progress_attendance.progress_id
              and public.has_project_capability(p.project_id, auth.uid(), 'post_site_journal')
        )
    );

create policy "Manage progress media"
    on public.daily_progress_media for all
    using (
        exists (
            select 1 from public.daily_progress p
            where p.id = daily_progress_media.progress_id
              and public.has_project_capability(p.project_id, auth.uid(), 'post_site_journal')
        )
    );

-- Project Activities (Audit Log): Read if member. Write is system-only or admin-level.
create policy "View project activity log"
    on public.project_activities for select
    using (
        exists (
            select 1 from public.project_members
            where project_id = project_activities.project_id and user_id = auth.uid()
        ) or exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

create policy "System can write activities"
    on public.project_activities for insert
    with check (true);

