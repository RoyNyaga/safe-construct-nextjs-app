'use client'

import { useState, useTransition } from 'react'
import {
  Box, TextField, Typography, MenuItem, Grid, Alert,
} from '@mui/material'
import { CheckCircle2 } from 'lucide-react'
import { useLocale } from 'next-intl'
import { LoadingButton, CustomModal } from '@/components/ui'
import { submitServiceRequest } from '@/app/[locale]/actions/contact'

type ServiceType = 'custom_design' | 'construction_bid' | 'supervision_qa' | 'cost_estimate'

interface ServiceRequestModalProps {
  open: boolean
  onClose: () => void
  serviceType: ServiceType
  serviceName: string
  ctaLabel: string
}

const BUILDING_STYLES = ['Bungalow', 'Duplex', 'Villa', 'Apartment', 'Commercial', 'Other']
const PHASES = ['Not Started', 'Foundation', 'Structure / Frame', 'Roofing', 'Finishing']
const FREQUENCIES = ['Weekly', 'Bi-weekly', 'Monthly', 'One-time Audit']
const BUDGET_RANGES = [
  'Under 10M XAF', '10–25M XAF', '25–50M XAF', '50–100M XAF', '100M+ XAF'
]

export default function ServiceRequestModal({
  open, onClose, serviceType, serviceName, ctaLabel,
}: ServiceRequestModalProps) {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Common fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  // Type-specific
  const [buildingStyle, setBuildingStyle] = useState('')
  const [approxSize, setApproxSize] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [notes, setNotes] = useState('')
  const [location, setLocation] = useState('')
  const [budget, setBudget] = useState('')
  const [phase, setPhase] = useState('')
  const [contractor, setContractor] = useState('')
  const [frequency, setFrequency] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const details: Record<string, unknown> = { notes }
    if (serviceType === 'custom_design') {
      details.building_style = buildingStyle
      details.approx_size_sqm = approxSize
      details.bedrooms = bedrooms
    } else if (serviceType === 'construction_bid') {
      details.location = location
      details.budget_range = budget
    } else if (serviceType === 'supervision_qa') {
      details.site_address = location
      details.construction_phase = phase
      details.active_contractor = contractor
      details.inspection_frequency = frequency
    }

    startTransition(async () => {
      const result = await submitServiceRequest(serviceType, fullName, email, phone, details, locale)
      if (result.status === 'success') {
        setSuccess(true)
      } else {
        setError(result.message)
      }
    })
  }

  function handleClose() {
    setSuccess(false)
    setError(null)
    onClose()
  }

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title={success ? 'Request Submitted!' : ctaLabel}
      maxWidth="sm"
    >
      {success ? (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(102,187,106,0.12)', border: '2px solid #66BB6A', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.5 }}>
            <CheckCircle2 size={32} color="#66BB6A" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Thank you, {fullName.split(' ')[0]}!
          </Typography>
          <Typography color="text.secondary">
            Your {serviceName} request has been received. Our team will contact you within 24–48 hours.
          </Typography>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          <Grid container spacing={2.5}>
            {/* Common fields */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField id="sr-name" label="Full Name" fullWidth required value={fullName} onChange={e => setFullName(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField id="sr-email" label="Email" type="email" fullWidth required value={email} onChange={e => setEmail(e.target.value)} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField id="sr-phone" label="Phone / WhatsApp" type="tel" fullWidth required placeholder="+237 671 172 775" value={phone} onChange={e => setPhone(e.target.value)} />
            </Grid>

            {/* Architectural Design fields */}
            {serviceType === 'custom_design' && (<>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField id="sr-style" label="Building Style" select fullWidth required value={buildingStyle} onChange={e => setBuildingStyle(e.target.value)}>
                  {BUILDING_STYLES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField id="sr-bedrooms" label="Bedrooms" select fullWidth value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
                  {['1', '2', '3', '4', '5+'].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField id="sr-size" label="Approximate Size (m²) — optional" fullWidth type="number" value={approxSize} onChange={e => setApproxSize(e.target.value)} />
              </Grid>
            </>)}

            {/* General Contracting fields */}
            {serviceType === 'construction_bid' && (<>
              <Grid size={{ xs: 12 }}>
                <TextField id="sr-location" label="Project Location / Address" fullWidth required value={location} onChange={e => setLocation(e.target.value)} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField id="sr-budget" label="Estimated Budget Range" select fullWidth value={budget} onChange={e => setBudget(e.target.value)}>
                  {BUDGET_RANGES.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                </TextField>
              </Grid>
            </>)}

            {/* Supervision fields */}
            {serviceType === 'supervision_qa' && (<>
              <Grid size={{ xs: 12 }}>
                <TextField id="sr-site" label="Site Address / Location" fullWidth required value={location} onChange={e => setLocation(e.target.value)} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField id="sr-phase" label="Current Construction Phase" select fullWidth required value={phase} onChange={e => setPhase(e.target.value)}>
                  {PHASES.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField id="sr-frequency" label="Inspection Frequency" select fullWidth required value={frequency} onChange={e => setFrequency(e.target.value)}>
                  {FREQUENCIES.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField id="sr-contractor" label="Active Contractor Name — optional" fullWidth value={contractor} onChange={e => setContractor(e.target.value)} />
              </Grid>
            </>)}

            {/* Notes — shared */}
            <Grid size={{ xs: 12 }}>
              <TextField id="sr-notes" label="Additional Notes / Requirements" fullWidth multiline rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <LoadingButton
                id="sr-submit-btn"
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                loading={isPending}
                loadingText="Submitting..."
                sx={{ background: 'linear-gradient(135deg,#F26419 0%,#F6AE2D 100%)', fontWeight: 700 }}
              >
                Submit Request
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      )}
    </CustomModal>
  )
}
