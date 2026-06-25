'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

/**
 * signIn — phone + password sign-in.
 * Phone is stored WITHOUT leading zero: e.g. "671172775" → "+237671172775"
 */
export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const rawPhone = (formData.get('phone') as string).trim()
  const password = formData.get('password') as string
  const locale = (formData.get('locale') as string) || 'en'

  // Normalise: add Cameroon country code if not already present
  const phone = rawPhone.startsWith('+') ? rawPhone : `+237${rawPhone}`

  const { error } = await supabase.auth.signInWithPassword({
    phone,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect(`/${locale}/select-context`)
}

/**
 * signUp — phone + password registration.
 * Only allowed in development. Production registrations are managed by admins.
 */
export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const rawPhone = (formData.get('phone') as string).trim()
  const password = formData.get('password') as string
  const locale = (formData.get('locale') as string) || 'en'

  const phone = rawPhone.startsWith('+') ? rawPhone : `+237${rawPhone}`

  const { error } = await supabase.auth.signUp({
    phone,
    password,
    options: {
      // No OTP — Supabase local dev handles confirmation automatically
      data: {
        role: 'client',
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect(`/${locale}/select-context`)
}

/**
 * signOut — clears the session and redirects to the locale home page.
 */
export async function signOut(locale: string = 'en') {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect(`/${locale}`)
}

/**
 * getUser — returns the current authenticated user or null.
 */
export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
