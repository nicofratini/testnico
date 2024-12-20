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