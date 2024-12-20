import type { Phase } from '../types';

export function calculateProgress(activePhase: number | null, totalPhases: number): number {
  if (activePhase === null) return 0;
  return ((activePhase + 1) / totalPhases) * 100;
}

export function getPhaseStatus(index: number, activePhase: number | null) {
  return {
    isActive: index === activePhase,
    isCompleted: activePhase !== null && index < activePhase,
    isPending: activePhase === null || index > activePhase
  };
}