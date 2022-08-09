import * as AsciiConstants from './constants.js'
import { default as visualLength } from './visualLength.js'
import { default as colorize } from './colorize.js'

/**
 * Adds a border around a string
 * 
 * @param {String} str - String to have border added
 * @param {String} align - Selects how text will be aligned ('left', 'right', or 'center')
 * @param {String} borderColor - Selects border color (ASCII color string)
 * @param {String} strColor - Selects a color for internal text (ASCII color string)
 * @param {number} multi - Specifies how many levels of border to add
 * @param {object} edge - Specifies which characters to use for border (object with n, s, e, w, nw, ne, sw, se properties)
 */
export default function border(
    str,
    align = 'left',
    borderColor = AsciiConstants.RESET,
    strColor = AsciiConstants.RESET,
    multi = 1,
    edge = {
        n: '═',
        s: '═',
        e: '║',
        w: '║',
        nw: '╔',
        ne: '╗',
        sw: '╚',
        se: '╝'
    }, 
    widthOverride = false
    ) {
    
    

    str = str.toString().split('\n')
    let width = 0

    if (widthOverride !== false) {
        width = widthOverride
    }
    else {
        for (let line of str) {
            if (visualLength(line) > width) {
                width = visualLength(line)
            }
        }
    }

    let ret = edge.nw

    for (let i = 0; i < width; i++) {
        ret += edge.n
    }

    ret += edge.ne + '\n'

    ret = colorize(ret, borderColor)

    for (let line of str) {
        ret += colorize(edge.w, borderColor)

        let lineWidth = visualLength(line)

        if (align === 'left') {

        }
        else if (align === 'center') {
            for (let i = 0; i < (width - lineWidth) / 2; i++) {
                line = ' ' + line
            }
        }
        else if (align === 'right') {
            for (let i = 0; i < (width - lineWidth); i++) {
                line = ' ' + line
            }
        }

        ret += colorize(line, strColor)

        for (let i = 0; i < width - visualLength(line); i++) {
            ret += ' '
        }

        ret += colorize(edge.e + '\n', borderColor)
    }

    ret += borderColor + edge.sw

    for (let i = 0; i < width; i++) {
        ret += edge.s
    }

    ret += edge.se + AsciiConstants.RESET// + [AsciiConstants.RESET]

    if (multi === 1) {
        return ret
    }
    else {
        return border(ret, align, borderColor, strColor, multi - 1)
    }
}