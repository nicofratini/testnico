
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhaseIcon } from './PhaseIcon';
import { PhaseLabel } from './PhaseLabel';
import { PhaseTooltip } from './PhaseTooltip';
import { PhaseGlow } from './PhaseGlow';
import { PhaseRipple } from './PhaseRipple';
import { usePhaseAnimation } from '../../hooks/usePhaseAnimation';
import type { Phase } from '../../types';

interface TimelinePhaseProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
  lang: 'fr' | 'en';
}

export function TimelinePhase({ phase, index, isActive, onClick, lang }: TimelinePhaseProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const animation = usePhaseAnimation(index, isActive);

  return (
    <motion.div
      className="relative cursor-pointer"
      variants={animation}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PhaseIcon phase={phase} isActive={isActive} />
      
      <AnimatePresence>
        {isActive && (
          <>
            <PhaseGlow color={phase.color} />
            <PhaseRipple color={phase.color} />
          </>
        )}
      </AnimatePresence>

      <PhaseLabel 
        phase={phase} 
        isActive={isActive} 
        index={index} 
        lang={lang} 
      />

      <AnimatePresence>
        {isHovered && (
          <PhaseTooltip 
            phase={phase} 
            lang={lang} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}