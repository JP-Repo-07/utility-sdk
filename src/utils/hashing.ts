import { randomUUID, createHash } from 'crypto';

// This file provides utility functions for hashing and generating UUIDs.
export function generateUUID(): string {
  return randomUUID();
}

// Hash a string using SHA-256
// Returns a hexadecimal string representation of the hash
export function hashString(str: string): string {
  return createHash('sha256').update(str).digest('hex');
}
