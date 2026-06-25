'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

// ─── PERMISSION CHECKER & SEEDER ─────────────────────────────────────────────

const STANDARD_PERMISSIONS = [
  'manage_catalogues',
  'manage_blogs',
  'manage_leads',
  'manage_team',
  'manage_users',
]

export async function getAdminPermissions(adminId: string) {
  const supabase = await createClient()

  // Verify that the user is actually an admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', adminId)
    .single()

  if (!profile || profile.role !== 'admin') {
    return []
  }

  // Get current permissions
  const { data: existingPerms } = await supabase
    .from('admin_permissions')
    .select('permission_key')
    .eq('admin_id', adminId)

  if (existingPerms && existingPerms.length > 0) {
    return existingPerms.map((p) => p.permission_key)
  }

  // If no permissions exist, auto-seed standard capabilities for local testing
  const insertPayload = STANDARD_PERMISSIONS.map((key) => ({
    admin_id: adminId,
    permission_key: key,
  }))

  const { error } = await supabase.from('admin_permissions').insert(insertPayload)
  if (error) {
    console.error('Failed to seed admin permissions:', error)
    return []
  }

  return STANDARD_PERMISSIONS
}

// ─── DASHBOARD STATISTICS ───────────────────────────────────────────────────

export async function getDashboardStats() {
  const supabase = await createClient()

  const [
    { count: totalServices },
    { count: pendingServices },
    { count: totalDesigns },
    { count: submittedDesigns },
    { count: totalContacts },
    { count: unreadContacts },
    { count: activeNewsletters },
    { count: pendingComments },
    { count: totalCatalogues },
  ] = await Promise.all([
    supabase.from('service_requests').select('*', { count: 'exact', head: true }),
    supabase.from('service_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('request_designs').select('*', { count: 'exact', head: true }),
    supabase.from('request_designs').select('*', { count: 'exact', head: true }).eq('status', 'submitted'),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('blog_comments').select('*', { count: 'exact', head: true }).eq('is_approved', false),
    supabase.from('catalogues').select('*', { count: 'exact', head: true }),
  ])

  return {
    services: { total: totalServices || 0, pending: pendingServices || 0 },
    designs: { total: totalDesigns || 0, submitted: submittedDesigns || 0 },
    contacts: { total: totalContacts || 0, unread: unreadContacts || 0 },
    newsletters: { active: activeNewsletters || 0 },
    comments: { pending: pendingComments || 0 },
    catalogues: { total: totalCatalogues || 0 },
  }
}

// ─── LEADS OPERATIONS ────────────────────────────────────────────────────────

export async function updateLeadStatus(
  type: 'service' | 'design' | 'contact',
  id: string,
  updates: Record<string, any>
) {
  const supabase = await createClient()
  let table = ''

  if (type === 'service') table = 'service_requests'
  else if (type === 'design') table = 'request_designs'
  else if (type === 'contact') table = 'contact_messages'

  const { error } = await supabase.from(table).update(updates).eq('id', id)

  if (error) {
    console.error(`Failed to update ${type} status:`, error)
    return { error: error.message }
  }

  revalidatePath('/[locale]/admin/leads', 'layout')
  return { success: true }
}

// ─── BLOGS & COMMENTS CRUD ───────────────────────────────────────────────────

export async function createBlogPost(data: any, tagIds: string[] = []) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  // Insert blog post
  const { data: post, error } = await supabase
    .from('blogs')
    .insert([
      {
        title: data.title,
        title_fr: data.titleFr || null,
        slug: data.slug,
        excerpt: data.excerpt,
        excerpt_fr: data.excerptFr || null,
        body: data.body,
        body_fr: data.bodyFr || null,
        header_photo_url: data.headerPhotoUrl || null,
        status: data.status || 'draft',
        is_pinned: data.isPinned || false,
        read_time_minutes: parseInt(data.readTimeMinutes) || 5,
        author_id: user.id,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Failed to create blog:', error)
    return { error: error.message }
  }

  // Handle tags
  if (tagIds.length > 0) {
    const assignments = tagIds.map((tid) => ({
      blog_id: post.id,
      tag_id: tid,
    }))
    await supabase.from('blog_tag_assignments').insert(assignments)
  }

  revalidatePath('/[locale]/blog', 'layout')
  revalidatePath('/[locale]/admin/blogs', 'layout')
  return { success: true, post }
}

export async function updateBlogPost(id: string, data: any, tagIds: string[] = []) {
  const supabase = await createClient()

  // Update blog details
  const updatePayload: any = {
    title: data.title,
    title_fr: data.titleFr || null,
    slug: data.slug,
    excerpt: data.excerpt,
    excerpt_fr: data.excerptFr || null,
    body: data.body,
    body_fr: data.bodyFr || null,
    header_photo_url: data.headerPhotoUrl || null,
    status: data.status,
    is_pinned: data.isPinned || false,
    read_time_minutes: parseInt(data.readTimeMinutes) || 5,
  }

  if (data.status === 'published') {
    updatePayload.published_at = new Date().toISOString()
  }

  const { error } = await supabase.from('blogs').update(updatePayload).eq('id', id)

  if (error) {
    console.error('Failed to update blog:', error)
    return { error: error.message }
  }

  // Clear current tags and assign new ones
  await supabase.from('blog_tag_assignments').delete().eq('blog_id', id)
  if (tagIds.length > 0) {
    const assignments = tagIds.map((tid) => ({
      blog_id: id,
      tag_id: tid,
    }))
    await supabase.from('blog_tag_assignments').insert(assignments)
  }

  revalidatePath('/[locale]/blog', 'layout')
  revalidatePath('/[locale]/admin/blogs', 'layout')
  return { success: true }
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blogs').delete().eq('id', id)

  if (error) {
    console.error('Failed to delete blog:', error)
    return { error: error.message }
  }

  revalidatePath('/[locale]/blog', 'layout')
  revalidatePath('/[locale]/admin/blogs', 'layout')
  return { success: true }
}

export async function moderateComment(commentId: string, action: 'approve' | 'unapprove' | 'delete') {
  const supabase = await createClient()

  if (action === 'delete') {
    const { error } = await supabase.from('blog_comments').delete().eq('id', commentId)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase
      .from('blog_comments')
      .update({ is_approved: action === 'approve' })
      .eq('id', commentId)
    if (error) return { error: error.message }
  }

  revalidatePath('/[locale]/blog', 'layout')
  revalidatePath('/[locale]/admin/blogs', 'layout')
  return { success: true }
}

// ─── CATALOGUE CRUD OPERATIONS ───────────────────────────────────────────────

export async function createCatalogueItem(data: any, costItems: any[] = [], imageGalleries: any[] = []) {
  const supabase = await createClient()

  const { data: item, error } = await supabase
    .from('catalogues')
    .insert([
      {
        title: data.title,
        title_fr: data.titleFr || null,
        slug: data.slug,
        description: data.description,
        description_fr: data.descriptionFr || null,
        style: data.style,
        design_style_origin: data.designStyleOrigin,
        size_sqm: parseFloat(data.sizeSqm),
        bedrooms: parseInt(data.bedrooms) || 0,
        bathrooms: parseInt(data.bathrooms) || 0,
        floors: parseInt(data.floors) || 1,
        main_image_url: data.mainImageUrl,
        is_featured: data.isFeatured || false,
        is_published: data.isPublished || false,
        currency: 'XAF',
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Failed to create catalogue item:', error)
    return { error: error.message }
  }

  // Insert cost items
  if (costItems.length > 0) {
    const costPayload = costItems.map((c) => ({
      catalogue_id: item.id,
      label: c.label,
      label_fr: c.labelFr || null,
      cost: parseFloat(c.cost),
    }))
    await supabase.from('catalogue_cost_items').insert(costPayload)
  }

  // Insert gallery images
  if (imageGalleries.length > 0) {
    const galleryPayload = imageGalleries.map((img, idx) => ({
      catalogue_id: item.id,
      image_url: img.imageUrl,
      caption: img.caption || null,
      order_index: idx,
    }))
    await supabase.from('catalogue_images').insert(galleryPayload)
  }

  revalidatePath('/[locale]/catalogue', 'layout')
  revalidatePath('/[locale]/admin/catalogues', 'layout')
  return { success: true, item }
}

export async function updateCatalogueItem(
  id: string,
  data: any,
  costItems: any[] = [],
  imageGalleries: any[] = []
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('catalogues')
    .update({
      title: data.title,
      title_fr: data.titleFr || null,
      slug: data.slug,
      description: data.description,
      description_fr: data.descriptionFr || null,
      style: data.style,
      design_style_origin: data.designStyleOrigin,
      size_sqm: parseFloat(data.sizeSqm),
      bedrooms: parseInt(data.bedrooms) || 0,
      bathrooms: parseInt(data.bathrooms) || 0,
      floors: parseInt(data.floors) || 1,
      main_image_url: data.mainImageUrl,
      is_featured: data.isFeatured || false,
      is_published: data.isPublished || false,
    })
    .eq('id', id)

  if (error) {
    console.error('Failed to update catalogue item:', error)
    return { error: error.message }
  }

  // Synchronise cost items: delete all first, then insert
  await supabase.from('catalogue_cost_items').delete().eq('catalogue_id', id)
  if (costItems.length > 0) {
    const costPayload = costItems.map((c) => ({
      catalogue_id: id,
      label: c.label,
      label_fr: c.labelFr || null,
      cost: parseFloat(c.cost),
    }))
    await supabase.from('catalogue_cost_items').insert(costPayload)
  }

  // Synchronise gallery images: delete all first, then insert
  await supabase.from('catalogue_images').delete().eq('catalogue_id', id)
  if (imageGalleries.length > 0) {
    const galleryPayload = imageGalleries.map((img, idx) => ({
      catalogue_id: id,
      image_url: img.imageUrl,
      caption: img.caption || null,
      order_index: idx,
    }))
    await supabase.from('catalogue_images').insert(galleryPayload)
  }

  revalidatePath('/[locale]/catalogue', 'layout')
  revalidatePath('/[locale]/admin/catalogues', 'layout')
  return { success: true }
}

export async function deleteCatalogueItem(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('catalogues').delete().eq('id', id)

  if (error) {
    console.error('Failed to delete catalogue item:', error)
    return { error: error.message }
  }

  revalidatePath('/[locale]/catalogue', 'layout')
  revalidatePath('/[locale]/admin/catalogues', 'layout')
  return { success: true }
}

// ─── TEAM MEMBERS CRUD OPERATIONS ────────────────────────────────────────────

export async function createTeamMember(data: any) {
  const supabase = await createClient()

  const { error } = await supabase.from('team_members').insert([
    {
      full_name: data.fullName,
      title: data.title,
      title_fr: data.titleFr || null,
      phone: data.phone || null,
      photo_url: data.photoUrl || null,
      order_index: parseInt(data.orderIndex) || 0,
      is_visible: data.isVisible || true,
    },
  ])

  if (error) {
    console.error('Failed to create team member:', error)
    return { error: error.message }
  }

  revalidatePath('/[locale]/about', 'layout')
  revalidatePath('/[locale]/admin/team', 'layout')
  return { success: true }
}

export async function updateTeamMember(id: string, data: any) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('team_members')
    .update({
      full_name: data.fullName,
      title: data.title,
      title_fr: data.titleFr || null,
      phone: data.phone || null,
      photo_url: data.photoUrl || null,
      order_index: parseInt(data.orderIndex) || 0,
      is_visible: data.isVisible,
    })
    .eq('id', id)

  if (error) {
    console.error('Failed to update team member:', error)
    return { error: error.message }
  }

  revalidatePath('/[locale]/about', 'layout')
  revalidatePath('/[locale]/admin/team', 'layout')
  return { success: true }
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('team_members').delete().eq('id', id)

  if (error) {
    console.error('Failed to delete team member:', error)
    return { error: error.message }
  }

  revalidatePath('/[locale]/about', 'layout')
  revalidatePath('/[locale]/admin/team', 'layout')
  return { success: true }
}
