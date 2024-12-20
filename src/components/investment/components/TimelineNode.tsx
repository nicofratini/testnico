import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/formatters';
import type { Phase } from '../types';

interface TimelineNodeProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function TimelineNode({ phase, index, isActive, onClick }: TimelineNodeProps) {
  const Icon = phase.icon;

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
    >
      {/* Icon circle */}
      <motion.div
        className={`
          w-14 h-14 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-lg z-10
          ${isActive ? phase.color : 'bg-white border-2 border-gray-200'}
          ${!isActive && 'group-hover:border-gray-300 group-hover:scale-105'}
        `}
        whileHover={{ scale: isActive ? 1 : 1.1 }}
      >
        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
      </motion.div>

      {/* Label */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 text-center">
        <p className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
          {phase.title}
        </p>
      </div>

      {/* Amount */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 text-center">
        <p className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
          {formatCurrency(phase.amount, 'fr')}
        </p>
      </div>
    </motion.div>
  );
}