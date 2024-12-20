import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../../utils/formatters';
import type { Phase } from '../../types';

interface TimelineNodeLabelProps {
  phase: Phase;
  isActive: boolean;
  lang: 'fr' | 'en';
}

export function TimelineNodeLabel({ phase, isActive, lang }: TimelineNodeLabelProps) {
  const textColor = isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700';

  return (
    <motion.div
      className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <p className={`text-sm font-medium text-center transition-colors duration-300 ${textColor}`}>
        {phase.title}
      </p>
      <p className={`text-sm font-semibold text-center transition-colors duration-300 mt-1 ${textColor}`}>
        {formatCurrency(phase.amount, lang)}
      </p>
    </motion.div>
  );
}