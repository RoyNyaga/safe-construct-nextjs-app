'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Container, Typography, Card, CardContent, IconButton, alpha } from '@mui/material'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: 'Safe-Construct transformed our vision into reality. The architectural plans were exactly what we wanted, and the supervision ensured everything was built to perfection.',
    name: 'Jean-Baptiste N.',
    location: 'Yaoundé, Cameroon',
    type: 'Villa Construction',
    rating: 5,
  },
  {
    quote: 'From cost estimation to final handover, the team was professional and transparent every step of the way. Our duplex was completed on time and within budget.',
    name: 'Marie-Claire F.',
    location: 'Douala, Cameroon',
    type: 'Duplex Development',
    rating: 5,
  },
  {
    quote: 'The 3D renders gave us a perfect preview of our future home. We made several adjustments before construction — saving us significant costs and regrets.',
    name: 'Emmanuel T.',
    location: 'Bafoussam, Cameroon',
    type: 'Residential Design',
    rating: 5,
  },
  {
    quote: 'Exceptional quality and attention to detail. The Safe-Construct team went above and beyond to ensure our commercial building met all regulatory requirements.',
    name: 'Patricia M.',
    location: 'Limbe, Cameroon',
    type: 'Commercial Building',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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
            Client Stories
          </Typography>
          <Typography variant="h2">What Our Clients Say</Typography>
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
                <Typography variant="body2" color="text.secondary">
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
