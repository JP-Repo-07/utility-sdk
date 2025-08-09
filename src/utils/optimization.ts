// Utility functions for debouncing function calls
// Debouncing is a technique to limit the rate at which a function can fire.
// It is commonly used to improve performance by preventing excessive function calls,
// especially in scenarios like handling user input events.
export const debounce = <T extends (...args: any[]) => any>(fn: T, ms: number): (...args: Parameters<T>) => ReturnType<T> | void => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    return (...args: Parameters<T>): ReturnType<T> | void => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn(...args)
        }, ms)
    }
}

// Promise-based debounce function
// This version allows the debounced function to return a Promise, which is useful for async operations
export const promiseDebounce = <T extends (...args: any[]) => any>(fn: T, ms: number): (...args: Parameters<T>) => Promise<ReturnType<T>> => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    return (...args: Parameters<T>): Promise<ReturnType<T>> => {
        return new Promise((resolve) => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(async () => {
                const result = await fn(...args)
                resolve(result)
            }, ms)
        })
    }
}


export const deepGet = (path: string, data: any): any => {

    const fields = path.split(".")

    for (const field of fields) {
        if (data == null) return undefined
      data = data[field]
    }
    return data
}
