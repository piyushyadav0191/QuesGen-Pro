import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeDelta(seconds: number) {
  const hours = Math.floor(seconds / 3600); // 1hour = 3600 seconds
  const minutes = Math.floor((seconds - hours * 3600) / 60); // 1minute = 60 seconds
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60); // 1minute = 60 seconds
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);
  return parts.join(" ");
}
