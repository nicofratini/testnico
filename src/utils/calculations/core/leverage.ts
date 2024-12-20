export function calculateLeverageAmount(equity: number, ltv: number): number {
  if (!ltv) return 0;
  return (equity * ltv) / (100 - ltv);
}

export function calculateTotalInvestment(equity: number, leverageAmount: number): number {
  return equity + leverageAmount;
}