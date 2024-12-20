
import { useState, useCallback, useEffect } from 'react';
import { getNextPhaseIndex } from '../utils/progress';

interface AutoPlayOptions {
  totalPhases: number;
  interval?: number;
  onPhaseChange: (phase: number | null) => void;
}

export function useAutoPlayControls({ 
  totalPhases, 
  interval = 2000,
  onPhaseChange 
}: AutoPlayOptions) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<number | null>(null);

  const play = useCallback(() => {
    setIsPlaying(true);
    setCurrentPhase(0);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentPhase(null);
    onPhaseChange(null);
  }, [onPhaseChange]);

  const next = useCallback(() => {
    setCurrentPhase(current => {
      const nextPhase = getNextPhaseIndex(current, totalPhases);
      onPhaseChange(nextPhase);
      return nextPhase;
    });
  }, [totalPhases, onPhaseChange]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, next]);

  return {
    isPlaying,
    currentPhase,
    play,
    pause,
    reset,
    next
  };
}
