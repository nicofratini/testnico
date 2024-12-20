import React from 'react';
import { motion } from 'framer-motion';
import type { Phase } from '../types';

interface PhaseProgressProps {
  phases: Phase[];
  activePhase: number;
}

export function PhaseProgress({ phases, activePhase }: PhaseProgressProps) {
  return (
    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
        initial={{ width: '0%' }}
        animate={{ width: `${((activePhase + 1) / phases.length) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}