import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from '../../../../i18n';
import { formatCurrency } from '../../../../utils/formatters';
import { CHART_THEME } from '../constants/theme';
import type { CashFlowData } from '../types';

interface FlowTrendsProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function FlowTrends({ data, lang }: FlowTrendsProps) {
  const { t } = useTranslation(lang);

  const cumulativeData = React.useMemo(() => {
    return data.reduce((acc: number[], flow) => {
      const last = acc[acc.length - 1] || 0;
      acc.push(last + flow.amount);
      return acc;
    }, []);
  }, [data]);

  const chartData = {
    labels: data.map(flow => flow.period),
    datasets: [{
      label: t('flows.cumulativeFlow'),
      data: cumulativeData,
      borderColor: CHART_THEME.colors.primary,
      backgroundColor: CHART_THEME.colors.primaryLight,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6
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
        backgroundColor: CHART_THEME.colors.tooltipBackground,
        titleColor: CHART_THEME.colors.tooltipTitle,
        bodyColor: CHART_THEME.colors.tooltipBody,
        borderColor: CHART_THEME.colors.tooltipBorder,
        borderWidth: 1,
        padding: CHART_THEME.padding.tooltip,
        cornerRadius: CHART_THEME.borderRadius,
        callbacks: {
          label: (context: any) => formatCurrency(context.raw, lang)
        },
        titleFont: CHART_THEME.fonts.tooltip.title,
        bodyFont: CHART_THEME.fonts.tooltip.body
      }
    },
    scales: {
      y: {
        grid: {
          color: CHART_THEME.colors.gridLines
        },
        ticks: {
          callback: (value: number) => formatCurrency(value, lang),
          font: CHART_THEME.fonts.axis
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: CHART_THEME.fonts.axis
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h4 className="text-sm font-medium text-gray-700 mb-4">
        {t('flows.cumulativeFlow')}
      </h4>
      <div className="h-[300px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}