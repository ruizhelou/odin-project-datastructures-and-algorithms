class Node {
    data = null
    left = null
    right = null

    constructor(data) {
        this.data = data
    }
}

class Tree {
    root = null

    constructor(array) {
        this.buildTree(array)
    }

    buildTree(array) {
        // Remove duplicates and sort array
        array = [...new Set(array)]
        array.sort((n1, n2) => n1 - n2)

        // Build the tree using recursion
        this.root = this.#buildTreeRecursive(array, 0, array.length - 1)
        return this.root
    }

    #buildTreeRecursive(array, start, end) {
        if(start > end) {
            return null
        }
        const mid = Math.floor((start + end)/2)
        const root = new Node(array[mid])
        root.left = this.#buildTreeRecursive(array, start, mid - 1)
        root.right = this.#buildTreeRecursive(array, mid + 1, end)
        return root
    }

    insert(value) {
        this.root = this.#insertRecursive(value, this.root)
    }

    #insertRecursive(value, root) {
        if(root === null) {
            return new Node(value)
        }
        if(root.data < value) {
            root.right = this.#insertRecursive(value, root.right)
        } else {
            root.left = this.#insertRecursive(value, root.left)
        }
        return root
    }

    delete(value) {
        this.root = this.#deleteRecursive(value, this.root)
    }

    #deleteRecursive(value, root) {
        if(root === null) {
            return null
        }
        if(root.data > value) {
            root.left = this.#deleteRecursive(value, root.left)
        } else if(root.data < value) {
            root.right = this.#deleteRecursive(value, root.right)
        } else {
            if(root.left === null) {
                return root.right
            } 
            if(root.right === null) {
                return root.left
            }
            const successor = this.#getSuccessor(root)
            root.data = successor.data
            this.#deleteRecursive(successor.data, root.right)
        }
        return root
    }

    // Get inorder successor (smallest in right subtree)
    #getSuccessor(root) {
        root = root.right
        while(root.left !== null) {
            root = root.left
        }
        console.log(root)
        return root
    }

    find(value) {
        return this.#findRecursive(value, this.root)
    }

    #findRecursive(value, root) {
        if(root === null) {
            return null
        }
        if(root.data === value) {
            return root
        }
        if(root.data > value) {
            return this.#findRecursive(value, root.left)
        } else {
            return this.#findRecursive(value, root.right)
        }
    }

    levelOrderForEach(callback) {
        if(typeof callback !== 'function') {
            throw new Error('callback must be a function.')
        }
        const queue = [this.root]
        while(queue.length !== 0) {
            const node = queue.shift()
            callback(node)
            if(node.left !== null) {
                queue.push(node.left)
            }
            if(node.right !== null) {
                queue.push(node.right)
            }
        }
    }

    inOrderForEach(callback) {
        if(typeof callback !== 'function') {
            throw new Error('callback must be a function.')
        }
        this.#inOrderForEachRecursive(callback, this.root)
    }
    #inOrderForEachRecursive(callback, root) {
        if(root.left !== null) {
            this.#inOrderForEachRecursive(callback, root.left)
        }
        callback(root)
        if(root.right !== null) {
            this.#inOrderForEachRecursive(callback, root.right)
        }
    }

    preOrderForEach(callback) {
        if(typeof callback !== 'function') {
            throw new Error('callback must be a function.')
        }
        this.#preOrderForEachRecursive(callback, this.root)
    }
    #preOrderForEachRecursive(callback, root) {
        callback(root)
        if(root.left !== null) {
            this.#preOrderForEachRecursive(callback, root.left)
        }
        if(root.right !== null) {
            this.#preOrderForEachRecursive(callback, root.right)
        }
    }

    postOrderForEach(callback) {
        if(typeof callback !== 'function') {
            throw new Error('callback must be a function.')
        }
        this.#postOrderForEachRecursive(callback, this.root)
    }
    #postOrderForEachRecursive(callback, root) {
        if(root.left !== null) {
            this.#postOrderForEachRecursive(callback, root.left)
        }
        if(root.right !== null) {
            this.#postOrderForEachRecursive(callback, root.right)
        }
        callback(root)
    }

    depth(value) {
        return this.#depthRecursive(value, this.root, 0)
    }
    #depthRecursive(value, root, depthSoFar) {
        if(root === null) {
            return null
        }
        if(root.data === value) {
            return depthSoFar
        }
        if(root.data > value) {
            return this.#depthRecursive(value, root.left, depthSoFar + 1)
        } else {
            return this.#depthRecursive(value, root.right, depthSoFar + 1)
        }
    }

    height(value) {
        const node = this.find(value)
        return this.#findHeightRecursive(node, 0)
    }
    #findHeightRecursive(node, heightSoFar) {
        if(node === null) {
            return null
        }

        const leftHeight = this.#findHeightRecursive(node.left, heightSoFar + 1)
        const rightHeight = this.#findHeightRecursive(node.right, heightSoFar + 1)

        if(leftHeight === null && rightHeight === null) {
            return heightSoFar
        } else if(leftHeight !== null && rightHeight === null) {
            return leftHeight
        } else if(rightHeight !== null && leftHeight === null) {
            return rightHeight
        } else {
            if(leftHeight > rightHeight) {
                return leftHeight
            }
            return rightHeight
        }
    }

    isBalanced() {
        return this.#isBalancedRecursive(this.root, 0)
    }
    #isBalancedRecursive(root, heightSoFar) {
        if(root === null) {
            return true
        }

        const leftHeight = this.#findHeightRecursive(root.left, heightSoFar + 1)
        const rightHeight = this.#findHeightRecursive(root.right, heightSoFar + 1)

        if(leftHeight === null && rightHeight === null) {
            return true
        } else if(leftHeight !== null && rightHeight === null) {
            return leftHeight <= 1 && this.#isBalancedRecursive(root.left, 0)
        } else if(rightHeight !== null && leftHeight === null) {
            return rightHeight <= 1 && this.#isBalancedRecursive(root.right, 0)
        } else {
            return Math.abs(leftHeight - rightHeight) <= 1 && this.#isBalancedRecursive(root.left, 0) && this.#isBalancedRecursive(root.right, 0)
        }
    }

    rebalance() {
        const array = []
        this.inOrderForEach((node) => array.push(node.data))
        this.buildTree(array)
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
}

const tree = new Tree([1, 2, 3, 4, 5, 6, 6, 6, 7, 7, 10, 9, 8])
tree.insert(101)
tree.insert(102)
tree.insert(103)
tree.insert(104)
tree.insert(105)
tree.insert(106)
tree.insert(107)
tree.insert(108)
tree.insert(108)
tree.insert(108)
prettyPrint(tree.root)
console.log(tree.isBalanced())
tree.rebalance()
prettyPrint(tree.root)
console.log(tree.isBalanced())