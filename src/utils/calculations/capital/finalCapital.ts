import { calculatePlacementInterest } from './interest';
import { calculateRealEstateProfit } from './profit';
import type { FinalCapitalParams } from './types';

export function calculateFinalCapital(params: FinalCapitalParams): number {
  // 1. Calcul des intérêts sur le capital placé
  const placementInterest = calculatePlacementInterest({
    capital: params.initialCapital,
    rate: params.placementRate,
    duration: params.cycleDuration
  });

  // 2. Calcul de la plus-value immobilière
  const realEstateProfit = calculateRealEstateProfit({
    leverageAmount: params.leverageAmount,
    margin: params.saleMargin
  });

  // 3. Calcul du profit net immobilier
  const netRealEstateProfit = realEstateProfit - params.totalCreditInterest;

  // 4. Capital final = capital initial + intérêts placement + profit net immobilier
  return Math.round((
    params.initialCapital + 
    placementInterest + 
    netRealEstateProfit
  ) * 100) / 100;
}