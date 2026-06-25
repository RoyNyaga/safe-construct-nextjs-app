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
import { signUp } from '../auth/actions'
import { Autocomplete } from '@mui/material'
import { COUNTRIES, type Country } from '@/lib/countries'

export default function RegisterForm() {
  const t = useTranslations('Auth')
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find((c) => c.code === 'CM') || COUNTRIES[0]
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirm = formData.get('confirmPassword') as string

    if (password !== confirm) {
      setError(t('passwordMismatch'))
      return
    }

    const rawPhone = (formData.get('phone') as string).trim()
    const fullPhone = rawPhone.startsWith('+') ? rawPhone : `${selectedCountry.dialCode}${rawPhone}`
    formData.set('phone', fullPhone)

    formData.append('locale', locale)

    startTransition(async () => {
      const result = await signUp(formData)
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
          `radial-gradient(ellipse at 80% 50%, ${alpha(t.palette.primary.main, 0.08)} 0%, transparent 60%),
           radial-gradient(ellipse at 20% 80%, ${alpha(t.palette.secondary.main, 0.06)} 0%, transparent 50%),
           ${t.palette.background.default}`,
        p: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 440 }}>
        {/* Brand */}
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
            {t('registerSubtitle')}
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
              {t('registerTitle')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('registerDescription')}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5 }}>
                <Autocomplete
                  id="country-code-select"
                  options={COUNTRIES}
                  getOptionLabel={(option) => `${option.flag} ${option.dialCode}`}
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props
                    return (
                      <Box key={option.code} component="li" sx={{ fontSize: '0.875rem' }} {...optionProps}>
                        <Typography sx={{ mr: 1.5, fontSize: '1.2rem' }}>{option.flag}</Typography>
                        <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
                          {locale === 'fr' ? option.nameFr : option.name}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: '0.8rem', ml: 1 }}>
                          ({option.dialCode})
                        </Typography>
                      </Box>
                    )
                  }}
                  value={selectedCountry}
                  onChange={(event, newValue) => {
                    if (newValue) setSelectedCountry(newValue)
                  }}
                  disableClearable
                  autoHighlight
                  filterOptions={(options, state) => {
                    const query = state.inputValue.toLowerCase().trim()
                    return options.filter(
                      (o) =>
                        o.name.toLowerCase().includes(query) ||
                        o.nameFr.toLowerCase().includes(query) ||
                        o.code.toLowerCase().includes(query) ||
                        o.dialCode.toLowerCase().includes(query) ||
                        o.dialCode.replace('+', '').includes(query)
                    )
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t('countryCode') || 'Code'}
                      variant="outlined"
                      sx={{
                        width: { xs: 110, sm: 130 },
                        '& .MuiOutlinedInput-root': {
                          paddingLeft: '8px !important',
                        }
                      }}
                      slotProps={{
                        ...params.slotProps,
                        input: {
                          ...params.slotProps.input,
                          startAdornment: (
                            <InputAdornment position="start" sx={{ mr: -0.5 }}>
                              <Typography sx={{ fontSize: '1.2rem' }}>{selectedCountry.flag}</Typography>
                              {params.slotProps.input.startAdornment}
                            </InputAdornment>
                          ),
                        }
                      }}
                    />
                  )}
                />

                <TextField
                  id="register-phone"
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
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ flexGrow: 1 }}
                />
              </Box>

              <TextField
                id="register-password"
                name="password"
                label={t('passwordLabel')}
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                autoComplete="new-password"
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
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ mb: 2.5 }}
              />

              <TextField
                id="register-confirm-password"
                name="confirmPassword"
                label={t('confirmPassword')}
                type={showConfirm ? 'text' : 'password'}
                fullWidth
                required
                autoComplete="new-password"
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
                          id="toggle-confirm-visibility"
                          onClick={() => setShowConfirm((v) => !v)}
                          edge="end"
                          size="small"
                        >
                          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ mb: 3 }}
              />

              <LoadingButton
                id="register-submit-btn"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                loading={isPending}
                loadingText={t('creatingAccount')}
                sx={{
                  background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #C44E10 0%, #C48B1A 100%)',
                  },
                }}
              >
                {t('createAccount')}
              </LoadingButton>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('alreadyHaveAccount')}{' '}
                <MuiLink
                  component={NextLink}
                  href={`/${locale}/login`}
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {t('signInLink')}
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
