'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Box, Container, Typography, Card, CardContent, Grid, alpha, Button } from '@mui/material'
import { Globe, Shield, LogOut } from 'lucide-react'
import { signOut } from '@/app/[locale]/auth/actions'

interface SelectContextClientProps {
  locale: string
}

export default function SelectContextClient({ locale }: SelectContextClientProps) {
  const t = useTranslations('SelectContext')
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(locale)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) =>
          `radial-gradient(ellipse at 50% 30%, ${alpha(theme.palette.primary.main, 0.07)} 0%, transparent 60%),
           radial-gradient(ellipse at 10% 80%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%),
           ${theme.palette.background.default}`,
      }}
    >
      {/* Top Bar with Logout */}
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button
          id="context-logout-btn"
          variant="text"
          color="inherit"
          startIcon={<LogOut size={16} />}
          onClick={handleLogout}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'error.main' },
          }}
        >
          {locale === 'fr' ? 'Se déconnecter' : 'Logout'}
        </Button>
      </Box>

      {/* Main Context Grid */}
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pb: 12,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            {t('title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
            {t('subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {/* Card 1: Client Portal */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card
              id="context-client-card"
              onClick={() => router.push(`/${locale}`)}
              sx={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
                backgroundColor: 'background.paper',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: 'primary.main',
                  boxShadow: (theme) => `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Globe size={32} />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                  {t('clientPortal')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 64 }}>
                  {t('clientPortalDesc')}
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2.5,
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }}
              >
                {t('continue')}
              </Button>
            </Card>
          </Grid>

          {/* Card 2: Admin Dashboard */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card
              id="context-admin-card"
              onClick={() => router.push(`/${locale}/admin/dashboard`)}
              sx={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
                backgroundColor: 'background.paper',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: 'secondary.main',
                  boxShadow: (theme) => `0 20px 40px ${alpha(theme.palette.secondary.main, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                    color: 'secondary.main',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Shield size={32} />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                  {t('adminPortal')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 64 }}>
                  {t('adminPortalDesc')}
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2.5,
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    color: 'secondary.contrastText',
                  },
                }}
              >
                {t('continue')}
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
