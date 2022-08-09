import * as agl from 'ascii-graphics-library'

function leftPad(str, len) {
    let ret = str
    if(ret.length < len) {
        return leftPad(' ' + str, len)
    }
    return ret
}

function rightPad(str, len) {
    let ret = str
    if(ret.length < len) {
        return rightPad(str + ' ', len)
    }
    return ret
}

export const suits = ['♠', '♥', '♦', '♣']

export class Card {
    static width = 9
    static height = 7

    constructor(value, suit, faceUp = false, selected = false) {
        this.value = value
        this.faceUp = faceUp
        this.selected = selected

        switch(suit[0]) {
            case 'c':
            case '♣':
                this.color = agl.constants.BLACK
                this.suit = '♣'
                break
            case 'd':
            case '♦':
                this.color = agl.constants.RED
                this.suit = '♦'
                break
            case 'h':
            case '♥':
                this.color = agl.constants.RED
                this.suit = '♥'
                break
            case 's':
            case '♠':
                this.color = agl.constants.BLACK
                this.suit = '♠'
                break
            default:
                this.color = ''
                this.suit = ' '
        }

        if(value == 1) {
            this.rank = 'A'
        }
        else if(value == 11) {
            this.rank = 'J'
        }
        else if(value == 12) {
            this.rank = 'Q'
        }
        else if(value == 13) {
            this.rank = 'K'
        }
        else {
            this.rank = value.toString()
        }

        this.edgeHighlight = agl.constants.YELLOW
    }

    flip() {
        this.faceUp = !this.faceUp
        return this
    }

    getColors() {
        this.edgeColor = agl.constants.WHITE
        if(this.value === '') {
            this.edgeColor += agl.constants.BACKGROUNDGREEN
        }
        if(this.selected) {
            // this.edgeColor += agl.constants.YELLOW
            this.edgeColor += this.edgeHighlight
        }

        this.bodyColor = ''
        if(this.value === '') {
            this.bodyColor += agl.constants.BACKGROUNDGREEN
        }
        else if(!this.faceUp) {
            this.bodyColor += agl.constants.BACKGROUNDBRIGHTRED
        }
        else {
            this.bodyColor += agl.constants.BACKGROUNDWHITE
        }
    }

    toString() {
        this.getColors()

        let ret = ''
        if(this.faceUp) {
            ret =
`╭───────╮
│ ${agl.colorize(rightPad(this.rank, 2), this.color, agl.constants.RESET + this.bodyColor)}    │
│       │
│   ${agl.colorize(this.suit, this.color, agl.constants.RESET + this.bodyColor)}   │
│       │
│    ${agl.colorize(leftPad(this.rank, 2), this.color, agl.constants.RESET + this.bodyColor)} │
╰───────╯`
    // ${this.selected ? '^' : ' '}    `
        }
        else {
            ret =
`╭───────╮
│///////│
│///////│
│///////│
│///////│
│///////│
╰───────╯`
// ${this.selected ? '^' : ' '}    `
        }

        return ret.split('\n').map((cur, i, arr) => {
            // Color the top and bottom edges
            if(i == 0 || i + 1 == arr.length) {
                return agl.colorize(cur, this.edgeColor)
            }

            // Color the bodies

            return agl.colorize(cur.slice(0, 1), this.edgeColor) +
                agl.colorize(cur.slice(1, cur.length - 1), this.bodyColor) +
                agl.colorize(cur.slice(cur.length - 1), this.edgeColor)
        }).join('\n')
    }

    toStringCondensed() {
        this.getColors()

        let ret = agl.colorize('╭───────╮', this.edgeColor)
        if(this.faceUp) {
            ret += '\n'
            ret += agl.colorize('│', this.edgeColor)
            ret += agl.colorize(' ', this.bodyColor)
            ret += agl.colorize('' + rightPad(this.rank, 2) + this.suit + '  ', this.color + this.bodyColor + agl.constants.UNDERLINE)
            ret += agl.colorize(' ', this.bodyColor)
            // ret += agl.colorize('  ', bodyColor)
            ret += agl.colorize('│', this.edgeColor)
        }

        return ret
    }

