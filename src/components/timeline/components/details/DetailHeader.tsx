import React from 'react';
import { X } from 'lucide-react';
import type { Phase } from '../../types';

interface DetailHeaderProps {
  phase: Phase;
  onClose: () => void;
}

export function DetailHeader({ phase, onClose }: DetailHeaderProps) {
  const Icon = phase.icon;

  return (
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
  );
}