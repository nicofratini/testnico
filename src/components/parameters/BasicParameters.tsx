import React from 'react';
import { Euro, TrendingUp, CreditCard } from 'lucide-react';
import { useTranslation } from '../../i18n';
import type { SimulationParameters } from '../../types';

interface BasicParametersProps {
  parameters: SimulationParameters;
  onChange: (field: keyof SimulationParameters, value: number | boolean) => void;
  lang: 'fr' | 'en';
}

export function BasicParameters({ parameters, onChange, lang }: BasicParametersProps) {
  const { t } = useTranslation(lang);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Initial Amount with modern slider */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Euro className="w-5 h-5 text-blue-600" />
          {t('parameters.initialCapital')}
        </label>
        <div className="relative mt-2">
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={parameters.initialCapital}
            onChange={(e) => onChange('initialCapital', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="mt-2 text-center font-medium text-blue-600">
            {formatCurrency(parameters.initialCapital)}
          </div>
        </div>
      </div>

      {/* Number of Cycles with modern buttons */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          {t('parameters.numberOfCycles')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((cycles) => (
            <button
              key={cycles}
              onClick={() => onChange('numberOfCycles', cycles)}
              className={`
                px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${parameters.numberOfCycles === cycles
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {cycles} {t('common.cycle')}
              <span className="block text-xs mt-1 opacity-80">
                ({cycles * parameters.cycleDuration} {t('common.month')})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Leverage Toggle with modern switch */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {t('parameters.enableLeverage')}
            </span>
          </div>
          <button
            onClick={() => onChange('leverageEnabled', !parameters.leverageEnabled)}
            className={`
              relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300
              ${parameters.leverageEnabled ? 'bg-blue-600' : 'bg-gray-200'}
            `}
          >
            <span
              className={`
                inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300
                ${parameters.leverageEnabled ? 'translate-x-8' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {parameters.leverageEnabled && (
          <div className="space-y-6 animate-fadeIn">
            {/* Placement Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('parameters.placementRate')}
                </label>
                <span className="text-sm font-medium text-blue-600">
                  {parameters.placementRate}%
                </span>
              </div>
              <input
                type="range"
                value={parameters.placementRate}
                onChange={(e) => onChange('placementRate', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                min="0"
                max="20"
                step="0.1"
              />
            </div>

            {/* LTV Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('parameters.ltv')}
                </label>
                <span className="text-sm font-medium text-blue-600">
                  {parameters.leverageRatio}%
                </span>
              </div>
              <input
                type="range"
                value={parameters.leverageRatio}
                onChange={(e) => onChange('leverageRatio', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                min="0"
                max="100"
                step="1"
              />
            </div>

            {/* Credit Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {t('parameters.creditRate')}
                </label>
                <span className="text-sm font-medium text-blue-600">
                  {parameters.creditRate}%
                </span>
              </div>
              <input
                type="range"
                value={parameters.creditRate}
                onChange={(e) => onChange('creditRate', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                min="0"
                max="20"
                step="0.1"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}