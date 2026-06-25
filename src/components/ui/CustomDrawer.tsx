'use client'

import {
  Drawer,
  DrawerProps,
  IconButton,
  Box,
  Typography,
  Divider,
} from '@mui/material'
import { X } from 'lucide-react'

interface CustomDrawerProps extends Omit<DrawerProps, 'title'> {
  title?: React.ReactNode
  onClose: () => void
  width?: number | string
  children: React.ReactNode
}

/**
 * CustomDrawer — wraps MUI Drawer with a standardised header bar.
 * Use this for all side panels and navigation drawers in the app.
 */
export default function CustomDrawer({
  title,
  onClose,
  width = 320,
  children,
  ...props
}: CustomDrawerProps) {
  return (
    <Drawer onClose={onClose} {...props}>
      <Box sx={{ width, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 2,
          }}
        >
          {title && (
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
          )}
          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Close drawer"
            id="drawer-close-btn"
            sx={{ ml: 'auto', color: 'text.secondary' }}
          >
            <X size={20} />
          </IconButton>
        </Box>
        <Divider />

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2.5 }}>
          {children}
        </Box>
      </Box>
    </Drawer>
  )
}
