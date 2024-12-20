import { MONTHS_PER_YEAR } from '../core/constants';
import { calculateTotalCreditCost } from '../funding/phaseCalculator';
import { calculateProfitBreakdown } from '../profit/profitCalculator';
import type { SimulationParameters } from '../../../types';

export function calculateFinalCapital(
  initialCapital: number,
  params: SimulationParameters
): number {
  // 1. Calcul du montant du crédit (effet de levier)
  const leverageAmount = params.leverageEnabled
    ? (initialCapital * params.leverageRatio) / (100 - params.leverageRatio)
    : 0;

  // 2. Intérêts sur le capital placé (taux simple)
  const placementInterest = initialCapital * (params.placementRate / 100) * 
    (params.cycleDuration / MONTHS_PER_YEAR);

  // 3. Calcul du coût total du crédit
  const creditCost = params.leverageEnabled
    ? calculateTotalCreditCost(
        leverageAmount,
        params.fundingPhases,
        params.creditRate,
        params.cycleDuration
      )
    : 0;

  // 4. Calcul du profit immobilier
  const { netProfit } = calculateProfitBreakdown(
    leverageAmount,
    params.saleMargin,
    creditCost
  );

  // 5. Capital final = capital initial + intérêts placement + profit net
  return Math.round((initialCapital + placementInterest + netProfit) * 100) / 100;
}