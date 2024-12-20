import React from 'react';
import { motion } from 'framer-motion';
import { gradients } from '../../styles/colors';

interface TimelineProgressProps {
  progress: number;
}

export function TimelineProgress({ progress }: TimelineProgressProps) {
  return (
    <div className="absolute left-0 right-0 h-1 top-[5.5rem]">
      <div className="absolute inset-0 bg-gray-100" />
      <motion.div 
        className={`absolute h-full left-0 ${gradients.progress}`}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}