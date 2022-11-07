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

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

let canvasSize = 0
let elementsSize = 0
let mapRowCol

const playerPosition = {
  x: undefined,
  y: undefined,
}

function setCanvasSize() {
  window.innerWidth > window.innerHeight
    ? canvasSize = window.innerHeight * 0.6
    : canvasSize = window.innerWidth * 0.6

  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

  elementsSize = (canvasSize / 10) - 1
  renderMap()
}

function renderMap() {
  const map = maps[0]
  const mapRows = map.trim().split('\n')
  mapRowCol = mapRows.map(row => row.trim().split(''))

  game.font = elementsSize + 'px sans-serif'

  game.clearRect(0, 0, canvasSize, canvasSize)

  mapRowCol.forEach((row, i) => {
    row.forEach((element, j) => {
      const posX = elementsSize * j
      const posY = (elementsSize * i) + 35
      game.fillText(emojis[element], posX, posY)

      if (element === 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX
          playerPosition.y = posY
        }
      }
    })
  })
  movePlayer()
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function moveByArrows({ key }) {
  if (key === 'ArrowUp') moveUp()
  else if (key === 'ArrowRight') moveRight()
  else if (key === 'ArrowDown') moveBottom()
  else if (key === 'ArrowLeft') moveLeft()
}

function moveUp() {
  playerPosition.y -= elementsSize
  renderMap()
}
function moveRight() {
  playerPosition.x += elementsSize
  renderMap()
}
function moveBottom() {
  playerPosition.y += elementsSize
  renderMap()
}
function moveLeft() {
  playerPosition.x -= elementsSize
  renderMap()
}