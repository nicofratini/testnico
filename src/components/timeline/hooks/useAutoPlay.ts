import { useState, useEffect, useCallback } from 'react';

export function useAutoPlay(totalPhases: number) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<number | null>(null);

  const play = useCallback(() => {
    setIsPlaying(true);
    setCurrentPhase(0);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentPhase(current => {
        if (current === null || current >= totalPhases - 1) {
          setIsPlaying(false);
          return null;
        }
        return current + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [isPlaying, totalPhases]);

  return {
    isPlaying,
    currentPhase,
    play,
    pause
  };
}