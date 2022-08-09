import { HOME } from './constants.js'
import padAlign from './padAlign.js'

export default function fitToArea(str, width, height, align = 'left') {
    let arr = str.toString().split('\n') 

    let ret = ''
    for(let i = 0; i < height; i++) {
        if(i < arr.length) {
            ret += padAlign(arr[i], width, align)
        }
        else {
            ret += padAlign('', width)
        }
        ret += '\n'
    }
    return ret
}