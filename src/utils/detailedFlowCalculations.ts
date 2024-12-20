import type { SimulationParameters } from '../types';

export interface MonthlyFlow {
  month: number;
  cycleIndex: number;
  placedCapital: number;
  placementInterest: number;
  creditUsed: number;
  creditInterest: number;
  fundingCall: number | null;
  saleAmount: number | null;
  netPosition: number;
}

export function calculateMonthlyFlows(params: SimulationParameters): MonthlyFlow[] {
  const flows: MonthlyFlow[] = [];
  let currentCapital = params.initialCapital;
  const monthlyPlacementRate = (1 + params.placementRate / 100) ** (1/12) - 1;
  const monthlyCreditRate = (1 + params.creditRate / 100) ** (1/12) - 1;

  for (let cycleIndex = 0; cycleIndex < params.numberOfCycles; cycleIndex++) {
    let placedCapital = currentCapital;
    let creditUsed = 0;
    
    // Calculate funding schedule in absolute months
    const fundingPoints = params.fundingSchedule.map((percentage, index) => ({
      month: Math.floor((index * params.cycleDuration) / params.fundingSchedule.length),
      percentage
    }));

    for (let month = 0; month < params.cycleDuration; month++) {
      // Check for funding call this month
      const fundingCall = fundingPoints.find(fp => fp.month === month);
      const fundingAmount = fundingCall 
        ? (currentCapital * fundingCall.percentage / 100) 
        : null;
      
      if (fundingCall) {
        const leverageAmount = (fundingAmount! * params.leverageRatio) / (100 - params.leverageRatio);
        creditUsed += leverageAmount;
      }

      // Calculate interests
      const placementInterest = placedCapital * monthlyPlacementRate;
      const creditInterest = creditUsed * monthlyCreditRate;
      
      // Calculate sale amount for last month of cycle
      const saleAmount = month === params.cycleDuration - 1
        ? (placedCapital + creditUsed) * (1 + params.saleMargin / 100)
        : null;

      flows.push({
        month: cycleIndex * params.cycleDuration + month,
        cycleIndex,
        placedCapital,
        placementInterest,
        creditUsed,
        creditInterest,
        fundingCall: fundingAmount,
        saleAmount,
        netPosition: placedCapital + creditUsed + placementInterest - creditInterest
      });

      // Update placed capital for next month
      placedCapital += placementInterest;
      if (saleAmount) {
        currentCapital = saleAmount - creditUsed;
        placedCapital = currentCapital;
        creditUsed = 0;
      }
    }
  }

  return flows;
}