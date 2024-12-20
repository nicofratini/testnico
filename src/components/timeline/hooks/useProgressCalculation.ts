import { useMemo } from 'react';

export function useProgressCalculation(activePhase: number | null, totalPhases: number) {
  return useMemo(() => {
    if (activePhase === null) return 0;
    return ((activePhase + 1) / totalPhases) * 100;
  }, [activePhase, totalPhases]);
}