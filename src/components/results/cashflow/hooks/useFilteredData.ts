import { useMemo } from 'react';
import type { CashFlowData } from '../types';

interface Filters {
  types: string[];
  minAmount: number | null;
  maxAmount: number | null;
  dateRange: [string | null, string | null];
}

export function useFilteredData(data: CashFlowData[], filters: Filters) {
  return useMemo(() => {
    return data.filter(flow => {
      // Filter by type
      if (filters.types.length > 0 && !filters.types.includes(flow.type)) {
        return false;
      }

      // Filter by amount
      if (filters.minAmount !== null && flow.amount < filters.minAmount) {
        return false;
      }
      if (filters.maxAmount !== null && flow.amount > filters.maxAmount) {
        return false;
      }

      // Filter by date range
      const [startDate, endDate] = filters.dateRange;
      const flowDate = new Date(flow.period);
      
      if (startDate && new Date(startDate) > flowDate) {
        return false;
      }
      if (endDate && new Date(endDate) < flowDate) {
        return false;
      }

      return true;
    });
  }, [data, filters]);
}