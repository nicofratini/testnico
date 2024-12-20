import { MONTHS_PER_YEAR } from '../core/constants';
import type { FundingPhase, CreditCost } from '../core/types';

export function calculatePhaseCredit(
  leverageAmount: number,
  phase: FundingPhase,
  creditRate: number,
  cycleDuration: number
): CreditCost {
  const phaseAmount = leverageAmount * (phase.percentage / 100);
  const remainingMonths = cycleDuration - phase.month;
  const interest = phaseAmount * (creditRate / 100) * (remainingMonths / MONTHS_PER_YEAR);

  return {
    phaseAmount,
    interest: Math.round(interest * 100) / 100
  };
}

export function calculateTotalCreditCost(
  leverageAmount: number,
  phases: FundingPhase[],
  creditRate: number,
  cycleDuration: number
): number {
  const totalInterest = phases.reduce((total, phase) => {
    const { interest } = calculatePhaseCredit(leverageAmount, phase, creditRate, cycleDuration);
    return total + interest;
  }, 0);

  return Math.round(totalInterest * 100) / 100;
}