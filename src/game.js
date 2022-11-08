const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

const btnUp = document.querySelector('#up')
const btnRight = document.querySelector('#right')
const btnBottom = document.querySelector('#bottom')
const btnLeft = document.querySelector('#left')

const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')


window.addEventListener('keydown', moveByArrows)
btnUp.addEventListener('click', moveUp)
btnRight.addEventListener('click', moveRight)
btnBottom.addEventListener('click', moveBottom)
btnLeft.addEventListener('click', moveLeft)

window.addEventListener('load', setCanvasSize)

let canvasSize = 400
let elementsSize = 40
let mapRowCol

let timeStart
let timePlayer
let timeInterval

const playerPosition = {
  x: undefined,
  y: undefined,
}

const giftPosition = {
  x: undefined,
  y: undefined,
}

let bombPosition = []
let activeMap = 0
let lives = 3

function setCanvasSize() {
  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)
  renderMap()
}

function renderMap() {
  game.font = elementsSize + 'px sans-serif'
  game.textAlign = 'end'
  spanLives.textContent = emojis['LIVE'].repeat(lives)
  spanRecord.textContent = localStorage.getItem('score') / 1000 + 's'

  if (!timeStart) {
    timeStart = Date.now()
    timeInterval = setInterval(showTime, 100)
  }

  let map = maps[activeMap]

  if (!map) {
    showWin()
    return
  }

  const mapRows = map.trim().split('\n')
  mapRowCol = mapRows.map(row => row.trim().split(''))


  game.clearRect(0, 0, canvasSize, canvasSize)

  bombPosition = []

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
      } else if (element === 'X') {
        bombPosition.push({
          x: posX,
          y: posY,
        })
      }
      game.fillText(emojis[element], posX, posY)
    })
  })
  movePlayer()
}

function movePlayer() {
  if (giftPosition.x === playerPosition.x && giftPosition.y === playerPosition.y) {
    levelWin()
  }

  const bombCollision = bombPosition.some(bomb => {
    return (playerPosition.x === bomb.x) && (playerPosition.y === bomb.y)
  })

  if (bombCollision) {
    levelFail()
  }
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function levelWin() {
  activeMap += 1
  renderMap()
}

function showWin() {
  console.log('Has ganado el juego')
  const score = localStorage.getItem('score')

  clearInterval(timeInterval)
  const playerTime = Date.now() - timeStart
  if (score) {
    if (score >= playerTime) {
      localStorage.setItem('score', playerTime)
    }
  } else {
    localStorage.setItem('score', playerTime)
  }
}

function levelFail() {
  lives -= 1
  if (lives <= 0) {
    activeMap = 0
    lives = 3
    timeStart = undefined
    clearInterval(timeInterval)
  }

  playerPosition.x = undefined
  playerPosition.y = undefined
  renderMap()
}

function showTime() {
  spanTime.textContent = (Date.now() - timeStart) / 1000
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