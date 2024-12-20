import { calculateFinalCapital } from './finalCapital';

test('calculateFinalCapital returns correct value', () => {
  const result = calculateFinalCapital({
    initialCapital: 1000000,
    leverageAmount: 500000,
    totalCreditInterest: 20000,
    placementRate: 0.03,
    saleMargin: 0.15,
    cycleDuration: 12,
  });

  expect(result).toBeCloseTo(1269487.50, 2); // Exemple attendu
});
