import { common as commonEn } from './translations/common/en';
import { common as commonFr } from './translations/common/fr';
import { flows as flowsEn } from './translations/flows/en';
import { flows as flowsFr } from './translations/flows/fr';
import { timeline as timelineEn } from './translations/timeline/en';
import { timeline as timelineFr } from './translations/timeline/fr';
import { parameters as parametersEn } from './translations/parameters/en';
import { parameters as parametersFr } from './translations/parameters/fr';
import { results as resultsEn } from './translations/results/en';
import { results as resultsFr } from './translations/results/fr';
import { investment as investmentEn } from './translations/investment/en';
import { investment as investmentFr } from './translations/investment/fr';

const translations = {
  en: {
    common: commonEn,
    flows: flowsEn,
    timeline: timelineEn,
    parameters: parametersEn,
    results: resultsEn,
    investment: investmentEn
  },
  fr: {
    common: commonFr,
    flows: flowsFr,
    timeline: timelineFr,
    parameters: parametersFr,
    results: resultsFr,
    investment: investmentFr
  }
} as const;

export type Language = 'fr' | 'en';
export type TranslationKey = keyof typeof translations.en | 
  `${keyof typeof translations.en}.${string}`;

export function useTranslation(lang: Language = 'fr') {
  return {
    t: (key: TranslationKey) => {
      const keys = key.split('.');
      let value: any = translations[lang];
      
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) return key;
      }
      
      return value as string;
    }
  };
}