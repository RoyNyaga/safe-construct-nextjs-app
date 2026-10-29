'use client'

import React from 'react'
import { Box, Typography, Chip, Paper, alpha } from '@mui/material'
import { TrendingUp } from 'lucide-react'

export interface PreMatchStatsItem {
  home_team: string
  away_team: string
  home_league_position?: number | null
  away_league_position?: number | null
  home_matches_played?: number | null
  away_matches_played?: number | null
  home_games_played?: number | null
  away_games_played?: number | null
  home_goals_scored?: number | null
  home_goals_conceded?: number | null
  away_goals_scored?: number | null
  away_goals_conceded?: number | null
  home_goals_per_game?: number | null
  home_conceded_per_game?: number | null
  away_goals_per_game?: number | null
  away_conceded_per_game?: number | null

  // Season-overall statistics (All venues combined)
  home_overall_matches_played?: number | null
  home_overall_goals_scored?: number | null
  home_overall_goals_conceded?: number | null
  home_overall_goals_per_game?: number | null
  home_overall_conceded_per_game?: number | null
  away_overall_matches_played?: number | null
  away_overall_goals_scored?: number | null
  away_overall_goals_conceded?: number | null
  away_overall_goals_per_game?: number | null
  away_overall_conceded_per_game?: number | null
}

interface PreMatchStatsTablesProps {
  item: PreMatchStatsItem
  locale?: string
}

