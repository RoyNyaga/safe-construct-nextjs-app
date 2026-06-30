'use client'

import { Box, Container, Grid, Skeleton } from '@mui/material'

export default function ServicesLoading() {
  return (
    <Box sx={{ bgcolor: '#0E1420', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* Title */}
        <Skeleton variant="text" width={250} height={50} sx={{ mb: 6, bgcolor: 'rgba(255,255,255,0.05)' }} />

        {/* Services rows/grid */}
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: '#121824',
                }}
              >
                <Skeleton variant="circular" width={48} height={48} sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="90%" height={20} sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="40%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
