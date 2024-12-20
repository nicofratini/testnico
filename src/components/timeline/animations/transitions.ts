export const TRANSITIONS = {
  phase: {
    enter: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    tap: {
      scale: 0.95,
      transition: { type: "spring", stiffness: 500, damping: 30 }
    }
  },
  connector: {
    progress: {
      initial: { width: "0%" },
      animate: (progress: number) => ({
        width: `${progress}%`,
        transition: { duration: 0.5, ease: "easeOut" }
      })
    },
    glow: {
      animate: {
        x: [0, 100],
        opacity: [0, 1, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }
  },
  details: {
    container: {
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: "auto" },
      exit: { opacity: 0, height: 0 },
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    content: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.2 }
    }
  }
} as const;