import React from 'react';
import { useTranslation } from '../../i18n';
import type { FundingPhase } from '../../types';

interface FundingScheduleProps {
  phases: FundingPhase[];
  onChange: (phases: FundingPhase[]) => void;
  lang: 'fr' | 'en';
}

export function FundingSchedule({ phases = [], onChange, lang }: FundingScheduleProps) {
  const { t } = useTranslation(lang);

  const handlePhaseChange = (index: number, field: keyof FundingPhase, value: string | number) => {
    const newPhases = [...phases];
    newPhases[index] = { ...newPhases[index], [field]: value };
    onChange(newPhases);
  };

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {t('parameters.advanced.fundingSchedule')}
      </label>
      <div className="space-y-3">
        {phases.map((phase, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {t('parameters.month')}
              </label>
              <input
                type="number"
                min={0}
                value={phase.month}
                onChange={(e) => handlePhaseChange(index, 'month', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {t('parameters.percentage')}
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={phase.percentage}
                onChange={(e) => handlePhaseChange(index, 'percentage', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                {t('parameters.description')}
              </label>
              <input
                type="text"
                value={phase.description}
                onChange={(e) => handlePhaseChange(index, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-500">
        {t('parameters.advanced.totalNote')}
      </p>
    </div>
  );
}