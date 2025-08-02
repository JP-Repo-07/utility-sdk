export class Stack<T> {
    private items: T[] = []

    // get all data inside array
    getAll = () => {
        return [...this.items]
    }

    // get the size of data inside an array 
    getSize = () => {
        return this.items.length
    }

    // Push a data onto the stack
    pushItem = (data: T) => {
        this.items.push(data)
        return data
    }

    popItem = () => {
        const poppedItem = this.items.pop()
        if(poppedItem === undefined) {
            return { success: false }
        }
        return { success: true, value: poppedItem }
    }
}