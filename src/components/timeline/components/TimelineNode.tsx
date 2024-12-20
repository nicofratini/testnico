import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/formatters';
import type { Phase } from '../types';

interface TimelineNodeProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
  lang: 'fr' | 'en';
}

export function TimelineNode({ phase, index, isActive, onClick, lang }: TimelineNodeProps) {
  const Icon = phase.icon;

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      onClick={onClick}
    >
      <motion.div
        className={`
          w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
          shadow-lg transition-all duration-300 relative z-10
          ${isActive ? `${phase.color} scale-110` : 'bg-white border-2 border-gray-200 hover:border-gray-300'}
        `}
        whileHover={{ scale: isActive ? 1.15 : 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className={`w-8 h-8 md:w-10 md:h-10 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
      </motion.div>

      <motion.div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 md:w-40 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 0.1 }}
      >
        <span className={`text-sm md:text-base font-medium ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'}`}>
          {formatCurrency(phase.amount, lang)}
        </span>
      </motion.div>

      <motion.div
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 md:w-40 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 0.1 }}
      >
        <span className={`text-sm md:text-base font-medium ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'}`}>
          {phase.title}
        </span>
      </motion.div>
    </motion.div>
  );
}