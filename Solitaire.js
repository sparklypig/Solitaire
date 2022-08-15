import * as Card from 'cards'
import rawControl from 'RawControl'
import * as agl from 'ascii-graphics-library'
// import process from 'process'
import * as rl from 'readline-sync'
import fs from 'fs'

function dispHelp() {
    console.log("Welcome to solitaire!")
    console.log("Navigate with the arrow keys, and select with 'enter'")
    console.log("Use 1-7 to select piles, and shift + 1-4  to select foundations")
    console.log("Use space to select the stock and press again to deal new cards")
    console.log("Press 'ctrl+c' to quit")
    console.log("Press 'h' to see this message again")
    console.log("Remove the '.help' file to not see this message by default")
    
    rl.question("Press enter to continue")
}

if(fs.existsSync('.help')) {
    dispHelp()
}

class Board {
    constructor() {
        this.width = 7
        this.depth = 7

        this.stock = new Card.Stock()

        // TODO Rename to tableau
        this.stacks = new Card.CardStacks(this.width)

        this.foundations = new Card.Foundations()

        this.cursor = new Cursor(this.getSelectableGroups().length)

        this.selectedIndex = 0
        this.selectedDepth = 1

        this.resetSrcDst()

        this.dealTableau()
    }

    dealTableau() {
        for(let i = 0; i < this.depth; i++) {
            for(let j = i; j < this.width; j++) {
                this.stacks.stacks[j].add(this.stock.stock.deal())
            }
        }

        for(let stack of this.stacks.stacks) {
            stack.top().flip()
        }
    }

    getSelectableGroups() {
        let ret = []

        for(let foundation of this.foundations.foundations) {
            foundation.id = 'foundation'
            ret.push(foundation)
        }

        // this.deck.id = 'deck'
        // ret.push(this.deck)

        this.stock.stock.id = 'deck'
        ret.push(this.stock.stock)

        for(let stack of this.stacks.stacks) {
            stack.id = 'stack'
            ret.push(stack)
        }

        // this.waste.id = 'waste'
        // ret.push(this.waste)

        this.stock.waste.id = 'waste'
        ret.push(this.stock.waste)

        return ret
    }

    action() {
        let currentSelection = this.getSelectableGroups()[this.cursor.val]

        // console.log(currentSelection)
        if(currentSelection.id === 'deck') {
            this.stock.move()
        }
        else {
            if(!this.source) {
                this.setSource()
            }
            else if(!this.destination) {
                this.setDestination()

                console.log(this.source, this.destination)

                this.moveSrctoDst()
                if(this.source.top()) {
                    this.source.top().faceUp = true
                }
                this.resetSrcDst()
            }
        }
    }

    setSource() {
        this.source = this.getSelectableGroups()[this.cursor.val]
        this.sourceDepth = this.selectedDepth
    }

    setDestination() {
        this.destination = this.getSelectableGroups()[this.cursor.val]
    }

    moveSrctoDst() {
        this.source.moveTo(this.sourceDepth, this.destination)
    }

    resetSrcDst() {
        this.source = null
        this.sourceDepth = 0
        this.destination = null
    }

    toString() {
        let ret = ''
        
        // Highlight selected card groups
        let selectableGroups = this.getSelectableGroups()
        for(let i = 0; i < selectableGroups.length; i++) {
            let group = selectableGroups[i]

            group.selected = 0

            if(i == this.cursor.val) {
                group.setEdgeHighlight(agl.constants.YELLOW)
                group.selected = this.selectedDepth
            }

            if(group === this.source) {
                group.setEdgeHighlight(agl.constants.BLUE)
                group.selected = this.sourceDepth
            }
        }

        let strArr = []

        // for(let foundation of this.foundations) {
        //     strArr.push(foundation.toString(0))
        // }

        strArr.push(this.foundations.toString())

        ret += agl.grid(
            [
                [
                    agl.grid(
                        [[this.foundations.toString()],[this.stacks.toString()]]
                    ),
                    this.stock.toString()
                ]
            ]
        )

        // ret += this.waste.toString()
        // ret += agl.grid([[agl.grid([strArr])], [this.stacks.toString()]])

        

        return ret
    }

    display(clear = true) {
        let str = ''
        if(clear) {
            // str += agl.constants.CLEARSCREEN()
            str += agl.constants.HOME
        }
        str += this.toString()
        str += agl.constants.CLEARSCREEN(0)
        
        console.log(str)
    }
}

class Cursor {
    constructor(size) {
        this.reset(size)
    }

    inc() {
        this.val += this.size - 1
        this.val %= this.size
    }

    dec() {
        this.val++
        this.val %= this.size
    }

    set(val) {
        this.val = val
    }

    reset(size = this.size) {
        this.size = size
        this.val = 0
    }
}

const board = new Board()

const controls = {
    '1b5b41': () => {
        let group = board.getSelectableGroups()[board.cursor.val]

        if(group.id === 'stack') {
            board.selectedDepth++
            let maxDepth = group.orderedDepth();
            // for(let i = group.group.length - 1; i >= 0; i--) {
            //     if(!group.group[i].faceUp) {
            //         break
            //     }
            //     maxDepth++
            // }
            if(board.selectedDepth > maxDepth) {
                board.selectedDepth = maxDepth
            }
        }
        else {

        }
    },
    '1b5b42': () => {
        board.selectedDepth--
        if(board.selectedDepth < 1) {
            board.selectedDepth = 1
        }
    },
    '1b5b43': () => {
        board.selectedDepth = 1
        board.cursor.dec()
        board.selectedIndex++
        board.selectedIndex %= board.getSelectableGroups().length
    },
    '1b5b44': () => {
        board.selectedDepth = 1
        board.cursor.inc()
        board.selectedIndex += board.getSelectableGroups().length - 1
        board.selectedIndex %= board.getSelectableGroups().length
    },
        // HOTKEYS
        '0d': () => {
            board.action()
        },
        '20': () => {
            board.selectedDepth = 1
            if(board.cursor.val === 12) {
                board.stock.move()
            }
            else {
                board.cursor.val = 12
            }
        },
        '31': () => {
            board.selectedDepth = 1
            board.cursor.val = 5
        },
        '32': () => {
            board.selectedDepth = 1
            board.cursor.val = 6
        },
        '33': () => {
            board.selectedDepth = 1
            board.cursor.val = 7
        },
        '34': () => {
            board.selectedDepth = 1
            board.cursor.val = 8
        },
        '35': () => {
            board.selectedDepth = 1
            board.cursor.val = 9
        },
        '36': () => {
            board.selectedDepth = 1
            board.cursor.val = 10
        },
        '37': () => {
            board.selectedDepth = 1
            board.cursor.val = 11
        },
        '21': () => {
            board.selectedDepth = 1
            board.cursor.val = 0
        },
        '40': () => {
            board.selectedDepth = 1
            board.cursor.val = 1
        },
        '23': () => {
            board.selectedDepth = 1
            board.cursor.val = 2
        },
        '24': () => {
            board.selectedDepth = 1
            board.cursor.val = 3
        },
        '68': () => {
            dispHelp()
        }
}

function display() {
    // board.display(false)
    board.display()
}

console.log(agl.constants.CLEARSCREEN())
display()

rawControl(controls, true, display)