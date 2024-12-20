import { VALIDATION_RULES } from '../constants/validationRules';
import type { SimulationParameters } from '../../types';

export function validateParameters(params: SimulationParameters, lang: 'fr' | 'en'): string[] {
  const errors: string[] = [];

  // Validate numeric ranges
  Object.entries(VALIDATION_RULES).forEach(([key, rules]) => {
    const value = params[key as keyof typeof VALIDATION_RULES];
    if (value < rules.min || value > rules.max) {
      errors.push(
        lang === 'fr'
          ? `${key} doit être entre ${rules.min} et ${rules.max}`
          : `${key} must be between ${rules.min} and ${rules.max}`
      );
    }
  });

  // Validate funding schedule
  const totalFunding = params.fundingPhases.reduce((sum, phase) => sum + phase.percentage, 0);
  if (Math.abs(totalFunding - 100) > 0.01) {
    errors.push(
      lang === 'fr'
        ? 'Le total des appels de fonds doit être égal à 100%'
        : 'Funding schedule must total 100%'
    );
  }

  return errors;
}