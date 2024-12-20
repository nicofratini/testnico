/**
 * Calcule le profit immobilier total
 * Formule: (Montant total investi × Marge) - Coût crédit
 */
export function calculateRealEstateProfit(
  totalInvestment: number,
  saleMargin: number,
  creditCost: number
): number {
  const saleProfit = totalInvestment * (saleMargin / 100);
  return saleProfit - creditCost;
}