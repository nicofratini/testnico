import { MONTHS_PER_YEAR } from './constants';
import type { PlacementInterestParams } from './types';

export function calculatePlacementInterest({
  capital,
  rate,
  duration
}: PlacementInterestParams): number {
  const years = duration / MONTHS_PER_YEAR;
  return Math.round(capital * (rate / 100) * years * 100) / 100;
}