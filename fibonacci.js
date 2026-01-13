function fibs(n) {
    let result = []
    for(let i = 0; i < n; i++) {
        if(i == 0) { 
            result.push(0)
        } else if(i == 1) {
            result.push(1)
        } else {
            result.push(result.at(-1) + result.at(-2))
        }
    }
    return result
}

function fibsRec(n, result = []) {
    if(n <= 0) {
        return []
    }
    if(n == 1) {
        result.push(0)
        return result
    }
    if(n == 2) {
        result.push(0)
        result.push(1)
        return result
    }
    result = fibsRec(n - 1, result)
    result.push(result.at(-1) + result.at(-2))
    return result
}

console.log(fibs(0))
console.log(fibs(1))
console.log(fibs(2))
console.log(fibs(8))
console.log(fibs(20))

console.log(fibsRec(0))
console.log(fibsRec(1))
console.log(fibsRec(2))
console.log(fibsRec(8))
console.log(fibsRec(20))