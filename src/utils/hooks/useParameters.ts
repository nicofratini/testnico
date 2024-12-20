import { useState, useCallback } from 'react';
import type { SimulationParameters } from '../../types';
import { DEFAULT_PARAMETERS } from '../constants';
import { validateParameters } from '../validation';

export function useParameters() {
  const [parameters, setParameters] = useState<SimulationParameters>(DEFAULT_PARAMETERS);
  const [errors, setErrors] = useState<string[]>([]);

  const updateParameter = useCallback((
    field: keyof SimulationParameters,
    value: number | number[]
  ) => {
    const newParameters = { ...parameters, [field]: value };
    const validationErrors = validateParameters(newParameters);
    setErrors(validationErrors);
    setParameters(newParameters);
  }, [parameters]);

  return {
    parameters,
    errors,
    updateParameter,
    isValid: errors.length === 0
  };
}