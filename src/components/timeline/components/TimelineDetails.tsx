import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Phase } from '../types';

interface TimelineDetailsProps {
  phase: Phase;
  onClose: () => void;
  lang: 'fr' | 'en';
}

export function TimelineDetails({ phase, onClose, lang }: TimelineDetailsProps) {
  const Icon = phase.icon;

  return (
    <motion.div
      className="mt-24 bg-gray-50 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${phase.color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{phase.title}</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-gray-600 mb-4">{phase.description}</p>

      <div className="grid grid-cols-2 gap-4">
        {phase.details.map((detail, i) => (
          <div 
            key={i}
            className="bg-white rounded-lg p-4 shadow-sm"
          >
            <p className="text-sm text-gray-600">{detail}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}