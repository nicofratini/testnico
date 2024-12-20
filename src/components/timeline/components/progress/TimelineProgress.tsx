
import React from 'react';
import { motion } from 'framer-motion';
import { useProgressAnimation } from '../../hooks/useProgressAnimation';
import { TIMELINE_THEME } from '../../styles/theme';

interface TimelineProgressProps {
  progress: number;
}

export function TimelineProgress({ progress }: TimelineProgressProps) {
  const animation = useProgressAnimation(progress);

  return (
    <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        className={`absolute inset-y-0 left-0 ${TIMELINE_THEME.gradients.progress}`}
        variants={animation}
        initial="initial"
        animate="animate"
      />
      
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
        style={{ left: `${progress - 4}%` }}
      />
    </div>
  );
}
