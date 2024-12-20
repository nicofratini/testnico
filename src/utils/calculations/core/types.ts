export interface FundingPhase {
  month: number;
  percentage: number;
  description: string;
}

export interface CreditCost {
  phaseAmount: number;
  interest: number;
}

export interface ProfitBreakdown {
  grossProfit: number;
  creditCost: number;
  netProfit: number;
}