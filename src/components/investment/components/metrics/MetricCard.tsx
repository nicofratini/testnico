import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string;
  index: number;
}

export function MetricCard({ label, value, index }: MetricCardProps) {
  return (
    <motion.div 
      className="bg-gray-50 rounded-xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
    </motion.div>
  );
}