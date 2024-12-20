import React, { useState } from 'react';
import { TimelineNode } from './components/node/TimelineNode';
import { TimelineConnector } from './components/connector/TimelineConnector';
import { TIMELINE_CONSTANTS } from './styles/constants';
import type { Phase } from './types';

interface TimelineProps {
  phases: Phase[];
  lang: 'fr' | 'en';
}

export function Timeline({ phases, lang }: TimelineProps) {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const handlePhaseClick = (index: number) => {
    setActivePhase(current => current === index ? null : index);
  };

  const progress = activePhase !== null ? ((activePhase + 1) / phases.length) * 100 : 0;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <div className="relative min-h-[400px] flex items-center">
        {/* Ligne de progression */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
          <TimelineConnector progress={progress} />
        </div>

        {/* Nodes */}
        <div className="relative w-full flex justify-between items-center">
          {phases.map((phase, index) => (
            <TimelineNode
              key={index}
              phase={phase}
              index={index}
              isActive={index === activePhase}
              onClick={() => handlePhaseClick(index)}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}