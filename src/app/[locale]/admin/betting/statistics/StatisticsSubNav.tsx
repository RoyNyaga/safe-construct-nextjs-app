'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Box, Paper, Typography, alpha } from '@mui/material'
import { BarChart3, ShieldCheck, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatisticsSubNavProps {
  locale: string
  totalCompetitions?: number
}

export default function StatisticsSubNav({
  locale,
  totalCompetitions,
}: StatisticsSubNavProps) {
  const pathname = usePathname()

  const tabs = [
    {
      label: locale === 'fr' ? 'Vue d\'ensemble & Calibration' : 'Overview & Calibration',
      icon: BarChart3,
      href: `/${locale}/admin/betting/statistics`,
      exact: true,
      description: locale === 'fr' ? 'Courbes de calibration et ROI' : 'Calibration curves & ROI',
    },
    {
      label: locale === 'fr' ? 'Intégrité Ligues & Marchés' : 'League Market Integrity',
      icon: ShieldCheck,
      href: `/${locale}/admin/betting/statistics/league-integrity`,
      exact: false,
      badge: totalCompetitions ? `${totalCompetitions}` : undefined,
      description: locale === 'fr' ? 'Matrice de risque (Ligue x Marché)' : 'Risk Matrix (League x Market)',
    },
  ]

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3.5,
        p: 0.75,
        borderRadius: 2.5,
        backgroundColor: alpha('#151B26', 0.85),
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        flexWrap: 'wrap',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.exact
          ? pathname === tab.href
          : pathname.startsWith(tab.href)

        const Icon = tab.icon

        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{ textDecoration: 'none' }}
          >
            <Box
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 2.25,
                py: 1,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: isActive
                  ? alpha('#2563EB', 0.16)
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(59, 130, 246, 0.35)'
                  : '1px solid transparent',
                color: isActive ? '#60A5FA' : 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  backgroundColor: isActive
                    ? alpha('#2563EB', 0.22)
                    : alpha('#FFFFFF', 0.05),
                  color: isActive ? '#93C5FD' : '#FFFFFF',
                },
              }}
            >
              <Icon
                size={18}
                style={{
                  color: isActive ? '#60A5FA' : 'inherit',
                  transition: 'color 0.2s ease',
                }}
              />
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}
                >
                  {tab.label}
                </Typography>
              </Box>

              {tab.badge && (
                <Box
                  sx={{
                    ml: 0.5,
                    px: 0.9,
                    py: 0.1,
                    borderRadius: 10,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    backgroundColor: isActive
                      ? alpha('#60A5FA', 0.25)
                      : alpha('#FFFFFF', 0.08),
                    color: isActive ? '#93C5FD' : 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {tab.badge}
                </Box>
              )}
            </Box>
          </Link>
        )
      })}
    </Paper>
  )
}

