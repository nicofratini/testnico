import React from 'react';
import { Clock, Percent } from 'lucide-react';
import type { FundingSchedule } from '../utils/types';

interface AdvancedParametersProps {
  cycleDuration: number;
  saleMargin: number;
  fundingSchedule: number[];
  onUpdate: (field: string, value: number | number[]) => void;
}

export function AdvancedParameters({ 
  cycleDuration, 
  saleMargin, 
  fundingSchedule, 
  onUpdate 
}: AdvancedParametersProps) {
  const handleScheduleChange = (index: number, value: number) => {
    const newSchedule = [...fundingSchedule];
    newSchedule[index] = value;
    onUpdate('fundingSchedule', newSchedule);
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium text-gray-800">Advanced Parameters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cycle Duration (months)
          </label>
          <input
            type="number"
            min="1"
            max="120"
            value={cycleDuration}
            onChange={(e) => onUpdate('cycleDuration', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sale Margin (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={saleMargin}
            onChange={(e) => onUpdate('saleMargin', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Funding Schedule (%)
        </label>
        <div className="grid grid-cols-3 gap-4">
          {fundingSchedule.map((percentage, index) => (
            <div key={index}>
              <label className="block text-xs text-gray-500 mb-1">
                Phase {index + 1}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={percentage}
                onChange={(e) => handleScheduleChange(index, Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Total should equal 100%. Each phase represents a portion of the total investment.
        </p>
      </div>
    </div>
  );
}