'use client'

import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Divider,
  Link as MuiLink,
  alpha,
} from '@mui/material'
import { HardHat, Send } from 'lucide-react'
import Link from 'next/link'
import logoImage from '@/assests/images/transparent-background.png'
import { useState, useTransition } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { LoadingButton, CustomNotification, CustomTooltip } from '@/components/ui'
import type { NotificationOptions } from '@/components/ui'
import { subscribeNewsletter } from '@/app/[locale]/actions/newsletter'

// WhatsApp SVG icon (not in lucide)
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const QUICK_LINKS = [
  { key: 'home', href: '' },
  { key: 'catalogue', href: '/catalogue' },
  { key: 'services', href: '/services' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}
function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const SOCIAL_LINKS = [
  { icon: WhatsAppIcon, label: 'WhatsApp', href: 'https://wa.me/237671172775' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/company/safe-construct-plc' },
  { icon: FacebookIcon, label: 'Facebook', href: 'https://web.facebook.com/SafeConstruct2005' },
]

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [isPending, startTransition] = useTransition()
  const [notif, setNotif] = useState<NotificationOptions>({ open: false, message: '' })

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    startTransition(async () => {
      const result = await subscribeNewsletter(email)
      if (result.status === 'success') {
        setNotif({ open: true, message: "You're on the list! 🎉", severity: 'success' })
        setEmail('')
      } else if (result.status === 'duplicate') {
        setNotif({ open: true, message: "You're already on our list!", severity: 'info' })
      } else {
        setNotif({ open: true, message: 'Something went wrong. Please try again.', severity: 'error' })
      }
    })
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0E1420',
        borderTop: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
        pt: 8,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component={Link}
              href={`/${locale}`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                mb: 2,
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              <img
                src={logoImage.src}
                alt="Safe-Construct"
                style={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300, lineHeight: 1.8 }}>
              {t('Footer.tagline')}
            </Typography>

            {/* Social icons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <CustomTooltip key={label} title={label}>
                  <IconButton
                    id={`footer-social-${label.toLowerCase()}`}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    aria-label={label}
                    sx={{
                      color: 'text.secondary',
                      border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
                      borderRadius: 2,
                      '&:hover': {
                        color: 'primary.main',
                        borderColor: 'primary.main',
                        backgroundColor: (t) => alpha(t.palette.primary.main, 0.08),
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={18} />
                  </IconButton>
                </CustomTooltip>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>
              {t('Footer.quickLinks')}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2 }}>
              {QUICK_LINKS.map(({ key, href }) => (
                <Box component="li" key={key} sx={{ mb: 1.5 }}>
                  <MuiLink
                    component={Link}
                    id={`footer-link-${key}`}
                    href={`/${locale}${href}`}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {t(`Nav.${key}`)}
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Legal */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>
              {t('Footer.legal')}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2 }}>
              {[
                { label: t('Footer.privacyPolicy'), href: `/${locale}/privacy` },
                { label: t('Footer.termsOfService'), href: `/${locale}/terms` },
              ].map(({ label, href }) => (
                <Box component="li" key={label} sx={{ mb: 1.5 }}>
                  <MuiLink
                    component={Link}
                    href={href}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {label}
                  </MuiLink>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>
              {t('Footer.newsletter')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 2, lineHeight: 1.7 }}>
              Stay informed on construction insights and new designs.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubscribe}
              sx={{ display: 'flex', gap: 1 }}
            >
              <TextField
                id="footer-newsletter-email"
                type="email"
                size="small"
                placeholder={t('Footer.newsletterPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ flex: 1 }}
              />
              <LoadingButton
                id="footer-newsletter-submit"
                type="submit"
                variant="contained"
                loading={isPending}
                size="small"
                sx={{
                  minWidth: 'unset',
                  px: 1.5,
                  background: 'linear-gradient(135deg, #F26419, #F6AE2D)',
                }}
              >
                <Send size={16} />
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Safe-Construct. {t('Footer.allRightsReserved')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Built with ❤️ in Cameroon
          </Typography>
        </Box>
      </Container>

      {/* Floating WhatsApp button */}
      <CustomTooltip title="Chat with us on WhatsApp" placement="left">
        <IconButton
          id="floating-whatsapp-btn"
          component="a"
          href="https://wa.me/237671172775"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)',
            zIndex: 1200,
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 12px 40px rgba(37, 211, 102, 0.5)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <WhatsAppIcon size={26} />
        </IconButton>
      </CustomTooltip>

      <CustomNotification options={notif} onClose={() => setNotif((n) => ({ ...n, open: false }))} />
    </Box>
  )
}
