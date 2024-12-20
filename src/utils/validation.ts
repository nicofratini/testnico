import { VALIDATION_RULES } from './constants';
import type { SimulationParameters } from '../types';

export function validateParameters(params: SimulationParameters): string[] {
  const errors: string[] = [];

  // Validate numeric ranges
  Object.entries(VALIDATION_RULES).forEach(([key, rules]) => {
    const value = params[key as keyof typeof VALIDATION_RULES];
    if (value < rules.min || value > rules.max) {
      errors.push(`${key} must be between ${rules.min} and ${rules.max}`);
    }
  });

  // Validate funding schedule
  const totalFunding = params.fundingSchedule.reduce((sum, value) => sum + value, 0);
  if (Math.abs(totalFunding - 100) > 0.01) {
    errors.push('Funding schedule must total 100%');
  }

  return errors;
}