export * from './variants';
export * from './spring';
export * from './gestures';

export const ANIMATION_DURATIONS = {
  phase: 0.3,
  progress: 0.5,
  details: 0.4
} as const;

export const ANIMATION_DELAYS = {
  phaseStagger: 0.1,
  detailsStagger: 0.05
} as const;