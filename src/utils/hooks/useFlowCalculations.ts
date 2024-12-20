import { useMemo } from 'react';
import type { SimulationParameters, MonthlyFlow } from '../../types';
import { calculateMonthlyFlows } from '../detailedFlowCalculations';

export function useFlowCalculations(parameters: SimulationParameters) {
  const flows = useMemo(() => calculateMonthlyFlows(parameters), [parameters]);

  const summary = useMemo(() => {
    const lastFlow = flows[flows.length - 1];
    const totalPlacementInterest = flows.reduce((sum, flow) => sum + flow.placementInterest, 0);
    const totalCreditInterest = flows.reduce((sum, flow) => sum + flow.creditInterest, 0);

    return {
      finalPosition: lastFlow.netPosition,
      totalPlacementInterest,
      totalCreditInterest,
      averageMonthlyReturn: totalPlacementInterest / flows.length
    };
  }, [flows]);

  return { flows, summary };
}