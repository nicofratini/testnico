
import { SPRING_CONFIGS } from '../animations/spring';
import type { Phase } from '../types';

export function getPhaseAnimationProps(index: number, isActive: boolean) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: isActive ? 1.1 : 1
    },
    transition: {
      ...SPRING_CONFIGS.gentle,
      delay: index * 0.1
    },
    whileHover: { scale: isActive ? 1.1 : 1.05 },
    whileTap: { scale: 0.95 }
  };
}

export function getProgressAnimationProps(progress: number) {
  return {
    initial: { width: '0%' },
    animate: { width: `${progress}%` },
    transition: { duration: 0.5, ease: "easeOut" }
  };
}

export function getDetailsAnimationProps() {
  return {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: SPRING_CONFIGS.gentle
  };
}
