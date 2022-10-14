const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

const btnUp = document.querySelector('#up')
const btnRight = document.querySelector('#right')
const btnBottom = document.querySelector('#bottom')
const btnLeft = document.querySelector('#left')


window.addEventListener('keydown', moveByArrows)
btnUp.addEventListener('click', moveUp)
btnRight.addEventListener('click', moveRight)
btnBottom.addEventListener('click', moveBottom)
btnLeft.addEventListener('click', moveLeft)

function moveByArrows({ key }) {
  if (key === 'ArrowUp') moveUp()
  else if (key === 'ArrowRight') moveRight()
  else if (key === 'ArrowDown') moveBottom()
  else if (key === 'ArrowLeft') moveLeft()
}

function moveUp() {
  console.log('btnUp')
}
function moveRight() {
  console.log('btnRight')
}
function moveBottom() {
  console.log('btnBottom')
}
function moveLeft() {
  console.log('btnLeft')
}

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

let canvasSize = 0
let elementsSize = 0
let mapRowCol

function setCanvasSize() {
  window.innerWidth > window.innerHeight
    ? canvasSize = window.innerHeight * 0.6
    : canvasSize = window.innerWidth * 0.6

  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

  elementsSize = (canvasSize / 10) - 1
  startGame()
}

function renderMap() {
  const map = maps[0]
  const mapRows = map.trim().split('\n')
  mapRowCol = mapRows.map(row => row.trim().split(''))

  game.font = elementsSize + 'px sans-serif'

  mapRowCol.forEach((row, i) => {
    row.forEach((element, j) => {
      game.fillText(emojis[element], elementsSize * j, (elementsSize * i) + 35)
    })
  })
}

function startGame() {
  renderMap()

}
