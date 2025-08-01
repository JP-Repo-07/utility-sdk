// input: hello world
// output: Hello world
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// input: hello world
// output: Hello World
export const toPascalCase = (str: string): string => {
  return str
    .replace(/[_\- ]+/g, ' ')                  // normalize delimiters: _ - space → space
    .split(' ')                                // split into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // capitalize
    .join(' ');                                 // join words with no separator
}

// input: hello world, length: 5
// output: hello...
export const truncate = (str: string, length: number):  string => {
  return str.length <= length ? str : str.slice(0, length) + '...';
}

// check if string only contains characters from A-Z
export function checkIfPureString(str: string, haveWhiteSpace: boolean): boolean {
  const regex = haveWhiteSpace
    ? /^[a-zA-Z\s]+$/  // allows letters and whitespace
    : /^[a-zA-Z]+$/;   // only letters, no whitespace

  return regex.test(str);
}