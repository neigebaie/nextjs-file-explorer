import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAgo(date: Date, lang = "en") {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // if less than one hour -> display minutes
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  }

  // if less than a day -> display hours
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  const yearNow = now.getFullYear();
  const yearDate = date.getFullYear();

  // if in the same year -> display day of the month + month in long ex: 12 Nov.
  if (yearNow === yearDate) {
    return new Intl.DateTimeFormat(lang, {
      day: "numeric",
      month: "short",
    }).format(date);
  }

  // Define the formatter for the date
  const formatter = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // if it's last year or older -> display date, month, and year ex: 12 Nov. 2020
  return formatter.format(date);
}

export function formatSize(size: number): string {
  if (size === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  const formattedSize = parseFloat((size / Math.pow(k, i)).toFixed(2));
  return `${formattedSize} ${sizes[i]}`;
}
