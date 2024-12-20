interface ProfitBreakdown {
  grossProfit: number;
  creditCost: number;
  netProfit: number;
}

export function calculateProfitBreakdown(
  leverageAmount: number,
  saleMargin: number,
  creditCost: number
): ProfitBreakdown {
  // Gross profit is calculated on leverage amount only
  const grossProfit = leverageAmount * (saleMargin / 100);
  
  // Net profit = gross profit - credit cost
  const netProfit = grossProfit - creditCost;

  return {
    grossProfit,
    creditCost,
    netProfit
  };
}