'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Box, Container, Typography, Button, Chip, Grid,
  Accordion, AccordionSummary, AccordionDetails, alpha,
} from '@mui/material'
import { ArrowLeft, ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { CustomTooltip } from '@/components/ui'
import ServiceRequestModal from '@/components/forms/ServiceRequestModal'
import { SERVICES, SERVICE_META } from '@/lib/services-data'
import architectureServiceHeader from '@/assests/images/architecture-service-header.jpeg'
import constructionServicesHeader from '@/assests/images/construction-services.jpeg'

interface ServiceDetailClientProps {
  slug: string
}

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

export default function ServiceDetailClient({ slug }: ServiceDetailClientProps) {
  const locale = useLocale()
  const [modalOpen, setModalOpen] = useState(false)
  const service = SERVICES.find((s) => s.slug === slug)!
  const meta = SERVICE_META[slug]
  const { ref: processRef, inView: processVisible } = useInView()
  const { ref: deliverablesRef, inView: deliverablesVisible } = useInView()

  const headerImage = slug === 'architectural-design'
    ? architectureServiceHeader
    : slug === 'general-contracting'
    ? constructionServicesHeader
    : null

  return (
    <Box>
      {/* ── Cinematic Hero ──────────────────────────────── */}
      <Box
        sx={{
          minHeight: '65vh',
          display: 'flex',
          alignItems: 'flex-end',
          position: 'relative',
          overflow: 'hidden',
          pb: { xs: 6, md: 10 },
          backgroundImage: headerImage
            ? `
                radial-gradient(ellipse 90% 70% at 20% 40%, ${alpha(service.color, 0.12)} 0%, transparent 55%),
                radial-gradient(ellipse 60% 50% at 80% 80%, ${alpha(service.color, 0.06)} 0%, transparent 50%),
                linear-gradient(180deg, rgba(14, 20, 32, 0.35) 0%, rgba(18, 24, 36, 0.6) 100%),
                url(${headerImage.src})
              `
            : `
                radial-gradient(ellipse 90% 70% at 20% 40%, ${alpha(service.color, 0.15)} 0%, transparent 55%),
                radial-gradient(ellipse 60% 50% at 80% 80%, ${alpha(service.color, 0.08)} 0%, transparent 50%),
                linear-gradient(180deg, #0A0E18 0%, #121824 100%)
              `,
          backgroundSize: headerImage ? 'cover' : undefined,
          backgroundPosition: headerImage ? 'center' : undefined,
          backgroundRepeat: headerImage ? 'no-repeat' : undefined,
          borderBottom: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
        }}
      >
        {/* Animated grid */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(${alpha(service.color, 0.04)} 1px, transparent 1px),
              linear-gradient(90deg, ${alpha(service.color, 0.04)} 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at 20% 40%, rgba(0,0,0,0.6) 0%, transparent 70%)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 14 }}>
          {/* Breadcrumb */}
          <Box sx={{ mb: 4 }}>
            <Button
              id={`service-${service.slug}-back`}
              component={Link}
              href={`/${locale}/services`}
              startIcon={<ArrowLeft size={16} />}
              size="small"
              sx={{
                color: headerImage ? 'text.primary' : 'text.secondary',
                '&:hover': { color: 'text.primary' },
                textShadow: headerImage ? '0 1px 8px rgba(0, 0, 0, 0.8)' : undefined
              }}
            >
              Back to Services
            </Button>
          </Box>

          {/* Service badge */}
          <Chip
            label={meta.name}
            size="small"
            sx={{
              mb: 3,
              background: alpha(service.color, headerImage ? 0.25 : 0.15),
              color: service.color,
              border: `1px solid ${alpha(service.color, headerImage ? 0.5 : 0.3)}`,
              fontWeight: 700,
              fontSize: '0.8rem',
              backdropFilter: headerImage ? 'blur(4px)' : undefined,
            }}
          />

          {/* H1 */}
          <Typography
            variant="h1"
            sx={{
              mb: 2.5,
              maxWidth: 720,
              textShadow: headerImage ? '0 2px 14px rgba(0, 0, 0, 0.9)' : undefined
            }}
          >
            {meta.name}
          </Typography>
          <Typography
            variant="h5"
            color={headerImage ? 'text.primary' : 'text.secondary'}
            sx={{
              fontWeight: headerImage ? 500 : 400,
              maxWidth: 560,
              mb: 5,
              lineHeight: 1.6,
              textShadow: headerImage ? '0 2px 10px rgba(0, 0, 0, 0.9)' : undefined
            }}
          >
            {meta.tagline}
          </Typography>

          {/* Hero CTA */}
          <Button
            id={`service-${service.slug}-hero-cta`}
            onClick={() => setModalOpen(true)}
            variant="contained"
            size="large"
            endIcon={<ArrowRight size={18} />}
            sx={{
              background: `linear-gradient(135deg, ${service.color}, ${alpha(service.color, 0.7)})`,
              fontWeight: 700,
              px: 4,
              '&:hover': { filter: 'brightness(0.9)' },
            }}
          >
            {meta.ctaLabel}
          </Button>
        </Container>
      </Box>

      {/* ── What is Included ─────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: service.color, fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1.5 }}>
              What&apos;s Included
            </Typography>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Everything You Need
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {meta.summary} Our full-package approach means nothing falls through the cracks.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              ref={deliverablesRef}
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
            >
              {service.deliverables.map((d, i) => (
                <CustomTooltip key={d} title="Click to request this service">
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'flex-start',
                      p: 1.5,
                      borderRadius: 2,
                      border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                      opacity: deliverablesVisible ? 1 : 0,
                      transform: deliverablesVisible ? 'translateY(0)' : 'translateY(16px)',
                      transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`,
                      '&:hover': { borderColor: service.color, background: alpha(service.color, 0.04) },
                    }}
                  >
                    <CheckCircle2 size={18} color={service.color} style={{ flexShrink: 0, marginTop: 2 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{d}</Typography>
                  </Box>
                </CustomTooltip>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ── Process ──────────────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: (t) => alpha(t.palette.background.paper, 0.4), borderTop: (t) => `1px solid ${alpha(t.palette.divider, 1)}`, borderBottom: (t) => `1px solid ${alpha(t.palette.divider, 1)}` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" sx={{ color: service.color, fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1.5 }}>
              How It Works
            </Typography>
            <Typography variant="h3">The Process</Typography>
          </Box>

          <Box
            ref={processRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: `repeat(${service.process.length}, 1fr)` },
              gap: { xs: 4, md: 3 },
              position: 'relative',
            }}
          >
            {/* Connector line */}
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'absolute',
                top: 22,
                left: `${(1 / service.process.length / 2) * 100}%`,
                right: `${(1 / service.process.length / 2) * 100}%`,
                height: 2,
                background: alpha(service.color, 0.15),
                zIndex: 0,
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: processVisible ? '100%' : '0%',
                  background: `linear-gradient(90deg, ${service.color}, ${alpha(service.color, 0.4)})`,
                  transition: 'width 1.4s ease 0.3s',
                  borderRadius: 1,
                }}
              />
            </Box>

            {service.process.map(({ title, desc }, i) => (
              <Box
                key={title}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  textAlign: { xs: 'left', md: 'center' },
                  position: 'relative',
                  zIndex: 1,
                  opacity: processVisible ? 1 : 0,
                  transform: processVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.4s ease ${i * 0.15}s, transform 0.4s ease ${i * 0.15}s`,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: alpha(service.color, 0.12),
                    border: `2px solid ${service.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    color: service.color,
                  }}
                >
                  {i + 1}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.75, px: { md: 1.5 } }}>{title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, px: { md: 1.5 } }}>{desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Differentiators ──────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: service.color, fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1.5 }}>
            Why Choose Us
          </Typography>
          <Typography variant="h3">Why Safe-Construct?</Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2.5,
            maxWidth: 720,
            mx: 'auto',
          }}
        >
          {service.differentiators.map((d) => (
            <Box
              key={d}
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                p: 2.5,
                borderRadius: 3,
                border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                '&:hover': { borderColor: service.color, background: alpha(service.color, 0.04) },
                transition: 'all 0.2s',
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: service.color,
                  mt: 0.7,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.6 }}>{d}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 10 }, borderTop: (t) => `1px solid ${alpha(t.palette.divider, 1)}` }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: service.color, fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1.5 }}>
              FAQ
            </Typography>
            <Typography variant="h3">Common Questions</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {service.faqs.map(({ q, a }) => (
              <Accordion
                key={q}
                sx={{
                  background: 'transparent',
                  border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { border: `1px solid ${alpha(service.color, 0.3)}`, background: alpha(service.color, 0.03) },
                }}
              >
                <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                  <Typography sx={{ fontWeight: 600 }}>{q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          textAlign: 'center',
          background: `
            radial-gradient(ellipse 60% 80% at 50% 50%, ${alpha(service.color, 0.08)} 0%, transparent 65%),
            linear-gradient(180deg, transparent, #0E1420)
          `,
          borderTop: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ mb: 2 }}>
            Ready to get started?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            Tell us about your project and we&apos;ll reach out within 24 hours.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              id={`service-${service.slug}-bottom-cta`}
              onClick={() => setModalOpen(true)}
              variant="contained"
              size="large"
              sx={{
                background: `linear-gradient(135deg, ${service.color}, ${alpha(service.color, 0.7)})`,
                fontWeight: 700,
                px: 4,
              }}
            >
              {meta.ctaLabel}
            </Button>
            <Button
              id={`service-${service.slug}-contact`}
              component={Link}
              href={`/${locale}/contact`}
              variant="outlined"
              size="large"
              sx={{ fontWeight: 600, px: 4 }}
            >
              Contact Us First
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Service Request Modal */}
      <ServiceRequestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceType={service.type}
        serviceName={meta.name}
        ctaLabel={meta.ctaLabel}
      />
    </Box>
  )
}
