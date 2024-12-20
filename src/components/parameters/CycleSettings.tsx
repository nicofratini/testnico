import React, { useState } from 'react';
import { X, Plus, Trash2, Clock, TrendingUp, Save } from 'lucide-react';
import { useTranslation } from '../../i18n';
import type { FundingPhase, SimulationParameters } from '../../types';

interface CycleSettingsProps {
  onClose: () => void;
  onSave: (updates: Partial<SimulationParameters>) => void;
  lang: 'fr' | 'en';
  cycleDuration: number;
  saleMargin: number;
  fundingPhases: FundingPhase[];
}

export function CycleSettings({ 
  onClose, 
  onSave,
  lang,
  cycleDuration: initialCycleDuration,
  saleMargin: initialSaleMargin,
  fundingPhases: initialFundingPhases
}: CycleSettingsProps) {
  const { t } = useTranslation(lang);
  const [localCycleDuration, setLocalCycleDuration] = useState(initialCycleDuration);
  const [localSaleMargin, setLocalSaleMargin] = useState(initialSaleMargin);
  const [localPhases, setLocalPhases] = useState<FundingPhase[]>(initialFundingPhases);

  const addPhase = () => {
    const lastPhase = localPhases[localPhases.length - 1];
    const newMonth = lastPhase ? lastPhase.month + 3 : 0;
    setLocalPhases([...localPhases, { 
      month: newMonth, 
      percentage: 0, 
      description: '' 
    }]);
  };

  const removePhase = (index: number) => {
    setLocalPhases(localPhases.filter((_, i) => i !== index));
  };

  const updatePhase = (index: number, field: keyof FundingPhase, value: string | number) => {
    const newPhases = [...localPhases];
    newPhases[index] = { ...newPhases[index], [field]: value };
    setLocalPhases(newPhases);
  };

  const handleSave = () => {
    onSave({
      cycleDuration: localCycleDuration,
      saleMargin: localSaleMargin,
      fundingPhases: localPhases
    });
  };

  const totalPercentage = localPhases.reduce((sum, phase) => sum + phase.percentage, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {t('parameters.cycleSettings')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Cycle Duration */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Clock className="w-4 h-4" />
              {t('parameters.cycleDuration')}
            </label>
            <input
              type="number"
              value={localCycleDuration}
              onChange={(e) => setLocalCycleDuration(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min={12}
              max={60}
            />
            <p className="mt-1 text-sm text-gray-500">
              {t('parameters.cycleDurationHelp')}
            </p>
          </div>

          {/* Sale Margin */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <TrendingUp className="w-4 h-4" />
              {t('parameters.saleMargin')}
            </label>
            <input
              type="number"
              value={localSaleMargin}
              onChange={(e) => setLocalSaleMargin(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min={0}
              max={100}
              step={0.1}
            />
            <p className="mt-1 text-sm text-gray-500">
              {t('parameters.saleMarginHelp')}
            </p>
          </div>

          {/* Funding Phases */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">
                {t('parameters.fundingPhases')}
              </h3>
              <button
                onClick={addPhase}
                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('parameters.addPhase')}
              </button>
            </div>

            <div className="space-y-3">
              {localPhases.map((phase, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('parameters.month')}
                    </label>
                    <input
                      type="number"
                      value={phase.month}
                      onChange={(e) => updatePhase(index, 'month', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min={0}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('parameters.percentage')}
                    </label>
                    <input
                      type="number"
                      value={phase.percentage}
                      onChange={(e) => updatePhase(index, 'percentage', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min={0}
                      max={100}
                      step={0.1}
                    />
                  </div>
                  <div className="flex-[2]">
                    <label className="block text-xs text-gray-500 mb-1">
                      {t('parameters.description')}
                    </label>
                    <input
                      type="text"
                      value={phase.description}
                      onChange={(e) => updatePhase(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => removePhase(index)}
                    className="mt-6 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {t('parameters.totalPercentage')}: {totalPercentage}%
              </p>
              {Math.abs(totalPercentage - 100) > 0.01 && (
                <p className="text-sm text-red-500">
                  {t('parameters.advanced.totalNote')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
}