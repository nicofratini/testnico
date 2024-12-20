import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../../../utils/formatters';
import { springConfig } from '../../animations/spring';

interface PhaseAmountProps {
  amount: number;
  previousAmount?: number;
  lang: 'fr' | 'en';
}

export function PhaseAmount({ amount, previousAmount, lang }: PhaseAmountProps) {
  const difference = previousAmount ? amount - previousAmount : amount;
  const isPositive = difference >= 0;

  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springConfig.gentle}
    >
      <span className={`text-lg font-semibold ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        {formatCurrency(amount, lang)}
      </span>
      
      {previousAmount && (
        <div className={`flex items-center gap-1 text-sm ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>
            {formatCurrency(Math.abs(difference), lang)}
          </span>
        </div>
      )}
    </motion.div>
  );
}