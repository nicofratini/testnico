export interface SimulationResult {
  cycles: CycleResult[];
  initialCapital: number;
  leverageAmount: number;
  totalCreditInterest: number;
  placementRate: number;
  saleMargin: number;
  cycleDuration: number;
  finalCapital: number;
  totalReturn: number;
  cagr: number;
  timeline: TimelineEvent[];
}