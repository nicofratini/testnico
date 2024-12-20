
import React from 'react';
import { motion } from 'framer-motion';
import { useAnimatedValue } from '../../hooks/useAnimatedValue';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
}

export function AnimatedCounter({ 
  value, 
  duration = 1,
  formatter = (v) => v.toFixed(0)
}: AnimatedCounterProps) {
  const animatedValue = useAnimatedValue({
    from: 0,
    to: value,
    duration
  });

  return (
    <motion.span>
      {formatter(animatedValue)}
    </motion.span>
  );
}