    toStringUltraCondensed() {
        this.getColors()

        let ret = ''
        if(this.faceUp) {
            ret += agl.colorize('│', this.edgeColor)
            ret += agl.colorize(' ', this.bodyColor)
            ret += agl.colorize('' + rightPad(this.rank, 2) + this.suit + '  ', this.color + this.bodyColor + agl.constants.UNDERLINE)
            ret += agl.colorize(' ', this.bodyColor)
            ret += agl.colorize('│', this.edgeColor)
        }
        else {
            ret = agl.colorize('╭───────╮', this.edgeColor)
        }

        return ret
    }
}

export class CardGroup {
    constructor(selected = 0) {
        this.group = []
        this.selected = selected
        this.edgeHighlight = ''
    }

    size() {
        return this.group.length
    }

    top() {
        return this.group[this.group.length - 1]
    }

    bottom() {
        return this.group[0]
    }

    add(card) {
        this.group.push(card)
    }

    insert(card) {
        this.group.unshift(card)
    }

    deal() {
        // return this.group.shift()
        return this.group.pop()
    }

    moveTo(depth = 1, dest) {    
        // console.log(`moveTo(depth = ${depth})`)
        // console.log(this.group)
        
        let moveArr = []
        for(let i = 0; i < depth; i++) {
            if(this.group.length === 0) {
                // console.log('Tried to move more than possible')
                break
            }
            // console.log(this.group[index])
            moveArr.push(this.deal())
        }
        while(moveArr.length > 0) {
            dest.add(moveArr.pop())
        }
    }

    shuffle() {
        for(let i = 0; i < this.group.length; i++) {
            let temp = this.group[i]
            let j = Math.floor(Math.random() * (this.group.length - i) + i)
            this.group[i] = this.group[j]
            this.group[j] = temp
        }
    }

    showAll() {
        for(let card of this.group) {
            card.faceUp = true
        }
    }

    setEdgeHighlight(edgeHighlight) {
        for(let card of this.group) {
            card.edgeHighlight = edgeHighlight
        }
    }

    toString() {
        let ret = ''

        for(let card of this.group) {
            ret += card.toString() + '\n'
        }

        return ret
    }
}

export class Foundation extends CardGroup {
    constructor(suit = ' ') {
        super()
        this.suit = suit
    }

    validTop(other) {
        if(other.suit === this.suit) {
            if(this.top()) {
                if(this.top().value + 1 === other.value) {
                    return true
                }
            }
            else {
                if(other.value === 1) {
                    return true
                }
            }
        }
    }

    validMove(depth, dest) {
        let card = this.group[this.group.length - depth]
        return dest.validTop(card)
    }

    moveTo(depth = 1, dest) {
        if(this.validMove(depth, dest)) {
            super.moveTo(depth, dest)
        }
        else {
            console.log("YOU DUMMY")
        }
    }

    toString() {
        let ret = ''
        if(this.group.length == 0) {
            let card = new Card('', this.suit, true)
            card.selected = this.selected
            ret += card.toString()
        }
        else {
            let temp = this.top().selected
            this.top().selected = this.selected
            ret += this.top().toString()
            this.top().selected = temp
        }
        // ret += `\n    ${this.selected ? '^' : ' '}    `
        return ret
    }
}

export class Deck extends CardGroup {
    constructor(num = 1) {
        super()

        for(let i = 0; i < num; i++) {
            for(let suit of suits) {
                for(let i = 1; i <= 13; i++) {
                    let card = new Card(i, suit)//, true)
                    this.add(card)
                }
            }
        }
    }

    toString() {
        let ret = ''
        if(this.group.length == 0) {
            let card = new Card('', ' ', true)
            card.selected = this.selected
            ret += card.toString()
        }
        else {
            let temp = this.top().selected
            this.top().selected = this.selected
            ret += this.top().toString()
            this.top().selected = temp
        }
        // ret += `\n    ${this.selected ? '^' : ' '}    `
        return ret
    }
}

export class CardStack extends CardGroup{

    constructor() {
        super()
    }

    orderedDepth() {
        let i
        for(i = 0; i < this.group.length; i++) {
            let card = this.group[this.group.length - 1 - i]
            if(!card.faceUp) {
                break
            }
            if(i % 2 === 0) {
                if(card.color !== this.top().color) {
                    break
                }
            }
            else {
                if(card.color === this.top().color) {
                    break
                }
            }
            if(this.top().value + i !== card.value) {
                break
            }
        }
        // console.log(i)
        return i    
    }

