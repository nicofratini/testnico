import React from 'react';
import { motion } from 'framer-motion';

interface PhaseConnectorProps {
  isActive: boolean;
  progress: number;
}

export function PhaseConnector({ isActive, progress }: PhaseConnectorProps) {
  return (
    <div className="absolute left-0 right-0 h-0.5 top-1/2 -translate-y-1/2 -z-10">
      <div className="h-full bg-gray-200" />
      {isActive && (
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-green-500"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
}