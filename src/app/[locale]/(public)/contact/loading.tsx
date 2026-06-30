'use client'

import { Box, Container, Grid, Skeleton } from '@mui/material'

export default function ContactLoading() {
  return (
    <Box sx={{ bgcolor: '#0E1420', minHeight: '100vh', pb: 10 }}>
      {/* ── Hero Skeleton ──────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 10, md: 16 },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Skeleton variant="text" width={100} height={20} sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" width={280} height={48} sx={{ mx: 'auto', mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" width={450} height={22} sx={{ mx: 'auto', bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Container>
      </Box>

      {/* ── Form + Info Grid Skeleton ─────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={5}>
          {/* Form Column */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ p: 4, borderRadius: 4, bgcolor: '#121824', border: '1px solid', borderColor: 'divider' }}>
              <Skeleton variant="text" width={200} height={32} sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Skeleton variant="rounded" width="100%" height={120} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Grid>
              </Grid>
              <Skeleton variant="rounded" width={160} height={44} sx={{ mt: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Box>
          </Grid>

          {/* Info Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: '#121824',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                  }}
                >
                  <Skeleton variant="circular" width={44} height={44} sx={{ flexShrink: 0, bgcolor: 'rgba(255,255,255,0.05)' }} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="40%" height={18} sx={{ mb: 0.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
                    <Skeleton variant="text" width="70%" height={22} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* ── FAQ Skeleton ──────────────────────────────────── */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Skeleton variant="text" width={240} height={36} sx={{ mx: 'auto', mb: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width="100%"
            height={56}
            sx={{ mb: 1.5, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}
          />
        ))}
      </Container>
    </Box>
  )
}
