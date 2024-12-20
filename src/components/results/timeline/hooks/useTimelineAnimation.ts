import { useMemo } from 'react';
import { ANIMATION_CONFIG } from '../constants';

export function useTimelineAnimation(index: number) {
  return useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: ANIMATION_CONFIG.duration, 
      delay: index * ANIMATION_CONFIG.stagger 
    }
  }), [index]);
}