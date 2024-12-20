import React from 'react';
import { motion } from 'framer-motion';
import { PhaseDetailHeader } from './PhaseDetailHeader';
import { PhaseDetailCard } from './PhaseDetailCard';
import type { Phase } from '../../types';

interface PhaseDetailsProps {
  phase: Phase;
  onClose: () => void;
}

export function PhaseDetails({ phase, onClose }: PhaseDetailsProps) {
  return (
    <motion.div
      className="mt-12 bg-gray-50 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <PhaseDetailHeader phase={phase} onClose={onClose} />
      
      <p className="text-gray-600 mb-4">{phase.description}</p>

      <div className="grid grid-cols-2 gap-4">
        {phase.details.map((detail, index) => (
          <PhaseDetailCard 
            key={index}
            detail={detail}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}