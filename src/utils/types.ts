export interface CycleResult {
  investedCapital: number;
  leveragedAmount: number;
  totalInvestment: number;
  placementInterest: number;
  creditInterest: number;
  saleProceeds: number;
  netProfit: number;
  finalCapital: number;
}

export interface SimulationResult {
  cycles: CycleResult[];
  finalCapital: number;
  totalReturn: number;
  cagr: number;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  month: number;
  type: 'funding' | 'sale';
  amount: number;
  cycleIndex: number;
  details: {
    equity?: number;
    leverage?: number;
    interest?: number;
    profit?: number;
  };
}