export function PreMatchStatsTables({ item, locale = 'en' }: PreMatchStatsTablesProps) {
  const isFr = locale === 'fr'

  // Venue-specific GD
  const homeGD =
    item.home_goals_scored !== null &&
    item.home_goals_scored !== undefined &&
    item.home_goals_conceded !== null &&
    item.home_goals_conceded !== undefined
      ? Number(item.home_goals_scored) - Number(item.home_goals_conceded)
      : null

  const awayGD =
    item.away_goals_scored !== null &&
    item.away_goals_scored !== undefined &&
    item.away_goals_conceded !== null &&
    item.away_goals_conceded !== undefined
      ? Number(item.away_goals_scored) - Number(item.away_goals_conceded)
      : null

  // Season-overall GD
  const homeOverallGD =
    item.home_overall_goals_scored !== null &&
    item.home_overall_goals_scored !== undefined &&
    item.home_overall_goals_conceded !== null &&
    item.home_overall_goals_conceded !== undefined
      ? Number(item.home_overall_goals_scored) - Number(item.home_overall_goals_conceded)
      : null

  const awayOverallGD =
    item.away_overall_goals_scored !== null &&
    item.away_overall_goals_scored !== undefined &&
    item.away_overall_goals_conceded !== null &&
    item.away_overall_goals_conceded !== undefined
      ? Number(item.away_overall_goals_scored) - Number(item.away_overall_goals_conceded)
      : null

  const hasOverallStats =
    (item.home_overall_matches_played !== undefined && item.home_overall_matches_played !== null) ||
    (item.away_overall_matches_played !== undefined && item.away_overall_matches_played !== null) ||
    (item.home_overall_goals_scored !== undefined && item.home_overall_goals_scored !== null) ||
    (item.away_overall_goals_scored !== undefined && item.away_overall_goals_scored !== null)

  const formatRate = (rate: number | null | undefined): string => {
    if (rate === null || rate === undefined) return '—'
    const n = Number(rate)
    return isNaN(n) ? '—' : n.toFixed(2)
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: alpha('#121824', 0.6),
        border: (theme) => `1px solid ${alpha(theme.palette.divider, 1)}`,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 1.5,
          color: '#F26419',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <TrendingUp size={16} />
        {isFr ? 'Profil & Statistiques Pré-Match' : 'Pre-Match Statistical Matchup'}
      </Typography>

      {/* Block 1: Venue-Specific Form (Direct Poisson Engine Inputs) */}
      <Box sx={{ mb: hasOverallStats ? 2.5 : 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 0.5 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: '#F0F2F5', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' }}
          >
            {isFr ? 'Forme au Lieu (Domicile @ Dom / Extérieur @ Ext)' : 'Venue Form (Home @ Home / Away @ Away)'}
          </Typography>
          <Chip
            size="small"
            label={isFr ? 'Utilisé par le Modèle' : 'Used by Model'}
            sx={{
              height: 20,
              fontSize: '0.625rem',
              fontWeight: 800,
              backgroundColor: alpha('#2E7D32', 0.2),
              color: '#66BB6A',
              border: `1px solid ${alpha('#2E7D32', 0.45)}`,
              borderRadius: 1,
            }}
          />
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.1)' }}>
                <th style={{ padding: '8px 6px', textAlign: 'left', color: '#9AA3B2', fontWeight: 600 }}>Metric</th>
                <th style={{ padding: '8px 6px', textAlign: 'center', color: '#F6AE2D', fontWeight: 700 }}>
                  {item.home_team} (Home)
                </th>
                <th style={{ padding: '8px 6px', textAlign: 'center', color: '#42A5F5', fontWeight: 700 }}>
                  {item.away_team} (Away)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>League Position</td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                  {item.home_league_position !== null && item.home_league_position !== undefined
                    ? `#${item.home_league_position}`
                    : '—'}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                  {item.away_league_position !== null && item.away_league_position !== undefined
                    ? `#${item.away_league_position}`
                    : '—'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Venue Matches Played (MP)</td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                  {item.home_matches_played ?? item.home_games_played ?? '—'}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                  {item.away_matches_played ?? item.away_games_played ?? '—'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Venue Goals Scored (GF)</td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#66BB6A' }}>
                  {item.home_goals_scored ?? '—'}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#66BB6A' }}>
                  {item.away_goals_scored ?? '—'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Venue Goals Conceded (GA)</td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#EF5350' }}>
                  {item.home_goals_conceded ?? '—'}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#EF5350' }}>
                  {item.away_goals_conceded ?? '—'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Venue Goal Difference (GD)</td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                  {homeGD !== null ? `${homeGD > 0 ? '+' : ''}${homeGD}` : '—'}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                  {awayGD !== null ? `${awayGD > 0 ? '+' : ''}${awayGD}` : '—'}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Venue Avg Goals Scored / Match</td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                  {formatRate(item.home_goals_per_game)}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                  {formatRate(item.away_goals_per_game)}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Venue Avg Goals Conceded / Match</td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                  {formatRate(item.home_conceded_per_game)}
                </td>
                <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                  {formatRate(item.away_conceded_per_game)}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>

      {/* Block 2: Season Overall (All Venues Combined) - Rendered only if stats present */}
      {hasOverallStats && (
        <Box sx={{ pt: 1.75, borderTop: '1px solid rgba(240, 242, 245, 0.08)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, px: 0.5 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: '#9AA3B2', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' }}
            >
              {isFr ? 'Général Saison (Tous Terrains)' : 'Season Overall (All Venues)'}
            </Typography>
            <Chip
              size="small"
              label={isFr ? 'Contexte Saison' : 'Season Context'}
              sx={{
                height: 20,
                fontSize: '0.625rem',
                fontWeight: 700,
                backgroundColor: alpha('#90CAF9', 0.12),
                color: '#90CAF9',
                border: `1px solid ${alpha('#90CAF9', 0.25)}`,
                borderRadius: 1,
              }}
            />
          </Box>
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.08)' }}>
                  <th style={{ padding: '8px 6px', textAlign: 'left', color: '#9AA3B2', fontWeight: 600 }}>Metric</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', color: '#F6AE2D', fontWeight: 700 }}>
                    {item.home_team} (Total)
                  </th>
                  <th style={{ padding: '8px 6px', textAlign: 'center', color: '#42A5F5', fontWeight: 700 }}>
                    {item.away_team} (Total)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                  <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Overall Matches Played (MP)</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                    {item.home_overall_matches_played ?? '—'}
                  </td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                    {item.away_overall_matches_played ?? '—'}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                  <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Overall Goals Scored (GF)</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#66BB6A' }}>
                    {item.home_overall_goals_scored ?? '—'}
                  </td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#66BB6A' }}>
                    {item.away_overall_goals_scored ?? '—'}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                  <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Overall Goals Conceded (GA)</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#EF5350' }}>
                    {item.home_overall_goals_conceded ?? '—'}
                  </td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: '#EF5350' }}>
                    {item.away_overall_goals_conceded ?? '—'}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                  <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Overall Goal Difference (GD)</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                    {homeOverallGD !== null ? `${homeOverallGD > 0 ? '+' : ''}${homeOverallGD}` : '—'}
                  </td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 800 }}>
                    {awayOverallGD !== null ? `${awayOverallGD > 0 ? '+' : ''}${awayOverallGD}` : '—'}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(240, 242, 245, 0.05)' }}>
                  <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Overall Avg Goals Scored / Match</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                    {formatRate(item.home_overall_goals_per_game)}
                  </td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                    {formatRate(item.away_overall_goals_per_game)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 6px', color: '#9AA3B2' }}>Overall Avg Goals Conceded / Match</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                    {formatRate(item.home_overall_conceded_per_game)}
                  </td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700 }}>
                    {formatRate(item.away_overall_conceded_per_game)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
export default PreMatchStatsTables

