import React from 'react';
import { motion } from 'framer-motion';

interface TimelineConnectorProps {
  progress: number;
}

export function TimelineConnector({ progress }: TimelineConnectorProps) {
  return (
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
      <div className="h-1 w-full bg-gray-100 rounded-full relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ left: `${progress - 5}%` }}
        />
      </div>
    </div>
  );
}