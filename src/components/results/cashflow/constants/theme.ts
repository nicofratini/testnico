export const CHART_THEME = {
  colors: {
    primary: '#6366F1',
    primaryLight: 'rgba(99, 102, 241, 0.1)',
    tooltipBackground: 'rgba(255, 255, 255, 0.95)',
    tooltipTitle: '#1F2937',
    tooltipBody: '#374151',
    tooltipBorder: '#E5E7EB',
    gridLines: '#F3F4F6',
    funding: '#3B82F6',
    sale: '#10B981',
    interestPositive: '#8B5CF6',
    interestNegative: '#EF4444'
  },
  fonts: {
    tooltip: {
      title: {
        size: 14,
        weight: '600'
      },
      body: {
        size: 13
      }
    },
    axis: {
      size: 12,
      family: 'system-ui'
    }
  },
  borderRadius: 8,
  padding: {
    tooltip: 12
  }
} as const;

export const CARD_THEME = {
  colors: {
    positive: {
      bg: 'bg-green-50',
      text: 'text-green-600'
    },
    negative: {
      bg: 'bg-red-50',
      text: 'text-red-600'
    },
    neutral: {
      bg: 'bg-blue-50',
      text: 'text-blue-600'
    }
  },
  animation: {
    hover: 'transition-all duration-300 hover:shadow-md'
  }
} as const;