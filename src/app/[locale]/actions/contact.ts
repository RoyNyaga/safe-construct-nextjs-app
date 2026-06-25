'use server'

import { createClient } from '@/utils/supabase/server'

type ContactResult = { status: 'success' } | { status: 'error'; message: string }

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const supabase = await createClient()
  const locale = (formData.get('locale') as string) || 'en'

  const full_name = (formData.get('full_name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const whatsapp_phone = (formData.get('whatsapp_phone') as string)?.trim()
  const subject = (formData.get('subject') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()
  const preferred_contact = formData.get('preferred_contact') as 'whatsapp' | 'email'

  // Basic server-side guards (client already validates)
  if (!full_name || !email || !whatsapp_phone || !subject || !message || !preferred_contact) {
    return { status: 'error', message: 'All fields are required.' }
  }
  if (message.length < 20) {
    return { status: 'error', message: 'Message must be at least 20 characters.' }
  }

  const { error } = await supabase.from('contact_messages').insert({
    full_name,
    email,
    whatsapp_phone,
    subject,
    message,
    preferred_contact,
    locale,
  })

  if (error) {
    console.error('[contact] insert error:', error)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }

  return { status: 'success' }
}

type ServiceRequestResult = { status: 'success' } | { status: 'error'; message: string }

export async function submitServiceRequest(
  type: 'custom_design' | 'construction_bid' | 'supervision_qa' | 'cost_estimate',
  full_name: string,
  email: string,
  phone: string,
  details: Record<string, unknown>,
  locale: string
): Promise<ServiceRequestResult> {
  const supabase = await createClient()

  const { error } = await supabase.from('service_requests').insert({
    type,
    full_name: full_name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    details,
    locale,
  })

  if (error) {
    console.error('[service_request] insert error:', error)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }

  return { status: 'success' }
}
