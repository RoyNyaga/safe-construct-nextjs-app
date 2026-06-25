'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import { X } from 'lucide-react'

interface CustomModalProps extends Omit<DialogProps, 'title'> {
  title?: React.ReactNode
  actions?: React.ReactNode
  onClose: () => void
  children: React.ReactNode
}

/**
 * CustomModal — wraps MUI Dialog with a branded header and optional action bar.
 * Use this as the standard modal/dialog throughout the app.
 */
export default function CustomModal({
  title,
  actions,
  onClose,
  children,
  ...props
}: CustomModalProps) {
  return (
    <Dialog onClose={onClose} {...props}>
      {/* Header */}
      <DialogTitle
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box>
          {title && (
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
          )}
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close modal"
          id="modal-close-btn"
          sx={{ color: 'text.secondary', ml: 2 }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      {/* Body */}
      <DialogContent>{children}</DialogContent>

      {/* Footer actions */}
      {actions && <DialogActions sx={{ px: 3, pb: 2.5 }}>{actions}</DialogActions>}
    </Dialog>
  )
}
