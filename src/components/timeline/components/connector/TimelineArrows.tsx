
import React from 'react';
import { motion } from 'framer-motion';

interface TimelineArrowsProps {
  totalPhases: number;
  activePhase: number | null;
}

export function TimelineArrows({ totalPhases, activePhase }: TimelineArrowsProps) {
  return (
    <div className="absolute inset-x-8 top-7 flex justify-between -z-5">
      {Array.from({ length: totalPhases - 1 }).map((_, index) => (
        <motion.div
          key={index}
          className="relative w-12 h-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Ligne de base */}
          <div className={`
            absolute inset-0 rounded-full transition-colors duration-300
            ${index <= (activePhase ?? -1) ? 'bg-blue-500' : 'bg-gray-200'}
          `} />

          {/* Flèche animée */}
          <motion.div
            className={`
              absolute -right-1 -top-1.5 w-4 h-4 
              ${index <= (activePhase ?? -1) ? 'text-blue-500' : 'text-gray-300'}
            `}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: 1,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M4 12h16m0 0l-6-6m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Effet de lueur */}
          {index <= (activePhase ?? -1) && (
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400 filter blur-sm"
              animate={{
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
