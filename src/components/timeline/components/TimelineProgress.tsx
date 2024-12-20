import React from 'react';
import { motion } from 'framer-motion';

interface TimelineProgressProps {
  progress: number;
}

export function TimelineProgress({ progress }: TimelineProgressProps) {
  return (
    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
      {/* Barre de progression avec gradient et animation */}
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {/* Effet de brillance */}
      <motion.div
        className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        animate={{
          left: ['0%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ left: `${progress - 5}%` }}
      />
    </div>
  );
}