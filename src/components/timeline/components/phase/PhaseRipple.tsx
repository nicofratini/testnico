
import React from 'react';
import { motion } from 'framer-motion';

interface PhaseRippleProps {
  isActive: boolean;
  color: string;
}

export function PhaseRipple({ isActive, color }: PhaseRippleProps) {
  if (!isActive) return null;

  return (
    <>
      {[...Array(2)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 1,
            ease: "easeOut"
          }}
          style={{ border: `2px solid ${color}` }}
        />
      ))}
    </>
  );
}
