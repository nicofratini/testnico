
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { PhaseImpact } from './PhaseImpact';
import type { Phase } from '../types';

interface PhaseDetailsProps {
  phase: Phase;
  lang: 'fr' | 'en';
}

export function PhaseDetails({ phase, lang }: PhaseDetailsProps) {
  const Icon = phase.icon;
  
  return (
    <motion.div
      className="mt-8 bg-gray-50 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${phase.color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{phase.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {phase.isEntry ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={phase.isEntry ? 'text-green-600' : 'text-red-600'}>
            {formatCurrency(phase.amount, lang)}
          </span>
        </div>
      </div>

      <PhaseImpact impact={phase.impact} />
      
      <p className="text-gray-600 mb-6">{phase.description}</p>

      {phase.details.keyPoints && (
        <div className="grid grid-cols-2 gap-4">
          {phase.details.keyPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600">{point}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
