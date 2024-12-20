import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../../utils/formatters';
import { SPRING } from '../../animations/spring';
import type { Phase } from '../../types';

interface PhaseTooltipProps {
  phase: Phase;
  lang: 'fr' | 'en';
}

export function PhaseTooltip({ phase, lang }: PhaseTooltipProps) {
  return (
    <motion.div
      className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-gray-800 text-white p-4 rounded-lg shadow-xl z-50"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={SPRING.gentle}
    >
      <p className="text-sm mb-2">{phase.description}</p>
      <div className="text-sm font-medium">
        {formatCurrency(phase.amount, lang)}
      </div>
      <div className="mt-2 space-y-1">
        {phase.details.map((detail, index) => (
          <motion.div
            key={index}
            className="text-xs text-gray-300 flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            {detail}
          </motion.div>
        ))}
      </div>
      <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5" />
    </motion.div>
  );
}