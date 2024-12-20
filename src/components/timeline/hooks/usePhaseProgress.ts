import { useState, useEffect } from 'react';

export function usePhaseProgress(isActive: boolean, duration: number = 2000) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);
      
      if (newProgress === 100) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isActive, duration]);

  return progress;
}