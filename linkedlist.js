class Node {
    value = null
    nextNode = null

    constructor(value, nextNode) {
        this.value = value
        this.nextNode = nextNode
    }
}

class LinkedList {
    #head = null
    #tail = null
    #size = 0

    append(value) {
        // Add value to the end of the list
        const node = new Node(value, null)

        if(this.#size === 0) {
            this.#head = node
            this.#tail = node
        } 
        else {
            this.#tail.nextNode = node
            this.#tail = node
        }
        this.#size++
    }

    prepend(value) {
        // Add value to the start of the list
        const node = new Node(value, null)

        if(this.#size === 0) {
            this.#head = node
            this.#tail = node
        } else {
            node.nextNode = this.#head
            this.#head = node
        }
        this.#size++
    }

    head() {
        if(this.#head === null) {
            return undefined
        }
        return this.#head
    }

    tail() {
        if(this.#tail === null) {
            return undefined
        }
        return this.#tail
    }

    at(index) {
        if(index < 0 || index >= this.#size) {
            return undefined
        }
        let pointer = this.#head
        for(let i = 0; i < index; i++) {
            pointer = pointer.nextNode
        }
        return pointer
    }

    pop() {
        // Remove the head node from the list and return its value
        if(this.#head === null) {
            return undefined
        }
        let pointer = this.#head
        this.#head = this.#head.nextNode
        this.#size--
        if(this.#size === 0) {
            this.#tail = null
        }
        return pointer.value
    }

    contains(value) {
        if(this.#size === 0) {
            return false
        }
        let pointer = this.#head
        for(let i = 0; i < this.#size; i++) {
            if(pointer.value === value) {
                return true
            }
            pointer = pointer.nextNode
        }
        return false
    }

    findIndex(value) {
        if(this.#size === 0) {
            return -1
        }
        let pointer = this.#head
        for(let i = 0; i < this.#size; i++) {
            if(pointer.value === value) {
                return i
            }
            pointer = pointer.nextNode
        }
        return -1
    }

    insertAt(index, ...values) {
        if(index < 0 || index > this.#size) {
            throw RangeError(index + ' is about of bounds')
        }

        // Create list
        let start = new Node(values[0], null)
        let end = start
        for(let i = 1; i < values.length; i++) {
            end.nextNode = new Node(values[i], null)
            end = end.nextNode
        }
        
        if(this.#size === 0) {
            this.#head = start
            this.#tail = end
        } else if(index === 0) {
            end.nextNode = this.#head
            this.#head = start
        } else if(index === this.#size) {
            this.#tail.nextNode = start
            this.#tail = end
        } else {
            let pointer = this.#head
            for(let i = 0; i < index - 1; i++) {
                pointer = pointer.nextNode
            }
            let rest = pointer.nextNode
            pointer.nextNode = start
            end.nextNode = rest
        }
        this.#size += values.length
    }

    removeAt(index) {
        if(index < 0 || index >= this.#size) {
            throw RangeError(index + ' is about of bounds')
        }
        if(this.#size === 1) {
            this.#head = null
            this.#tail = null
        } else if(index === 0) {
            this.#head = this.#head.nextNode
        } else {
            let pointer = this.#head
            for(let i = 0; i < index - 1; i++) {
                pointer = pointer.nextNode
            }
            pointer.nextNode = pointer.nextNode.nextNode
            if(pointer.nextNode === null) {
                this.#tail = pointer
            }
        }
        this.#size--
    }

    size() {
        return this.#size
    }

    toString() {
        if(this.#size === 0) {
            return ''
        }
        let result = ''
        let pointer = this.#head
        while(pointer !== null) {
            result += `( ${pointer.value} ) -> `
            pointer = pointer.nextNode
        }
        result += 'null'
        return result
    }
}
