import React from 'react';
import { useTranslation } from '../../../i18n';

interface TimelineHeaderProps {
  lang: 'fr' | 'en';
}

export function TimelineHeader({ lang }: TimelineHeaderProps) {
  const { t } = useTranslation(lang);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-800">
        {t('timeline.title')}
      </h2>
      <p className="mt-2 text-gray-600">
        {t('timeline.description')}
      </p>
    </div>
  );
}
