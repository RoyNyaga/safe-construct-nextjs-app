import type { Metadata } from 'next'
import { Box, Container, Typography, alpha } from '@mui/material'
import { createClient } from '@/utils/supabase/server'
import CatalogueGrid from './CatalogueGrid'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Our Portfolio',
  description: 'Browse our full catalogue of architectural designs — bungalows, duplexes, villas, apartments and more.',
}

async function getCatalogueItems() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('catalogues')
    .select('id, title, slug, style, design_style_origin, size_sqm, bedrooms, bathrooms, floors, total_cost, currency, main_image_url, is_featured, view_count, like_count')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function CataloguePage() {
  const items = await getCatalogueItems()

  return (
    <Box>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Box
        sx={{
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: `
            radial-gradient(ellipse 70% 60% at 60% 40%, rgba(246,174,45,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(242,100,25,0.08) 0%, transparent 50%),
            linear-gradient(180deg, #0E1420 0%, #121824 100%)
          `,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Grid overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(246,174,45,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(246,174,45,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at 60% 40%, rgba(0,0,0,0.5) 0%, transparent 70%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', py: 10 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 1.5 }}
          >
            Portfolio
          </Typography>
          <Typography variant="h1" sx={{ mb: 2, maxWidth: 600 }}>
            Our{' '}
            <Box
              component="span"
              sx={{ background: 'linear-gradient(135deg,#F26419,#F6AE2D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Designs
            </Box>
          </Typography>
        </Container>
      </Box>

      {/* ── Grid (Client Component) ───────────────────────────── */}
      <CatalogueGrid items={items} />
    </Box>
  )
}
