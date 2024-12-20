import React, { useState } from 'react';
import { Settings, TrendingUp, Percent, PiggyBank, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { AdvancedParameters } from './AdvancedParameters';

interface ParameterCardProps {
  onParametersChange: (parameters: SimulationParameters) => void;
}

export interface SimulationParameters {
  initialCapital: number;
  numberOfCycles: number;
  cycleDuration: number;
  placementRate: number;
  leverageRatio: number;
  creditRate: number;
  saleMargin: number;
  fundingSchedule: number[];
}

const DEFAULT_PARAMETERS: SimulationParameters = {
  initialCapital: 100000,
  numberOfCycles: 3,
  cycleDuration: 24, // Default 24 months
  placementRate: 5,
  leverageRatio: 70,
  creditRate: 4,
  saleMargin: 28, // Default 28%
  fundingSchedule: [25, 50, 25] // Default 3-phase funding
};

export function ParameterCard({ onParametersChange }: ParameterCardProps) {
  const [parameters, setParameters] = useState<SimulationParameters>(DEFAULT_PARAMETERS);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (field: keyof SimulationParameters, value: number | number[]) => {
    const newParameters = { ...parameters, [field]: value };
    setParameters(newParameters);
    onParametersChange(newParameters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Investment Parameters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <PiggyBank className="w-4 h-4" />
              Initial Capital (€)
            </label>
            <input
              type="number"
              value={parameters.initialCapital}
              onChange={(e) => handleChange('initialCapital', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <TrendingUp className="w-4 h-4" />
              Number of Cycles
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={parameters.numberOfCycles}
              onChange={(e) => handleChange('numberOfCycles', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Percent className="w-4 h-4" />
              Placement Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={parameters.placementRate}
              onChange={(e) => handleChange('placementRate', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <CreditCard className="w-4 h-4" />
              Leverage Ratio (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={parameters.leverageRatio}
              onChange={(e) => handleChange('leverageRatio', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Percent className="w-4 h-4" />
              Credit Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={parameters.creditRate}
              onChange={(e) => handleChange('creditRate', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="mt-6 w-full flex items-center justify-center gap-2 py-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        {showAdvanced ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Hide Advanced Parameters
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Show Advanced Parameters
          </>
        )}
      </button>

      {showAdvanced && (
        <AdvancedParameters
          cycleDuration={parameters.cycleDuration}
          saleMargin={parameters.saleMargin}
          fundingSchedule={parameters.fundingSchedule}
          onUpdate={handleChange}
        />
      )}
    </div>
  );
}