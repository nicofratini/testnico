
import { useEffect, useRef, useState } from 'react';

interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = '0px',
  triggerOnce = false
}: IntersectionOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (triggerOnce && entry.isIntersecting) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isIntersecting };
}
