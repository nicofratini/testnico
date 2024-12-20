import { createContext, useContext } from 'react';
import type { Phase } from '../types';

interface TimelineContextType {
  activePhase: number | null;
  phases: Phase[];
  isPlaying: boolean;
  onPhaseClick: (index: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  lang: 'fr' | 'en';
}

export const TimelineContext = createContext<TimelineContextType | null>(null);

export function useTimelineContext() {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimelineContext must be used within a TimelineProvider');
  }
  return context;
}