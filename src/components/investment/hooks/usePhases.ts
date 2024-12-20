import { useMemo } from 'react';
import { getPhaseConfig } from '../constants';
import type { SimulationResult } from '../../../types';
import { useTranslation } from '../../../i18n';
import { formatPercent } from '../../../utils/formatters';

export function usePhases(results: SimulationResult, lang: 'fr' | 'en') {
  const { t } = useTranslation(lang);
  
  return useMemo(() => 
    getPhaseConfig(results, t, formatPercent, lang),
    [results, t, lang]
  );
}