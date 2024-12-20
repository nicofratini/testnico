
import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeInView({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className = '' 
}: FadeInViewProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
