import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import {
  Box, Container, Typography, Card, CardContent, Button, alpha, Grid
} from '@mui/material'
import { ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { SERVICES } from '@/lib/services-data'
import servicesHeader from '@/assests/images/services-header.jpeg'

export const revalidate = 120 // Revalidate every 2 minutes


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Services' })
  return { title: t('title'), description: t('subtitle') }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Services' })

  return (
    <Box>
      {/* ── Hero ───────────────────────────────────────────── */}
      <Box
        sx={{
          minHeight: '45vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 30% 50%, rgba(242,100,25,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(246,174,45,0.05) 0%, transparent 55%),
            linear-gradient(180deg, rgba(14, 20, 32, 0.7) 0%, rgba(18, 24, 36, 0.85) 100%),
            url(${servicesHeader.src})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
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
              linear-gradient(rgba(242,100,25,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(242,100,25,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.5) 0%, transparent 70%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', py: 10 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 1.5 }}
          >
            {t('overline')}
          </Typography>
          <Typography variant="h1" sx={{ mb: 2.5, maxWidth: 640 }}>
            {t('heroTitle')}{' '}
            <Box component="span" sx={{ background: 'linear-gradient(135deg,#F26419,#F6AE2D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('heroTitleHighlight')}
            </Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, maxWidth: 560 }}>
            {t('heroSubtitle')}
          </Typography>
        </Container>
      </Box>

      {/* ── Service Cards Grid ──────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {SERVICES.map(({ slug, icon: Icon, color }) => {
            const name = t(`items.${slug}.name`)
            const summary = t(`items.${slug}.summary`)
            const tagline = t(`items.${slug}.tagline`)

            return (
              <Grid key={slug} size={{ xs: 12, sm: 6 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 24px 60px ${alpha(color, 0.2)}`,
                    },
                    '&:hover .service-arrow': { transform: 'translateX(4px)' },
                  }}
                >
                  {/* Accent bar */}
                  <Box sx={{ height: 4, background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.4)})` }} />

                  <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        background: alpha(color, 0.12),
                        border: `1px solid ${alpha(color, 0.25)}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={26} color={color} />
                    </Box>

                    {/* Text */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        {name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75, mb: 1.5 }}>
                        {summary}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color, fontWeight: 600, fontStyle: 'italic' }}
                      >
                        &ldquo;{tagline}&rdquo;
                      </Typography>
                    </Box>

                    {/* CTA */}
                    <Link href={`/${locale}/services/${slug}`} style={{ textDecoration: 'none' }}>
                      <Button
                        id={`service-card-${slug}`}
                        component="span"
                        variant="outlined"
                        endIcon={
                          <ArrowRight
                            size={16}
                            className="service-arrow"
                            style={{ transition: 'transform 0.2s ease' }}
                          />
                        }
                        sx={{
                          alignSelf: 'flex-start',
                          borderColor: alpha(color, 0.4),
                          color,
                          '&:hover': { borderColor: color, background: alpha(color, 0.06) },
                        }}
                      >
                        {t('learnMore')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      {/* ── CTA Strip ──────────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background:
            'linear-gradient(135deg, rgba(242, 100, 25, 0.08) 0%, rgba(30, 38, 53, 0.5) 100%)',
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <MessageSquare size={36} color="#F26419" style={{ marginBottom: 16 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
            {t('notSureTitle')}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 480, mx: 'auto' }}>
            {t('notSureSubtitle')}
          </Typography>
          <Link href={`/${locale}/contact`} style={{ textDecoration: 'none' }}>
            <Button
              id="services-contact-us-btn"
              component="span"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                fontWeight: 700,
                px: 5,
                '&:hover': { background: 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)' },
              }}
            >
              {t('contactUsBtn')}
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  )
}
