import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/formatters';
import type { Phase } from '../types';

interface TimelinePhaseProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
  lang: 'fr' | 'en';
}

export function TimelinePhase({ phase, index, isActive, onClick, lang }: TimelinePhaseProps) {
  const Icon = phase.icon;

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      {/* Icon Circle */}
      <motion.div
        className={`
          w-24 h-24 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-lg
          ${isActive ? phase.color : 'bg-white border-2 border-gray-200 group-hover:border-gray-300'}
        `}
        animate={{ 
          scale: isActive ? 1.1 : 1,
          y: isActive ? -8 : 0
        }}
      >
        <Icon className={`w-12 h-12 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
      </motion.div>

      {/* Label */}
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
    </motion.div>
  );
}