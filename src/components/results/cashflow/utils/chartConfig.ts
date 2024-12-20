import { CHART_THEME } from '../constants/theme';
import { formatCurrency } from '../../../../utils/formatters';
import type { CashFlowData, ChartConfig } from '../types';

export function createChartConfig(data: CashFlowData[], lang: 'fr' | 'en'): ChartConfig {
  return {
    data: {
      labels: data.map(item => item.period),
      datasets: [{
        label: 'Cash Flow',
        data: data.map(item => item.amount),
        backgroundColor: data.map(item => {
          switch (item.type) {
            case 'funding':
              return CHART_THEME.colors.funding;
            case 'sale':
              return CHART_THEME.colors.sale;
            case 'interest':
              return item.amount >= 0 
                ? CHART_THEME.colors.interestPositive 
                : CHART_THEME.colors.interestNegative;
          }
        }),
        borderRadius: CHART_THEME.borderRadius,
        borderWidth: 2,
        borderColor: 'transparent',
        hoverBorderColor: CHART_THEME.colors.hoverBorder,
        hoverBorderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: CHART_THEME.animation,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: CHART_THEME.colors.tooltipBackground,
          titleColor: '#1F2937',
          bodyColor: '#374151',
          borderColor: CHART_THEME.colors.tooltipBorder,
          borderWidth: 1,
          padding: CHART_THEME.padding.tooltip,
          cornerRadius: CHART_THEME.borderRadius,
          callbacks: {
            label: (context) => formatCurrency(context.parsed.y, lang),
          },
          titleFont: CHART_THEME.fonts.tooltip.title,
          bodyFont: CHART_THEME.fonts.tooltip.body,
          displayColors: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: CHART_THEME.fonts.axis.size
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: CHART_THEME.colors.gridLines,
          },
          ticks: {
            callback: (value) => formatCurrency(value as number, lang),
            font: {
              size: CHART_THEME.fonts.axis.size
            }
          },
        },
      },
      hover: {
        mode: 'index',
        intersect: false
      },
    },
  };
}