import type { SimulationParameters } from '../../types';

// Capital initial verrouillé
export const LOCKED_INITIAL_CAPITAL = 1000000;

export const DEFAULT_PARAMETERS: SimulationParameters = {
  initialCapital: LOCKED_INITIAL_CAPITAL,
  numberOfCycles: 1,
  cycleDuration: 24,
  placementRate: 5,
  leverageEnabled: true,
  leverageRatio: 70,
  creditRate: 3,
  saleMargin: 28,
  fundingPhases: [
    { month: 0, percentage: 5, description: 'Dépôt de garantie' },
    { month: 3, percentage: 30, description: 'Fondation' },
    { month: 6, percentage: 15, description: 'Élévation' },
    { month: 9, percentage: 10, description: 'Toiture' },
    { month: 12, percentage: 10, description: 'Second œuvre' },
    { month: 15, percentage: 15, description: 'Finitions' },
    { month: 18, percentage: 15, description: 'Livraison' }
  ]
};