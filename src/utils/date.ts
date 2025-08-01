// get timestamp in seconds
// check if timestamp is past 24 hours
// return true if past 24 hours, false otherwise
export const isPast24Hours = (timestamp: number): boolean => {
  const timestampMs = timestamp * 1000; // Convert to milliseconds
  const now = Date.now(); // Current time in milliseconds
  const msIn24Hours = 24 * 60 * 60 * 1000;

  if(now > (timestampMs + msIn24Hours)){ // 24 hours in milliseconds
    return true
  } else {
    return false
  } 
}

// get timestamp in seconds
// check if timestamp is today
export const isToday = (timestamp: number): boolean => {
const now = new Date();

   const offset = 8; 

  // Get the beginning of today (00:00:00)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    // const startOfDay = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0 - offset).getTime();

  // Get the end of today (23:59:59.999)
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - 1;
    // const endOfDay = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 24 - offset).getTime() - 1;

  // Convert from ms to seconds (since your timestamps are in seconds)
  const startTimestamp = Math.floor(startOfDay / 1000);
  const endTimestamp = Math.floor(endOfDay / 1000);

  return timestamp >= startTimestamp && timestamp <= endTimestamp
}


type DateInput = Date | number; // Date or timestamp in seconds
// Converts a Date object or a timestamp in seconds to a Date object
function toDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input * 1000);
}

/**
 * Formats a date or timestamp (in seconds) to a string like 'YYYY-MM-DD'.
 * @param date - A Date object or a UNIX timestamp in seconds
 * @param separator - Optional separator (default: '-')
 */
export function formatDate(date: DateInput, separator = '-'): string {
  const targetDate = toDate(date);
  const y = targetDate.getFullYear();
  const m = String(targetDate.getMonth() + 1).padStart(2, '0');
  const d = String(targetDate.getDate()).padStart(2, '0');

  return `${y}${separator}${m}${separator}${d}`;
}

// Checks if a date or timestamp (in seconds) falls on a weekend (Saturday or Sunday)
export function isWeekend(date: DateInput): boolean {
  const d = toDate(date);
  const day = d.getDay();
  return day === 0 || day === 6;
}

// Calculates the number of days between two dates or timestamps (in seconds)
// Returns the absolute difference in days
export function daysBetween(date1: DateInput, date2: DateInput): number {
  const d1 = toDate(date1);
  const d2 = toDate(date2);
  const diff = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Returns a human-readable string indicating how long ago a date or timestamp (in seconds) was
// e.g., "5 min ago", "2 days ago", etc.
export function getTimeAgo(date: DateInput): string {
  const past = toDate(date).getTime();
  const now = Date.now();
  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}