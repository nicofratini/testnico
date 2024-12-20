import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ResultCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  color: string;
}

export function ResultCard({ icon, label, value, description, color }: ResultCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className={`flex items-center gap-3 mb-3`} style={{ color }}>
        {icon}
        <h3 className="text-base font-medium text-gray-800">
          {label}
        </h3>
      </div>
      <p className="text-2xl font-semibold mb-2" style={{ color }}>
        {value}
      </p>
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
}