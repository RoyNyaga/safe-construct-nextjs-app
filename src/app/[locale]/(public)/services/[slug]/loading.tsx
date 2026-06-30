'use client'

import { Box, Container, Skeleton } from '@mui/material'

export default function ServiceDetailLoading() {
  return (
    <Box sx={{ bgcolor: '#0E1420', minHeight: '100vh', pb: 10 }}>
      {/* Header banner */}
      <Skeleton variant="rectangular" width="100%" height={300} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Skeleton variant="text" width="70%" height={50} sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />
      </Container>
    </Box>
  )
}
