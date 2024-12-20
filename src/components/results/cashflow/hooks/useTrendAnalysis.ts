import { useMemo } from 'react';
import type { CashFlowData } from '../types';

interface TrendAnalysis {
  trendDirection: 'up' | 'down' | 'stable';
  averageChange: number;
  changePercentage: number;
  volatility: number;
}

export function useTrendAnalysis(data: CashFlowData[]): TrendAnalysis {
  return useMemo(() => {
    const changes = data.slice(1).map((flow, index) => 
      flow.amount - data[index].amount
    );

    const averageChange = changes.reduce((sum, change) => sum + change, 0) / changes.length;
    const lastAmount = data[data.length - 1]?.amount || 0;
    const firstAmount = data[0]?.amount || 0;
    const changePercentage = ((lastAmount - firstAmount) / Math.abs(firstAmount)) * 100;

    // Calculate volatility (standard deviation of changes)
    const variance = changes.reduce((sum, change) => 
      sum + Math.pow(change - averageChange, 2), 0
    ) / changes.length;
    const volatility = Math.sqrt(variance);

    // Determine trend direction
    const trendDirection = 
      Math.abs(changePercentage) < 5 ? 'stable' :
      changePercentage > 0 ? 'up' : 'down';

    return {
      trendDirection,
      averageChange,
      changePercentage,
      volatility
    };
  }, [data]);
}