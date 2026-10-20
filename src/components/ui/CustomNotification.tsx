'use client'

import { Snackbar, Alert, AlertColor, SnackbarProps } from '@mui/material'
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export interface NotificationOptions {
  open: boolean
  message: string
  severity?: AlertColor
  autoHideDuration?: number
}

interface CustomNotificationProps extends Omit<SnackbarProps, 'open'> {
  options?: NotificationOptions
  open?: boolean
  message?: string
  severity?: AlertColor
  type?: AlertColor
  autoHideDuration?: number
  onClose: () => void
}

const severityIcons: Record<AlertColor, React.ReactNode> = {
  success: <CheckCircle size={18} />,
  error: <AlertCircle size={18} />,
  info: <Info size={18} />,
  warning: <AlertTriangle size={18} />,
}

/**
 * CustomNotification — wraps MUI Snackbar + Alert to provide toast notifications.
 * Usage: control via either the `options` prop or flat props (`open`, `message`, `severity` / `type`).
 * Call `onClose` to dismiss.
 */
export default function CustomNotification({
  options,
  open: flatOpen,
  message: flatMessage,
  severity: flatSeverity,
  type: flatType,
  autoHideDuration: flatDuration,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  ...props
}: CustomNotificationProps) {
  const open = options?.open ?? flatOpen ?? false
  const message = options?.message ?? flatMessage ?? ''
  const severity: AlertColor = options?.severity ?? flatSeverity ?? flatType ?? 'success'
  const autoHideDuration = options?.autoHideDuration ?? flatDuration ?? 4000

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      {...props}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        icon={severityIcons[severity]}
        variant="filled"
        sx={{
          borderRadius: 3,
          fontWeight: 500,
          minWidth: 280,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
