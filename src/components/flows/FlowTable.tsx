import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { formatCurrency } from '../../utils/formatters';
import type { MonthlyFlow } from '../../types';

interface FlowTableProps {
  flows: MonthlyFlow[];
  lang: 'fr' | 'en';
}

function FlowTooltip({ content }: { content: string }) {
  return (
    <div className="group relative inline-block ml-1">
      <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
      <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-1 text-sm bg-gray-800 text-white rounded-lg -left-20 top-full">
        {content}
        <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}

export function FlowTable({ flows, lang }: FlowTableProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              {t('flows.period')}
            </th>
            {Object.entries({
              placedCapital: 'flows.placedCapital',
              placementInterest: 'flows.placementInterest',
              creditUsed: 'flows.creditUsed',
              creditInterest: 'flows.creditInterest',
              fundingCall: 'flows.fundingCall',
              saleAmount: 'flows.saleAmount',
              netPosition: 'flows.netPosition'
            }).map(([key, labelKey]) => (
              <th key={key} className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                {t(labelKey)}
                <FlowTooltip content={t(`${labelKey}Help`)} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {flows.map((flow, index) => (
            <tr 
              key={index}
              className={`
                ${flow.fundingCall ? 'bg-blue-50' : ''}
                ${flow.saleAmount ? 'bg-green-50' : ''}
                hover:bg-gray-50 transition-colors
              `}
            >
              <td className="px-4 py-3 text-sm text-gray-900">
                {t('common.cycle')} {flow.cycleIndex + 1} - {t('common.month')} {flow.month + 1}
              </td>
              <td className="px-4 py-3 text-sm text-right text-gray-900">
                {formatCurrency(flow.placedCapital, lang)}
              </td>
              <td className="px-4 py-3 text-sm text-right text-green-600">
                {formatCurrency(flow.placementInterest, lang)}
              </td>
              <td className="px-4 py-3 text-sm text-right text-gray-900">
                {formatCurrency(flow.creditUsed, lang)}
              </td>
              <td className="px-4 py-3 text-sm text-right text-red-600">
                {formatCurrency(flow.creditInterest, lang)}
              </td>
              <td className="px-4 py-3 text-sm text-right text-blue-600">
                {flow.fundingCall ? formatCurrency(flow.fundingCall, lang) : '-'}
              </td>
              <td className="px-4 py-3 text-sm text-right text-green-600">
                {flow.saleAmount ? formatCurrency(flow.saleAmount, lang) : '-'}
              </td>
              <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                {formatCurrency(flow.netPosition, lang)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}