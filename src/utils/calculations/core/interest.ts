export function calculateSimpleInterest(
  principal: number,
  annualRate: number,
  months: number
): number {
  const years = months / 12;
  return principal * (annualRate / 100) * years;
}