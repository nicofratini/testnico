import React from 'react';
import { motion } from 'framer-motion';
import { dotVariants } from '../../animations/variants';

interface ConnectorDotsProps {
  totalPhases: number;
  activePhase: number | null;
}

export function ConnectorDots({ totalPhases, activePhase }: ConnectorDotsProps) {
  return (
    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between">
      {Array.from({ length: totalPhases }).map((_, index) => (
        <motion.div
          key={index}
          className={`w-5 h-5 rounded-full border-3 border-white shadow-lg ${
            index <= (activePhase ?? -1) ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          custom={index}
        />
      ))}
    </div>
  );
}