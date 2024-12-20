import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../i18n';
import { TimelineMilestone } from './TimelineMilestone';
import { TimelineConnector } from './TimelineConnector';
import type { TimelineEvent } from '../../../types';

interface TimelinePathProps {
  events: TimelineEvent[];
  lang: 'fr' | 'en';
}

export function TimelinePath({ events, lang }: TimelinePathProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-8">
        {t('timeline.title')}
      </h3>

      <div className="relative">
        {/* Main timeline path */}
        <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-200 via-blue-400 to-green-400" />

        {/* Timeline events */}
        <div className="relative flex justify-between min-h-[12rem]">
          {events.map((event, index) => (
            <React.Fragment key={index}>
              <TimelineMilestone event={event} index={index} lang={lang} />
              {index < events.length - 1 && (
                <TimelineConnector />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}