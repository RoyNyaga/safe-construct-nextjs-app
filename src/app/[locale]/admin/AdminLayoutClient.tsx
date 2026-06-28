'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Container,
  alpha,
  Card,
  CardContent,
  Button,
} from '@mui/material'
import {
  HardHat,
  LayoutDashboard,
  Inbox,
  BookOpen,
  LayoutGrid,
  Users,
  LogOut,
  Menu,
  ShieldAlert,
  Globe,
  ShieldCheck,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/ui'
import { signOut } from '@/app/[locale]/auth/actions'
import Link from 'next/link'

interface AdminLayoutClientProps {
  children: React.ReactNode
  locale: string
  permissions: string[]
}

const DRAWER_WIDTH = 280

export default function AdminLayoutClient({
  children,
  locale,
  permissions,
}: AdminLayoutClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = async () => {
    await signOut(locale)
  }

  // Sidebar link configuration
  const menuItems = [
    {
      key: 'dashboard',
      label: locale === 'fr' ? 'Tableau de Bord' : 'Dashboard',
      icon: LayoutDashboard,
      href: `/admin/dashboard`,
      permission: null,
    },
    {
      key: 'leads',
      label: locale === 'fr' ? 'Boîte de Réception' : 'Leads Inbox',
      icon: Inbox,
      href: `/admin/leads`,
      permission: 'manage_leads',
    },
    {
      key: 'blogs',
      label: locale === 'fr' ? 'Blogs & Modération' : 'Blogs & Comments',
      icon: BookOpen,
      href: `/admin/blogs`,
      permission: 'manage_blogs',
    },
    {
      key: 'catalogues',
      label: locale === 'fr' ? 'Plans Catalogue' : 'Catalogue CRUD',
      icon: LayoutGrid,
      href: `/admin/catalogues`,
      permission: 'manage_catalogues',
    },
    {
      key: 'team',
      label: locale === 'fr' ? 'Membres de l\'Équipe' : 'Team Members',
      icon: Users,
      href: `/admin/team`,
      permission: 'manage_team',
    },
    {
      key: 'users',
      label: locale === 'fr' ? 'Utilisateurs' : 'Users & Rights',
      icon: ShieldCheck,
      href: `/admin/users`,
      permission: 'manage_users',
    },
  ]

  // Filter items
  const filteredMenuItems = menuItems.filter(
    (item) => !item.permission || permissions.includes(item.permission)
  )

  // Determine current active page key & title
  const activeItem = menuItems.find((item) => pathname.endsWith(item.href))
  const pageTitle = activeItem ? activeItem.label : 'Admin Portal'

  // Route security gate: check if current route requires a permission the user lacks
  const requiresPermission = activeItem?.permission
  const hasPermission = !requiresPermission || permissions.includes(requiresPermission)

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand Header */}
      <Box
        sx={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          px: 3,
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              background: 'linear-gradient(135deg, #F26419, #F6AE2D)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HardHat size={18} color="#fff" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em' }}>
            Safe<Box component="span" sx={{ color: 'primary.main' }}>Admin</Box>
          </Typography>
        </Box>
      </Box>

      {/* Navigation List */}
      <List sx={{ flex: 1, px: 2, py: 3 }}>
        {filteredMenuItems.map((item) => {
          const active = pathname.endsWith(item.href)
          const Icon = item.icon
          return (
            <ListItem key={item.key} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={`/${locale}${item.href}`}
                id={`admin-nav-${item.key}`}
                sx={{
                  borderRadius: 2,
                  py: 1.25,
                  backgroundColor: active ? alpha('#F26419', 0.1) : 'transparent',
                  color: active ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: active ? alpha('#F26419', 0.15) : alpha('#F0F2F5', 0.04),
                    color: active ? 'primary.main' : 'text.primary',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  <Icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontWeight: active ? 700 : 500, fontSize: '0.9rem' } } }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Divider />

      {/* Switcher & Logout Footer */}
      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            component={Link}
            href={`/${locale}`}
            id="admin-nav-public-site"
            sx={{
              borderRadius: 2,
              py: 1.25,
              color: 'text.secondary',
              '&:hover': { backgroundColor: alpha('#F0F2F5', 0.04), color: 'text.primary' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <Globe size={20} />
            </ListItemIcon>
            <ListItemText
              primary={locale === 'fr' ? 'Site Public' : 'Public Website'}
              slotProps={{ primary: { sx: { fontWeight: 500, fontSize: '0.9rem' } } }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            id="admin-nav-logout"
            sx={{
              borderRadius: 2,
              py: 1.25,
              color: 'text.secondary',
              '&:hover': { backgroundColor: alpha('#EF5350', 0.1), color: 'error.main' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <LogOut size={20} />
            </ListItemIcon>
            <ListItemText
              primary={locale === 'fr' ? 'Déconnexion' : 'Logout'}
              slotProps={{ primary: { sx: { fontWeight: 500, fontSize: '0.9rem' } } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* AppBar Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          borderBottom: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
          backgroundColor: alpha('#1E2635', 0.95),
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ height: 72, px: { xs: 2, md: 4 }, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
            >
              <Menu size={24} />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
              {pageTitle}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LanguageSwitcher />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawers */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 3, md: 4 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header spacer */}
        <Toolbar sx={{ height: 72 }} />

        {/* Content body with route authorization checks */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, p: 0, display: 'flex', flexDirection: 'column' }}>
          {hasPermission ? (
            children
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 12,
              }}
            >
              <Card
                sx={{
                  maxWidth: 500,
                  p: 4,
                  textAlign: 'center',
                  border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.25)}`,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: (theme) => alpha(theme.palette.error.main, 0.1),
                      color: 'error.main',
                      mb: 3,
                    }}
                  >
                    <ShieldAlert size={36} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                    {locale === 'fr' ? 'Accès Refusé' : 'Access Denied'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    {locale === 'fr'
                      ? "Vous ne disposez pas des permissions nécessaires pour accéder à ce module d'administration. Veuillez contacter votre administrateur système."
                      : 'You do not have the required permissions to access this administrative module. Please contact your system administrator.'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`/${locale}/admin/dashboard`)}
                    sx={{
                      background: 'linear-gradient(135deg, #F26419 0%, #F6AE2D 100%)',
                    }}
                  >
                    {locale === 'fr' ? 'Retour au Tableau de Bord' : 'Back to Dashboard'}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}
