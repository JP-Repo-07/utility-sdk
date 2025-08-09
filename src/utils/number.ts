import { deepGet } from "./optimization";

//check if number is Even
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

// Check if a number is Odd
export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

// Round a number to a specified number of decimal places
// Default is 2 decimal places, can be adjusted with the decimals parameter
export function roundTo(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

// Convert a number to a percentage string with specified decimal places
// Default is 2 decimal places, can be adjusted with the decimals parameter
export function toPercent(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

// Format a number with commas as thousands separators
// If haveDecimals is true, it formats with 2 decimal places
// If haveDecimals is false, it formats as an integer
export function formatWithCommas(num: number, haveDecimals: boolean): string {
  if (haveDecimals) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return num.toLocaleString();
}

// Calculate the sum of a specific property in an array of objects, grouped by a specified key
// It can also filter by a status property if provided
export function groupedSum(
  data: Record<string, any>[],
  groupByPath: string,
  key: string | number,
  sumPath: string,
  statusPath?: string,
  statusValue?: string | number,
): number {
  return data.reduce((sum: number, item: any) => {

    const groupKey = deepGet(groupByPath, item);
    if (groupKey !== key) return sum;

    if (statusPath && statusValue !== undefined) {
      const status = deepGet(statusPath, item);
      if (status !== statusValue) return sum;
    }

    const value = deepGet(sumPath, item);
    const num = Number(value);

    if (Number.isFinite(num)) {
      return sum + num;
    }

    return sum;
  }, 0);
}
