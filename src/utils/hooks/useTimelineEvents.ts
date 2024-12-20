import { useMemo } from 'react';
import type { SimulationParameters, TimelineEvent } from '../../types';
import { generateTimelineEvents } from '../timelineCalculations';
import { calculateInvestmentResults } from '../financialCalculations';

export function useTimelineEvents(parameters: SimulationParameters) {
  const events = useMemo(() => {
    const results = calculateInvestmentResults(parameters);
    return generateTimelineEvents(parameters, results.cycles);
  }, [parameters]);

  const summary = useMemo(() => {
    const totalFunding = events
      .filter(e => e.type === 'funding')
      .reduce((sum, e) => sum + e.amount, 0);
      
    const totalSales = events
      .filter(e => e.type === 'sale')
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      totalFunding,
      totalSales,
      netResult: totalSales - totalFunding
    };
  }, [events]);

  return { events, summary };
}