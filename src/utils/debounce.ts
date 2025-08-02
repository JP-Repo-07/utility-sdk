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