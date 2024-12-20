import React from 'react';
import { X } from 'lucide-react';
import type { Phase } from '../../types';

interface PhaseDetailHeaderProps {
  phase: Phase;
  onClose: () => void;
}

export function PhaseDetailHeader({ phase, onClose }: PhaseDetailHeaderProps) {
  const Icon = phase.icon;

  return (
    <div className="flex items-start justify-between mb-4">
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
  );
}