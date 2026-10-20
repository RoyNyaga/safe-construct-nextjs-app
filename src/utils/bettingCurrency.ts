/**
 * Utility functions for formatting and handling currency across the betting tracker subsystem.
 * Defaults to FCFA for Cameroon/Central Africa, while supporting USD ($).
 */

export function formatCurrency(
  amount: number | string | null | undefined,
  currency: string = 'FCFA'
): string {
  const num = Number(amount || 0)
  const norm = (currency || 'FCFA').toUpperCase().trim()

  if (norm === 'FCFA' || norm === 'XAF' || norm === 'XOF') {
    // FCFA does not use decimal cents in practice
    const formatted = Math.round(num).toLocaleString('fr-FR')
    return `${formatted} FCFA`
  }

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: norm.length === 3 ? norm : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  } catch {
    return `$${num.toFixed(2)}`
  }
}

export function formatCurrencySign(
  amount: number | string | null | undefined,
  currency: string = 'FCFA'
): string {
  const num = Number(amount || 0)
  const sign = num > 0 ? '+' : ''
  return `${sign}${formatCurrency(num, currency)}`
}

export function getCurrencySymbol(currency: string = 'FCFA'): string {
  const norm = (currency || 'FCFA').toUpperCase().trim()
  if (norm === 'FCFA' || norm === 'XAF' || norm === 'XOF') {
    return 'FCFA'
  }
  return '$'
}
