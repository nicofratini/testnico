import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number;
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  return (
    <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 0.5,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      />
      
      <motion.div
        className="absolute top-0 right-0 h-full w-8 bg-gradient-to-r from-transparent to-white/20"
        animate={{
          x: [0, 100],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ left: `${progress - 4}%` }}
      />
    </div>
  );
}