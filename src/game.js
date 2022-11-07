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

let canvasSize = 400
let elementsSize = 40
let mapRowCol

const playerPosition = {
  x: undefined,
  y: undefined,
}

const giftPosition = {
  x: undefined,
  y: undefined,
}

let map = maps[0]

function setCanvasSize() {
  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)
  renderMap()
}

function renderMap() {
  const mapRows = map.trim().split('\n')
  mapRowCol = mapRows.map(row => row.trim().split(''))

  game.font = elementsSize + 'px sans-serif'
  game.textAlign = 'end'

  game.clearRect(0, 0, canvasSize, canvasSize)

  mapRowCol.forEach((row, i) => {
    row.forEach((element, j) => {
      const posX = (elementsSize * (j + 1)) + 5
      const posY = elementsSize * (i + 1) - 5

      if (element === 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = Math.round(posX)
          playerPosition.y = Math.round(posY)
        }
      } else if (element === 'I') {
        giftPosition.x = posX
        giftPosition.y = posY
      }
      game.fillText(emojis[element], posX, posY)
    })
  })
  movePlayer()
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
  if (giftPosition.x === playerPosition.x && giftPosition.y === playerPosition.y) {
    console.log('Llegaste a la meta')
    map = maps[1]
  }
}

function moveByArrows({ key }) {
  if (key === 'ArrowUp') moveUp()
  else if (key === 'ArrowRight') moveRight()
  else if (key === 'ArrowDown') moveBottom()
  else if (key === 'ArrowLeft') moveLeft()
}

function moveUp() {
  if (playerPosition.y <= elementsSize) return
  playerPosition.y -= elementsSize
  renderMap()
}
function moveRight() {
  if (playerPosition.x >= canvasSize) return
  playerPosition.x += elementsSize
  renderMap()
}
function moveBottom() {
  if (playerPosition.y >= (canvasSize - 5)) return
  playerPosition.y += elementsSize
  renderMap()
}
function moveLeft() {
  if (playerPosition.x <= (elementsSize + 5)) return
  playerPosition.x -= elementsSize
  renderMap()
}