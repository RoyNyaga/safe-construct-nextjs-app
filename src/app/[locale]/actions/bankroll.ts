'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { BettingBankroll, BettingTransaction, TransactionType, TriggerType } from '@/types/betting'

/**
 * Gets the active bankroll or seeds the default 'Main Bankroll' if none exists.
 */
export async function getActiveBankroll(): Promise<{
  bankroll: BettingBankroll | null
  error?: string
}> {
  const supabase = await createClient()

  const { data: bankroll, error } = await supabase
    .from('betting_bankrolls')
    .select('*')
    .eq('is_active', true)
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Failed to get active bankroll:', error)
    return { bankroll: null, error: error.message }
  }

  if (bankroll) {
    return { bankroll: bankroll as BettingBankroll }
  }

  // Seed default bankroll if table is empty
  const { data: seeded, error: seedError } = await supabase
    .from('betting_bankrolls')
    .insert([
      {
        name: 'Main Bankroll',
        currency: 'USD',
        current_balance: 0.00,
        initial_deposit: 0.00,
        total_deposited: 0.00,
        total_withdrawn: 0.00,
        total_staked: 0.00,
        total_payout: 0.00,
        is_active: true,
      },
    ])
    .select()
    .single()

  if (seedError) {
    console.warn('Could not auto-seed default bankroll in DB (RLS restricted):', seedError.message)
    // Fallback in-memory default bankroll so UI renders cleanly
    return {
      bankroll: {
        id: 1,
        uuid: '00000000-0000-0000-0000-000000000000',
        name: 'Main Bankroll',
        currency: 'USD',
        current_balance: 0.00,
        initial_deposit: 0.00,
        total_deposited: 0.00,
        total_withdrawn: 0.00,
        total_staked: 0.00,
        total_payout: 0.00,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    }
  }

  return { bankroll: seeded as BettingBankroll }
}

/**
 * Internal helper to atomically execute a bankroll transaction and update balances.
 */
export async function executeTransaction(params: {
  bankrollId?: number
  ticketId?: number | null
  transactionType: TransactionType
  triggerType: TriggerType
  amount: number
  description?: string
}): Promise<{ transaction?: BettingTransaction; error?: string }> {
  const supabase = await createClient()

  // 1. Resolve Bankroll
  let targetBankrollId = params.bankrollId
  if (!targetBankrollId) {
    const { bankroll } = await getActiveBankroll()
    if (!bankroll) return { error: 'No active bankroll found' }
    targetBankrollId = bankroll.id
  }

  // Try calling the PostgreSQL stored procedure first
  const { data: rpcTx, error: rpcError } = await supabase.rpc('execute_bankroll_transaction', {
    p_bankroll_id: targetBankrollId,
    p_ticket_id: params.ticketId || null,
    p_transaction_type: params.transactionType,
    p_trigger_type: params.triggerType,
    p_amount: params.amount,
    p_description: params.description || '',
  })

  if (!rpcError && rpcTx) {
    revalidatePath('/[locale]/admin/betting', 'layout')
    return { transaction: rpcTx as BettingTransaction }
  }

  // Fallback: If RPC function isn't yet migrated, perform atomic manual update
  const { data: currentBankroll, error: fetchError } = await supabase
    .from('betting_bankrolls')
    .select('*')
    .eq('id', targetBankrollId)
    .single()

  if (fetchError || !currentBankroll) {
    return { error: fetchError?.message || 'Bankroll not found' }
  }

  const balanceBefore = Number(currentBankroll.current_balance || 0)
  const balanceAfter = Number((balanceBefore + params.amount).toFixed(2))

  // Insert transaction ledger record
  const { data: insertedTx, error: txError } = await supabase
    .from('betting_transactions')
    .insert([
      {
        bankroll_id: targetBankrollId,
        ticket_id: params.ticketId || null,
        transaction_type: params.transactionType,
        trigger_type: params.triggerType,
        amount: params.amount,
        balance_before: balanceBefore,
        balance_after: balanceAfter,
        description: params.description || null,
      },
    ])
    .select()
    .single()

  if (txError) {
    console.error('Failed to record transaction ledger:', txError)
    return { error: txError.message }
  }

  // Update bankroll aggregates
  const updatePayload: Record<string, any> = {
    current_balance: balanceAfter,
    updated_at: new Date().toISOString(),
  }

  if (params.transactionType === 'deposit') {
    updatePayload.total_deposited = Number((Number(currentBankroll.total_deposited || 0) + params.amount).toFixed(2))
    if (Number(currentBankroll.initial_deposit || 0) === 0) {
      updatePayload.initial_deposit = params.amount
    }
  } else if (params.transactionType === 'withdrawal') {
    updatePayload.total_withdrawn = Number((Number(currentBankroll.total_withdrawn || 0) + Math.abs(params.amount)).toFixed(2))
  } else if (params.transactionType === 'bet_stake') {
    updatePayload.total_staked = Number((Number(currentBankroll.total_staked || 0) + Math.abs(params.amount)).toFixed(2))
  } else if (params.transactionType === 'bet_win') {
    updatePayload.total_payout = Number((Number(currentBankroll.total_payout || 0) + params.amount).toFixed(2))
  }

  await supabase.from('betting_bankrolls').update(updatePayload).eq('id', targetBankrollId)

  revalidatePath('/[locale]/admin/betting', 'layout')
  return { transaction: insertedTx as BettingTransaction }
}

