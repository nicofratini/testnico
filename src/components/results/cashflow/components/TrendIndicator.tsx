import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useTranslation } from '../../../../i18n';
import { formatPercent } from '../../../../utils/formatters';

interface TrendIndicatorProps {
  direction: 'up' | 'down' | 'stable';
  percentage: number;
  lang: 'fr' | 'en';
}

export function TrendIndicator({ direction, percentage, lang }: TrendIndicatorProps) {
  const { t } = useTranslation(lang);

  const config = {
    up: {
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    down: {
      icon: <TrendingDown className="w-4 h-4" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    stable: {
      icon: <Minus className="w-4 h-4" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  };

  const { icon, color, bgColor } = config[direction];

  return (
    <div className={`flex items-center gap-2 px-2 py-1 rounded-full ${bgColor} ${color}`}>
      {icon}
      <span className="text-sm font-medium">
        {formatPercent(Math.abs(percentage), lang)}
      </span>
    </div>
  );
}