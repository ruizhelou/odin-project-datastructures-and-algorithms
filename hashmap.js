class HashMap {
    #loadFactor = 0.75
    #capacity = 16
    #buckets = []
    #numEntries = 0

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.#capacity
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key)
        if (hashCode < 0 || hashCode >= this.#capacity) {
            throw new Error(`Trying to access index out of bounds. Index: ${hashCode}, size: ${this.#capacity}.`);
        }

        const bucket = this.#buckets[hashCode]
        // Bucket is empty
        if(bucket === undefined) {
            this.#buckets[hashCode] = [{key: key, value: value}]
            this.#numEntries++
        } 
        // Bucket contains array
        else {
            let keyIndex = -1
            for(let i = 0; i < bucket.length; i++) {
                if(bucket[i].key === key) {
                    keyIndex = i
                    break
                }
            }
            // If key exists, remove it
            if(keyIndex !== -1) {
                bucket.splice(keyIndex, 1)
                this.#numEntries--
            } 
            bucket.push({key: key, value: value})
            this.#numEntries++
        }

        // Grow the buckets array
        if(this.#numEntries > this.#capacity * this.#loadFactor) {
            const bucketsPointer = this.#buckets
            this.#buckets = []
            this.#numEntries = 0
            this.#capacity = this.#capacity * 2
            for(let bucket of bucketsPointer) {
                if(bucket !== undefined) {
                    for(let entry of bucket) {
                        this.set(entry.key, entry.value)
                    }
                }
            }
        }
    }

    get(key) {
        const hashCode = this.hash(key)
        if (hashCode < 0 || hashCode >= this.#capacity) {
            throw new Error(`Trying to access index out of bounds. Index: ${hashCode}, size: ${this.#capacity}.`);
        }
        const bucket = this.#buckets[hashCode]
        if(bucket === undefined) {
            return null
        } else {
            for(let entry of bucket) {
                if(entry.key === key) {
                    return entry.value
                }
            }
            return null
        }
    }

    has(key) {
        const hashCode = this.hash(key)
        if (hashCode < 0 || hashCode >= this.#capacity) {
            throw new Error(`Trying to access index out of bounds. Index: ${hashCode}, size: ${this.#capacity}.`);
        }
        const bucket = this.#buckets[hashCode]
        if(bucket === undefined) {
            return false
        } else {
            for(let entry of bucket) {
                if(entry.key === key) {
                    return true
                }
            }
            return false
        }
    }

    remove(key) {
        const hashCode = this.hash(key)
        if (hashCode < 0 || hashCode >= this.#capacity) {
            throw new Error(`Trying to access index out of bounds. Index: ${hashCode}, size: ${this.#capacity}.`);
        }
        const bucket = this.#buckets[hashCode]
        if(bucket === undefined) {
            return false
        } else {
            for(let i = 0; i < bucket.length; i++) {
                const entry = bucket[i]
                if(entry.key === key) {
                    bucket.splice(i, 1)
                    this.#numEntries--
                    return true
                }
            }
            return false
        }
    }

    entries() {
        const result = []
        for(let i = 0; i < this.#buckets.length; i++) {
            const bucket = this.#buckets[i]
            if(bucket !== undefined) {
                for(let j = 0; j < bucket.length; j++) {
                    result.push(bucket[j])
                }
            }
        }
        return result
    }

    length() {
        return this.#numEntries
    }

    clear() {
        this.#numEntries = 0
        this.#buckets = []
        this.#loadFactor = 0.75
        this.#capacity = 16
    }

    keys() {
        return this.entries().map(entry => entry.key)
    }

    values() {
        return this.entries().map(entry => entry.value)
    }

    debug() {
        return this.#buckets
    }
}
