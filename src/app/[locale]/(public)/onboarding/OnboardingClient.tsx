'use client'

import { useState, useTransition } from 'react'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Autocomplete,
  Alert,
  alpha,
} from '@mui/material'
import { User, Mail, Compass, HardHat } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import logoImage from '@/assests/images/transparent-background.png'
import { LoadingButton } from '@/components/ui'
import { COUNTRIES, type Country } from '@/lib/countries'
import { completeOnboarding } from '../../actions/onboarding'

interface OnboardingClientProps {
  locale: string
  userPhone: string
  userEmail: string
}

const SALUTATIONS = ['Mr.', 'Ms.', 'Dr.', 'Architect', 'Engineer']

export default function OnboardingClient({ locale, userPhone, userEmail }: OnboardingClientProps) {
  const t = useTranslations('Onboarding')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Default country search/autofill based on user's phone prefix
  const defaultCountry = COUNTRIES.find((c) => userPhone.startsWith(c.dialCode)) || 
                         COUNTRIES.find((c) => c.code === 'CM') || 
                         COUNTRIES[0]

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(defaultCountry)
  const [salutation, setSalutation] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    const firstName = (formData.get('firstName') as string).trim()
    const lastName = (formData.get('lastName') as string).trim()
    const email = (formData.get('email') as string).trim()

    if (!firstName || !lastName) {
      setError(locale === 'fr' ? 'Le prénom et le nom sont requis.' : 'First name and last name are required.')
      return
    }

    startTransition(async () => {
      const result = await completeOnboarding({
        firstName,
        lastName,
        email: email || undefined,
        title: salutation || undefined,
        country: selectedCountry ? (locale === 'fr' ? selectedCountry.nameFr : selectedCountry.name) : undefined,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        // Success -> redirect to select-context page
        router.push(`/${locale}/select-context`)
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
        background: (theme) =>
          `radial-gradient(ellipse at 80% 50%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 60%),
           radial-gradient(ellipse at 20% 80%, ${alpha(theme.palette.secondary.main, 0.06)} 0%, transparent 50%),
           ${theme.palette.background.default}`,
        p: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 480 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            component={Link}
            href={`/${locale}`}
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            <img
              src={logoImage.src}
              alt="Safe-Construct"
              style={{
                height: '60px',
                width: 'auto',
                objectFit: 'contain',
                marginBottom: '8px',
              }}
            />
          </Box>
        </Box>

        <Card
          sx={{
            border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {t('title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              {t('description')}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* Salutation / Title select */}
              <TextField
                select
                id="onboarding-salutation"
                label={t('titleLabel')}
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                fullWidth
                sx={{ mb: 2.5 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {SALUTATIONS.map((sal) => (
                  <MenuItem key={sal} value={sal}>
                    {sal}
                  </MenuItem>
                ))}
              </TextField>

              {/* First Name & Last Name */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
                <TextField
                  id="onboarding-firstname"
                  name="firstName"
                  label={t('firstName')}
                  fullWidth
                  required
                  autoFocus
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={18} opacity={0.6} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  id="onboarding-lastname"
                  name="lastName"
                  label={t('lastName')}
                  fullWidth
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={18} opacity={0.6} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              {/* Email Address */}
              <TextField
                id="onboarding-email"
                name="email"
                type="email"
                label={t('email')}
                fullWidth
                defaultValue={userEmail}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} opacity={0.6} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ mb: 2.5 }}
              />

              {/* Country of Residence Autocomplete */}
              <Autocomplete
                id="onboarding-country"
                options={COUNTRIES}
                getOptionLabel={(option) => (locale === 'fr' ? option.nameFr : option.name)}
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
                  setSelectedCountry(newValue)
                }}
                autoHighlight
                filterOptions={(options, state) => {
                  const query = state.inputValue.toLowerCase().trim()
                  return options.filter(
                    (o) =>
                      o.name.toLowerCase().includes(query) ||
                      o.nameFr.toLowerCase().includes(query) ||
                      o.code.toLowerCase().includes(query) ||
                      o.dialCode.toLowerCase().includes(query)
                  )
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('countryLabel')}
                    variant="outlined"
                    slotProps={{
                      ...params.slotProps,
                      input: {
                        ...params.slotProps.input,
                        startAdornment: (
                          <InputAdornment position="start">
                            {selectedCountry ? (
                              <Typography sx={{ fontSize: '1.2rem', mr: 0.5 }}>{selectedCountry.flag}</Typography>
                            ) : (
                              <Compass size={18} opacity={0.6} />
                            )}
                            {params.slotProps.input.startAdornment}
                          </InputAdornment>
                        ),
                      }
                    }}
                  />
                )}
                sx={{ mb: 4 }}
              />

              {/* Submit Button */}
              <LoadingButton
                id="onboarding-submit-btn"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                loading={isPending}
                loadingText={t('saving')}
                sx={{
                  background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #C44E10 0%, #C48B1A 100%)',
                  },
                }}
              >
                {t('submit')}
              </LoadingButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
