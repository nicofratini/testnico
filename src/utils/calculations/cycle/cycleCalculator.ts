import { calculateSimpleInterest } from '../core/interest';
import { calculateLeverageAmount, calculateTotalInvestment } from '../core/leverage';
import { calculateTotalCreditInterest } from '../funding/creditInterest';
import { calculateProfitBreakdown } from '../profit/profitCalculator';
import type { SimulationParameters, CycleResult } from '../../../types';

export function calculateCycle(
  currentCapital: number,
  params: SimulationParameters
): CycleResult {
  // 1. Calcul du montant du crédit avec effet de levier
  const leverageAmount = params.leverageEnabled
    ? calculateLeverageAmount(currentCapital, params.leverageRatio)
    : 0;

  // 2. Investissement total = fonds propres + crédit
  const totalInvestment = calculateTotalInvestment(currentCapital, leverageAmount);

  // 3. Intérêts sur le capital placé (taux simple sur la durée)
  const placementInterest = calculateSimpleInterest(
    currentCapital,
    params.placementRate,
    params.cycleDuration
  );

  // 4. Coût total du crédit basé sur les appels de fonds progressifs
  const creditCost = params.leverageEnabled
    ? calculateTotalCreditInterest(
        leverageAmount,
        params.creditRate,
        params.cycleDuration,
        params.fundingPhases
      )
    : 0;

  // 5. Calcul du profit immobilier (plus-value - coût du crédit)
  const { grossProfit, netProfit } = calculateProfitBreakdown(
    leverageAmount,
    params.saleMargin,
    creditCost
  );

  // 6. Capital final = capital initial + intérêts placement + profit net
  const finalCapital = currentCapital + placementInterest + netProfit;

  return {
    investedCapital: currentCapital,
    leverageAmount,
    totalInvestment,
    placementInterest,
    creditCost,
    saleProfit: grossProfit,
    finalCapital,
    cycleDuration: params.cycleDuration
  };
}