'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Box, Container, Typography, Grid, Chip, Button,
  Avatar, Divider, TextField, IconButton, Paper, alpha,
  Card, CardMedia, CardContent
} from '@mui/material'
import {
  Heart, Eye, MessageSquare, Calendar, Clock, ArrowLeft,
  ArrowRight, Share2, Link as LinkIcon,
  CornerDownRight, Check, Send, X
} from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import CustomNotification, { NotificationOptions } from '@/components/ui/CustomNotification'
import CustomTooltip from '@/components/ui/CustomTooltip'
import { incrementBlogView, incrementBlogLike, submitBlogComment } from '@/app/[locale]/actions/blog'
import { subscribeNewsletter } from '@/app/[locale]/actions/newsletter'

// Custom social SVG icons
function TwitterIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.334 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.7 0 3.2 1.777 3.2 4.086v4.717z"/>
    </svg>
  )
}

export type BlogTag = {
  id: string
  name: string
  nameFr: string | null
  slug: string
}

export type BlogPost = {
  id: string
  title: string
  titleFr: string | null
  slug: string
  excerpt: string | null
  excerptFr: string | null
  body: string
  bodyFr: string | null
  headerPhotoUrl: string | null
  status: string
  isPinned: boolean
  readTimeMinutes: number | null
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt: string | null
  createdAt: string
  tags: BlogTag[]
}

export type BlogComment = {
  id: string
  blogId: string
  authorName: string
  body: string
  parentCommentId: string | null
  createdAt: string
  isPending?: boolean // Local UI state only
}

interface BlogDetailClientProps {
  post: BlogPost
  comments: BlogComment[]
  relatedPosts: BlogPost[]
  prevPost: { title: string; title_fr: string | null; slug: string } | null
  nextPost: { title: string; title_fr: string | null; slug: string } | null
  locale: string
  isPreview?: boolean
}

