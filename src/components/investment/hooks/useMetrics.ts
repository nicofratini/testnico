import { useMemo } from 'react';
import type { SimulationResult } from '../../../types';
import { useTranslation } from '../../../i18n';
import { formatPercent } from '../../../utils/formatters';

export function useMetrics(results: SimulationResult, lang: 'fr' | 'en') {
  const { t } = useTranslation(lang);

  return useMemo(() => [
    {
      label: t('investment.metrics.ltv'),
      value: formatPercent(70, lang)
    },
    {
      label: t('investment.metrics.margin'),
      value: formatPercent(28, lang)
    },
    {
      label: t('investment.metrics.roi'),
      value: formatPercent(results.totalReturn, lang)
    }
  ], [results.totalReturn, t, lang]);
}