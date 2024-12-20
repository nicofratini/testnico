import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_CONSTANTS } from '../../styles/constants';
import { formatCurrency } from '../../../../utils/formatters';

interface NodeLabelProps {
  content: string | number;
  isActive: boolean;
  position: 'top' | 'bottom';
  type: 'amount' | 'title';
  lang: 'fr' | 'en';
}

export function NodeLabel({ content, isActive, position, type, lang }: NodeLabelProps) {
  const { label } = TIMELINE_CONSTANTS.spacing.node;

  return (
    <motion.div 
      className={`
        absolute ${position === 'top' ? label.top : label.bottom}
        left-1/2 -translate-x-1/2 ${label.width}
        text-center
      `}
      initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.span
        className={`
          block text-base md:text-lg font-medium
          transition-all duration-300
          ${isActive ? 'text-gray-900 scale-105' : 'text-gray-600 group-hover:text-gray-800'}
        `}
        whileHover={{ scale: 1.05 }}
      >
        {type === 'amount' ? formatCurrency(content as number, lang) : content}
      </motion.span>
    </motion.div>
  );
}