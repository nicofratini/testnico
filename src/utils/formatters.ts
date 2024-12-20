export function formatCurrency(amount: number, lang: 'fr' | 'en'): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, lang: 'fr' | 'en'): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function formatCompactCurrency(amount: number, lang: 'fr' | 'en'): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    notation: 'compact',
  }).format(amount);
}