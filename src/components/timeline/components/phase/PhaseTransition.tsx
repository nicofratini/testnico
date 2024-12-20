
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhaseGlow } from './PhaseGlow';
import { PhaseRipple } from './PhaseRipple';
import type { Phase } from '../../types';

interface PhaseTransitionProps {
  phase: Phase;
  isActive: boolean;
  children: React.ReactNode;
}

export function PhaseTransition({ phase, isActive, children }: PhaseTransitionProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence>
        {isActive && (
          <>
            <PhaseGlow isActive={isActive} color={phase.color} />
            <PhaseRipple isActive={isActive} color={phase.color} />
          </>
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
}
