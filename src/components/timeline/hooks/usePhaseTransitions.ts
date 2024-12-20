
import { useCallback } from 'react';
import { SPRING_CONFIGS } from '../animations/spring';

export function usePhaseTransitions() {
  const getBaseTransition = useCallback(() => ({
    ...SPRING_CONFIGS.gentle
  }), []);

  const getStaggeredTransition = useCallback((index: number) => ({
    ...getBaseTransition(),
    delay: index * 0.1
  }), []);

  const getHoverTransition = useCallback(() => ({
    ...SPRING_CONFIGS.gentle,
    duration: 0.2
  }), []);

  return {
    getBaseTransition,
    getStaggeredTransition,
    getHoverTransition
  };
}
