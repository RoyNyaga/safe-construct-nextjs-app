'use client'

import { Box, Container, Grid, Skeleton, alpha } from '@mui/material'

export default function CatalogueLoading() {
  return (
    <Box sx={{ bgcolor: '#0E1420', minHeight: '100vh', pb: 10 }}>
      {/* ── Hero Skeleton ──────────────────────────────────── */}
      <Box
        sx={{
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Skeleton variant="text" width={100} height={20} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" width={300} height={60} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Container>
      </Box>

      {/* ── Filter Bar Skeleton ─────────────────────────────── */}
      <Box
        sx={{
          py: 2.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: alpha('#121824', 0.9),
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rounded" width={130} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            ))}
            <Skeleton variant="rounded" width={150} height={40} sx={{ ml: 'auto', bgcolor: 'rgba(255,255,255,0.05)' }} />
          </Box>
        </Container>
      </Box>

      {/* ── Cards Grid Skeleton ─────────────────────────────── */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Box
                sx={{
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider',
                  overflow: 'hidden',
                  bgcolor: '#121824',
                }}
              >
                {/* Image Placeholder */}
                <Skeleton variant="rectangular" width="100%" height={240} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />

                {/* Content Placeholder */}
                <Box sx={{ p: 2.5 }}>
                  <Skeleton variant="text" width="80%" height={28} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
                  {/* Specs Row */}
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} variant="rounded" width={60} height={20} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                    ))}
                  </Box>
                  <Skeleton variant="rounded" width="100%" height={36} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
