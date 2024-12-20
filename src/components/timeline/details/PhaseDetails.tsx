import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Phase } from '../types';

interface PhaseDetailsProps {
  phase: Phase;
  onClose: () => void;
  lang: 'fr' | 'en';
}

export function PhaseDetails({ phase, onClose, lang }: PhaseDetailsProps) {
  const Icon = phase.icon;

  return (
    <motion.div
      className="mt-32 bg-gray-50 rounded-xl p-8 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{phase.title}</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <p className="text-gray-600 mb-6 text-lg">{phase.description}</p>

      <div className="grid grid-cols-2 gap-6">
        {phase.details.map((detail, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-gray-600 text-lg">{detail}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}