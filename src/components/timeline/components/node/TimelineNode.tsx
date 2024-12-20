import React from 'react';
import { motion } from 'framer-motion';
import { NodeIcon } from './NodeIcon';
import { NodeLabel } from './NodeLabel';
import type { Phase } from '../../types';

interface TimelineNodeProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
  lang: 'fr' | 'en';
}

export function TimelineNode({ phase, index, isActive, onClick, lang }: TimelineNodeProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      onClick={onClick}
    >
      <NodeIcon phase={phase} isActive={isActive} />
      
      {/* Amount Label */}
      <motion.div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-40 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 + 0.1 }}
      >
        <NodeLabel
          content={phase.amount}
          isActive={isActive}
          type="amount"
          lang={lang}
        />
      </motion.div>
      
      {/* Title Label */}
      <motion.div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-40 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 + 0.1 }}
      >
        <NodeLabel
          content={phase.title}
          isActive={isActive}
          type="title"
          lang={lang}
        />
      </motion.div>
    </motion.div>
  );
}