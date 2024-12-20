import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_CONSTANTS } from '../../styles/constants';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <motion.div
      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
      initial={{ width: '0%' }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: TIMELINE_CONSTANTS.animations.duration }}
    />
  );
}