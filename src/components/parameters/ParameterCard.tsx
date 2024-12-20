import React from 'react';
import { Settings } from 'lucide-react';
import { BasicParameters } from './BasicParameters';
import { useTranslation } from '../../i18n';
import type { SimulationParameters } from '../../types';

interface ParameterCardProps {
  parameters: SimulationParameters;
  onParametersChange: (field: keyof SimulationParameters, value: number | boolean) => void;
  lang: 'fr' | 'en';
}

export function ParameterCard({ parameters, onParametersChange, lang }: ParameterCardProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">
          {t('parameters.title')}
        </h2>
      </div>

      <BasicParameters
        parameters={parameters}
        onChange={onParametersChange}
        lang={lang}
      />
    </div>
  );
}