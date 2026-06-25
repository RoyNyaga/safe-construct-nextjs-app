'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Container, Typography, Card, CardContent, Button, alpha } from '@mui/material'
import { Ruler, HardHat, Eye, Calculator, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

const SERVICES = [
  { key: 'architecturalDesign', icon: Ruler, color: '#F26419' },
  { key: 'generalContracting', icon: HardHat, color: '#F6AE2D' },
  { key: 'supervision', icon: Eye, color: '#42A5F5' },
  { key: 'costEstimation', icon: Calculator, color: '#66BB6A' },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function ServicesTeaser() {
  const t = useTranslations('Home.services')
  const locale = useLocale()
  const { ref, inView } = useInView()

  return (
    <Box
      id="services-teaser"
      sx={{
        py: { xs: 10, md: 14 },
        background: (t) =>
          `linear-gradient(180deg, transparent 0%, ${alpha(t.palette.background.paper, 0.3)} 50%, transparent 100%)`,
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 1.5 }}
          >
            What We Do
          </Typography>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
            {t('subtitle')}
          </Typography>
        </Box>

        {/* Service cards */}
        <Box
          ref={ref}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
            mb: 6,
          }}
        >
          {SERVICES.map(({ key, icon: Icon, color }, i) => (
            <Card
              key={key}
              sx={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                cursor: 'default',
                '&:hover': { transform: 'translateY(-6px)' },
              }}
            >
              <CardContent sx={{ p: 3.5 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    background: alpha(color, 0.12),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    border: `1px solid ${alpha(color, 0.2)}`,
                  }}
                >
                  <Icon size={24} color={color} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
                  {t(key)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {t(`${key}Desc`)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* CTA */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            id="services-view-all-btn"
            component={Link}
            href={`/${locale}/services`}
            variant="outlined"
            size="large"
            endIcon={<ArrowRight size={18} />}
            sx={{ fontWeight: 600, px: 4 }}
          >
            {t('learnMore')} — View All Services
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
