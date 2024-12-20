import { useMemo } from 'react';
import { CHART_THEME } from '../constants/theme';

export function useChartAnimation() {
  return useMemo(() => ({
    enter: {
      duration: CHART_THEME.animation.duration,
      easing: CHART_THEME.animation.easing,
      from: {
        y: 50,
        opacity: 0
      },
      to: {
        y: 0,
        opacity: 1
      }
    },
    update: {
      duration: CHART_THEME.animation.duration / 2,
      easing: 'easeInOutQuad'
    }
  }), []);
}