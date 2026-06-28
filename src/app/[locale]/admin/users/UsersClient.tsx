'use client'

import { useState, useEffect, useTransition } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Alert,
  IconButton,
  Chip,
  alpha,
  Divider,
} from '@mui/material'
import { Search, ShieldAlert, Key, Edit, ShieldCheck, UserCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { updateUserRole, updateAdminPermissions } from '@/app/[locale]/actions/admin'

interface Profile {
  id: string
  email: string | null
  first_name: string | null
  last_name: string | null
  full_name: string | null
  phone: string | null
  phone_country_code: string | null
  country: string | null
  role: 'admin' | 'client'
  created_at: string
  admin_permissions: { permission_key: string }[]
}

interface UsersClientProps {
  locale: string
  initialProfiles: any[]
}

const ALL_PERMISSIONS = [
  { key: 'manage_catalogues', labelEn: 'Manage Catalogues (CRUD)', labelFr: 'Gérer le Catalogue (CRUD)' },
  { key: 'manage_blogs', labelEn: 'Manage Blogs & Comments', labelFr: 'Gérer les Blogs & Commentaires' },
  { key: 'manage_leads', labelEn: 'Manage Leads Inbox', labelFr: 'Gérer la Boîte de Réception' },
  { key: 'manage_team', labelEn: 'Manage Team Members', labelFr: 'Gérer les Membres de l\'Équipe' },
  { key: 'manage_users', labelEn: 'Manage Users & Permissions', labelFr: 'Gérer les Utilisateurs & Droits' },
]

export default function UsersClient({ locale, initialProfiles }: UsersClientProps) {
  const router = useRouter()
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles as Profile[])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'client'>('all')

  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [editUser, setEditUser] = useState<Profile | null>(null)
  const [selectedRole, setSelectedRole] = useState<'admin' | 'client'>('client')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setCurrentUserId(user.id)
      }
    })
  }, [supabase])

  // Sync state with incoming props
  useEffect(() => {
    setProfiles(initialProfiles as Profile[])
  }, [initialProfiles])

  // Filter logic
  const filteredProfiles = profiles.filter((p) => {
    const query = searchTerm.toLowerCase().trim()
    const matchesSearch =
      (p.full_name || '').toLowerCase().includes(query) ||
      (p.email || '').toLowerCase().includes(query) ||
      (p.phone || '').toLowerCase().includes(query)

    const matchesRole = roleFilter === 'all' || p.role === roleFilter

    return matchesSearch && matchesRole
  })

  const handleOpenEdit = (user: Profile) => {
    setError(null)
    setSuccess(null)
    setEditUser(user)
    setSelectedRole(user.role)
    setSelectedPermissions(user.admin_permissions?.map((p) => p.permission_key) || [])
  }

  const handleCloseEdit = () => {
    setEditUser(null)
  }

  const handlePermissionToggle = (key: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    )
  }

  const handleSaveChanges = async () => {
    if (!editUser) return
    setError(null)
    setSuccess(null)

    // Self-lockout checks
    if (editUser.id === currentUserId) {
      if (selectedRole !== 'admin') {
        setError(locale === 'fr' ? 'Vous ne pouvez pas révoquer vos propres droits administratifs.' : 'You cannot revoke your own admin rights.')
        return
      }
      if (!selectedPermissions.includes('manage_users')) {
        setError(locale === 'fr' ? 'Vous ne pouvez pas révoquer votre propre accès à la gestion des utilisateurs.' : 'You cannot revoke your own User Management permission.')
        return
      }
    }

    startTransition(async () => {
      // 1. Update role if changed
      if (selectedRole !== editUser.role) {
        const roleRes = await updateUserRole(editUser.id, selectedRole)
        if (roleRes.error) {
          setError(roleRes.error)
          return
        }
      }

      // 2. Update permissions if role is admin
      if (selectedRole === 'admin') {
        const permRes = await updateAdminPermissions(editUser.id, selectedPermissions)
        if (permRes.error) {
          setError(permRes.error)
          return
        }
      }

      setSuccess(locale === 'fr' ? 'Utilisateur mis à jour avec succès.' : 'User updated successfully.')
      
      // Refresh local view
      router.refresh()
      
      // Close modal after slight delay
      setTimeout(() => {
        setEditUser(null)
      }, 1000)
    })
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Page Header Area */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            {locale === 'fr' ? 'Gestion des Utilisateurs' : 'User Management'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {locale === 'fr' 
              ? 'Consultez les utilisateurs enregistrés et configurez leurs rôles et permissions d\'accès.' 
              : 'View registered users and configure their access roles and administrative permissions.'}
          </Typography>
        </Box>
      </Box>

      {/* Filter and Search Bar Card */}
      <Card
        sx={{
          border: '1px solid divider',
          backgroundColor: 'background.paper',
          borderRadius: 4,
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={locale === 'fr' ? 'Rechercher par nom, email ou téléphone...' : 'Search by name, email or phone...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <Search size={18} style={{ marginRight: 8, opacity: 0.6 }} />
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="role-filter-label">{locale === 'fr' ? 'Filtrer par Rôle' : 'Filter by Role'}</InputLabel>
                <Select
                  labelId="role-filter-label"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
                  label={locale === 'fr' ? 'Filtrer par Rôle' : 'Filter by Role'}
                >
                  <MenuItem value="all">{locale === 'fr' ? 'Tous les rôles' : 'All Roles'}</MenuItem>
                  <MenuItem value="admin">{locale === 'fr' ? 'Administrateurs' : 'Administrators'}</MenuItem>
                  <MenuItem value="client">{locale === 'fr' ? 'Clients' : 'Clients'}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Table Card */}
      <Card
        sx={{
          border: '1px solid divider',
          backgroundColor: 'background.paper',
          borderRadius: 4,
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        }}
      >
        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Table>
            <TableHead sx={{ backgroundColor: (theme) => alpha(theme.palette.divider, 0.4) }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Nom Complet' : 'Full Name'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Téléphone' : 'Phone'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Email' : 'Email'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Région / Pays' : 'Residence'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Rôle' : 'Role'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Date de création' : 'Registered'}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Actions' : 'Actions'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProfiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      {locale === 'fr' ? 'Aucun utilisateur trouvé.' : 'No users found.'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProfiles.map((user) => {
                  const isSelf = user.id === currentUserId
                  return (
                    <TableRow key={user.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {user.full_name || '—'}
                          {isSelf && (
                            <Chip
                              label={locale === 'fr' ? 'Vous' : 'You'}
                              size="small"
                              color="primary"
                              sx={{ height: 16, fontSize: '0.65rem', fontWeight: 700 }}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>{user.phone ? `${user.phone_country_code || ''} ${user.phone}` : '—'}</TableCell>
                      <TableCell>{user.email || '—'}</TableCell>
                      <TableCell>{user.country || '—'}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role.toUpperCase()}
                          size="small"
                          color={user.role === 'admin' ? 'secondary' : 'default'}
                          variant={user.role === 'admin' ? 'filled' : 'outlined'}
                          sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                        />
                      </TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString(locale)}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleOpenEdit(user)}
                          sx={{ '&:hover': { backgroundColor: alpha('#F26419', 0.1) } }}
                        >
                          <Edit size={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Edit Role & Permissions Dialog */}
      <Dialog
        open={editUser !== null}
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              border: '1px solid divider',
              boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <UserCheck size={20} color="#F26419" />
          {locale === 'fr' ? 'Gérer les Droits Accès' : 'Manage Access Rights'}
        </DialogTitle>
        <DialogContent dividers sx={{ py: 2 }}>
          {editUser && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* User overview */}
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  {locale === 'fr' ? 'Utilisateur' : 'User'}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {editUser.full_name || 'No Name'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {editUser.email || editUser.phone || ''}
                </Typography>
              </Box>

              <Divider />

              {/* Role selection */}
              <FormControl fullWidth variant="outlined">
                <InputLabel id="edit-role-label">{locale === 'fr' ? 'Rôle Accès' : 'Access Role'}</InputLabel>
                <Select
                  labelId="edit-role-label"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as any)}
                  label={locale === 'fr' ? 'Rôle Accès' : 'Access Role'}
                >
                  <MenuItem value="client">{locale === 'fr' ? 'Client (Accès Public)' : 'Client (Public Access)'}</MenuItem>
                  <MenuItem value="admin">{locale === 'fr' ? 'Administrateur (Dashboard)' : 'Administrator (Dashboard)'}</MenuItem>
                </Select>
              </FormControl>

              {/* Permissions list for admin */}
              {selectedRole === 'admin' && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Key size={16} />
                    {locale === 'fr' ? 'Permissions Administratives' : 'Administrative Permissions'}
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5,
                      borderRadius: 3,
                    }}
                  >
                    {ALL_PERMISSIONS.map((perm) => {
                      const checked = selectedPermissions.includes(perm.key)
                      return (
                        <FormControlLabel
                          key={perm.key}
                          control={
                            <Switch
                              checked={checked}
                              onChange={() => handlePermissionToggle(perm.key)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: checked ? 700 : 500 }}>
                                {locale === 'fr' ? perm.labelFr : perm.labelEn}
                              </Typography>
                            </Box>
                          }
                          sx={{ width: '100%', mr: 0 }}
                        />
                      )
                    })}
                  </Paper>
                </Box>
              )}

              {/* Feedback messages */}
              {error && (
                <Alert severity="error" icon={<ShieldAlert size={18} />} sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" icon={<ShieldCheck size={18} />} sx={{ borderRadius: 2 }}>
                  {success}
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseEdit} variant="text" color="inherit" disabled={isPending}>
            {locale === 'fr' ? 'Annuler' : 'Cancel'}
          </Button>
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            disabled={isPending}
            sx={{
              background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
              fontWeight: 700,
            }}
          >
            {isPending 
              ? (locale === 'fr' ? 'Enregistrement...' : 'Saving...') 
              : (locale === 'fr' ? 'Enregistrer les Modifications' : 'Save Changes')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
