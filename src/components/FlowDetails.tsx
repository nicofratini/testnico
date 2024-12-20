import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import type { MonthlyFlow } from '../utils/detailedFlowCalculations';
import { useTranslation } from '../i18n';

interface FlowDetailsProps {
  flows: MonthlyFlow[];
  lang?: 'fr' | 'en';
}

function Tooltip({ content }: { content: string }) {
  return (
    <div className="group relative inline-block">
      <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
      <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-1 text-sm bg-gray-800 text-white rounded-lg -left-20 top-full">
        {content}
        <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}

export function FlowDetails({ flows, lang = 'fr' }: FlowDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation(lang);
  const displayedFlows = isExpanded ? flows : flows.slice(0, 5);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {t('detailedFlows')}
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                {t('month')}
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                {t('placedCapital')} <Tooltip content={t('placedCapitalHelp')} />
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                {t('placementInterest')} <Tooltip content={t('placementInterestHelp')} />
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                {t('creditUsed')} <Tooltip content={t('creditUsedHelp')} />
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                {t('creditInterest')} <Tooltip content={t('creditInterestHelp')} />
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                {t('fundingCall')} <Tooltip content={t('fundingCallHelp')} />
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                {t('saleAmount')} <Tooltip content={t('saleAmountHelp')} />
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                {t('netPosition')} <Tooltip content={t('netPositionHelp')} />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayedFlows.map((flow, index) => (
              <tr 
                key={index}
                className={`
                  ${flow.fundingCall ? 'bg-blue-50' : ''}
                  ${flow.saleAmount ? 'bg-green-50' : ''}
                  hover:bg-gray-50 transition-colors
                `}
              >
                <td className="px-4 py-3 text-sm text-gray-900">
                  {t('cycle')} {flow.cycleIndex + 1} - {t('month')} {flow.month + 1}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {formatCurrency(flow.placedCapital)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-green-600">
                  {formatCurrency(flow.placementInterest)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-900">
                  {formatCurrency(flow.creditUsed)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-red-600">
                  {formatCurrency(flow.creditInterest)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-blue-600">
                  {flow.fundingCall ? formatCurrency(flow.fundingCall) : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-right text-green-600">
                  {flow.saleAmount ? formatCurrency(flow.saleAmount) : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                  {formatCurrency(flow.netPosition)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {flows.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              {t('showLess')}
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              {t('showMore')}
            </>
          )}
        </button>
      )}
    </div>
  );
}