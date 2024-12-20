
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineConnectorProps {
  activePhase: number | null;
  totalPhases: number;
}

export function TimelineConnector({ activePhase, totalPhases }: TimelineConnectorProps) {
  const progress = activePhase !== null ? ((activePhase + 1) / totalPhases) * 100 : 0;

  return (
    <div className="absolute left-24 right-24 top-12 -z-10">
      {/* Base line */}
      <div className="h-2 bg-gray-100 w-full rounded-full overflow-hidden" />
      
      {/* Progress line */}
      <motion.div
        className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Glow effect */}
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
        style={{
          left: `${progress - 4}%`
        }}
      />
      
      {/* Connection dots */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between">
        {Array.from({ length: totalPhases }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-5 h-5 rounded-full border-3 border-white shadow-lg ${
              index <= (activePhase ?? -1) ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}
