import React from 'react';
import { useTranslation } from '../../../i18n';
import { formatCurrency } from '../../../utils/formatters';
import type { TimelineEvent } from '../../../types';

interface TimelineTooltipProps {
  event: TimelineEvent;
  lang: 'fr' | 'en';
}

export function TimelineTooltip({ event, lang }: TimelineTooltipProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2">
      <div className="bg-gray-800 text-white text-sm rounded-lg py-2 px-3 shadow-xl">
        <div className="text-xs font-semibold mb-1">
          {t('timeline.cycle')} {event.cycleIndex + 1} - {t(`timeline.${event.type}`)}
        </div>
        {event.type === 'funding' ? (
          <>
            <div>{t('timeline.equity')}: {formatCurrency(event.details.equity || 0, lang)}</div>
            <div>{t('timeline.leverage')}: {formatCurrency(event.details.leverage || 0, lang)}</div>
          </>
        ) : (
          <>
            <div>{t('timeline.saleAmount')}: {formatCurrency(event.amount, lang)}</div>
            <div>{t('timeline.profit')}: {formatCurrency(event.details.profit || 0, lang)}</div>
          </>
        )}
        <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5" />
      </div>
    </div>
  );
}