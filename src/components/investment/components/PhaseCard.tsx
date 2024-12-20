import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/formatters';
import type { Phase } from '../types';

interface PhaseCardProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function PhaseCard({ phase, index, isActive, onClick }: PhaseCardProps) {
  const Icon = phase.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300
        ${isActive ? 'bg-white shadow-lg scale-105' : 'bg-gray-50 hover:bg-white hover:shadow-md'}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`
          w-12 h-12 rounded-full ${phase.color} flex items-center justify-center
          shadow-lg
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {phase.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {phase.description}
          </p>
          <div className="text-xl font-bold text-gray-900">
            {formatCurrency(phase.amount, 'fr')}
          </div>
        </div>
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <ul className="space-y-2">
            {phase.details.map((detail, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <div className={`w-2 h-2 rounded-full ${phase.color}`} />
                {detail}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}