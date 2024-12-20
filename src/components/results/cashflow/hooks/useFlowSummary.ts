import { useMemo } from 'react';
import type { CashFlowData, FlowSummary } from '../types';

export function useFlowSummary(data: CashFlowData[]): FlowSummary {
  return useMemo(() => {
    const totalInflow = data.reduce((sum, item) => 
      item.amount > 0 ? sum + item.amount : sum, 0
    );
    
    const totalOutflow = data.reduce((sum, item) => 
      item.amount < 0 ? sum + Math.abs(item.amount) : sum, 0
    );

    return {
      totalInflow,
      totalOutflow,
      netFlow: totalInflow - totalOutflow
    };
  }, [data]);
}