import { useMemo } from 'react';

export function usePhaseAnimation(index: number) {
  return useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.1 }
  }), [index]);
}