import { calculateCycle } from './dist/utils/calculations/core/calculator.js';

const params = { initialCapital: 1000000, leverageRatio: 70, creditRate: 3, saleMargin: 28, placementRate: 5, cycleDuration: 24, fundingSchedule: [ { month: 0, percentage: 5 }, { month: 3, percentage: 30 }, { month: 6, percentage: 15 }, { month: 9, percentage: 10 }, { month: 12, percentage: 10 }, { month: 15, percentage: 15 }, { month: 18, percentage: 15 }, ], };

console.log('=== Simulation des Résultats ==='); const result = calculateCycle(params); console.log(result);
