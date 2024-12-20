import { useMemo } from 'react';
import { TIMELINE_THEME } from '../styles/theme';

export function useNodeAnimation(index: number) {
  return useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      delay: index * TIMELINE_THEME.animations.stagger,
      duration: TIMELINE_THEME.animations.duration
    }
  }), [index]);
}