'use client'

import { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  alpha,
  Divider,
  Button,
} from '@mui/material'
import { Menu, X, HardHat, LogIn, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { LanguageSwitcher } from '@/components/ui'
import { createClient } from '@/utils/supabase/client'

const NAV_LINKS = [
  { key: 'home', href: '' },
  { key: 'about', href: '/about' },
  { key: 'catalogue', href: '/catalogue' },
  { key: 'services', href: '/services' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const

export default function Navbar() {
  const t = useTranslations('Nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 20 })

  useEffect(() => {
    setMounted(true)

    // Load active session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        supabase.from('profiles').select('role').eq('id', user.id).single().then(({ data }) => {
          setIsAdmin(data?.role === 'admin')
        })
      }
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        supabase.from('profiles').select('role').eq('id', u.id).single().then(({ data }) => {
          setIsAdmin(data?.role === 'admin')
        })
      } else {
        setIsAdmin(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
    router.refresh()
  }

  const isActive = (href: string) => {
    const full = `/${locale}${href}`
    return href === '' ? pathname === `/${locale}` : pathname.startsWith(full)
  }

  const navLinkSx = (active: boolean) => ({
    position: 'relative',
    color: active ? 'primary.main' : 'text.secondary',
    fontWeight: active ? 700 : 500,
    fontSize: '0.9rem',
    px: 1.5,
    py: 0.75,
    borderRadius: 2,
    textDecoration: 'none',
    transition: 'color 0.2s',
    '&:hover': { color: 'primary.main' },
    '&::after': active
      ? {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '2px',
          borderRadius: '2px',
          background: 'linear-gradient(90deg, #F26419, #F6AE2D)',
        }
      : {},
  })

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: mounted && scrolled
            ? alpha('#1E2635', 0.95)
            : 'transparent',
          backdropFilter: mounted && scrolled ? 'blur(20px)' : 'none',
          borderBottom: mounted && scrolled
            ? (t) => `1px solid ${alpha(t.palette.divider, 1)}`
            : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 72, gap: { xs: 1, sm: 2 } }}>
            {/* Logo */}
            <Box
              component={Link}
              href={`/${locale}`}
              id="nav-logo"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: { xs: 30, sm: 36 },
                  height: { xs: 30, sm: 36 },
                  borderRadius: 1.5,
                  background: 'linear-gradient(135deg, #F26419, #F6AE2D)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  '& svg': {
                    width: { xs: 16, sm: 20 },
                    height: { xs: 16, sm: 20 },
                  },
                }}
              >
                <HardHat color="#fff" />
              </Box>
              <Box
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: 'text.primary',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                Safe<Box component="span" sx={{ color: 'primary.main' }}>Construct</Box>
              </Box>
            </Box>

            {/* Desktop Nav Links */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 0.5,
                ml: 3,
                flex: 1,
              }}
            >
              {NAV_LINKS.map(({ key, href }) => (
                <Box
                  key={key}
                  component={Link}
                  href={`/${locale}${href}`}
                  id={`nav-link-${key}`}
                  sx={navLinkSx(isActive(href))}
                >
                  {t(key)}
                </Box>
              ))}
            </Box>

            {/* Desktop Right Actions */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1.5,
                ml: 'auto',
              }}
            >
              <LanguageSwitcher />
              {user ? (
                <>
                  {isAdmin && (
                    <Button
                      id="nav-dashboard-btn"
                      component={Link}
                      href={`/${locale}/select-context`}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.light',
                        fontWeight: 600,
                        px: 2,
                        '&:hover': {
                          borderColor: 'primary.light',
                          backgroundColor: 'rgba(242, 100, 25, 0.08)',
                        },
                      }}
                    >
                      {locale === 'fr' ? 'Tableau de bord' : 'Dashboard'}
                    </Button>
                  )}
                  <Button
                    id="nav-logout-btn"
                    onClick={handleSignOut}
                    variant="text"
                    size="small"
                    startIcon={<LogOut size={14} />}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      px: 1.5,
                      '&:hover': {
                        color: 'primary.light',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    {locale === 'fr' ? 'Se déconnecter' : 'Sign Out'}
                  </Button>
                </>
              ) : (
                <Button
                  id="nav-login-btn"
                  component={Link}
                  href={`/${locale}/login`}
                  variant="text"
                  size="small"
                  startIcon={<LogIn size={14} />}
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    px: 1.5,
                    '&:hover': {
                      color: 'primary.light',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  {t('login')}
                </Button>
              )}
              <Button
                id="nav-request-design-btn"
                component={Link}
                href={`/${locale}/request-design`}
                variant="contained"
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                  fontWeight: 700,
                  px: 2.5,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #C44E10 0%, #C48B1A 100%)',
                  },
                }}
              >
                {t('requestDesign')}
              </Button>
            </Box>

            {/* Mobile: language + hamburger */}
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                gap: { xs: 0.25, sm: 0.5 },
                ml: 'auto',
              }}
            >
              <LanguageSwitcher />
              <IconButton
                id="nav-mobile-menu-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                size="medium"
                edge="end"
                sx={{
                  color: 'text.primary',
                  p: { xs: 0.75, sm: 1.5 },
                }}
              >
                <Menu size={22} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{ paper: { sx: { width: 280 } } }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Drawer Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2.5,
              py: 2,
            }}
          >
            <Box
              sx={{
                fontWeight: 800,
                fontSize: '1.1rem',
                color: 'text.primary',
                letterSpacing: '-0.02em',
              }}
            >
              Safe<Box component="span" sx={{ color: 'primary.main' }}>Construct</Box>
            </Box>
            <IconButton
              id="nav-close-menu-btn"
              onClick={() => setMobileOpen(false)}
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              <X size={20} />
            </IconButton>
          </Box>

          <Divider />

          {/* Nav Links */}
          <List sx={{ flex: 1, pt: 1 }}>
            {NAV_LINKS.map(({ key, href }) => (
              <ListItem key={key} disablePadding>
                <ListItemButton
                  id={`mobile-nav-${key}`}
                  component={Link}
                  href={`/${locale}${href}`}
                  onClick={() => setMobileOpen(false)}
                  selected={isActive(href)}
                  sx={{
                    mx: 1,
                    borderRadius: 2,
                    mb: 0.5,
                    '&.Mui-selected': {
                      backgroundColor: (t) => alpha(t.palette.primary.main, 0.1),
                      color: 'primary.main',
                    },
                  }}
                >
                  <ListItemText
                    primary={t(key)}
                    slotProps={{ primary: { sx: { fontWeight: isActive(href) ? 700 : 500 } } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* Bottom actions */}
          <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              id="mobile-nav-request-design"
              component={Link}
              href={`/${locale}/request-design`}
              variant="contained"
              fullWidth
              onClick={() => setMobileOpen(false)}
              sx={{
                background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                fontWeight: 700,
              }}
            >
              {t('requestDesign')}
            </Button>
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    id="mobile-nav-dashboard"
                    component={Link}
                    href={`/${locale}/select-context`}
                    variant="outlined"
                    fullWidth
                    onClick={() => setMobileOpen(false)}
                  >
                    {locale === 'fr' ? 'Tableau de bord' : 'Dashboard'}
                  </Button>
                )}
                <Button
                  id="mobile-nav-logout"
                  variant="contained"
                  fullWidth
                  startIcon={<LogOut size={16} />}
                  onClick={() => {
                    handleSignOut()
                    setMobileOpen(false)
                  }}
                  sx={{
                    background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                    fontWeight: 700,
                  }}
                >
                  {locale === 'fr' ? 'Se déconnecter' : 'Sign Out'}
                </Button>
              </>
            ) : (
              <Button
                id="mobile-nav-login"
                component={Link}
                href={`/${locale}/login`}
                variant="outlined"
                fullWidth
                startIcon={<LogIn size={16} />}
                onClick={() => setMobileOpen(false)}
              >
                {t('login')}
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>

      {/* Spacer so content doesn't hide under fixed Navbar */}
      <Toolbar sx={{ height: 72 }} />
    </>
  )
}
