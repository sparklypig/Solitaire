import * as agl from './agl.js'


let arr = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
    [5, 6, 7, 8, 9],
    [6, 7, 8, 9, 10]
]

console.log(agl.grid(arr, [[1, 1]]))

let check = (agl.border('hello\nthe quick brown fox jumps over\nthe lazy dog', 'center', agl.RED, agl.GREEN, 4))

console.log(check)