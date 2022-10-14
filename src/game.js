const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

let canvasSize = 0
let elementsSize = 0

function setCanvasSize() {
  window.innerWidth > window.innerHeight
    ? canvasSize = window.innerHeight * 0.6
    : canvasSize = window.innerWidth * 0.6

  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

  elementsSize = canvasSize / 10
  startGame()
}

function renderMap() {
  game.font = elementsSize + 'px sans-serif'
  game.textAlign = 'end'

  for (let i = 1; i <= 10; i++) {
    game.fillText(emojis['X'], elementsSize + 5, elementsSize * i)
  }
}

function startGame() {
  renderMap()
}
