import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../../../utils/formatters';
import type { Phase } from '../../types';

interface TimelinePhaseProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
  lang: 'fr' | 'en';
}

export function TimelinePhase({ phase, index, isActive, onClick, lang }: TimelinePhaseProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const Icon = phase.icon;

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Circle */}
      <motion.div
        className={`
          relative w-20 h-20 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-lg z-10
          ${isActive 
            ? phase.color 
            : 'bg-white border-2 border-gray-200 group-hover:border-gray-300'
          }
        `}
        whileHover={{ scale: 1.05 }}
        animate={{ 
          scale: isActive ? 1.1 : 1,
          y: isActive ? -4 : 0
        }}
      >
        <Icon className={`w-10 h-10 ${
          isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
        }`} />

        {/* Glow effect */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1.2, 1.3, 1.2],
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: `radial-gradient(circle, ${phase.color}40 0%, transparent 70%)`
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Label */}
      <motion.div
        className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-48 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        <h3 className={`text-base font-semibold mb-2 transition-colors duration-300 ${
          isActive ? 'text-gray-900' : 'text-gray-700'
        }`}>
          {phase.title}
        </h3>
        <p className={`text-sm font-medium transition-colors duration-300 ${
          isActive ? 'text-blue-600' : 'text-gray-500'
        }`}>
          {formatCurrency(phase.amount, lang)}
        </p>
        {phase.impact && (
          <p className="text-xs text-gray-500 mt-1">
            {phase.impact.value} — {phase.impact.description}
          </p>
        )}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && !isActive && (
          <motion.div
            className="absolute -top-28 left-1/2 transform -translate-x-1/2 w-64 bg-gray-800 text-white p-4 rounded-lg shadow-xl z-20"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm">{phase.description}</p>
            {phase.impact && (
              <p className="text-xs text-gray-300 mt-2">
                Impact: {phase.impact.value} ({phase.impact.description})
              </p>
            )}
            <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}