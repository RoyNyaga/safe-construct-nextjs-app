'use client'

import { Box, Container, Grid, Skeleton, alpha } from '@mui/material'

export default function CatalogueDetailLoading() {
  return (
    <Box sx={{ bgcolor: '#0E1420', minHeight: '100vh', pb: 10 }}>
      {/* ── Hero Area Skeleton ──────────────────────────────── */}
      <Box sx={{ position: 'relative', height: { xs: '55vw', md: '60vh' }, bgcolor: '#0E1420', overflow: 'hidden' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
        
        {/* Back button placeholder */}
        <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
          <Skeleton variant="rounded" width={140} height={36} sx={{ bgcolor: 'rgba(0,0,0,0.3)' }} />
        </Box>
      </Box>

      {/* ── Details Skeleton ────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6}>
          {/* Left Info Column */}
          <Grid size={{ xs: 12, md: 7 }}>
            {/* Badges */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Skeleton variant="rounded" width={80} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
              <Skeleton variant="rounded" width={100} height={24} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Box>

            {/* Title */}
            <Skeleton variant="text" width="90%" height={60} sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />

            {/* Description Paragraphs */}
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />

            {/* Specs Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: { xs: 1, sm: 2 }, mb: 4 }}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="rounded" height={80} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
              ))}
            </Box>

            {/* CTA buttons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, flexWrap: 'wrap' }}>
              <Skeleton variant="rounded" width={180} height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
              <Skeleton variant="rounded" width={150} height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Box>
          </Grid>

          {/* Right Estimate Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                p: 3.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: alpha('#fff', 0.05),
                bgcolor: '#121824',
              }}
            >
              <Skeleton variant="text" width="60%" height={32} sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.05)' }} />
              
              {/* Cost Rows */}
              {[1, 2, 3, 4, 5].map((i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Skeleton variant="text" width="40%" height={20} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                  <Skeleton variant="text" width="30%" height={20} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                </Box>
              ))}

              <Skeleton variant="rectangular" width="100%" height={2} sx={{ my: 2.5, bgcolor: 'rgba(255,255,255,0.05)' }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="text" width="40%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
                <Skeleton variant="text" width="35%" height={24} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
