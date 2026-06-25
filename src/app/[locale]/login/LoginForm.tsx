'use client'

import { useState, useTransition } from 'react'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Link as MuiLink,
  Alert,
  alpha,
} from '@mui/material'
import { Phone, Lock, Eye, EyeOff, HardHat } from 'lucide-react'
import NextLink from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { LoadingButton } from '@/components/ui'
import { signIn } from '../auth/actions'

export default function LoginForm() {
  const t = useTranslations('Auth')
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.append('locale', locale)

    startTransition(async () => {
      const result = await signIn(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: (t) =>
          `radial-gradient(ellipse at 20% 50%, ${alpha(t.palette.primary.main, 0.08)} 0%, transparent 60%),
           radial-gradient(ellipse at 80% 20%, ${alpha(t.palette.secondary.main, 0.06)} 0%, transparent 50%),
           ${t.palette.background.default}`,
        p: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        {/* Logo / Brand */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #F26419, #F6AE2D)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              boxShadow: '0 8px 32px rgba(242, 100, 25, 0.35)',
            }}
          >
            <HardHat size={32} color="#fff" />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            Safe-Construct
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('loginSubtitle')}
          </Typography>
        </Box>

        <Card
          sx={{
            border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {t('loginTitle')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('loginDescription')}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                id="login-phone"
                name="phone"
                label={t('phoneLabel')}
                type="tel"
                fullWidth
                required
                autoFocus
                autoComplete="tel"
                placeholder="671172775"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone size={18} opacity={0.6} />
                        <Typography
                          variant="body2"
                          sx={{ ml: 1, mr: 0.5, color: 'text.secondary', fontWeight: 500 }}
                        >
                          +237
                        </Typography>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ mb: 2.5 }}
              />

              <TextField
                id="login-password"
                name="password"
                label={t('passwordLabel')}
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                autoComplete="current-password"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} opacity={0.6} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          id="toggle-password-visibility"
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                          size="small"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ mb: 3 }}
              />

              <LoadingButton
                id="login-submit-btn"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                loading={isPending}
                loadingText={t('signingIn')}
                sx={{
                  background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #C44E10 0%, #C48B1A 100%)',
                  },
                }}
              >
                {t('signIn')}
              </LoadingButton>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('noAccount')}{' '}
                <MuiLink
                  component={NextLink}
                  href={`/${locale}/register`}
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {t('requestAccess')}
                </MuiLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <MuiLink
            component={NextLink}
            href={`/${locale}`}
            sx={{ color: 'text.secondary', fontSize: '0.875rem', textDecoration: 'none' }}
          >
            ← {t('backToSite')}
          </MuiLink>
        </Box>
      </Box>
    </Box>
  )
}
