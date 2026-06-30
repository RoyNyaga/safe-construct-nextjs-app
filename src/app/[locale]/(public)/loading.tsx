'use client'

import { Box, CircularProgress } from '@mui/material'

export default function PublicGlobalLoading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#0E1420',
      }}
    >
      <CircularProgress
        size={48}
        sx={{
          color: '#F26419',
          animationDuration: '750ms',
        }}
      />
    </Box>
  )
}
