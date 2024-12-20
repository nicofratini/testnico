import React from 'react';
import { useTranslation } from '../../../../i18n';

interface CashFlowHeaderProps {
  lang: 'fr' | 'en';
}

export function CashFlowHeader({ lang }: CashFlowHeaderProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">
        {t('flows.title')}
      </h3>
    </div>
  );
}