import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/utils/supabase/server'
import BlogListingClient from './BlogListingClient'

export const revalidate = 600 // Revalidate cache every 10 minutes

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })
  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()

  // Fetch tags
  const { data: tagsData } = await supabase
    .from('blog_tags')
    .select('id, name, name_fr, slug')
    .order('name', { ascending: true })

  // Fetch published blog posts with tags
  const { data: postsData } = await supabase
    .from('blogs')
    .select(`
      id,
      title,
      title_fr,
      slug,
      excerpt,
      excerpt_fr,
      header_photo_url,
      status,
      is_pinned,
      read_time_minutes,
      view_count,
      like_count,
      comment_count,
      published_at,
      created_at,
      blog_tag_assignments (
        blog_tags (
          id,
          name,
          name_fr,
          slug
        )
      )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  // Format tags correctly
  const tags = (tagsData ?? []).map((t) => ({
    id: t.id,
    name: t.name,
    nameFr: t.name_fr,
    slug: t.slug,
  }))

  // Format posts correctly
  const posts = (postsData ?? []).map((post: any) => ({
    id: post.id,
    title: post.title,
    titleFr: post.title_fr,
    slug: post.slug,
    excerpt: post.excerpt,
    excerptFr: post.excerpt_fr,
    headerPhotoUrl: post.header_photo_url,
    status: post.status,
    isPinned: post.is_pinned,
    readTimeMinutes: post.read_time_minutes,
    viewCount: post.view_count,
    likeCount: post.like_count,
    commentCount: post.comment_count,
    publishedAt: post.published_at,
    createdAt: post.created_at,
    tags: post.blog_tag_assignments
      ?.map((assignment: any) => {
        const tag = assignment.blog_tags
        if (!tag) return null
        return {
          id: tag.id,
          name: tag.name,
          nameFr: tag.name_fr,
          slug: tag.slug,
        }
      })
      .filter((t: any) => t !== null) ?? [],
  }))

  return (
    <BlogListingClient
      posts={posts}
      tags={tags}
      locale={locale}
    />
  )
}
