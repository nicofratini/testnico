import type { RealEstateProfitParams } from './types';

export function calculateRealEstateProfit({
  leverageAmount,
  margin
}: RealEstateProfitParams): number {
  return Math.round(leverageAmount * (margin / 100) * 100) / 100;
}