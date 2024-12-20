import React from 'react';
import { motion } from 'framer-motion';
import type { Phase } from '../../types';
import { phaseVariants } from '../../animations/variants';

interface PhaseIconProps {
  phase: Phase;
  isActive: boolean;
}

export function PhaseIcon({ phase, isActive }: PhaseIconProps) {
  const Icon = phase.icon;

  return (
    <motion.div
      className={`
        w-24 h-24 rounded-full flex items-center justify-center
        transition-all duration-300 shadow-lg
        ${isActive ? phase.color : 'bg-white border-2 border-gray-200 group-hover:border-gray-300'}
      `}
      variants={phaseVariants}
      animate={isActive ? 'active' : 'animate'}
    >
      <Icon className={`w-12 h-12 ${
        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
      }`} />
    </motion.div>
  );
}