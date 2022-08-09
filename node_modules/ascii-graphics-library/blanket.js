export default function blanket(x, y, char = ' ') {
    let ret = ''
    for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
            ret += char
        }
        ret += '\n'
    }
    return ret
}