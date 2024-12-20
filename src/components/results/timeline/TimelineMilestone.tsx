import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, TrendingUp } from 'lucide-react';
import { useTranslation } from '../../../i18n';
import { formatCurrency } from '../../../utils/formatters';
import { TimelineTooltip } from './TimelineTooltip';
import type { TimelineEvent } from '../../../types';

interface TimelineMilestoneProps {
  event: TimelineEvent;
  index: number;
  lang: 'fr' | 'en';
}

export function TimelineMilestone({ event, index, lang }: TimelineMilestoneProps) {
  const { t } = useTranslation(lang);
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Icon */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center
        ${event.type === 'funding' ? 'bg-blue-500' : 'bg-green-500'}
        shadow-lg relative z-10
      `}>
        {event.type === 'funding' ? (
          <PiggyBank className="w-5 h-5 text-white" />
        ) : (
          <TrendingUp className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-sm text-gray-600">
          {t('timeline.month')} {event.month + 1}
        </span>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <TimelineTooltip event={event} lang={lang} />
      )}
    </motion.div>
  );
}