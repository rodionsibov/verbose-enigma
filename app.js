let levels = []

levels[0] = {
    map: [
        [1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0],
    ],
    player: {
        x: 0,
        y: 4
    },
    goal: {
        x: 4,
        y: 1
    },
    theme: 'default'
}

levels[1] = {
    map: [
        [1, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 1, 0, 1, 0, 0]
    ],
    player: {
        x: 2,
        y: 4
    },
    goal: {
        x: 4,
        y: 4
    },
    theme: 'grassland'
};

levels[2] = {
    map: [
        [1, 0, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 0, 1, 0, 0]
    ],
    player: {
        x: 2,
        y: 4
    },
    goal: {
        x: 6,
        y: 4
    },
    theme: 'dungeon'
};

class Game {
    constructor(el) {
        this.el = document.querySelector(el)
        this.levelIdx = 0
        this.tileTypes = ['floor', 'wall']
        this.tileDim = 50
        this.map = levels[0].map
        this.theme = levels[0].theme
        this.player = { ...levels[0].player }
        this.goal = { ...level.goal }
        this.player.el = null
    }

    populateMap() {
        this.el.className = 'game-container ' + this.theme
        let tiles = document.querySelector('.tiles')
        for (let y = 0; y < this.map.length; ++y) {
            for (let x = 0; x < this.map[y].length; ++x) {
                let tileCode = this.map[y][x];
                let tileType = this.tileTypes[tileCode]
                let tile = this.createEl(x, y, tileType)
                tiles.appendChild(tile)
            }
        }
    }

    createEl(x, y, type) {
        let el = document.createElement('div')
        el.className = type
        el.style.width = el.style.height = this.tileDim + 'px'
        el.style.left = x * this.tileDim + 'px'
        el.style.top = y * this.tileDim + 'px'
        return el
    }

    sizeUp() {
        let map = this.el.querySelector('.game-map')
        map.style.height = this.map.length * this.tileDim + 'px'
        map.style.width = this.map[0].length * this.tileDim + 'px'
    }

    placeSprite(type) {
        let x = this[type].x
        let y = this[type].y
        let sprite = this.createEl(x, y, type)
        sprite.id = type
        sprite.style.borderRadius = this.tileDim + 'px'
        let layer = this.el.querySelector('.sprites')
        layer.appendChild(sprite)
        return sprite
    }

    movePlayer(event) {
        event.preventDefault()
        if (event.keyCode < 37 || event.keyCode > 40) {
            return
        }
        switch (event.keyCode) {
            case 37:
                this.moveLeft()
                break
            case 38:
                this.moveUp()
                break
            case 39:
                this.moveRight()
                break
            case 40:
                this.moveDown()
                break
        }

    }

    moveUp() {
        if (this.player.y === 0) {
            return
        }
        let nextTile = this.map[this.player.y - 1][this.player.x]
        if (nextTile === 1) {
            return
        }
        this.player.y -= 1
        this.updateVert()
    }

    moveDown() {
        if (this.player.y === this.map.length - 1) {
            return
        }
        let nextTile = this.map[this.player.y + 1][this.player.x]
        if (nextTile === 1) {
            return
        }
        this.player.y += 1
        this.updateVert()
    }

    moveLeft() {
        if (this.player.x === 0) {
            return
        }
        let nextTile = this.map[this.player.y][this.player.x - 1]
        if (nextTile === 1) {
            return
        }
        this.player.x -= 1
        this.updateHoriz()
    }

    moveRight() {
        if (this.player.x === this.map[this.player.y].length - 1) {
            return
        }
        let nextTile = this.map[this.player.y][this.player.x + 1]
        if (nextTile === 1) {
            return
        }
        this.player.x += 1
        this.updateHoriz()
    }

    updateVert() {
        this.player.el.style.top = this.player.y * this.tileDim + 'px'
    }

    updateHoriz() {
        this.player.el.style.left = this.player.x * this.tileDim + 'px'
    }

    checkGoal() {
        let body = document.querySelector('body')
        let txt = this.el.querySelector('.text')
        if (this.player.y === this.goal.y && this.player.x === this.goal.x) {
            // add success class to the body
            body.className = 'success'
        } else {
            // remove success class from body
            body.className = ''
        }
    }

    keyboardListener() {
        document.addEventListener('keydown', event => {
            this.movePlayer(event)
            this.checkGoal()
        })
    }

    buttonListeners() {
        let up = document.querySelector('.up')
        let left = document.querySelector('.left')
        let down = document.querySelector('.down')
        let right = document.querySelector('.right')
        let obj = this

        up.addEventListener('mousedown', function () {
            obj.moveUp()
            obj.checkGoal()
        })
        down.addEventListener('mousedown', function () {
            obj.moveDown()
            obj.checkGoal()
        })
        left.addEventListener('mousedown', function () {
            obj.moveLeft()
            obj.checkGoal()
        })
        right.addEventListener('mousedown', function () {
            obj.moveRight()
            obj.checkGoal()
        })
    }

}

function init() {
    let myGame = new Game('.game-container-1')
    myGame.populateMap()
    myGame.sizeUp()
    myGame.placeSprite('goal')
    let playerSprite = myGame.placeSprite('player')
    myGame.player.el = playerSprite
    myGame.keyboardListener()
    myGame.buttonListeners()
}
init()