import { createClient } from '@/utils/supabase/server'
import BlogsClient from './BlogsClient'

export default async function AdminBlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  // Load blogs, tags, and comments
  const [
    { data: blogs },
    { data: tags },
    { data: comments },
  ] = await Promise.all([
    supabase
      .from('blogs')
      .select('*, author:profiles(full_name)')
      .order('created_at', { ascending: false }),
    supabase.from('blog_tags').select('*').order('name', { ascending: true }),
    supabase
      .from('blog_comments')
      .select('*, blog:blogs(title, title_fr)')
      .order('created_at', { ascending: false }),
  ])

  // Get active tag assignments to pre-seed the tags in client side
  const blogIds = (blogs || []).map((b) => b.id)
  let assignments: any[] = []

  if (blogIds.length > 0) {
    const { data } = await supabase
      .from('blog_tag_assignments')
      .select('blog_id, tag_id')
      .in('blog_id', blogIds)
    assignments = data || []
  }

  return (
    <BlogsClient
      locale={locale}
      blogs={blogs || []}
      tags={tags || []}
      comments={comments || []}
      assignments={assignments}
    />
  )
}
