'use server'

import { createClient } from '@/utils/supabase/server'

interface RequestDesignInput {
  catalogueId?: string | null
  // Step 1
  buildCountry: string
  hasLand: boolean
  hasSitePlan: boolean
  // Step 2
  style: string
  floors: number
  // Step 3
  bedrooms: number
  bathrooms: number
  hasCarPark: boolean
  hasGarden: boolean
  hasFence: boolean
  // Step 4
  hasSwimmingPool: boolean
  hasSolarProvision: boolean
  hasBoreholeProvision: boolean
  hasServantQuarters: boolean
  sizeSqm: number
  // Step 5
  requestedDocuments: string[]
  // Step 6
  additionalNotes: string
  // Step 7
  meetingDate: string
  meetingTime: string
  meetingTimezone: string
  fullName: string
  phoneCountryCode: string
  whatsappPhone: string
  email?: string
  preferredContact: 'whatsapp' | 'email'
  locale: string
}

export async function submitRequestDesign(input: RequestDesignInput) {
  const supabase = await createClient()

  // Simple validation
  if (!input.fullName || !input.whatsappPhone || !input.phoneCountryCode) {
    return { error: 'Full name and WhatsApp phone number are required.' }
  }

  if (input.preferredContact === 'email' && !input.email) {
    return { error: 'Email address is required if preferred contact method is Email.' }
  }

  // Format date & time cleanly
  const meetingDateParsed = input.meetingDate ? input.meetingDate : null
  const meetingTimeParsed = input.meetingTime ? input.meetingTime : null

  const { error } = await supabase
    .from('request_designs')
    .insert([
      {
        catalogue_id: input.catalogueId || null,
        build_country: input.buildCountry,
        has_land: input.hasLand,
        has_site_plan: input.hasSitePlan,
        style: input.style || null,
        floors: input.floors || null,
        bedrooms: input.bedrooms || null,
        bathrooms: input.bathrooms || null,
        has_car_park: input.hasCarPark,
        has_garden: input.hasGarden,
        has_fence: input.hasFence,
        has_swimming_pool: input.hasSwimmingPool,
        has_solar_provision: input.hasSolarProvision,
        has_borehole_provision: input.hasBoreholeProvision,
        has_servant_quarters: input.hasServantQuarters,
        size_sqm: input.sizeSqm || null,
        requested_documents: input.requestedDocuments,
        additional_notes: input.additionalNotes,
        meeting_date: meetingDateParsed,
        meeting_time: meetingTimeParsed,
        meeting_timezone: input.meetingTimezone,
        full_name: input.fullName,
        phone_country_code: input.phoneCountryCode,
        whatsapp_phone: input.whatsappPhone,
        email: input.email || null,
        preferred_contact: input.preferredContact,
        locale: input.locale,
        status: 'submitted',
      },
    ])

  if (error) {
    console.error('Error saving request design:', error)
    return { error: error.message }
  }

  return { success: true }
}
