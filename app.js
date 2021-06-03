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

function game(id) {
    this.el = document.querySelector(el)
    this.tileTypes = ['floor', 'wall']
    this.tileDim = 32
    this.map = level.map
    this.theme = level.theme
    this.player = { ...level.player }
    this.goal = { ...level.goal }
    this.player.el = null
}