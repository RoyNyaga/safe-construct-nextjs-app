'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  alpha,
  Divider,
} from '@mui/material'
import {
  Cpu,
  ArrowLeft,
  Percent,
  Pencil,
  Trash2,
  AlertTriangle,
} from 'lucide-react'
import BettingSubNav from '../../BettingSubNav'
import { BettingBankroll, BettingModel, CalibrationBucket } from '@/types/betting'
import { updateBettingModel, deleteBettingModel } from '@/app/[locale]/actions/betting'
import { CustomModal, CustomNotification } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
import { LoadingButton } from '@/components/ui/PromptButtons'

interface ModelDetailClientProps {
  locale: string
  model: BettingModel
  calibration: CalibrationBucket[]
  bankroll: BettingBankroll | null
}

export default function ModelDetailClient({
  locale,
  model: initialModel,
  calibration,
  bankroll,
}: ModelDetailClientProps) {
  const router = useRouter()
  const [model, setModel] = useState<BettingModel>(initialModel)
  const currentBalance = Number(bankroll?.current_balance || 0)
  const currency = bankroll?.currency || 'FCFA'

  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [version, setVersion] = useState(model.version)
  const [name, setName] = useState(model.name)
  const [description, setDescription] = useState(model.description || '')
  const [content, setContent] = useState(model.content || '')
  const [status, setStatus] = useState<'draft' | 'active' | 'retired'>(model.status as any || 'active')
  const [isActive, setIsActive] = useState(model.is_active)
  const [isUpdating, setIsUpdating] = useState(false)

  // Delete Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Notification State
  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({ open: false, message: '', type: 'info' })

  // Open Edit Dialog
  const handleOpenEdit = () => {
    setVersion(model.version)
    setName(model.name)
    setDescription(model.description || '')
    setContent(model.content || '')
    setStatus(model.status as any || 'active')
    setIsActive(model.is_active)
    setIsEditOpen(true)
  }

  // Save Edit
  const handleSaveEdit = async () => {
    if (!version.trim() || !name.trim()) {
      setNotification({
        open: true,
        message: locale === 'fr' ? 'La version et le nom sont requis.' : 'Version and Name are required.',
        type: 'error',
      })
      return
    }

    setIsUpdating(true)
    const res = await updateBettingModel(model.id, {
      version,
      name,
      description,
      content,
      status,
      isActive,
    })
    setIsUpdating(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setModel({
        ...model,
        version,
        name,
        description,
        content,
        status,
        is_active: isActive,
      })
      setIsEditOpen(false)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Modèle mis à jour avec succès !' : 'Model updated successfully!',
        type: 'success',
      })
    }
  }

  // Delete Model
  const handleDeleteModel = async () => {
    setIsDeleting(true)
    const res = await deleteBettingModel(model.id)
    setIsDeleting(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setIsDeleteOpen(false)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Modèle supprimé avec succès !' : 'Model deleted successfully!',
        type: 'success',
      })
      router.push(`/${locale}/admin/betting/models`)
    }
  }

  return (
    <Box sx={{ pb: 6 }}>
      <CustomNotification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, open: false })}
      />

      <BettingSubNav
        locale={locale}
        currentBalance={currentBalance}
        currency={currency}
      />

      {/* Top Bar with Back Link & Actions */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box
          component={Link}
          href={`/${locale}/admin/betting/models`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': { color: 'text.primary' },
          }}
        >
          <ArrowLeft size={16} />
          <span>{locale === 'fr' ? 'Retour aux modèles' : 'Back to models list'}</span>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <CustomButton
            variant="outlined"
            onClick={handleOpenEdit}
            startIcon={<Pencil size={16} />}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontWeight: 700,
              '&:hover': { borderColor: '#F26419', backgroundColor: alpha('#F26419', 0.1) },
            }}
          >
            {locale === 'fr' ? 'Modifier le modèle' : 'Edit Model'}
          </CustomButton>

          <CustomButton
            variant="contained"
            onClick={() => setIsDeleteOpen(true)}
            startIcon={<Trash2 size={16} />}
            sx={{
              backgroundColor: alpha('#EF5350', 0.15),
              color: '#EF5350',
              border: '1px solid rgba(239, 83, 80, 0.3)',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#EF5350', color: '#FFFFFF' },
            }}
          >
            {locale === 'fr' ? 'Supprimer' : 'Delete'}
          </CustomButton>
        </Box>
      </Box>

      {/* Header Card */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Chip
                  label={`VERSION ${model.version}`}
                  sx={{
                    fontWeight: 800,
                    backgroundColor: alpha('#F26419', 0.15),
                    color: '#F26419',
                    border: '1px solid rgba(242, 100, 25, 0.3)',
                  }}
                />
                {model.is_active && (
                  <Chip
                    label="CURRENT ACTIVE MODEL"
                    sx={{
                      fontWeight: 800,
                      backgroundColor: alpha('#66BB6A', 0.15),
                      color: '#66BB6A',
                    }}
                  />
                )}
                <Chip
                  label={model.status.toUpperCase()}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    backgroundColor: alpha('#FFFFFF', 0.08),
                  }}
                />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                {model.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {model.description || 'No summary description.'}
              </Typography>
            </Box>

            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Typography variant="caption" color="text.secondary">Registered On</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {new Date(model.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Performance KPIs */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Total Tickets</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {model.total_tickets || 0}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Ticket Win Rate</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#66BB6A' }}>
                {model.win_rate || 0}%
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Model ROI</Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: (model.roi || 0) >= 0 ? '#66BB6A' : '#EF5350',
                }}
              >
                {(model.roi || 0) >= 0 ? '+' : ''}{model.roi || 0}%
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Typography variant="caption" color="text.secondary">Won / Lost</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.secondary' }}>
                {model.won_tickets || 0}W / {model.lost_tickets || 0}L
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Methodology Content Box */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Cpu size={20} color="#F26419" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {locale === 'fr' ? 'Notes & Règles Méthodologiques (Prompt / Rules Reference)' : 'Methodology Notes & Calculation Rules'}
              </Typography>
            </Box>

            <CustomButton
              size="small"
              variant="outlined"
              onClick={handleOpenEdit}
              startIcon={<Pencil size={14} />}
              sx={{ borderColor: 'rgba(255, 255, 255, 0.15)', fontSize: '0.75rem' }}
            >
              {locale === 'fr' ? 'Modifier les règles' : 'Edit Rules'}
            </CustomButton>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: alpha('#121824', 0.8),
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              color: '#F0F2F5',
            }}
          >
            {model.content || 'No methodology documentation stored for this model.'}
          </Paper>
        </CardContent>
      </Card>

      {/* Model Probability Calibration Table */}
      <Card
        sx={{
          mb: 4,
          backgroundColor: alpha('#1E2635', 0.95),
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Percent size={20} color="#F6AE2D" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {locale === 'fr' ? 'Matrice de Calibration des Probabilités' : 'Probability Calibration Matrix'}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Predicted probability vs actual win rate
            </Typography>
          </Box>

          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Probability Range</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Total Bets</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Won Bets</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Avg Predicted</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Actual Win Rate</th>
                  <th style={{ padding: '12px 16px', color: '#9AA3B2', fontSize: '0.75rem', textTransform: 'uppercase' }}>Calibration Difference</th>
                </tr>
              </thead>
              <tbody>
                {calibration.map((bucket, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>{bucket.rangeLabel}</td>
                    <td style={{ padding: '14px 16px' }}>{bucket.totalBets}</td>
                    <td style={{ padding: '14px 16px', color: '#66BB6A', fontWeight: 700 }}>{bucket.wonBets}</td>
                    <td style={{ padding: '14px 16px' }}>{bucket.avgPredictedProb}%</td>
                    <td style={{ padding: '14px 16px', fontWeight: 700 }}>{bucket.actualWinRate}%</td>
                    <td
                      style={{
                        padding: '14px 16px',
                        fontWeight: 700,
                        color:
                          bucket.totalBets === 0
                            ? '#9AA3B2'
                            : Math.abs(bucket.differencePp) <= 3
                            ? '#66BB6A'
                            : bucket.differencePp > 0
                            ? '#42A5F5'
                            : '#EF5350',
                      }}
                    >
                      {bucket.totalBets === 0
                        ? '—'
                        : `${bucket.differencePp >= 0 ? '+' : ''}${bucket.differencePp} pp`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>

      {/* ─── EDIT MODEL MODAL ───────────────────────────────────────────── */}
      <CustomModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Pencil size={20} color="#F26419" />
            <span>{locale === 'fr' ? 'Modifier le Modèle de Betting' : 'Edit Betting Model'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setIsEditOpen(false)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isUpdating}
              onClick={handleSaveEdit}
              sx={{
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              {locale === 'fr' ? 'Enregistrer les Modifications' : 'Save Changes'}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 4 }}>
              <TextField
                fullWidth
                label="Version"
                placeholder="1.0"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 8 }}>
              <TextField
                fullWidth
                label="Model Name"
                placeholder="e.g. Poisson Goal-Rate Model"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Short Description"
            placeholder="e.g. Home/away goal distribution using Poisson to estimate Over 1.5 and BTTS."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={6}
            label="Methodology Notes / Rules Content"
            placeholder="Document the exact rules, equations, and data constraints here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="retired">Retired</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  color="primary"
                />
              }
              label="Set as current active model"
            />
          </Box>
        </Box>
      </CustomModal>

      {/* ─── DELETE MODEL CONFIRMATION MODAL ─────────────────────────────── */}
      <CustomModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AlertTriangle size={20} color="#EF5350" />
            <span>{locale === 'fr' ? 'Confirmer la Suppression' : 'Confirm Model Deletion'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setIsDeleteOpen(false)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isDeleting}
              onClick={handleDeleteModel}
              sx={{
                backgroundColor: '#EF5350',
                color: '#FFFFFF',
                fontWeight: 700,
                '&:hover': { backgroundColor: '#D32F2F' },
              }}
            >
              {locale === 'fr' ? 'Supprimer Définitivement' : 'Permanently Delete'}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ py: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            {locale === 'fr'
              ? `Êtes-vous sûr de vouloir supprimer le modèle "${model.name}" (v${model.version}) ?`
              : `Are you sure you want to delete model "${model.name}" (v${model.version})?`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Cette action retirera le modèle de la liste. Les tickets existants resteront enregistrés mais seront détachés de ce modèle.'
              : 'This action will remove the model definition. Any existing tickets will be unlinked from this model and will remain in your betting history.'}
          </Typography>
        </Box>
      </CustomModal>
    </Box>
  )
}
