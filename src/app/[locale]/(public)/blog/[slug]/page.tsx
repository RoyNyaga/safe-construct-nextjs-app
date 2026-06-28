import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/utils/supabase/server'
import BlogDetailClient, { BlogTag } from './BlogDetailClient'

export const revalidate = 1800 // Revalidate cache every 30 minutes

async function getPostData(slug: string, isPreview: boolean = false) {
  const supabase = await createClient()

  // Fetch the main blog post
  let query = supabase
    .from('blogs')
    .select(`
      id,
      title,
      title_fr,
      slug,
      excerpt,
      excerpt_fr,
      body,
      body_fr,
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
    .eq('slug', slug)

  if (!isPreview) {
    query = query.eq('status', 'published')
  }

  const { data: post } = await query.maybeSingle()

  if (!post) return null

  // Format tags
  const tags: BlogTag[] = (post.blog_tag_assignments ?? [])
    .map((assignment: any) => {
      const tag = assignment.blog_tags
      if (!tag) return null
      return {
        id: tag.id,
        name: tag.name,
        nameFr: tag.name_fr,
        slug: tag.slug,
      }
    })
    .filter((t): t is BlogTag => t !== null)

  const formattedPost = {
    id: post.id,
    title: post.title,
    titleFr: post.title_fr,
    slug: post.slug,
    excerpt: post.excerpt,
    excerptFr: post.excerpt_fr,
    body: post.body,
    bodyFr: post.body_fr,
    headerPhotoUrl: post.header_photo_url,
    status: post.status,
    isPinned: post.is_pinned,
    readTimeMinutes: post.read_time_minutes,
    viewCount: post.view_count,
    likeCount: post.like_count,
    commentCount: post.comment_count,
    publishedAt: post.published_at,
    createdAt: post.created_at,
    tags,
  }

  // Fetch approved comments
  const { data: commentsData } = await supabase
    .from('blog_comments')
    .select('id, blog_id, author_name, body, parent_comment_id, created_at')
    .eq('blog_id', post.id)
    .eq('is_approved', true)
    .order('created_at', { ascending: true })

  const comments = (commentsData ?? []).map((c) => ({
    id: c.id,
    blogId: c.blog_id,
    authorName: c.author_name,
    body: c.body,
    parentCommentId: c.parent_comment_id,
    createdAt: c.created_at,
  }))

  // Fetch related posts (sharing at least one tag)
  let relatedPosts: any[] = []
  const tagIds = tags.map((t: any) => t.id)
  if (tagIds.length > 0) {
    const { data: relatedData } = await supabase
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
        blog_tag_assignments!inner(tag_id)
      `)
      .eq('status', 'published')
      .neq('id', post.id)
      .in('blog_tag_assignments.tag_id', tagIds)
      .order('published_at', { ascending: false })
      .limit(3)

    relatedPosts = (relatedData ?? []).map((p: any) => ({
      id: p.id,
      title: p.title,
      titleFr: p.title_fr,
      slug: p.slug,
      excerpt: p.excerpt,
      excerptFr: p.excerpt_fr,
      headerPhotoUrl: p.header_photo_url,
      status: p.status,
      isPinned: p.is_pinned,
      readTimeMinutes: p.read_time_minutes,
      viewCount: p.view_count,
      likeCount: p.like_count,
      commentCount: p.comment_count,
      publishedAt: p.published_at,
      createdAt: p.created_at,
      tags: [], // Tags not needed in related card grid preview in detail page
    }))
  }

  // Fetch adjacent posts
  const { data: prevPost } = await supabase
    .from('blogs')
    .select('title, title_fr, slug')
    .eq('status', 'published')
    .lt('published_at', post.published_at)
    .order('published_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: nextPost } = await supabase
    .from('blogs')
    .select('title, title_fr, slug')
    .eq('status', 'published')
    .gt('published_at', post.published_at)
    .order('published_at', { ascending: true })
    .limit(1)
    .maybeSingle()

  return {
    post: formattedPost,
    comments,
    relatedPosts,
    prevPost: prevPost ?? null,
    nextPost: nextPost ?? null,
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const isPreview = resolvedSearchParams.preview === 'true'
  const data = await getPostData(slug, isPreview)
  if (!data) return {}

  const post = data.post
  const title = locale === 'fr' && post.titleFr ? post.titleFr : post.title
  const description = locale === 'fr' && post.excerptFr ? post.excerptFr : post.excerpt || ''
  const imageUrl = post.headerPhotoUrl || 'https://safe-construct.cm/default-blog.jpg'

  return {
    title,
    description,
    alternates: {
      canonical: `https://safe-construct.cm/${locale}/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://safe-construct.cm/${locale}/blog/${post.slug}`,
      siteName: 'Safe-Construct',
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function BlogDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug, locale } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const isPreview = resolvedSearchParams.preview === 'true'
  const data = await getPostData(slug, isPreview)

  if (!data) {
    notFound()
  }

  // Prepare structured JSON-LD data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: locale === 'fr' && data.post.titleFr ? data.post.titleFr : data.post.title,
    image: data.post.headerPhotoUrl || 'https://safe-construct.cm/default-blog.jpg',
    datePublished: data.post.publishedAt,
    dateModified: data.post.createdAt,
    author: {
      '@type': 'Organization',
      name: 'Safe-Construct Editor',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Safe-Construct',
      logo: {
        '@type': 'ImageObject',
        url: 'https://safe-construct.cm/logo.png',
      },
    },
    description: locale === 'fr' && data.post.excerptFr ? data.post.excerptFr : data.post.excerpt,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient
        post={data.post}
        comments={data.comments}
        relatedPosts={data.relatedPosts}
        prevPost={data.prevPost}
        nextPost={data.nextPost}
        locale={locale}
        isPreview={isPreview}
      />
    </>
  )
}
