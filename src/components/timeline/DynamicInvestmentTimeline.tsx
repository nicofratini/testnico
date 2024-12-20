import React from 'react';
import { motion } from 'framer-motion';
import { TimelineProvider } from './providers/TimelineProvider';
import { TimelineHeader } from './components/header/TimelineHeader';
import { TimelineContent } from './components/TimelineContent';
import type { SimulationResult } from '../../types';

interface DynamicInvestmentTimelineProps {
  results: SimulationResult;
  lang: 'fr' | 'en';
}

export function DynamicInvestmentTimeline({ results, lang }: DynamicInvestmentTimelineProps) {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg p-12 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TimelineProvider results={results} lang={lang}>
        <TimelineHeader />
        <TimelineContent />
      </TimelineProvider>
    </motion.div>
  );
}