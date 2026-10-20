'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  IconButton,
  alpha,
} from '@mui/material'
import {
  Cpu,
  PlusCircle,
  ArrowRight,
  Pencil,
  Trash2,
  AlertTriangle,
} from 'lucide-react'
import { BettingModel } from '@/types/betting'
import { createBettingModel, updateBettingModel, deleteBettingModel } from '@/app/[locale]/actions/betting'
import { CustomModal, CustomNotification } from '@/components/ui'
import CustomButton from '@/components/ui/CustomButton'
import { LoadingButton } from '@/components/ui/PromptButtons'

interface ModelsClientProps {
  locale: string
  models: BettingModel[]
}

export default function ModelsClient({ locale, models: initialModels }: ModelsClientProps) {
  const [models, setModels] = useState<BettingModel[]>(initialModels)

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [version, setVersion] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'draft' | 'active' | 'retired'>('active')
  const [isActive, setIsActive] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Edit Modal State
  const [editingModel, setEditingModel] = useState<BettingModel | null>(null)
  const [editVersion, setEditVersion] = useState('')
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editStatus, setEditStatus] = useState<'draft' | 'active' | 'retired'>('active')
  const [editIsActive, setEditIsActive] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Delete Modal State
  const [deletingModel, setDeletingModel] = useState<BettingModel | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const [notification, setNotification] = useState<{
    open: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({ open: false, message: '', type: 'info' })

  const handleCreateModel = async () => {
    if (!version.trim() || !name.trim()) {
      setNotification({
        open: true,
        message: locale === 'fr' ? 'La version et le nom sont requis.' : 'Version and Name are required.',
        type: 'error',
      })
      return
    }

    setIsSubmitting(true)
    const res = await createBettingModel({
      version,
      name,
      description,
      content,
      status,
      isActive,
    })
    setIsSubmitting(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else if (res.model) {
      setModels([res.model, ...models])
      setIsCreateOpen(false)
      setVersion('')
      setName('')
      setDescription('')
      setContent('')
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Modèle enregistré avec succès !' : 'Model registered successfully!',
        type: 'success',
      })
    }
  }

  const handleOpenEdit = (model: BettingModel) => {
    setEditingModel(model)
    setEditVersion(model.version)
    setEditName(model.name)
    setEditDescription(model.description || '')
    setEditContent(model.content || '')
    setEditStatus(model.status as any || 'active')
    setEditIsActive(model.is_active)
  }

  const handleSaveEdit = async () => {
    if (!editingModel) return
    if (!editVersion.trim() || !editName.trim()) {
      setNotification({
        open: true,
        message: locale === 'fr' ? 'La version et le nom sont requis.' : 'Version and Name are required.',
        type: 'error',
      })
      return
    }

    setIsUpdating(true)
    const res = await updateBettingModel(editingModel.id, {
      version: editVersion,
      name: editName,
      description: editDescription,
      content: editContent,
      status: editStatus,
      isActive: editIsActive,
    })
    setIsUpdating(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setModels(
        models.map((m) =>
          m.id === editingModel.id
            ? {
                ...m,
                version: editVersion,
                name: editName,
                description: editDescription,
                content: editContent,
                status: editStatus,
                is_active: editIsActive,
              }
            : editIsActive
            ? { ...m, is_active: false }
            : m
        )
      )
      setEditingModel(null)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Modèle mis à jour avec succès !' : 'Model updated successfully!',
        type: 'success',
      })
    }
  }

  const handleOpenDelete = (model: BettingModel) => {
    setDeletingModel(model)
  }

  const handleDeleteModel = async () => {
    if (!deletingModel) return
    setIsDeleting(true)
    const res = await deleteBettingModel(deletingModel.id)
    setIsDeleting(false)

    if (res.error) {
      setNotification({ open: true, message: res.error, type: 'error' })
    } else {
      setModels(models.filter((m) => m.id !== deletingModel.id))
      setDeletingModel(null)
      setNotification({
        open: true,
        message: locale === 'fr' ? 'Modèle supprimé avec succès !' : 'Model deleted successfully!',
        type: 'success',
      })
    }
  }

  return (
    <Box>
      <CustomNotification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, open: false })}
      />

      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {locale === 'fr' ? 'Modèles & Méthodologies' : 'Betting Model Methodologies'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Versions des règles d\'analyse utilisées pour générer les tickets et évaluation comparée de leur rentabilité.'
              : 'Statistical methodology versions used to generate tickets. Compare long-term calibration and edge across model iterations.'}
          </Typography>
        </Box>

        <CustomButton
          variant="contained"
          onClick={() => setIsCreateOpen(true)}
          startIcon={<PlusCircle size={18} />}
          sx={{
            background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
            color: '#FFFFFF',
            fontWeight: 700,
          }}
        >
          {locale === 'fr' ? 'Nouveau Modèle' : 'Register New Model'}
        </CustomButton>
      </Box>

      {/* Models Grid */}
      <Grid container spacing={3}>
        {models.map((model) => (
          <Grid key={model.id} size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: '100%',
                backgroundColor: alpha('#1E2635', 0.95),
                border: model.is_active
                  ? '1px solid rgba(242, 100, 25, 0.4)'
                  : (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
                boxShadow: model.is_active ? '0 8px 30px rgba(242, 100, 25, 0.15)' : 'none',
              }}
            >
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Chip
                        label={`v${model.version}`}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          backgroundColor: alpha('#F26419', 0.15),
                          color: '#F26419',
                          border: '1px solid rgba(242, 100, 25, 0.3)',
                        }}
                      />
                      {model.is_active && (
                        <Chip
                          label="ACTIVE"
                          size="small"
                          sx={{
                            fontWeight: 800,
                            backgroundColor: alpha('#66BB6A', 0.15),
                            color: '#66BB6A',
                          }}
                        />
                      )}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {model.name}
                    </Typography>
                  </Box>

                  <Chip
                    label={model.status.toUpperCase()}
                    size="small"
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backgroundColor: alpha('#F0F2F5', 0.08),
                    }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1 }}>
                  {model.description || 'No summary description provided.'}
                </Typography>

                {/* Performance Snapshot */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 1.5,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha('#121824', 0.6),
                    mb: 3,
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Tickets</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{model.total_tickets || 0}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Win Rate</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#66BB6A' }}>
                      {model.win_rate || 0}%
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">ROI</Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: (model.roi || 0) >= 0 ? '#66BB6A' : '#EF5350',
                      }}
                    >
                      {(model.roi || 0) >= 0 ? '+' : ''}{model.roi || 0}%
                    </Typography>
                  </Box>
                </Box>

                {/* Footer link & Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
                  <Box
                    component={Link}
                    href={`/${locale}/admin/betting/models/${model.uuid}`}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    <span>{locale === 'fr' ? 'Détails & Méthodologie' : 'Methodology & Calibration'}</span>
                    <ArrowRight size={16} />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEdit(model)}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main', backgroundColor: alpha('#F26419', 0.1) },
                      }}
                      title="Edit Model"
                    >
                      <Pencil size={15} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDelete(model)}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { color: '#EF5350', backgroundColor: alpha('#EF5350', 0.1) },
                      }}
                      title="Delete Model"
                    >
                      <Trash2 size={15} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ─── CREATE MODEL MODAL ───────────────────────────────────────────── */}
      <CustomModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Cpu size={22} color="#F26419" />
            <span>{locale === 'fr' ? 'Enregistrer une Nouvelle Méthodologie' : 'Register Model Methodology'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setIsCreateOpen(false)}>
              {locale === 'fr' ? 'Annuler' : 'Cancel'}
            </CustomButton>
            <LoadingButton
              variant="contained"
              loading={isSubmitting}
              onClick={handleCreateModel}
              sx={{
                backgroundColor: 'primary.main',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              {locale === 'fr' ? 'Créer le Modèle' : 'Save Model'}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {locale === 'fr'
              ? 'Chaque version de modèle préserve les hypothèses méthodologiques utilisées par ChatGPT pour une analyse objective ultérieure.'
              : 'Each model version represents the exact statistical assumptions used by ChatGPT so we can measure whether methodology changes actually improve betting edge.'}
          </Typography>

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
            rows={5}
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

      {/* ─── EDIT MODEL MODAL ───────────────────────────────────────────── */}
      <CustomModal
        open={Boolean(editingModel)}
        onClose={() => setEditingModel(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Pencil size={20} color="#F26419" />
            <span>{locale === 'fr' ? 'Modifier le Modèle' : 'Edit Model'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setEditingModel(null)}>
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
              {locale === 'fr' ? 'Enregistrer' : 'Save Changes'}
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
                value={editVersion}
                onChange={(e) => setEditVersion(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 8 }}>
              <TextField
                fullWidth
                label="Model Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Short Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Methodology Notes / Rules Content"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={editStatus}
                label="Status"
                onChange={(e) => setEditStatus(e.target.value as any)}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="retired">Retired</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={editIsActive}
                  onChange={(e) => setEditIsActive(e.target.checked)}
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
        open={Boolean(deletingModel)}
        onClose={() => setDeletingModel(null)}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AlertTriangle size={20} color="#EF5350" />
            <span>{locale === 'fr' ? 'Confirmer la Suppression' : 'Confirm Model Deletion'}</span>
          </Box>
        }
        actions={
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'flex-end' }}>
            <CustomButton variant="outlined" onClick={() => setDeletingModel(null)}>
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
              {locale === 'fr' ? 'Supprimer' : 'Delete'}
            </LoadingButton>
          </Box>
        }
      >
        <Box sx={{ py: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            {locale === 'fr'
              ? `Supprimer définitivement "${deletingModel?.name}" (v${deletingModel?.version}) ?`
              : `Permanently delete "${deletingModel?.name}" (v${deletingModel?.version})?`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr'
              ? 'Cette action retirera le modèle. Les tickets associés seront détachés.'
              : 'This action will remove the model definition. Associated tickets will be unlinked.'}
          </Typography>
        </Box>
      </CustomModal>
    </Box>
  )
}
