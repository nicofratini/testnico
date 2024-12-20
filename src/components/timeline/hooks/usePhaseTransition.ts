import { useCallback } from 'react';
import { phaseVariants } from '../animations/variants';

export function usePhaseTransition(index: number, isActive: boolean) {
  const getTransitionProps = useCallback(() => ({
    variants: phaseVariants,
    initial: 'initial',
    animate: isActive ? 'active' : 'animate',
    whileHover: 'hover',
    transition: { delay: index * 0.1 }
  }), [index, isActive]);

  return { getTransitionProps };
}