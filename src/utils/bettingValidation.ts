/**
 * Betting Validation Utilities
 *
 * Provides soft validation for venue-specific vs overall team stats parity
 * and detection of potential sample-distortion regressions.
 */

export interface VenueStatsMismatchResult {
  hasMismatch: boolean
  issues: string[]
  description: string
  evidence: string
}

export function checkVenueStatsMismatch(item: {
  home_team?: string | null
  away_team?: string | null
  home_matches_played?: number | null
  home_games_played?: number | null
  home_goals_scored?: number | null
  home_goals_conceded?: number | null
  home_goals_per_game?: number | null
  home_conceded_per_game?: number | null
  away_matches_played?: number | null
  away_games_played?: number | null
  away_goals_scored?: number | null
  away_goals_conceded?: number | null
  away_goals_per_game?: number | null
  away_conceded_per_game?: number | null
}): VenueStatsMismatchResult | null {
  const issues: string[] = []

  const parseNum = (v: any): number | null => {
    if (v === null || v === undefined || v === '') return null
    const n = Number(v)
    return isNaN(n) ? null : n
  }

  const homeTeam = item.home_team || 'Home Team'
  const awayTeam = item.away_team || 'Away Team'

  // 1. Home Team (at Home Venue)
  const hMp = parseNum(item.home_matches_played ?? item.home_games_played)
  const hGs = parseNum(item.home_goals_scored)
  const hGc = parseNum(item.home_goals_conceded)
  const hGpg = parseNum(item.home_goals_per_game)
  const hCpg = parseNum(item.home_conceded_per_game)

  if (hMp && hMp > 0) {
    if (hGs !== null && hGpg !== null) {
      const calc = hGs / hMp
      if (Math.abs(calc - hGpg) > 0.05) {
        issues.push(
          `${homeTeam} (Home): ${hGs} GF / ${hMp} MP = ${calc.toFixed(2)} ≠ ${hGpg.toFixed(2)} goals/game (diff: ${(calc - hGpg).toFixed(2)})`
        )
      }
    }
    if (hGc !== null && hCpg !== null) {
      const calc = hGc / hMp
      if (Math.abs(calc - hCpg) > 0.05) {
        issues.push(
          `${homeTeam} (Home): ${hGc} GA / ${hMp} MP = ${calc.toFixed(2)} ≠ ${hCpg.toFixed(2)} conceded/game (diff: ${(calc - hCpg).toFixed(2)})`
        )
      }
    }
  }

  // 2. Away Team (at Away Venue)
  const aMp = parseNum(item.away_matches_played ?? item.away_games_played)
  const aGs = parseNum(item.away_goals_scored)
  const aGc = parseNum(item.away_goals_conceded)
  const aGpg = parseNum(item.away_goals_per_game)
  const aCpg = parseNum(item.away_conceded_per_game)

  if (aMp && aMp > 0) {
    if (aGs !== null && aGpg !== null) {
      const calc = aGs / aMp
      if (Math.abs(calc - aGpg) > 0.05) {
        issues.push(
          `${awayTeam} (Away): ${aGs} GF / ${aMp} MP = ${calc.toFixed(2)} ≠ ${aGpg.toFixed(2)} goals/game (diff: ${(calc - aGpg).toFixed(2)})`
        )
      }
    }
    if (aGc !== null && aCpg !== null) {
      const calc = aGc / aMp
      if (Math.abs(calc - aCpg) > 0.05) {
        issues.push(
          `${awayTeam} (Away): ${aGc} GA / ${aMp} MP = ${calc.toFixed(2)} ≠ ${aCpg.toFixed(2)} conceded/game (diff: ${(calc - aCpg).toFixed(2)})`
        )
      }
    }
  }

  if (issues.length === 0) return null

  return {
    hasMismatch: true,
    issues,
    description: `Venue stats mismatch: Recorded venue goals ÷ matches played deviates from the per-game rate by > 0.05. Check if season-overall aggregates were erroneously placed in venue fields.`,
    evidence: issues.join('; '),
  }
}

