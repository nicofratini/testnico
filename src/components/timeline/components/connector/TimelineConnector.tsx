import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_CONSTANTS } from '../../styles/constants';

interface TimelineConnectorProps {
  progress: number;
}

export function TimelineConnector({ progress }: TimelineConnectorProps) {
  return (
    <div className={`w-full rounded-full overflow-hidden relative ${TIMELINE_CONSTANTS.spacing.connector.height}`}>
      {/* Base line */}
      <div className="absolute inset-0 bg-gray-100" />
      
      {/* Progress bar */}
      <motion.div
        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${TIMELINE_CONSTANTS.colors.gradient}`}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: TIMELINE_CONSTANTS.animations.duration }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        animate={{ left: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ left: `${progress - 5}%` }}
      />
    </div>
  );
}