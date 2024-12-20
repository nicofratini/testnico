
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPRING_CONFIGS } from '../../animations/spring';

interface TooltipProps {
  content: React.ReactNode;
  isVisible: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ 
  content, 
  isVisible, 
  position = 'top',
  className = '' 
}: TooltipProps) {
  const positionStyles = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`
            absolute z-50 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg
            ${positionStyles[position]} ${className}
          `}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={SPRING_CONFIGS.gentle}
        >
          {content}
          <div 
            className={`
              absolute w-2 h-2 bg-gray-800 transform rotate-45
              ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : ''}
              ${position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' : ''}
            `}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