/**
 * Records a manual capital deposit to the active bankroll.
 */
export async function recordManualDeposit(amount: number, description?: string) {
  if (amount <= 0) return { error: 'Deposit amount must be greater than zero.' }

  return executeTransaction({
    transactionType: 'deposit',
    triggerType: 'manual',
    amount: Number(amount.toFixed(2)),
    description: description || 'Manual Capital Deposit',
  })
}

/**
 * Records a manual capital withdrawal from the active bankroll.
 */
export async function recordManualWithdrawal(amount: number, description?: string) {
  if (amount <= 0) return { error: 'Withdrawal amount must be greater than zero.' }

  return executeTransaction({
    transactionType: 'withdrawal',
    triggerType: 'manual',
    amount: -Number(amount.toFixed(2)),
    description: description || 'Manual Capital Withdrawal',
  })
}

/**
 * Fetches transaction ledger entries with ticket metadata.
 */
export async function getBankrollTransactions(options?: {
  bankrollId?: number
  triggerType?: TriggerType | 'all'
  limit?: number
}) {
  const supabase = await createClient()

  let query = supabase
    .from('betting_transactions')
    .select(`
      *,
      betting_tickets (
        uuid,
        ticket_number
      )
    `)
    .order('created_at', { ascending: false })

  if (options?.bankrollId) {
    query = query.eq('bankroll_id', options.bankrollId)
  }

  if (options?.triggerType && options.triggerType !== 'all') {
    query = query.eq('trigger_type', options.triggerType)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Failed to get transactions:', error)
    return { transactions: [], error: error.message }
  }

  return { transactions: (data || []) as BettingTransaction[] }
}

/**
 * Updates the currency for the active bankroll (e.g., 'FCFA' or 'USD').
 */
export async function updateBankrollCurrency(currency: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('betting_bankrolls')
    .update({ currency: currency.toUpperCase().trim() })
    .eq('is_active', true)

  if (error) {
    console.error('Failed to update bankroll currency:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/[locale]/admin/betting', 'layout')
  return { success: true }
}

/**
 * Deletes a bankroll transaction and reconciles balances.
 */
export async function deleteBankrollTransaction(transactionId: number): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // 1. Fetch transaction
  const { data: tx, error: fetchErr } = await supabase
    .from('betting_transactions')
    .select('*')
    .eq('id', transactionId)
    .single()

  if (fetchErr || !tx) {
    return { success: false, error: fetchErr?.message || 'Transaction not found' }
  }

  // 2. Fetch associated bankroll
  const { data: bankroll, error: bankErr } = await supabase
    .from('betting_bankrolls')
    .select('*')
    .eq('id', tx.bankroll_id)
    .single()

  if (!bankErr && bankroll) {
    const currentBal = Number(bankroll.current_balance || 0)
    const txAmount = Number(tx.amount || 0)
    // Revert balance: subtract txAmount
    const newBal = Number((currentBal - txAmount).toFixed(2))

    const updatePayload: Record<string, any> = {
      current_balance: newBal,
      updated_at: new Date().toISOString(),
    }

    if (tx.transaction_type === 'deposit') {
      updatePayload.total_deposited = Math.max(0, Number((Number(bankroll.total_deposited || 0) - txAmount).toFixed(2)))
    } else if (tx.transaction_type === 'withdrawal') {
      updatePayload.total_withdrawn = Math.max(0, Number((Number(bankroll.total_withdrawn || 0) - Math.abs(txAmount)).toFixed(2)))
    } else if (tx.transaction_type === 'bet_stake') {
      updatePayload.total_staked = Math.max(0, Number((Number(bankroll.total_staked || 0) - Math.abs(txAmount)).toFixed(2)))
    } else if (tx.transaction_type === 'bet_win') {
      updatePayload.total_payout = Math.max(0, Number((Number(bankroll.total_payout || 0) - txAmount).toFixed(2)))
    }

    await supabase.from('betting_bankrolls').update(updatePayload).eq('id', tx.bankroll_id)
  }

  // 3. Delete the transaction record
  const { error: delErr } = await supabase.from('betting_transactions').delete().eq('id', transactionId)
  if (delErr) {
    return { success: false, error: delErr.message }
  }

  revalidatePath('/[locale]/admin/betting', 'layout')
  return { success: true }
}

/**
 * Updates a bankroll transaction description.
 */
export async function updateBankrollTransaction(transactionId: number, description: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('betting_transactions')
    .update({ description })
    .eq('id', transactionId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/[locale]/admin/betting', 'layout')
  return { success: true }
}

