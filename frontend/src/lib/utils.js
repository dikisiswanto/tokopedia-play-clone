import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function currencyFormatter(value, options = {}) {
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: '.',
    decimalSeparator: ',',
    symbol: 'Rp',
  };

  if (typeof value !== 'number') value = 0;
  options = { ...defaultOptions, ...options };
  value = value.toFixed(options.significantDigits);

  const [currency] = value.split('.');
  return `${options.symbol}${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator,
  )}`;
}
export function formatDate(date) {
  const inputDate = new Date(date);

  if (isNaN(inputDate)) {
    return 'Invalid date';
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = inputDate.getDate();
  const month = months[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function simplifyNumber(number) {
  const formats = [
    { limit: 1e3, suffix: '' },
    { limit: 1e6, suffix: 'K' },
    { limit: 1e9, suffix: 'M' },
    { limit: 1e12, suffix: 'B' },
    { limit: 1e15, suffix: 'T' },
  ];

  const format = formats.find((format) => number < format.limit);
  const simplifiedNumber = (number / (format ? format.limit / 1000 : 1)).toFixed(1);

  return `${simplifiedNumber.replace(/\.0$/, '')}${format ? format.suffix : ''}`;
}

export function generateUsername(fullName) {
  const words = fullName.trim().split(/\s+/);

  const collator = new Intl.Collator(undefined, { sensitivity: 'base' });

  const getUsernamePart = (part) => {
    return part.length > 2 || collator.compare(part, part.toLowerCase()) === 0
      ? part.toLowerCase()
      : part[0].toLowerCase();
  };

  if (words.length === 0) return '';
  if (words.length === 1) return getUsernamePart(words[0]);

  const firstPart = getUsernamePart(words[0]);
  const secondPart = getUsernamePart(words[1]);
  const initials = words
    .slice(2)
    .map((word) => word[0].toLowerCase())
    .join('');

  return `${firstPart}${secondPart}${initials}`;
}

export function convertToLocalTime(datetimeInput) {
  const inputDate = new Date(datetimeInput);
  if (isNaN(inputDate)) {
    return 'Invalid datetime';
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    hourCycle: 'h23',
  };

  return inputDate.toLocaleDateString('en-US', options);
}
