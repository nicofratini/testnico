import { useCallback, useState } from 'react';

export function useTimelineProgress() {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const handlePhaseClick = useCallback((index: number) => {
    setActivePhase(current => current === index ? null : index);
  }, []);

  const getProgress = useCallback((total: number) => {
    if (activePhase === null) return 0;
    return ((activePhase + 1) / total) * 100;
  }, [activePhase]);

  return {
    activePhase,
    handlePhaseClick,
    getProgress
  };
}