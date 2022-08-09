import { default as visualLength } from './visualLength.js'
import padAlign from './padAlign.js'
import fitToArea from './fitToArea.js'
import colorize from './colorize.js'
import * as constants from './constants.js'


/**
 * Displays an array pretty like
 * 
 * @param {[[String]]} arr - Array to display
 * @param {[[[number]]]} highlight - indices to highlight
 */
export default function grid(arr, highlight = [], widthOverride = false, heightOverride = false) {
    let ret = ''

    let width = 0

    let widths = []

    if(widthOverride !== false) {
        width = widthOverride
    }
    else {
        for(let i = 0; i < arr.length; i++) {
            let row = arr[i]
            for(let j = 0; j < row.length; j++) {
                let element = row[j]

                if(j + 1 > widths.length) {
                    widths.push(visualLength(element))
                }

                if(visualLength(element) > width) {
                    width = visualLength(element)
                }
                if(visualLength(element) > widths[j]) {
                    widths[j] = visualLength(element)
                }
            }
        }
    }
 
    
    ret += '╔'
    for(let i = 0; i < arr[0].length; i++) {
        let curWidth = widths[i]
        for(let j = 0; j < curWidth; j++) {
            ret += '═'
        }
        if(i + 1!= arr[0].length) {
            ret += '╤'
        }
    }
    // for(let i = 0; i < ((width + 1) * arr[0].length) - 1; i++) {
    //     if(i % (width + 1) !== width) {
    //         ret += '═'
    //     }
    //     else {
    //         ret += '╤'
    //     }
    // }
    ret += '╗\n'


    // For each row of the array
    for(let i = 0; i < arr.length; i++) {
        let line = arr[i]

        // If it isn't the first line
        if(line !== arr[0]) {

            // Add a line break between
            ret += '╟'
            for(let j = 0; j < arr[0].length; j++) {
                let curWidth = widths[j]
                for(let k = 0; k < curWidth; k++) {
                    ret += '─'
                }
                if(j + 1 != arr[0].length) {
                    ret += '┼'
                }
            }
            // for(let i = 0; i < ((width + 1) * arr[0].length) - 1; i++) {
            //     if(i % (width + 1) !== width) {
            //         ret += '─'
            //     }
            //     else {
            //         ret += '┼'
            //     }
            // }
            ret += '╢\n'
        }

        let height = 0
        
        if(heightOverride !== false) {
            height = heightOverride[i]
        }
        else {
            for(let j = 0; j < line.length; j++) {
                if(line[j].split('\n').length > height) {
                    height = line[j].split('\n').length
                }
            }
        }

        for(let j = 0; j < height; j++) {

            ret += '║'
            // For each element in each line
            for(let k = 0; k < line.length; k++) {
                let element = line[k]
                let curWidth = widths[k]
                let buff = fitToArea(element, curWidth, height, 'center')



                // console.log(highlight)
                // console.log([i, k])
                if(JSON.stringify(highlight).includes(JSON.stringify([i, k]))) {
                    // console.log("I sunk your battleship")
                    buff = colorize(buff, constants.REVERSED)
                }

                ret += buff.split('\n')[j]
                ret += constants.RESET
                if(k != line.length - 1) {
                    ret += '│'
                }
            }
            ret += '║\n'
        }
    }

    ret += '╚'
    
    for(let i = 0; i < arr[0].length; i++) {
        let curWidth = widths[i]
        for(let j = 0; j < curWidth; j++) {
            ret += '═'
        }
        if(i + 1!= arr[0].length) {
            ret += '╧'
        }
    }
    // for(let i = 0; i < ((width + 1) * arr[0].length) - 1; i++) {
    //     if(i % (width + 1) !== width) {
    //         ret += '═'
    //     }
    //     else {
    //         ret += '╧'
    //     }
    // }
    ret += '╝'
    // ret += '\n'

    // return [padAlign(arr[1][0], false, 'left', 2)]

    return ret
}