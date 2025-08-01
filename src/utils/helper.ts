type GenerateSeriesOptions = {
  data: { [key: string]: string }[];
  column: string;
  isNumberBased?: boolean;
  zeroLength?: number;
  stringPrefix?: string;
  includeDate?: boolean;
  dateFormat?: 'YYYYMMDD' | 'YYMMDD' | 'YYYY-MM-DD';
};

// Formats the current date based on the specified format
// Returns a string in the format YYYYMMDD, YYMMDD, or YYYY-MM-DD
const formatDate = (format: string): string => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());

  switch (format) {
    case 'YYYYMMDD': return `${year}${month}${day}`;
    case 'YYMMDD': return `${year.toString().slice(-2)}${month}${day}`;
    case 'YYYY-MM-DD': return `${year}-${month}-${day}`;
    default: return `${year}${month}${day}`;
  }
};

// Generates a unique series ID based on the provided options
// The ID can be a number or a string with a prefix and date
// It checks existing IDs in the data array and increments the last number found
// If no existing IDs are found, it starts from 1 or the specified zeroLength
// If includeDate is true, it appends the current date in the specified format
// If isNumberBased is true, it returns only the number part without the prefix
export const GenerateSeriesId = ({
  data,
  column,
  isNumberBased = false,
  zeroLength = 8,
  stringPrefix = '',
  includeDate = false,
  dateFormat = 'YYYYMMDD',
}: GenerateSeriesOptions): string => {
  const currentDate = includeDate ? formatDate(dateFormat) : '';
  const currentPrefix = [stringPrefix, currentDate].filter(Boolean).join('');

  // Filter valid entries with the same prefix
  const filtered = data
    .map((item) => item[column])
    .filter(Boolean)
    .map((val) => {
      const [prefixPart, numberPart] = val.split('-');
      return {
        prefix: prefixPart,
        number: parseInt(numberPart || '', 10),
        raw: val,
      };
    })
    .filter(entry => entry.prefix === currentPrefix && !isNaN(entry.number));

  // Sort numerically by series number
  const sorted = filtered.sort((a, b) => a.number - b.number);
  const lastNumber = sorted.length > 0 ? sorted[sorted.length - 1].number : 0;
  const nextNumber = lastNumber + 1;
  const paddedNumber = nextNumber.toString().padStart(zeroLength, '0');

  if (isNumberBased) {
    return paddedNumber;
  } else {
    return `${currentPrefix}-${paddedNumber}`;
  }
};

//return a console log with date
export const log = (label: string, data: any): void => {
  const date = new Date().toISOString();
  console.log(`${date} - ${label}`);
  console.dir(data, { depth: null });
};

// Check if a string is a valid email format
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}


// Check if a string is a valid URL format
export function isURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

// Check if a string is a valid phone number format
// This regex checks for E.164 format, which is commonly used for international phone numbers
export function isPhoneNumber(value: string): boolean {
  return /^\+?[1-9]\d{1,14}$/.test(value); // E.164 format
}

// Check if a value is empty
// It checks for null, undefined, empty strings, empty arrays, and empty objects
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
