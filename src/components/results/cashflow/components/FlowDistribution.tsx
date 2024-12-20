import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from '../../../../i18n';
import { formatCurrency, formatPercent } from '../../../../utils/formatters';
import { FLOW_COLORS } from '../constants';
import type { CashFlowData } from '../types';

interface FlowDistributionProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function FlowDistribution({ data, lang }: FlowDistributionProps) {
  const { t } = useTranslation(lang);

  const distribution = React.useMemo(() => {
    const totals = data.reduce((acc, flow) => {
      const key = flow.type;
      acc[key] = (acc[key] || 0) + Math.abs(flow.amount);
      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);

    return {
      labels: Object.keys(totals).map(type => t(`flows.${type}`)),
      data: Object.values(totals),
      percentages: Object.values(totals).map(value => (value / total) * 100),
      colors: Object.keys(totals).map(type => FLOW_COLORS[type.toUpperCase()])
    };
  }, [data, t]);

  const chartData = {
    labels: distribution.labels,
    datasets: [{
      data: distribution.data,
      backgroundColor: distribution.colors,
      borderWidth: 0,
      hoverOffset: 4
    }]
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
            const value = formatCurrency(context.raw, lang);
            const percent = formatPercent(distribution.percentages[context.dataIndex], lang);
            return `${context.label}: ${value} (${percent})`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h4 className="text-sm font-medium text-gray-700 mb-4">
        {t('flows.distribution')}
      </h4>
      <div className="h-[200px] relative">
        <Doughnut data={chartData} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {distribution.labels.map((label, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: distribution.colors[index] }}
            />
            <span className="text-sm text-gray-600">
              {label}: {formatPercent(distribution.percentages[index], lang)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}