import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../../utils/formatters';
import type { Phase } from '../../types';

interface PhaseLabelProps {
  phase: Phase;
  isActive: boolean;
  index: number;
  lang: 'fr' | 'en';
}

export function PhaseLabel({ phase, isActive, index, lang }: PhaseLabelProps) {
  return (
    <motion.div
      className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-56 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 + 0.2 }}
    >
      <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
        isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
      }`}>
        {phase.title}
      </h3>
      <p className={`text-base font-medium transition-colors duration-300 ${
        isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
      }`}>
        {formatCurrency(phase.amount, lang)}
      </p>
    </motion.div>
  );
}