import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { FlowTable } from './FlowTable';
import { FlowSummary } from './FlowSummary';
import type { MonthlyFlow } from '../../types';

interface DetailedFlowsProps {
  flows: MonthlyFlow[];
  lang: 'fr' | 'en';
}

export function DetailedFlows({ flows, lang }: DetailedFlowsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation(lang);
  const displayedFlows = isExpanded ? flows : flows.slice(0, 12);

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {t('flows.title')}
      </h3>

      <FlowSummary flows={flows} lang={lang} />
      <FlowTable flows={displayedFlows} lang={lang} />

      {flows.length > 12 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
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
      )}
    </div>
  );
}