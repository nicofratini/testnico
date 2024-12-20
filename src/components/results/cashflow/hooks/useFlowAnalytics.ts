import { useMemo } from 'react';
import type { CashFlowData } from '../types';

interface FlowAnalytics {
  maxAmount: number;
  minAmount: number;
  averageAmount: number;
  volatility: number;
  totalInflow: number;
  totalOutflow: number;
  netFlow: number;
}

export function useFlowAnalytics(data: CashFlowData[]): FlowAnalytics {
  return useMemo(() => {
    const amounts = data.map(flow => flow.amount);
    const maxAmount = Math.max(...amounts);
    const minAmount = Math.min(...amounts);
    const averageAmount = amounts.reduce((sum, val) => sum + val, 0) / amounts.length;
    
    // Calculate volatility (standard deviation)
    const variance = amounts.reduce((sum, val) => 
      sum + Math.pow(val - averageAmount, 2), 0
    ) / amounts.length;
    const volatility = Math.sqrt(variance);

    // Calculate flow totals
    const { inflow, outflow } = data.reduce((acc, flow) => {
      if (flow.amount > 0) {
        acc.inflow += flow.amount;
      } else {
        acc.outflow += Math.abs(flow.amount);
      }
      return acc;
    }, { inflow: 0, outflow: 0 });

    return {
      maxAmount,
      minAmount,
      averageAmount,
      volatility,
      totalInflow: inflow,
      totalOutflow: outflow,
      netFlow: inflow - outflow
    };
  }, [data]);
}