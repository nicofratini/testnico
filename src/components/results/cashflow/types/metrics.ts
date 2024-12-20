export interface FlowMetrics {
  totalFlow: number;
  averageFlow: number;
  volatility: number;
  maxFlow: number;
  minFlow: number;
  flowCount: number;
}

export interface FlowDistribution {
  type: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface FlowTrend {
  period: string;
  cumulativeAmount: number;
  periodChange: number;
  changePercentage: number;
}