
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { TimelinePhases } from '../phases/TimelinePhases';
import { TimelineProgress } from '../progress/TimelineProgress';
import { TimelineControls } from '../controls/TimelineControls';
import { PhaseDetails } from '../details/PhaseDetails';
import { useTimelineContext } from '../../hooks/useTimelineContext';

export function TimelineContent() {
  const { 
    phases, 
    activePhase, 
    isPlaying,
    onPhaseClick,
    onPlay,
    onPause,
    onReset,
    lang 
  } = useTimelineContext();

  return (
    <div className="relative mt-12">
      <TimelineProgress 
        progress={((activePhase ?? -1) + 1) / phases.length * 100} 
      />
      
      <TimelinePhases 
        phases={phases}
        activePhase={activePhase}
        onPhaseClick={onPhaseClick}
        lang={lang}
      />

      <AnimatePresence>
        {activePhase !== null && (
          <PhaseDetails 
            phase={phases[activePhase]}
            onClose={() => onPhaseClick(activePhase)}
            lang={lang}
          />
        )}
      </AnimatePresence>

      <TimelineControls
        isPlaying={isPlaying}
        onPlay={onPlay}
        onPause={onPause}
        onReset={onReset}
        lang={lang}
      />
    </div>
  );
}