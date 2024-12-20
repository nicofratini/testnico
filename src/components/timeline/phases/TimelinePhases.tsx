import React from 'react';
import { motion } from 'framer-motion';
import { TimelinePhase } from './TimelinePhase';
import type { Phase } from '../types';

interface TimelinePhasesProps {
  phases: Phase[];
  activePhase: number | null;
  onPhaseClick: (index: number | null) => void;
  lang: 'fr' | 'en';
}

export function TimelinePhases({ phases, activePhase, onPhaseClick, lang }: TimelinePhasesProps) {
  return (
    <div className="relative flex justify-between items-center min-h-[280px] px-12">
      {phases.map((phase, index) => (
        <div 
          key={index} 
          className="flex-1 flex justify-center"
          style={{
            transform: index === 0 ? 'translateX(10%)' : 
                      index === phases.length - 1 ? 'translateX(-10%)' : 'none'
          }}
        >
          <TimelinePhase
            phase={phase}
            index={index}
            isActive={index === activePhase}
            onClick={() => onPhaseClick(index === activePhase ? null : index)}
            lang={lang}
          />
        </div>
      ))}
    </div>
  );
}