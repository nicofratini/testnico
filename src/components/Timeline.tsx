import React, { useState } from 'react';
import { Calendar, TrendingUp, ArrowRight, PiggyBank } from 'lucide-react';
import type { TimelineEvent } from '../types';
import { useTranslation } from '../i18n';
import { formatCurrency } from '../utils/formatters';

interface TimelineProps {
  events: TimelineEvent[];
  cycleLength: number;
  lang?: 'fr' | 'en';
}

export function Timeline({ events, cycleLength, lang = 'fr' }: TimelineProps) {
  const { t } = useTranslation(lang);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const totalMonths = events[events.length - 1]?.month || 0;
  
  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">{t('timeline.title')}</h3>
      
      <div className="relative">
        {/* Timeline base line */}
        <div className="absolute h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-green-400 left-0 right-0 top-16" />

        {/* Events */}
        <div className="relative flex justify-between min-h-[8rem]">
          {events.map((event, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                left: `${(event.month / totalMonths) * 100}%`,
                position: 'absolute',
                transform: 'translateX(-50%)',
              }}
              onMouseEnter={() => setHoveredEvent(index)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {/* Event marker */}
              <div 
                className={`w-4 h-4 rounded-full transition-transform duration-200 ${
                  hoveredEvent === index ? 'scale-150' : ''
                } ${
                  event.type === 'funding' ? 'bg-blue-500' : 'bg-green-500'
                } relative z-10 ${
                  hoveredEvent === index ? 'animate-pulse' : ''
                }`}
              >
                {/* Event icon */}
                <div className={`absolute -top-8 transition-all duration-300 ${
                  hoveredEvent === index ? '-translate-y-1' : ''
                }`}>
                  {event.type === 'funding' ? (
                    <PiggyBank className="w-5 h-5 text-blue-500" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>

              {/* Month label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
                {t('timeline.month')} {event.month + 1}
              </div>

              {/* Tooltip */}
              <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                transition-all duration-200 ${
                  hoveredEvent === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }
                bg-gray-800 text-white text-sm rounded-lg py-2 px-3 w-48 shadow-xl`}
              >
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
          ))}
        </div>

        {/* Cycle separators */}
        {Array.from({ length: Math.floor(totalMonths / cycleLength) }).map((_, index) => (
          <div
            key={index}
            className="absolute top-14 bottom-0 w-px bg-gray-300 opacity-50 transition-opacity duration-200 hover:opacity-100"
            style={{
              left: `${((index + 1) * cycleLength / totalMonths) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}