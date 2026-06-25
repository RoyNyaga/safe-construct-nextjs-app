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
  options: NotificationOptions
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
 * Usage: control via the `options` prop. Call `onClose` to dismiss.
 */
export default function CustomNotification({
  options,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  ...props
}: CustomNotificationProps) {
  const { open, message, severity = 'success', autoHideDuration = 4000 } = options

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