    validMove(depth, dest) {
        let card = this.group[this.group.length - depth]
        return dest.validTop(card)
    }

    validTop(other) {
        if(other) {
            if(this.top()) {
                return other.value + 1 === this.top().value && other.color !== this.top().color
            }
            else {
                return other.value === 13
            }
        }
        else {
            return false
        }
    }

    moveTo(depth = 1, dest) {
        if(this.validMove(depth, dest)) {
            super.moveTo(depth, dest)
        }
        else {
            console.log("YOU DUMMY")
        }
    }

    toString() {
        let ret = ''
        
        // If the stack is empty, display an empty green space
        if(this.group.length == 0) {
            let card = new Card('', ' ', true)
            card.selected = this.selected > 0
            ret += card.toString()
        }

        // Otherwise, display all cards in the stack
        else {
            // Loop thorugh all the cards in the stack
            for(let i = 0; i < this.group.length; i++) {
                // Store current card in card
                let card = this.group[i]
                // If the card is within the depth, select it
                card.selected = this.selected + 1 > this.group.length - i
                // If it's the last card...
                if(i + 1 == this.group.length) {
                    // If it's the only card or the last selected card, just display it
                    if(i == 0 || i == this.group.length - this.selected || !this.group[i - 1].faceUp) {
                        ret += card.toString()
                    }
                    // Otherwise, remove the top of it to blend
                    else {
                        ret += card.toString().split('\n').slice(1).join('\n')
                    }
                    // ret += '\n'
                }
                // Otherwise diplay a condensed verison
                else {
                    // If it's the last face up card or the last selected card, show a condensed version
                    if(i === 0 || i == this.group.length - this.selected || !this.group[i - 1].faceUp){
                        ret += card.toStringCondensed() + '\n'
                    }
                    // Otherwise show an ultra condensed version
                    else {
                        ret += card.toStringUltraCondensed() + '\n'
                    }
                }
            }
        }

        // ret += `\n    ${this.selected ? '^' : ' '}    `
        // ret += '\n'

        return ret
    }
}

export class CardStacks {
    constructor(width = 0) {
        this.stacks = []
        for(let i = 0; i < width; i++) {
            this.stacks.push(new CardStack())
        }
    }

    toString() {
        let ret = ''

        // Get max height of all stacks
        let height = 0
        for(let stack of this.stacks) {
            let curHeight = stack.toString().split('\n').length

            height = Math.max(height, curHeight)
        }

        for(let i = 0; i < height; i++) {
            for(let stack of this.stacks) {
                let segment = stack.toString().split('\n')[i]
                ret += segment ? segment : leftPad('', Card.width)
                ret += ' '
            }
            ret += '\n'
        }

        return ret.slice(0, -1)
    }
}

export class Foundations {
    constructor(_suits = suits) {
        this.foundations = []

        for(let suit of _suits) {
            this.foundations.push(new Foundation(suit))
        }
    }
    
    toString() {
        let ret = ''

        // Get max height of all foundations
        let height = 0
        for(let foundation of this.foundations) {
            let curHeight = foundation.toString().split('\n').length

            height = Math.max(height, curHeight)
        }

        for(let i = 0; i < height; i++) {
            for(let foundation of this.foundations) {
                let segment = foundation.toString().split('\n')[i]
                ret += segment ? segment : leftPad('', Card.width)
                ret += ' '
            }
            ret += '\n'
        }

        return ret.slice(0, -1)
    }
}

export class Stock {
    constructor() {
        this.stock = new Deck()
        this.stock.shuffle()
        this.waste = new CardStack()
    }

    move() {
        if(this.stock.group.length > 0) {
            this.deal()
        }
        else this.replace()

    }

    deal() {
        this.stock.moveTo(3, this.waste)
        this.waste.showAll()
    }

    replace() {
        while(this.waste.group.length > 0) {
            this.stock.add(this.waste.deal().flip())
        }
    }

    toString() {
        let ret = ''
        ret += this.stock.toString()
        ret += '\n'
        
        let tempStack = new CardStack()
        tempStack.group = this.waste.group.slice(-9)
        tempStack.selected = this.waste.selected

        ret += tempStack.toString()

        // ret += this.waste.toString()
        return ret
    }
}