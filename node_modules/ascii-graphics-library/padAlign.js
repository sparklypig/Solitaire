import { default as visualLength } from './visualLength.js'

export default function padAlign(str, width = false, align = 'left') {
    let ret = str.toString()

    if(align === 'left') {
        for(let i = 0; i < width - visualLength(str); i++) {
            ret += ' '
        }
    }
    if(align === 'center') {
        for(let i = 0; i + 1 < (width - visualLength(str)) / 2; i++) {
            ret = ' ' + ret
        }
        ret = padAlign(ret, width, 'left')
    }
    if(align === 'right') {
        for(let i = 0; i < width - visualLength(str); i++) {
            ret = ' ' + ret
        }
    }

    return ret
}