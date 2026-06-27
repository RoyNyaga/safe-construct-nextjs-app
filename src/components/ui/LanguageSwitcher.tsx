'use client'

import { useState } from 'react'
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
} from '@mui/material'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

const locales = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
] as const

/**
 * LanguageSwitcher — dropdown to switch between EN and FR locales.
 * Updates the URL prefix while keeping the rest of the path intact.
 */
export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const current = locales.find((l) => l.code === locale) ?? locales[0]

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget)
  const handleClose = () => setAnchor(null)

  const handleSwitch = (targetLocale: string) => {
    // Replace the current locale prefix in the pathname
    const segments = pathname.split('/')
    segments[1] = targetLocale // segments[0] is always '' (leading slash)
    router.push(segments.join('/'))
    handleClose()
  }

  return (
    <>
      <Button
        id="language-switcher-btn"
        onClick={handleOpen}
        variant="text"
        size="small"
        startIcon={<Globe size={16} />}
        endIcon={<ChevronDown size={14} />}
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          '& .MuiButton-startIcon': {
            display: { xs: 'none', sm: 'inline-flex' },
          },
          '& .MuiButton-endIcon': {
            display: { xs: 'none', sm: 'inline-flex' },
          },
          px: { xs: 1, sm: 1.5 },
          minWidth: { xs: 'auto', sm: 64 },
          '&:hover': {
            color: 'text.primary',
            backgroundColor: (t) => alpha(t.palette.primary.main, 0.08),
          },
        }}
        aria-label="Switch language"
        aria-haspopup="true"
        aria-expanded={Boolean(anchor)}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {current.flag}&nbsp;{current.code.toUpperCase()}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        id="language-menu"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              minWidth: 160,
              mt: 0.5,
              border: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
            },
          },
          list: { 'aria-labelledby': 'language-switcher-btn' },
        }}
      >
        {locales.map((loc) => (
          <MenuItem
            key={loc.code}
            id={`lang-option-${loc.code}`}
            selected={loc.code === locale}
            onClick={() => handleSwitch(loc.code)}
            sx={{ borderRadius: 1, mx: 0.5, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 32, fontSize: '1.1rem' }}>
              {loc.flag}
            </ListItemIcon>
            <ListItemText primary={loc.label} />
            {loc.code === locale && (
              <Check size={14} style={{ marginLeft: 8, opacity: 0.7 }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
