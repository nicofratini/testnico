
import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/formatters';

interface PhaseLabelProps {
  title: string;
  amount: number;
  isActive: boolean;
  index: number;
  lang: 'fr' | 'en';
}

export function PhaseLabel({ title, amount, isActive, index, lang }: PhaseLabelProps) {
  return (
    <motion.div
      className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-48 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 + 0.2 }}
    >
      <h3 className={`text-base font-semibold mb-2 transition-colors duration-300 ${
        isActive ? 'text-gray-900' : 'text-gray-700'
      }`}>
        {title}
      </h3>
      <p className={`text-sm font-medium transition-colors duration-300 ${
        isActive ? 'text-blue-600' : 'text-gray-500'
      }`}>
        {formatCurrency(amount, lang)}
      </p>
    </motion.div>
  );
}
