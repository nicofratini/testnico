import { useMemo } from 'react';
import type { CashFlowData } from '../types';

interface FlowMetrics {
  totalFlow: number;
  averageFlow: number;
  volatility: number;
  maxFlow: number;
  minFlow: number;
  flowCount: number;
}

export function useFlowMetrics(data: CashFlowData[]): FlowMetrics {
  return useMemo(() => {
    const amounts = data.map(flow => flow.amount);
    const totalFlow = amounts.reduce((sum, amount) => sum + amount, 0);
    const averageFlow = totalFlow / amounts.length;
    
    const variance = amounts.reduce((sum, amount) => 
      sum + Math.pow(amount - averageFlow, 2), 0
    ) / amounts.length;

    return {
      totalFlow,
      averageFlow,
      volatility: Math.sqrt(variance),
      maxFlow: Math.max(...amounts),
      minFlow: Math.min(...amounts),
      flowCount: amounts.length
    };
  }, [data]);
}