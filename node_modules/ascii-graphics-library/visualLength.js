const escRegEx = /\x1B\[=?[;?\d*]*./g

export default function visualLength(str) {
    let ret = 0
    for(let sub of str.split('\n')){
        let length = sub.toString().replace(escRegEx, '').length
        if(length > ret) {
            ret = length
        }
    }
    return ret
}