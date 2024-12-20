
import React from 'react';
import { motion } from 'framer-motion';

interface ConnectorLineProps {
  progress: number;
}

export function ConnectorLine({ progress }: ConnectorLineProps) {
  return (
    <>
      {/* Base line */}
      <div className="absolute inset-0 bg-gray-200 rounded-full" />

      {/* Progress line */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        animate={{
          left: ['0%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          left: `${progress - 6}%`,
        }}
      />
    </>
  );
}
