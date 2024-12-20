
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineBaseProps {
  progress: number;
}

export function TimelineBase({ progress }: TimelineBaseProps) {
  return (
    <div className="absolute inset-x-0 top-8 h-2 -z-10">
      {/* Base line */}
      <div className="w-full h-full bg-gray-200 rounded-full" />
      
      {/* Progress line */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
