
import React from 'react';

interface PhaseKeyPointsProps {
  points: string[];
}

export function PhaseKeyPoints({ points }: PhaseKeyPointsProps) {
  if (!points?.length) return null;
  
  return (
    <div className="mt-2 space-y-1">
      {points.map((point, i) => (
        <div key={i} className="text-xs text-gray-300 flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-gray-400" />
          <span>{point}</span>
        </div>
      ))}
    </div>
  );
}
