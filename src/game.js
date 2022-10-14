const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')


window.addEventListener('load', startGame)
window.addEventListener('resize', setSize)

function setSize() {
  let canvasSize

  window.innerWidth > window.innerHeight
    ? canvasSize = window.innerHeight * 0.65
    : canvasSize = window.innerWidth * 0.75

  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

  const elementsSize = (canvasSize / 10)

  game.font = elementsSize + 'px sans-serif'
  game.textAlign = 'center'

  for (let i = 1; i <= 10; i++) {
    game.fillText(emojis['X'], elementsSize, elementsSize * i)
  }
}

function startGame() {
  setSize()
}