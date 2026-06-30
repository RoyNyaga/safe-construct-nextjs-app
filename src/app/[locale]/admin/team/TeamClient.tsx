'use client'

import { useState, useTransition } from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  alpha,
  Grid,
  Alert,
  Avatar,
} from '@mui/material'
import { Plus, Edit2, Users } from 'lucide-react'
import { useLocale } from 'next-intl'
import { DeletePromptButton, ImageUpload } from '@/components/ui'
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '@/app/[locale]/actions/admin'

interface TeamMember {
  id: string
  full_name: string
  title: string
  title_fr: string | null
  phone: string | null
  photo_url: string | null
  order_index: number
  is_visible: boolean
}

interface TeamClientProps {
  locale: string
  teamMembers: TeamMember[]
}

const DEFAULT_FORM = {
  fullName: '',
  title: '',
  titleFr: '',
  phone: '',
  photoUrl: '',
  orderIndex: 0,
  isVisible: true,
}

export default function TeamClient({
  locale,
  teamMembers: initialTeam,
}: TeamClientProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeam)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false)
  const [editMemberId, setEditMemberId] = useState<string | null>(null)
  const [formValues, setFormValues] = useState(DEFAULT_FORM)

  const handleOpenCreate = () => {
    setEditMemberId(null)
    setFormValues(DEFAULT_FORM)
    setError(null)
    setOpenDialog(true)
  }

  const handleOpenEdit = (member: TeamMember) => {
    setEditMemberId(member.id)
    setFormValues({
      fullName: member.full_name,
      title: member.title,
      titleFr: member.title_fr || '',
      phone: member.phone || '',
      photoUrl: member.photo_url || '',
      orderIndex: member.order_index,
      isVisible: member.is_visible,
    })
    setError(null)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleFormChange = (key: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveMember = async () => {
    setError(null)
    if (!formValues.fullName.trim() || !formValues.title.trim()) {
      setError(locale === 'fr' ? 'Le nom complet et le titre (EN) sont obligatoires.' : 'Full name and Title (English) are required.')
      return
    }

    startTransition(async () => {
      let res: { success?: boolean; data?: any; error?: string }
      if (editMemberId) {
        res = await updateTeamMember(editMemberId, formValues)
      } else {
        res = await createTeamMember(formValues)
      }

      if (res.error) {
        setError(res.error)
      } else {
        // Sync lists locally for instant feedback
        if (editMemberId) {
          setTeamMembers((prev) =>
            prev.map((m) =>
              m.id === editMemberId
                ? {
                    ...m,
                    full_name: formValues.fullName,
                    title: formValues.title,
                    title_fr: formValues.titleFr || null,
                    phone: formValues.phone || null,
                    photo_url: formValues.photoUrl || null,
                    order_index: formValues.orderIndex,
                    is_visible: formValues.isVisible,
                  }
                : m
            )
          )
        } else {
          // On create, reload list from server or simply re-fetch. Since we want an instant reload,
          // we can just re-fetch in local state. But let's build local sync:
          const newMember: TeamMember = {
            id: res.data?.id || Math.random().toString(), // Use the real database UUID returned from backend
            full_name: formValues.fullName,
            title: formValues.title,
            title_fr: formValues.titleFr || null,
            phone: formValues.phone || null,
            photo_url: formValues.photoUrl || null,
            order_index: formValues.orderIndex,
            is_visible: formValues.isVisible,
          }
          setTeamMembers((prev) => [...prev, newMember].sort((a, b) => a.order_index - b.order_index))
        }
        setOpenDialog(false)
      }
    })
  }

  const handleDeleteMember = async (id: string) => {
    const res = await deleteTeamMember(id)
    if (!res.error) {
      setTeamMembers((prev) => prev.filter((m) => m.id !== id))
    }
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Header controls strip */}
      <Paper elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: 'background.paper', borderRadius: 3, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', p: 1.5 }}>
        <Typography variant="h6" sx={{ pl: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Users size={20} color="#F26419" />
          {locale === 'fr' ? 'Gestion des Profils de l\'Équipe' : 'Team Members Profiles'}
        </Typography>

        <Button
          id="admin-create-team-btn"
          variant="contained"
          color="primary"
          startIcon={<Plus size={16} />}
          onClick={handleOpenCreate}
          sx={{
            background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
            mr: 2,
          }}
        >
          {locale === 'fr' ? 'Ajouter un Membre' : 'Add Team Member'}
        </Button>
      </Paper>

      {/* Team Table Grid */}
      <TableContainer component={Paper} elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper' }}>
        <Table id="team-members-table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Membre' : 'Member'}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role / Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Index de tri' : 'Sort Index'}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  {locale === 'fr' ? 'Aucun membre enregistré.' : 'No team members registered.'}
                </TableCell>
              </TableRow>
            ) : (
              teamMembers.map((member) => {
                const initials = member.full_name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)

                return (
                  <TableRow key={member.id}>
                    <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={member.photo_url || undefined}
                        alt={member.full_name}
                        sx={{
                          width: 40,
                          height: 40,
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #F26419, #F6AE2D)',
                          color: '#fff',
                        }}
                      >
                        {initials}
                      </Avatar>
                      <Typography sx={{ fontWeight: 600 }}>{member.full_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{member.title}</Typography>
                      {member.title_fr && <Typography variant="caption" color="text.secondary">FR: {member.title_fr}</Typography>}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>{member.phone || 'N/A'}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{member.order_index}</TableCell>
                    <TableCell>
                      <Chip
                        label={member.is_visible ? 'Visible' : 'Hidden'}
                        size="small"
                        color={member.is_visible ? 'success' : 'default'}
                        sx={{ fontSize: '0.65rem', height: 18, fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                        <IconButton
                          id={`edit-team-btn-${member.id}`}
                          size="small"
                          onClick={() => handleOpenEdit(member)}
                          title="Edit Profile"
                        >
                          <Edit2 size={16} />
                        </IconButton>
                        <DeleteMemberPrompt
                          id={`delete-team-btn-${member.id}`}
                          itemName={member.full_name}
                          onDelete={() => handleDeleteMember(member.id)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* CREATE/EDIT DIALOG */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        id="team-crud-modal"
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          {editMemberId ? (locale === 'fr' ? 'Modifier le Membre' : 'Edit Team Profile') : (locale === 'fr' ? 'Ajouter un Nouveau Membre' : 'Add New Team Profile')}
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              {/* Full name */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  id="team-form-name"
                  label={locale === 'fr' ? 'Nom Complet' : 'Full Name'}
                  value={formValues.fullName}
                  onChange={(e) => handleFormChange('fullName', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* Title EN */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="team-form-title"
                  label={locale === 'fr' ? 'Titre (Anglais)' : 'Title (English)'}
                  value={formValues.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* Title FR */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="team-form-title-fr"
                  label={locale === 'fr' ? 'Titre (Français)' : 'Title (French)'}
                  value={formValues.titleFr}
                  onChange={(e) => handleFormChange('titleFr', e.target.value)}
                  fullWidth
                />
              </Grid>

              {/* Phone number */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="team-form-phone"
                  label={locale === 'fr' ? 'Téléphone' : 'Phone Number'}
                  value={formValues.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  fullWidth
                  placeholder="+237671172775"
                />
              </Grid>
              {/* Photo URL */}
              <Grid size={{ xs: 12, md: 6 }}>
                <ImageUpload
                  bucket="team-photos"
                  value={formValues.photoUrl}
                  onChange={(url) => handleFormChange('photoUrl', url)}
                  label={locale === 'fr' ? 'Photo de Profil' : 'Profile Photo'}
                  aspectRatio="1/1"
                  maxHeight={160}
                />
              </Grid>

              {/* Sorting order */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="team-form-order"
                  label={locale === 'fr' ? 'Index d\'affichage' : 'Display Sort Index'}
                  type="number"
                  value={formValues.orderIndex}
                  onChange={(e) => handleFormChange('orderIndex', parseInt(e.target.value) || 0)}
                  fullWidth
                />
              </Grid>
              {/* Visibility check */}
              <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="team-form-visible"
                      checked={formValues.isVisible}
                      onChange={(e) => handleFormChange('isVisible', e.target.checked)}
                      color="primary"
                    />
                  }
                  label={locale === 'fr' ? 'Afficher sur le site public' : 'Show Profile on Public Site'}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 4, py: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Button id="team-dialog-cancel" variant="outlined" onClick={handleCloseDialog} disabled={isPending}>
            Cancel
          </Button>
          <Button
            id="team-dialog-save"
            variant="contained"
            onClick={handleSaveMember}
            disabled={isPending}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

function DeleteMemberPrompt({ id, itemName, onDelete }: { id: string; itemName: string; onDelete: () => void }) {
  const [loading, setLoading] = useState(false)
  const handlePerformDelete = async () => {
    setLoading(true)
    await onDelete()
    setLoading(false)
  }
  return (
    <DeletePromptButton
      id={id}
      itemName={itemName}
      loading={loading}
      onDelete={handlePerformDelete}
      size="small"
    />
  )
}
