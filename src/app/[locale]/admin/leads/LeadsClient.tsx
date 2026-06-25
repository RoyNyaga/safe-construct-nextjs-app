'use client'

import { useState, useTransition } from 'react'
import {
  Box,
  Tabs,
  Tab,
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
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Divider,
  alpha,
  Grid,
} from '@mui/material'
import { Eye, Check, Clock, AlertCircle, Mail, Phone, Calendar } from 'lucide-react'
import { updateLeadStatus } from '@/app/[locale]/actions/admin'
import { useLocale } from 'next-intl'

interface LeadsClientProps {
  locale: string
  serviceRequests: any[]
  designRequests: any[]
  contactMessages: any[]
  newsletterSubscribers: any[]
}

export default function LeadsClient({
  locale,
  serviceRequests: initialServices,
  designRequests: initialDesigns,
  contactMessages: initialContacts,
  newsletterSubscribers: initialNewsletters,
}: LeadsClientProps) {
  const [tabValue, setTabValue] = useState(0)
  const [isPending, startTransition] = useTransition()

  // Local states to allow instant UI updates
  const [services, setServices] = useState(initialServices)
  const [designs, setDesigns] = useState(initialDesigns)
  const [contacts, setContacts] = useState(initialContacts)

  // Details Modal state
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [selectedType, setSelectedType] = useState<'service' | 'design' | 'contact' | null>(null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleStatusChange = async (type: 'service' | 'design', id: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateLeadStatus(type, id, { status: newStatus })
      if (!res.error) {
        if (type === 'service') {
          setServices((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)))
        } else {
          setDesigns((prev) => prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d)))
        }
      }
    })
  }

  const handleMarkContact = async (id: string, field: 'is_read' | 'is_replied', value: boolean) => {
    startTransition(async () => {
      const res = await updateLeadStatus('contact', id, { [field]: value })
      if (!res.error) {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)))
      }
    })
  }

  const handleViewDetails = (lead: any, type: 'service' | 'design' | 'contact') => {
    setSelectedLead(lead)
    setSelectedType(type)
  }

  const handleCloseDetails = () => {
    setSelectedLead(null)
    setSelectedType(null)
  }

  const getStatusChipColor = (status: string): 'warning' | 'info' | 'success' | 'error' | 'primary' => {
    switch (status) {
      case 'pending':
      case 'submitted':
        return 'warning'
      case 'under_review':
        return 'info'
      case 'accepted':
      case 'meeting_attended':
      case 'project_created':
        return 'success'
      case 'declined':
      case 'client_declined':
        return 'error'
      default:
        return 'primary'
    }
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Tabs Menu */}
      <Paper elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: 'background.paper', borderRadius: 3, mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2 }}
        >
          <Tab label={locale === 'fr' ? 'Demandes de Services' : 'Service Inquiries'} id="leads-tab-0" />
          <Tab label={locale === 'fr' ? 'Demandes de Design' : 'Custom Design Requests'} id="leads-tab-1" />
          <Tab label={locale === 'fr' ? 'Formulaires Contact' : 'Contact Submissions'} id="leads-tab-2" />
          <Tab label={locale === 'fr' ? 'Abonnés Newsletter' : 'Newsletter Subscribers'} id="leads-tab-3" />
        </Tabs>
      </Paper>

      {/* TAB 0: SERVICE REQUESTS */}
      {tabValue === 0 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper' }}>
          <Table id="leads-services-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Nom' : 'Name'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email / Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    {locale === 'fr' ? 'Aucune demande disponible.' : 'No inquiries found.'}
                  </TableCell>
                </TableRow>
              ) : (
                services.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{req.full_name}</TableCell>
                    <TableCell>
                      <Chip
                        label={req.type.replace('_', ' ').toUpperCase()}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{req.email}</Typography>
                      {req.phone && <Typography variant="caption" color="text.secondary">{req.phone}</Typography>}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>{formatDateTime(req.created_at)}</TableCell>
                    <TableCell>
                      <Select
                        id={`status-select-${req.id}`}
                        value={req.status}
                        onChange={(e) => handleStatusChange('service', req.id, e.target.value)}
                        size="small"
                        disabled={isPending}
                        sx={{
                          height: 28,
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          backgroundColor: (theme) =>
                            alpha(theme.palette[getStatusChipColor(req.status)].main, 0.1),
                          color: (theme) => theme.palette[getStatusChipColor(req.status)].main,
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="under_review">Under Review</MenuItem>
                        <MenuItem value="proposal_sent">Proposal Sent</MenuItem>
                        <MenuItem value="accepted">Accepted</MenuItem>
                        <MenuItem value="declined">Declined</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        id={`view-service-btn-${req.id}`}
                        size="small"
                        onClick={() => handleViewDetails(req, 'service')}
                        title="View Details"
                      >
                        <Eye size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* TAB 1: DESIGN REQUESTS */}
      {tabValue === 1 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper' }}>
          <Table id="leads-designs-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Client' : 'Client'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Pays / Superficie' : 'Country / Area'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Style / Niveaux' : 'Style / Floors'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Consultation' : 'Consultation'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {designs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    {locale === 'fr' ? 'Aucune demande disponible.' : 'No requests found.'}
                  </TableCell>
                </TableRow>
              ) : (
                designs.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>{req.full_name}</Typography>
                      <Typography variant="caption" color="text.secondary">{req.phone_country_code} {req.whatsapp_phone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{req.build_country || 'N/A'}</Typography>
                      {req.size_sqm && <Typography variant="caption" color="text.secondary">{req.size_sqm} m²</Typography>}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{req.style || 'Custom'}</Typography>
                      {req.floors && <Typography variant="caption" color="text.secondary">{req.floors} floors</Typography>}
                    </TableCell>
                    <TableCell>
                      {req.meeting_date ? (
                        <>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Calendar size={14} />
                            {req.meeting_date}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {req.meeting_time || ''} ({req.meeting_timezone || ''})
                          </Typography>
                        </>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      <Select
                        id={`design-status-select-${req.id}`}
                        value={req.status}
                        onChange={(e) => handleStatusChange('design', req.id, e.target.value)}
                        size="small"
                        disabled={isPending}
                        sx={{
                          height: 28,
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          backgroundColor: (theme) =>
                            alpha(theme.palette[getStatusChipColor(req.status)].main, 0.1),
                          color: (theme) => theme.palette[getStatusChipColor(req.status)].main,
                          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                        }}
                      >
                        <MenuItem value="submitted">Submitted</MenuItem>
                        <MenuItem value="meeting_attended">Meeting Attended</MenuItem>
                        <MenuItem value="client_declined">Client Declined</MenuItem>
                        <MenuItem value="project_created">Project Created</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        id={`view-design-btn-${req.id}`}
                        size="small"
                        onClick={() => handleViewDetails(req, 'design')}
                        title="View Details"
                      >
                        <Eye size={18} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* TAB 2: CONTACT MESSAGES */}
      {tabValue === 2 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper' }}>
          <Table id="leads-contacts-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Expéditeur' : 'Sender'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Sujet</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Canal</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    {locale === 'fr' ? 'Aucun message.' : 'No messages found.'}
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>{req.full_name}</Typography>
                      <Typography variant="caption" color="text.secondary">{req.email}</Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {req.subject}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={req.preferred_contact.toUpperCase()}
                        size="small"
                        variant="outlined"
                        color={req.preferred_contact === 'whatsapp' ? 'success' : 'default'}
                        sx={{ fontSize: '0.65rem', height: 18 }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>{formatDateTime(req.created_at)}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={req.is_read ? 'Read' : 'Unread'}
                          size="small"
                          color={req.is_read ? 'success' : 'error'}
                          onClick={() => handleMarkContact(req.id, 'is_read', !req.is_read)}
                          sx={{ fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', height: 20 }}
                        />
                        {req.is_replied && (
                          <Chip
                            label="Replied"
                            size="small"
                            color="info"
                            sx={{ fontSize: '0.7rem', fontWeight: 600, height: 20 }}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                        {!req.is_replied && (
                          <IconButton
                            id={`reply-contact-btn-${req.id}`}
                            size="small"
                            color="info"
                            onClick={() => handleMarkContact(req.id, 'is_replied', true)}
                            title="Mark as Replied"
                          >
                            <Check size={18} />
                          </IconButton>
                        )}
                        <IconButton
                          id={`view-contact-btn-${req.id}`}
                          size="small"
                          onClick={() => handleViewDetails(req, 'contact')}
                          title="View Details"
                        >
                          <Eye size={18} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* TAB 3: NEWSLETTER SUBSCRIBERS */}
      {tabValue === 3 && (
        <TableContainer component={Paper} elevation={0} sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 3, backgroundColor: 'background.paper' }}>
          <Table id="leads-newsletter-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{locale === 'fr' ? 'Date d\'inscription' : 'Subscribed At'}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialNewsletters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    {locale === 'fr' ? 'Aucun abonné.' : 'No subscribers found.'}
                  </TableCell>
                </TableRow>
              ) : (
                initialNewsletters.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{sub.email}</TableCell>
                    <TableCell sx={{ fontSize: '0.85rem' }}>{formatDateTime(sub.subscribed_at)}</TableCell>
                    <TableCell>
                      <Chip
                        label={sub.is_active ? 'Active' : 'Unsubscribed'}
                        size="small"
                        color={sub.is_active ? 'success' : 'default'}
                        sx={{ fontSize: '0.7rem', fontWeight: 600, height: 20 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* DETAILS VIEW DIALOG */}
      <Dialog
        open={selectedLead !== null}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        id="lead-details-modal"
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: (theme) => `1px solid ${theme.palette.divider}`, py: 2.5 }}>
          {selectedType === 'service' && (locale === 'fr' ? 'Détails de l\'Inquiry Service' : 'Service Inquiry Details')}
          {selectedType === 'design' && (locale === 'fr' ? 'Détails du Custom Design' : 'Custom Design Details')}
          {selectedType === 'contact' && (locale === 'fr' ? 'Détails du Formulaire Contact' : 'Contact Message Details')}
        </DialogTitle>
        <DialogContent sx={{ p: 4, mt: 1 }}>
          {selectedLead && (
            <Stack spacing={3}>
              {/* Common Info */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    {locale === 'fr' ? 'Nom Complet' : 'Full Name'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {selectedLead.full_name}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    {locale === 'fr' ? 'Date de soumission' : 'Submitted At'}
                  </Typography>
                  <Typography variant="body1">
                    {formatDateTime(selectedLead.created_at)}
                  </Typography>
                </Grid>
              </Grid>

              <Divider />

              {/* Service Request Specific Details */}
              {selectedType === 'service' && (
                <Stack spacing={2}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" color="text.secondary">Type</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedLead.type.replace('_', ' ').toUpperCase()}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{selectedLead.email}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" color="text.secondary">Phone</Typography>
                      <Typography variant="body1">{selectedLead.phone || 'N/A'}</Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ p: 2, borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.divider, 0.5) }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      {locale === 'fr' ? 'Détails du Projet :' : 'Project Parameters :'}
                    </Typography>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.875rem', color: '#9AA3B2' }}>
                      {JSON.stringify(selectedLead.details, null, 2)}
                    </pre>
                  </Box>
                </Stack>
              )}

              {/* Design Request Specific Details */}
              {selectedType === 'design' && (
                <Stack spacing={3}>
                  {/* Phase 1: Location */}
                  <Box>
                    <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                      1. {locale === 'fr' ? 'Emplacement & Terrain' : 'Location & Land'}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Pays du projet' : 'Project Country'}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedLead.build_country || 'N/A'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Propriétaire du terrain ?' : 'Owns land?'}</Typography>
                        <Typography variant="body2">{selectedLead.has_land ? 'Yes' : 'No'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Plan de masse disponible ?' : 'Has site plan?'}</Typography>
                        <Typography variant="body2">{selectedLead.has_site_plan ? 'Yes' : 'No'}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Phase 2: Style & Rooms */}
                  <Box>
                    <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                      2. {locale === 'fr' ? 'Style de construction & Pièces' : 'Building Style & Layout'}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary">Style</Typography>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>{selectedLead.style || 'Custom'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Niveaux' : 'Floors'}</Typography>
                        <Typography variant="body2">{selectedLead.floors || 1}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Chambres' : 'Bedrooms'}</Typography>
                        <Typography variant="body2">{selectedLead.bedrooms || 0}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Salles de bain' : 'Bathrooms'}</Typography>
                        <Typography variant="body2">{selectedLead.bathrooms || 0}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Amenities */}
                  <Box>
                    <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                      3. {locale === 'fr' ? 'Éléments extérieurs & Provisions' : 'Amenities & Special Features'}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary">Car Park</Typography>
                        <Typography variant="body2">{selectedLead.has_car_park ? 'Yes' : 'No'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary">Garden</Typography>
                        <Typography variant="body2">{selectedLead.has_garden ? 'Yes' : 'No'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary">Fence</Typography>
                        <Typography variant="body2">{selectedLead.has_fence ? 'Yes' : 'No'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Typography variant="caption" color="text.secondary">Pool</Typography>
                        <Typography variant="body2">{selectedLead.has_swimming_pool ? 'Yes' : 'No'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">Solar Provisions</Typography>
                        <Typography variant="body2">{selectedLead.has_solar_provision ? 'Yes' : 'No'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">Borehole Well</Typography>
                        <Typography variant="body2">{selectedLead.has_borehole_provision ? 'Yes' : 'No'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">Servant Quarters</Typography>
                        <Typography variant="body2">{selectedLead.has_servant_quarters ? 'Yes' : 'No'}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Documents & Size */}
                  <Box>
                    <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                      4. {locale === 'fr' ? 'Documents requis & Superficie souhaitée' : 'Requested Documents & Size'}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Superficie' : 'Desired Area'}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>{selectedLead.size_sqm ? `${selectedLead.size_sqm} m²` : 'N/A'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 8 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Documents' : 'Documents'}</Typography>
                        <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                          {selectedLead.requested_documents.length === 0 ? (
                            <Typography variant="body2">None</Typography>
                          ) : (
                            selectedLead.requested_documents.map((doc: string) => (
                              <Chip key={doc} label={doc.replace('_', ' ').toUpperCase()} size="small" variant="outlined" sx={{ fontSize: '0.65rem' }} />
                            ))
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Consultation Meeting */}
                  <Box sx={{ p: 2, borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.05), border: (theme) => `1px solid ${alpha(theme.palette.secondary.main, 0.15)}` }}>
                    <Typography variant="subtitle2" color="secondary.main" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Calendar size={16} />
                      {locale === 'fr' ? 'Rendez-vous de Consultation :' : 'Consultation Appointment :'}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Date' : 'Meeting Date'}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedLead.meeting_date || 'N/A'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Heure' : 'Meeting Time'}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{selectedLead.meeting_time || 'N/A'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Fuseau horaire' : 'Timezone'}</Typography>
                        <Typography variant="body2">{selectedLead.meeting_timezone || 'N/A'}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Contact préféré' : 'Preferred Contact'}</Typography>
                        <Chip label={selectedLead.preferred_contact.toUpperCase()} size="small" color={selectedLead.preferred_contact === 'whatsapp' ? 'success' : 'primary'} sx={{ fontSize: '0.65rem', height: 18 }} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">WhatsApp</Typography>
                        <Typography variant="body2">{selectedLead.phone_country_code} {selectedLead.whatsapp_phone}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="caption" color="text.secondary">Email</Typography>
                        <Typography variant="body2">{selectedLead.email || 'N/A'}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Notes */}
                  {selectedLead.additional_notes && (
                    <Box>
                      <Typography variant="caption" color="text.secondary">{locale === 'fr' ? 'Notes du Client' : 'Client Notes'}</Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', p: 2, borderRadius: 2, border: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: 'background.default' }}>
                        {selectedLead.additional_notes}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              )}

              {/* Contact Message Specific Details */}
              {selectedType === 'contact' && (
                <Stack spacing={2}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" color="text.secondary">WhatsApp Phone</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedLead.whatsapp_phone}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" color="text.secondary">Email Address</Typography>
                      <Typography variant="body1">{selectedLead.email}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" color="text.secondary">Channel Preference</Typography>
                      <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{selectedLead.preferred_contact}</Typography>
                    </Grid>
                  </Grid>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Subject</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>{selectedLead.subject}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Message Content</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', p: 2, borderRadius: 2, border: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: 'background.default' }}>
                      {selectedLead.message}
                    </Typography>
                  </Box>
                </Stack>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 4, py: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
          {selectedType === 'contact' && selectedLead && !selectedLead.is_replied && (
            <Button
              id="dialog-mark-replied"
              variant="contained"
              color="info"
              onClick={() => {
                handleMarkContact(selectedLead.id, 'is_replied', true)
                handleCloseDetails()
              }}
            >
              {locale === 'fr' ? 'Marquer comme Répondu' : 'Mark as Replied'}
            </Button>
          )}
          <Button id="dialog-close-details" variant="outlined" onClick={handleCloseDetails}>
            {locale === 'fr' ? 'Fermer' : 'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
