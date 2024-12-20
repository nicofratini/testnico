
import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  gradient: string;
  className?: string;
}

export function GradientText({ text, gradient, className = '' }: GradientTextProps) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.span>
  );
}
