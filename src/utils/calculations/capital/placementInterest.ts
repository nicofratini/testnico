export function calculatePlacementInterest(initialCapital: number): number {
  const annualRate = 0.05; // 5%
  const years = 2;
  return initialCapital * annualRate * years;
}