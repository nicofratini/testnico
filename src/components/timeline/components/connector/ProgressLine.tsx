import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_THEME } from '../../styles/theme';

interface ProgressLineProps {
  progress: number;
}

export function ProgressLine({ progress }: ProgressLineProps) {
  return (
    <motion.div
      className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${TIMELINE_THEME.colors.gradient}`}
      initial={{ width: '0%' }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: TIMELINE_THEME.animations.duration }}
    />
  );
}