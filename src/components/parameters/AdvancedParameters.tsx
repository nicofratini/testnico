import React from 'react';
import { Clock } from 'lucide-react';
import { FundingSchedule } from './FundingSchedule';
import { useTranslation } from '../../i18n';
import type { SimulationParameters } from '../../types';

interface AdvancedParametersProps {
  parameters: SimulationParameters;
  onChange: (field: keyof SimulationParameters, value: any) => void;
  lang: 'fr' | 'en';
}

export function AdvancedParameters({ parameters, onChange, lang }: AdvancedParametersProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-800">
          {t('parameters.advanced.title')}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('parameters.advanced.cycleDuration')}
          </label>
          <input
            type="number"
            min="1"
            max="120"
            value={parameters.cycleDuration}
            onChange={(e) => onChange('cycleDuration', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('parameters.advanced.saleMargin')}
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={parameters.saleMargin}
            onChange={(e) => onChange('saleMargin', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <FundingSchedule
        phases={parameters.fundingPhases}
        onChange={(phases) => onChange('fundingPhases', phases)}
        lang={lang}
      />
    </div>
  );
}