
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineHeader } from './header/TimelineHeader';
import { TimelinePhase } from './components/phase/TimelinePhase';
import { TimelineConnector } from './components/TimelineConnector';
import { PhaseDetails } from './components/phase/PhaseDetails';
import { phases } from './data/phases';
import type { TimelineProps } from './types';

export function InteractiveTimeline({ lang }: TimelineProps) {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg p-12 mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <TimelineHeader lang={lang} />
      
      <div className="relative mt-24 mb-32">
        <TimelineConnector activePhase={activePhase} totalPhases={phases.length} />
        
        <div className="relative flex justify-between items-center px-16">
          {phases.map((phase, index) => (
            <TimelinePhase
              key={phase.id}
              phase={phase}
              index={index}
              isActive={activePhase === index}
              onClick={() => setActivePhase(activePhase === index ? null : index)}
              lang={lang}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activePhase !== null && (
          <PhaseDetails
            phase={phases[activePhase]}
            onClose={() => setActivePhase(null)}
            lang={lang}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
