export function calculateDetailedCreditCost(): number {
  const phases = [
    { month: 0, percentage: 5, duration: 24 },
    { month: 3, percentage: 30, duration: 21 },
    { month: 6, percentage: 15, duration: 18 },
    { month: 9, percentage: 10, duration: 15 },
    { month: 12, percentage: 10, duration: 12 },
    { month: 15, percentage: 15, duration: 9 },
    { month: 18, percentage: 15, duration: 6 }
  ];

  const leverageAmount = 700000;
  const annualRate = 0.03; // 3%

  return phases.reduce((total, phase) => {
    const phaseAmount = leverageAmount * (phase.percentage / 100);
    const interest = phaseAmount * annualRate * (phase.duration / 12);
    return total + interest;
  }, 0);
}