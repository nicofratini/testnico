import { useMemo } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { formatCurrency } from '../../../../utils/formatters';
import { FLOW_COLORS } from '../constants/colors';
import type { CashFlowData } from '../types';

export function useCashFlowChart(data: CashFlowData[], lang: 'fr' | 'en') {
  const chartData = useMemo<ChartData<'bar'>>(() => ({
    labels: data.map(item => item.period),
    datasets: [{
      label: 'Cash Flow',
      data: data.map(item => item.amount),
      backgroundColor: data.map(item => {
        switch (item.type) {
          case 'funding':
            return FLOW_COLORS.FUNDING;
          case 'sale':
            return FLOW_COLORS.SALE;
          case 'interest':
            return item.amount >= 0 
              ? FLOW_COLORS.INTEREST_POSITIVE 
              : FLOW_COLORS.INTEREST_NEGATIVE;
        }
      }),
      borderRadius: 6,
      borderWidth: 2,
      borderColor: 'transparent',
      hoverBorderColor: '#6366F1',
      hoverBorderWidth: 2,
    }],
  }), [data]);

  const chartOptions = useMemo<ChartOptions<'bar'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => formatCurrency(context.parsed.y, lang),
        },
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
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
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          callback: (value) => formatCurrency(value as number, lang),
          font: {
            size: 12
          }
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false
    },
  }), [lang]);

  return { chartData, chartOptions };
}