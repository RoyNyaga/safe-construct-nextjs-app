'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Card,
  CardContent,
  alpha,
} from '@mui/material'
import {
  MapPin,
  Home,
  LayoutGrid,
  Sparkles,
  FileText,
  MessageSquare,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react'
import { LoadingButton, CustomButton } from '@/components/ui'
import { submitRequestDesign } from '@/app/[locale]/actions/request-design'

interface RequestDesignClientProps {
  locale: string
  initialCatalogue?: {
    id: string
    title: string
    title_fr: string | null
    style: string
    size_sqm: number | string
    bedrooms: number
    bathrooms: number
    floors: number
  } | null
}

const STEP_ICONS = [
  MapPin,
  Home,
  LayoutGrid,
  Sparkles,
  FileText,
  MessageSquare,
  Calendar,
]

export default function RequestDesignClient({
  locale,
  initialCatalogue,
}: RequestDesignClientProps) {
  const t = useTranslations('RequestDesign')
  const tc = useTranslations('Common')
  const router = useRouter()

  const [activeStep, setActiveStep] = useState(0)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState<{
    buildCountry: string
    hasLand: boolean
    hasSitePlan: boolean
    style: string
    floors: number | string
    bedrooms: number | string
    bathrooms: number | string
    hasCarPark: boolean
    hasGarden: boolean
    hasFence: boolean
    hasSwimmingPool: boolean
    hasSolarProvision: boolean
    hasBoreholeProvision: boolean
    hasServantQuarters: boolean
    sizeSqm: number | string
    requestedDocuments: string[]
    additionalNotes: string
    meetingDate: string
    meetingTime: string
    meetingTimezone: string
    fullName: string
    phoneCountryCode: string
    whatsappPhone: string
    email: string
    preferredContact: 'whatsapp' | 'email'
  }>({
    buildCountry: 'Cameroon',
    hasLand: true,
    hasSitePlan: false,
    style: initialCatalogue?.style || 'bungalow',
    floors: initialCatalogue?.floors || 1,
    bedrooms: initialCatalogue?.bedrooms || 3,
    bathrooms: initialCatalogue?.bathrooms || 2,
    hasCarPark: false,
    hasGarden: false,
    hasFence: false,
    hasSwimmingPool: false,
    hasSolarProvision: false,
    hasBoreholeProvision: false,
    hasServantQuarters: false,
    sizeSqm: initialCatalogue?.size_sqm ? Number(initialCatalogue.size_sqm) : 120,
    requestedDocuments: [] as string[],
    additionalNotes: '',
    meetingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    meetingTime: '10:00',
    meetingTimezone: 'GMT+1',
    fullName: '',
    phoneCountryCode: '+237',
    whatsappPhone: '',
    email: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'email',
  })

  const stepsKeys = ['location', 'style', 'rooms', 'features', 'documents', 'notes', 'contact'] as const

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleDocumentToggle = (docKey: string) => {
    const docs = [...formData.requestedDocuments]
    if (docs.includes(docKey)) {
      handleChange('requestedDocuments', docs.filter((d) => d !== docKey))
    } else {
      handleChange('requestedDocuments', [...docs, docKey])
    }
  }

  const handleNext = () => {
    setError(null)
    // Basic step validation before moving forward
    if (activeStep === 6) {
      // Validate step 7 fields
      if (!formData.fullName.trim()) {
        setError(locale === 'fr' ? 'Le nom complet est obligatoire.' : 'Full name is required.')
        return
      }
      if (!formData.whatsappPhone.trim()) {
        setError(locale === 'fr' ? 'Le numéro de téléphone WhatsApp est obligatoire.' : 'WhatsApp phone number is required.')
        return
      }
      if (formData.preferredContact === 'email' && !formData.email.trim()) {
        setError(locale === 'fr' ? 'L\'adresse e-mail est obligatoire pour le contact par e-mail.' : 'Email is required for email contact.')
        return
      }
    }
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setError(null)
    setActiveStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    setError(null)
    setIsPending(true)

    try {
      const res = await submitRequestDesign({
        catalogueId: initialCatalogue?.id || null,
        buildCountry: formData.buildCountry,
        hasLand: formData.hasLand,
        hasSitePlan: formData.hasSitePlan,
        style: formData.style,
        floors: formData.floors === '' ? 1 : Number(formData.floors),
        bedrooms: formData.bedrooms === '' ? 0 : Number(formData.bedrooms),
        bathrooms: formData.bathrooms === '' ? 0 : Number(formData.bathrooms),
        hasCarPark: formData.hasCarPark,
        hasGarden: formData.hasGarden,
        hasFence: formData.hasFence,
        hasSwimmingPool: formData.hasSwimmingPool,
        hasSolarProvision: formData.hasSolarProvision,
        hasBoreholeProvision: formData.hasBoreholeProvision,
        hasServantQuarters: formData.hasServantQuarters,
        sizeSqm: formData.sizeSqm === '' ? 120 : Number(formData.sizeSqm),
        requestedDocuments: formData.requestedDocuments,
        additionalNotes: formData.additionalNotes,
        meetingDate: formData.meetingDate,
        meetingTime: formData.meetingTime,
        meetingTimezone: formData.meetingTimezone,
        fullName: formData.fullName,
        phoneCountryCode: formData.phoneCountryCode,
        whatsappPhone: formData.whatsappPhone,
        email: formData.email,
        preferredContact: formData.preferredContact,
        locale,
      })

      if (res.error) {
        setError(res.error)
      } else {
        setSuccess(true)
      }
    } catch (err: any) {
      setError(err?.message || tc('error'))
    } finally {
      setIsPending(false)
    }
  }

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 12 }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
            backgroundColor: 'background.paper',
            borderRadius: 4,
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: '50%',
              backgroundColor: (theme) => alpha(theme.palette.success.main, 0.1),
              color: 'success.main',
              mb: 3,
            }}
          >
            <CheckCircle2 size={40} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            {t('success.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('success.message')}
          </Typography>
          <CustomButton
            id="request-design-success-home-btn"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => router.push(`/${locale}`)}
          >
            {t('success.backHome')}
          </CustomButton>
        </Paper>
      </Container>
    )
  }

  const ActiveIcon = STEP_ICONS[activeStep]

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Header and catalogue reference banner */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ mb: 1.5 }}>
          {t('title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('subtitle')}
        </Typography>

        {initialCatalogue && (
          <Alert
            severity="info"
            id="catalogue-seed-alert"
            sx={{
              borderRadius: 3,
              maxWidth: 600,
              mx: 'auto',
              textAlign: 'left',
              border: (theme) => `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            }}
          >
            {locale === 'fr'
              ? `Configuration pré-remplie basée sur le modèle : `
              : `Pre-configured design based on model: `}
            <strong>{initialCatalogue.title_fr && locale === 'fr' ? initialCatalogue.title_fr : initialCatalogue.title}</strong>
          </Alert>
        )}
      </Box>

      {/* Stepper Header (Desktop Only) */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, mb: 6 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {stepsKeys.map((key, index) => (
            <Step key={key}>
              <StepLabel
                slotProps={{
                  label: {
                    style: {
                      fontSize: '0.8rem',
                      fontWeight: activeStep === index ? 700 : 500,
                    },
                  },
                }}
              >
                {t(`steps.${key}`)}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Main Form Content Surface */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 5 },
          backgroundColor: 'background.paper',
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
          borderRadius: 4,
          boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
        }}
      >
        {/* Step Indicator text (Mobile fallback / header) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15),
              color: 'primary.main',
            }}
          >
            <ActiveIcon size={22} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
              {t('step', { current: activeStep + 1, total: 7 })}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {t(`steps.${stepsKeys[activeStep]}`)}
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* STEP 1: LOCATION */}
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {t('location.title')}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="request-location-country"
                  label={t('location.country')}
                  value={formData.buildCountry}
                  onChange={(e) => handleChange('buildCountry', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
                    {t('location.landStatus')}
                  </FormLabel>
                  <RadioGroup
                    id="request-location-landstatus"
                    value={formData.hasLand ? 'yes' : 'no'}
                    onChange={(e) => handleChange('hasLand', e.target.value === 'yes')}
                  >
                    <FormControlLabel value="yes" control={<Radio color="primary" />} label={t('location.ownLand')} />
                    <FormControlLabel value="no" control={<Radio color="primary" />} label={t('location.searchingLand')} />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
                    {t('location.hasSitePlan')}
                  </FormLabel>
                  <RadioGroup
                    id="request-location-siteplan"
                    row
                    value={formData.hasSitePlan ? 'yes' : 'no'}
                    onChange={(e) => handleChange('hasSitePlan', e.target.value === 'yes')}
                  >
                    <FormControlLabel value="yes" control={<Radio color="primary" />} label={t('location.yes')} sx={{ mr: 4 }} />
                    <FormControlLabel value="no" control={<Radio color="primary" />} label={t('location.no')} />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {/* STEP 2: BUILDING STYLE */}
          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {t('style.title')}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="style-select-label">{locale === 'fr' ? 'Style de Bâtiment' : 'Building Style'}</InputLabel>
                  <Select
                    labelId="style-select-label"
                    id="request-style-select"
                    value={formData.style}
                    label={locale === 'fr' ? 'Style de Bâtiment' : 'Building Style'}
                    onChange={(e) => handleChange('style', e.target.value)}
                  >
                    <MenuItem value="bungalow">{t('style.bungalow')}</MenuItem>
                    <MenuItem value="duplex">{t('style.duplex')}</MenuItem>
                    <MenuItem value="villa">{t('style.villa')}</MenuItem>
                    <MenuItem value="apartment">{t('style.apartment')}</MenuItem>
                    <MenuItem value="commercial">{t('style.commercial')}</MenuItem>
                    <MenuItem value="townhouse">{locale === 'fr' ? 'Maison de ville' : 'Townhouse'}</MenuItem>
                    <MenuItem value="other">{tc('seeAll')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="request-style-floors"
                  label={t('style.floors')}
                  type="number"
                  slotProps={{ htmlInput: { min: 1 } }}
                  value={formData.floors}
                  onChange={(e) => handleChange('floors', e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1))}
                  fullWidth
                />
              </Grid>
            </Grid>
          )}

          {/* STEP 3: ROOM LAYOUT */}
          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {t('rooms.title')}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="request-rooms-bedrooms"
                  label={t('rooms.bedrooms')}
                  type="number"
                  slotProps={{ htmlInput: { min: 0 } }}
                  value={formData.bedrooms}
                  onChange={(e) => handleChange('bedrooms', e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="request-rooms-bathrooms"
                  label={t('rooms.bathrooms')}
                  type="number"
                  slotProps={{ htmlInput: { min: 0 } }}
                  value={formData.bathrooms}
                  onChange={(e) => handleChange('bathrooms', e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="request-rooms-parking"
                      checked={formData.hasCarPark}
                      onChange={(e) => handleChange('hasCarPark', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={t('rooms.parking')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="request-rooms-garden"
                      checked={formData.hasGarden}
                      onChange={(e) => handleChange('hasGarden', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={t('rooms.garden')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="request-rooms-fence"
                      checked={formData.hasFence}
                      onChange={(e) => handleChange('hasFence', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={t('rooms.fence')}
                />
              </Grid>
            </Grid>
          )}

          {/* STEP 4: SPECIAL FEATURES */}
          {activeStep === 3 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {t('features.title')}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="request-features-area"
                  label={t('features.totalArea')}
                  type="number"
                  slotProps={{ htmlInput: { min: 10 } }}
                  value={formData.sizeSqm}
                  onChange={(e) => handleChange('sizeSqm', e.target.value === '' ? '' : Math.max(10, parseFloat(e.target.value) || 10))}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="request-features-pool"
                          checked={formData.hasSwimmingPool}
                          onChange={(e) => handleChange('hasSwimmingPool', e.target.checked)}
                          color="primary"
                        />
                      }
                      label={t('features.pool')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="request-features-solar"
                          checked={formData.hasSolarProvision}
                          onChange={(e) => handleChange('hasSolarProvision', e.target.checked)}
                          color="primary"
                        />
                      }
                      label={t('features.solar')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="request-features-borehole"
                          checked={formData.hasBoreholeProvision}
                          onChange={(e) => handleChange('hasBoreholeProvision', e.target.checked)}
                          color="primary"
                        />
                      }
                      label={t('features.borehole')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="request-features-quarters"
                          checked={formData.hasServantQuarters}
                          onChange={(e) => handleChange('hasServantQuarters', e.target.checked)}
                          color="primary"
                        />
                      }
                      label={t('features.servantQuarters')}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* STEP 5: DOCUMENTS NEEDED */}
          {activeStep === 4 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {t('documents.title')}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Grid container spacing={2}>
                  {[
                    { key: 'distribution_plan', label: locale === 'fr' ? 'Plan de Distribution' : 'Distribution Plan' },
                    { key: '3d_rendering', label: t('documents.renders') },
                    { key: 'structural_plan', label: t('documents.structural') },
                    { key: 'plumbing_plan', label: locale === 'fr' ? 'Dessins de Plomberie' : 'Plumbing Drawings' },
                    { key: 'electrification_plan', label: locale === 'fr' ? 'Plans d\'Électrification' : 'Electrification Plans' },
                    { key: 'boq_estimate', label: t('documents.boq') },
                  ].map((doc) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={doc.key}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            id={`request-doc-${doc.key}`}
                            checked={formData.requestedDocuments.includes(doc.key)}
                            onChange={() => handleDocumentToggle(doc.key)}
                            color="primary"
                          />
                        }
                        label={doc.label}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* STEP 6: ADDITIONAL NOTES */}
          {activeStep === 5 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {t('notes.title')}
                </Typography>
                <TextField
                  id="request-notes-text"
                  placeholder={t('notes.placeholder')}
                  multiline
                  rows={6}
                  value={formData.additionalNotes}
                  onChange={(e) => handleChange('additionalNotes', e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          )}

          {/* STEP 7: MEETING & CONTACT DETAILS */}
          {activeStep === 6 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {t('contact.title')}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  id="request-contact-date"
                  label={t('contact.meetingDate')}
                  type="date"
                  value={formData.meetingDate}
                  onChange={(e) => handleChange('meetingDate', e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  id="request-contact-time"
                  label={t('contact.meetingTime')}
                  type="time"
                  value={formData.meetingTime}
                  onChange={(e) => handleChange('meetingTime', e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  id="request-contact-timezone"
                  label={t('contact.timezone')}
                  value={formData.meetingTimezone}
                  onChange={(e) => handleChange('meetingTimezone', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  id="request-contact-name"
                  label={t('contact.fullName')}
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  id="request-contact-country-code"
                  label={locale === 'fr' ? 'Code Pays' : 'Country Code'}
                  value={formData.phoneCountryCode}
                  onChange={(e) => handleChange('phoneCountryCode', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField
                  id="request-contact-phone"
                  label={t('contact.phone')}
                  placeholder="671172775"
                  value={formData.whatsappPhone}
                  onChange={(e) => handleChange('whatsappPhone', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  id="request-contact-email"
                  label={t('contact.email')}
                  type="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  fullWidth
                  required={formData.preferredContact === 'email'}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
                    {locale === 'fr' ? 'Méthode de contact préférée' : 'Preferred Response Channel'}
                  </FormLabel>
                  <RadioGroup
                    row
                    id="request-contact-channel"
                    value={formData.preferredContact}
                    onChange={(e) => handleChange('preferredContact', e.target.value)}
                  >
                    <FormControlLabel value="whatsapp" control={<Radio color="primary" />} label="WhatsApp" sx={{ mr: 4 }} />
                    <FormControlLabel value="email" control={<Radio color="primary" />} label="Email" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </Box>

        {/* Buttons Nav strip */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5, pt: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <CustomButton
            id="request-design-back-btn"
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<ChevronLeft size={16} />}
          >
            {t('navigation.back')}
          </CustomButton>

          {activeStep < 6 ? (
            <CustomButton
              id="request-design-next-btn"
              variant="contained"
              color="primary"
              onClick={handleNext}
              endIcon={<ChevronRight size={16} />}
              sx={{
                background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              }}
            >
              {t('navigation.next')}
            </CustomButton>
          ) : (
            <LoadingButton
              id="request-design-submit-btn"
              variant="contained"
              color="primary"
              loading={isPending}
              onClick={handleSubmit}
              endIcon={<CheckCircle2 size={16} />}
              sx={{
                background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              }}
            >
              {t('navigation.submit')}
            </LoadingButton>
          )}
        </Box>
      </Paper>
    </Container>
  )
}
