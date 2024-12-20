import React from 'react';
import { TimelineContext } from '../hooks/useTimelineContext';
import { useTimelineState } from '../hooks/useTimelineState';
import { useAutoPlay } from '../hooks/useAutoPlay';
import type { SimulationResult } from '../../../types';

interface TimelineProviderProps {
  results: SimulationResult;
  lang: 'fr' | 'en';
  children: React.ReactNode;
}

export function TimelineProvider({ results, lang, children }: TimelineProviderProps) {
  const { activePhase, phases, handlePhaseClick } = useTimelineState(results, lang);
  const { isPlaying, play, pause } = useAutoPlay(phases.length);

  const value = {
    activePhase,
    phases,
    isPlaying,
    onPhaseClick: handlePhaseClick,
    onPlay: play,
    onPause: pause,
    onReset: () => handlePhaseClick(null),
    lang
  };

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}