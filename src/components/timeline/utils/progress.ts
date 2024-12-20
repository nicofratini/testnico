
export function calculateProgress(current: number, total: number): number {
  if (current === null || total === 0) return 0;
  return ((current + 1) / total) * 100;
}

export function getPhaseStatus(index: number, activePhase: number | null) {
  if (activePhase === null) return { isActive: false, isCompleted: false };
  
  return {
    isActive: index === activePhase,
    isCompleted: index < activePhase,
    isPending: index > activePhase
  };
}

export function getNextPhaseIndex(currentPhase: number | null, totalPhases: number): number {
  if (currentPhase === null) return 0;
  return currentPhase >= totalPhases - 1 ? 0 : currentPhase + 1;
}
