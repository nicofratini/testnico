import React from 'react';
import { BarChart, LineChart, PieChart, Settings } from 'lucide-react';
import { useTranslation } from '../../../../i18n';

interface FlowDisplayOptionsProps {
  view: 'bar' | 'line' | 'distribution';
  onViewChange: (view: 'bar' | 'line' | 'distribution') => void;
  showDetails: boolean;
  onToggleDetails: () => void;
  lang: 'fr' | 'en';
}

export function FlowDisplayOptions({
  view,
  onViewChange,
  showDetails,
  onToggleDetails,
  lang
}: FlowDisplayOptionsProps) {
  const { t } = useTranslation(lang);

  const views = [
    { id: 'bar', icon: <BarChart className="w-4 h-4" />, label: t('flows.barView') },
    { id: 'line', icon: <LineChart className="w-4 h-4" />, label: t('flows.lineView') },
    { id: 'distribution', icon: <PieChart className="w-4 h-4" />, label: t('flows.distributionView') }
  ] as const;

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {views.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => onViewChange(id as 'bar' | 'line' | 'distribution')}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
              transition-colors
              ${view === id 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onToggleDetails}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
          transition-colors
          ${showDetails 
            ? 'bg-blue-100 text-blue-700' 
            : 'text-gray-600 hover:bg-gray-100'
          }
        `}
      >
        <Settings className="w-4 h-4" />
        {showDetails ? t('flows.hideDetails') : t('flows.showDetails')}
      </button>
    </div>
  );
}