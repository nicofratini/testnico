
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhaseIcon } from './phases/PhaseIcon';
import { PhaseGlow } from './phases/PhaseGlow';
import { PhaseLabel } from './phases/PhaseLabel';
import { PhaseTooltip } from './phases/PhaseTooltip';
import type { Phase } from './types';

interface TimelinePhaseProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
  lang: 'fr' | 'en';
}

export function TimelinePhase({ phase, index, isActive, onClick, lang }: TimelinePhaseProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <PhaseIcon phase={phase} isActive={isActive} />
        <AnimatePresence>
          {isActive && <PhaseGlow color={phase.color} isActive={isActive} />}
        </AnimatePresence>
      </div>

      <PhaseLabel
        title={phase.title}
        amount={phase.amount}
        isActive={isActive}
        index={index}
        lang={lang}
      />

      <AnimatePresence>
        {isHovered && !isActive && (
          <PhaseTooltip phase={phase} lang={lang} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
