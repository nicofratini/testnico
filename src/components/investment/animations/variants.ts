export const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const detailsVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 }
};

export const progressVariants = {
  initial: { width: '0%' },
  animate: (progress: number) => ({ 
    width: `${progress}%`,
    transition: { duration: 0.5 } 
  })
};