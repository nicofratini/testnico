export function calculateLeverageAmount(equity: number): number {
  const ltv = 70; // 70%
  return (equity * ltv) / (100 - ltv); // 700 000 €
}