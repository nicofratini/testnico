import { useState, useCallback } from 'react';
import type { SimulationParameters } from '../../types';
import { calculateInvestmentResults } from '../calculations/financialCalculations';
import { DEFAULT_PARAMETERS } from '../constants';

export function useSimulation() {
  const [parameters, setParameters] = useState<SimulationParameters>(DEFAULT_PARAMETERS);
  
  const updateParameters = useCallback((
    field: keyof SimulationParameters,
    value: number | number[]
  ) => {
    setParameters(prev => {
      const newParams = { ...prev, [field]: value };
      return newParams;
    });
  }, []);

  const results = calculateInvestmentResults(parameters);

  return {
    parameters,
    results,
    updateParameters
  };
}