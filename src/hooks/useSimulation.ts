import { useState, useCallback } from 'react';
import type { SimulationParameters } from '../types';
import { calculateInvestmentResults } from '../utils/calculations';
import { DEFAULT_PARAMETERS } from '../utils/constants';

export function useSimulation() {
  const [parameters, setParameters] = useState<SimulationParameters>(DEFAULT_PARAMETERS);
  
  const updateParameters = useCallback((
    field: keyof SimulationParameters,
    value: number | boolean | any[]
  ) => {
    setParameters(prev => ({ ...prev, [field]: value }));
  }, []);

  const results = calculateInvestmentResults(parameters);

  return {
    parameters,
    results,
    updateParameters
  };
}