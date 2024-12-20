import React from 'react';
import { LucideIcon } from 'lucide-react';
import { formatCurrency } from '../../../../utils/formatters';

interface FlowSummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
  lang: 'fr' | 'en';
}

export function FlowSummaryCard({ 
  icon, 
  label, 
  value, 
  bgColor, 
  textColor,
  lang 
}: FlowSummaryCardProps) {
  return (
    <div className={`${bgColor} rounded-lg p-4 transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={textColor}>{icon}</div>
        <span className="text-sm font-medium text-gray-600">
          {label}
        </span>
      </div>
      <span className="text-lg font-semibold text-gray-900">
        {formatCurrency(value, lang)}
      </span>
    </div>
  );
}