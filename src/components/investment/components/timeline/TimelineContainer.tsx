import React from 'react';
import { TimelinePath } from './TimelinePath';
import { TimelineProgress } from './TimelineProgress';
import { useTimelineProgress } from '../../hooks/useTimelineProgress';
import type { Phase } from '../../types';

interface TimelineContainerProps {
  phases: Phase[];
  lang: 'fr' | 'en';
  onPhaseSelect: (index: number | null) => void;
}

export function TimelineContainer({ phases, lang, onPhaseSelect }: TimelineContainerProps) {
  const { activePhase, handlePhaseClick, getProgress } = useTimelineProgress();

  return (
    <div className="relative py-16">
      <TimelineProgress progress={getProgress(phases.length)} />
      
      <TimelinePath 
        phases={phases}
        activePhase={activePhase}
        onPhaseClick={(index) => {
          handlePhaseClick(index);
          onPhaseSelect(index === activePhase ? null : index);
        }}
        lang={lang}
      />
    </div>
  );
}