import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DetailHeader } from './DetailHeader';
import { DetailCard } from './DetailCard';
import { springConfig } from '../../animations/spring';
import type { Phase } from '../../types';

interface AnimatedDetailsProps {
  phase: Phase;
  onClose: () => void;
  lang: 'fr' | 'en';
}

export function AnimatedDetails({ phase, onClose, lang }: AnimatedDetailsProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="mt-24 bg-gray-50 rounded-xl p-8 overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={springConfig.gentle}
      >
        <DetailHeader phase={phase} onClose={onClose} />
        
        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {phase.details.map((detail, index) => (
            <DetailCard
              key={index}
              detail={detail}
              index={index}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}