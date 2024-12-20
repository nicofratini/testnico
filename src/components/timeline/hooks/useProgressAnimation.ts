import { useMemo } from 'react';
import { springConfig } from '../animations/spring';

export function useProgressAnimation(progress: number) {
  return useMemo(() => ({
    initial: { width: '0%' },
    animate: {
      width: `${progress}%`,
      transition: {
        ...springConfig.gentle,
        duration: 0.5
      }
    }
  }), [progress]);
}