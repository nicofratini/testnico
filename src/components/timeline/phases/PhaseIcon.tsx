
import React from 'react';
import { motion } from 'framer-motion';
import type { Phase } from '../types';

interface PhaseIconProps {
  phase: Phase;
  isActive: boolean;
}

export function PhaseIcon({ phase, isActive }: PhaseIconProps) {
  const Icon = phase.icon;

  return (
    <motion.div
      className={`
        w-20 h-20 rounded-full flex items-center justify-center
        transition-all duration-300 shadow-lg z-10
        ${isActive ? phase.color : 'bg-white border-2 border-gray-200 group-hover:border-gray-300'}
      `}
      whileHover={{ scale: 1.05 }}
      animate={{ 
        scale: isActive ? 1.1 : 1,
        y: isActive ? -4 : 0
      }}
    >
      <Icon className={`w-10 h-10 ${
        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
      }`} />
    </motion.div>
  );
}
