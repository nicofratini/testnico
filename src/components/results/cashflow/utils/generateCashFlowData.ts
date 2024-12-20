import type { SimulationResult } from '../../../../types';
import type { CashFlowData } from '../types';

export function generateCashFlowData(results: SimulationResult): CashFlowData[] {
  const cashFlowData: CashFlowData[] = [];

  results.timeline.forEach((event) => {
    if (event.type === 'funding') {
      cashFlowData.push({
        period: `Cycle ${event.cycleIndex + 1} - M${event.month + 1}`,
        amount: -event.amount, // Negative for outflows
        type: 'funding'
      });
    } else if (event.type === 'sale') {
      cashFlowData.push({
        period: `Cycle ${event.cycleIndex + 1} - M${event.month + 1}`,
        amount: event.amount,
        type: 'sale'
      });
    }
  });

  return cashFlowData;
}