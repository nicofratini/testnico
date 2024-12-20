/**
 * Calcule le montant de revente des actifs immobiliers
 * Formule: Montant crédit × (1 + Marge)
 */
export function calculateSaleAmount(leverageAmount: number, saleMargin: number): number {
  if (!leverageAmount) return 0;
  return leverageAmount * (1 + saleMargin / 100);
}

/**
 * Calcule le profit net immobilier
 * Formule: (Montant crédit × Marge) - Coût crédit
 */
export function calculateRealEstateProfit(
  leverageAmount: number,
  saleMargin: number,
  creditCost: number
): number {
  if (!leverageAmount) return 0;
  const saleProfit = leverageAmount * (saleMargin / 100);
  return saleProfit - creditCost;
}