export default function BlogDetailClient({
  post,
  comments,
  relatedPosts,
  prevPost,
  nextPost,
  locale,
  isPreview = false
}: BlogDetailClientProps) {
  const t = useTranslations('Blog')
  const [localComments, setLocalComments] = useState<BlogComment[]>(comments)
  const [likesCount, setLikesCount] = useState(post.likeCount)
  const [hasLiked, setHasLiked] = useState(false)
  const [viewCount, setViewCount] = useState(post.viewCount)

  // Sharing url
  const [shareUrl, setShareUrl] = useState('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href)
    }
  }, [])

  // View count increment on mount
  useEffect(() => {
    if (isPreview) return // Skip view count increment in preview mode
    incrementBlogView(post.id)
      .then(() => setViewCount((prev) => prev + 1))
      .catch(() => {})
  }, [post.id, isPreview])

  // Check if liked in this browser session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const liked = localStorage.getItem(`liked_blog_${post.id}`) === 'true'
      setHasLiked(liked)
    }
  }, [post.id])

  // Comments form state
  const [commentName, setCommentName] = useState('')
  const [commentEmail, setCommentEmail] = useState('')
  const [commentBody, setCommentBody] = useState('')
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null)
  const [submittingComment, setSubmittingComment] = useState(false)

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false)

  // Notifications
  const [notification, setNotification] = useState<NotificationOptions>({
    open: false,
    message: '',
    severity: 'success',
  })

  // Group comments for threading (1 level deep)
  const groupedComments = useMemo(() => {
    const roots = localComments.filter((c) => !c.parentCommentId)
    const replies = localComments.filter((c) => c.parentCommentId)
    return roots.map((root) => ({
      ...root,
      replies: replies.filter((rep) => rep.parentCommentId === root.id),
    }))
  }, [localComments])

  const handleLike = async () => {
    if (isPreview) {
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Interactions désactivées en mode aperçu.' : 'Interactions are disabled in preview mode.',
        severity: 'warning',
      })
      return
    }

    if (hasLiked) {
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Vous avez déjà aimé cet article.' : 'You already liked this article.',
        severity: 'info',
      })
      return
    }

    try {
      await incrementBlogLike(post.id)
      localStorage.setItem(`liked_blog_${post.id}`, 'true')
      setHasLiked(true)
      setLikesCount((prev) => prev + 1)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Merci pour votre intérêt !' : 'Thank you for liking!',
        severity: 'success',
      })
    } catch {
      setNotification({
        open: true,
        message: 'Could not submit like. Please try again.',
        severity: 'error',
      })
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isPreview) {
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Les commentaires sont désactivés en mode aperçu.' : 'Comments are disabled in preview mode.',
        severity: 'warning',
      })
      return
    }

    if (!commentName.trim() || !commentBody.trim()) return

    setSubmittingComment(true)
    try {
      const res = await submitBlogComment({
        blogId: post.id,
        authorName: commentName,
        authorEmail: commentEmail || undefined,
        body: commentBody,
        parentCommentId: replyToCommentId || undefined,
      })

      if (res.status === 'success') {
        // Add pending comment to local state immediately
        const newPendingComment: BlogComment = {
          id: Math.random().toString(), // Temp ID
          blogId: post.id,
          authorName: commentName.trim(),
          body: commentBody.trim(),
          parentCommentId: replyToCommentId,
          createdAt: new Date().toISOString(),
          isPending: true,
        }

        setLocalComments((prev) => [...prev, newPendingComment])

        setNotification({
          open: true,
          message: locale === 'fr'
            ? 'Votre commentaire a été soumis et est en attente de modération.'
            : 'Your comment has been submitted and is pending moderation.',
          severity: 'info',
        })

        // Reset form
        setCommentBody('')
        setReplyToCommentId(null)
      } else {
        setNotification({
          open: true,
          message: res.message || 'An error occurred.',
          severity: 'error',
        })
      }
    } catch {
      setNotification({
        open: true,
        message: 'Network error. Please try again.',
        severity: 'error',
      })
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setSubmittingNewsletter(true)
    try {
      const res = await subscribeNewsletter(newsletterEmail)
      if (res.status === 'success') {
        setNotification({
          open: true,
          message: locale === 'fr' ? 'Inscription réussie !' : 'Successfully subscribed!',
          severity: 'success',
        })
        setNewsletterEmail('')
      } else if (res.status === 'duplicate') {
        setNotification({
          open: true,
          message: locale === 'fr' ? 'Vous êtes déjà inscrit !' : "You're already subscribed!",
          severity: 'info',
        })
      } else {
        setNotification({
          open: true,
          message: res.message || 'An error occurred.',
          severity: 'error',
        })
      }
    } catch {
      setNotification({
        open: true,
        message: 'Network error. Please try again.',
        severity: 'error',
      })
    } finally {
      setSubmittingNewsletter(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setNotification({
      open: true,
      message: locale === 'fr' ? 'Lien copié !' : 'Link copied to clipboard!',
      severity: 'success',
    })
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const postTitle = locale === 'fr' && post.titleFr ? post.titleFr : post.title
  const postBody = locale === 'fr' && post.bodyFr ? post.bodyFr : post.body
  const getTagName = (tag: BlogTag) => (locale === 'fr' && tag.nameFr ? tag.nameFr : tag.name)
  const getRelatedTitle = (p: BlogPost) => (locale === 'fr' && p.titleFr ? p.titleFr : p.title)
  const getRelatedExcerpt = (p: BlogPost) => (locale === 'fr' && p.excerptFr ? p.excerptFr : p.excerpt || '')

  return (
    <Box sx={{ pb: 12 }}>
      {isPreview && (
        <Box
          sx={{
            backgroundColor: 'warning.main',
            color: 'warning.contrastText',
            py: 1.5,
            px: 2,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            letterSpacing: '0.05rem',
            textTransform: 'uppercase',
            borderBottom: '1px solid',
            borderColor: 'warning.dark',
            zIndex: 1000,
            position: 'sticky',
            top: 0,
            boxShadow: 2,
          }}
        >
          {locale === 'fr'
            ? "Mode Aperçu - Cet article n'est pas encore publié ou est affiché sans statistiques"
            : 'Preview Mode - This article is draft/unpublished and interactions are disabled'}
        </Box>
      )}
      {/* ── Header Photo Banner ────────────────────────────────── */}
      <Box
        sx={{
          height: { xs: '35vh', md: '50vh' },
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          image={post.headerPhotoUrl || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200'}
          alt={postTitle}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(18,24,36,0.3) 0%, #121824 100%)',
          }}
        />
      </Box>

      {/* ── Main Article Layout ────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 10 }}>
        <Grid container spacing={4}>
          {/* Main Content Column */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              sx={{
                p: { xs: 3, sm: 5 },
                borderRadius: 4,
                backgroundColor: '#1E2635',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              {/* Breadcrumbs */}
              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                <Typography
                  component={Link}
                  href={`/${locale}`}
                  variant="caption"
                  color="text.secondary"
                  sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  Home
                </Typography>
                <Typography variant="caption" color="text.secondary">/</Typography>
                <Typography
                  component={Link}
                  href={`/${locale}/blog`}
                  variant="caption"
                  color="text.secondary"
                  sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                >
                  Blog
                </Typography>
                <Typography variant="caption" color="text.secondary">/</Typography>
                <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
                  {postTitle.length > 30 ? postTitle.slice(0, 30) + '...' : postTitle}
                </Typography>
              </Box>

              {/* Title */}
              <Typography variant="h1" sx={{ mb: 3, fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
                {postTitle}
              </Typography>

              {/* Meta Row */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontWeight: 700 }}>
                  SC
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Safe-Construct Editor
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary', mt: 0.25 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Calendar size={12} />
                      <Typography variant="caption">{post.publishedAt ? formatDate(post.publishedAt) : ''}</Typography>
                    </Box>
                    {post.readTimeMinutes && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Clock size={12} />
                        <Typography variant="caption">{t('card.minRead', { min: post.readTimeMinutes })}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, ml: { xs: 0, sm: 'auto' }, color: 'text.secondary' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Eye size={14} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{viewCount}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Heart size={14} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{likesCount}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Tag Pills */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {post.tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={getTagName(tag)}
                    component={Link}
                    href={`/${locale}/blog?tag=${tag.slug}`}
                    clickable
                    size="small"
                    sx={{
                      bgcolor: alpha('#F26419', 0.12),
                      color: 'primary.main',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { bgcolor: alpha('#F26419', 0.2) },
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Rich Body Render */}
              <Box
                sx={{
                  color: 'text.primary',
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                  maxWidth: '70ch',
                  mx: 'auto',
                  '& h2': { fontSize: '1.5rem', mt: 4, mb: 2, fontWeight: 700, color: 'text.primary' },
                  '& h3': { fontSize: '1.25rem', mt: 3, mb: 1.5, fontWeight: 600, color: 'text.primary' },
                  '& p': { mb: 2.5, color: 'text.secondary' },
                  '& ul, & ol': { mb: 2.5, pl: 3, color: 'text.secondary' },
                  '& li': { mb: 1 },
                  '& blockquote': {
                    borderLeft: '4px solid #F26419',
                    pl: 3,
                    py: 1,
                    my: 3,
                    bgcolor: 'rgba(242,100,25,0.03)',
                    fontStyle: 'italic',
                    borderRadius: '0 8px 8px 0',
                  },
                }}
                dangerouslySetInnerHTML={{ __html: postBody || '' }}
              />

              {/* ── Mid-Article Newsletter Subscribe CTA ── */}
              <Paper
                sx={{
                  p: { xs: 3, sm: 4 },
                  mt: 6,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(242, 100, 25, 0.08) 0%, rgba(30, 38, 53, 0.6) 100%)',
                  border: '1px solid',
                  borderColor: alpha('#F26419', 0.2),
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                  {locale === 'fr' ? 'Cet article vous plaît ?' : 'Enjoying this article?'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {locale === 'fr'
                    ? 'Inscrivez-vous à notre newsletter pour recevoir d\'autres conseils et analyses sur votre boîte mail.'
                    : 'Join our newsletter for more construction insights and updates delivered to your inbox.'}
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleNewsletterSubmit}
                  sx={{ display: 'flex', gap: 1.5, maxWidth: 400, mx: 'auto', flexDirection: { xs: 'column', sm: 'row' } }}
                >
                  <TextField
                    id="newsletter-blog-detail-email"
                    type="email"
                    required
                    placeholder={locale === 'fr' ? 'Votre adresse e-mail' : 'Enter your email'}
                    size="small"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <Button
                    id="newsletter-blog-detail-submit"
                    type="submit"
                    variant="contained"
                    disabled={submittingNewsletter}
                    sx={{
                      background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                      fontWeight: 700,
                      '&:hover': { background: 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)' },
                    }}
                  >
                    {submittingNewsletter ? '...' : (locale === 'fr' ? 'S\'abonner' : 'Subscribe')}
                  </Button>
                </Box>
              </Paper>

              <Divider sx={{ my: 4 }} />

              {/* Social Engagement Actions */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  id="blog-detail-like-btn"
                  onClick={handleLike}
                  variant="outlined"
                  startIcon={<Heart size={16} fill={hasLiked ? '#F26419' : 'none'} color={hasLiked ? '#F26419' : 'currentColor'} />}
                  sx={{
                    borderColor: hasLiked ? '#F26419' : 'rgba(255,255,255,0.12)',
                    color: hasLiked ? '#F26419' : 'text.primary',
                    '&:hover': {
                      borderColor: '#F26419',
                      background: alpha('#F26419', 0.05),
                    },
                    borderRadius: 3,
                  }}
                >
                  {locale === 'fr' ? 'Aimer' : 'Like'} ({likesCount})
                </Button>

                {/* Share Row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mr: 1, fontWeight: 600 }}>
                    {locale === 'fr' ? 'PARTAGER' : 'SHARE'}
                  </Typography>

                  <CustomTooltip title={locale === 'fr' ? 'Copier le lien' : 'Copy link'}>
                    <IconButton size="small" onClick={copyToClipboard} sx={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                      <LinkIcon size={14} />
                    </IconButton>
                  </CustomTooltip>

                  <CustomTooltip title="Share on Twitter / X">
                    <IconButton
                      size="small"
                      component="a"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(postTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <TwitterIcon size={14} />
                    </IconButton>
                  </CustomTooltip>

                  <CustomTooltip title="Share on LinkedIn">
                    <IconButton
                      size="small"
                      component="a"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <LinkedinIcon size={14} />
                    </IconButton>
                  </CustomTooltip>

                  <CustomTooltip title="Share on WhatsApp">
                    <IconButton
                      size="small"
                      component="a"
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' ' + shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ border: '1px solid rgba(255,255,255,0.06)', color: '#25D366' }}
                    >
                      <Share2 size={14} />
                    </IconButton>
                  </CustomTooltip>
                </Box>
              </Box>
            </Paper>

            {/* ── Comments Section ──────────────────────────────── */}
            <Paper
              sx={{
                p: { xs: 3, sm: 5 },
                mt: 4,
                borderRadius: 4,
                backgroundColor: '#1E2635',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MessageSquare size={22} color="#F26419" />
                {t('post.comments')} ({localComments.length})
              </Typography>

              {/* Comments List */}
              {groupedComments.length === 0 ? (
                <Typography color="text.secondary" sx={{ fontStyle: 'italic', mb: 5 }}>
                  {t('post.noComments')}
                </Typography>
              ) : (
                <Box sx={{ mb: 5 }}>
                  {groupedComments.map((comment) => (
                    <Box key={comment.id} sx={{ mb: 3.5 }}>
                      {/* Root Comment */}
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: 3,
                          backgroundColor: alpha('#121824', 0.5),
                          border: '1px solid rgba(255,255,255,0.03)',
                          opacity: comment.isPending ? 0.6 : 1,
                          position: 'relative',
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', width: 28, height: 28, fontSize: '0.8rem', fontWeight: 700 }}>
                              {comment.authorName.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {comment.authorName}
                            </Typography>
                            {comment.isPending && (
                              <Chip
                                label={t('post.commentPending')}
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: '0.65rem',
                                  bgcolor: 'warning.dark',
                                  color: '#fff',
                                }}
                              />
                            )}
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(comment.createdAt)}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ pl: 5.5, whiteSpace: 'pre-line' }}>
                          {comment.body}
                        </Typography>

                        {/* Reply action button */}
                        {!comment.isPending && (
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button
                              id={`reply-to-${comment.id}`}
                              size="small"
                              variant="text"
                              onClick={() => setReplyToCommentId(comment.id)}
                              sx={{ fontSize: '0.75rem', fontWeight: 700, py: 0.25 }}
                            >
                              {locale === 'fr' ? 'Répondre' : 'Reply'}
                            </Button>
                          </Box>
                        )}
                      </Box>

                      {/* Nested Replies */}
                      {comment.replies.map((reply) => (
                        <Box
                          key={reply.id}
                          sx={{
                            ml: { xs: 3, sm: 6 },
                            mt: 1.5,
                            display: 'flex',
                            gap: 1.5,
                          }}
                        >
                          <CornerDownRight size={16} color="rgba(255,255,255,0.2)" style={{ marginTop: 12 }} />
                          <Box
                            sx={{
                              flex: 1,
                              p: 2,
                              borderRadius: 3,
                              backgroundColor: alpha('#121824', 0.25),
                              border: '1px solid rgba(255,255,255,0.02)',
                              opacity: reply.isPending ? 0.6 : 1,
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.08)', width: 24, height: 24, fontSize: '0.7rem', fontWeight: 600 }}>
                                  {reply.authorName.charAt(0).toUpperCase()}
                                </Avatar>
                                <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                                  {reply.authorName}
                                </Typography>
                                {reply.isPending && (
                                  <Chip
                                    label={t('post.commentPending')}
                                    size="small"
                                    sx={{
                                      height: 16,
                                      fontSize: '0.6rem',
                                      bgcolor: 'warning.dark',
                                      color: '#fff',
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                {formatDate(reply.createdAt)}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ pl: 5, fontSize: '0.9rem', whiteSpace: 'pre-line' }}>
                              {reply.body}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              )}

              <Divider sx={{ mb: 4 }} />

              {/* Comment submission form */}
              <Box component="form" onSubmit={handleCommentSubmit}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {replyToCommentId
                    ? (locale === 'fr' ? 'Répondre au commentaire' : 'Reply to comment')
                    : t('post.leaveComment')}
                </Typography>
                {replyToCommentId && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Typography variant="caption" color="primary.main">
                      {locale === 'fr' ? 'Réponse au commentaire de' : 'Replying to'}{' '}
                      <strong>
                        {localComments.find((c) => c.id === replyToCommentId)?.authorName}
                      </strong>
                    </Typography>
                    <IconButton size="small" onClick={() => setReplyToCommentId(null)} sx={{ color: 'error.main' }}>
                      <X size={12} />
                    </IconButton>
                  </Box>
                )}

                <Grid container spacing={2} sx={{ mb: 2.5 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      id="comment-name"
                      required
                      fullWidth
                      placeholder={t('post.commentName')}
                      size="small"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      id="comment-email"
                      fullWidth
                      placeholder={locale === 'fr' ? 'Votre E-mail (facultatif, masqué)' : 'Email Address (optional, hidden)'}
                      size="small"
                      type="email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      id="comment-body"
                      required
                      fullWidth
                      multiline
                      rows={4}
                      placeholder={t('post.commentText')}
                      value={commentBody}
                      onChange={(e) => setCommentBody(e.target.value)}
                      slotProps={{
                        input: {
                          sx: { borderRadius: 2 },
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Button
                  id="comment-submit"
                  type="submit"
                  variant="contained"
                  disabled={submittingComment}
                  endIcon={submittingComment ? <Check size={16} /> : <Send size={16} />}
                  sx={{
                    background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                    fontWeight: 700,
                    px: 4,
                    '&:hover': { background: 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)' },
                  }}
                >
                  {submittingComment
                    ? (locale === 'fr' ? 'Envoi...' : 'Submitting...')
                    : t('post.submitComment')}
                </Button>
              </Box>
            </Paper>

            {/* Adjacent Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, gap: 2, flexWrap: 'wrap' }}>
              {prevPost ? (
                <Button
                  id="blog-nav-prev"
                  component={Link}
                  href={`/${locale}/blog/${prevPost.slug}`}
                  variant="text"
                  startIcon={<ArrowLeft size={16} />}
                  sx={{
                    textAlign: 'left',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {locale === 'fr' ? 'PRÉCÉDENT' : 'PREVIOUS'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5, maxWidth: 200, overflow: 'hidden', textTransform: 'none' }}>
                    {locale === 'fr' && prevPost.title_fr ? prevPost.title_fr : prevPost.title}
                  </Typography>
                </Button>
              ) : (
                <Box />
              )}

              {nextPost ? (
                <Button
                  id="blog-nav-next"
                  component={Link}
                  href={`/${locale}/blog/${nextPost.slug}`}
                  variant="text"
                  endIcon={<ArrowRight size={16} />}
                  sx={{
                    textAlign: 'right',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {locale === 'fr' ? 'SUIVANT' : 'NEXT'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.5, maxWidth: 200, overflow: 'hidden', textTransform: 'none' }}>
                    {locale === 'fr' && nextPost.title_fr ? nextPost.title_fr : nextPost.title}
                  </Typography>
                </Button>
              ) : (
                <Box />
              )}
            </Box>
          </Grid>

          {/* Right Sidebar Column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Sticky Info Panel */}
              <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: '#1E2635', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, color: 'primary.main' }}>
                  {locale === 'fr' ? 'À propos de l\'Éditeur' : 'About the Editor'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {locale === 'fr'
                    ? 'Safe-Construct est un cabinet de premier plan spécialisé dans l\'architecture et la construction de duplex et de villas haut de gamme au Cameroun.'
                    : 'Safe-Construct is a leading firm specializing in modern architectural designs and high-quality construction of premium villas and duplexes in Cameroon.'}
                </Typography>
                <Button
                  id="blog-sidebar-about"
                  component={Link}
                  href={`/${locale}/contact`}
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ fontWeight: 600 }}
                >
                  {locale === 'fr' ? 'Discuter avec nous' : 'Talk with an Expert'}
                </Button>
              </Paper>

              {/* Share Box */}
              <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: '#1E2635', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>
                  {locale === 'fr' ? 'Aimez-vous cet article ?' : 'Enjoying the Read?'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                  {locale === 'fr' ? 'Soutenez-nous en aimant ou en partageant cet article avec vos proches.' : 'Support our writers by liking or sharing this article with your network.'}
                </Typography>
                <Button
                  id="blog-sidebar-like"
                  onClick={handleLike}
                  variant="contained"
                  fullWidth
                  startIcon={<Heart size={16} fill={hasLiked ? '#fff' : 'none'} />}
                  sx={{
                    background: hasLiked ? 'success.main' : 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                    fontWeight: 700,
                    '&:hover': {
                      background: hasLiked ? 'success.dark' : 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)',
                    },
                  }}
                >
                  {hasLiked ? (locale === 'fr' ? 'Aimé !' : 'Liked!') : (locale === 'fr' ? 'Aimer l\'article' : 'Like Article')}
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ── Related Posts Section ─────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <Box sx={{ mt: 12, py: 10, bgcolor: alpha('#1E2635', 0.4), borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 5 }}>
              {locale === 'fr' ? 'Vous devriez aussi aimer' : 'You might also enjoy'}
            </Typography>

            <Grid container spacing={3}>
              {relatedPosts.map((postItem) => (
                <Grid key={postItem.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      backgroundColor: '#1E2635',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                        borderColor: alpha('#F26419', 0.2),
                      },
                    }}
                  >
                    <Box
                      component={Link}
                      href={`/${locale}/blog/${postItem.slug}`}
                      sx={{ position: 'relative', pt: '56.25%', display: 'block', overflow: 'hidden' }}
                    >
                      <CardMedia
                        component="img"
                        image={postItem.headerPhotoUrl || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200'}
                        alt={getRelatedTitle(postItem)}
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          '.MuiCard-root:hover &': { transform: 'scale(1.04)' },
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1.5, color: 'text.secondary' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Calendar size={12} />
                          <Typography variant="caption" sx={{ fontSize: '0.72rem' }}>
                            {postItem.publishedAt ? formatDate(postItem.publishedAt) : ''}
                          </Typography>
                        </Box>
                        {postItem.readTimeMinutes && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Clock size={12} />
                            <Typography variant="caption" sx={{ fontSize: '0.72rem' }}>
                              {t('card.minRead', { min: postItem.readTimeMinutes })}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      <Typography
                        variant="h5"
                        component={Link}
                        href={`/${locale}/blog/${postItem.slug}`}
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          fontSize: '1.05rem',
                          lineHeight: 1.35,
                          textDecoration: 'none',
                          color: 'text.primary',
                          '&:hover': { color: 'primary.main' },
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: 44,
                        }}
                      >
                        {getRelatedTitle(postItem)}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: 44,
                        }}
                      >
                        {getRelatedExcerpt(postItem)}
                      </Typography>

                      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 1.5, color: 'text.secondary' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Eye size={12} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>{postItem.viewCount}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Heart size={12} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>{postItem.likeCount}</Typography>
                          </Box>
                        </Box>

                        <Button
                          id={`blog-related-link-${postItem.slug}`}
                          component={Link}
                          href={`/${locale}/blog/${postItem.slug}`}
                          variant="text"
                          size="small"
                          endIcon={<ArrowRight size={14} />}
                          sx={{ p: 0, fontWeight: 700, minWidth: 'auto', '&:hover': { bgcolor: 'transparent' } }}
                        >
                          {t('card.readMore')}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Branded Toasts */}
      <CustomNotification
        options={notification}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  )
}
