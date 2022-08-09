import * as constants from './constants.js' 
import padAlign from './padAlign.js'

/**
 * Translates text (relatively) without disturbing text above or to the left of it
 * 
 * @param {String} str 
 */
export default function translateText(str, x, y) {
    let ret = ''
    
    ret += constants.HORZDISP(x) + constants.VERTDISP(y)
    ret += constants.SAVEPOS

    let lines = [str.split('\n')[0]]
    let i = 1
    for(let line of str.split('\n').slice(1)){
        lines.push('\n' + constants.LOADPOS + constants.VERTDISP(i) + line)
        i++
    }

    // console.log(lines)

    ret += lines.join('')

    return ret + ''
}