'use client'

import { useState, useMemo } from 'react'
import {
  Box, Container, Typography, Card, CardContent, CardMedia,
  Grid, TextField, InputAdornment, IconButton, Chip, Button,
  Select, MenuItem, FormControl, InputLabel, Avatar, alpha
} from '@mui/material'
import {
  Search, Eye, Heart, MessageSquare, Calendar, Clock,
  ArrowRight, Mail, X
} from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import CustomNotification, { NotificationOptions } from '@/components/ui/CustomNotification'
import { subscribeNewsletter } from '@/app/[locale]/actions/newsletter'

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

interface BlogListingClientProps {
  posts: BlogPost[]
  tags: BlogTag[]
  locale: string
}

export default function BlogListingClient({ posts, tags, locale }: BlogListingClientProps) {
  const t = useTranslations('Blog')
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [sort, setSort] = useState('newest')
  const [visibleCount, setVisibleCount] = useState(6)

  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false)
  const [notification, setNotification] = useState<NotificationOptions>({
    open: false,
    message: '',
    severity: 'success',
  })

  // Hero post is the pinned one, or the latest post
  const heroPost = useMemo(() => {
    if (posts.length === 0) return null
    return posts.find((p) => p.isPinned) || posts[0]
  }, [posts])

  // Filtered and sorted list
  const filtered = useMemo(() => {
    let list = [...posts]

    // Tag filter
    if (selectedTag !== 'all') {
      list = list.filter((p) => p.tags.some((t) => t.slug === selectedTag))
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((p) => {
        const title = (locale === 'fr' ? p.titleFr || p.title : p.title).toLowerCase()
        const excerpt = (locale === 'fr' ? p.excerptFr || p.excerpt || '' : p.excerpt || '').toLowerCase()
        return title.includes(q) || excerpt.includes(q)
      })
    }

    // Sort filter
    if (sort === 'most_viewed') {
      list.sort((a, b) => b.viewCount - a.viewCount)
    } else if (sort === 'most_liked') {
      list.sort((a, b) => b.likeCount - a.likeCount)
    } else {
      // Newest
      list.sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
        return dateB - dateA
      })
    }

    return list
  }, [posts, selectedTag, search, sort, locale])

  // Grid posts: Exclude hero post ONLY if no filter is active
  const gridPosts = useMemo(() => {
    if (selectedTag === 'all' && !search.trim()) {
      return filtered.filter((p) => p.id !== heroPost?.id)
    }
    return filtered
  }, [filtered, heroPost, selectedTag, search])

  const visiblePosts = useMemo(() => {
    return gridPosts.slice(0, visibleCount)
  }, [gridPosts, visibleCount])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setSubmittingNewsletter(true)
    try {
      const res = await subscribeNewsletter(newsletterEmail)
      if (res.status === 'success') {
        setNotification({
          open: true,
          message: locale === 'fr' ? 'Inscription réussie ! Merci.' : 'Successfully subscribed! Thank you.',
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

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getPostTitle = (p: BlogPost) => (locale === 'fr' && p.titleFr ? p.titleFr : p.title)
  const getPostExcerpt = (p: BlogPost) => (locale === 'fr' && p.excerptFr ? p.excerptFr : p.excerpt || '')
  const getTagName = (t: BlogTag) => (locale === 'fr' && t.nameFr ? t.nameFr : t.name)

  return (
    <Box sx={{ pb: 10 }}>
      {/* ── Page Header ──────────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #0E1420 0%, #121824 100%)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(242,100,25,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242,100,25,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.4) 0%, transparent 80%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 2 }}
          >
            Safe-Construct Insights
          </Typography>
          <Typography variant="h1" sx={{ mb: 2.5 }}>
            {t('title')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
            {t('subtitle')}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, position: 'relative', zIndex: 10 }}>
        {/* ── Featured/Hero Post ────────────────────────────────── */}
        {heroPost && selectedTag === 'all' && !search.trim() && (
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              mb: 8,
              border: '1px solid',
              borderColor: alpha('#F26419', 0.15),
            }}
          >
            <Box sx={{ flex: 1.2, minHeight: { xs: 260, md: 400 }, position: 'relative' }}>
              <CardMedia
                component="img"
                image={heroPost.headerPhotoUrl || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200'}
                alt={getPostTitle(heroPost)}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(18, 24, 36, 0.4), transparent)',
                }}
              />
            </Box>
            <CardContent
              sx={{
                flex: 1,
                p: { xs: 4, md: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#1E2635',
              }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip
                  label={locale === 'fr' ? 'À la Une' : 'Featured'}
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg,#F26419,#F6AE2D)',
                    color: '#fff',
                    fontWeight: 700,
                  }}
                />
                {heroPost.tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={getTagName(tag)}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'text.secondary' }}
                  />
                ))}
              </Box>

              <Typography variant="h3" sx={{ mb: 2, fontWeight: 800, lineHeight: 1.2 }}>
                {getPostTitle(heroPost)}
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 3.5, lineHeight: 1.6, fontSize: '1rem' }}>
                {getPostExcerpt(heroPost)}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem', fontWeight: 600 }}>
                  SC
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Safe-Construct Editor
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary', mt: 0.25 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Calendar size={12} />
                      <Typography variant="caption">{formatDate(heroPost.publishedAt)}</Typography>
                    </Box>
                    {heroPost.readTimeMinutes && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Clock size={12} />
                        <Typography variant="caption">{t('card.minRead', { min: heroPost.readTimeMinutes })}</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              <Button
                id={`hero-read-btn-${heroPost.slug}`}
                component={Link}
                href={`/${locale}/blog/${heroPost.slug}`}
                variant="contained"
                endIcon={<ArrowRight size={16} />}
                sx={{
                  alignSelf: 'flex-start',
                  background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                  '&:hover': { background: 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)' },
                }}
              >
                {t('card.readMore')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ── Filter Bar ──────────────────────────────────────── */}
        <Card sx={{ p: 2.5, mb: 6, borderRadius: 3, backgroundColor: '#1E2635' }}>
          <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search */}
            <TextField
              id="blog-search"
              size="small"
              placeholder={t('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, minWidth: 240 }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start"><Search size={16} opacity={0.5} /></InputAdornment>,
                  endAdornment: search ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearch('')}><X size={14} /></IconButton>
                    </InputAdornment>
                  ) : null,
                },
              }}
            />

            {/* Sort selection */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="blog-sort-label">{locale === 'fr' ? 'Trier par' : 'Sort By'}</InputLabel>
              <Select
                id="blog-sort"
                labelId="blog-sort-label"
                label={locale === 'fr' ? 'Trier par' : 'Sort By'}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="newest">{locale === 'fr' ? 'Plus récents' : 'Newest'}</MenuItem>
                <MenuItem value="most_viewed">{locale === 'fr' ? 'Plus consultés' : 'Most Viewed'}</MenuItem>
                <MenuItem value="most_liked">{locale === 'fr' ? 'Plus aimés' : 'Most Liked'}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Tags Pills Row */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              mt: 2.5,
              pb: 0.5,
              '::-webkit-scrollbar': { height: 4 },
              '::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 },
            }}
          >
            <Chip
              label={t('filters.all')}
              clickable
              onClick={() => setSelectedTag('all')}
              sx={{
                fontWeight: 600,
                backgroundColor: selectedTag === 'all' ? 'primary.main' : 'rgba(255,255,255,0.06)',
                color: '#fff',
                '&:hover': { backgroundColor: selectedTag === 'all' ? 'primary.dark' : 'rgba(255,255,255,0.12)' },
              }}
            />
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                label={getTagName(tag)}
                clickable
                onClick={() => setSelectedTag(tag.slug)}
                sx={{
                  fontWeight: 600,
                  backgroundColor: selectedTag === tag.slug ? 'primary.main' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  '&:hover': { backgroundColor: selectedTag === tag.slug ? 'primary.dark' : 'rgba(255,255,255,0.12)' },
                }}
              />
            ))}
          </Box>
        </Card>

        {/* ── Empty State ────────────────────────────────────── */}
        {visiblePosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h1" sx={{ fontSize: '4.5rem', mb: 2 }}>✍️</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {locale === 'fr' ? 'Aucun article trouvé' : 'No articles found'}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              {locale === 'fr'
                ? 'Essayez de modifier votre recherche ou filtre par tag.'
                : 'Try adjusting your search query or tag selection.'}
            </Typography>
            <Button
              id="blog-empty-reset"
              variant="outlined"
              onClick={() => {
                setSearch('')
                setSelectedTag('all')
              }}
            >
              {locale === 'fr' ? 'Réinitialiser les filtres' : 'Reset Filters'}
            </Button>
          </Box>
        ) : (
          /* ── Blog Cards Grid ────────────────────────────────── */
          <Box>
            <Grid container spacing={3}>
              {visiblePosts.map((post, idx) => (
                <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      opacity: 0,
                      animation: `fadeUp 0.4s ease ${idx * 0.05}s forwards`,
                      '@keyframes fadeUp': {
                        from: { opacity: 0, transform: 'translateY(20px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                        borderColor: alpha('#F26419', 0.2),
                      },
                    }}
                  >
                    {/* Card Image */}
                    <Box
                      component={Link}
                      href={`/${locale}/blog/${post.slug}`}
                      sx={{ position: 'relative', pt: '56.25%', display: 'block', overflow: 'hidden' }}
                    >
                      <CardMedia
                        component="img"
                        image={post.headerPhotoUrl || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200'}
                        alt={getPostTitle(post)}
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
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          left: 8,
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.5,
                          zIndex: 10,
                        }}
                      >
                        {post.tags.slice(0, 2).map((tag) => (
                          <Chip
                            key={tag.id}
                            label={getTagName(tag)}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(18, 24, 36, 0.8)',
                              color: '#fff',
                              fontWeight: 600,
                              fontSize: '0.65rem',
                              height: 20,
                              backdropFilter: 'blur(4px)',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Card Content */}
                    <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Meta Info */}
                      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1.5, color: 'text.secondary' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Calendar size={12} />
                          <Typography variant="caption" sx={{ fontSize: '0.72rem' }}>
                            {formatDate(post.publishedAt)}
                          </Typography>
                        </Box>
                        {post.readTimeMinutes && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Clock size={12} />
                            <Typography variant="caption" sx={{ fontSize: '0.72rem' }}>
                              {t('card.minRead', { min: post.readTimeMinutes })}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h5"
                        component={Link}
                        href={`/${locale}/blog/${post.slug}`}
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          fontSize: '1.125rem',
                          lineHeight: 1.35,
                          textDecoration: 'none',
                          color: 'text.primary',
                          '&:hover': { color: 'primary.main' },
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: 48,
                        }}
                      >
                        {getPostTitle(post)}
                      </Typography>

                      {/* Excerpt */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: 64,
                        }}
                      >
                        {getPostExcerpt(post)}
                      </Typography>

                      {/* Stats & Link */}
                      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Metrics */}
                        <Box sx={{ display: 'flex', gap: 1.5, color: 'text.secondary' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Eye size={12} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>{post.viewCount}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Heart size={12} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>{post.likeCount}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <MessageSquare size={12} />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>{post.commentCount}</Typography>
                          </Box>
                        </Box>

                        <Button
                          id={`blog-card-link-${post.slug}`}
                          component={Link}
                          href={`/${locale}/blog/${post.slug}`}
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

            {/* Load More Button */}
            {gridPosts.length > visibleCount && (
              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                  id="blog-load-more"
                  variant="outlined"
                  size="large"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  sx={{ px: 5, fontWeight: 600 }}
                >
                  {locale === 'fr' ? 'Voir plus d\'articles' : 'Load More Articles'}
                </Button>
              </Box>
            )}
          </Box>
        )}

        {/* ── Newsletter Subscribe Banner ── */}
        <Card
          sx={{
            mt: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(242, 100, 25, 0.08) 0%, rgba(30, 38, 53, 0.6) 100%)',
            border: '1px solid',
            borderColor: alpha('#F26419', 0.2),
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(246,174,45,0.08) 0%, transparent 70%)',
            }}
          />
          <Container maxWidth="sm">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: alpha('#F26419', 0.12),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5,
              }}
            >
              <Mail size={24} color="#F26419" />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>
              {locale === 'fr' ? 'Restez Informé' : 'Join Our Newsletter'}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, fontSize: '0.95rem', lineHeight: 1.6 }}>
              {locale === 'fr'
                ? 'Abonnez-vous pour recevoir nos derniers conseils de construction, inspirations design et nouveautés directement dans votre boîte mail.'
                : 'Subscribe to get our latest construction tips, design inspirations, and updates delivered straight to your inbox.'}
            </Typography>
            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1.5,
                justifyContent: 'center',
              }}
            >
              <TextField
                id="newsletter-blog-email"
                type="email"
                required
                placeholder={locale === 'fr' ? 'Votre adresse e-mail' : 'Enter your email'}
                size="small"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                sx={{
                  flex: 1,
                  bgcolor: alpha('#121824', 0.6),
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  },
                }}
              />
              <Button
                id="newsletter-blog-submit"
                type="submit"
                variant="contained"
                disabled={submittingNewsletter}
                sx={{
                  background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                  fontWeight: 700,
                  px: 4,
                  '&:hover': { background: 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)' },
                }}
              >
                {submittingNewsletter
                  ? (locale === 'fr' ? 'Envoi...' : 'Subscribing...')
                  : (locale === 'fr' ? 'S\'abonner' : 'Subscribe')}
              </Button>
            </Box>
          </Container>
        </Card>
      </Container>

      {/* Branded Toasts */}
      <CustomNotification
        options={notification}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  )
}
