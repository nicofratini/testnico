import React from 'react';
import { TimelineNode } from './TimelineNode';
import type { Phase } from '../types';

interface TimelinePhasesProps {
  phases: Phase[];
  activePhase: number | null;
  onPhaseClick: (index: number) => void;
  lang: 'fr' | 'en';
}

export function TimelinePhases({ phases, activePhase, onPhaseClick, lang }: TimelinePhasesProps) {
  return (
    <div className="relative flex justify-between px-8">
      {phases.map((phase, index) => (
        <TimelineNode
          key={index}
          phase={phase}
          index={index}
          isActive={index === activePhase}
          onClick={() => onPhaseClick(index)}
          lang={lang}
        />
      ))}
    </div>
  );
}