import { useMemo } from 'react';
import type { CashFlowData } from '../types';

export function useFlowTransform(data: CashFlowData[]) {
  return useMemo(() => {
    const totalPositive = data.reduce((sum, item) => 
      item.amount > 0 ? sum + item.amount : sum, 0
    );
    
    const totalNegative = data.reduce((sum, item) => 
      item.amount < 0 ? sum + Math.abs(item.amount) : sum, 0
    );

    const maxValue = Math.max(totalPositive, totalNegative);
    
    return data.map(item => ({
      ...item,
      normalizedAmount: item.amount / maxValue,
      percentage: (Math.abs(item.amount) / maxValue) * 100
    }));
  }, [data]);
}