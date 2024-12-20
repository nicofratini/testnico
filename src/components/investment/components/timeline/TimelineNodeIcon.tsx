import React from 'react';
import { motion } from 'framer-motion';
import type { Phase } from '../../types';

interface TimelineNodeIconProps {
  phase: Phase;
  isActive: boolean;
}

export function TimelineNodeIcon({ phase, isActive }: TimelineNodeIconProps) {
  const Icon = phase.icon;

  return (
    <motion.div
      className={`
        w-14 h-14 rounded-full flex items-center justify-center
        transition-all duration-300 shadow-lg relative z-10
        ${isActive ? phase.color : 'bg-white border-2 border-gray-200'}
        ${!isActive && 'group-hover:border-gray-300 group-hover:scale-105'}
      `}
      whileHover={{ scale: isActive ? 1 : 1.1 }}
    >
      <Icon 
        className={`
          w-6 h-6 
          ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}
        `} 
      />
    </motion.div>
  );
}