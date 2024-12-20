import React from 'react';
import { Calendar } from 'lucide-react';
import { useTranslation } from '../../../../i18n';

interface FlowPeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  availablePeriods: string[];
  lang: 'fr' | 'en';
}

export function FlowPeriodSelector({ 
  selectedPeriod, 
  onPeriodChange, 
  availablePeriods,
  lang 
}: FlowPeriodSelectorProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-gray-500" />
      <select
        value={selectedPeriod}
        onChange={(e) => onPeriodChange(e.target.value)}
        className="text-sm bg-transparent border-none focus:ring-0 text-gray-700 font-medium"
      >
        {availablePeriods.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
    </div>
  );
}