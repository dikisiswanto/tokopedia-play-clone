import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function currencyFormatter(value, options = {}) {
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: '.',
    decimalSeparator: ',',
    symbol: 'Rp'
  }

  if (typeof value !== 'number') value = 0;
  options = { ...defaultOptions, ...options }
  value = value.toFixed(options.significantDigits)

  const [currency] = value.split('.')
  return `${options.symbol}${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}`
}

export function formatDate(date) {
  const inputDate = new Date(date);
  
  if (isNaN(inputDate)) {
    return "Invalid date";
  }

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const day = inputDate.getDate();
  const month = months[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  return `${day} ${month} ${year}`;
}

export function simplifyNumber(number) {
  const formats = [
    { limit: 1e3, suffix: '' },
    { limit: 1e6, suffix: ' ribu' },
    { limit: 1e9, suffix: ' juta' },
    { limit: 1e12, suffix: ' miliar' },
    { limit: 1e15, suffix: ' triliun' }
  ];

  const format = formats.find(format => number < format.limit);
  const simplifiedNumber = (number / (format ? format.limit / 1000 : 1)).toFixed(2);
  
  return `${simplifiedNumber.replace(/\.00$/, '')}${format ? format.suffix : ''}`;
}