
import React from 'react';
import { motion } from 'framer-motion';

interface ConnectorDotsProps {
  totalPhases: number;
  activePhase: number | null;
}

export function ConnectorDots({ totalPhases, activePhase }: ConnectorDotsProps) {
  return (
    <div className="absolute inset-0 flex justify-between items-center px-16">
      {Array.from({ length: totalPhases }).map((_, index) => (
        <motion.div
          key={index}
          className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${
            index <= (activePhase ?? -1) ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  );
}
