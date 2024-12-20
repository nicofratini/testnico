import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface FlowControlsProps {
  isExpanded: boolean;
  onToggle: () => void;
  totalFlows: number;
  lang: 'fr' | 'en';
}

export function FlowControls({ isExpanded, onToggle, totalFlows, lang }: FlowControlsProps) {
  const { t } = useTranslation(lang);

  if (totalFlows <= 5) return null;

  return (
    <button
      onClick={onToggle}
      className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-blue-600 hover:text-blue-700 transition-colors"
    >
      {isExpanded ? (
        <>
          <ChevronUp className="w-4 h-4" />
          {t('common.showLess')}
        </>
      ) : (
        <>
          <ChevronDown className="w-4 h-4" />
          {t('common.showMore')}
        </>
      )}
    </button>
  );
}