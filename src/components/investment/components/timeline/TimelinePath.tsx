import React from 'react';
import { TimelineNode } from './TimelineNode';
import type { Phase } from '../../types';

interface TimelinePathProps {
  phases: Phase[];
  activePhase: number | null;
  onPhaseClick: (index: number) => void;
  lang: 'fr' | 'en';
}

export function TimelinePath({ phases, activePhase, onPhaseClick, lang }: TimelinePathProps) {
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