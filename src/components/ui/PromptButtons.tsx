'use client'

import { useState } from 'react'
import {
  Button,
  ButtonProps,
  Popover,
  Box,
  Typography,
  alpha,
} from '@mui/material'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { LoadingButton } from './CustomButton'

// ─── ActionPromptButton ───────────────────────────────────────────────────────

interface ActionPromptButtonProps extends Omit<ButtonProps, 'onClick'> {
  id: string
  confirmLabel?: string
  cancelLabel?: string
  promptMessage?: string
  loading?: boolean
  onConfirm: () => void | Promise<void>
}

/**
 * ActionPromptButton — shows a popover confirmation before triggering an action.
 * Use for significant, potentially irreversible actions (not deletions — use DeletePromptButton).
 */
export function ActionPromptButton({
  id,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  promptMessage = 'Are you sure you want to proceed?',
  loading = false,
  onConfirm,
  ...props
}: ActionPromptButtonProps) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget)
  }
  const handleClose = () => setAnchor(null)
  const handleConfirm = async () => {
    await onConfirm()
    handleClose()
  }

  return (
    <>
      <Button id={id} onClick={handleOpen} {...props}>
        {children}
      </Button>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              p: 2.5,
              borderRadius: 3,
              maxWidth: 280,
              border: (t) => `1px solid ${alpha(t.palette.warning.main, 0.3)}`,
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2, alignItems: 'flex-start' }}>
          <AlertTriangle size={20} color="#F6AE2D" style={{ flexShrink: 0, marginTop: 2 }} />
          <Typography variant="body2" color="text.secondary">
            {promptMessage}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button size="small" variant="text" onClick={handleClose} id={`${id}-cancel`}>
            {cancelLabel}
          </Button>
          <LoadingButton
            size="small"
            variant="contained"
            loading={loading}
            onClick={handleConfirm}
            id={`${id}-confirm`}
          >
            {confirmLabel}
          </LoadingButton>
        </Box>
      </Popover>
    </>
  )
}

// ─── DeletePromptButton ───────────────────────────────────────────────────────

interface DeletePromptButtonProps extends Omit<ButtonProps, 'onClick'> {
  id: string
  itemName?: string
  loading?: boolean
  onDelete: () => void | Promise<void>
}

/**
 * DeletePromptButton — specialised confirmation button for destructive deletions.
 * Shows a red-accented popover with the item name.
 */
export function DeletePromptButton({
  id,
  children,
  itemName,
  loading = false,
  onDelete,
  ...props
}: DeletePromptButtonProps) {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget)
  const handleClose = () => setAnchor(null)
  const handleDelete = async () => {
    await onDelete()
    handleClose()
  }

  return (
    <>
      <Button
        id={id}
        onClick={handleOpen}
        color="error"
        startIcon={<Trash2 size={16} />}
        {...props}
      >
        {children ?? 'Delete'}
      </Button>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              p: 2.5,
              borderRadius: 3,
              maxWidth: 280,
              border: (t) => `1px solid ${alpha(t.palette.error.main, 0.3)}`,
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2, alignItems: 'flex-start' }}>
          <Trash2 size={20} color="#EF5350" style={{ flexShrink: 0, marginTop: 2 }} />
          <Typography variant="body2" color="text.secondary">
            {itemName
              ? `Delete "${itemName}"? This action cannot be undone.`
              : 'This action cannot be undone.'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button size="small" variant="text" onClick={handleClose} id={`${id}-cancel`}>
            Cancel
          </Button>
          <LoadingButton
            size="small"
            variant="contained"
            color="error"
            loading={loading}
            onClick={handleDelete}
            id={`${id}-confirm-delete`}
          >
            Delete
          </LoadingButton>
        </Box>
      </Popover>
    </>
  )
}
