'use client'

import { Box, Container, Skeleton } from '@mui/material'

export default function BlogDetailLoading() {
  return (
    <Box sx={{ bgcolor: '#0E1420', minHeight: '100vh', pb: 10 }}>
      {/* Photo header skeleton */}
      <Skeleton variant="rectangular" width="100%" height={400} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />

      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Title */}
        <Skeleton variant="text" width="90%" height={60} sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />
        
        {/* Meta (author, date) */}
        <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Skeleton variant="text" width={80} height={16} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          </Box>
        </Box>

        {/* Content body */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Skeleton key={i} variant="text" width={`${Math.floor(Math.random() * 25) + 75}%`} height={22} sx={{ mb: 1.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
        ))}
      </Container>
    </Box>
  )
}
