export function formatMonth(month: number, lang: 'fr' | 'en'): string {
  const date = new Date(2000, month % 12);
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long'
  }).format(date);
}

export function formatMonthYear(month: number, year: number, lang: 'fr' | 'en'): string {
  const date = new Date(year, month);
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date);
}