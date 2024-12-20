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
import type { SimulationResult } from '../../types';
import { useTranslation } from '../../i18n';
import { formatCurrency } from '../../utils/formatters';

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

interface ResultsChartProps {
  results: SimulationResult;
  lang: 'fr' | 'en';
}

export function ResultsChart({ results, lang }: ResultsChartProps) {
  const { t } = useTranslation(lang);
  
  const data = {
    labels: results.cycles.map((_, index) => `${t('common.cycle')} ${index + 1}`),
    datasets: [
      {
        label: t('results.capitalEvolution'),
        data: results.cycles.map(cycle => cycle.finalCapital),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
            const value = context.raw;
            return formatCurrency(value, lang);
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
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="h-[300px] relative">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}