export const RESET = '\u001b[0m'
export const BLACK = '\u001b[30m'
export const RED = '\u001b[31m'
export const GREEN = '\u001b[32m'
export const YELLOW = '\u001b[33m'
export const BLUE = '\u001b[34m'
export const MAGENTA = '\u001b[35m'
export const CYAN = '\u001b[36m'
export const WHITE = '\u001b[37m'
export const BRIGHTBLACK = '\u001b[30;1m'
export const BRIGHTRED = '\u001b[31;1m'
export const BRIGHTGREEN = '\u001b[32;1m'
export const BRIGHTYELLOW = '\u001b[33;1m'
export const BRIGHTBLUE = '\u001b[34;1m'
export const BRIGHTMAGENTA = '\u001b[35;1m'
export const BRIGHTCYAN = '\u001b[36;1m'
export const BRIGHTWHITE = '\u001b[37;1m'

export function eightBitColor(id) {
    return '\u001b[38;5;' + id + 'm'
}

export const BACKGROUNDBLACK = '\u001b[40m'
export const BACKGROUNDRED = '\u001b[41m'
export const BACKGROUNDGREEN = '\u001b[42m'
export const BACKGROUNDYELLOW = '\u001b[43m'
export const BACKGROUNDBLUE = '\u001b[44m'
export const BACKGROUNDMAGENTA = '\u001b[45m'
export const BACKGROUNDCYAN = '\u001b[46m'
export const BACKGROUNDWHITE = '\u001b[47m'
export const BACKGROUNDBRIGHTBLACK = '\u001b[40;1m'
export const BACKGROUNDBRIGHTRED = '\u001b[41;1m'
export const BACKGROUNDBRIGHTGREEN = '\u001b[42;1m'
export const BACKGROUNDBRIGHTYELLOW = '\u001b[43;1m'
export const BACKGROUNDBRIGHTBLUE = '\u001b[44;1m'
export const BACKGROUNDBRIGHTMAGENTA = '\u001b[45;1m'
export const BACKGROUNDBRIGHTCYAN = '\u001b[46;1m'
export const BACKGROUNDBRIGHTWHITE = '\u001b[47;1m'

export function eightBitBGColor(id) {
    return '\u001b[48;5;' + id + 'm'
}

export const BOLD = '\u001b[1m'
export const UNDERLINE = '\u001b[4m'
export const REVERSED = '\u001b[7m'

export function UP(n = 0) {
    return `\u001b[${n}A`
}

export function DOWN(n = 0) {
    return `\u001b[${n}B`
}

export function RIGHT(n = 0) {
    return `\u001b[${n}C`
}

export function LEFT(n = 0) {
    return `\u001b[${n}D`
}

export function HORZDISP(x = 0) {
    if(x > 0) {
        return RIGHT(x)
    }
    else if(x < 0) {
        return LEFT(-x)
    }
    else {
        return ''
    }
}

export function VERTDISP(y = 0) {
    if(y > 0) {
        return DOWN(y)
    }
    else if(y < 0) {
        return UP(-y)
    }
    else {
        return ''
    }
}

export function CLEARSCREEN(n = 2) {
    return `\u001b[${n}J`
}

export function CLEARLINE(n = 2) {
    return `\u001b[${n}K]`
}

export function NEXTLINE(n = 1) {
    return `\u001b[${n}E`
}

export function PREVLINE(n = 1) {
    return `\u001b[${n}F`
}

export function SETCOL(n = 0) {
    return `\u001b[${n}G`
}

export function SETPOS(x = 0, y = 0) {
    return `\u001b[${y};${x}H`
}

export const HOME = SETPOS()

export const SAVEPOS = '\u001b[s'
export const LOADPOS = '\u001b[u'