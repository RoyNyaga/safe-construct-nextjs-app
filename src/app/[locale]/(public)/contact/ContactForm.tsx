'use client'

import { useState, useTransition } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Divider,
  IconButton,
  alpha,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import {
  Phone, Mail, MapPin, Clock, ChevronDown,
  MessageSquare, Send, CheckCircle2
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { LoadingButton, CustomNotification, CustomTooltip } from '@/components/ui'
import type { NotificationOptions } from '@/components/ui'
import { submitContact } from '@/app/[locale]/actions/contact'

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const FAQS = [
  {
    q: 'How long does it take to get an architectural design?',
    a: 'Our standard turnaround for a full architectural design package is 10–21 business days depending on the complexity of the project. Simple residential plans (bungalows, duplexes) can be ready in 10 days, while villas and multi-unit developments typically require 2–3 weeks.',
  },
  {
    q: 'Do you work outside Yaoundé and Douala?',
    a: 'Yes — we deliver design services across all regions of Cameroon and internationally. For construction supervision, we currently operate primarily in the Centre, Littoral, and West regions, with plans to expand.',
  },
  {
    q: 'What documents do I need to start a construction project?',
    a: 'You will need your land title (Titre Foncier), a site topographic survey, and your architectural plans (which we can produce for you). We will guide you through regulatory approvals and permits.',
  },
  {
    q: 'How do I track my project\'s progress?',
    a: 'Every client with an active project receives access to our project portal where you can view progress photos, weekly reports, task completion status, and material usage logs — all updated by our on-site team.',
  },
]

const CONTACT_INFO = [
  { icon: Phone, label: 'Phone / WhatsApp', value: '+237 671 172 775', href: 'tel:+237671172775' },
  { icon: MapPin, label: 'Address', value: 'Yaoundé, Cameroon', href: null },
  { icon: Clock, label: 'Office Hours', value: 'Mon–Sat · 8:00 AM – 6:00 PM', href: null },
]

type FormState = {
  full_name: string
  email: string
  whatsapp_phone: string
  subject: string
  message: string
  preferred_contact: 'whatsapp' | 'email'
}

const EMPTY: FormState = {
  full_name: '',
  email: '',
  whatsapp_phone: '',
  subject: '',
  message: '',
  preferred_contact: 'whatsapp',
}

export default function ContactForm() {
  const t = useTranslations('Contact')
  const locale = useLocale()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [notif, setNotif] = useState<NotificationOptions>({ open: false, message: '' })

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  function validate(): boolean {
    const e: Partial<FormState> = {}
    if (!form.full_name.trim() || form.full_name.trim().length < 2) e.full_name = 'Full name is required (min 2 characters).'
    
    // Email is required only if preferred_contact is email
    if (form.preferred_contact === 'email') {
      if (!form.email.trim()) {
        e.email = 'Email address is required when preferred response channel is Email.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        e.email = 'Please enter a valid email address.'
      }
    } else {
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        e.email = 'Please enter a valid email address.'
      }
    }

    if (!form.whatsapp_phone.replace(/\D/g, '') || form.whatsapp_phone.replace(/\D/g, '').length < 8)
      e.whatsapp_phone = 'Enter a valid phone number (min 8 digits).'
    if (!form.subject.trim() || form.subject.trim().length < 3) e.subject = 'Subject is required.'
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Message must be at least 20 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    fd.append('locale', locale)

    startTransition(async () => {
      const result = await submitContact(fd)
      if (result.status === 'success') {
        setSubmitted(true)
        setForm(EMPTY)
      } else {
        setNotif({ open: true, message: result.message, severity: 'error' })
      }
    })
  }

  return (
    <Box>
      {/* ── Form + Info ─────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ pt: { xs: 14, md: 16 }, pb: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }}>

          {/* ── Left: Form ──────────────────────────────────── */}
          <Grid size={{ xs: 12, md: 7 }}>
            {submitted ? (
              /* ── Success state ── */
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  py: 10,
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: (t) => alpha(t.palette.success.main, 0.12),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: (t) => `2px solid ${t.palette.success.main}`,
                  }}
                >
                  <CheckCircle2 size={40} color="#66BB6A" />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Message Sent!</Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 360 }}>
                  {t('form.success')} We typically respond within a few hours on WhatsApp.
                </Typography>
                <LoadingButton
                  id="contact-send-another"
                  variant="outlined"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </LoadingButton>
              </Box>
            ) : (
              /* ── The Form ── */
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {t('title')}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  Fill in the form below and we&apos;ll reach out on your preferred channel.
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      id="contact-full-name"
                      name="full_name"
                      label={t('form.name')}
                      fullWidth
                      required
                      value={form.full_name}
                      onChange={set('full_name')}
                      error={!!errors.full_name}
                      helperText={errors.full_name}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      id="contact-email"
                      name="email"
                      label={
                        form.preferred_contact === 'email'
                          ? t('form.email')
                          : `${t('form.email')} (${locale === 'fr' ? 'optionnel' : 'optional'})`
                      }
                      type="email"
                      fullWidth
                      required={form.preferred_contact === 'email'}
                      value={form.email}
                      onChange={set('email')}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <CustomTooltip title="Include your country code, e.g. +237 for Cameroon.">
                      <TextField
                        id="contact-whatsapp"
                        name="whatsapp_phone"
                        label={t('form.phone')}
                        type="tel"
                        fullWidth
                        required
                        placeholder="+237 671 172 775"
                        value={form.whatsapp_phone}
                        onChange={set('whatsapp_phone')}
                        error={!!errors.whatsapp_phone}
                        helperText={errors.whatsapp_phone}
                      />
                    </CustomTooltip>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      id="contact-subject"
                      name="subject"
                      label="Subject"
                      fullWidth
                      required
                      placeholder="e.g. Architectural Design Inquiry"
                      value={form.subject}
                      onChange={set('subject')}
                      error={!!errors.subject}
                      helperText={errors.subject}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      id="contact-message"
                      name="message"
                      label={t('form.message')}
                      fullWidth
                      required
                      multiline
                      rows={5}
                      value={form.message}
                      onChange={set('message')}
                      error={!!errors.message}
                      helperText={errors.message || `${form.message.length} / 20 min chars`}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <CustomTooltip title="Select how you'd like us to contact you back. We respond faster on WhatsApp.">
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 500 }}>
                          {t('form.preferredChannel')}
                        </Typography>
                        <ToggleButtonGroup
                          id="contact-preferred-channel"
                          exclusive
                          value={form.preferred_contact}
                          onChange={(_, v) => { if (v) setForm((f) => ({ ...f, preferred_contact: v })) }}
                          sx={{ gap: 1.5 }}
                        >
                          <ToggleButton
                            id="contact-channel-whatsapp"
                            value="whatsapp"
                            sx={{
                              gap: 1,
                              px: 3,
                              borderRadius: '8px !important',
                              border: (t) => `1px solid ${alpha(t.palette.divider, 1)} !important`,
                              '&.Mui-selected': {
                                background: (t) => alpha(t.palette.success.main, 0.12),
                                borderColor: '#25D366 !important',
                                color: '#25D366',
                              },
                            }}
                          >
                            <WhatsAppIcon size={16} />
                            {t('form.whatsapp')}
                          </ToggleButton>
                          <ToggleButton
                            id="contact-channel-email"
                            value="email"
                            sx={{
                              gap: 1,
                              px: 3,
                              borderRadius: '8px !important',
                              border: (t) => `1px solid ${alpha(t.palette.divider, 1)} !important`,
                              '&.Mui-selected': {
                                background: (t) => alpha(t.palette.primary.main, 0.12),
                                borderColor: 'primary.main !important',
                                color: 'primary.main',
                              },
                            }}
                          >
                            <Mail size={16} />
                            {t('form.emailChannel')}
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Box>
                    </CustomTooltip>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <LoadingButton
                      id="contact-submit-btn"
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      loading={isPending}
                      loadingText="Sending..."
                      endIcon={<Send size={18} />}
                      sx={{
                        background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)',
                        py: 1.75,
                        fontWeight: 700,
                        '&:hover': { background: 'linear-gradient(135deg,#C44E10 0%,#C48B1A 100%)' },
                      }}
                    >
                      {t('form.submit')}
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>

          {/* ── Right: Info Panel ────────────────────────────── */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                background: (t) =>
                  `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.06)} 0%, ${alpha(t.palette.background.paper, 1)} 100%)`,
                border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
                mb: 3,
              }}
            >
              <CardContent sx={{ p: 3.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  {t('info.title')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <Box key={label} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          background: (t) => alpha(t.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} color="#F26419" />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {label}
                        </Typography>
                        {href ? (
                          <Typography
                            component="a"
                            href={href}
                            sx={{ display: 'block', color: 'text.primary', textDecoration: 'none', fontWeight: 500, '&:hover': { color: 'primary.main' } }}
                          >
                            {value}
                          </Typography>
                        ) : (
                          <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>{value}</Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* WhatsApp CTA */}
                <Box
                  component="a"
                  href="https://wa.me/237671172775"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: 'block', textDecoration: 'none' }}
                >
                  <LoadingButton
                    id="contact-whatsapp-cta"
                    variant="contained"
                    fullWidth
                    startIcon={<WhatsAppIcon size={18} />}
                    sx={{
                      background: 'linear-gradient(135deg,#25D366,#128C7E)',
                      '&:hover': { background: 'linear-gradient(135deg,#1DA851,#0E6B5E)' },
                      pointerEvents: 'none',
                    }}
                  >
                    {t('info.whatsappCta')}
                  </LoadingButton>
                </Box>
              </CardContent>
            </Card>

            {/* Social row */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
              {[
                { label: 'WhatsApp', href: 'https://wa.me/237671172775', icon: <WhatsAppIcon size={18} /> },
                { label: 'MessageSquare', href: '#', icon: <MessageSquare size={18} /> },
              ].map(({ label, href, icon }) => (
                <CustomTooltip key={label} title={label}>
                  <IconButton
                    id={`contact-social-${label.toLowerCase()}`}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                      borderRadius: 2,
                      '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                    }}
                  >
                    {icon}
                  </IconButton>
                </CustomTooltip>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ── FAQ Section ─────────────────────────────────────────── */}
      <Box sx={{ borderTop: (t) => `1px solid ${alpha(t.palette.divider, 1)}`, py: { xs: 8, md: 10 } }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Frequently Asked Questions
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
            Quick answers to our most common questions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {FAQS.map(({ q, a }) => (
              <Accordion
                key={q}
                sx={{
                  background: 'transparent',
                  border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.3)}`,
                    background: (t) => alpha(t.palette.primary.main, 0.03),
                  },
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

      <CustomNotification options={notif} onClose={() => setNotif((n) => ({ ...n, open: false }))} />
    </Box>
  )
}
