export const phaseVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.05 },
  active: { scale: 1.1, y: -8 }
};

export const connectorVariants = {
  initial: { width: '0%' },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: { duration: 0.5 }
  })
};

export const detailsVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const dotVariants = {
  initial: { scale: 0 },
  animate: (delay: number) => ({
    scale: 1,
    transition: { delay: delay * 0.1 }
  })
};