export interface CashFlowData {
  period: string;
  amount: number;
  type: 'funding' | 'sale' | 'interest';
}