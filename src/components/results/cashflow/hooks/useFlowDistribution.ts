import { useMemo } from 'react';
import type { CashFlowData } from '../types';

interface FlowDistribution {
  type: string;
  amount: number;
  percentage: number;
  color: string;
}

export function useFlowDistribution(data: CashFlowData[]) {
  return useMemo(() => {
    const totals = data.reduce((acc, flow) => {
      const key = flow.type;
      acc[key] = (acc[key] || 0) + Math.abs(flow.amount);
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);

    return Object.entries(totals).map(([type, amount]) => ({
      type,
      amount,
      percentage: (amount / total) * 100,
      color: `var(--color-${type})`
    }));
  }, [data]);
}