'use client'

import { Box, Container, Grid, Skeleton } from '@mui/material'

export default function BlogListingLoading() {
  return (
    <Box sx={{ bgcolor: '#0E1420', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* Header Title */}
        <Skeleton variant="text" width={250} height={50} sx={{ mb: 6, bgcolor: 'rgba(255,255,255,0.05)' }} />

        {/* Grid of blog posts */}
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((i) => (
            <Grid key={i} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: '#121824',
                  overflow: 'hidden',
                }}
              >
                {/* Photo */}
                <Skeleton variant="rectangular" width="100%" height={240} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                
                {/* Content */}
                <Box sx={{ p: 3 }}>
                  <Skeleton variant="text" width="90%" height={32} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
                  <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
                  <Skeleton variant="text" width="60%" height={20} sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />
                  <Skeleton variant="rounded" width={100} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
