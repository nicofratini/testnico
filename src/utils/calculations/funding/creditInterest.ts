import { calculateSimpleInterest } from '../core/interest';
import type { FundingPhase } from '../../../types';

/**
 * Calcule les intérêts totaux du crédit pour tous les appels de fonds
 */
export function calculateTotalCreditInterest(
  leverageAmount: number,
  creditRate: number,
  cycleDuration: number,
  fundingPhases: FundingPhase[]
): number {
  return fundingPhases.reduce((total, phase) => {
    // Calcul du montant de crédit pour cette phase
    const phaseAmount = leverageAmount * (phase.percentage / 100);
    // Calcul des mois restants jusqu'à la fin du cycle
    const remainingMonths = cycleDuration - phase.month;
    // Calcul des intérêts pour cette phase
    const phaseInterest = calculateSimpleInterest(phaseAmount, creditRate, remainingMonths);
    return total + phaseInterest;
  }, 0);
}