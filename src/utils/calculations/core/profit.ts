/**
 * Calcule la plus-value sur le montant du crédit utilisé uniquement
 */
export function calculateGrossProfit(leverageAmount: number, margin: number): number {
  return leverageAmount * (margin / 100);
}

/**
 * Calcule le profit net après déduction des coûts
 */
export function calculateNetProfit(grossProfit: number, costs: number): number {
  return grossProfit - costs;
}