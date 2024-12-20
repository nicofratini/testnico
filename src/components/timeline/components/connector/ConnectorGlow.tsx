
import React from 'react';
import { motion } from 'framer-motion';

interface ConnectorGlowProps {
  progress: number;
}

export function ConnectorGlow({ progress }: ConnectorGlowProps) {
  return (
    <motion.div
      className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
      animate={{
        left: ['0%', '100%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: `${progress - 10}%`,
      }}
    />
  );
}
