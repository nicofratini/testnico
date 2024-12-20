import React from 'react';
import { motion } from 'framer-motion';
import { springConfig } from '../../animations/spring';

interface AnimatedConnectorProps {
  progress: number;
}

export function AnimatedConnector({ progress }: AnimatedConnectorProps) {
  return (
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
      {/* Base line */}
      <div className="h-1 bg-gray-100 rounded-full" />
      
      {/* Animated progress line */}
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={springConfig.gentle}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-white/0 to-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }}
        style={{ left: `${progress - 4}%` }}
      />
    </div>
  );
}