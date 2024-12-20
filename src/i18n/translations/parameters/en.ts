export const parameters = {
  title: 'Parameters',
  initialCapital: 'Initial Capital',
  numberOfCycles: 'Number of Cycles',
  enableLeverage: 'Enable Leverage',
  placementRate: 'Placement Rate',
  ltv: 'LTV',
  creditRate: 'Credit Rate',
  
  cycleSettings: 'Cycle Settings',
  cycleDuration: 'Cycle Duration',
  saleMargin: 'Sale Margin',
  fundingPhases: 'Funding Phases',
  
  month: 'Month',
  percentage: 'Percentage',
  description: 'Description',
  addPhase: 'Add Phase',
  totalPercentage: 'Total Percentage',
  
  cycleLabels: {
    cycle1: '1 Cycle (24 Months)',
    cycle2: '2 Cycles (48 Months)',
    cycle3: '3 Cycles (72 Months)'
  },
  
  tooltips: {
    initialCapital: 'Starting amount for investment',
    placementRate: 'Annual return rate on placed capital',
    ltv: 'Loan-to-Value ratio for leverage',
    creditRate: 'Annual interest rate on credit'
  },
  
  validation: {
    totalMustBe100: 'Total percentage must equal 100%',
    invalidDuration: 'Duration must be between 12 and 60 months',
    invalidMargin: 'Margin must be between 0 and 100%'
  }
};