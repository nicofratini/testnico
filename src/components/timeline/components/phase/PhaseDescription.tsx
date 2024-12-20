import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface PhaseDescriptionProps {
  description: string;
  isExpanded: boolean;
}

export function PhaseDescription({ description, isExpanded }: PhaseDescriptionProps) {
  return (
    <motion.div
      className="relative"
      initial={false}
      animate={{ height: isExpanded ? 'auto' : '0' }}
    >
      <div className="p-4 bg-gray-50 rounded-lg mt-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}