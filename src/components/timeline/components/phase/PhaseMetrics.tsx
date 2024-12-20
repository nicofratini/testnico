import React from 'react';
import { motion } from 'framer-motion';
import { formatPercent } from '../../../../utils/formatters';

interface PhaseMetricsProps {
  metrics: {
    label: string;
    value: number;
    unit: '%' | '€';
  }[];
}

export function PhaseMetrics({ metrics }: PhaseMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg p-4 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-sm text-gray-600 mb-1">
            {metric.label}
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {metric.unit === '%' ? formatPercent(metric.value, 'fr') : metric.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}