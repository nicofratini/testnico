import React from 'react';
import { motion } from 'framer-motion';

interface DetailCardProps {
  detail: string;
  index: number;
}

export function DetailCard({ detail, index }: DetailCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg p-4 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <p className="text-sm text-gray-600">{detail}</p>
    </motion.div>
  );
}