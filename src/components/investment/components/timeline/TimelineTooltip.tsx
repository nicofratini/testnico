import React from 'react';
import { motion } from 'framer-motion';
import type { Phase } from '../../types';

interface TimelineTooltipProps {
  phase: Phase;
  isVisible: boolean;
}

export function TimelineTooltip({ phase, isVisible }: TimelineTooltipProps) {
  return (
    <motion.div
      className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 bg-gray-800 text-white p-4 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10
      }}
      transition={{ duration: 0.2 }}
    >
      <p className="text-sm mb-2">{phase.description}</p>
      <ul className="space-y-1">
        {phase.details.map((detail, i) => (
          <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-400" />
            {detail}
          </li>
        ))}
      </ul>
      <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5" />
    </motion.div>
  );
}