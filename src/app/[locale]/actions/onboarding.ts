'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

interface OnboardingInput {
  firstName: string
  lastName: string
  email?: string
  title?: string
  country?: string
}

export async function completeOnboarding(input: OnboardingInput) {
  const supabase = await createClient()

  // Get current session user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized. Please sign in.' }
  }

  const { firstName, lastName, email, title, country } = input

  if (!firstName.trim() || !lastName.trim()) {
    return { error: 'First name and Last name are required.' }
  }

  const fullName = `${firstName.trim()} ${lastName.trim()}`

  // Update profile
  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      full_name: fullName,
      email: email?.trim() || null,
      title: title || null,
      country: country || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    console.error('Onboarding profile update failed:', error)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
