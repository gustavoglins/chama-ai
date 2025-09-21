import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

export type { ClassValue };

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transform(value: boolean | string): boolean {
  return typeof value === 'string' ? value === '' : value;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
