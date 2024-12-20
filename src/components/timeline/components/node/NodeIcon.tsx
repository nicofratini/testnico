import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_CONSTANTS } from '../../styles/constants';
import type { Phase } from '../../types';

interface NodeIconProps {
  phase: Phase;
  isActive: boolean;
}

export function NodeIcon({ phase, isActive }: NodeIconProps) {
  const Icon = phase.icon;
  const { icon } = TIMELINE_CONSTANTS.spacing.node;
  
  return (
    <motion.div
      className={`
        ${icon.size} rounded-full flex items-center justify-center
        transition-all duration-500 transform cursor-pointer
        ${isActive ? `
          ${phase.color} scale-110 ${TIMELINE_CONSTANTS.colors.glow}
        ` : `
          bg-white border-2 border-gray-200 hover:border-gray-300
          hover:scale-105 hover:shadow-lg
        `}
      `}
      whileHover={{ scale: isActive ? 1.15 : 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className={`
        ${icon.inner} transition-all duration-300
        ${isActive ? 'text-white scale-110' : 'text-gray-500 group-hover:text-gray-700'}
      `} />
    </motion.div>
  );
}