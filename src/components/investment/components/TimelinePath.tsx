import React from 'react';
import { motion } from 'framer-motion';
import { TimelineNode } from './TimelineNode';
import type { Phase } from '../types';

interface TimelinePathProps {
  phases: Phase[];
  activePhase: number | null;
  onPhaseClick: (index: number) => void;
}

export function TimelinePath({ phases, activePhase, onPhaseClick }: TimelinePathProps) {
  return (
    <div className="relative py-16">
      {/* Timeline base line */}
      <div className="absolute left-0 right-0 h-1 top-[5.5rem] bg-gray-100" />
      
      {/* Progress line */}
      <motion.div 
        className="absolute left-0 h-1 top-[5.5rem] bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
        initial={{ width: '0%' }}
        animate={{ width: activePhase !== null ? `${((activePhase + 1) / phases.length) * 100}%` : '0%' }}
        transition={{ duration: 0.5 }}
      />

      {/* Phase nodes */}
      <div className="relative flex justify-between">
        {phases.map((phase, index) => (
          <TimelineNode
            key={index}
            phase={phase}
            index={index}
            isActive={index === activePhase}
            onClick={() => onPhaseClick(index)}
          />
        ))}
      </div>
    </div>
  );
}