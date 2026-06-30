'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Container, Typography, alpha } from '@mui/material'
import { MessageSquare, FileText, Building2, Key } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ProcessSection() {
  const t = useTranslations('Home.process')
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setProgress(1) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const STEPS = [
    { icon: MessageSquare, color: '#F26419', title: t('step1_title'), desc: t('step1_desc') },
    { icon: FileText, color: '#F6AE2D', title: t('step2_title'), desc: t('step2_desc') },
    { icon: Building2, color: '#42A5F5', title: t('step3_title'), desc: t('step3_desc') },
    { icon: Key, color: '#66BB6A', title: t('step4_title'), desc: t('step4_desc') },
  ]

  return (
    <Box id="process" sx={{ py: { xs: 10, md: 14 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 1.5 }}
          >
            {t('overline')}
          </Typography>
          <Typography variant="h2">{t('title')}</Typography>
        </Box>

        <Box
          ref={ref}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: { xs: 4, md: 0 },
            position: 'relative',
          }}
        >
          {/* Connector line (desktop only) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 28,
              left: '12.5%',
              right: '12.5%',
              height: 2,
              backgroundColor: (t) => alpha(t.palette.divider, 1),
              zIndex: 0,
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #F26419, #F6AE2D)',
                transition: 'width 1.5s ease 0.3s',
                borderRadius: 1,
              }}
            />
          </Box>

          {STEPS.map(({ icon: Icon, color, title, desc }, i) => (
            <Box
              key={title}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'flex-start', md: 'center' },
                textAlign: { xs: 'left', md: 'center' },
                position: 'relative',
                zIndex: 1,
                opacity: progress ? 1 : 0,
                transform: progress ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${i * 0.2}s, transform 0.5s ease ${i * 0.2}s`,
              }}
            >
              {/* Step badge */}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: alpha(color, 0.12),
                  border: `2px solid ${color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Icon size={24} color={color} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: '#fff',
                  }}
                >
                  {i + 1}
                </Box>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, px: { md: 2 } }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, px: { md: 2 } }}>
                {desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
