/**
 * Calcule le montant du crédit selon le ratio LTV
 * Formule: (Fonds propres × LTV) / (100 - LTV)
 */
export function calculateLeverageAmount(equity: number, ltv: number): number {
  if (!ltv) return 0;
  return (equity * ltv) / (100 - ltv);
}

/**
 * Calcule le montant de crédit pour une phase
 */
export function calculatePhaseCredit(totalCredit: number, percentage: number): number {
  return totalCredit * (percentage / 100);
}