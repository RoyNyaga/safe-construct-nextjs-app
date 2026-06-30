'use client'

import { Box, Container, Skeleton } from '@mui/material'

export default function RequestDesignLoading() {
  return (
    <Box sx={{ bgcolor: '#0E1420', minHeight: '100vh', pb: 10 }}>
      {/* ── Hero Skeleton ──────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Skeleton variant="text" width={120} height={20} sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" width={380} height={48} sx={{ mx: 'auto', mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" width={500} height={22} sx={{ mx: 'auto', bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Container>
      </Box>

      {/* ── Stepper Skeleton ──────────────────────────────── */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
              <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: 'rgba(255,255,255,0.05)', display: { xs: 'none', sm: 'block' } }} />
            </Box>
          ))}
        </Box>

        {/* ── Form Area Skeleton ──────────────────────────── */}
        <Box
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            bgcolor: '#121824',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Skeleton variant="text" width={240} height={32} sx={{ mb: 1, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" width={360} height={20} sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />

          {/* Form fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Skeleton variant="rounded" width="50%" height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
              <Skeleton variant="rounded" width="50%" height={48} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Box>
            <Skeleton variant="rounded" width="100%" height={100} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Skeleton variant="rounded" width={100} height={42} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Skeleton variant="rounded" width={140} height={42} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
