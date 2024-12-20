
export const SPRING_CONFIGS = {
  gentle: {
    type: "spring",
    stiffness: 120,
    damping: 14,
    mass: 1
  },
  bounce: {
    type: "spring",
    stiffness: 200,
    damping: 10,
    mass: 1
  },
  stiff: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1
  }
} as const;

export const TIMING_CONFIGS = {
  phase: {
    duration: 0.3,
    stagger: 0.1
  },
  connector: {
    duration: 0.5,
    glow: 2
  },
  tooltip: {
    enter: 0.2,
    exit: 0.15
  }
} as const;
