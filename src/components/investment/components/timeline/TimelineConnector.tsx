import React from 'react';
import { motion } from 'framer-motion';

interface TimelineConnectorProps {
  isActive: boolean;
}

export function TimelineConnector({ isActive }: TimelineConnectorProps) {
  return (
    <div className="absolute left-0 right-0 h-1 top-7 -z-10">
      <motion.div
        className={`h-full ${isActive ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500' : 'bg-gray-200'}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}