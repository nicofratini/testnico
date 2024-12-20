
import React from 'react';
import { motion } from 'framer-motion';

interface PhaseGlowProps {
  isActive: boolean;
  color: string;
}

export function PhaseGlow({ isActive, color }: PhaseGlowProps) {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{
        opacity: [0.2, 0.4, 0.2],
        scale: [1.2, 1.3, 1.2],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`
      }}
    />
  );
}
