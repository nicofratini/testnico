/**
 * Calcule les intérêts sur le capital placé (taux simple)
 */
export function calculatePlacementInterest(
  capital: number,
  annualRate: number,
  months: number
): number {
  const years = months / 12;
  return capital * (annualRate / 100) * years;
}

/**
 * Calcule les intérêts du crédit pour une phase
 */
export function calculatePhaseInterest(
  amount: number,
  annualRate: number,
  remainingMonths: number
): number {
  const years = remainingMonths / 12;
  return amount * (annualRate / 100) * years;
}