
import React from 'react';
import { motion } from 'framer-motion';
import { PhaseImpact } from './PhaseImpact';
import type { Phase } from '../types';

interface PhaseTooltipProps {
  phase: Phase;
  lang: 'fr' | 'en';
}

export function PhaseTooltip({ phase, lang }: PhaseTooltipProps) {
  return (
    <motion.div
      className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 bg-gray-800 text-white p-4 rounded-lg shadow-xl z-50"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-white">
        <PhaseImpact impact={phase.impact} />
      </div>
      <p className="text-sm text-gray-300">{phase.description}</p>
      <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5" />
    </motion.div>
  );
}