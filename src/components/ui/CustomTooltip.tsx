'use client'

import { Tooltip, TooltipProps } from '@mui/material'

interface CustomTooltipProps extends TooltipProps {
  /** Override to make content feel richer — wraps the default tooltip */
}

/**
 * CustomTooltip — wraps MUI Tooltip with the app's custom styling already applied.
 * Use this everywhere instead of importing MUI Tooltip directly.
 */
export default function CustomTooltip({ children, ...props }: CustomTooltipProps) {
  return (
    <Tooltip arrow placement="top" enterDelay={300} {...props}>
      {children}
    </Tooltip>
  )
}
