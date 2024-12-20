
import { useState, useCallback } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface PhaseVisibilityOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function usePhaseVisibility({
  threshold = 0.5,
  triggerOnce = true
}: PhaseVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const { ref } = useIntersectionObserver({
    threshold,
    triggerOnce,
    onIntersect: (entry) => {
      setIsVisible(entry.isIntersecting);
    }
  });

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);

  return {
    ref,
    isVisible,
    show,
    hide
  };
}
