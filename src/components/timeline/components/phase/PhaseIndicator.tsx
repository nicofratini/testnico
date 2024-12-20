import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PhaseIndicatorProps {
  isActive: boolean;
  isCompleted: boolean;
  color: string;
}

export function PhaseIndicator({ isActive, isCompleted, color }: PhaseIndicatorProps) {
  return (
    <motion.div
      className={`
        absolute -left-2 w-4 h-4 rounded-full border-2 border-white
        ${isActive ? color : isCompleted ? 'bg-green-500' : 'bg-gray-300'}
      `}
      initial={false}
      animate={{
        scale: isActive ? 1.2 : 1,
        boxShadow: isActive ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : 'none'
      }}
    >
      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center justify-center h-full"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}