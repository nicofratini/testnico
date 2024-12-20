export interface FinalCapitalParams {
  initialCapital: number;
  leverageAmount: number;
  totalCreditInterest: number;
  placementRate: number;
  saleMargin: number;
  cycleDuration: number;
}

export interface PlacementInterestParams {
  capital: number;
  rate: number;
  duration: number;
}

export interface RealEstateProfitParams {
  leverageAmount: number;
  margin: number;
}