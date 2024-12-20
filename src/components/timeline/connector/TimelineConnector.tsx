
import React from 'react';
import { ConnectorLine } from './ConnectorLine';
import { ConnectorDots } from './ConnectorDots';

interface TimelineConnectorProps {
  activePhase: number | null;
  totalPhases: number;
}

export function TimelineConnector({ activePhase, totalPhases }: TimelineConnectorProps) {
  const progress = activePhase !== null ? ((activePhase + 1) / totalPhases) * 100 : 0;

  return (
    <div className="absolute left-24 right-24 top-12 h-2 -z-10">
      <ConnectorLine progress={progress} />
      <ConnectorDots totalPhases={totalPhases} activePhase={activePhase} />
    </div>
  );
}
