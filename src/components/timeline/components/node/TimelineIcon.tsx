import React from 'react';
import { motion } from 'framer-motion';
import type { Phase } from '../../types';

interface TimelineIconProps {
  phase: Phase;
  isActive: boolean;
}

export function TimelineIcon({ phase, isActive }: TimelineIconProps) {
  const Icon = phase.icon;
  
  return (
    <motion.div
      className={`
        w-14 h-14 rounded-full flex items-center justify-center
        shadow-lg z-10 transition-all duration-300
        ${isActive ? phase.color : 'bg-white border-2 border-gray-200 hover:border-gray-300'}
      `}
      whileHover={{ scale: isActive ? 1 : 1.1 }}
    >
      <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-500'}`} />
    </motion.div>
  );
}