import type { SimulationParameters, TimelineEvent, CycleResult } from '../types';

export function generateTimelineEvents(
  params: SimulationParameters,
  cycles: CycleResult[]
): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  let currentMonth = 0;

  cycles.forEach((cycle, cycleIndex) => {
    // Add funding events
    params.fundingSchedule.forEach((percentage, index) => {
      const monthOffset = (index * params.cycleDuration) / params.fundingSchedule.length;
      const equityAmount = (cycle.investedCapital * percentage) / 100;
      const leverageAmount = (cycle.leveragedAmount * percentage) / 100;

      events.push({
        month: currentMonth + Math.floor(monthOffset),
        type: 'funding',
        amount: equityAmount + leverageAmount,
        cycleIndex,
        details: {
          equity: equityAmount,
          leverage: leverageAmount,
        },
      });
    });

    // Add sale event
    events.push({
      month: currentMonth + params.cycleDuration,
      type: 'sale',
      amount: cycle.saleProceeds,
      cycleIndex,
      details: {
        profit: cycle.netProfit,
      },
    });

    currentMonth += params.cycleDuration;
  });

  return events.sort((a, b) => a.month - b.month);
}