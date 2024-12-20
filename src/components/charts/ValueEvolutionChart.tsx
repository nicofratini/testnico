import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTranslation } from '../../i18n';
import { formatCurrency } from '../../utils/formatters';
import type { TimelineEvent } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ValueEvolutionChartProps {
  events: TimelineEvent[];
  lang: 'fr' | 'en';
}

export function ValueEvolutionChart({ events, lang }: ValueEvolutionChartProps) {
  const { t } = useTranslation(lang);

  // Prepare data points
  const labels = events.map(event => `${t('common.month')} ${event.month + 1}`);
  const values = events.map(event => event.amount);

  const data = {
    labels,
    datasets: [
      {
        label: t('results.capitalEvolution'),
        data: values,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        pointBackgroundColor: events.map(event => 
          event.type === 'funding' ? '#3B82F6' : '#10B981'
        ),
        pointRadius: events.map(event => 
          event.type === 'funding' ? 4 : 6
        ),
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const event = events[context.dataIndex];
            const value = formatCurrency(event.amount, lang);
            const description = event.details.description || '';
            return [
              `${event.type === 'funding' ? t('timeline.funding') : t('timeline.sale')}: ${value}`,
              description ? `${description}` : ''
            ].filter(Boolean);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => formatCurrency(value, lang)
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {t('results.capitalEvolution')}
      </h3>
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-600">{t('timeline.funding')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-sm text-gray-600">{t('timeline.sale')}</span>
        </div>
      </div>
    </div>
  );
}