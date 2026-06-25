'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Container, Typography, Button, Chip, alpha } from '@mui/material'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import homepageHeader from '@/assests/images/homepage-header.jpeg'

const STATS = [
  { value: 150, suffix: '+', labelKey: 'projects' },
  { value: 12, suffix: '+', labelKey: 'years' },
  { value: 320, suffix: '+', labelKey: 'clients' },
  { value: 80, suffix: '+', labelKey: 'designs' },
]

function useCountUp(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])
  return count
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(value, 2000, active)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <Box ref={ref} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          background: 'linear-gradient(135deg, #F26419, #F6AE2D)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          mb: 0.5,
        }}
      >
        {count}{suffix}
      </Typography>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{
          fontWeight: 600,
          textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)'
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}

export default function HeroSection() {
  const t = useTranslations('Home')
  const locale = useLocale()

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        mt: -9, // pull up behind navbar
        pt: 9,
      }}
    >
      {/* Animated background image with dark overlay gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(242,100,25,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(246,174,45,0.06) 0%, transparent 50%),
            linear-gradient(180deg, rgba(14, 20, 32, 0.45) 0%, rgba(18, 24, 36, 0.7) 100%),
            url(${homepageHeader.src})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />

      {/* Blueprint grid overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(242,100,25,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(242,100,25,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          zIndex: 0,
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 75%)',
        }}
      />

      {/* Animated building silhouette */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 900,
          opacity: 0.04,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <svg viewBox="0 0 900 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Simple city silhouette */}
          <rect x="50" y="200" width="80" height="200" fill="#F26419" />
          <rect x="70" y="150" width="40" height="50" fill="#F26419" />
          <rect x="160" y="120" width="120" height="280" fill="#F26419" />
          <rect x="180" y="80" width="80" height="40" fill="#F26419" />
          <rect x="200" y="40" width="40" height="40" fill="#F26419" />
          <rect x="310" y="180" width="100" height="220" fill="#F26419" />
          <rect x="440" y="100" width="140" height="300" fill="#F26419" />
          <rect x="460" y="60" width="100" height="40" fill="#F26419" />
          <rect x="500" y="20" width="20" height="40" fill="#F26419" />
          <rect x="610" y="160" width="80" height="240" fill="#F26419" />
          <rect x="720" y="140" width="100" height="260" fill="#F26419" />
          <rect x="740" y="100" width="60" height="40" fill="#F26419" />
          <rect x="760" y="60" width="20" height="40" fill="#F26419" />
          <rect x="850" y="220" width="50" height="180" fill="#F26419" />
        </svg>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: 760 }}>
          {/* Badge */}
          <Chip
            label={t('hero.badge')}
            size="small"
            sx={{
              mb: 3,
              background: (t) => alpha(t.palette.primary.main, 0.25),
              color: 'primary.light',
              border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.5)}`,
              fontWeight: 700,
              letterSpacing: '0.04em',
              fontSize: '0.75rem',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* H1 */}
          <Typography
            variant="h1"
            sx={{
              mb: 2.5,
              lineHeight: 1.05,
              color: 'text.primary',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)',
            }}
          >
            {t('hero.title')}{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))',
              }}
            >
              {t('hero.titleHighlight')}
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            component="p"
            color="text.primary"
            sx={{
              mb: 5,
              maxWidth: 580,
              fontWeight: 500,
              lineHeight: 1.6,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)',
            }}
          >
            {t('hero.subtitle')}
          </Typography>

          {/* CTAs */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 8 }}>
            <Button
              id="hero-cta-catalogue"
              component={Link}
              href={`/${locale}/catalogue`}
              variant="contained"
              size="large"
              endIcon={<ArrowRight size={18} />}
              sx={{
                background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                fontWeight: 700,
                px: 4,
                '&:hover': {
                  background: 'linear-gradient(135deg, #C44E10 0%, #C48B1A 100%)',
                  boxShadow: '0 12px 40px rgba(242,100,25,0.4)',
                },
              }}
            >
              {t('hero.ctaPrimary')}
            </Button>
            <Button
              id="hero-cta-contact"
              component={Link}
              href={`/${locale}/contact`}
              variant="outlined"
              size="large"
              startIcon={<Play size={16} />}
              sx={{
                borderColor: (t) => alpha(t.palette.primary.main, 0.4),
                color: 'text.primary',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: (t) => alpha(t.palette.primary.main, 0.06),
                },
              }}
            >
              {t('hero.ctaSecondary')}
            </Button>
          </Box>

          {/* Stats */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 3,
              maxWidth: 560,
              pt: 5,
              borderTop: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
              '@media (max-width: 480px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
            }}
          >
            {STATS.map(({ value, suffix, labelKey }) => (
              <StatCounter
                key={labelKey}
                value={value}
                suffix={suffix}
                label={t(`stats.${labelKey}`)}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
