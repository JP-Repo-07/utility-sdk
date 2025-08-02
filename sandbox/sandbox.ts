import { debounce } from '../src/utils/debounce'

// Example 1: Function that returns a string
const sayHi = (name: string): string => {
  console.log("sayHi ran")
  return `Hi, ${name}`
}

const debouncedHi = debounce(sayHi, 5000)

const result = debouncedHi("John")

// This result will be undefined because debounce delays the call
console.log("Immediate result:", result) // should be undefined