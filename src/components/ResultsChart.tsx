import React from 'react';
import { Line } from 'react-chartjs-2';
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
import type { SimulationResult } from '../types';
import { useTranslation } from '../i18n';

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
    labels: results.cycles.map((_, index) => `Cycle ${index + 1}`),
    datasets: [
      {
        label: t('capitalEvolution'),
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
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0
            }).format(value);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => {
            return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
              notation: 'compact'
            }).format(value);
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <Line data={data} options={options} />
    </div>
  );
}