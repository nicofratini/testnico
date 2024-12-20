import { useMemo } from 'react';
import { springConfig } from '../animations/spring';

export function usePhaseAnimation(index: number, isActive: boolean) {
  return useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: isActive ? 1.1 : 1,
      transition: {
        ...springConfig.gentle,
        delay: index * 0.1
      }
    },
    hover: {
      scale: isActive ? 1.1 : 1.05,
      transition: springConfig.gentle
    },
    tap: {
      scale: 0.95,
      transition: springConfig.stiff
    }
  }), [index, isActive]);
}