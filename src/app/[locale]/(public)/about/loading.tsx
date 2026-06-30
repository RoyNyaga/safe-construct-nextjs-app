'use client'

import { Box, Container, Grid, Skeleton } from '@mui/material'

export default function AboutLoading() {
  return (
    <Box sx={{ bgcolor: '#0E1420', minHeight: '100vh', pb: 10 }}>
      {/* ── Hero Skeleton ──────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 14, md: 22 },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Skeleton variant="text" width={120} height={20} sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" width={400} height={56} sx={{ mx: 'auto', mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" width={500} height={24} sx={{ mx: 'auto', mb: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Container>
      </Box>

      {/* ── Values Section Skeleton ───────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mx: 'auto', mb: 6, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid key={i} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: '#121824',
                  textAlign: 'center',
                }}
              >
                <Skeleton variant="circular" width={56} height={56} sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="50%" height={28} sx={{ mx: 'auto', mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="80%" height={18} sx={{ mx: 'auto', bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="70%" height={18} sx={{ mx: 'auto', bgcolor: 'rgba(255,255,255,0.05)' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── Timeline Skeleton ─────────────────────────────── */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Skeleton variant="text" width={180} height={36} sx={{ mx: 'auto', mb: 5, bgcolor: 'rgba(255,255,255,0.05)' }} />
        {[1, 2, 3, 4].map((i) => (
          <Box key={i} sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'flex-start' }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.05)', flexShrink: 0 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={24} sx={{ mb: 0.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
              <Skeleton variant="text" width="80%" height={18} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Box>
          </Box>
        ))}
      </Container>

      {/* ── Team Section Skeleton ─────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Skeleton variant="text" width={220} height={40} sx={{ mx: 'auto', mb: 6, bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {[1, 2, 3].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box sx={{ textAlign: 'center', p: 3, borderRadius: 4, bgcolor: '#121824', border: '1px solid', borderColor: 'divider' }}>
                <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto', mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="40%" height={18} sx={{ mx: 'auto', bgcolor: 'rgba(255,255,255,0.05)' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
