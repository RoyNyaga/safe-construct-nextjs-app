'use client'

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  alpha,
  Divider,
} from '@mui/material'
import { Phone, Compass, Target, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import servicesHeader from '@/assests/images/services-header.jpeg'

interface TeamMember {
  id: string
  full_name: string
  title: string
  title_fr: string | null
  phone: string | null
  photo_url: string | null
  order_index: number
}

interface AboutClientProps {
  teamMembers: TeamMember[]
  locale: string
}

export default function AboutClient({ teamMembers, locale }: AboutClientProps) {
  const t = useTranslations('About')

  // Timeline events based on locale
  const timelineEvents = locale === 'fr'
    ? [
        { year: '2020', title: 'Fondation', desc: 'Lancement de Safe-Construct avec une vision de moderniser la construction.' },
        { year: '2022', title: 'Expansion Régionale', desc: 'Ouverture de bureaux secondaires et doublement de la taille de l\'équipe.' },
        { year: '2024', title: 'Révolution Digitale', desc: 'Introduction de notre catalogue de plans architecturaux en ligne.' },
        { year: '2026', title: 'Aujourd\'hui', desc: 'La plateforme de référence pour des constructions fiables et durables.' },
      ]
    : [
        { year: '2020', title: 'Foundation', desc: 'Safe-Construct launched with a vision to modernize building and design.' },
        { year: '2022', title: 'Regional Expansion', desc: 'Opened regional offices and doubled our engineering team size.' },
        { year: '2024', title: 'Digital Transformation', desc: 'Introduced our custom online catalog of architectural plans.' },
        { year: '2026', title: 'Today', desc: 'The leading trusted portal for premium architectural design and build oversight.' },
      ]

  return (
    <Box sx={{ pb: 12 }}>
      {/* Hero Header */}
      <Box
        sx={{
          py: { xs: 14, md: 22 },
          backgroundImage: (t) => `
            radial-gradient(ellipse 90% 70% at 20% 40%, ${alpha(t.palette.primary.main, 0.12)} 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 80% 80%, ${alpha(t.palette.primary.main, 0.06)} 0%, transparent 50%),
            linear-gradient(180deg, rgba(14, 20, 32, 0.35) 0%, rgba(18, 24, 36, 0.6) 100%),
            url(${servicesHeader.src})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderBottom: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 2,
              py: 0.75,
              borderRadius: 5,
              backgroundColor: 'rgba(242, 100, 25, 0.25)',
              color: 'primary.light',
              border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.5)}`,
              fontWeight: 700,
              fontSize: '0.85rem',
              mb: 3,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backdropFilter: 'blur(4px)',
            }}
          >
            {t('hero.badge')}
          </Box>
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)'
            }}
          >
            {t('hero.title')}{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #F26419, #F6AE2D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))',
              }}
            >
              {t('hero.titleHighlight')}
            </Box>
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              fontSize: '1.1rem',
              fontWeight: 500,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
            }}
          >
            {t('hero.subtitle')}
          </Typography>
        </Container>
      </Box>

      {/* Mission & Vision Section */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: '100%',
                background: '#1E2635',
                border: '1px solid divider',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ p: 5, flexGrow: 1 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    backgroundColor: 'rgba(242, 100, 25, 0.1)',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Target size={28} />
                </Box>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {t('mission.title')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('mission.description')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: '100%',
                background: '#1E2635',
                border: '1px solid divider',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ p: 5, flexGrow: 1 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    backgroundColor: 'rgba(246, 174, 45, 0.1)',
                    color: 'secondary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Compass size={28} />
                </Box>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {locale === 'fr' ? 'Notre Vision' : 'Our Vision'}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {locale === 'fr'
                    ? 'Devenir le partenaire technologique de confiance pour sécuriser et optimiser chaque projet de construction sur le continent africain, en alliant design d\'excellence et ingénierie de pointe.'
                    : 'To become the trusted technological partner that secures and optimizes every building project on the African continent, combining design excellence with state-of-the-art engineering.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Timeline Section */}
      <Box sx={{
        py: 10,
        mt: 8,
        backgroundColor: 'rgba(30, 38, 53, 0.4)',
        borderTop: '1px solid divider',
        borderBottom: '1px solid divider'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              {locale === 'fr' ? 'Notre Parcours' : 'Our Journey'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              {locale === 'fr' ? 'Découvrez les grandes étapes clés qui ont façné Safe-Construct.' : 'Explore the key milestones that shaped Safe-Construct into who we are today.'}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {timelineEvents.map((event, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={event.year}>
                <Box sx={{ position: 'relative', height: '100%' }}>
                  {/* Timeline connectors */}
                  {idx < 3 && (
                    <Box
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        position: 'absolute',
                        top: 28,
                        left: '50%',
                        width: '100%',
                        height: '2px',
                        borderTop: '2px dashed divider',
                        zIndex: 1,
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: { xs: 'flex-start', md: 'center' },
                      textAlign: { xs: 'left', md: 'center' },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        backgroundColor: '#1E2635',
                        border: '2px solid primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        mb: 3,
                        boxShadow: '0 0 20px rgba(242, 100, 25, 0.2)',
                      }}
                    >
                      <Clock size={20} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                      {event.year}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: 'primary.light' }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            {t('team.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            {t('team.subtitle')}
          </Typography>
        </Box>

        {teamMembers.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              {locale === 'fr' ? 'Aucun membre de l\'équipe disponible pour le moment.' : 'No team members available at the moment.'}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            {teamMembers.map((member) => {
              const displayTitle = locale === 'fr' ? (member.title_fr || member.title) : member.title
              const initials = member.full_name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={member.id}>
                  <Card
                    sx={{
                      height: '100%',
                      background: '#1E2635',
                      border: '1px solid divider',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Avatar
                        src={member.photo_url || undefined}
                        alt={member.full_name}
                        sx={{
                          width: 100,
                          height: 100,
                          mx: 'auto',
                          mb: 3,
                          fontSize: '2rem',
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #F26419, #F6AE2D)',
                          color: '#fff',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        }}
                      >
                        {initials}
                      </Avatar>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        {member.full_name}
                      </Typography>
                      <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600, mb: 2 }}>
                        {displayTitle}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      {member.phone && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <IconButton
                            component="a"
                            href={`tel:${member.phone}`}
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              '&:hover': { color: 'primary.main', backgroundColor: 'rgba(242, 100, 25, 0.1)' },
                            }}
                            title={member.phone}
                          >
                            <Phone size={16} />
                          </IconButton>
                          <Typography variant="caption" color="text.secondary">
                            {member.phone}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
