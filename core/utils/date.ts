import { format, formatDistance, formatRelative } from 'date-fns';
import { format as formatJalali } from 'date-fns-jalali';
import { enUS, faIR } from 'date-fns/locale';

export function formatDate(date: Date, locale: 'en' | 'fa' = 'en') {
  if (locale === 'fa') {
    return formatJalali(date, 'yyyy/MM/dd', { locale: faIR });
  }
  return format(date, 'yyyy/MM/dd', { locale: enUS });
}

export function timeAgo(date: Date, locale: 'en' | 'fa' = 'en') {
  return formatDistance(date, new Date(), {
    addSuffix: true,
    locale: locale === 'fa' ? faIR : enUS,
  });
}