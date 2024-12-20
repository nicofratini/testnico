import React from 'react';
import { Filter, X } from 'lucide-react';
import { useTranslation } from '../../../../i18n';

interface FlowAdvancedFiltersProps {
  filters: {
    types: string[];
    minAmount: number | null;
    maxAmount: number | null;
    dateRange: [string | null, string | null];
  };
  onFilterChange: (filters: any) => void;
  lang: 'fr' | 'en';
}

export function FlowAdvancedFilters({
  filters,
  onFilterChange,
  lang
}: FlowAdvancedFiltersProps) {
  const { t } = useTranslation(lang);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleTypeToggle = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFilterChange({ ...filters, types: newTypes });
  };

  const handleReset = () => {
    onFilterChange({
      types: [],
      minAmount: null,
      maxAmount: null,
      dateRange: [null, null]
    });
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">{t('flows.advancedFilters')}</span>
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-700">
              {t('flows.filterOptions')}
            </h4>
            <button
              onClick={handleReset}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              {t('flows.resetFilters')}
            </button>
          </div>

          <div className="space-y-4">
            {/* Amount Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t('flows.minAmount')}
                </label>
                <input
                  type="number"
                  value={filters.minAmount || ''}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    minAmount: e.target.value ? Number(e.target.value) : null
                  })}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t('flows.maxAmount')}
                </label>
                <input
                  type="number"
                  value={filters.maxAmount || ''}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    maxAmount: e.target.value ? Number(e.target.value) : null
                  })}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t('flows.startDate')}
                </label>
                <input
                  type="date"
                  value={filters.dateRange[0] || ''}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    dateRange: [e.target.value, filters.dateRange[1]]
                  })}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t('flows.endDate')}
                </label>
                <input
                  type="date"
                  value={filters.dateRange[1] || ''}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    dateRange: [filters.dateRange[0], e.target.value]
                  })}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}