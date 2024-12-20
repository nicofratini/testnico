
import React from 'react';
import { motion } from 'framer-motion';

interface MotionPathProps {
  path: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function MotionPath({ 
  path, 
  duration = 1.5, 
  delay = 0,
  className = '' 
}: MotionPathProps) {
  return (
    <motion.path
      d={path}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration,
        delay,
        ease: "easeInOut"
      }}
      className={className}
    />
  );
}
