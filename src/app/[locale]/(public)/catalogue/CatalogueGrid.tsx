'use client'

import { useState, useMemo } from 'react'
import {
  Box, Container, Typography, Card, CardMedia, CardContent,
  Chip, Button, Select, MenuItem, FormControl, InputLabel,
  Slider, Grid, alpha, IconButton,
} from '@mui/material'
import { Bed, Bath, Layers, Maximize2, Eye, Heart, ArrowRight, SlidersHorizontal, X } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

type CatalogueItem = {
  id: string
  title: string
  slug: string
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
}

interface CatalogueGridProps {
  items: CatalogueItem[]
}

const STYLES = ['bungalow', 'duplex', 'villa', 'apartment', 'commercial', 'townhouse', 'other']
const ORIGINS = ['africa', 'europe', 'america', 'canada']
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'most_viewed', label: 'Most Viewed' },
  { value: 'most_liked', label: 'Most Liked' },
  { value: 'cost_asc', label: 'Lowest Cost' },
  { value: 'cost_desc', label: 'Highest Cost' },
]

function formatCurrency(amount: number, currency = 'XAF') {
  if (!amount) return '—'
  return new Intl.NumberFormat('fr-CM', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const ORIGIN_COLORS: Record<string, string> = {
  africa: '#F26419', europe: '#42A5F5', america: '#66BB6A', canada: '#CE93D8',
}

export default function CatalogueGrid({ items }: CatalogueGridProps) {
  const locale = useLocale()

  // Filters
  const [style, setStyle] = useState('all')
  const [origin, setOrigin] = useState('all')
  const [bedrooms, setBedrooms] = useState('all')
  const [sort, setSort] = useState('newest')
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 1000])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const maxArea = useMemo(() => Math.max(...items.map((i) => Number(i.size_sqm)), 500), [items])

  const filtered = useMemo(() => {
    let list = [...items]
    if (style !== 'all') list = list.filter((i) => i.style === style)
    if (origin !== 'all') list = list.filter((i) => i.design_style_origin === origin)
    if (bedrooms !== 'all') {
      if (bedrooms === '5+') list = list.filter((i) => i.bedrooms >= 5)
      else list = list.filter((i) => i.bedrooms === Number(bedrooms))
    }
    list = list.filter((i) => Number(i.size_sqm) >= areaRange[0] && Number(i.size_sqm) <= areaRange[1])
    switch (sort) {
      case 'most_viewed': list.sort((a, b) => b.view_count - a.view_count); break
      case 'most_liked': list.sort((a, b) => b.like_count - a.like_count); break
      case 'cost_asc': list.sort((a, b) => Number(a.total_cost) - Number(b.total_cost)); break
      case 'cost_desc': list.sort((a, b) => Number(b.total_cost) - Number(a.total_cost)); break
    }
    return list
  }, [items, style, origin, bedrooms, sort, areaRange])

  function resetFilters() {
    setStyle('all'); setOrigin('all'); setBedrooms('all')
    setSort('newest'); setAreaRange([0, maxArea])
  }

  const hasActiveFilters = style !== 'all' || origin !== 'all' || bedrooms !== 'all' || areaRange[0] !== 0 || areaRange[1] !== maxArea

  return (
    <Box>
      {/* ── Filter Bar ─────────────────────────────────── */}
      <Box
        sx={{
          position: 'sticky',
          top: 72,
          zIndex: 100,
          backgroundColor: alpha('#121824', 0.9),
          backdropFilter: 'blur(20px)',
          borderBottom: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          {/* Mobile view toggle row */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              Filters
            </Typography>
            <IconButton
              id="mobile-filter-toggle"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              color={mobileFiltersOpen ? 'primary' : 'default'}
              sx={{
                border: '1px solid',
                borderColor: mobileFiltersOpen ? 'primary.main' : 'divider',
                borderRadius: 2,
                p: 1,
              }}
            >
              <SlidersHorizontal size={18} />
            </IconButton>
          </Box>

          {/* Filters controls */}
          <Box
            sx={{
              display: {
                xs: mobileFiltersOpen ? 'flex' : 'none',
                md: 'flex',
              },
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              flexWrap: 'wrap',
              alignItems: { xs: 'stretch', md: 'center' },
              mt: { xs: 2, md: 0 },
            }}
          >
            {/* Style */}
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel id="filter-style-label">Style</InputLabel>
              <Select id="filter-style" labelId="filter-style-label" label="Style" value={style} onChange={(e) => setStyle(e.target.value)}>
                <MenuItem value="all">All Styles</MenuItem>
                {STYLES.map((s) => <MenuItem key={s} value={s}>{capitalize(s)}</MenuItem>)}
              </Select>
            </FormControl>

            {/* Origin */}
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id="filter-origin-label">Design Origin</InputLabel>
              <Select id="filter-origin" labelId="filter-origin-label" label="Design Origin" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                <MenuItem value="all">All Origins</MenuItem>
                {ORIGINS.map((o) => <MenuItem key={o} value={o}>{capitalize(o)}</MenuItem>)}
              </Select>
            </FormControl>

            {/* Bedrooms */}
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel id="filter-beds-label">Bedrooms</InputLabel>
              <Select id="filter-bedrooms" labelId="filter-beds-label" label="Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                <MenuItem value="all">Any</MenuItem>
                {['1', '2', '3', '4', '5+'].map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
              </Select>
            </FormControl>

            {/* Sort */}
            <FormControl size="small" sx={{ minWidth: 150, ml: { xs: 0, md: 'auto' } }}>
              <InputLabel id="filter-sort-label">Sort By</InputLabel>
              <Select id="filter-sort" labelId="filter-sort-label" label="Sort By" value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORT_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </Select>
            </FormControl>

            {/* Reset */}
            {hasActiveFilters && (
              <Button id="catalogue-reset-filters" size="small" onClick={resetFilters} startIcon={<X size={14} />} sx={{ color: 'text.secondary', alignSelf: { xs: 'flex-start', md: 'center' } }}>
                Reset
              </Button>
            )}
          </Box>

          {/* Area range slider */}
          <Box
            sx={{
              display: {
                xs: mobileFiltersOpen ? 'block' : 'none',
                md: 'block',
              },
              mt: 1.5,
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, maxWidth: 420 }}>
              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', fontWeight: 600 }}>
                Area: {areaRange[0]}–{areaRange[1]} m²
              </Typography>
              <Slider
                id="catalogue-area-slider"
                value={areaRange}
                onChange={(_, v) => setAreaRange(v as [number, number])}
                min={0}
                max={maxArea}
                step={10}
                valueLabelDisplay="auto"
                size="small"
                sx={{ color: 'primary.main' }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Grid ───────────────────────────────────────── */}
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 7 } }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Showing <strong>{filtered.length}</strong> of {items.length} designs
          </Typography>
        </Box>

        {filtered.length === 0 ? (
          /* Empty state */
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              px: 3,
              borderRadius: 4,
              border: '1px dashed',
              borderColor: 'divider',
              backgroundColor: alpha('#121824', 0.4),
              mt: 4,
            }}
          >
            <Typography variant="h1" sx={{ fontSize: '3.5rem', mb: 2 }}>📐</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>No designs match your filters</Typography>
            <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
              We design from scratch — bespoke architectural plans tailored exactly to your vision and site. Request a custom design to build your dream home!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button id="catalogue-empty-reset" variant="outlined" onClick={resetFilters}>Reset Filters</Button>
              <Button
                id="catalogue-empty-request-design"
                component={Link}
                href={`/${locale}/request-design`}
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                  fontWeight: 700,
                  px: 4,
                }}
              >
                Request a Custom Design
              </Button>
            </Box>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filtered.map((item, idx) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: 0,
                    animation: `fadeUp 0.4s ease ${idx * 0.06}s forwards`,
                    '@keyframes fadeUp': {
                      from: { opacity: 0, transform: 'translateY(20px)' },
                      to: { opacity: 1, transform: 'translateY(0)' },
                    },
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
                    {/* Gradient */}
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
                          backdropFilter: 'blur(8px)',
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
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                      />
                    </Box>

                    {/* Featured badge */}
                    {item.is_featured && (
                      <Chip
                        label="Featured"
                        size="small"
                        sx={{
                          position: 'absolute', top: 12, right: 12,
                          background: 'linear-gradient(135deg,#F26419,#F6AE2D)',
                          color: '#fff', fontWeight: 700, fontSize: '0.68rem',
                        }}
                      />
                    )}

                    {/* Engagement — overlaid on bottom of image */}
                    <Box
                      sx={{
                        position: 'absolute', bottom: 10, right: 10,
                        display: 'flex', gap: 1.5, alignItems: 'center',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'rgba(255,255,255,0.8)' }}>
                        <Eye size={13} />
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>{item.view_count}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'rgba(255,255,255,0.8)' }}>
                        <Heart size={13} />
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>{item.like_count}</Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1rem', lineHeight: 1.3 }}>
                      {item.title}
                    </Typography>

                    {/* Specs row */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, color: 'text.secondary' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Bed size={14} color="#F26419" />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.bedrooms} bed</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Bath size={14} color="#42A5F5" />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.bathrooms} bath</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Layers size={14} color="#66BB6A" />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.floors} floor{item.floors > 1 ? 's' : ''}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Maximize2 size={14} color="#F6AE2D" />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.size_sqm} m²</Typography>
                      </Box>
                    </Box>

                    {/* Cost */}
                    {Number(item.total_cost) > 0 && (
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', mb: 2, fontSize: '0.9rem' }}>
                        Est. {formatCurrency(Number(item.total_cost), item.currency)}
                      </Typography>
                    )}

                    {/* CTA */}
                    <Button
                      id={`catalogue-view-${item.slug}`}
                      component={Link}
                      href={`/${locale}/catalogue/${item.slug}`}
                      variant="outlined"
                      size="small"
                      fullWidth
                      endIcon={<ArrowRight size={14} />}
                      sx={{ mt: 'auto', fontWeight: 600 }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ── Bottom CTA strip ─────────────────────────── */}
        <Box
          sx={{
            mt: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: (t) =>
              `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.08)} 0%, ${alpha(t.palette.background.paper, 0.6)} 100%)`,
            border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
            Don&apos;t see what you&apos;re looking for?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: 'auto' }}>
            We design from scratch — bespoke architectural plans tailored exactly to your vision and site.
          </Typography>
          <Button
            id="catalogue-request-design-btn"
            component={Link}
            href={`/${locale}/request-design`}
            variant="contained"
            size="large"
            endIcon={<ArrowRight size={18} />}
            sx={{
              background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
              fontWeight: 700,
              px: 5,
              '&:hover': { background: 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)' },
            }}
          >
            Request a Custom Design
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
