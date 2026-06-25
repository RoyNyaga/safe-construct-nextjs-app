'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Box, Container, Typography, Grid, Chip, Button,
  Table, TableBody, TableCell, TableRow, Divider,
  IconButton, alpha,
} from '@mui/material'
import { Heart, Eye, Bed, Bath, Layers, Maximize2, ArrowLeft, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { CustomTooltip } from '@/components/ui'
import { incrementView, incrementLike } from '@/app/[locale]/actions/catalogue'

type CatalogueDetail = {
  id: string
  title: string
  slug: string
  description: string | null
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
  costItems: { id: string; label: string; cost: number }[]
}

function formatCurrency(amount: number, currency = 'XAF') {
  if (!amount) return '—'
  return new Intl.NumberFormat('fr-CM', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}
function capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

const ORIGIN_COLORS: Record<string, string> = {
  africa: '#F26419', europe: '#42A5F5', america: '#66BB6A', canada: '#CE93D8',
}

interface Props { catalogue: CatalogueDetail }

export default function CatalogueDetailClient({ catalogue }: Props) {
  const locale = useLocale()
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [likeCount, setLikeCount] = useState(catalogue.like_count)
  const [liked, setLiked] = useState(false)

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
            }}
          >
            Back to Catalogue
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
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', maxWidth: '70%', backdropFilter: 'blur(4px)', bgcolor: 'rgba(0,0,0,0.3)', px: 1.5, py: 0.5, borderRadius: 1 }}>
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

            <Typography variant="h2" sx={{ mb: 2.5 }}>{catalogue.title}</Typography>

            {catalogue.description && (
              <Typography color="text.secondary" sx={{ lineHeight: 1.85, mb: 4 }}>
                {catalogue.description}
              </Typography>
            )}

            {/* Spec grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 4 }}>
              {SPECS.map(({ icon: Icon, label, value, color }) => (
                <Box
                  key={label}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                    textAlign: 'center',
                    '&:hover': { borderColor: color, background: alpha(color, 0.05) },
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={22} color={color} style={{ marginBottom: 8 }} />
                  <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem', color }}>{value}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{label}</Typography>
                </Box>
              ))}
            </Box>

            {/* Description */}
            <Divider sx={{ mb: 4 }} />

            {/* CTA */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                    {catalogue.costItems.map(({ id, label, cost }) => (
                      <TableRow key={id} sx={{ '&:last-child td': { border: 0 } }}>
                        <TableCell sx={{ pl: 0, color: 'text.secondary', fontSize: '0.85rem', py: 1.25 }}>
                          <CustomTooltip title={`The ${label.toLowerCase()} phase of construction.`}>
                            <span>{label}</span>
                          </CustomTooltip>
                        </TableCell>
                        <TableCell align="right" sx={{ pr: 0, fontWeight: 600, fontSize: '0.85rem', py: 1.25 }}>
                          {formatCurrency(cost, catalogue.currency)}
                        </TableCell>
                      </TableRow>
                    ))}
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
