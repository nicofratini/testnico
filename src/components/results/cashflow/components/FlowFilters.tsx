import React from 'react';
import { Filter } from 'lucide-react';
import { useTranslation } from '../../../../i18n';

interface FlowFiltersProps {
  selectedTypes: string[];
  onTypeChange: (types: string[]) => void;
  lang: 'fr' | 'en';
}

export function FlowFilters({ selectedTypes, onTypeChange, lang }: FlowFiltersProps) {
  const { t } = useTranslation(lang);

  const flowTypes = [
    { id: 'funding', label: t('flows.funding') },
    { id: 'sale', label: t('flows.sale') },
    { id: 'interest', label: t('flows.interest') }
  ];

  const toggleType = (typeId: string) => {
    if (selectedTypes.includes(typeId)) {
      onTypeChange(selectedTypes.filter(id => id !== typeId));
    } else {
      onTypeChange([...selectedTypes, typeId]);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2 text-gray-600">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">{t('flows.filters')}</span>
      </div>
      <div className="flex gap-2">
        {flowTypes.map(type => (
          <button
            key={type.id}
            onClick={() => toggleType(type.id)}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${selectedTypes.includes(type.id)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}