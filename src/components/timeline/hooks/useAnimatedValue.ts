
import { useState, useEffect } from 'react';
import { animate } from 'framer-motion';

interface AnimatedValueOptions {
  from: number;
  to: number;
  duration?: number;
  ease?: string;
  onComplete?: () => void;
}

export function useAnimatedValue({ 
  from, 
  to, 
  duration = 1, 
  ease = "easeOut",
  onComplete 
}: AnimatedValueOptions) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      ease,
      onUpdate: (v) => setValue(v),
      onComplete
    });

    return () => controls.stop();
  }, [from, to, duration, ease, onComplete]);

  return value;
}
