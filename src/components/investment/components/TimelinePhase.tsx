import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/formatters';
import type { PhaseProps } from '../types';

export function TimelinePhase({ phase, index, isHovered, onHover }: PhaseProps) {
  const Icon = phase.icon;

  return (
    <div
      className="relative"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Animated icon circle */}
      <motion.div
        className={`
          w-12 h-12 rounded-full ${phase.color} 
          flex items-center justify-center text-white
          shadow-lg relative z-10
        `}
        whileHover={{ scale: 1.1 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>

      {/* Title and amount */}
      <motion.div 
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        <h3 className="text-center font-medium text-gray-800 mb-1">
          {phase.title}
        </h3>
        <p className="text-center text-sm font-medium text-gray-600">
          {formatCurrency(phase.amount, 'fr')}
        </p>
      </motion.div>

      {/* Animated tooltip */}
      <motion.div
        className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64
          bg-gray-800 text-white p-4 rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.95
        }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-sm mb-2">{phase.description}</p>
        <ul className="space-y-1">
          {phase.details.map((detail, i) => (
            <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              {detail}
            </li>
          ))}
        </ul>
        <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5" />
      </motion.div>
    </div>
  );
}