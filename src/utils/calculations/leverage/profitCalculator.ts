export function calculateRealEstateProfit(leverageAmount: number): {
  grossProfit: number;
  creditCost: number;
  netProfit: number;
} {
  const margin = 0.28; // 28%
  const grossProfit = leverageAmount * margin;
  const creditCost = calculateDetailedCreditCost();
  const netProfit = grossProfit - creditCost;

  return {
    grossProfit,
    creditCost,
    netProfit
  };
}