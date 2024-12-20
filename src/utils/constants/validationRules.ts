export const VALIDATION_RULES = {
  initialCapital: {
    min: 0,
    max: 100000000,
  },
  numberOfCycles: {
    min: 1,
    max: 10,
  },
  cycleDuration: {
    min: 12,
    max: 60,
  },
  placementRate: {
    min: 0,
    max: 20,
  },
  leverageRatio: {
    min: 0,
    max: 100,
  },
  creditRate: {
    min: 0,
    max: 20,
  },
  saleMargin: {
    min: 0,
    max: 100,
  }
} as const;

export type ValidationRules = typeof VALIDATION_RULES;