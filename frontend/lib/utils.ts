import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistance } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const formatTimeAgo = (date: string) => {
  const now = new Date();
  const diffInSeconds = Math.round((now.getTime() - new Date(date).getTime()) / 1000);

  if (diffInSeconds < 60) {
    // Handle cases for less than a minute
    return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
  }

  // Fallback to date-fns for larger differences
  const formatted = formatDistance(new Date(date), now, { addSuffix: true });
  return formatted.replace(/^about\s/, ''); // Remove "about" if present
};