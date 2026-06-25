import { Box, Container, Typography, Card, CardMedia, CardContent, Button, Chip, alpha } from '@mui/material'
import { ArrowRight, Maximize2, Bed } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

type CatalogueItem = {
  id: string
  title: string
  style: string | null
  total_area_sqm: number | null
  num_bedrooms: number | null
  cover_image_url: string | null
  slug: string
}

async function getFeaturedItems(): Promise<CatalogueItem[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('catalogues')
    .select('id, title, style, total_area_sqm, num_bedrooms, cover_image_url, slug')
    .eq('is_featured', true)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return data ?? []
}

export const revalidate = 3600

export default async function FeaturedCatalogue({ locale }: { locale: string }) {
  const items = await getFeaturedItems()

  if (items.length === 0) return null

  return (
    <Box
      id="featured-catalogue"
      sx={{
        py: { xs: 10, md: 14 },
        background:
          'linear-gradient(180deg, transparent 0%, rgba(30, 38, 53, 0.4) 50%, transparent 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 1.5 }}
          >
            Our Work
          </Typography>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {/* will use t('Home.catalogue.title') in client wrapper — using string here for RSC */}
            Featured Designs
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: 'auto' }}>
            Explore our most popular architectural plans
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3,
            mb: 6,
          }}
        >
          {items.map((item) => (
            <Link key={item.id} href={`/${locale}/catalogue/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card
                sx={{ display: 'block', overflow: 'hidden' }}
              >
              {/* Image */}
              <Box sx={{ position: 'relative', pt: '65%', overflow: 'hidden' }}>
                {item.cover_image_url ? (
                  <CardMedia
                    component="img"
                    image={item.cover_image_url}
                    alt={item.title}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                      '.MuiCard-root:hover &': { transform: 'scale(1.05)' },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, #1E2635 0%, #252D3D 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ opacity: 0.2, fontSize: '4rem' }}>🏗️</Box>
                  </Box>
                )}

                {/* Overlay on hover */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                  }}
                />

                {/* Style badge */}
                {item.style && (
                  <Chip
                    label={item.style}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: 'rgba(242, 100, 25, 0.85)',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                )}
              </Box>

              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
                  {item.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {item.total_area_sqm && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                      <Maximize2 size={14} />
                      <Typography variant="caption">{item.total_area_sqm} m²</Typography>
                    </Box>
                  )}
                  {item.num_bedrooms && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                      <Bed size={14} />
                      <Typography variant="caption">{item.num_bedrooms} Bedrooms</Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Link>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Link href={`/${locale}/catalogue`} style={{ textDecoration: 'none' }}>
            <Button
              id="featured-catalogue-view-all-btn"
              component="span"
              variant="outlined"
              size="large"
              endIcon={<ArrowRight size={18} />}
              sx={{ fontWeight: 600, px: 4 }}
            >
              View Full Catalogue
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}
