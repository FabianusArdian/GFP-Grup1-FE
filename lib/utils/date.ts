
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatDate(date: string | Date, pattern = 'dd MMM yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, pattern, { locale: id });
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { 
    addSuffix: true,
    locale: id 
  });
}

export function isValidDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
}
