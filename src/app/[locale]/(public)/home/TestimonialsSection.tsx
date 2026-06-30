'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Container, Typography, Card, CardContent, IconButton, alpha } from '@mui/material'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function TestimonialsSection() {
  const t = useTranslations('Home.testimonials')
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const TESTIMONIALS = [
    {
      quote: t('quote1'),
      name: 'Jean-Baptiste N.',
      location: 'Yaoundé, Cameroon',
      type: t('quote1_type'),
      rating: 5,
    },
    {
      quote: t('quote2'),
      name: 'Marie-Claire F.',
      location: 'Douala, Cameroon',
      type: t('quote2_type'),
      rating: 5,
    },
    {
      quote: t('quote3'),
      name: 'Emmanuel T.',
      location: 'Bafoussam, Cameroon',
      type: t('quote3_type'),
      rating: 5,
    },
    {
      quote: t('quote4'),
      name: 'Patricia M.',
      location: 'Limbe, Cameroon',
      type: t('quote4_type'),
      rating: 5,
    },
  ]

  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length)
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  useEffect(() => {
    if (!autoPlay) return
    timerRef.current = setInterval(next, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [autoPlay, current])

  return (
    <Box id="testimonials" sx={{ py: { xs: 10, md: 14 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 1.5 }}
          >
            {t('overline')}
          </Typography>
          <Typography variant="h2">{t('title')}</Typography>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Card
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: 'center',
              background: (t) =>
                `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.05)} 0%, ${alpha(t.palette.background.paper, 1)} 100%)`,
              border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.12)}`,
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Stars */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 3 }}>
                {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                  <Star key={i} size={20} fill="#F6AE2D" color="#F6AE2D" />
                ))}
              </Box>

              {/* Quote */}
              <Typography
                variant="h5"
                component="blockquote"
                sx={{
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'text.primary',
                  lineHeight: 1.7,
                  mb: 4,
                  position: 'relative',
                  '&::before': {
                    content: '"\\201C"',
                    fontSize: '4rem',
                    color: 'primary.main',
                    opacity: 0.3,
                    position: 'absolute',
                    top: -20,
                    left: -10,
                    lineHeight: 1,
                    fontStyle: 'normal',
                  },
                }}
              >
                {TESTIMONIALS[current].quote}
              </Typography>

              {/* Author */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {TESTIMONIALS[current].name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  {TESTIMONIALS[current].location} · {TESTIMONIALS[current].type}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Nav arrows */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              mt: 4,
            }}
          >
            <IconButton
              id="testimonial-prev-btn"
              onClick={() => { setAutoPlay(false); prev() }}
              size="small"
              sx={{
                border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
              }}
            >
              <ChevronLeft size={18} />
            </IconButton>

            {/* Dots */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {TESTIMONIALS.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => { setAutoPlay(false); setCurrent(i) }}
                  sx={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current
                      ? 'linear-gradient(90deg, #F26419, #F6AE2D)'
                      : 'rgba(255,255,255,0.12)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Box>

            <IconButton
              id="testimonial-next-btn"
              onClick={() => { setAutoPlay(false); next() }}
              size="small"
              sx={{
                border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
              }}
            >
              <ChevronRight size={18} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
