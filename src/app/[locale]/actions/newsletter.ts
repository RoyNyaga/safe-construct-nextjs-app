'use server'

import { createClient } from '@/utils/supabase/server'

type NewsletterResult =
  | { status: 'success' }
  | { status: 'duplicate' }
  | { status: 'error'; message: string }

/**
 * subscribeNewsletter — inserts or reactivates a newsletter subscriber.
 * Uses an upsert so duplicate emails are handled gracefully.
 */
export async function subscribeNewsletter(email: string): Promise<NewsletterResult> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Invalid email address.' }
  }

  const supabase = await createClient()

  // Check if already exists first so we can surface the right message
  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('id, is_active')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle()

  if (existing) {
    if (!existing.is_active) {
      // Re-activate
      await supabase
        .from('newsletter_subscribers')
        .update({ is_active: true })
        .eq('id', existing.id)
      return { status: 'success' }
    }
    return { status: 'duplicate' }
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email: email.toLowerCase().trim(), is_active: true })

  if (error) {
    return { status: 'error', message: error.message }
  }

  return { status: 'success' }
}
