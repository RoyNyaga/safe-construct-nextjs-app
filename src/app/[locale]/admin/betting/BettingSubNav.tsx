'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Box, Paper, Typography, Chip, alpha } from '@mui/material'
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  FileCode2,
  Cpu,
  BarChart3,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { CustomTooltip } from '@/components/ui'
import { formatCurrency } from '@/utils/bettingCurrency'

interface BettingSubNavProps {
  locale: string
  currentBalance?: number
  currency?: string
}

export default function BettingSubNav({
  locale,
  currentBalance,
  currency = 'FCFA',
}: BettingSubNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      label: locale === 'fr' ? 'Aperçu' : 'Overview',
      icon: LayoutDashboard,
      href: `/${locale}/admin/betting`,
      exact: true,
    },
    {
      label: locale === 'fr' ? 'Solde & Transactions' : 'Balance & Ledger',
      icon: Wallet,
      href: `/${locale}/admin/betting/balance`,
    },
    {
      label: locale === 'fr' ? 'Tickets' : 'Tickets',
      icon: Receipt,
      href: `/${locale}/admin/betting/tickets`,
    },
    {
      label: locale === 'fr' ? 'Importer JSON' : 'Import Ticket',
      icon: FileCode2,
      href: `/${locale}/admin/betting/import`,
    },
    {
      label: locale === 'fr' ? 'Modèles' : 'Models',
      icon: Cpu,
      href: `/${locale}/admin/betting/models`,
    },
    {
      label: locale === 'fr' ? 'Statistiques' : 'Statistics',
      icon: BarChart3,
      href: `/${locale}/admin/betting/statistics`,
    },
  ]

  const formattedBalance =
    currentBalance !== undefined
      ? formatCurrency(currentBalance, currency)
      : null

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 4,
        p: 1,
        borderRadius: 3,
        backgroundColor: alpha('#1E2635', 0.8),
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
      }}
    >
      {/* Sub Nav Links */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Box
              key={item.href}
              component={Link}
              href={item.href}
              sx={{
                textDecoration: 'none',
              }}
            >
              <Box
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#FFFFFF' : 'text.secondary',
                  backgroundColor: isActive
                    ? alpha('#F26419', 0.2)
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(242, 100, 25, 0.4)'
                    : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#FFFFFF',
                    backgroundColor: isActive
                      ? alpha('#F26419', 0.25)
                      : alpha('#F0F2F5', 0.05),
                  },
                }}
              >
                <Icon size={17} color={isActive ? '#F26419' : 'currentColor'} />
                <span>{item.label}</span>
              </Box>
            </Box>
          )
        })}
      </Box>

      {/* Live Bankroll Indicator Pill */}
      {formattedBalance !== null && (
        <CustomTooltip title="Current active bankroll. Click to manage deposits & view ledger.">
          <Box
            component={Link}
            href={`/${locale}/admin/betting/balance`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2,
              py: 0.75,
              borderRadius: 2.5,
              backgroundColor: alpha('#66BB6A', 0.12),
              border: `1px solid ${alpha('#66BB6A', 0.3)}`,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: alpha('#66BB6A', 0.2),
                borderColor: '#66BB6A',
              },
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#66BB6A',
                boxShadow: '0 0 8px #66BB6A',
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              {locale === 'fr' ? 'Solde' : 'Bankroll'}:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#66BB6A' }}>
              {formattedBalance}
            </Typography>
            <ArrowUpRight size={14} color="#66BB6A" />
          </Box>
        </CustomTooltip>
      )}
    </Paper>
  )
}
