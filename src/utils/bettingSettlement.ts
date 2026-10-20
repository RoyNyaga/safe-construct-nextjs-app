import { SelectionResultStatus, TicketStatus } from '@/types/betting'

/**
 * Automatically settles common betting markets based on final match scores.
 * Returns null if the market or selection format is not recognized, in which
 * case manual entry is preserved.
 */
export function autoSettleSelection(
  market: string,
  selection: string,
  homeScore: number | null | undefined,
  awayScore: number | null | undefined
): SelectionResultStatus | null {
  if (homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined) {
    return 'pending'
  }

  const cleanMarket = market.trim().toLowerCase()
  const cleanSel = selection.trim().toLowerCase()
  const totalGoals = homeScore + awayScore

  // ─── OVER / UNDER MARKETS ──────────────────────────────────────────────────
  if (cleanMarket.includes('over') || cleanMarket.includes('under') || cleanMarket.includes('goal') || cleanSel.startsWith('over') || cleanSel.startsWith('under')) {
    // Check Over X.5
    const overMatch = cleanSel.match(/over\s*([0-9]+(?:\.[0-9]+)?)/i)
    if (overMatch) {
      const threshold = parseFloat(overMatch[1])
      return totalGoals > threshold ? 'won' : 'lost'
    }

    // Check Under X.5
    const underMatch = cleanSel.match(/under\s*([0-9]+(?:\.[0-9]+)?)/i)
    if (underMatch) {
      const threshold = parseFloat(underMatch[1])
      return totalGoals < threshold ? 'won' : 'lost'
    }
  }

  // ─── BOTH TEAMS TO SCORE (BTTS) ────────────────────────────────────────────
  if (cleanMarket.includes('btts') || cleanMarket.includes('both teams') || cleanSel.includes('btts')) {
    const bothScored = homeScore > 0 && awayScore > 0
    if (cleanSel.includes('yes') || cleanSel === 'btts') {
      return bothScored ? 'won' : 'lost'
    }
    if (cleanSel.includes('no')) {
      return !bothScored ? 'won' : 'lost'
    }
  }

  // ─── 1X2 / MATCH RESULT ────────────────────────────────────────────────────
  if (cleanMarket.includes('1x2') || cleanMarket.includes('match result') || cleanMarket.includes('winner') || cleanMarket === 'result') {
    const isHomeWin = homeScore > awayScore
    const isAwayWin = awayScore > homeScore
    const isDraw = homeScore === awayScore

    if (cleanSel === '1' || cleanSel.includes('home win') || cleanSel.includes('home')) {
      return isHomeWin ? 'won' : 'lost'
    }
    if (cleanSel === '2' || cleanSel.includes('away win') || cleanSel.includes('away')) {
      return isAwayWin ? 'won' : 'lost'
    }
    if (cleanSel === 'x' || cleanSel.includes('draw')) {
      return isDraw ? 'won' : 'lost'
    }
  }

  // ─── DOUBLE CHANCE ─────────────────────────────────────────────────────────
  if (cleanMarket.includes('double chance') || cleanSel === '1x' || cleanSel === 'x2' || cleanSel === '12') {
    const isHomeWin = homeScore > awayScore
    const isAwayWin = awayScore > homeScore
    const isDraw = homeScore === awayScore

    if (cleanSel === '1x' || cleanSel.includes('1x') || cleanSel.includes('home or draw')) {
      return (isHomeWin || isDraw) ? 'won' : 'lost'
    }
    if (cleanSel === 'x2' || cleanSel.includes('x2') || cleanSel.includes('draw or away')) {
      return (isAwayWin || isDraw) ? 'won' : 'lost'
    }
    if (cleanSel === '12' || cleanSel.includes('12') || cleanSel.includes('home or away')) {
      return (isHomeWin || isAwayWin) ? 'won' : 'lost'
    }
  }

  return null
}

/**
 * Calculates overall ticket status based on its selections.
 */
export function calculateTicketStatus(
  selections: Array<{ result: SelectionResultStatus }>
): TicketStatus {
  if (!selections || selections.length === 0) return 'pending'

  // If any leg lost, ticket is lost
  if (selections.some((s) => s.result === 'lost')) {
    return 'lost'
  }

  // If any leg still pending, ticket is pending
  if (selections.some((s) => s.result === 'pending')) {
    return 'pending'
  }

  // If all legs are void, ticket is void
  if (selections.every((s) => s.result === 'void')) {
    return 'void'
  }

  // If remaining non-void legs are won, ticket is won
  if (selections.every((s) => s.result === 'won' || s.result === 'void')) {
    return 'won'
  }

  return 'pending'
}

/**
 * Computes profit/loss for a ticket.
 */
export function calculateProfitLoss(
  status: TicketStatus,
  stake: number,
  combinedOdds: number | null,
  selections?: Array<{ odds: number | null; result: SelectionResultStatus }>
): number {
  if (status === 'pending') return 0
  if (status === 'lost') return -Math.abs(stake)
  if (status === 'void') return 0

  if (status === 'won') {
    // If some legs were voided, compute effective combined odds
    let effectiveOdds = combinedOdds || 1
    if (selections && selections.length > 0) {
      effectiveOdds = selections.reduce((acc, sel) => {
        if (sel.result === 'won' && sel.odds && sel.odds > 0) {
          return acc * sel.odds
        }
        return acc
      }, 1)
    }

    const totalReturn = stake * effectiveOdds
    return Number((totalReturn - stake).toFixed(2))
  }

  return 0
}
