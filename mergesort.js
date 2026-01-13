function mergeSort(array) {
    if(array.length <= 1) {
        return array
    }
    let left = mergeSort(array.slice(0, Math.trunc(array.length / 2)))
    let right = mergeSort(array.slice(Math.trunc(array.length / 2), array.length))

    let result = []
    let leftIndex = 0
    let rightIndex = 0
    for(let i = 0; i < array.length; i++) {
        if(left[leftIndex] < right[rightIndex]) {
            result[i] = left[leftIndex]
            leftIndex++
        } else {
            result[i] = right[rightIndex]
            rightIndex++
        }

        if(leftIndex >= left.length) {
            result = [...result, ...right.slice(rightIndex)]
            break
        }
        if(rightIndex >= right.length) {
            result = [...result, ...left.slice(leftIndex)]
            break
        }
    }
    return result
}

console.log(mergeSort([]))
console.log(mergeSort([73]))
console.log(mergeSort([1, 2, 3, 4, 5]))
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]))
console.log(mergeSort([105, 79, 100, 110]))