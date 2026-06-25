'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

type CommentResult =
  | { status: 'success' }
  | { status: 'error'; message: string }

export async function incrementBlogView(blogId: string): Promise<void> {
  const supabase = await createClient()
  await supabase.rpc('increment_blog_view', { p_blog_id: blogId })
}

export async function incrementBlogLike(blogId: string): Promise<void> {
  const supabase = await createClient()
  await supabase.rpc('increment_blog_like', { p_blog_id: blogId })
}

export async function submitBlogComment({
  blogId,
  authorName,
  authorEmail,
  body,
  parentCommentId,
}: {
  blogId: string
  authorName: string
  authorEmail?: string
  body: string
  parentCommentId?: string
}): Promise<CommentResult> {
  if (!authorName || authorName.trim().length < 2) {
    return { status: 'error', message: 'Name must be at least 2 characters.' }
  }
  if (!body || body.trim().length < 5) {
    return { status: 'error', message: 'Comment must be at least 5 characters.' }
  }
  if (authorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authorEmail)) {
    return { status: 'error', message: 'Invalid email address format.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.from('blog_comments').insert({
    blog_id: blogId,
    author_name: authorName.trim(),
    author_email: authorEmail ? authorEmail.trim().toLowerCase() : null,
    body: body.trim(),
    parent_comment_id: parentCommentId || null,
    is_approved: false, // Moderated by default
  })

  if (error) {
    return { status: 'error', message: error.message }
  }

  // Note: Since the comment is pending approval, it won't show in the public list immediately,
  // but we can revalidate the cache anyway.
  revalidatePath('/blog', 'layout')

  return { status: 'success' }
}
