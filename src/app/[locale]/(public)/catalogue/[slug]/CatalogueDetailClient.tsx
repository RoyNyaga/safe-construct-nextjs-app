'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Box, Container, Typography, Grid, Chip, Button,
  Table, TableBody, TableCell, TableRow, Divider,
  IconButton, alpha, Card, CardMedia, CardContent,
} from '@mui/material'
import { Heart, Eye, Bed, Bath, Layers, Maximize2, ArrowLeft, ChevronLeft, ChevronRight, ArrowRight, ChevronDown, ChevronUp, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { CustomTooltip, CustomNotification, type NotificationOptions } from '@/components/ui'
import { incrementView, incrementLike } from '@/app/[locale]/actions/catalogue'

type CatalogueDetail = {
  id: string
  title: string
  title_fr: string | null
  slug: string
  description: string | null
  description_fr: string | null
  style: string
  design_style_origin: string
  size_sqm: number
  bedrooms: number
  bathrooms: number
  floors: number
  total_cost: number
  currency: string
  main_image_url: string
  is_featured: boolean
  view_count: number
  like_count: number
  images: { id: string; image_url: string; caption: string | null; order_index: number }[]
  costItems: { id: string; label: string; label_fr?: string | null; cost: number }[]
}

// WhatsApp SVG Icon
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// Facebook SVG Icon
function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

// LinkedIn SVG Icon
function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function formatCurrency(amount: number, currency = 'XAF') {
  if (!amount) return '—'
  return new Intl.NumberFormat('fr-CM', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}
function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

const ORIGIN_COLORS: Record<string, string> = {
  africa: '#F26419', europe: '#42A5F5', america: '#66BB6A', canada: '#CE93D8',
}

interface Props {
  catalogue: CatalogueDetail
  similarDesigns: any[]
}

export default function CatalogueDetailClient({ catalogue, similarDesigns }: Props) {
  const locale = useLocale()
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [likeCount, setLikeCount] = useState(catalogue.like_count)
  const [liked, setLiked] = useState(false)
  const [descExpanded, setDescExpanded] = useState(false)

  const [shareUrl, setShareUrl] = useState('')
  const [notification, setNotification] = useState<NotificationOptions>({
    open: false,
    message: '',
    severity: 'success',
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href)
    }
  }, [])

  const shareTitle = (locale === 'fr' && catalogue.title_fr) ? catalogue.title_fr : catalogue.title

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setNotification({
      open: true,
      message: locale === 'fr' ? 'Lien copié dans le presse-papiers !' : 'Link copied to clipboard!',
      severity: 'success',
    })
  }

  const ShareSection = () => {
    const titleText = locale === 'fr' ? 'Partager ce modèle' : 'Share this Design'
    const copyTooltip = locale === 'fr' ? 'Copier le lien' : 'Copy Link'
    const encodedTitle = encodeURIComponent(shareTitle)
    const encodedUrl = encodeURIComponent(shareUrl)

    return (
      <Box sx={{ mt: 3, pt: 3, borderTop: (theme) => `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize: '0.75rem',
          }}
        >
          {titleText}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          {/* WhatsApp */}
          <CustomTooltip title={locale === 'fr' ? 'Partager sur WhatsApp' : 'Share on WhatsApp'}>
            <IconButton
              component="a"
              href={`https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              id="share-whatsapp-btn"
              aria-label="Share on WhatsApp"
              sx={{
                color: '#fff',
                bgcolor: '#25D366',
                width: 40,
                height: 40,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: '#20ba56',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                },
              }}
            >
              <WhatsAppIcon size={18} />
            </IconButton>
          </CustomTooltip>

          {/* Facebook */}
          <CustomTooltip title={locale === 'fr' ? 'Partager sur Facebook' : 'Share on Facebook'}>
            <IconButton
              component="a"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              id="share-facebook-btn"
              aria-label="Share on Facebook"
              sx={{
                color: '#fff',
                bgcolor: '#1877F2',
                width: 40,
                height: 40,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: '#166fe5',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.4)',
                },
              }}
            >
              <FacebookIcon size={18} />
            </IconButton>
          </CustomTooltip>

          {/* LinkedIn */}
          <CustomTooltip title={locale === 'fr' ? 'Partager sur LinkedIn' : 'Share on LinkedIn'}>
            <IconButton
              component="a"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              id="share-linkedin-btn"
              aria-label="Share on LinkedIn"
              sx={{
                color: '#fff',
                bgcolor: '#0A66C2',
                width: 40,
                height: 40,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: '#0956a3',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 12px rgba(10, 102, 194, 0.4)',
                },
              }}
            >
              <LinkedInIcon size={18} />
            </IconButton>
          </CustomTooltip>

          {/* Copy Link */}
          <CustomTooltip title={copyTooltip}>
            <IconButton
              onClick={handleCopyLink}
              id="share-copy-btn"
              aria-label="Copy page link"
              sx={{
                color: '#fff',
                bgcolor: 'primary.main',
                width: 40,
                height: 40,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.1)',
                  boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
              }}
            >
              <LinkIcon size={18} />
            </IconButton>
          </CustomTooltip>
        </Box>
      </Box>
    )
  }

  // Build unified gallery: main image first, then extras
  const allImages = [
    { id: 'main', image_url: catalogue.main_image_url, caption: catalogue.title, order_index: -1 },
    ...catalogue.images,
  ]

  // On mount: increment view + restore liked state from localStorage
  useEffect(() => {
    incrementView(catalogue.id)
    const key = `liked_catalogue_${catalogue.id}`
    setLiked(localStorage.getItem(key) === '1')
  }, [catalogue.id])

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') setActiveImageIdx((i) => (i + 1) % allImages.length)
      if (e.key === 'ArrowLeft') setActiveImageIdx((i) => (i - 1 + allImages.length) % allImages.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [allImages.length])

  const handleLike = useCallback(async () => {
    if (liked) return
    const key = `liked_catalogue_${catalogue.id}`
    localStorage.setItem(key, '1')
    setLiked(true)
    const result = await incrementLike(catalogue.id)
    setLikeCount(result.like_count)
  }, [catalogue.id, liked])

  const activeImage = allImages[activeImageIdx]

  const SPECS = [
    { icon: Bed, label: 'Bedrooms', value: catalogue.bedrooms, color: '#F26419' },
    { icon: Bath, label: 'Bathrooms', value: catalogue.bathrooms, color: '#42A5F5' },
    { icon: Layers, label: 'Floors', value: catalogue.floors, color: '#66BB6A' },
    { icon: Maximize2, label: 'Area', value: `${catalogue.size_sqm} m²`, color: '#F6AE2D' },
  ]

  return (
    <Box>
      {/* ── Hero / Main Image ─────────────────────────── */}
      <Box sx={{ position: 'relative', height: { xs: '55vw', md: '60vh' }, overflow: 'hidden', bgcolor: '#0E1420' }}>
        <Box
          component="img"
          src={activeImage.image_url}
          alt={activeImage.caption ?? catalogue.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* Gradient overlay */}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)' }} />

        {/* Back button */}
        <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
          <Button
            id="catalogue-detail-back"
            component={Link}
            href={`/${locale}/catalogue`}
            startIcon={<ArrowLeft size={16} />}
            sx={{
              color: '#fff',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
              borderRadius: 2,
              '&:hover': { background: 'rgba(0,0,0,0.6)' },
              px: { xs: 1.25, sm: 2 },
              py: { xs: 0.5, sm: 1 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              '& .MuiButton-startIcon': {
                marginRight: { xs: 0.5, sm: 1 },
                '& svg': {
                  width: { xs: 14, sm: 16 },
                  height: { xs: 14, sm: 16 },
                }
              }
            }}
          >
            Back<Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}> to Catalogue</Box>
          </Button>
        </Box>

        {/* Gallery arrows */}
        {allImages.length > 1 && (<>
          <IconButton
            id="gallery-prev"
            onClick={() => setActiveImageIdx((i) => (i - 1 + allImages.length) % allImages.length)}
            sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}
          >
            <ChevronLeft size={22} />
          </IconButton>
          <IconButton
            id="gallery-next"
            onClick={() => setActiveImageIdx((i) => (i + 1) % allImages.length)}
            sx={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}
          >
            <ChevronRight size={22} />
          </IconButton>
        </>)}

        {/* Caption & engagement */}
        <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          {activeImage.caption && (
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: { xs: '0.7rem', sm: '0.85rem' },
                maxWidth: '70%',
                backdropFilter: 'blur(4px)',
                bgcolor: 'rgba(0,0,0,0.3)',
                px: { xs: 1, sm: 1.5 },
                py: { xs: 0.25, sm: 0.5 },
                borderRadius: 1,
              }}
            >
              {activeImage.caption}
            </Typography>
          )}
          {/* Engagement */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'rgba(255,255,255,0.8)' }}>
              <Eye size={16} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{catalogue.view_count + 1}</Typography>
            </Box>
            <CustomTooltip title={liked ? 'Already liked!' : 'Like this design'}>
              <Box
                onClick={handleLike}
                id="catalogue-like-btn"
                sx={{
                  display: 'flex', alignItems: 'center', gap: 0.75,
                  color: liked ? '#ef5350' : 'rgba(255,255,255,0.8)',
                  cursor: liked ? 'default' : 'pointer',
                  '&:hover': { color: liked ? '#ef5350' : '#ff8a80' },
                  transition: 'color 0.2s',
                }}
              >
                <Heart size={16} fill={liked ? '#ef5350' : 'none'} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{likeCount}</Typography>
              </Box>
            </CustomTooltip>
          </Box>
        </Box>
      </Box>

      {/* ── Thumbnail Strip ───────────────────────────── */}
      {allImages.length > 1 && (
        <Box sx={{ backgroundColor: '#0E1420', borderBottom: (t) => `1px solid ${alpha(t.palette.divider, 1)}`, py: 1.5, px: 2, overflow: 'auto' }}>
          <Box sx={{ display: 'flex', gap: 1.5, width: 'max-content' }}>
            {allImages.map((img, i) => (
              <Box
                key={img.id}
                id={`thumbnail-${i}`}
                onClick={() => setActiveImageIdx(i)}
                sx={{
                  width: 80,
                  height: 56,
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: i === activeImageIdx ? '2px solid #F26419' : '2px solid transparent',
                  transition: 'border-color 0.2s',
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={img.image_url}
                  alt={img.caption ?? `Photo ${i + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* ── Details ───────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6}>
          {/* ── Left: Info ─────────────────────────────── */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Title & badges */}
            <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label={capitalize(catalogue.design_style_origin)} size="small"
                sx={{ background: alpha(ORIGIN_COLORS[catalogue.design_style_origin] || '#F26419', 0.15), color: ORIGIN_COLORS[catalogue.design_style_origin] || '#F26419', fontWeight: 700 }} />
              <Chip label={capitalize(catalogue.style)} size="small"
                sx={{ background: (t) => alpha(t.palette.background.paper, 1), border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`, fontWeight: 600 }} />
              {catalogue.is_featured && (
                <Chip label="Featured" size="small" sx={{ background: 'linear-gradient(135deg,#F26419,#F6AE2D)', color: '#fff', fontWeight: 700 }} />
              )}
            </Box>

            <Typography
              variant="h2"
              sx={{
                mb: 2.5,
                fontSize: { xs: '1.75rem', sm: '2.5rem' },
              }}
            >
              {(locale === 'fr' && catalogue.title_fr) ? catalogue.title_fr : catalogue.title}
            </Typography>

            {catalogue.description && (() => {
              const desc = (locale === 'fr' && catalogue.description_fr) ? catalogue.description_fr : catalogue.description
              const words = desc.split(/\s+/)
              const isLong = words.length > 70
              const displayDescription = (isLong && !descExpanded)
                ? words.slice(0, 70).join(' ') + '...'
                : desc

              return (
                <Box sx={{ mb: 4 }}>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.85 }}>
                    {displayDescription}
                  </Typography>
                  {isLong && (
                    <Button
                      size="small"
                      onClick={() => setDescExpanded(!descExpanded)}
                      endIcon={descExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      sx={{
                        mt: 1,
                        fontWeight: 700,
                        textTransform: 'none',
                        color: 'primary.main',
                        p: 0,
                        '&:hover': { background: 'transparent', textDecoration: 'underline' },
                      }}
                    >
                      {descExpanded ? 'Show Less' : 'Read More'}
                    </Button>
                  )}
                </Box>
              )
            })()}

            {/* Spec grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: { xs: 1, sm: 2 },
                mb: 4,
              }}
            >
              {SPECS.map(({ icon: Icon, label, value, color }) => (
                <Box
                  key={label}
                  sx={{
                    p: { xs: 1, sm: 2 },
                    borderRadius: { xs: 2, sm: 2.5 },
                    border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                    textAlign: 'center',
                    '&:hover': { borderColor: color, background: alpha(color, 0.05) },
                    transition: 'all 0.2s',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: { xs: 0.5, sm: 1 },
                      '& svg': {
                        width: { xs: 16, sm: 22 },
                        height: { xs: 16, sm: 22 },
                      },
                    }}
                  >
                    <Icon color={color} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '0.85rem', sm: '1rem' },
                      color,
                      lineHeight: 1.2,
                      mb: 0.25,
                    }}
                  >
                    {value}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '0.65rem', sm: '0.75rem' },
                      display: 'block',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Description */}
            <Divider sx={{ mb: 4 }} />

            {/* CTA */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, flexWrap: 'wrap' }}>
              <Button
                id="catalogue-request-design-cta"
                component={Link}
                href={`/${locale}/request-design?catalogue=${catalogue.slug}`}
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={18} />}
                sx={{
                  background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                  fontWeight: 700,
                  px: 4,
                  '&:hover': { background: 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)' },
                }}
              >
                Request This Design
              </Button>
              <Button
                id="catalogue-contact-cta"
                component={Link}
                href={`/${locale}/contact`}
                variant="outlined"
                size="large"
                sx={{ fontWeight: 600, px: 4 }}
              >
                Ask a Question
              </Button>
            </Box>

            {/* Share section (Desktop) */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <ShareSection />
            </Box>
          </Grid>

          {/* ── Right: Cost Breakdown ───────────────────── */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                p: 3.5,
                borderRadius: 3,
                border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.2)}`,
                background: (t) => `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.05)} 0%, ${alpha(t.palette.background.paper, 1)} 100%)`,
                position: { md: 'sticky' },
                top: { md: 140 },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Estimated Cost Breakdown</Typography>
              {catalogue.costItems.length === 0 ? (
                <Typography color="text.secondary" variant="body2">Cost breakdown not available yet.</Typography>
              ) : (
                <Table size="small">
                  <TableBody>
                    {catalogue.costItems.map(({ id, label, label_fr, cost }) => {
                      const displayLabel = (locale === 'fr' && label_fr) ? label_fr : label
                      return (
                        <TableRow key={id} sx={{ '&:last-child td': { border: 0 } }}>
                          <TableCell sx={{ pl: 0, color: 'text.secondary', fontSize: '0.85rem', py: 1.25 }}>
                            <CustomTooltip title={`The ${displayLabel.toLowerCase()} phase of construction.`}>
                              <span>{displayLabel}</span>
                            </CustomTooltip>
                          </TableCell>
                          <TableCell align="right" sx={{ pr: 0, fontWeight: 600, fontSize: '0.85rem', py: 1.25 }}>
                            {formatCurrency(cost, catalogue.currency)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {/* Total */}
                    <TableRow>
                      <TableCell sx={{ pl: 0, fontWeight: 800, fontSize: '0.95rem', borderTop: (t) => `2px solid ${t.palette.primary.main}` }}>
                        Total Estimate
                      </TableCell>
                      <TableCell align="right" sx={{ pr: 0, fontWeight: 800, fontSize: '0.95rem', color: 'primary.main', borderTop: (t) => `2px solid ${t.palette.primary.main}` }}>
                        {formatCurrency(catalogue.total_cost, catalogue.currency)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', lineHeight: 1.6 }}>
                * This is a rough estimate based on current local market rates. Actual costs vary by site, material availability, and finish quality.
              </Typography>
            </Box>

            {/* Mobile Only CTA */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 2, flexWrap: 'wrap', mt: 4 }}>
              <Button
                id="catalogue-request-design-cta-mobile"
                component={Link}
                href={`/${locale}/request-design?catalogue=${catalogue.slug}`}
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={18} />}
                sx={{
                  background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                  fontWeight: 700,
                  flex: 1,
                  minWidth: '200px',
                  '&:hover': { background: 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)' },
                }}
              >
                Request This Design
              </Button>
              <Button
                id="catalogue-contact-cta-mobile"
                component={Link}
                href={`/${locale}/contact`}
                variant="outlined"
                size="large"
                sx={{ fontWeight: 600, flex: 1, minWidth: '200px' }}
              >
                Ask a Question
              </Button>
            </Box>

            {/* Share section (Mobile) */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <ShareSection />
            </Box>
          </Grid>
        </Grid>

        {/* Similar Designs Section */}
        {similarDesigns && similarDesigns.length > 0 && (
          <Box sx={{ borderTop: (t) => `1px solid ${t.palette.divider}`, pt: 8, mt: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, textAlign: 'center', fontSize: { xs: '1.75rem', sm: '2.25rem' } }}>
              Similar Designs
            </Typography>
            <Grid container spacing={3}>
              {similarDesigns.map((item) => (
                <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' },
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    {/* Image */}
                    <Box sx={{ position: 'relative', pt: '66.66%', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={item.main_image_url}
                        alt={item.title}
                        sx={{
                          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          '.MuiCard-root:hover &': { transform: 'scale(1.04)' },
                        }}
                      />
                      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />

                      {/* Badges */}
                      <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 0.75 }}>
                        <Chip
                          label={capitalize(item.design_style_origin)}
                          size="small"
                          sx={{
                            background: alpha(ORIGIN_COLORS[item.design_style_origin] || '#F26419', 0.85),
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.68rem',
                          }}
                        />
                        <Chip
                          label={capitalize(item.style)}
                          size="small"
                          sx={{
                            background: 'rgba(0,0,0,0.5)',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '0.68rem',
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.95rem', lineHeight: 1.3 }}>
                        {(locale === 'fr' && item.title_fr) ? item.title_fr : item.title}
                      </Typography>

                      {/* Specs */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2, color: 'text.secondary' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Bed size={13} color="#F26419" />
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.bedrooms} bed</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Bath size={13} color="#42A5F5" />
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.bathrooms} bath</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Maximize2 size={13} color="#F6AE2D" />
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.size_sqm} m²</Typography>
                        </Box>
                      </Box>

                      {/* CTA */}
                      <Button
                        id={`similar-view-${item.slug}`}
                        component={Link}
                        href={`/${locale}/catalogue/${item.slug}`}
                        variant="outlined"
                        size="small"
                        fullWidth
                        endIcon={<ArrowRight size={13} />}
                        sx={{ mt: 'auto', fontWeight: 600 }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
      
      <CustomNotification
        options={notification}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  )
}
