import type { SimulationParameters, MonthlyFlow } from '../../types';
import { calculateMonthlyRate } from './interestCalculations';

export function calculateMonthlyFlows(params: SimulationParameters): MonthlyFlow[] {
  const flows: MonthlyFlow[] = [];
  let currentCapital = params.initialCapital;
  const monthlyPlacementRate = calculateMonthlyRate(params.placementRate);
  const monthlyCreditRate = calculateMonthlyRate(params.creditRate);

  for (let cycleIndex = 0; cycleIndex < params.numberOfCycles; cycleIndex++) {
    let placedCapital = currentCapital;
    let creditUsed = 0;
    
    // Calculate funding schedule in absolute months
    const fundingPoints = params.fundingPhases.map(phase => ({
      month: phase.month,
      percentage: phase.percentage
    }));

    for (let month = 0; month < params.cycleDuration; month++) {
      // Check for funding call this month
      const fundingCall = fundingPoints.find(fp => fp.month === month);
      const fundingAmount = fundingCall 
        ? (currentCapital * fundingCall.percentage / 100) 
        : null;
      
      if (fundingCall && params.leverageEnabled) {
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