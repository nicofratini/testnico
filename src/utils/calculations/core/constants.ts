export const MONTHS_PER_YEAR = 12;

export const DEFAULT_PARAMETERS = {
  initialCapital: 1000000,
  leverageEnabled: true,
  leverageRatio: 70,
  creditRate: 3,
  placementRate: 5,
  saleMargin: 28,
  cycleDuration: 24,
  numberOfCycles: 1
} as const;

export const DEFAULT_FUNDING_PHASES = [
  { month: 0, percentage: 5, description: 'Dépôt de garantie' },
  { month: 3, percentage: 30, description: 'Fondation' },
  { month: 6, percentage: 15, description: 'Élévation' },
  { month: 9, percentage: 10, description: 'Toiture' },
  { month: 12, percentage: 10, description: 'Second œuvre' },
  { month: 15, percentage: 15, description: 'Finitions' },
  { month: 18, percentage: 15, description: 'Livraison' }
] as const;