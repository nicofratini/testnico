
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineDotsProps {
  totalPhases: number;
  activePhase: number | null;
}

export function TimelineDots({ totalPhases, activePhase }: TimelineDotsProps) {
  return (
    <div className="absolute inset-x-12 top-7 flex justify-between -z-5">
      {Array.from({ length: totalPhases }).map((_, index) => (
        <motion.div
          key={index}
          className={`
            w-4 h-4 rounded-full border-2 border-white shadow-lg
            transition-colors duration-300
            ${index <= (activePhase ?? -1)
              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
              : 'bg-gray-200'
            }
          `}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  );
}
