import React from 'react';
import { Bar } from 'react-chartjs-2';
import type { CashFlowData } from '../types';
import { useCashFlowChart } from '../hooks/useCashFlowChart';

interface CashFlowChartProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function CashFlowChart({ data, lang }: CashFlowChartProps) {
  const { chartData, chartOptions } = useCashFlowChart(data, lang);

  return (
    <div className="h-[300px] relative">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}