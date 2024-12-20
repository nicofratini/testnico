import React from 'react';
import { motion } from 'framer-motion';
import { usePhaseProgress } from '../../hooks/usePhaseProgress';
import { TIMELINE_THEME } from '../../styles/theme';

interface PhaseProgressProps {
  isActive: boolean;
  duration?: number;
}

export function PhaseProgress({ isActive, duration }: PhaseProgressProps) {
  const progress = usePhaseProgress(isActive, duration);

  return (
    <div className="absolute -bottom-2 left-0 right-0 h-1">
      <div className="h-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${TIMELINE_THEME.gradients.progress}`}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}