# Utility SDK

A lightweight and developer-friendly utility SDK for Node.js and TypeScript projects. It includes string manipulation, date/time formatting, validation, hashing, and HTTP helper functions — all with minimal dependencies.

---

## 📦 Installation

```bash
npm install utility-sdk
```
---

## 📚 Usage

```bash
import { capitalize, isEmail, formatDate } from 'utility-sdk';

console.log(capitalize('hello world')); // Hello world
console.log(isEmail('test@example.com')); // true
console.log(formatDate(new Date()));     // 2025-07-31 (example)
```

---

## 🧰 Utilities Overview

📅 Date Utilities (date.ts)

isPast24Hours(dateOrTimestamp: Date | number): boolean
→ Checks if a given date is within the last 24 hours.

isToday(dateOrTimestamp: Date | number): boolean
→ Determines if a date is today.

formatDate(dateOrTimestamp: Date | number, separator = '-'): string
→ Formats a date to YYYY-MM-DD.

isWeekend(dateOrTimestamp: Date | number): boolean
→ Returns true if the date falls on a weekend.

daysBetween(start: Date | number, end: Date | number): number
→ Calculates how many days are between two dates.

getTimeAgo(dateOrTimestamp: Date | number): string
→ Returns a relative time ago string (e.g. "5 minutes ago").

---

## 🔐 Hashing Utilities (hashing.ts)
generateUUID(): string
→ Generates a unique UUID v4.

hashString(input: string): string
→ Returns a SHA-256 hash of the string.

---

## 🔧 Helper Utilities (helper.ts)
GenerateSeriesId(prefix = '', length = 8): string
→ Creates a custom ID with optional prefix.

log(message: any): void
→ Logs with timestamp.

isEmail(input: string): boolean
→ Validates email format.

isURL(input: string): boolean
→ Validates URL format.

isPhoneNumber(input: string): boolean
→ Validates phone number format.

isEmpty(value: any): boolean
→ Checks if a value is null, undefined, or empty.

---

## 🌐 HTTP Utilities (http.ts)
httpRequest(method: 'GET' | 'POST', url: string, options: { params?, queryParams?, body?, headers? }): Promise<any>
→ Wrapper around Axios for GET and POST requests.
→ Automatically returns .data from the response.

---

## 🔢 Number Utilities (number.ts)
isEven(n: number): boolean
→ Checks if a number is even.

isOdd(n: number): boolean
→ Checks if a number is odd.

roundTo(num: number, decimals: number): number
→ Rounds a number to a fixed number of decimal places.

toPercent(value: number, total: number): string
→ Returns percentage string based on total.

formatWithCommas(num: number): string
→ Formats number with thousand separators.

---

## 🔠 String Utilities (string.ts)
capitalize(str: string): string
→ Capitalizes the first letter.

toPascalCase(str: string): string
→ Converts to PascalCase.

truncate(str: string, maxLength: number): string
→ Trims and adds ... when exceeding max length.

checkIfPureString(str: string, allowWhiteSpace = false): boolean
→ Checks if a string contains only alphabetic characters (with optional whitespace).

---

## 📁 Project Structure

utility-sdk/
├── src/
│   ├── date.ts
│   ├── hashing.ts
│   ├── helper.ts
│   ├── http.ts
│   ├── number.ts
│   └── string.ts
├── dist/
├── package.json
└── README.md

---

## 🛡️ License
MIT License