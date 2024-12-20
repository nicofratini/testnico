import type { SimulationParameters, TimelineEvent, CycleResult } from '../../../types';

export function generateTimelineEvents(
  params: SimulationParameters,
  cycles: CycleResult[]
): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  let currentMonth = 0;

  cycles.forEach((cycle, cycleIndex) => {
    // Add funding events based on funding phases
    params.fundingPhases.forEach((phase) => {
      const equityAmount = (cycle.investedCapital * phase.percentage) / 100;
      const leverageAmount = params.leverageEnabled 
        ? (cycle.leverageAmount * phase.percentage) / 100
        : 0;

      events.push({
        month: currentMonth + phase.month,
        type: 'funding',
        amount: equityAmount + leverageAmount,
        cycleIndex,
        details: {
          equity: Math.round(equityAmount * 100) / 100,
          leverage: Math.round(leverageAmount * 100) / 100,
          description: phase.description
        },
      });
    });

    // Add sale event at the end of cycle
    events.push({
      month: currentMonth + params.cycleDuration,
      type: 'sale',
      amount: Math.round((cycle.totalInvestment + cycle.saleProfit) * 100) / 100,
      cycleIndex,
      details: {
        profit: Math.round(cycle.saleProfit * 100) / 100,
      },
    });

    currentMonth += params.cycleDuration;
  });

  return events.sort((a, b) => a.month - b.month);
}