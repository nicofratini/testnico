import React from 'react';
import { TimelineNode } from './node/TimelineNode';
import { TimelineConnector } from './connector/TimelineConnector';
import { TIMELINE_CONSTANTS } from '../styles/constants';
import type { Phase } from '../types';

interface TimelinePathProps {
  phases: Phase[];
  activePhase: number | null;
  onPhaseClick: (index: number) => void;
  lang: 'fr' | 'en';
}

export function TimelinePath({ phases, activePhase, onPhaseClick, lang }: TimelinePathProps) {
  const progress = activePhase !== null ? ((activePhase + 1) / phases.length) * 100 : 0;

  return (
    <div className="relative min-h-[300px]">
      {/* Ligne de progression */}
      <div className={`absolute left-0 right-0 ${TIMELINE_CONSTANTS.spacing.connector.position}`}>
        <TimelineConnector progress={progress} />
      </div>
      
      {/* Nodes */}
      <div className={`
        relative flex justify-between items-center
        ${TIMELINE_CONSTANTS.spacing.node.gap}
      `}>
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
    </div>
  );
}