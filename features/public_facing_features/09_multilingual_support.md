# Feature 09: Multilingual Support (English and French)

## 1. Overview

To support a diverse regional audience, the Safe-Construct web application supports English (EN) and French (FR) languages. Users can read articles, browse catalogue items, explore services, and submit contact/design requests in either language.

The translation architecture covers two categories:
1. **Static UI Copy**: Hardcoded strings (e.g., buttons, form labels, hero section headers, placeholders) are localized via static localization dictionary files (`/messages/en.json` and `/messages/fr.json`) using `next-intl`.
2. **Dynamic DB Copy**: Database-driven content (e.g., catalogue titles, blog articles, team roles) are localized via specific columns added to the database. If a French translation is missing in the database, the system falls back to the English/default value to prevent rendering empty UI nodes.

**Client Segments Served**: All customer segments.

---

## 2. User Personas & Access Levels

- **Public / Guest Users**:
  - Can view all public pages in English or French.
  - Can switch between English and French at any time using UI switchers.
  - Submit forms (design requests, contact requests, service requests, comments) which automatically log the user's active locale context so admins know how to respond.
- **Admin Users**:
  - View user leads alongside the locale context.
  - Manage English and French variations of fields in the Admin dashboard for content management (`catalogues`, `blogs`, `blog_tags`, `team_members`, and `catalogue_cost_items`).

---

## 3. User Journey & Workflow

### 3.1. Entering the Site
1. Visitor navigates to the base domain `/`.
2. The Next.js middleware detects the preferred locale:
   - It checks for a previously stored locale cookie.
   - If not found, it inspects the browser's `Accept-Language` header.
   - If neither resolves, it defaults to `en`.
3. The middleware redirects the user to the locale prefix route (e.g., `/en` or `/fr`).
4. The page loads localized static UI text matching the prefix route.

### 3.2. Switching Language
1. A user currently viewing `/en/catalogue` decides to read in French.
2. The user clicks the language toggle in the AppBar or Footer and selects "FR" (or "Français").
3. The application performs a locale transition using the Next.js router. The page URL is updated to `/fr/catalogue` (preserving route parameters).
4. Static UI content is immediately loaded from the French dictionary, and dynamic database-driven components query and display the French fields (with fallbacks to English if French fields are blank).

### 3.3. Submitting Form Leads
1. A user on `/fr/request-design` fills out the multi-step request wizard.
2. Upon final submission, the application calls a Server Action which writes to the database.
3. The submission payload includes the active locale `'fr'`.
4. The database records the request in `request_designs` with `locale = 'fr'`. The administration inbox will flag this request as requiring French communication.

---

## 4. UI/UX Requirements

### 4.1. Language Switcher Widget
- **Location**:
  - Desktop header: Integrated within the AppBar as a clean, styled button with dropdown menu.
  - Mobile drawer menu: Positioned as a button row at the bottom of the drawer navigation.
  - Footer: Staggered alongside other utilities in the copyright row.
- **Visual Style**:
  - Clean text indicator (e.g., "EN | FR" or simple text dropdown showing "English" / "Français").
  - Subtle hover micro-animations (scale, opacity) that match our premium UI guidelines.
- **State Preservation**:
  - Switching language updates the `NEXT_LOCALE` cookie value to persist preference for future sessions.

### 4.2. Empty & Fallback States
- When displaying dynamic content on the French site:
  - If a translatable text field in the database (e.g., `title_fr`) is null or empty, display the English default field (`title`).
  - No text element should ever be displayed as blank or empty if an English fallback exists.

---

## 5. Database Requirements

We use suffix translation columns for dynamic content.

### Reading Data
- `public.profiles`: reads `preferred_locale` (standard client preference).
- `public.catalogues`: reads `title`, `title_fr`, `description`, `description_fr`.
- `public.catalogue_cost_items`: reads `label`, `label_fr`.
- `public.blogs`: reads `title`, `title_fr`, `excerpt`, `excerpt_fr`, `body`, `body_fr`.
- `public.blog_tags`: reads `name`, `name_fr`.
- `public.team_members`: reads `title`, `title_fr`.

### Writing Data
The active locale must be saved upon lead/contact submissions:
- `public.service_requests`: writes `'en'` or `'fr'` to `locale`.
- `public.request_designs`: writes `'en'` or `'fr'` to `locale`.
- `public.contact_messages`: writes `'en'` or `'fr'` to `locale`.

---

## 6. API & Data Layer

### 6.1. Dynamic Content Fetching Logic (Helper Utility)
To ensure clean and reusable fallback query structures, we define a helper function `localizeDbField(fieldEn, fieldFr, activeLocale)`:

```typescript
export function localizeDbField<T>(fieldEn: T, fieldFr: T | null | undefined, locale: string): T {
  if (locale === 'fr' && fieldFr !== null && fieldFr !== undefined && String(fieldFr).trim() !== '') {
    return fieldFr;
  }
  return fieldEn; // Default fallback to English
}
```

### 6.2. Fetching Examples

#### Fetching Catalogue Items:
```typescript
const { data, error } = await supabase
  .from('catalogues')
  .select('*, catalogue_cost_items(*)')
  .eq('is_published', true);

const localizedCatalogues = data.map(item => ({
  ...item,
  title: localizeDbField(item.title, item.title_fr, locale),
  description: localizeDbField(item.description, item.description_fr, locale),
  cost_items: item.catalogue_cost_items.map(costItem => ({
    ...costItem,
    label: localizeDbField(costItem.label, costItem.label_fr, locale),
  }))
}));
```

#### Fetching Blog Posts:
```typescript
const { data, error } = await supabase
  .from('blogs')
  .select('*, blog_tag_assignments(blog_tags(*))')
  .eq('status', 'published');

const localizedBlogs = data.map(post => ({
  ...post,
  title: localizeDbField(post.title, post.title_fr, locale),
  excerpt: localizeDbField(post.excerpt, post.excerpt_fr, locale),
  body: localizeDbField(post.body, post.body_fr, locale),
  tags: post.blog_tag_assignments.map(a => ({
    ...a.blog_tags,
    name: localizeDbField(a.blog_tags.name, a.blog_tags.name_fr, locale),
  }))
}));
```

---

## 7. Validation Rules

- **Static Translations**: All UI buttons, helper texts, and error prompts in forms must have translations defined in both `en.json` and `fr.json` dictionary files.
- **Form Submissions**: When submissions occur, the language context is automatically collected from the Next.js active route locale (`en` or `fr`) and validated before execution.

---

## 8. Edge Cases & Error Handling

- **Unsupported Locales**:
  - If a user inputs an unsupported locale prefix in the URL (e.g. `/es/catalogue`), the Next.js middleware intercepts it and redirects to the default route `/en/catalogue`.
- **Admin Content Management Editing**:
  - If an admin updates a record but leaves the French fields empty, it defaults back to English. However, the admin dashboard should display a helper warning: *"French translation is missing. English default will be displayed."*
- **Locale Switcher Persistence**:
  - If cookies are disabled in the browser, the language switcher relies on URL path segments and falls back to URL parameters.

---

## 9. Open Questions / Decisions Pending

*None. Unified slug-based dynamic routing has been selected over translated slugs to leverage Next.js i18n routing framework cleanly and prevent database mapping overhead. English content fallback is enabled globally for dynamic content.*
