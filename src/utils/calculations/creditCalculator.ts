import type { FundingPhase } from '../../types';

export function calculateCreditCost(
  leverageAmount: number,
  creditRate: number,
  cycleDuration: number,
  fundingPhases: FundingPhase[]
): number {
  return Math.round(
    fundingPhases.reduce((total, phase) => {
      const phaseAmount = leverageAmount * (phase.percentage / 100);
      const remainingMonths = cycleDuration - phase.month;
      const phaseInterest = phaseAmount * (creditRate / 100) * (remainingMonths / 12);
      return total + phaseInterest;
    }, 0) * 100
  ) / 100;
}