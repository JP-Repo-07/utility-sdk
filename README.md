# Utility SDK

A lightweight and minimal-dependency TypeScript SDK providing a wide range of commonly-used utility functions to speed up development. Useful for Node.js and browser-based apps alike.

---

## ✨ Features

- 📦 Simple and easy-to-use functions  
- ⚡ Written in TypeScript  
- 🧼 Minimal third-party dependencies  
- 🧱 Modular and tree-shakable  
- ✅ Includes validations, date handling, string and number tools, and more  

---

## 📦 Installation

```bash
npm install utility-sdk

📚 Usage

import { capitalize, isEmail, formatDate } from 'utility-sdk';

console.log(capitalize('hello world')); // Hello world
console.log(isEmail('test@example.com')); // true
console.log(formatDate(new Date()));     // 2025-07-31 (example)
```bash

🧰 Utilities

🗓️ Date (date.ts)
isPast24Hours(date: Date | number): boolean

isToday(date: Date | number): boolean

formatDate(date: Date | number, separator = '-'): string

isWeekend(date: Date | number): boolean

daysBetween(date1: Date | number, date2: Date | number): number

getTimeAgo(date: Date | number): string

🔐 Hashing (hashing.ts)
generateUUID(): string

hashString(str: string): string – Simple SHA-256 hash

🧩 Helper (helper.ts)
GenerateSeriesId(prefix?: string): string

log(data: any): void – Timestamped console logger

isEmail(email: string): boolean

isURL(url: string): boolean

isPhoneNumber(phone: string): boolean

isEmpty(value: any): boolean

🌐 HTTP (http.ts)
httpRequest({ method, url, data, headers }): Promise<any>
Supports GET and POST, handles req.body, params, and queryParams.

🔢 Number (number.ts)
isEven(n: number): boolean

isOdd(n: number): boolean

roundTo(value: number, decimals: number): number

toPercent(value: number, total: number): string

formatWithCommas(value: number): string

🔤 String (string.ts)
capitalize(str: string): string

toPascalCase(str: string): string

truncate(str: string, length: number): string

checkIfPureString(str: string, allowWhitespace = false): boolean


📁 Project Structure

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

🛡️ License
MIT License