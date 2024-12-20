
import React from 'react';
import { PhaseTransition } from './PhaseTransition';
import { PhaseIcon } from './PhaseIcon';
import { PhaseLabel } from './PhaseLabel';
import { PhaseTooltip } from './PhaseTooltip';
import type { Phase } from '../../types';

interface PhaseNodeProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  onClick: () => void;
  lang: 'fr' | 'en';
}

export function PhaseNode({ phase, index, isActive, onClick, lang }: PhaseNodeProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <PhaseTransition phase={phase} isActive={isActive}>
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <PhaseIcon phase={phase} isActive={isActive} />
        <PhaseLabel 
          phase={phase} 
          isActive={isActive} 
          index={index} 
          lang={lang} 
        />

        {isHovered && (
          <PhaseTooltip 
            phase={phase} 
            lang={lang} 
          />
        )}
      </div>
    </PhaseTransition>
  );
}
