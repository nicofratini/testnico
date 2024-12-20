import React from 'react';
import { NodeIcon } from './NodeIcon';
import { NodeLabel } from './NodeLabel';
import type { Phase } from '../../types';

interface NodeContentProps {
  phase: Phase;
  isActive: boolean;
  lang: 'fr' | 'en';
}

export function NodeContent({ phase, isActive, lang }: NodeContentProps) {
  return (
    <>
      <NodeIcon phase={phase} isActive={isActive} />
      <NodeLabel
        content={phase.amount}
        isActive={isActive}
        type="amount"
        lang={lang}
      />
      <NodeLabel
        content={phase.title}
        isActive={isActive}
        type="title"
        lang={lang}
      />
    </>
  );
}