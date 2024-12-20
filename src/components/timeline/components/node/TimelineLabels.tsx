import React from 'react';
import { formatCurrency } from '../../../../utils/formatters';
import type { Phase } from '../../types';

interface TimelineLabelsProps {
  phase: Phase;
  isActive: boolean;
  lang: 'fr' | 'en';
}

export function TimelineLabels({ phase, isActive, lang }: TimelineLabelsProps) {
  return (
    <>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 text-center">
        <span className={`
          text-sm font-medium transition-colors
          ${isActive ? 'text-gray-900' : 'text-gray-600'}
        `}>
          {formatCurrency(phase.amount, lang)}
        </span>
      </div>

      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 text-center">
        <span className={`
          text-sm font-medium transition-colors
          ${isActive ? 'text-gray-900' : 'text-gray-600'}
        `}>
          {phase.title}
        </span>
      </div>
    </>
  );
}