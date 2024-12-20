import { useState, useCallback } from 'react';

export function usePhaseHover() {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const handlePhaseHover = useCallback((index: number | null) => {
    setHoveredPhase(index);
  }, []);

  return {
    hoveredPhase,
    handlePhaseHover
  };
}