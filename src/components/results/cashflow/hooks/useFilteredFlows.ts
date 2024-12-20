import { useMemo } from 'react';
import type { CashFlowData } from '../types';

export function useFilteredFlows(
  data: CashFlowData[],
  selectedTypes: string[]
) {
  return useMemo(() => {
    if (selectedTypes.length === 0) return data;
    return data.filter(flow => selectedTypes.includes(flow.type));
  }, [data, selectedTypes]);
}