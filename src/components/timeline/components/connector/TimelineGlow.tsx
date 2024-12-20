
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineGlowProps {
  progress: number;
}

export function TimelineGlow({ progress }: TimelineGlowProps) {
  return (
    <motion.div
      className="absolute h-2 w-20 top-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
      animate={{
        left: ['0%', '100%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: `${progress - 5}%`,
      }}
    />
  );
}