import React from 'react';
import { motion } from 'framer-motion';
import { TimelineNodeIcon } from './TimelineNodeIcon';
import { TimelineNodeLabel } from './TimelineNodeLabel';
import { usePhaseAnimation } from '../../hooks/usePhaseAnimation';
import type { Phase } from '../../types';

interface TimelineNodeProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
  lang: 'fr' | 'en';
}

export function TimelineNode({ phase, index, isActive, onClick, lang }: TimelineNodeProps) {
  const animation = usePhaseAnimation(index);

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      onClick={onClick}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      <TimelineNodeIcon phase={phase} isActive={isActive} />
      <TimelineNodeLabel phase={phase} isActive={isActive} lang={lang} />
    </motion.div>
  );
}