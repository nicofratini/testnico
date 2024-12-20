/**
 * Calcule les intérêts sur le capital placé
 * Formule: Capital × taux × durée en années
 */
export function calculatePlacementInterest(
  initialCapital: number,
  placementRate: number,
  totalMonths: number
): number {
  const years = totalMonths / 12;
  return initialCapital * (placementRate / 100) * years;
}

/**
 * Calcule le montant du crédit selon le ratio LTV
 * Formule: (Fonds propres × LTV) / (100 - LTV)
 */
export function calculateLeverageAmount(
  equity: number,
  leverageRatio: number
): number {
  if (!leverageRatio) return 0;
  return (equity * leverageRatio) / (100 - leverageRatio);
}

/**
 * Calcule le coût total du crédit
 * Formule: Crédit × taux × durée en années
 */
export function calculateCreditCost(
  leverageAmount: number,
  creditRate: number,
  totalMonths: number
): number {
  if (!leverageAmount) return 0;
  const years = totalMonths / 12;
  return leverageAmount * (creditRate / 100) * years;
}

/**
 * Calcule le profit immobilier total
 * Formule: (Montant crédit × Marge) - Coût crédit
 */
export function calculateRealEstateProfit(
  leverageAmount: number,
  saleMargin: number,
  creditCost: number
): number {
  // La plus-value s'applique uniquement sur le montant du crédit
  const saleProfit = leverageAmount * (saleMargin / 100);
  return saleProfit - creditCost;
}