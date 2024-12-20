import { ReactNode } from 'react';

export interface Phase {
  icon: ReactNode;
  title: string;
  amount: number;
  description: string;
  color: string;
  details: string[];
}

export interface TimelineProps {
  phases: Phase[];
  hoveredPhase: number | null;
  onHover: (index: number | null) => void;
}

export interface PhaseProps {
  phase: Phase;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}