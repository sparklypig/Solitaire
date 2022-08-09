import * as AsciiConstants from './constants.js'

export default function colorize(str, color = AsciiConstants.RESET, finish = AsciiConstants.RESET) {
    return color + str + finish
}