import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Phase } from '../../types';

interface PhaseDetailsProps {
  phase: Phase;
}

export function PhaseDetails({ phase }: PhaseDetailsProps) {
  return (
    <motion.div className="phase-details">
      <p className="description">{phase.description}</p>
      {phase.impact && (
        <p className="impact text-xs text-gray-300 mt-2">
          {phase.impact.value} — {phase.impact.description}
        </p>
      )}
      {/* Autres détails peuvent être ajoutés ici */}
    </motion.div>
  );
}
