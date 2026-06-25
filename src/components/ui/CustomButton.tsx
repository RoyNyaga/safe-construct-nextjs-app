'use client'

import {
  Button,
  ButtonProps,
  CircularProgress,
  Box,
} from '@mui/material'
import { forwardRef } from 'react'

// ─── CustomButton ────────────────────────────────────────────────────────────

interface CustomButtonProps extends ButtonProps {
  id: string // required for testability
}

/**
 * CustomButton — standard branded button.
 * Always requires an `id` for accessibility and testing.
 */
export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  function CustomButton({ children, sx, ...props }, ref) {
    return (
      <Button ref={ref} sx={sx} {...props}>
        {children}
      </Button>
    )
  }
)

CustomButton.displayName = 'CustomButton'

// ─── LoadingButton ────────────────────────────────────────────────────────────

interface LoadingButtonProps extends CustomButtonProps {
  loading?: boolean
  loadingText?: string
}

/**
 * LoadingButton — CustomButton with an inline spinner overlay.
 * Disables interaction while loading = true.
 */
export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  function LoadingButton({ loading = false, loadingText, children, disabled, sx, ...props }, ref) {
    return (
      <Button
        ref={ref}
        disabled={loading || disabled}
        sx={{
          position: 'relative',
          minWidth: 120,
          ...sx,
        }}
        {...props}
      >
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={16} color="inherit" thickness={4} />
            {loadingText ?? children}
          </Box>
        ) : (
          children
        )}
      </Button>
    )
  }
)

LoadingButton.displayName = 'LoadingButton'
