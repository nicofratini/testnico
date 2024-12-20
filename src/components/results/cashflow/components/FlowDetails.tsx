import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { useTranslation } from '../../../../i18n';
import { formatCurrency } from '../../../../utils/formatters';
import type { CashFlowData } from '../types';

interface FlowDetailsProps {
  data: CashFlowData[];
  lang: 'fr' | 'en';
}

export function FlowDetails({ data, lang }: FlowDetailsProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('flows.period')}
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('flows.amount')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('flows.type')}
            </th>
            {data.some(item => item.details) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('flows.details')}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((flow, index) => (
            <tr 
              key={index}
              className={`
                ${flow.type === 'funding' ? 'bg-red-50/30' : ''}
                ${flow.type === 'sale' ? 'bg-green-50/30' : ''}
                hover:bg-gray-50 transition-colors
              `}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {flow.period}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className={flow.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(Math.abs(flow.amount), lang)}
                  </span>
                  {flow.amount >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${flow.type === 'funding' ? 'bg-blue-100 text-blue-800' : ''}
                  ${flow.type === 'sale' ? 'bg-green-100 text-green-800' : ''}
                  ${flow.type === 'interest' ? 'bg-purple-100 text-purple-800' : ''}
                `}>
                  {t(`flows.${flow.type}`)}
                </span>
              </td>
              {data.some(item => item.details) && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {flow.details && (
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-400" />
                      {flow.details}
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}