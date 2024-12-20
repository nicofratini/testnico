import { LOCKED_LEVERAGE_RATIO } from './constants';

export function calculateLeverageAmount(equity: number): number {
  return (equity * LOCKED_LEVERAGE_RATIO) / (100 - LOCKED_LEVERAGE_RATIO);
}