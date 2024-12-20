import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from '../../../i18n';
import { formatCurrency } from '../../../utils/formatters';
import type { CashFlowData } from './types';
import { FLOW_COLORS } from './constants';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CashFlowTimelineProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function CashFlowTimeline({ data, lang }: CashFlowTimelineProps) {
  const { t } = useTranslation(lang);

  const chartData = {
    labels: data.map(item => item.period),
    datasets: [{
      data: data.map(item => item.amount),
      backgroundColor: data.map(item => 
        item.type === 'funding' ? FLOW_COLORS.FUNDING :
        item.type === 'sale' ? FLOW_COLORS.SALE :
        item.amount >= 0 ? FLOW_COLORS.INTEREST_POSITIVE : 
        FLOW_COLORS.INTEREST_NEGATIVE
      ),
      borderRadius: 6,
      borderWidth: 2,
      borderColor: 'transparent',
      hoverBorderColor: '#6366F1',
      hoverBorderWidth: 2,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          label: (context: any) => formatCurrency(context.parsed.y, lang),
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
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        {t('flows.title')}
      </h3>

      <div className="h-[300px] relative">
        <Bar data={chartData} options={options} />
      </div>

      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {[
          { color: FLOW_COLORS.FUNDING, label: t('timeline.funding') },
          { color: FLOW_COLORS.SALE, label: t('timeline.sale') },
          { color: FLOW_COLORS.INTEREST_POSITIVE, label: t('flows.placementInterest') }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }} 
            />
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}