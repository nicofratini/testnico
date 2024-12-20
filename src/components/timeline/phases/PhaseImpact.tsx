
import React from 'react';
import type { Phase } from '../types';

interface PhaseImpactProps {
  impact: Phase['impact'];
}

export function PhaseImpact({ impact }: PhaseImpactProps) {
  return (
    <div className="mb-2">
      <div className="font-medium text-gray-900">{impact.value}</div>
      <div className="text-sm text-gray-600">{impact.description}</div>
    </div>
  );
}
