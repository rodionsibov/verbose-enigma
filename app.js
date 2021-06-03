let levels = []
level[0] = {
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

class Game {
    constructor(el) {
        this.el = document.querySelector(el)
        this.tileTypes = ['floor', 'wall']
        this.tileDim = 32
        this.map = level.map
        this.theme = level.theme
        this.player = { ...level.player }
        this.goal = { ...level.goal }
        this.player.el = null
    }

    populateMap() {
        this.el.className = 'game-container ' + this.theme
        let tiles = document.querySelector('.tiles')
        for (let y = 0; y < this.map.length; ++y) {
            for (let x = 0; x < this.map[y].length; ++x) {
                const tileCode = this.map[y][x];
                let tyleType = this.tileTypes[tileCode]
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
}