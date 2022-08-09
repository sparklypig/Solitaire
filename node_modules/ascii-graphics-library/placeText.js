import * as constants from './constants.js'


/**
 * Places text (absolutely) without disturbing text above or to the left of it
 * 
 * @param {String} str 
 */
export default function translateText(str, x, y) {
    return constants.SETPOS(x, y) + str.replaceAll('\n', '\n' + constants.SETCOL(x))
}