export function calculateMonthlyRate(annualRate: number): number {
  return (1 + annualRate / 100) ** (1 / 12) - 1;
}

export function calculateCompoundInterest(
  principal: number,
  monthlyRate: number,
  months: number
): number {
  return principal * ((1 + monthlyRate) ** months - 1);
}

export function calculateWeightedCreditInterest(
  amount: number,
  monthlyRate: number,
  totalMonths: number,
  schedule: number[]
): number {
  return schedule.reduce((total, percentage, index) => {
    const portionAmount = (amount * percentage) / 100;
    const remainingMonths = totalMonths - (index * totalMonths) / schedule.length;
    return total + portionAmount * ((1 + monthlyRate) ** remainingMonths - 1);
  }, 0);
}