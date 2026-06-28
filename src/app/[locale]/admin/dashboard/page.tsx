import { Box, Card, CardContent, Grid, Typography, Badge, Paper, List, ListItem, ListItemText, ListItemIcon, Chip, alpha, Divider } from '@mui/material'
import { Inbox, FileText, MessageSquare, Mail, Layers, MessageCircle, AlertCircle, Clock } from 'lucide-react'
import { getDashboardStats } from '@/app/[locale]/actions/admin'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

interface ServiceRequest {
  id: string
  type: string
  status: string
  full_name: string
  created_at: string
}

interface ContactMessage {
  id: string
  full_name: string
  subject: string
  is_read: boolean
  created_at: string
}

interface DesignRequest {
  id: string
  full_name: string
  style: string | null
  status: string
  created_at: string
}

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const stats = await getDashboardStats()
  const supabase = await createClient()

  // Load recent records
  const [
    { data: recentServicesRaw },
    { data: recentContactsRaw },
    { data: recentDesignsRaw }
  ] = await Promise.all([
    supabase.from('service_requests').select('id, type, status, full_name, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('contact_messages').select('id, full_name, subject, is_read, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('request_designs').select('id, full_name, style, status, created_at').order('created_at', { ascending: false }).limit(5)
  ])

  const recentServices = (recentServicesRaw || []) as ServiceRequest[]
  const recentContacts = (recentContactsRaw || []) as ContactMessage[]
  const recentDesigns = (recentDesignsRaw || []) as DesignRequest[]

  const statCards = [
    {
      title: locale === 'fr' ? 'Demandes de Service' : 'Service Requests',
      value: stats.services.total,
      badge: stats.services.pending,
      badgeLabel: locale === 'fr' ? 'En attente' : 'Pending',
      icon: Inbox,
      color: '#F26419',
      href: '/admin/leads',
    },
    {
      title: locale === 'fr' ? 'Demandes de Design' : 'Design Requests',
      value: stats.designs.total,
      badge: stats.designs.submitted,
      badgeLabel: locale === 'fr' ? 'Soumis' : 'Submitted',
      icon: FileText,
      color: '#F6AE2D',
      href: '/admin/leads',
    },
    {
      title: locale === 'fr' ? 'Messages Contact' : 'Contact Messages',
      value: stats.contacts.total,
      badge: stats.contacts.unread,
      badgeLabel: locale === 'fr' ? 'Non lu' : 'Unread',
      icon: MessageSquare,
      color: '#42A5F5',
      href: '/admin/leads',
    },
    {
      title: locale === 'fr' ? 'Abonnés Newsletter' : 'Newsletter Subscribers',
      value: stats.newsletters.active,
      badge: 0,
      icon: Mail,
      color: '#66BB6A',
      href: '/admin/leads',
    },
    {
      title: locale === 'fr' ? 'Catalogue Plans' : 'Catalogue Items',
      value: stats.catalogues.total,
      badge: 0,
      icon: Layers,
      color: '#AB47BC',
      href: '/admin/catalogues',
    },
    {
      title: locale === 'fr' ? 'Commentaires Blog' : 'Blog Comments',
      value: stats.comments.pending,
      badge: stats.comments.pending,
      badgeLabel: locale === 'fr' ? 'À modérer' : 'Moderate',
      icon: MessageCircle,
      color: '#EF5350',
      href: '/admin/blogs',
    },
  ]

  const getStatusColor = (status: string) => {
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
        return 'default'
    }
  }

  const formatDistance = (dateString: string) => {
    const elapsed = Date.now() - new Date(dateString).getTime()
    const minutes = Math.floor(elapsed / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 60) return locale === 'fr' ? `Il y a ${minutes}m` : `${minutes}m ago`
    if (hours < 24) return locale === 'fr' ? `Il y a ${hours}h` : `${hours}h ago`
    return locale === 'fr' ? `Il y a ${days}j` : `${days}d ago`
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Welcome Banner */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          {locale === 'fr' ? 'Voici un aperçu de vos activités de prospect et de contenu.' : 'Here is an overview of your active lead capture pipelines and content channels.'}
        </Typography>
      </Box>

      {/* Stats Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={card.title}>
              <Link href={`/${locale}${card.href}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card
                  sx={{
                    p: 1.5,
                    border: '1px solid divider',
                    '&:hover': {
                      borderColor: card.color,
                      boxShadow: `0 12px 32px ${alpha(card.color, 0.1)}`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                      {card.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                      <Typography variant="h3" sx={{ fontWeight: 800 }}>
                        {card.value}
                      </Typography>
                      {card.badge > 0 && (
                        <Chip
                          label={`${card.badge} ${card.badgeLabel}`}
                          size="small"
                          color={card.title.includes('Comment') || card.title.includes('Message') ? 'error' : 'warning'}
                          sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700 }}
                        />
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      backgroundColor: alpha(card.color, 0.1),
                      color: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} />
                  </Box>
                </CardContent>
              </Card>
              </Link>
            </Grid>
          )
        })}
      </Grid>

      {/* Recent Activities Section */}
      <Grid container spacing={4}>
        {/* Recent Service Requests */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: '1px solid divider',
              backgroundColor: 'background.paper',
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Inbox size={22} color="#F26419" />
              {locale === 'fr' ? 'Demandes de Services Récentes' : 'Recent Service Requests'}
            </Typography>

            {recentServices.length === 0 ? (
              <Box sx={{ py: 4, textSet: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {locale === 'fr' ? 'Aucune demande de service reçue.' : 'No service requests received.'}
                </Typography>
              </Box>
            ) : (
              <List disablePadding>
                {recentServices.map((req, idx) => (
                  <Box key={req.id}>
                    {idx > 0 && <Divider sx={{ my: 1.5 }} />}
                    <ListItem disableGutters sx={{ py: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <ListItemText
                        primary={req.full_name}
                        slotProps={{ secondary: { component: 'div' } }}
                        secondary={
                          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={req.type.replace('_', ' ').toUpperCase()}
                              size="small"
                              variant="outlined"
                              sx={{ height: 18, fontSize: '0.65rem' }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Clock size={12} />
                              {formatDistance(req.created_at)}
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip
                        label={req.status.replace('_', ' ')}
                        size="small"
                        color={getStatusColor(req.status)}
                        sx={{ fontSize: '0.7rem', fontWeight: 600, height: 20 }}
                      />
                    </ListItem>
                  </Box>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Recent Design Requests */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              border: '1px solid divider',
              backgroundColor: 'background.paper',
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <FileText size={22} color="#F6AE2D" />
              {locale === 'fr' ? 'Demandes de Design Récents' : 'Recent Design Requests'}
            </Typography>

            {recentDesigns.length === 0 ? (
              <Box sx={{ py: 4, textSet: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {locale === 'fr' ? 'Aucune demande de design reçue.' : 'No design requests received.'}
                </Typography>
              </Box>
            ) : (
              <List disablePadding>
                {recentDesigns.map((req, idx) => (
                  <Box key={req.id}>
                    {idx > 0 && <Divider sx={{ my: 1.5 }} />}
                    <ListItem disableGutters sx={{ py: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <ListItemText
                        primary={req.full_name}
                        slotProps={{ secondary: { component: 'div' } }}
                        secondary={
                          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={(req.style || 'Custom').toUpperCase()}
                              size="small"
                              variant="outlined"
                              sx={{ height: 18, fontSize: '0.65rem' }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Clock size={12} />
                              {formatDistance(req.created_at)}
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip
                        label={req.status.replace('_', ' ')}
                        size="small"
                        color={getStatusColor(req.status)}
                        sx={{ fontSize: '0.7rem', fontWeight: 600, height: 20 }}
                      />
                    </ListItem>
                  </Box>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
