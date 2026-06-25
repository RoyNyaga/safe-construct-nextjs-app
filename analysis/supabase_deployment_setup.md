# Supabase Deployment Setup Guide

This guide outlines the remaining setup tasks on Supabase and environment variable configurations needed before deploying the **Safe-Construct** application to Netlify.

---

## 1. Supabase Authentication Configuration
Because the application uses phone-based login and password registration:

### Disable SMS Confirmations (Default/Quick Setup)
By default, Supabase requires SMS OTP confirmations for new phone-based accounts. Since the registration logic immediately redirects to onboarding:
1. Go to your **Supabase Dashboard** $\rightarrow$ **Authentication** $\rightarrow$ **Providers** $\rightarrow$ **Phone**.
2. Scroll to **Confirm Phone** (or **Enable SMS confirmations**) and toggle it **Off**.
3. *Note: If you plan to use real SMS OTP verification later, you must configure a third-party SMS provider (like Twilio) in the same settings screen and adjust the registration codebase.*

### Redirect URL Configuration
Set the production site URL so that authentication redirect flows function properly:
1. Go to **Authentication** $\rightarrow$ **URL Configuration**.
2. Set **Site URL** to your Netlify production domain (e.g. `https://your-site.netlify.app`).
3. Under **Redirect URLs**, add `https://your-site.netlify.app/**` (using wildcards to support sub-routes).

---

## 2. Verify Storage Buckets
Although the migration SQL script automatically registers the storage buckets in the database, verify them visually in the Dashboard:
1. Go to the **Storage** tab in your Supabase Dashboard.
2. Confirm the three required buckets exist:
   * `catalogue-media`
   * `blog-media`
   * `team-photos`
3. Ensure their access level is set to **Public** so the Next.js frontend can read and display uploaded files.

---

## 3. Netlify Environment Variables
Configure the following environment variables in your Netlify Project settings (**Site configuration** $\rightarrow$ **Environment variables**):

| Variable Name | Example Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://zjsarbfdslkbbvgaguib.supabase.co` | Remote Supabase API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Remote Supabase Anon API key |
| `NEXT_PUBLIC_APP_URL` | `https://your-site.netlify.app` | Netlify production URL |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `en` | Default language locale |

> [!NOTE]
> `SUPABASE_SERVICE_ROLE_KEY` is intentionally omitted because the codebase does not use it. The application relies entirely on client-side authentication and Row-Level Security (RLS) via the anon/public key.

