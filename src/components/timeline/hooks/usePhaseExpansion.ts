import { useState, useCallback } from 'react';

export function usePhaseExpansion(initialPhase: number | null = null) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(initialPhase);

  const togglePhase = useCallback((index: number) => {
    setExpandedPhase(current => current === index ? null : index);
  }, []);

  const closeAll = useCallback(() => {
    setExpandedPhase(null);
  }, []);

  return {
    expandedPhase,
    togglePhase,
    closeAll
  };
}